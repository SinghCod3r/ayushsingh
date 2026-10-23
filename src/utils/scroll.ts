import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

let lenisInstance: Lenis | null = null;

export function initSmoothScroll(): Lenis | null {
  if (typeof window === 'undefined') {
    return null;
  }

  // On mobile devices (< 768px), use native scrolling for lag-free touch response
  if (window.innerWidth < 768) {
    return null;
  }

  // Check reduced motion
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (lenisInstance) {
    return lenisInstance;
  }

  lenisInstance = new Lenis({
    duration: prefersReducedMotion ? 0.1 : 1.2,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // standard exponential ease-out
    orientation: 'vertical',
    gestureOrientation: 'vertical',
    smoothWheel: !prefersReducedMotion,
    wheelMultiplier: 1,
    touchMultiplier: 1.5,
  });

  // Connect Lenis to ScrollTrigger
  lenisInstance.on('scroll', ScrollTrigger.update);

  // Synchronize GSAP ticker with Lenis raf
  gsap.ticker.add((time) => {
    lenisInstance?.raf(time * 1000);
  });

  // Turn off GSAP's lag smoothing to prevent desynchronization
  gsap.ticker.lagSmoothing(0);

  return lenisInstance;
}

export function getLenis(): Lenis | null {
  return lenisInstance;
}

export function scrollToTarget(target: string | HTMLElement | number, offset: number = 0) {
  if (typeof target === 'number') {
    if (lenisInstance) {
      lenisInstance.scrollTo(target, {
        duration: 1.2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      });
    } else {
      window.scrollTo({ top: target, behavior: 'smooth' });
    }
    return;
  }

  if (!lenisInstance) {
    const el = typeof target === 'string' ? document.querySelector(target) : target;
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
    return;
  }

  lenisInstance.scrollTo(target, {
    offset,
    duration: 1.2,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
  });
}

export function setScrollLocked(locked: boolean) {
  if (!lenisInstance) return;
  if (locked) {
    lenisInstance.stop();
    document.body.style.overflow = 'hidden';
  } else {
    lenisInstance.start();
    document.body.style.overflow = '';
  }
}

