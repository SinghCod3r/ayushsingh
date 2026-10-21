import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function initAchievementsAnimation(container: HTMLElement) {
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const ctx = gsap.context(() => {
    if (prefersReducedMotion) {
      gsap.set(['.achievements-keynote-banner', '.achievements-badge-card'], {
        opacity: 1,
        y: 0,
        scale: 1,
      });
      return;
    }

    // 1. Keynote Speaker Banner entrance
    gsap.from('.achievements-keynote-banner', {
      scrollTrigger: {
        trigger: '.achievements-keynote-banner',
        start: 'top 82%',
        toggleActions: 'play none none none',
        once: true,
      },
      y: 35,
      opacity: 0,
      duration: 0.7,
      ease: 'power3.out',
    });

    // 2. Fast, subtle staggered credential badges
    gsap.from('.achievements-badge-card', {
      scrollTrigger: {
        trigger: '.achievements-grid',
        start: 'top 82%',
        toggleActions: 'play none none none',
        once: true,
      },
      y: 24,
      opacity: 0,
      stagger: 0.08,
      duration: 0.52,
      ease: 'power2.out',
    });
  }, container);

  return () => ctx.revert();
}
