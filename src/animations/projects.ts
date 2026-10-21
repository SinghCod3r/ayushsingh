import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from 'gsap/SplitText';
import { MorphSVGPlugin } from 'gsap/MorphSVGPlugin';
import { DrawSVGPlugin } from 'gsap/DrawSVGPlugin';

gsap.registerPlugin(ScrollTrigger, SplitText, MorphSVGPlugin, DrawSVGPlugin);

export function initProjectsAnimation(container: HTMLElement) {
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const ctx = gsap.context(() => {
    if (prefersReducedMotion) {
      gsap.set(
        [
          '.projects-section .section-header-block',
          '#projects-conduit-line',
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
          drawSVG: '100%',
          clearProps: 'transform',
        }
      );
      return;
    }

    // -------------------------------------------------------------------------
    // 0. CONDUIT RECEIVER ENTRANCE (Handoff from Skills Topology)
    // -------------------------------------------------------------------------
    gsap.set('#projects-conduit-line', { drawSVG: '0%' });
    gsap.set('.conduit-target-cross', { scale: 0.5, opacity: 0 });

    const receiverTl = gsap.timeline({
      scrollTrigger: {
        trigger: container,
        start: 'top 88%',
        end: 'top 45%',
        scrub: 0.6,
      },
    });

    receiverTl.to(
      '#projects-conduit-line',
      { drawSVG: '100%', duration: 0.5, ease: 'none' },
      0
    );

    receiverTl.to(
      '.conduit-target-cross',
      { scale: 1, opacity: 1, duration: 0.25, ease: 'back.out(2)' },
      0.35
    );

    // -------------------------------------------------------------------------
    // 1. SECTION HEADER: SplitText Typographic Reveal & Reticle Morph
    // -------------------------------------------------------------------------
    const projectsTitleSplit = SplitText.create('#projects .section-title-large', {
      type: 'words, chars',
      autoSplit: true,
      charsClass: 'projects-title-char',
    });

    gsap.from(projectsTitleSplit.chars, {
      scrollTrigger: {
        trigger: '#projects .section-header-block',
        start: 'top 82%',
        toggleActions: 'play none none none',
        once: true,
      },
      y: 32,
      opacity: 0,
      stagger: 0.02,
      duration: 0.65,
      ease: 'power3.out',
    });

    // Morph section reticle from circle (Skills) into production square (Projects)
    gsap.to('#projects-reticle-path', {
      morphSVG: 'M2 2h10v10H2Z',
      scrollTrigger: {
        trigger: container,
        start: 'top 75%',
        toggleActions: 'play reverse play reverse',
      },
      duration: 0.5,
      ease: 'power2.inOut',
    });

    // -------------------------------------------------------------------------
    // 2. PROJECT SHOWCASE CARDS: Transformation & Emergence
    // -------------------------------------------------------------------------
    const cards = gsap.utils.toArray<HTMLElement>('.project-showcase-card');

    cards.forEach((card, index) => {
      if (index === 0) {
        // FIRST PROJECT: Emerges directly from the incoming conduit focal point via Scrub
        // Controlled by scroll progress so it reverses seamlessly when scrolling up
        const firstCardTl = gsap.timeline({
          scrollTrigger: {
            trigger: card,
            start: 'top 88%',
            end: 'top 35%',
            scrub: 0.8,
          },
        });

        // Frame expands outward from the focal contact point
        firstCardTl.fromTo(
          card,
          {
            scale: 0.94,
            y: 45,
            opacity: 0.15,
          },
          {
            scale: 1,
            y: 0,
            opacity: 1,
            duration: 0.5,
            ease: 'power2.out',
          },
          0
        );

        // Visual preview expands outward
        firstCardTl.fromTo(
          card.querySelector('.project-preview-wrap'),
          {
            scale: 0.94,
            opacity: 0.3,
          },
          {
            scale: 1,
            opacity: 1,
            duration: 0.45,
            ease: 'power2.out',
          },
          0.1
        );

        // Metadata marker emerges from datum
        firstCardTl.fromTo(
          card.querySelectorAll('.project-num-row, .project-title'),
          {
            y: 18,
            opacity: 0,
          },
          {
            y: 0,
            opacity: 1,
            stagger: 0.05,
            duration: 0.35,
            ease: 'power2.out',
          },
          0.15
        );

        // Description and tech chips illuminate
        firstCardTl.fromTo(
          card.querySelectorAll('.project-oneliner, .project-description, .tech-chip'),
          {
            y: 12,
            opacity: 0,
          },
          {
            y: 0,
            opacity: 1,
            stagger: 0.02,
            duration: 0.3,
            ease: 'power2.out',
          },
          0.25
        );

        firstCardTl.fromTo(
          card.querySelector('.project-actions-row'),
          {
            y: 10,
            opacity: 0,
          },
          {
            y: 0,
            opacity: 1,
            duration: 0.25,
            ease: 'power2.out',
          },
          0.35
        );
      } else {
        // Subsequent projects: Clean progressive architectural elevation
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

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: card,
            start: 'top 80%',
            toggleActions: 'play none none none',
            once: true,
          },
        });

        tl.from(card.querySelectorAll('.project-num-row, .project-title'), {
          y: 18,
          opacity: 0,
          stagger: 0.06,
          duration: 0.38,
          ease: 'power2.out',
        })
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
      }

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
