import os
import sys
import json
import glob
from concurrent.futures import ThreadPoolExecutor
from PIL import Image, ImageFilter
import numpy as np
from scipy.ndimage import binary_opening, binary_dilation, label
from rembg import new_session, remove

def main():
    print("Initializing rembg session...")
    session = new_session('u2net_human_seg')
    
    os.makedirs('public/frames/lg', exist_ok=True)
    os.makedirs('public/frames/sm', exist_ok=True)
    os.makedirs('/tmp/inspection', exist_ok=True)
    
    total_frames = 192
    shots_def = [
        {"from": 0, "to": 27},
        {"from": 28, "to": 75},
        {"from": 76, "to": 162},
        {"from": 163, "to": 191}
    ]
    
    print(f"Total frames: {total_frames}")
    
    # Step 1: Process each frame to 1600x900 RGBA
    # We will save temporary uncropped 1600x900 frames in /tmp/raw_1600
    os.makedirs('/tmp/raw_1600', exist_ok=True)
    
    print("Processing frames with rembg and alpha refinement pipeline...")
    for idx in range(total_frames):
        img_path = f'full/f{idx:03d}.png'
        if not os.path.exists(img_path):
            print(f"Missing frame {img_path}")
            continue
            
        img = Image.open(img_path).convert('RGB')
        img_arr = np.array(img).astype(np.float32)
        
        # Person mask
        mask = remove(img, session=session, only_mask=True)
        person_mask = np.array(mask).astype(np.float32) / 255.0
        
        # Sample corner bg color
        top_left = img_arr[:15, :15].reshape(-1, 3).mean(axis=0)
        top_right = img_arr[:15, -15:].reshape(-1, 3).mean(axis=0)
        bg_color = (top_left + top_right) / 2.0
        
        # Props mask: max channel distance > 14 ramped to 1 by 40
        diff = np.abs(img_arr - bg_color)
        max_dist = np.max(diff, axis=-1)
        props = np.clip((max_dist - 14.0) / (40.0 - 14.0), 0.0, 1.0)
        props_bin = props > 0.5
        
        # Binary opening 3
        struct3 = np.ones((3, 3), bool)
        props_bin = binary_opening(props_bin, structure=struct3)
        
        # Retain connected blobs > 4000 px
        labeled, num_features = label(props_bin)
        if num_features > 0:
            counts = np.bincount(labeled.flat)
            mask_large = counts > 4000
            mask_large[0] = False
            props_bin = mask_large[labeled]
        else:
            props_bin = np.zeros_like(props_bin)
            
        # Dilate by 4
        struct_dilate = np.ones((4, 4), bool)
        props_bin = binary_dilation(props_bin, structure=struct_dilate)
        props_mask = props_bin.astype(np.float32)
        
        # In shot 3 (idx 76-162, laptop shot), ensure table/laptop props are included
        # u2net_human_seg only captures the human body, so extract laptop & table props
        if 76 <= idx <= 162:
            wall_sample = img_arr[350:460, 200:450, :].mean(axis=(0, 1))
            diff_wall = np.linalg.norm(img_arr - wall_sample, axis=-1)
            struct3 = np.ones((3, 3), bool)
            laptop_region = binary_opening(diff_wall > 8.0, structure=struct3)
            laptop_region = binary_dilation(laptop_region, structure=struct3)
            laptop_mask = np.zeros(img_arr.shape[:2], dtype=bool)
            laptop_mask[470:, 220:650] = laptop_region[470:, 220:650]
            props_mask = laptop_mask.astype(np.float32)
            alpha = np.maximum(person_mask, props_mask)
        else:
            alpha = person_mask

        # Gaussian blur 0.8
        alpha_img = Image.fromarray((alpha * 255.0).astype(np.uint8)).filter(ImageFilter.GaussianBlur(0.8))
        alpha = np.array(alpha_img).astype(np.float32) / 255.0
        
        # Remove white fringe by un-premultiplying against bg: rgb = (rgb - (1-a)*bg)/a for a > 0.05
        a_safe = np.maximum(alpha, 1e-4)[:, :, None]
        rgb_clean = np.where(
            alpha[:, :, None] > 0.05,
            np.clip((img_arr - (1.0 - a_safe) * bg_color) / a_safe, 0.0, 255.0),
            img_arr
        )
        
        # Erode alpha: alpha = 0.35*alpha + 0.65*MinFilter(3)(alpha)
        alpha_pil = Image.fromarray((alpha * 255.0).astype(np.uint8))
        min_alpha = np.array(alpha_pil.filter(ImageFilter.MinFilter(3))).astype(np.float32) / 255.0
        alpha = 0.35 * alpha + 0.65 * min_alpha
        
        # Remap: alpha = clip((alpha - 0.14) / 0.86)^1.4
        alpha = np.power(np.clip((alpha - 0.14) / 0.86, 0.0, 1.0), 1.4)
        
        # For edge pixels alpha < 0.95 multiply alpha by 1 - 0.8*clip((lum - 150)/70)
        lum = 0.299 * rgb_clean[:, :, 0] + 0.587 * rgb_clean[:, :, 1] + 0.114 * rgb_clean[:, :, 2]
        edge_factor = 1.0 - 0.8 * np.clip((lum - 150.0) / 70.0, 0.0, 1.0)
        alpha = np.where(alpha < 0.95, alpha * edge_factor, alpha)
        
        rgba = np.dstack([rgb_clean, (alpha * 255.0).astype(np.uint8)]).astype(np.uint8)
        res_img = Image.fromarray(rgba, 'RGBA').resize((1600, 900), Image.Resampling.LANCZOS)
        res_img.save(f'/tmp/raw_1600/f{idx:03d}.png')
        
        # Also compute and save person-only mask at 1600x900 for cx computation
        p_mask_1600 = Image.fromarray((person_mask * 255.0).astype(np.uint8)).resize((1600, 900), Image.Resampling.BILINEAR)
        p_mask_1600.save(f'/tmp/raw_1600/pmask_{idx:03d}.png')
        
        if (idx + 1) % 24 == 0 or idx == total_frames - 1:
            print(f"Processed {idx + 1}/{total_frames} frames...")
            
    print("Computing shot bounding boxes and cx...")
    manifest_shots = []
    
    for shot in shots_def:
        f_from = shot["from"]
        f_to = shot["to"]
        
        min_x, min_y = 1600, 900
        max_x, max_y = 0, 0
        
        cx_values = []
        
        for idx in range(f_from, f_to + 1):
            frame_img = Image.open(f'/tmp/raw_1600/f{idx:03d}.png')
            a = np.array(frame_img.split()[3])
            
            # alpha > 6
            active_y, active_x = np.where(a > 6)
            if len(active_x) > 0:
                min_x = min(min_x, int(np.min(active_x)))
                max_x = max(max_x, int(np.max(active_x)))
                min_y = min(min_y, int(np.min(active_y)))
                max_y = max(max_y, int(np.max(active_y)))
                
            # cx: alpha-weighted mean x of top 45% of rows (0 to 405) using person mask
            p_mask = np.array(Image.open(f'/tmp/raw_1600/pmask_{idx:03d}.png'))
            top_mask = p_mask[:405, :] # top 45%
            total_weight = np.sum(top_mask)
            if total_weight > 0:
                x_indices = np.arange(1600)
                mean_x = np.sum(np.sum(top_mask, axis=0) * x_indices) / total_weight
                cx_values.append(mean_x / 1600.0)
            else:
                cx_values.append(0.5)
                
        # Padding
        min_x = max(0, min_x - 4)
        min_y = max(0, min_y - 4)
        max_x = min(1600, max_x + 5)
        max_y = min(900, max_y + 5)
        
        shot_cx = float(np.mean(cx_values))
        box = [min_x, min_y, max_x, max_y]
        
        manifest_shots.append({
            "from": f_from,
            "to": f_to,
            "box": box,
            "cx": round(shot_cx, 4)
        })
        print(f"Shot {f_from}..{f_to}: box={box}, cx={round(shot_cx, 4)}")
        
        # Crop frames of this shot and save WebP lg & sm
        for idx in range(f_from, f_to + 1):
            frame_img = Image.open(f'/tmp/raw_1600/f{idx:03d}.png')
            cropped = frame_img.crop((min_x, min_y, max_x, max_y))
            
            # Save lg WebP (q80, alpha_quality 90)
            lg_path = f'public/frames/lg/f{idx:03d}.webp'
            cropped.save(lg_path, 'WEBP', quality=80, method=4)
            
            # Save sm WebP (half size, q78)
            sm_w = max(1, cropped.width // 2)
            sm_h = max(1, cropped.height // 2)
            sm_cropped = cropped.resize((sm_w, sm_h), Image.Resampling.LANCZOS)
            sm_path = f'public/frames/sm/f{idx:03d}.webp'
            sm_cropped.save(sm_path, 'WEBP', quality=78, method=4)
            
    manifest = {
        "w": 1600,
        "h": 900,
        "count": total_frames,
        "shots": manifest_shots
    }
    
    with open('public/frames/manifest.json', 'w') as f:
        json.dump(manifest, f, indent=2)
        
    print("Saved public/frames/manifest.json")
    
    # Create inspection composites over bright red for representative frames: 10, 45, 110, 180
    for idx in [10, 45, 110, 180]:
        lg_frame = Image.open(f'public/frames/lg/f{idx:03d}.webp')
        # Find which shot this belongs to
        shot = next(s for s in manifest_shots if s["from"] <= idx <= s["to"])
        box = shot["box"]
        # Place onto 1600x900 bright red canvas
        red_canvas = Image.new('RGB', (1600, 900), (255, 0, 0))
        red_canvas.paste(lg_frame, (box[0], box[1]), mask=lg_frame.split()[3])
        red_canvas.save(f'/tmp/inspection/comp_red_{idx:03d}.png')
        print(f"Saved inspection composite /tmp/inspection/comp_red_{idx:03d}.png")

if __name__ == '__main__':
    main()

