import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function initJourneyAnimation(container: HTMLElement) {
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const ctx = gsap.context(() => {
    if (prefersReducedMotion) {
      gsap.set(['.journey-spine-fill', '.milestone-bullet', '.milestone-content-card'], {
        scaleY: 1,
        scale: 1,
        opacity: 1,
        y: 0,
      });
      return;
    }

    // 1. Timeline spine drawing as user scrolls through the career track
    gsap.fromTo(
      '.journey-spine-fill',
      { scaleY: 0 },
      {
        scaleY: 1,
        transformOrigin: 'top center',
        ease: 'none',
        scrollTrigger: {
          trigger: '.journey-timeline-track',
          start: 'top 75%',
          end: 'bottom 80%',
          scrub: 0.4,
        },
      }
    );

    // 2. Sequential reveal of milestone items (subtle, no excessive 3D)
    const items = gsap.utils.toArray<HTMLElement>('.journey-milestone-item');

    items.forEach((item) => {
      const itemTl = gsap.timeline({
        scrollTrigger: {
          trigger: item,
          start: 'top 82%',
          toggleActions: 'play none none none',
          once: true,
        },
      });

      itemTl.from(item.querySelector('.milestone-bullet'), {
        scale: 0,
        duration: 0.35,
        ease: 'back.out(1.8)',
      })
        .from(
          item.querySelector('.milestone-content-card'),
          {
            y: 26,
            opacity: 0,
            duration: 0.55,
            ease: 'power2.out',
          },
          '-=0.18'
        );
    });
  }, container);

  return () => ctx.revert();
}
