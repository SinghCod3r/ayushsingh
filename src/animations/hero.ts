import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from 'gsap/SplitText';
import { MotionPathPlugin } from 'gsap/MotionPathPlugin';
import { MorphSVGPlugin } from 'gsap/MorphSVGPlugin';
import { DrawSVGPlugin } from 'gsap/DrawSVGPlugin';

gsap.registerPlugin(ScrollTrigger, SplitText, MotionPathPlugin, MorphSVGPlugin, DrawSVGPlugin);

export function initHeroAnimation(container: HTMLElement) {
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const ctx = gsap.context(() => {
    if (prefersReducedMotion) {
      gsap.set(
        [
          '.hero-badge',
          '.hero-subheading',
          '.hero-title-line',
          '.hero-portrait-wrap',
          '.hero-portrait-backdrop',
          '.hero-portrait-img',
          '.hero-hud-card',
          '.hero-meta-item',
          '.hero-scroll-cue',
          '.hero-about-tracer',
          '#hero-about-line',
        ],
        {
          opacity: 1,
          x: 0,
          y: 0,
          scale: 1,
          drawSVG: '100%',
          clearProps: 'transform',
        }
      );
      return;
    }

    // -------------------------------------------------------------------------
    // 1. Initial Calm & Monumental Entrance Sequence
    // -------------------------------------------------------------------------
    const entranceTl = gsap.timeline({
      defaults: { ease: 'power3.out' },
      delay: 0.1,
    });

    // Step 1: Editorial meta bar establishes itself
    entranceTl.from('.hero-badge', {
      opacity: 0,
      y: -12,
      duration: 0.55,
    });

    // Step 2: Primary typography with SplitText
    entranceTl.from(
      '.hero-subheading',
      {
        opacity: 0,
        y: 16,
        duration: 0.5,
      },
      '-=0.3'
    );

    // Split monumental title into words and characters
    const titleSplit = SplitText.create('.hero-monument-title', {
      type: 'words, chars',
      autoSplit: true,
      charsClass: 'hero-title-char',
    });

    entranceTl.from(
      titleSplit.chars,
      {
        y: 40,
        opacity: 0,
        stagger: 0.025,
        duration: 0.65,
        ease: 'power3.out',
      },
      '-=0.35'
    );

    // Step 3: Main visual portrait & technical HUD card
    entranceTl
      .from(
        '.hero-portrait-wrap',
        {
          opacity: 0,
          scale: 0.96,
          y: 22,
          duration: 0.8,
          ease: 'power2.out',
        },
        '-=0.5'
      )
      .from(
        '.hero-hud-card',
        {
          opacity: 0,
          x: -14,
          duration: 0.5,
          ease: 'power2.out',
        },
        '-=0.4'
      );

    // Step 4: Supporting metadata (Description, Actions row, Metrics bar)
    entranceTl.from(
      '.hero-meta-item',
      {
        opacity: 0,
        y: 16,
        stagger: 0.05,
        duration: 0.6,
        ease: 'power2.out',
      },
      '-=0.45'
    );

    // Step 5: Scroll invitation
    entranceTl.from(
      '.hero-scroll-cue',
      {
        opacity: 0,
        y: 10,
        duration: 0.45,
        ease: 'power2.out',
      },
      '-=0.3'
    );

    // -------------------------------------------------------------------------
    // 2. Responsive Scroll-Driven Transformation & Hero → About Transition
    // -------------------------------------------------------------------------
    const mm = gsap.matchMedia();

    // DESKTOP (Viewport >= 1025px): Full Spatial Depth & Distinct Parallax Layers
    mm.add('(min-width: 1025px)', () => {
      // Primary typography moves upward at a deliberate monumental rate
      gsap.to('.hero-monument-title', {
        yPercent: -28,
        opacity: 0.18,
        ease: 'none',
        scrollTrigger: {
          trigger: container,
          start: 'top top',
          end: 'bottom top',
          scrub: 0.8,
        },
      });

      gsap.to('.hero-subheading', {
        yPercent: -34,
        opacity: 0.12,
        ease: 'none',
        scrollTrigger: {
          trigger: container,
          start: 'top top',
          end: 'bottom top',
          scrub: 0.8,
        },
      });

      // Supporting metadata recedes cleanly before reaching fixed navbar
      gsap.to('.hero-meta-item', {
        yPercent: -38,
        opacity: 0,
        stagger: 0.02,
        ease: 'none',
        scrollTrigger: {
          trigger: container,
          start: 'top top',
          end: '60% top',
          scrub: 0.8,
        },
      });

      // Layer 1: Backdrop line & tint
      gsap.to('.hero-portrait-backdrop', {
        yPercent: -6,
        ease: 'none',
        scrollTrigger: {
          trigger: container,
          start: 'top top',
          end: 'bottom top',
          scrub: 0.8,
        },
      });

      // Layer 2: Real visual portrait scales and moves seamlessly towards About
      gsap.to('.hero-portrait-img', {
        yPercent: -12,
        scale: 1.05,
        ease: 'none',
        scrollTrigger: {
          trigger: container,
          start: 'top top',
          end: 'bottom top',
          scrub: 0.8,
        },
      });

      // Layer 3: Technical HUD datum badge fades gracefully before section exit
      gsap.to('.hero-hud-card', {
        yPercent: -14,
        opacity: 0,
        ease: 'none',
        scrollTrigger: {
          trigger: container,
          start: 'top top',
          end: '65% top',
          scrub: 0.8,
        },
      });
    });

    // TABLET (768px <= Viewport <= 1024px)
    mm.add('(min-width: 768px) and (max-width: 1024px)', () => {
      gsap.to('.hero-monument-title', {
        yPercent: -18,
        opacity: 0.22,
        ease: 'none',
        scrollTrigger: {
          trigger: container,
          start: 'top top',
          end: 'bottom top',
          scrub: 0.8,
        },
      });

      gsap.to('.hero-meta-item', {
        yPercent: -26,
        opacity: 0,
        ease: 'none',
        scrollTrigger: {
          trigger: container,
          start: 'top top',
          end: '60% top',
          scrub: 0.8,
        },
      });

      gsap.to('.hero-portrait-img', {
        yPercent: -8,
        scale: 1.03,
        ease: 'none',
        scrollTrigger: {
          trigger: container,
          start: 'top top',
          end: 'bottom top',
          scrub: 0.8,
        },
      });

      gsap.to('.hero-hud-card', {
        yPercent: -10,
        opacity: 0,
        ease: 'none',
        scrollTrigger: {
          trigger: container,
          start: 'top top',
          end: '65% top',
          scrub: 0.8,
        },
      });
    });

    // MOBILE (Viewport <= 767px)
    mm.add('(max-width: 767px)', () => {
      gsap.to('.hero-monument-title', {
        yPercent: -10,
        opacity: 0.3,
        ease: 'none',
        scrollTrigger: {
          trigger: container,
          start: 'top top',
          end: 'bottom top',
          scrub: 0.8,
        },
      });

      gsap.to('.hero-meta-item', {
        yPercent: -14,
        opacity: 0,
        ease: 'none',
        scrollTrigger: {
          trigger: container,
          start: 'top top',
          end: '60% top',
          scrub: 0.8,
        },
      });

      gsap.to('.hero-portrait-img', {
        yPercent: -6,
        scale: 1.02,
        ease: 'none',
        scrollTrigger: {
          trigger: container,
          start: 'top top',
          end: 'bottom top',
          scrub: 0.8,
        },
      });

      gsap.to('.hero-hud-card', {
        yPercent: -8,
        opacity: 0,
        ease: 'none',
        scrollTrigger: {
          trigger: container,
          start: 'top top',
          end: '65% top',
          scrub: 0.8,
        },
      });
    });

    // -------------------------------------------------------------------------
    // 3. SVG CONNECTOR & MOTION PATH: HERO → ABOUT PHYSICAL HANDOFF
    // -------------------------------------------------------------------------
    // Initial connector state
    gsap.set('#hero-about-line', { drawSVG: '0%' });
    gsap.set('.hero-about-tracer', { opacity: 0 });

    const heroConnectorTl = gsap.timeline({
      scrollTrigger: {
        trigger: '.hero-to-about-bridge',
        start: 'top 85%',
        end: 'bottom 20%',
        scrub: 0.6,
      },
    });

    // Tracer dot awakens
    heroConnectorTl.to('.hero-about-tracer', {
      opacity: 1,
      scale: 1.2,
      duration: 0.15,
      ease: 'power2.out',
    });

    // Connector line draws downward
    heroConnectorTl.to(
      '#hero-about-line',
      {
        drawSVG: '100%',
        duration: 0.85,
        ease: 'none',
      },
      0
    );

    // Tracer dot travels along the physical path via MotionPathPlugin
    heroConnectorTl.to(
      '.hero-about-tracer',
      {
        motionPath: {
          path: '#hero-about-line',
          align: '#hero-about-line',
          alignOrigin: [0.5, 0.5],
        },
        duration: 0.85,
        ease: 'none',
      },
      0
    );

    // -------------------------------------------------------------------------
    // 4. CONTROLLED SVG MORPHING: Crosshair Reticle (+) → Diamond (◇)
    // -------------------------------------------------------------------------
    gsap.to('#hero-reticle-path', {
      morphSVG: 'M7 1L13 7L7 13L1 7Z',
      scrollTrigger: {
        trigger: container,
        start: '60% top',
        end: 'bottom top',
        scrub: 0.8,
      },
      ease: 'power2.inOut',
    });

    // Universal: Scroll Cue exits swiftly as user begins scrolling
    gsap.to('.hero-scroll-cue', {
      opacity: 0,
      y: -14,
      ease: 'none',
      scrollTrigger: {
        trigger: container,
        start: 'top top',
        end: '20% top',
        scrub: true,
      },
    });
  }, container);

  return () => ctx.revert();
}
