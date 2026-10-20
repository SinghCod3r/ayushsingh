export interface ShotManifest {
  from: number;
  to: number;
  box: [number, number, number, number]; // [min_x, min_y, max_x, max_y]
  cx: number;
}

export interface FrameManifest {
  w: number;
  h: number;
  count: number;
  shots: ShotManifest[];
}

export type FrameLoadProgressCallback = (loaded: number, total: number, readyForPreloader: boolean) => void;

class FrameStore {
  private manifest: FrameManifest | null = null;
  private frames: Map<number, HTMLImageElement> = new Map();
  private loadedSet: Set<number> = new Set();
  private loadingSet: Set<number> = new Set();
  private callbacks: Set<FrameLoadProgressCallback> = new Set();
  private isSmallScreen = false;
  private totalFrames = 192;
  private isInitialized = false;

  public async init(onProgress?: FrameLoadProgressCallback): Promise<FrameManifest> {
    if (onProgress) {
      this.callbacks.add(onProgress);
    }

    if (this.isInitialized && this.manifest) {
      return this.manifest;
    }

    this.isSmallScreen = typeof window !== 'undefined' && window.innerWidth < 820;

    // Fetch manifest.json
    try {
      const res = await fetch('./frames/manifest.json');
      if (!res.ok) {
        throw new Error(`Failed to load manifest: ${res.status}`);
      }
      this.manifest = (await res.json()) as FrameManifest;
      this.totalFrames = this.manifest.count;
    } catch (err) {
      console.warn('Manifest fetch failed, using fallback manifest structure:', err);
      // Fallback manifest if network issues arise
      this.manifest = {
        w: 1600,
        h: 900,
        count: 192,
        shots: [
          { from: 0, to: 27, box: [200, 30, 1400, 900], cx: 0.5 },
          { from: 28, to: 75, box: [200, 30, 1400, 900], cx: 0.5 },
          { from: 76, to: 162, box: [200, 30, 1400, 900], cx: 0.5 },
          { from: 163, to: 191, box: [200, 30, 1400, 900], cx: 0.5 },
        ],
      };
      this.totalFrames = 192;
    }

    this.isInitialized = true;
    this.startStreaming();
    return this.manifest;
  }

  public getManifest(): FrameManifest | null {
    return this.manifest;
  }

  public getShotForFrame(frameIndex: number): ShotManifest | null {
    if (!this.manifest) return null;
    const idx = Math.max(0, Math.min(Math.floor(frameIndex), this.totalFrames - 1));
    for (const shot of this.manifest.shots) {
      if (idx >= shot.from && idx <= shot.to) {
        return shot;
      }
    }
    return this.manifest.shots[0];
  }

  public getLoadedCount(): number {
    return this.loadedSet.size;
  }

  public getFrame(index: number): { img: HTMLImageElement; shot: ShotManifest } | null {
    if (!this.manifest) return null;
    const targetIdx = Math.max(0, Math.min(Math.floor(index), this.totalFrames - 1));
    const shot = this.getShotForFrame(targetIdx);
    if (!shot) return null;

    // Check if the exact target frame is loaded
    if (this.frames.has(targetIdx)) {
      return { img: this.frames.get(targetIdx)!, shot };
    }

    // Fall back to nearest loaded frame from the same shot
    let bestDist = Infinity;
    let bestIdx = -1;

    for (let f = shot.from; f <= shot.to; f++) {
      if (this.frames.has(f)) {
        const dist = Math.abs(f - targetIdx);
        if (dist < bestDist) {
          bestDist = dist;
          bestIdx = f;
        }
      }
    }

    if (bestIdx !== -1 && this.frames.has(bestIdx)) {
      return { img: this.frames.get(bestIdx)!, shot };
    }

    // If none from same shot yet, check any loaded frame
    if (this.frames.size > 0) {
      const firstAvailable = this.frames.values().next().value;
      if (firstAvailable) {
        return { img: firstAvailable, shot };
      }
    }

    return null;
  }

  private async loadSingleFrame(idx: number): Promise<void> {
    if (this.loadedSet.has(idx) || this.loadingSet.has(idx)) return;
    this.loadingSet.add(idx);

    const folder = this.isSmallScreen ? 'sm' : 'lg';
    const numStr = String(idx).padStart(3, '0');
    const url = `./frames/${folder}/f${numStr}.webp`;

    const img = new Image();
    img.src = url;

    try {
      await img.decode();
      this.frames.set(idx, img);
      this.loadedSet.add(idx);
    } catch {
      // If error (or webp issue), silently try to continue
    } finally {
      this.loadingSet.delete(idx);
      this.notifyProgress();
    }
  }

  private notifyProgress() {
    const loaded = this.loadedSet.size;
    const total = this.totalFrames;
    const quarter = Math.ceil(total / 4);
    const ready = loaded >= quarter;

    this.callbacks.forEach((cb) => cb(loaded, total, ready));
  }

  private async startStreaming() {
    if (!this.manifest) return;

    // 1. Load shot boundaries first
    const boundaryFrames: number[] = [];
    for (const shot of this.manifest.shots) {
      if (!boundaryFrames.includes(shot.from)) boundaryFrames.push(shot.from);
      if (!boundaryFrames.includes(shot.to)) boundaryFrames.push(shot.to);
    }

    await Promise.all(boundaryFrames.map((f) => this.loadSingleFrame(f)));

    // 2. Load in stride order: 8 -> 4 -> 2 -> 1
    const strides = [8, 4, 2, 1];
    for (const stride of strides) {
      const batch: number[] = [];
      for (let i = 0; i < this.totalFrames; i += stride) {
        if (!this.loadedSet.has(i) && !this.loadingSet.has(i)) {
          batch.push(i);
        }
      }

      // Load batch in chunks to avoid network congestion
      const chunkSize = 6;
      for (let c = 0; c < batch.length; c += chunkSize) {
        const chunk = batch.slice(c, c + chunkSize);
        await Promise.all(chunk.map((idx) => this.loadSingleFrame(idx)));
      }
    }
  }

  public onProgress(cb: FrameLoadProgressCallback): () => void {
    this.callbacks.add(cb);
    return () => {
      this.callbacks.delete(cb);
    };
  }
}

export const frameStore = new FrameStore();
