import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function initContactAnimation(container: HTMLElement) {
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const ctx = gsap.context(() => {
    if (prefersReducedMotion) {
      gsap.set(['.contact-status-badge', '.contact-headline-line', '.contact-action-item', '.contact-subfooter'], {
        opacity: 1,
        y: 0,
      });
      return;
    }

    // 1. Status pill & Section number
    gsap.from('.contact-section .section-header-block', {
      scrollTrigger: {
        trigger: container,
        start: 'top 85%',
        toggleActions: 'play none none none',
        once: true,
      },
      y: 20,
      opacity: 0,
      duration: 0.6,
      ease: 'power2.out',
    });

    // 2. Monumental Outro Headline: dominant typography entrance
    gsap.from('.contact-headline-line', {
      scrollTrigger: {
        trigger: '.contact-headline-wrap',
        start: 'top 82%',
        toggleActions: 'play none none none',
        once: true,
      },
      y: 50,
      opacity: 0,
      stagger: 0.12,
      duration: 0.85,
      ease: 'power3.out',
    });

    // 3. Action Hubs (Email direct dispatch + verified connect links)
    gsap.from('.contact-action-item', {
      scrollTrigger: {
        trigger: '.contact-actions-grid',
        start: 'top 85%',
        toggleActions: 'play none none none',
        once: true,
      },
      y: 28,
      opacity: 0,
      stagger: 0.12,
      duration: 0.65,
      ease: 'power2.out',
    });

    // 4. Subfooter with breathing room
    gsap.from('.contact-subfooter', {
      scrollTrigger: {
        trigger: '.contact-subfooter',
        start: 'top 95%',
        toggleActions: 'play none none none',
        once: true,
      },
      opacity: 0,
      duration: 0.6,
      ease: 'power2.out',
    });
  }, container);

  return () => ctx.revert();
}
