import React, { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger);

interface CharConfig {
  char: string;
  x: number;
  y: number;
  rot: number;
  scale: number;
  delay: number;
}

const LINE1_CHARS: CharConfig[] = [
  { char: 'T', x: -28, y: -18, rot: -8, scale: 0.9, delay: 0.0 },
  { char: 'O', x: -14, y: 16, rot: 6, scale: 1.05, delay: 0.04 },
  { char: 'O', x: 8, y: -22, rot: -7, scale: 0.94, delay: 0.08 },
  { char: 'L', x: 22, y: 15, rot: 8, scale: 1.04, delay: 0.12 },
  { char: 'S', x: 34, y: -16, rot: -6, scale: 0.92, delay: 0.16 },
  { char: ' ', x: 0, y: 0, rot: 0, scale: 1, delay: 0.18 },
  { char: 'I', x: 48, y: 20, rot: 9, scale: 1.08, delay: 0.22 },
];

const LINE2_CHARS: CharConfig[] = [
  { char: 'P', x: -30, y: 18, rot: 7, scale: 0.95, delay: 0.06 },
  { char: 'L', x: -16, y: -20, rot: -8, scale: 1.06, delay: 0.1 },
  { char: 'A', x: 8, y: 15, rot: 6, scale: 0.92, delay: 0.14 },
  { char: 'Y', x: 24, y: -14, rot: -5, scale: 1.05, delay: 0.18 },
  { char: ' ', x: 0, y: 0, rot: 0, scale: 1, delay: 0.2 },
  { char: 'W', x: -12, y: 24, rot: 8, scale: 0.92, delay: 0.22 },
  { char: 'I', x: 14, y: -18, rot: -7, scale: 1.04, delay: 0.26 },
  { char: 'T', x: 26, y: 16, rot: 6, scale: 0.96, delay: 0.3 },
  { char: 'H', x: 38, y: -20, rot: -8, scale: 1.02, delay: 0.34 },
  { char: '.', x: 46, y: 10, rot: 12, scale: 1.25, delay: 0.38 },
];

interface SkillsKineticTitleProps {
  className?: string;
}

export const SkillsKineticTitle: React.FC<SkillsKineticTitleProps> = ({ className = '' }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const container = containerRef.current;
      if (!container) return;

      const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      if (prefersReducedMotion) return;

      const chars = container.querySelectorAll<HTMLElement>('.title-char');
      if (chars.length === 0) return;

      // Master ScrollTrigger timeline: Fragmented -> Settles into "TOOLS I PLAY WITH."
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: container,
          start: 'top 85%',
          toggleActions: 'play none none reverse',
        },
      });

      // 1. Initial State: Fragmented in 2D space with slight rotations and scales
      chars.forEach((el) => {
        const ox = parseFloat(el.getAttribute('data-ox') || '0');
        const oy = parseFloat(el.getAttribute('data-oy') || '0');
        const orot = parseFloat(el.getAttribute('data-orot') || '0');
        const osc = parseFloat(el.getAttribute('data-osc') || '1');

        gsap.set(el, {
          x: ox,
          y: oy,
          rotation: orot,
          scale: osc,
          opacity: 0,
        });
      });

      // 2. Entrance to fragmented composition (0.0s -> 0.3s)
      tl.to(
        chars,
        {
          opacity: 1,
          duration: 0.35,
          stagger: 0.02,
          ease: 'power2.out',
        },
        0
      );

      // 3. Progressive Convergence into crisp baseline "TOOLS I PLAY WITH." (0.25s -> 0.85s)
      chars.forEach((el) => {
        const delay = parseFloat(el.getAttribute('data-delay') || '0');
        tl.to(
          el,
          {
            x: 0,
            y: 0,
            rotation: 0,
            scale: 1,
            duration: 0.55,
            ease: 'back.out(2.0)',
          },
          0.25 + delay * 0.7
        );
      });
    },
    { scope: containerRef }
  );

  return (
    <div
      ref={containerRef}
      className={`font-display font-black text-4xl sm:text-6xl lg:text-7xl tracking-tight text-white uppercase leading-[0.92] select-none ${className}`}
      aria-label="TOOLS I PLAY WITH."
    >
      {/* Line 1: TOOLS I */}
      <div className="flex flex-wrap items-baseline gap-x-2 sm:gap-x-4">
        <span className="inline-flex">
          {LINE1_CHARS.slice(0, 5).map((c, i) => (
            <span
              key={`l1-${i}`}
              className="title-char inline-block will-change-transform"
              data-ox={c.x}
              data-oy={c.y}
              data-orot={c.rot}
              data-osc={c.scale}
              data-delay={c.delay}
            >
              {c.char}
            </span>
          ))}
        </span>

        <span className="inline-flex">
          <span
            className="title-char inline-block will-change-transform text-white"
            data-ox={LINE1_CHARS[6].x}
            data-oy={LINE1_CHARS[6].y}
            data-orot={LINE1_CHARS[6].rot}
            data-osc={LINE1_CHARS[6].scale}
            data-delay={LINE1_CHARS[6].delay}
          >
            {LINE1_CHARS[6].char}
          </span>
        </span>
      </div>

      {/* Line 2: PLAY WITH. */}
      <div className="flex flex-wrap items-baseline gap-x-2 sm:gap-x-4 mt-1 sm:mt-2">
        <span className="inline-flex">
          {LINE2_CHARS.slice(0, 4).map((c, i) => (
            <span
              key={`l2-play-${i}`}
              className="title-char inline-block will-change-transform"
              data-ox={c.x}
              data-oy={c.y}
              data-orot={c.rot}
              data-osc={c.scale}
              data-delay={c.delay}
            >
              {c.char}
            </span>
          ))}
        </span>

        <span className="inline-flex">
          {LINE2_CHARS.slice(5).map((c, i) => (
            <span
              key={`l2-with-${i}`}
              className={`title-char inline-block will-change-transform ${
                c.char === '.' ? 'text-amber-400' : 'text-white'
              }`}
              data-ox={c.x}
              data-oy={c.y}
              data-orot={c.rot}
              data-osc={c.scale}
              data-delay={c.delay}
            >
              {c.char}
            </span>
          ))}
        </span>
      </div>
    </div>
  );
};

