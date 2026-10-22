import React, { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { getLenis } from '../utils/scroll';

const CHARS = ['s', 'i', 'n', 'g', 'h', 'c', 'o', 'd', '3', 'r'];

interface PageLoaderProps {
  onComplete?: () => void;
}

interface LetterChoreography {
  char: string;
  // Phase 1: Entry to scattered composition
  entryStart: number;
  startX: number;
  startY: number;
  startRot: number;
  startScale: number;
  startScaleX?: number;
  startScaleY?: number;
  scatterDuration: number;
  scatterX: number;
  scatterY: number;
  scatterRot: number;
  scatterScale: number;
  scatterScaleX?: number;
  scatterScaleY?: number;
  // Phase 2: Convergence into "singhcod3r"
  convergeStart: number;
  convergeDuration: number;
  overshootX?: number;
  overshootY?: number;
  overshootRot?: number;
  overshootScale?: number;
  overshootScaleX?: number;
  overshootScaleY?: number;
  // Phase 2b: Tiny independent settling
  settleStart: number;
  settleDuration: number;
  settleX?: number;
  settleY?: number;
  settleRot?: number;
  settleScaleY?: number;
  // Phase 3: Playful cascading escape to right
  exitStart: number;
  exitDuration: number;
  exitOffsetY: number;
  exitRot: number;
  exitScale: number;
}

// Handcrafted per-letter personalities:
// s: enters left with soft overshoot, settles with slight dip, escapes with upward glide
// i: drops from above, lands with bounce, micro-settle on stem, leaps and dashes right
// n: slides diagonally upward while rotating, settles with tilt, dips and speeds right
// g: rises with squash & stretch, squashes on arrival, settles, glides with downward arc
// h: moves horizontally with tilt, quick damping, settles, bolts straight right fast
// c: spins while traveling, settles with reverse micro-twist, spins clockwise out
// o: moves in subtle curved arc, settles with breath, floats out in gentle arc
// d: overshoots inward and rebounds, settles, dashes out
// 3: pops upward with scale bounce, settles, pops up and zooms right
// r: fast entry with flick, settles, final flick and chases the pack
const CHOREOGRAPHY: LetterChoreography[] = [
  {
    char: 's',
    entryStart: 0.0,
    startX: -240,
    startY: -50,
    startRot: -22,
    startScale: 0.75,
    scatterDuration: 0.36,
    scatterX: -130,
    scatterY: -45,
    scatterRot: -14,
    scatterScale: 0.9,
    convergeStart: 0.48,
    convergeDuration: 0.28,
    overshootX: 7,
    overshootRot: 3,
    settleStart: 0.76,
    settleDuration: 0.12,
    settleY: -2.5,
    exitStart: 0.92,
    exitDuration: 0.4,
    exitOffsetY: -35,
    exitRot: 20,
    exitScale: 0.92,
  },
  {
    char: 'i',
    entryStart: 0.04,
    startX: 20,
    startY: -190,
    startRot: 10,
    startScale: 0.85,
    scatterDuration: 0.35,
    scatterX: 20,
    scatterY: -80,
    scatterRot: 6,
    scatterScale: 0.95,
    convergeStart: 0.51,
    convergeDuration: 0.27,
    overshootY: -7,
    settleStart: 0.79,
    settleDuration: 0.11,
    settleScaleY: 1.08,
    exitStart: 0.96,
    exitDuration: 0.38,
    exitOffsetY: -75,
    exitRot: -25,
    exitScale: 0.86,
  },
  {
    char: 'n',
    entryStart: 0.07,
    startX: -100,
    startY: 190,
    startRot: -32,
    startScale: 0.8,
    scatterDuration: 0.36,
    scatterX: -45,
    scatterY: 55,
    scatterRot: -16,
    scatterScale: 0.9,
    convergeStart: 0.53,
    convergeDuration: 0.28,
    overshootRot: -4,
    settleStart: 0.82,
    settleDuration: 0.11,
    settleRot: 2.5,
    exitStart: 1.0,
    exitDuration: 0.39,
    exitOffsetY: 35,
    exitRot: 18,
    exitScale: 0.94,
  },
  {
    char: 'g',
    entryStart: 0.09,
    startX: 70,
    startY: 230,
    startRot: 16,
    startScale: 0.85,
    startScaleX: 0.7,
    startScaleY: 1.4,
    scatterDuration: 0.37,
    scatterX: 80,
    scatterY: -55,
    scatterRot: 8,
    scatterScale: 0.95,
    scatterScaleX: 1.15,
    scatterScaleY: 0.88,
    convergeStart: 0.55,
    convergeDuration: 0.29,
    overshootY: 5,
    overshootScaleX: 1.12,
    overshootScaleY: 0.9,
    settleStart: 0.84,
    settleDuration: 0.12,
    settleY: 2.0,
    exitStart: 1.04,
    exitDuration: 0.4,
    exitOffsetY: 60,
    exitRot: -22,
    exitScale: 0.9,
  },
  {
    char: 'h',
    entryStart: 0.03,
    startX: -270,
    startY: 20,
    startRot: 24,
    startScale: 0.88,
    scatterDuration: 0.35,
    scatterX: -165,
    scatterY: 15,
    scatterRot: 12,
    scatterScale: 0.95,
    convergeStart: 0.49,
    convergeDuration: 0.27,
    overshootX: -8,
    settleStart: 0.78,
    settleDuration: 0.11,
    settleX: -2.0,
    exitStart: 1.08,
    exitDuration: 0.37,
    exitOffsetY: -10,
    exitRot: 12,
    exitScale: 1.0,
  },
  {
    char: 'c',
    entryStart: 0.06,
    startX: -30,
    startY: -160,
    startRot: -180,
    startScale: 0.75,
    scatterDuration: 0.36,
    scatterX: 10,
    scatterY: 35,
    scatterRot: -75,
    scatterScale: 0.9,
    convergeStart: 0.52,
    convergeDuration: 0.28,
    overshootRot: 8,
    settleStart: 0.81,
    settleDuration: 0.11,
    settleRot: -3.0,
    exitStart: 1.12,
    exitDuration: 0.39,
    exitOffsetY: -45,
    exitRot: 65,
    exitScale: 0.88,
  },
  {
    char: 'o',
    entryStart: 0.1,
    startX: -200,
    startY: 120,
    startRot: 32,
    startScale: 0.8,
    scatterDuration: 0.37,
    scatterX: -110,
    scatterY: 70,
    scatterRot: 18,
    scatterScale: 0.92,
    convergeStart: 0.56,
    convergeDuration: 0.28,
    settleStart: 0.85,
    settleDuration: 0.12,
    settleRot: 2.0,
    exitStart: 1.16,
    exitDuration: 0.4,
    exitOffsetY: 40,
    exitRot: -35,
    exitScale: 0.92,
  },
  {
    char: 'd',
    entryStart: 0.11,
    startX: 220,
    startY: 50,
    startRot: 20,
    startScale: 0.9,
    scatterDuration: 0.37,
    scatterX: 125,
    scatterY: 45,
    scatterRot: 10,
    scatterScale: 0.95,
    convergeStart: 0.57,
    convergeDuration: 0.29,
    overshootX: -14,
    overshootRot: -4,
    settleStart: 0.86,
    settleDuration: 0.11,
    settleX: 2.0,
    exitStart: 1.2,
    exitDuration: 0.38,
    exitOffsetY: -25,
    exitRot: 20,
    exitScale: 0.9,
  },
  {
    char: '3',
    entryStart: 0.13,
    startX: -10,
    startY: 180,
    startRot: -16,
    startScale: 0.45,
    scatterDuration: 0.37,
    scatterX: -25,
    scatterY: 80,
    scatterRot: -8,
    scatterScale: 0.85,
    convergeStart: 0.59,
    convergeDuration: 0.29,
    overshootY: -8,
    overshootScale: 1.22,
    settleStart: 0.89,
    settleDuration: 0.11,
    settleY: -2.0,
    exitStart: 1.24,
    exitDuration: 0.38,
    exitOffsetY: -60,
    exitRot: -28,
    exitScale: 0.82,
  },
  {
    char: 'r',
    entryStart: 0.12,
    startX: 250,
    startY: -80,
    startRot: 42,
    startScale: 0.85,
    scatterDuration: 0.36,
    scatterX: 135,
    scatterY: 90,
    scatterRot: 20,
    scatterScale: 0.95,
    convergeStart: 0.58,
    convergeDuration: 0.28,
    overshootRot: -7,
    settleStart: 0.87,
    settleDuration: 0.11,
    settleRot: 3.0,
    exitStart: 1.27,
    exitDuration: 0.36,
    exitOffsetY: 18,
    exitRot: 40,
    exitScale: 0.85,
  },
];

export const PageLoader: React.FC<PageLoaderProps> = ({ onComplete }) => {
  const overlayRef = useRef<HTMLDivElement>(null);
  const letterRefs = useRef<(HTMLSpanElement | null)[]>([]);

  useGSAP(
    () => {
      const overlay = overlayRef.current;
      if (!overlay) return;

      const letters = letterRefs.current.filter(Boolean) as HTMLSpanElement[];
      if (letters.length !== CHARS.length) return;

      const lenis = getLenis();
      lenis?.stop();

      const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

      // ==============================================================
      // ACCESSIBILITY: REDUCED MOTION FALLBACK
      // ==============================================================
      if (prefersReducedMotion) {
        const reducedTl = gsap.timeline({
          onComplete: () => {
            lenis?.start();
            if (overlay) overlay.style.display = 'none';
            onComplete?.();
          },
        });

        reducedTl.fromTo(
          letters,
          { opacity: 0, y: 6 },
          { opacity: 1, y: 0, stagger: 0.03, duration: 0.3, ease: 'power2.out' }
        );

        reducedTl.to(overlay, {
          opacity: 0,
          duration: 0.35,
          ease: 'power2.inOut',
          delay: 0.35,
        });

        return;
      }

      // ==============================================================
      // RESPONSIVE CALIBRATION (DESKTOP / TABLET / MOBILE)
      // ==============================================================
      const width = window.innerWidth;
      const isMobile = width < 768;
      const isTablet = width >= 768 && width < 1024;

      const posFactor = isMobile ? 0.32 : isTablet ? 0.65 : 1.0;
      const rotFactor = isMobile ? 0.35 : isTablet ? 0.65 : 1.0;
      const durFactor = isMobile ? 0.88 : 1.0;
      const exitDist = isMobile
        ? width + 140
        : isTablet
        ? width * 0.75 + 160
        : Math.max(width * 0.75, 880);

      // ==============================================================
      // MASTER TIMELINE: INDIVIDUAL LETTER CHOREOGRAPHY
      // Total duration ~1.65s (within 1.2–1.8s guideline)
      // ==============================================================
      const masterTl = gsap.timeline({
        onComplete: () => {
          lenis?.start();
          if (overlay) overlay.style.display = 'none';
          onComplete?.();
        },
      });

      // --------------------------------------------------------------
      // HERO REVEAL: Fades out background overlay starting at 0.90s
      // The real Hero section reveals underneath while letters escape
      // --------------------------------------------------------------
      masterTl.to(
        overlay,
        {
          opacity: 0,
          duration: 0.55 * durFactor,
          ease: 'power2.inOut',
        },
        0.9 * durFactor
      );

      // Unlock smooth scroll at 1.0s as hero becomes visible
      masterTl.add(() => {
        lenis?.start();
      }, 1.0 * durFactor);

      // --------------------------------------------------------------
      // BUILD AN INDEPENDENT TIMELINE FOR EVERY CHARACTER
      // --------------------------------------------------------------
      CHOREOGRAPHY.forEach((cfg, idx) => {
        const el = letters[idx];
        if (!el) return;

        // Dedicated timeline for this individual letter
        const charTl = gsap.timeline();

        // 1. Initial State (scattered off-center in 2D space)
        charTl.set(el, {
          x: cfg.startX * posFactor,
          y: cfg.startY * posFactor,
          rotation: cfg.startRot * rotFactor,
          scale: cfg.startScale,
          scaleX: cfg.startScaleX ?? cfg.startScale,
          scaleY: cfg.startScaleY ?? cfg.startScale,
          opacity: 0,
        });

        // 2. Entrance into loose animated composition (0.00s – 0.50s)
        charTl.to(
          el,
          {
            x: cfg.scatterX * posFactor,
            y: cfg.scatterY * posFactor,
            rotation: cfg.scatterRot * rotFactor,
            scale: cfg.scatterScale,
            scaleX: cfg.scatterScaleX ?? cfg.scatterScale,
            scaleY: cfg.scatterScaleY ?? cfg.scatterScale,
            opacity: 1,
            duration: cfg.scatterDuration * durFactor,
            ease: 'power2.out',
          },
          cfg.entryStart * durFactor
        );

        // 3. Convergence into aligned word "singhcod3r" (0.48s – 0.78s)
        if (cfg.overshootX || cfg.overshootY || cfg.overshootRot || cfg.overshootScale || cfg.overshootScaleX || cfg.overshootScaleY) {
          // Halfway overshoot point
          charTl.to(
            el,
            {
              x: (cfg.overshootX ?? 0) * posFactor,
              y: (cfg.overshootY ?? 0) * posFactor,
              rotation: (cfg.overshootRot ?? 0) * rotFactor,
              scale: cfg.overshootScale ?? 1.0,
              scaleX: cfg.overshootScaleX ?? 1.0,
              scaleY: cfg.overshootScaleY ?? 1.0,
              duration: cfg.convergeDuration * 0.6 * durFactor,
              ease: 'power3.out',
            },
            cfg.convergeStart * durFactor
          );
          // Snap back to zero
          charTl.to(el, {
            x: 0,
            y: 0,
            rotation: 0,
            scale: 1,
            scaleX: 1,
            scaleY: 1,
            duration: cfg.convergeDuration * 0.4 * durFactor,
            ease: 'back.out(2)',
          });
        } else {
          // Direct smooth convergence
          charTl.to(
            el,
            {
              x: 0,
              y: 0,
              rotation: 0,
              scale: 1,
              scaleX: 1,
              scaleY: 1,
              duration: cfg.convergeDuration * durFactor,
              ease: 'back.out(1.8)',
            },
            cfg.convergeStart * durFactor
          );
        }

        // 4. Tiny independent settling movement (not simultaneous!)
        if (cfg.settleX || cfg.settleY || cfg.settleRot || cfg.settleScaleY) {
          charTl.to(
            el,
            {
              x: (cfg.settleX ?? 0) * posFactor,
              y: (cfg.settleY ?? 0) * posFactor,
              rotation: (cfg.settleRot ?? 0) * rotFactor,
              scaleY: cfg.settleScaleY ?? 1,
              duration: cfg.settleDuration * 0.45 * durFactor,
              ease: 'sine.out',
            },
            cfg.settleStart * durFactor
          );
          charTl.to(el, {
            x: 0,
            y: 0,
            rotation: 0,
            scaleY: 1,
            duration: cfg.settleDuration * 0.55 * durFactor,
            ease: 'sine.inOut',
          });
        }

        // 5. Playful Cascading Escape to the Right (0.90s – 1.60s)
        // Letters leave individually with unique trajectories, rotations, and durations
        charTl.to(
          el,
          {
            x: exitDist + idx * 12,
            y: cfg.exitOffsetY * posFactor,
            rotation: cfg.exitRot * rotFactor,
            scale: cfg.exitScale,
            opacity: 0,
            duration: cfg.exitDuration * durFactor,
            ease: 'power3.in',
          },
          cfg.exitStart * durFactor
        );

        // Add this character's independent timeline into master timeline
        masterTl.add(charTl, 0);
      });

      return () => {
        lenis?.start();
      };
    },
    { scope: overlayRef }
  );

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-[100] flex items-center justify-center pointer-events-none select-none bg-[#08080a] overflow-hidden"
      style={{ isolation: 'isolate' }}
      aria-label="Loading animation"
    >
      {/* Centered Typography: Crisp, Editorial display text */}
      <div className="relative flex items-center justify-center p-4">
        <h1
          className="flex items-baseline font-display font-black text-4xl sm:text-6xl md:text-7xl lg:text-8xl tracking-tight text-white select-none will-change-transform"
          aria-label="singhcod3r"
        >
          {CHARS.map((char, index) => (
            <span
              key={index}
              ref={(el) => {
                letterRefs.current[index] = el;
              }}
              className="inline-block relative will-change-transform"
              style={{
                display: 'inline-block',
                transformOrigin: index === 3 || index === 8 ? '50% 85%' : '50% 50%',
              }}
            >
              {char}
            </span>
          ))}
        </h1>
      </div>
    </div>
  );
};
