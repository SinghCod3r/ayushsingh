import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from 'gsap/SplitText';
import { MotionPathPlugin } from 'gsap/MotionPathPlugin';
import { MorphSVGPlugin } from 'gsap/MorphSVGPlugin';
import { DrawSVGPlugin } from 'gsap/DrawSVGPlugin';

gsap.registerPlugin(ScrollTrigger, SplitText, MotionPathPlugin, MorphSVGPlugin, DrawSVGPlugin);

export function initAboutAnimation(container: HTMLElement) {
  const ctx = gsap.context(() => {
    const mm = gsap.matchMedia();

    // -------------------------------------------------------------------------
    // REDUCED MOTION: Zero movement, immediate accessible visibility
    // -------------------------------------------------------------------------
    mm.add('(prefers-reduced-motion: reduce)', () => {
      gsap.set(
        [
          '.section-header-block',
          '.about-manifesto',
          '.about-manifesto-wrap',
          '.about-narrative-col',
          '.about-narrative-col > *',
          '.about-editorial-visual',
          '.about-editorial-img',
          '.about-stat-card',
          '.datum-node-anchor',
          '#about-skills-line',
          '.about-skills-tracer',
        ],
        {
          opacity: 1,
          x: 0,
          y: 0,
          scale: 1,
          drawSVG: '100%',
          clipPath: 'none',
          clearProps: 'transform',
        }
      );
    });

    // -------------------------------------------------------------------------
    // DESKTOP: Full Cinematic Editorial Choreography (>= 861px)
    // Story: Philosophy -> Human Story -> Transformation -> Skills
    // -------------------------------------------------------------------------
    mm.add('(min-width: 861px)', () => {
      // 1. Philosophy: Section header with SplitText typography
      const aboutTitleSplit = SplitText.create('#about .section-title-large', {
        type: 'words, chars',
        autoSplit: true,
        charsClass: 'about-title-char',
      });

      gsap.from(aboutTitleSplit.chars, {
        scrollTrigger: {
          trigger: '#about .section-header-block',
          start: 'top 85%',
          toggleActions: 'play none none none',
          once: true,
        },
        y: 35,
        opacity: 0,
        stagger: 0.03,
        duration: 0.6,
        ease: 'power3.out',
      });

      // Section header exit dissolve before fixed navbar
      gsap.to('#about .section-header-block', {
        scrollTrigger: {
          trigger: '#about .section-header-block',
          start: 'bottom 35%',
          end: 'bottom 10%',
          scrub: true,
        },
        opacity: 0,
        yPercent: -6,
        ease: 'power1.in',
      });

      // Manifesto typography scrub enter
      gsap.from('.about-manifesto', {
        scrollTrigger: {
          trigger: '.about-manifesto-wrap',
          start: 'top 85%',
          end: 'bottom 55%',
          scrub: 0.6,
        },
        y: 35,
        opacity: 0.15,
        ease: 'power2.out',
      });

      // Manifesto exit dissolve: prevents text bleeding into fixed navbar
      gsap.to('.about-manifesto-wrap', {
        scrollTrigger: {
          trigger: '.about-manifesto-wrap',
          start: 'bottom 35%',
          end: 'bottom 10%',
          scrub: true,
        },
        opacity: 0,
        yPercent: -8,
        ease: 'power1.in',
      });

      // 2. Narrative Column: Staggered entrance
      gsap.from('.about-narrative-col > *', {
        scrollTrigger: {
          trigger: '.about-narrative-col',
          start: 'top 80%',
          toggleActions: 'play none none none',
          once: true,
        },
        y: 24,
        opacity: 0,
        stagger: 0.08,
        duration: 0.75,
        ease: 'power3.out',
      });

      // Narrative exit dissolve into Skills
      gsap.to('.about-narrative-col', {
        scrollTrigger: {
          trigger: '.about-editorial-grid',
          start: 'bottom 45%',
          end: 'bottom 10%',
          scrub: true,
        },
        opacity: 0.35,
        yPercent: -8,
        ease: 'power1.in',
      });

      // 3. Editorial Portrait Choreography (Scroll-Driven Interactive Transformation)
      const editorialTl = gsap.timeline({
        scrollTrigger: {
          trigger: '.about-editorial-grid',
          start: 'top 80%',
          end: 'bottom 10%',
          scrub: 0.8,
        },
      });

      // Step A: Image enters smoothly from the side
      editorialTl.fromTo(
        '.about-editorial-visual',
        {
          x: 60,
          opacity: 0,
          clipPath: 'polygon(6% 0%, 100% 0%, 100% 100%, 6% 100%)',
        },
        {
          x: 0,
          opacity: 1,
          clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)',
          duration: 0.32,
          ease: 'power2.out',
        }
      );

      // Step B: Image expands while scrolling & becomes dominant visual
      editorialTl.fromTo(
        '.about-editorial-visual',
        { scale: 1.0 },
        { scale: 1.03, duration: 0.42, ease: 'none' },
        '0.25'
      );

      editorialTl.fromTo(
        '.about-editorial-img',
        {
          scale: 0.98,
          yPercent: 4,
        },
        {
          scale: 1.08,
          yPercent: -10,
          duration: 0.47,
          ease: 'none',
        },
        '0.25'
      );

      // Step C: Image transitions smoothly towards datum resolution
      editorialTl.to(
        '.about-editorial-visual',
        {
          y: -36,
          opacity: 0.25,
          scale: 1.01,
          clipPath: 'polygon(0% 0%, 100% 0%, 94% 100%, 0% 94%)',
          duration: 0.28,
          ease: 'power2.in',
        },
        '0.72'
      );

      // 4. Concrete Metrics / Live Stats Cards reveal
      gsap.from('.about-stat-card', {
        scrollTrigger: {
          trigger: '.about-stats-grid',
          start: 'top 85%',
          toggleActions: 'play none none none',
          once: true,
        },
        y: 30,
        opacity: 0,
        stagger: 0.1,
        duration: 0.7,
        ease: 'power3.out',
      });

      // 5. TRANSFORMATION: About Visual & Stats condense into Datum Bridge (About -> Skills handoff)
      // Initial state
      gsap.set('#about-skills-line', { drawSVG: '0%' });
      gsap.set('.about-skills-tracer', { opacity: 0 });

      const datumTl = gsap.timeline({
        scrollTrigger: {
          trigger: '.about-stats-grid',
          start: 'bottom 60%',
          end: 'bottom 0%',
          scrub: 0.8,
        },
      });

      // Stats condense inward into supporting datum metadata
      datumTl.to(
        '.about-stats-grid .about-stat-card:nth-child(1)',
        { x: 16, scale: 0.96, opacity: 0.35, duration: 0.5, ease: 'power1.inOut' },
        0
      );
      datumTl.to(
        '.about-stats-grid .about-stat-card:nth-child(2)',
        { scale: 0.94, opacity: 0.4, duration: 0.5, ease: 'power1.inOut' },
        0
      );
      datumTl.to(
        '.about-stats-grid .about-stat-card:nth-child(3)',
        { x: -16, scale: 0.96, opacity: 0.35, duration: 0.5, ease: 'power1.inOut' },
        0
      );

      // Datum anchor marker establishes
      datumTl.fromTo(
        '.datum-node-anchor',
        { scale: 0.7, opacity: 0, y: 12 },
        { scale: 1, opacity: 1, y: 0, duration: 0.35, ease: 'back.out(1.5)' },
        0.2
      );

      // Tracer dot awakens
      datumTl.to(
        '.about-skills-tracer',
        { opacity: 1, scale: 1.2, duration: 0.15, ease: 'power2.out' },
        0.3
      );

      // Stem line physically draws downward toward Skills
      datumTl.to(
        '#about-skills-line',
        { drawSVG: '100%', duration: 0.6, ease: 'none' },
        0.35
      );

      // Tracer dot travels along stem line to cross section boundary
      datumTl.to(
        '.about-skills-tracer',
        {
          motionPath: {
            path: '#about-skills-line',
            align: '#about-skills-line',
            alignOrigin: [0.5, 0.5],
          },
          duration: 0.6,
          ease: 'none',
        },
        0.35
      );

      // 6. CONTROLLED SVG MORPHING: About Diamond (◇) → Skills Circle Node (○)
      gsap.to('#about-reticle-path', {
        morphSVG: 'M7 2a5 5 0 1 0 0.01 0',
        scrollTrigger: {
          trigger: '.about-stats-grid',
          start: 'bottom 40%',
          end: 'bottom top',
          scrub: 0.8,
        },
        ease: 'power2.inOut',
      });
    });

    // -------------------------------------------------------------------------
    // MOBILE: Vertical Flow with Zero Horizontal Overflow (<= 860px)
    // -------------------------------------------------------------------------
    mm.add('(max-width: 860px)', () => {
      // Mobile section header exit dissolve before navbar
      gsap.to('#about .section-header-block', {
        scrollTrigger: {
          trigger: '#about .section-header-block',
          start: 'bottom 45%',
          end: 'bottom 15%',
          scrub: true,
        },
        opacity: 0,
        yPercent: -6,
        ease: 'power1.in',
      });

      // Manifesto scrub
      gsap.from('.about-manifesto', {
        scrollTrigger: {
          trigger: '.about-manifesto-wrap',
          start: 'top 90%',
          end: 'bottom 60%',
          scrub: 0.6,
        },
        y: 24,
        opacity: 0.2,
        ease: 'power2.out',
      });

      // Mobile manifesto exit dissolve: prevents text bleeding into fixed navbar
      gsap.to('.about-manifesto-wrap', {
        scrollTrigger: {
          trigger: '.about-manifesto-wrap',
          start: 'bottom 50%',
          end: 'bottom 20%',
          scrub: true,
        },
        opacity: 0,
        yPercent: -6,
        ease: 'power1.in',
      });

      // Narrative reveal
      gsap.from('.about-narrative-col > *', {
        scrollTrigger: {
          trigger: '.about-narrative-col',
          start: 'top 85%',
          toggleActions: 'play none none none',
          once: true,
        },
        y: 20,
        opacity: 0,
        stagger: 0.08,
        duration: 0.6,
        ease: 'power3.out',
      });

      // Image vertical entrance (strictly no horizontal offset)
      const mobileImageTl = gsap.timeline({
        scrollTrigger: {
          trigger: '.about-visual-col',
          start: 'top 85%',
          end: 'bottom 15%',
          scrub: 0.6,
        },
      });

      mobileImageTl.fromTo(
        '.about-editorial-visual',
        {
          y: 36,
          opacity: 0,
          scale: 0.96,
        },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 0.35,
          ease: 'power2.out',
        }
      );

      mobileImageTl.fromTo(
        '.about-editorial-img',
        { scale: 1, yPercent: 0 },
        { scale: 1.05, yPercent: -5, duration: 0.45, ease: 'none' },
        '0.2'
      );

      mobileImageTl.to(
        '.about-editorial-visual',
        {
          opacity: 0.3,
          duration: 0.2,
          ease: 'power2.in',
        },
        '0.8'
      );

      // Mobile stats cards
      const statCards = gsap.utils.toArray<HTMLElement>('.about-stat-card');
      statCards.forEach((card) => {
        gsap.from(card, {
          scrollTrigger: {
            trigger: card,
            start: 'top 90%',
            toggleActions: 'play none none none',
            once: true,
          },
          y: 20,
          opacity: 0,
          duration: 0.5,
          ease: 'power3.out',
        });
      });

      // Mobile Datum Anchor and Stem Line
      const mobileDatumTl = gsap.timeline({
        scrollTrigger: {
          trigger: '.about-stats-grid',
          start: 'bottom 65%',
          end: 'bottom 10%',
          scrub: 0.6,
        },
      });

      mobileDatumTl.fromTo(
        '.datum-node-anchor',
        { scale: 0.8, opacity: 0 },
        { scale: 1, opacity: 1, duration: 0.4, ease: 'power2.out' }
      );

      mobileDatumTl.fromTo(
        '#about-skills-line',
        { drawSVG: '0%' },
        { drawSVG: '100%', duration: 0.5, ease: 'none' },
        '-=0.15'
      );
    });
  }, container);

  return () => ctx.revert();
}
