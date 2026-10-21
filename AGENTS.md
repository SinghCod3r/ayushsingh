# AYUSH SINGH — CINEMATIC SCROLL PORTFOLIO
## Master Architecture, Tech Stack, Video-Frame Engine & Agent Reproduction Manual

This document provides the complete technical architecture, engineering specifications, video processing pipeline, scroll physics, and **exact master prompts** used to build this award-level, scroll-driven interactive portfolio.

Use this specification to build an identical, 60fps cinematic portfolio for any creator, engineer, or executive.

---

## 1. Project Overview & Aesthetic Identity

- **Visual Direction:** High-contrast editorial minimalism inspired by brutalist typography, Swiss grid layouts, and cinematic fashion portfolios (Awwwards Site of the Year / FWA caliber).
- **Color Palette:**
  - `--paper`: `#ffffff` (Pure optical white background)
  - `--ink`: `#0d0d0d` (Deep jet black typography)
  - `--red`: `#ff1f1f` (Electric editorial crimson accent)
  - `--line`: `rgba(13, 13, 13, 0.09)` (Hairline architectural grid lines)
  - `--mute`: `#5e5e5e` (Secondary technical metadata)
- **Typography Suite (Fontsource Variable & Pre-bundled):**
  - **Headings & Massive Numerals:** `Anton` (Display brutalist condensed sans-serif)
  - **Body & Subheadings:** `Inter Tight Variable` (Editorial geometric sans-serif)
  - **Monospace Metadata & Code:** `JetBrains Mono` (Technical labels, coordinates, counters)
- **Core Visual Innovation:** A transparent, rotoscoped video frame sequence of the subject that is seamlessly integrated into a **4-layer 3D spatial sandwich**. As the user scrolls, the subject changes poses, gestures, sits at a laptop, interacts with orbiting skill systems, and transitions through cinematic skewed blade cuts.

---

## 2. Tech Stack & Dependencies

```json
{
  "dependencies": {
    "react": "^19.3.0",
    "react-dom": "^19.3.0",
    "vite": "^8.3.4",
    "typescript": "^5.0.0",
    "gsap": "^3.15.0",
    "lenis": "^1.3.27",
    "@fontsource/anton": "^5.3.0",
    "@fontsource-variable/inter-tight": "^5.3.0",
    "@fontsource/jetbrains-mono": "^5.3.0",
    "lucide-react": "^1.60.0",
    "react-icons": "^5.7.0",
    "clsx": "^2.1.1",
    "tailwind-merge": "^3.7.0"
  },
  "devDependencies": {
    "@types/node": "^20.0.0",
    "@types/react": "^19.0.0",
    "@types/react-dom": "^19.0.0"
  }
}
```

### Key Tooling Rationale
1. **Vite + React 19:** Instant HMR, zero-overhead static asset pipeline, lightning-fast production bundle (< 390 kB total JS with GSAP & Lenis included).
2. **GSAP 3.15 (Ticker & Timelines):** Used as the **single master clock** for all animations, physics, and frame interpolations. No conflicting `requestAnimationFrame` loops.
3. **Lenis 1.3:** Smooth virtualized momentum scrolling with sub-pixel interpolation. Connected directly to GSAP's ticker.
4. **HTML5 2D Canvas (`Stage.tsx`):** Renders transparent WebP frame sequences. High-performance direct canvas drawing with fractional frame interpolation avoids DOM node bloat and prevents WebGL context loss.
5. **Python (`rembg`, `u2net_human_seg`, `PIL`, `numpy`, `scipy`):** Offline high-precision rotoscoping, edge defringing, alpha remapping, and shot manifest generation.
6. **Selenium + Headless Chrome:** Cross-viewport pixel-level testing (1920x1080 to 360x800) to ensure zero horizontal overflow and frame-accurate composition.

---

## 3. The 4-Layer Spatial Architecture

The portfolio creates physical depth by sandwiching the HTML5 Canvas between background and foreground DOM layers:

```
┌────────────────────────────────────────────────────────┐
│  Layer 4: HUD & Chrome (z-index: 100+)                 │
│  - Preloader split-screen curtain                      │
│  - Fixed Navigation Bar & Status Pill                  │
│  - Live Stock/Commit Ticker & Audio/Scroll Progress    │
│  - Custom trailing magnetic cursor                     │
├────────────────────────────────────────────────────────┤
│  Layer 3: Main Scroll Container (z-index: 3)           │
│  - Interactive scene DOM sections (Hero, About, Work)  │
│  - 3D Interactive Card Deck (preserve-3d)              │
│  - Timeline Cards, Awards Cylinder, Contact Form       │
├────────────────────────────────────────────────────────┤
│  Layer 2: Foreground Layer (.layer-front, z-index: 2)  │
│  - Front half of 3D Orbiting Skill Pills               │
│  - SVG laser connection beams & glowing focus dots     │
├────────────────────────────────────────────────────────┤
│  Layer 1: Canvas Stage (.stage-canvas, z-index: 1)     │
│  - Fixed full-screen HTML5 Canvas                      │
│  - Rotoscoped subject (Ayush) rendering at 60fps       │
│  - Skewed angular blade transitions between shots      │
├────────────────────────────────────────────────────────┤
│  Layer 0: Background Layer (.layer-back, z-index: 0)   │
│  - Giant brutalist typography ("AYUSH", "TALK")        │
│  - Back half of 3D Orbiting Skill Pills                │
│  - Architectural dot/line grids & Odometer Year        │
└────────────────────────────────────────────────────────┘
```

---

## 4. Video-to-Frames Rotoscoping Pipeline (`process_all_frames.py`)

Raw video (`video.mp4`) is processed into high-performance WebP spritesheets using a custom Python pipeline:

### Pipeline Execution Steps
1. **Video Frame Extraction:** Sliced at 24fps or 30fps into lossless PNG files (`full/f000.png` to `f191.png`).
2. **Shot Boundary Definition:**
   - **Shot 0 (Frames 0–27):** Standing presentation / Hero idle
   - **Shot 1 (Frames 28–75):** Dynamic gesturing / About section
   - **Shot 2 (Frames 76–162):** Sitting at desk with laptop / Work section
   - **Shot 3 (Frames 163–191):** Technical presentation / Toolkit & Awards
3. **AI Segmentation (`rembg` with `u2net_human_seg`):** Generates high-contrast binary human masks.
4. **Prop Preservation (Shot 2 Laptop & Table):**
   - General AI models erase desks and laptops because they are not human limbs.
   - We extract the desk and laptop by sampling background wall colors and applying morphological binary opening & dilation (`scipy.ndimage.binary_opening` and `binary_dilation`) on pixels with channel variance $> 8.0$.
   - Merge: `alpha = np.maximum(person_mask, laptop_mask)`.
5. **Optical Defringing & Desaturation:**
   - Raw masks over white backgrounds have 1-pixel gray/white fringes that glow awkwardly over dark sections.
   - We un-premultiply against the sampled corner background color:
     $$\text{rgb}_{\text{clean}} = \frac{\text{img} - (1 - \alpha) \times \text{bg}}{\alpha}$$
   - High-luminance edge matting: For edge pixels ($\alpha < 0.95$), attenuate alpha based on brightness:
     $$\alpha = \alpha \times \left(1.0 - 0.8 \times \text{clamp}\left(\frac{\text{lum} - 150}{70}\right)\right)$$
6. **Shot Bounding Box & Subpixel Head Tracking (`cx`):**
   - Calculates the minimum bounding box `[min_x, min_y, max_x, max_y]` containing all visible pixels across each shot.
   - Computes $c_x$ as the alpha-weighted centroid of the top 45% of rows (head and upper torso) to ensure rotation and positioning lock onto the person's face.
7. **Cropping & Dual-Resolution Output:**
   - Frames are physically cropped to the shot bounding box to save 75% file size.
   - `public/frames/lg/`: Quality 80 WebP (desktop).
   - `public/frames/sm/`: 50% downscaled Quality 78 WebP (mobile).
8. **Manifest Generation:** Saved to `public/frames/manifest.json`.

---

## 5. Director & Scroll Engine Architecture

### 1. Unified Single-Clock Loop (`director.ts`)
```ts
// Lenis + GSAP Ticker synchronization
this.lenis = new Lenis({
  lerp: 0.075,
  smoothWheel: true,
  wheelMultiplier: 0.9,
  touchMultiplier: 1.4,
});

this.lenis.stop(); // Locked during preloader
gsap.ticker.lagSmoothing(0);
gsap.ticker.add((time) => {
  if (this.lenis && this.isStarted) {
    this.lenis.raf(time * 1000);
  }
  this.evaluate();
});
```

### 2. Stride-Based Frame Streaming (`frames.ts`)
Avoids loading all 192 frames upfront. The preloader completes at 25%:
1. **Step 1:** Preload Shot Boundaries (Frames 0, 27, 28, 75, 76, 162, 163, 191). Every section immediately has a keyframe.
2. **Step 2:** Load Stride 8 (Frames 0, 8, 16, 24...).
3. **Step 3:** Load Stride 4 (Frames 4, 12, 20...).
4. **Step 4:** Load Stride 2 and 1 in non-blocking batches of 6 images using `img.decode()`.
5. **Fallback Interpolation:** If an exact frame is downloading, the canvas renders the nearest loaded frame from the same shot, cross-fading smoothly with fractional interpolation:
   $$\text{frame} = f_0 + \text{frac} \times (f_1 - f_0)$$

### 3. Skewed Angular Blade Transitions
Between shots, rather than an abrupt cut, `Stage.tsx` executes a dynamic angled polygon wipe across the canvas:
- Skew angle: $\text{skew} = 0.2 \times vh$
- Slice position: $e = -\text{skew} + (vw + 2 \times \text{skew}) \times t$
- Clip outgoing frame to the right of line $(e + \text{skew}, 0) \to (e - \text{skew}, vh)$ with $+60t\text{px}$ drift.
- Clip incoming frame to the left of the same line with $-60(1-t)\text{px}$ entrance drift.

---

## 6. Section Specifications & Visual Mechanics

### 1. Hero (`Hero.tsx`)
- Giant background typography: `AYUSH` in Anton, letters staggered in with 3D rotation (`rotateX: -80deg`, `expo.out`).
- Foreground title: Editorial tracking with live status pill (`OPEN FOR OPPORTUNITIES`).
- Subject positioned at $x = 0.70$ (right side) on desktop; centered with opacity $0.85$ on mobile.

### 2. About (`About.tsx`)
- Massive statement typography: "I ARCHITECT RESILIENT SYSTEMS & CONTRIBUTE TO GLOBAL CODEBASES".
- Fast Odometer counters for metrics (Pull Requests, Production Code Lines, System Uptime).
- Subject in gesturing pose (Shot 1), positioned at $x = 0.27$ (left side).

### 3. Work (`Work.tsx`)
- **3D Project Deck:** Rendered via CSS 3D transforms (`transform-style: preserve-3d; perspective: 1500px`).
- As the user scrolls, the active card scales and tilts away (`rotateX(d * 24deg) translate3d(0, -d*12vh, d*450px)`), while upcoming cards stack with depth.
- **Sitting + Laptop Composition:**
  - Subject cropped coordinate: Head center at $x = 508\text{px}$, laptop at $x = [5, 359]\text{px}$.
  - Deck width set to `min(50vw, 840px)` at `left: 5vw`.
  - Frame positioned with head anchored at $0.73 \times vw$ and a safety clamp:
    $$\text{destX} = \min\left(0.73 \times vw - 508 \times \text{scale}, \; vw - 56\text{px} - \text{destW}\right)$$
  - This guarantees the laptop screen, keyboard, and hands are visible in the negative space beside the project cards across all screen resolutions without clipping.

### 4. Journey (`Journey.tsx`)
- Milestone cards with company names, roles, and bullet points.
- Huge animated background year indicator (`Layers.tsx` Odometer) updating from 2022 to 2026 as user scrolls through milestones.

### 5. Toolkit / Skill Orbit (`Skills.tsx` & `SkillOrbit.tsx`)
- **The System Orbiting Ayush:**
  - Nodes orbit in a 3D tilted ellipse ($\text{tiltX} = 22^\circ, \text{tiltZ} = -8^\circ$).
  - **Z-Split Depth:** Nodes with $z < 0$ render in `SkillOrbitBack` (Layer 0, behind Ayush); nodes with $z \ge 0$ render in `SkillOrbitFront` (Layer 2, in front of Ayush).
  - Central Core Hub with interactive laser beam (`<line>` SVG) connecting to the active skill node.
  - Gyroscopic mouse parallax: Cursor movement tilts the orbit ellipse interactively.

### 6. Awards (`Awards.tsx`)
- 3D Cylinder layout: Awards badges positioned along a virtual cylindrical drum using `rotateY` and `translateZ(420px)`.
- Smooth scroll scrubbing with subtle tilt and metallic badge reflection.

### 7. Contact (`Contact.tsx`)
- Fullscreen inverted theme: Background transitions to deep obsidian with crimson highlights.
- Direct mail launcher, social links, resume download button, and interactive contact form.

---

## 7. Mobile-First Responsiveness Rules

The desktop composition is cinematic and wide. Mobile (`@media (max-width: 819px)`) is **not** a shrunken desktop; it is an editorial vertical layout:

1. **No `overflow-x: hidden` Crutches:** Layout elements must strictly fit viewport boundaries via `width: 100%; max-width: 100%; min-width: 0; box-sizing: border-box`.
2. **Stable Height Units:** Use `svh` / `dvh` rather than `vh` to prevent erratic jumps when the mobile browser address bar shows or hides.
3. **Card Deck Adaptation:** The 3D fan-out deck collapses into a vertical single-card display with smooth in-place fade and soft vertical translation.
4. **Subject Layering:** On mobile, the subject is centered ($x = 0.50$), scaled to $78\%\text{–}84\%$ viewport width, anchored to the bottom, and given subtle background opacity ($0.18\text{–}0.45$) so high-contrast text and buttons remain 100% legible.

---

## 8. Exact Master Prompts to Reproduce This Site

Feed these prompts sequentially into your AI coding assistant to build an identical project from scratch:

### Master Prompt 1: Project Setup & Dependencies
```text
Initialize a high-end, 60fps scroll-driven portfolio using React 19, TypeScript, and Vite.
Install dependencies:
- gsap@^3.15.0
- lenis@^1.3.27
- @fontsource/anton
- @fontsource-variable/inter-tight
- @fontsource/jetbrains-mono
- lucide-react
- react-icons

Set up global CSS design tokens:
--red: #ff1f1f
--ink: #0d0d0d
--paper: #ffffff
--line: rgba(13, 13, 13, 0.09)
--mute: #5e5e5e

Create the 4-layer spatial layout in App.tsx:
- Layer 0: .layer-back (z-index: 0, fixed)
- Layer 1: .stage-canvas (z-index: 1, fixed HTML5 canvas)
- Layer 2: .layer-front (z-index: 2, fixed)
- Layer 3: #main-content (z-index: 3, relative scroll container)
- Layer 4: HUD, Preloader, and Cursor (z-index: 100+)
```

### Master Prompt 2: Video Rotoscoping & Frame Engine
```text
Write a Python script (process_all_frames.py) using rembg (u2net_human_seg), PIL, numpy, and scipy to process a video (video.mp4) into transparent WebP frames:
1. Extract frames at 24fps. Group into 4 shots (Hero standing, About gesturing, Work seated with laptop, Toolkit/Awards presentation).
2. For the seated laptop shot, preserve the desk and laptop by sampling background color and applying morphological opening and dilation on pixels with channel variance > 8.0.
3. Defringe alpha edges against the sampled background color using rgb = (rgb - (1-a)*bg)/a to eliminate white fringe halos.
4. Calculate shot bounding boxes and the alpha-weighted centroid (cx) of the head/upper torso.
5. Physically crop frames to the bounding box and save dual resolutions: public/frames/lg/ (Quality 80) and public/frames/sm/ (Quality 78, 50% scale).
6. Output public/frames/manifest.json containing image dimensions, shot ranges, boxes, and cx values.
```

### Master Prompt 3: Scroll Director & Frame Streaming Engine
```text
Create the scroll director and frame streaming engine in src/engine/:
1. frames.ts (FrameStore):
   - Fetch manifest.json. Load shot boundary keyframes first.
   - Stream remaining frames in stride order (Stride 8 -> Stride 4 -> Stride 2 -> Stride 1) in batches of 6 using img.decode().
   - Signal preloader completion once 25% of frames are cached.
   - Provide nearest-frame fallback with fractional frame interpolation.
2. director.ts (Director):
   - Initialize Lenis with { lerp: 0.075, smoothWheel: true, wheelMultiplier: 0.9, touchMultiplier: 1.4 }.
   - Keep Lenis stopped during preloader.
   - Drive Lenis and scene evaluation strictly from gsap.ticker with lagSmoothing(0).
   - Track scene progress (p, enter, exit, vis) and compute current fractional frame.
   - Manage angled blade transitions between consecutive shots.
```

### Master Prompt 4: Canvas Stage & Blade Transitions
```text
Build src/components/Stage.tsx:
1. Render transparent WebP frames onto an HTML5 Canvas scaled to window.devicePixelRatio.
2. Compute destination rectangles from shot.box and target scene parameters.
3. For Shot 2 (sitting + laptop):
   - Anchor head center (focusX = 508.0) at 73% viewport width.
   - Clamp right edge so destX + destW <= vw - 56px to prevent clipping.
   - Ground bottom edge firmly to the viewport bottom (destY = vh - destH).
4. Implement skewed blade transition:
   - When transitioning between shots, draw a skewed diagonal polygon clip from (e + skew, 0) to (e - skew, vh).
   - Draw outgoing shot to the right with +60t px shift; draw incoming shot to the left with -60(1-t) px shift.
```

### Master Prompt 5: 3D Work Deck & Orbiting Toolkit
```text
1. Build src/scenes/Work.tsx:
   - 3D Card Deck with preserve-3d and perspective: 1500px.
   - Set desktop width to min(50vw, 840px) at left: 5vw so the sitting subject and laptop are framed intentionally beside the cards.
   - As scroll progress changes, animate active card away with tilt and depth while upcoming cards rise.
2. Build src/components/SkillOrbit.tsx:
   - Create a 3D elliptical orbit around the subject.
   - Split nodes: z < 0 rendered in Layer 0 (behind subject canvas); z >= 0 rendered in Layer 2 (in front of subject canvas).
   - Render central core hub and dynamic SVG connecting laser line to the active/hovered node.
   - Add gyroscopic mouse tilt via gsap.ticker.
```

### Master Prompt 6: Mobile-First Optimization & Hardening
```text
Harden the entire portfolio for mobile viewports (max-width: 819px):
1. In styles.css, ensure no element causes horizontal overflow (scrollWidth === clientWidth).
2. Override .work-deck-container to width: auto; max-width: min(calc(100vw - 32px), 640px); margin-inline: auto; height: 75svh;.
3. Collapse 3D transform depth on mobile to simple in-place vertical opacity cross-fades.
4. Scale canvas subject to ~80% width with reduced opacity behind frosted cards so text is 100% legible.
5. Verify via headless Chrome across 1920x1080, 1600x900, 1440x900, 1366x768, and 390x844.
```

---

## 9. Common Pitfalls & Critical Rules

1. **The Double-Crop Trap:**
   - If WebP frames are physically cropped to `box: [min_x, min_y, max_x, max_y]`, the image width is `box[2] - box[0]`.
   - Never apply the original uncropped frame coordinates inside `drawImage` source rect. Treat the cropped image as `(0, 0, croppedWidth, croppedHeight)`.
2. **Never Run Multiple RAF Loops:**
   - Never use `window.requestAnimationFrame` inside components alongside Lenis and GSAP.
   - Run everything through `gsap.ticker.add()`. This guarantees zero jitter or frame desynchronization.
3. **SVG Drop Shadows:**
   - Always apply crisp drop shadows to SVGs: `filter: drop-shadow(0 2px 8px rgba(0, 0, 0, 0.45));` to prevent vector icons from vanishing when passing over mixed white/red backgrounds.
4. **Vercel / Production Deployment:**
   - In `package.json`, ensure build script is `"build": "tsc && vite build"`.
   - In `vercel.json`, specify `"framework": "vite"` and `"buildCommand": "npm run build"` to avoid Next.js auto-detection conflicts.

---
<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
