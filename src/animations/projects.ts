import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function initProjectsAnimation(container: HTMLElement) {
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const ctx = gsap.context(() => {
    if (prefersReducedMotion) {
      gsap.set(
        [
          '.projects-section .section-header-block',
          '.conduit-receiver-line',
          '.conduit-target-cross',
          '.project-showcase-card',
          '.project-title',
          '.project-num-row',
          '.project-preview-wrap',
          '.project-oneliner',
          '.project-description',
          '.tech-chip',
          '.project-actions-row',
        ],
        {
          opacity: 1,
          y: 0,
          scale: 1,
          strokeDashoffset: 0,
        }
      );
      return;
    }

    // 0. Conduit Receiver Entrance (Resolution line from Skills Topology touches Selected Work)
    const receiverTl = gsap.timeline({
      scrollTrigger: {
        trigger: container,
        start: 'top 85%',
        end: 'top 45%',
        scrub: 0.6,
      },
    });

    receiverTl.fromTo(
      '.conduit-receiver-line',
      { strokeDasharray: 100, strokeDashoffset: 100 },
      { strokeDashoffset: 0, duration: 0.5, ease: 'none' }
    );

    receiverTl.fromTo(
      '.conduit-target-cross',
      { scale: 0.5, opacity: 0 },
      { scale: 1, opacity: 1, duration: 0.25, ease: 'back.out(2)' },
      '-=0.1'
    );

    // 1. Projects Section Header enters with commanding typography
    gsap.from('.projects-section .section-header-block', {
      scrollTrigger: {
        trigger: container,
        start: 'top 82%',
        toggleActions: 'play none none none',
        once: true,
      },
      y: 35,
      opacity: 0,
      duration: 0.7,
      ease: 'power3.out',
    });

    // 2. Each Project Showcase Card progressive entrance
    // Sequence: CONDUIT RESOLUTION → CARD EMERGENCE → TITLE → VISUAL → DESCRIPTION → TECH → CTA
    const cards = gsap.utils.toArray<HTMLElement>('.project-showcase-card');

    cards.forEach((card, index) => {
      // First card emerges with stronger focal link to the incoming conduit
      if (index === 0) {
        gsap.from(card, {
          scrollTrigger: {
            trigger: card,
            start: 'top 85%',
            toggleActions: 'play none none none',
            once: true,
          },
          y: 40,
          scale: 0.95,
          opacity: 0.2,
          duration: 0.7,
          ease: 'power3.out',
        });
      } else {
        // Subsequent cards rise into position with subtle depth
        gsap.from(card, {
          scrollTrigger: {
            trigger: card,
            start: 'top 82%',
            toggleActions: 'play none none none',
            once: true,
          },
          y: 45,
          scale: 0.98,
          opacity: 0,
          duration: 0.65,
          ease: 'power3.out',
        });
      }

      // Internal progressive reveal (fast & crisp: user never waits)
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: card,
          start: 'top 80%',
          toggleActions: 'play none none none',
          once: true,
        },
      });

      // Step 1: Project Title & Number
      tl.from(card.querySelectorAll('.project-num-row, .project-title'), {
        y: 18,
        opacity: 0,
        stagger: 0.06,
        duration: 0.38,
        ease: 'power2.out',
      })
        // Step 2: Visual Preview
        .from(
          card.querySelector('.project-preview-wrap'),
          {
            scale: 0.96,
            opacity: 0,
            duration: 0.42,
            ease: 'power2.out',
          },
          '-=0.2'
        )
        // Step 3: Description & One-Liner
        .from(
          card.querySelectorAll('.project-oneliner, .project-description'),
          {
            y: 14,
            opacity: 0,
            stagger: 0.06,
            duration: 0.38,
            ease: 'power2.out',
          },
          '-=0.25'
        )
        // Step 4: Tech Chips
        .from(
          card.querySelectorAll('.project-tech-chips .tech-chip'),
          {
            y: 10,
            opacity: 0,
            stagger: 0.03,
            duration: 0.3,
            ease: 'power2.out',
          },
          '-=0.2'
        )
        // Step 5: Action Link / CTA
        .from(
          card.querySelector('.project-actions-row'),
          {
            y: 12,
            opacity: 0,
            duration: 0.32,
            ease: 'power2.out',
          },
          '-=0.15'
        );

      // Subtle parallax on project preview visual
      const visual = card.querySelector('.project-preview-visual');
      if (visual) {
        gsap.to(visual, {
          yPercent: -8,
          ease: 'none',
          scrollTrigger: {
            trigger: card,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 0.8,
          },
        });
      }
    });
  }, container);

  return () => ctx.revert();
}
