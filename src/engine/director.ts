import Lenis from 'lenis';
import gsap from 'gsap';

export interface SceneConfig {
  id: 'hero' | 'about' | 'work' | 'journey' | 'skills' | 'awards' | 'contact';
  from: number;
  to: number;
  x: number;
  k: number;
  label: string;
  vhHeight: number; // e.g. 230vh -> 2.3
}

export const SCENES: SceneConfig[] = [
  {
    id: 'hero',
    label: 'Hello',
    from: 0,
    to: 27,
    x: 0.70,
    k: 1.0,
    vhHeight: 2.3,
  },
  {
    id: 'about',
    label: 'About',
    from: 28,
    to: 75,
    x: 0.27,
    k: 1.0,
    vhHeight: 2.8,
  },
  {
    id: 'work',
    label: 'Work',
    from: 76,
    to: 162,
    x: 0.77,
    k: 0.86,
    vhHeight: 4.6,
  },
  {
    id: 'journey',
    label: 'Journey',
    from: 163,
    to: 180,
    x: 0.26,
    k: 1.0,
    vhHeight: 2.4,
  },
  {
    id: 'skills',
    label: 'Toolkit',
    from: 180,
    to: 187,
    x: 0.50,
    k: 0.98,
    vhHeight: 2.8,
  },
  {
    id: 'awards',
    label: 'Awards',
    from: 187,
    to: 191,
    x: 0.75,
    k: 1.0,
    vhHeight: 3.2,
  },
  {
    id: 'contact',
    label: 'Contact',
    from: 27,
    to: 0,
    x: 0.50,
    k: 1.0,
    vhHeight: 2.4,
  },
];

export interface SectionMetrics {
  id: string;
  top: number;
  height: number;
}

export interface SceneProgress {
  id: string;
  p: number;
  enter: number;
  exit: number;
  vis: number;
}

export interface TransitionState {
  isTransitioning: boolean;
  t: number;
  fromScene: SceneConfig;
  toScene: SceneConfig;
  fromFrame: number;
  toFrame: number;
}

export interface DirectorState {
  y: number;
  vh: number;
  vw: number;
  activeSceneIndex: number;
  activeScene: SceneConfig;
  currentFrame: number;
  scenesProgress: Record<string, SceneProgress>;
  transition: TransitionState | null;
  overallProgress: number;
}

type DirectorListener = (state: DirectorState) => void;

function clamp(val: number, min = 0, max = 1): number {
  return Math.min(Math.max(val, min), max);
}

function easeInOutSine(x: number): number {
  return -(Math.cos(Math.PI * x) - 1) / 2;
}

class Director {
  private lenis: Lenis | null = null;
  private listeners: Set<DirectorListener> = new Set();
  private sectionElements: Map<string, HTMLElement> = new Map();
  private sectionMetrics: Map<string, SectionMetrics> = new Map();
  private resizeObserver: ResizeObserver | null = null;
  private isStarted = false;
  private currentY = 0;
  private targetY = 0;

  constructor() {
    if (typeof window !== 'undefined') {
      history.scrollRestoration = 'manual';
    }
  }

  public init() {
    if (typeof window === 'undefined' || this.lenis) return;

    // Configure Lenis exactly as instructed:
    // { lerp: 0.075, smoothWheel: true, wheelMultiplier: 0.9, touchMultiplier: 1.4 }
    this.lenis = new Lenis({
      lerp: 0.075,
      smoothWheel: true,
      wheelMultiplier: 0.9,
      touchMultiplier: 1.4,
    });

    // Keep Lenis stopped until preloader finishes
    this.lenis.stop();

    // Drive Lenis from gsap.ticker
    gsap.ticker.lagSmoothing(0);
    gsap.ticker.add(this.onTick);

    this.lenis.on('scroll', (e: { scroll: number }) => {
      this.currentY = e.scroll;
    });

    // Setup ResizeObserver to cache tops and heights
    this.resizeObserver = new ResizeObserver(() => {
      this.updateMetrics();
    });

    window.addEventListener('resize', this.onResize);
    this.updateMetrics();
  }

  private onTick = (time: number, deltaTime: number) => {
    if (this.lenis && this.isStarted) {
      this.lenis.raf(time * 1000);
    }
    this.evaluate();
  };

  private onResize = () => {
    this.updateMetrics();
  };

  public registerSection(id: string, el: HTMLElement) {
    this.sectionElements.set(id, el);
    this.resizeObserver?.observe(el);
    this.updateMetrics();
  }

  public unregisterSection(id: string) {
    const el = this.sectionElements.get(id);
    if (el) {
      this.resizeObserver?.unobserve(el);
      this.sectionElements.delete(id);
    }
    this.sectionMetrics.delete(id);
  }

  public updateMetrics() {
    if (typeof window === 'undefined') return;
    const vh = window.innerHeight;
    const scrollY = window.scrollY || window.pageYOffset || 0;

    this.sectionElements.forEach((el, id) => {
      const rect = el.getBoundingClientRect();
      const top = rect.top + scrollY;
      const height = rect.height;
      this.sectionMetrics.set(id, { id, top, height });
    });
  }

  public start() {
    this.isStarted = true;
    if (this.lenis) {
      this.lenis.start();
    }
    this.updateMetrics();
  }

  public subscribe(listener: DirectorListener): () => void {
    this.listeners.add(listener);
    return () => {
      this.listeners.delete(listener);
    };
  }

  public scrollToSection(index: number) {
    if (index < 0 || index >= SCENES.length || !this.lenis) return;
    const scene = SCENES[index];
    const metrics = this.sectionMetrics.get(scene.id);
    if (!metrics) return;

    // Smooth scroll over 2.2s using easeOutQuart
    this.lenis.scrollTo(metrics.top, {
      duration: 2.2,
      easing: (t: number) => 1 - Math.pow(1 - t, 4), // easeOutQuart
    });
  }

  public evaluate() {
    if (typeof window === 'undefined') return;
    const y = this.currentY;
    const vh = window.innerHeight;
    const vw = window.innerWidth;

    const lead = 0.78 * vh;
    const span = 0.62 * vh;

    // Calculate each scene progress
    const scenesProgress: Record<string, SceneProgress> = {};
    SCENES.forEach((scene) => {
      const metrics = this.sectionMetrics.get(scene.id) || {
        id: scene.id,
        top: 0,
        height: scene.vhHeight * vh,
      };
      const top = metrics.top;
      const h = metrics.height;

      const enter = clamp((y - (top - vh)) / vh);
      const p = clamp((y - top) / Math.max(1, h - vh));
      const exit = clamp((y - (top + h - vh)) / vh);
      const vis = clamp(Math.min(enter * 1.6, 1 - exit * 2.2));

      scenesProgress[scene.id] = { id: scene.id, p, enter, exit, vis };
    });

    // Active scene is the last scene where y >= top - lead
    let activeIndex = 0;
    for (let i = 0; i < SCENES.length; i++) {
      const scene = SCENES[i];
      const metrics = this.sectionMetrics.get(scene.id);
      if (metrics && y >= metrics.top - lead) {
        activeIndex = i;
      }
    }
    const activeScene = SCENES[activeIndex];
    const activeMetrics = this.sectionMetrics.get(activeScene.id);
    const activeTop = activeMetrics ? activeMetrics.top : 0;
    const activeProg = scenesProgress[activeScene.id];

    // Frame value is fractional: from + (to - from) * p
    let currentFrame = activeScene.from + (activeScene.to - activeScene.from) * activeProg.p;

    // Check transition with previous or next scene
    let transition: TransitionState | null = null;

    if (activeIndex > 0 && activeMetrics) {
      // Transition between previous scene's last frame and next scene's first frame
      const tRaw = clamp((y - (activeTop - lead)) / span);
      if (tRaw < 1.0) {
        const t = easeInOutSine(tRaw);
        const prevScene = SCENES[activeIndex - 1];
        if (prevScene.to !== activeScene.from) {
          transition = {
            isTransitioning: true,
            t,
            fromScene: prevScene,
            toScene: activeScene,
            fromFrame: prevScene.to,
            toFrame: activeScene.from,
          };
        }
      }
    }

    const docHeight = document.documentElement.scrollHeight - vh;
    const overallProgress = clamp(y / Math.max(1, docHeight));

    const state: DirectorState = {
      y,
      vh,
      vw,
      activeSceneIndex: activeIndex,
      activeScene,
      currentFrame,
      scenesProgress,
      transition,
      overallProgress,
    };

    // Notify listeners
    this.listeners.forEach((fn) => fn(state));
  }

  public destroy() {
    gsap.ticker.remove(this.onTick);
    this.lenis?.destroy();
    this.lenis = null;
    this.resizeObserver?.disconnect();
    this.listeners.clear();
    this.sectionElements.clear();
    this.sectionMetrics.clear();
    if (typeof window !== 'undefined') {
      window.removeEventListener('resize', this.onResize);
    }
  }
}

export const director = new Director();

