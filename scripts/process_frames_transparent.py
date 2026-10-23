import os
import sys
import time
from concurrent.futures import ProcessPoolExecutor
from rembg import remove, new_session
from PIL import Image

worker_session = None

def init_worker():
    global worker_session
    worker_session = new_session("u2netp")

def process_one(num):
    global worker_session
    src = f"public/images/hero-sequence-orig/frame-{num:03d}.webp"
    dst = f"public/images/hero-sequence-transparent/frame-{num:03d}.webp"
    
    if not os.path.exists(src):
        return num, False, "Source not found"

    try:
        img = Image.open(src)
        out = remove(img, session=worker_session)
        out.save(dst, "WEBP", quality=85, method=4)
        return num, True, None
    except Exception as e:
        return num, False, str(e)

def main():
    os.makedirs("public/images/hero-sequence-transparent", exist_ok=True)
    frame_numbers = list(range(1, 193))
    
    t0 = time.time()
    print(f"Starting processing of {len(frame_numbers)} frames with 6 workers...")
    
    with ProcessPoolExecutor(max_workers=6, initializer=init_worker) as executor:
        for num, success, err in executor.map(process_one, frame_numbers):
            if num % 20 == 0 or num == 192:
                elapsed = time.time() - t0
                fps = num / elapsed
                print(f"Processed frame {num}/192 ({num/192*100:.1f}%) in {elapsed:.1f}s ({fps:.2f} frames/sec)")

    print(f"Done! All 192 frames processed in {time.time() - t0:.1f}s")

if __name__ == "__main__":
    main()

