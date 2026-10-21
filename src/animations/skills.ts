import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from 'gsap/SplitText';
import { MotionPathPlugin } from 'gsap/MotionPathPlugin';
import { MorphSVGPlugin } from 'gsap/MorphSVGPlugin';
import { DrawSVGPlugin } from 'gsap/DrawSVGPlugin';
import { Flip } from 'gsap/Flip';

gsap.registerPlugin(ScrollTrigger, SplitText, MotionPathPlugin, MorphSVGPlugin, DrawSVGPlugin, Flip);

export function initSkillsAnimation(container: HTMLElement) {
  const ctx = gsap.context(() => {
    const mm = gsap.matchMedia();

    // -------------------------------------------------------------------------
    // REDUCED MOTION: Zero movement, immediate accessible visibility
    // -------------------------------------------------------------------------
    mm.add('(prefers-reduced-motion: reduce)', () => {
      gsap.set(
        [
          '.skills-feeder-line',
          '.skills-bus-path',
          '.skills-resolution-line',
          '.resolution-stem-line',
          '.skills-hub-center',
          '.skills-node',
          '.skills-node-box',
          '.skills-mobile-card',
          '.skill-pill',
          '.resolution-node-anchor',
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
    });

    // -------------------------------------------------------------------------
    // DESKTOP: DRAW → CONNECT → TRANSFORM → HANDOFF (>= 861px)
    // -------------------------------------------------------------------------
    mm.add('(min-width: 861px)', () => {
      // 0. Initial State Configuration via DrawSVG
      gsap.set('.skills-feeder-line', { drawSVG: '0%' });
      gsap.set('.skills-bus-path', { drawSVG: '0%' });
      gsap.set('.skills-resolution-line', { drawSVG: '0%' });
      gsap.set('.resolution-stem-line', { drawSVG: '0%' });

      gsap.set('.skills-hub-center', {
        scale: 0.25,
        opacity: 0,
      });

      gsap.set('.skills-node-box', {
        scale: 0.35,
        opacity: 0,
      });

      gsap.set('.skills-node .skill-pill', {
        opacity: 0,
        y: 6,
      });

      gsap.set('.resolution-node-anchor', {
        scale: 0.8,
        opacity: 0,
        y: 10,
      });

      // 1. Section Header: SplitText Typographic Entrance
      const skillsTitleSplit = SplitText.create('#skills .section-title-large', {
        type: 'words, chars',
        autoSplit: true,
        charsClass: 'skills-title-char',
      });

      gsap.from(skillsTitleSplit.chars, {
        scrollTrigger: {
          trigger: container,
          start: 'top 88%',
          toggleActions: 'play none none none',
          once: true,
        },
        y: 28,
        opacity: 0,
        stagger: 0.02,
        duration: 0.6,
        ease: 'power3.out',
      });

      // 2. ENTRANCE CHOREOGRAPHY: ONE COORDINATED SCENE TIMELINE
      // Narrative Sequence:
      // scene:feeder-enter    -> Incoming bus draws down into center
      // scene:hub-dock        -> Central anchor establishes (Ayush system hub)
      // scene:north-branch    -> 1st path draws to Systems & Linux -> Node arrives as path touches
      // scene:west-branch     -> 2nd path branches to Runtime & Toolchains -> Node arrives
      // scene:east-south      -> Remaining paths branch & nodes arrive
      // scene:topology-settle -> Power stabilizes across all circuits
      const assembleTl = gsap.timeline({
        scrollTrigger: {
          trigger: container,
          start: 'top 82%',
          end: 'top 15%',
          scrub: 0.8,
        },
      });

      // Step 0: Incoming feeder bus line draws down from About datum root to Center
      assembleTl.addLabel('feeder-enter', 0);
      assembleTl.to(
        '.skills-feeder-line',
        {
          drawSVG: '100%',
          duration: 0.35,
          ease: 'none',
        },
        'feeder-enter'
      );

      // Step 1: Central anchor establishes
      assembleTl.addLabel('hub-dock', 0.3);
      assembleTl.to(
        '.skills-hub-center',
        {
          scale: 1,
          opacity: 1,
          duration: 0.3,
          ease: 'back.out(1.5)',
        },
        'hub-dock'
      );

      // Step 2: First path draws (North - Systems & Linux: center (50, 50) -> (50, 24))
      assembleTl.addLabel('north-branch', 0.55);
      assembleTl.to(
        '.skills-bus-systems',
        {
          drawSVG: '100%',
          duration: 0.3,
          ease: 'none',
        },
        'north-branch'
      );

      // Step 3: First node arrives (ONLY when path reaches it!)
      assembleTl.fromTo(
        '.node-pos-systems .skills-node-box',
        { scale: 0.35, opacity: 0, transformOrigin: '50% 100%' },
        { scale: 1, opacity: 1, duration: 0.25, ease: 'back.out(1.4)' },
        'north-branch+=0.3'
      );
      assembleTl.to(
        '.node-pos-systems .skill-pill',
        { opacity: 1, y: 0, stagger: 0.02, duration: 0.15, ease: 'power2.out' },
        'north-branch+=0.4'
      );

      // Step 4: Second path branches (West - Runtime & Toolchains: center (50, 50) -> (26, 50))
      assembleTl.addLabel('west-branch', 1.05);
      assembleTl.to(
        '.skills-bus-toolchain',
        {
          drawSVG: '100%',
          duration: 0.3,
          ease: 'none',
        },
        'west-branch'
      );

      // Step 5: Second node arrives (ONLY when path reaches it!)
      assembleTl.fromTo(
        '.node-pos-toolchain .skills-node-box',
        { scale: 0.35, opacity: 0, transformOrigin: '100% 50%' },
        { scale: 1, opacity: 1, duration: 0.25, ease: 'back.out(1.4)' },
        'west-branch+=0.3'
      );
      assembleTl.to(
        '.node-pos-toolchain .skill-pill',
        { opacity: 1, y: 0, stagger: 0.02, duration: 0.15, ease: 'power2.out' },
        'west-branch+=0.4'
      );

      // Step 6: Remaining paths assemble (East - Fullstack & South - Upstream)
      assembleTl.addLabel('east-south-branch', 1.55);
      assembleTl.to(
        '.skills-bus-fullstack',
        {
          drawSVG: '100%',
          duration: 0.3,
          ease: 'none',
        },
        'east-south-branch'
      );
      assembleTl.fromTo(
        '.node-pos-fullstack .skills-node-box',
        { scale: 0.35, opacity: 0, transformOrigin: '0% 50%' },
        { scale: 1, opacity: 1, duration: 0.25, ease: 'back.out(1.4)' },
        'east-south-branch+=0.3'
      );
      assembleTl.to(
        '.node-pos-fullstack .skill-pill',
        { opacity: 1, y: 0, stagger: 0.02, duration: 0.15, ease: 'power2.out' },
        'east-south-branch+=0.4'
      );

      // South bus draws
      assembleTl.to(
        '.skills-bus-upstream',
        {
          drawSVG: '100%',
          duration: 0.3,
          ease: 'none',
        },
        'east-south-branch+=0.2'
      );
      assembleTl.fromTo(
        '.node-pos-upstream .skills-node-box',
        { scale: 0.35, opacity: 0, transformOrigin: '50% 0%' },
        { scale: 1, opacity: 1, duration: 0.25, ease: 'back.out(1.4)' },
        'east-south-branch+=0.5'
      );
      assembleTl.to(
        '.node-pos-upstream .skill-pill',
        { opacity: 1, y: 0, stagger: 0.02, duration: 0.15, ease: 'power2.out' },
        'east-south-branch+=0.6'
      );

      // Step 7: Labels and content settle
      assembleTl.addLabel('topology-settle', 2.1);
      assembleTl.to(
        '.hub-core-label',
        {
          opacity: 1,
          duration: 0.2,
          ease: 'power2.out',
        },
        'topology-settle'
      );

      // Step 8: Feeder line eases to subtle operational weight
      assembleTl.to(
        '.skills-feeder-line',
        {
          opacity: 0.35,
          duration: 0.25,
        },
        'topology-settle+=0.1'
      );

      // -----------------------------------------------------------------------
      // 3. TOOLKIT → SELECTED WORK: RESOLUTION TRANSITION
      // Conceptual sequence:
      //        ●
      //       /|\
      //      ● ● ●
      //       \|/
      //        ●
      //        │
      //        ▼
      //  SELECTED WORK
      //        │
      //        ▼
      //  first project
      // -----------------------------------------------------------------------
      const resolveTl = gsap.timeline({
        scrollTrigger: {
          trigger: container,
          start: 'bottom 85%',
          end: 'bottom 5%',
          scrub: 0.8,
        },
      });

      // The peripheral nodes and central hub converge downward toward the South focal node
      resolveTl.to(
        '.node-pos-systems .skills-node-box',
        {
          y: 40,
          scale: 0.82,
          opacity: 0.15,
          duration: 0.5,
          ease: 'power1.inOut',
        },
        0
      );

      resolveTl.to(
        '.node-pos-toolchain .skills-node-box',
        {
          x: 32,
          y: 20,
          scale: 0.82,
          opacity: 0.15,
          duration: 0.5,
          ease: 'power1.inOut',
        },
        0
      );

      resolveTl.to(
        '.node-pos-fullstack .skills-node-box',
        {
          x: -32,
          y: 20,
          scale: 0.82,
          opacity: 0.15,
          duration: 0.5,
          ease: 'power1.inOut',
        },
        0
      );

      resolveTl.to(
        '.skills-hub-center',
        {
          y: 30,
          scale: 0.75,
          opacity: 0.2,
          duration: 0.5,
          ease: 'power1.inOut',
        },
        0
      );

      resolveTl.to(
        ['.skills-bus-systems', '.skills-bus-toolchain', '.skills-bus-fullstack'],
        {
          opacity: 0.1,
          duration: 0.4,
          ease: 'power1.inOut',
        },
        0.05
      );

      // South node (Upstream) establishes itself as the focal resolution point
      resolveTl.to(
        '.node-pos-upstream .skills-node-box',
        {
          scale: 1.02,
          opacity: 1,
          duration: 0.35,
          ease: 'power2.out',
        },
        0.1
      );

      // Downward resolution conduit path draws from South node to bottom of canvas
      resolveTl.to(
        '.skills-resolution-line',
        {
          drawSVG: '100%',
          duration: 0.4,
          ease: 'none',
        },
        0.25
      );

      // Bridge stem line physically draws downward across section boundary
      resolveTl.to(
        '.resolution-stem-line',
        {
          drawSVG: '100%',
          duration: 0.4,
          ease: 'none',
        },
        0.45
      );

      // Resolution anchor marker illuminates
      resolveTl.to(
        '.resolution-node-anchor',
        {
          scale: 1,
          opacity: 1,
          y: 0,
          duration: 0.3,
          ease: 'back.out(1.5)',
        },
        0.65
      );
    });

    // -------------------------------------------------------------------------
    // MOBILE: Vertical Linear Tree with Connector Handoff (<= 860px)
    // -------------------------------------------------------------------------
    mm.add('(max-width: 860px)', () => {
      // Mobile skill cards entrance
      const mobileCards = gsap.utils.toArray<HTMLElement>('.skills-mobile-card');
      mobileCards.forEach((card, idx) => {
        gsap.from(card, {
          scrollTrigger: {
            trigger: card,
            start: 'top 88%',
            toggleActions: 'play none none none',
            once: true,
          },
          y: 20,
          opacity: 0,
          scale: 0.98,
          duration: 0.5,
          delay: idx * 0.05,
          ease: 'power3.out',
        });
      });

      // Mobile resolution bridge
      const mobileResolveTl = gsap.timeline({
        scrollTrigger: {
          trigger: '.skills-system-wrapper',
          start: 'bottom 75%',
          end: 'bottom 15%',
          scrub: 0.6,
        },
      });

      mobileResolveTl.fromTo(
        '.resolution-stem-line',
        { drawSVG: '0%' },
        { drawSVG: '100%', duration: 0.5, ease: 'none' }
      );

      mobileResolveTl.fromTo(
        '.resolution-node-anchor',
        { scale: 0.8, opacity: 0 },
        { scale: 1, opacity: 1, duration: 0.35, ease: 'power2.out' },
        '-=0.2'
      );
    });
  }, container);

  return () => ctx.revert();
}
