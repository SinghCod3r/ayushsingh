import React, { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger);

export type KineticVariant = 'telemetry' | 'git-branch' | 'blueprint' | 'terminal';

interface KineticHeadingProps {
  text: string;
  className?: string;
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'div';
  variant?: KineticVariant;
  accentColor?: string;
}

// =========================================================================
// DETERMINISTIC CHOREOGRAPHY PRESETS (Zero Math.random)
// Hand-crafted physical offsets: x, y, rotation, scale
// =========================================================================
interface CharMotion {
  x: number;
  y: number;
  rotation: number;
  scale: number;
  opacity: number;
}

const MOTION_PATTERNS: Record<KineticVariant, CharMotion[]> = {
  telemetry: [
    { x: -14, y: -10, rotation: -3.2, scale: 1.06, opacity: 0.92 },
    { x: 10, y: 12, rotation: 2.6, scale: 0.95, opacity: 0.88 },
    { x: -8, y: 8, rotation: -1.8, scale: 1.04, opacity: 0.94 },
    { x: 14, y: -12, rotation: 3.0, scale: 0.93, opacity: 0.86 },
    { x: 0, y: 14, rotation: -1.2, scale: 1.08, opacity: 1 },
    { x: -12, y: -14, rotation: 2.4, scale: 0.96, opacity: 0.9 },
    { x: 12, y: 10, rotation: -2.8, scale: 1.04, opacity: 0.92 },
    { x: -6, y: 12, rotation: 1.6, scale: 0.98, opacity: 0.88 },
    { x: 10, y: -10, rotation: -2.2, scale: 1.05, opacity: 0.95 },
    { x: -10, y: 6, rotation: 2.8, scale: 0.94, opacity: 0.9 },
  ],
  'git-branch': [
    { x: -16, y: -8, rotation: -2.8, scale: 1.05, opacity: 0.92 },
    { x: -8, y: 14, rotation: 3.2, scale: 0.94, opacity: 0.86 },
    { x: 12, y: -12, rotation: -2.4, scale: 1.06, opacity: 0.94 },
    { x: 18, y: 10, rotation: 2.6, scale: 0.93, opacity: 0.88 },
    { x: -10, y: -14, rotation: -3.0, scale: 1.04, opacity: 0.9 },
    { x: 8, y: 16, rotation: 2.0, scale: 0.96, opacity: 0.88 },
    { x: 14, y: -8, rotation: -2.6, scale: 1.05, opacity: 0.94 },
    { x: -14, y: 10, rotation: 3.4, scale: 0.92, opacity: 0.86 },
  ],
  blueprint: [
    { x: -12, y: -14, rotation: -2.0, scale: 1.06, opacity: 0.94 },
    { x: 14, y: -8, rotation: 2.4, scale: 0.94, opacity: 0.88 },
    { x: -10, y: 12, rotation: -1.8, scale: 1.04, opacity: 0.92 },
    { x: 12, y: 14, rotation: 2.2, scale: 0.95, opacity: 0.88 },
    { x: 0, y: -16, rotation: 0, scale: 1.08, opacity: 1 },
    { x: -14, y: 8, rotation: -2.6, scale: 0.94, opacity: 0.9 },
    { x: 16, y: -10, rotation: 2.8, scale: 1.05, opacity: 0.94 },
    { x: -8, y: 12, rotation: -1.6, scale: 0.96, opacity: 0.9 },
  ],
  terminal: [
    { x: -10, y: -12, rotation: -2.4, scale: 1.05, opacity: 0.92 },
    { x: 8, y: 10, rotation: 2.0, scale: 0.96, opacity: 0.88 },
    { x: -14, y: 8, rotation: -3.0, scale: 1.04, opacity: 0.9 },
    { x: 12, y: -14, rotation: 2.6, scale: 0.93, opacity: 0.86 },
    { x: 0, y: 12, rotation: 0, scale: 1.08, opacity: 1 },
    { x: 14, y: 8, rotation: -2.2, scale: 0.95, opacity: 0.9 },
    { x: -12, y: -10, rotation: 2.5, scale: 1.05, opacity: 0.92 },
  ],
};

export const KineticHeading: React.FC<KineticHeadingProps> = ({
  text,
  className = '',
  as: Component = 'h2',
  variant = 'telemetry',
  accentColor = '#f59e0b',
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const visualRef = useRef<HTMLDivElement>(null);
  const pathRef = useRef<SVGPathElement>(null);
  const dotRef = useRef<SVGCircleElement>(null);
  const words = text.split(' ');

  useGSAP(
    () => {
      const container = containerRef.current;
      const visual = visualRef.current;
      const path = pathRef.current;
      const dot = dotRef.current;
      if (!container) return;

      const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      if (prefersReducedMotion) return;

      const charElements = container.querySelectorAll<HTMLElement>('.kinetic-char');
      if (charElements.length === 0) return;

      const patternList = MOTION_PATTERNS[variant];

      // Measure SVG path length if present
      let pathLen = 200;
      if (path && path.getTotalLength) {
        pathLen = path.getTotalLength();
        gsap.set(path, {
          strokeDasharray: pathLen,
          strokeDashoffset: pathLen,
        });
      }

      // Initial state of interactive visual element
      if (visual) {
        gsap.set(visual, { opacity: 0, scale: 0.92 });
      }

      // =========================================================================
      // 4-PHASE CHOREOGRAPHED MASTER TIMELINE
      // Phase 1 (Normal) -> Phase 2 (Break Apart) -> Phase 3 (Visual Interaction) -> Phase 4 (Reform)
      // =========================================================================
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: container,
          start: 'top 82%',
          toggleActions: 'play none none reverse',
        },
      });

      // -------------------------------------------------------------------------
      // PHASE 2: BREAK APART (0.0s -> 0.38s)
      // Characters gently separate with physical offsets and subtle rotations
      // -------------------------------------------------------------------------
      charElements.forEach((charEl, idx) => {
        const motion = patternList[idx % patternList.length];
        tl.to(
          charEl,
          {
            x: motion.x,
            y: motion.y,
            rotation: motion.rotation,
            scale: motion.scale,
            opacity: motion.opacity,
            duration: 0.38,
            ease: 'power3.out',
          },
          0
        );
      });

      // -------------------------------------------------------------------------
      // PHASE 3: VISUAL INTERACTION (0.2s -> 0.75s)
      // Surrounding visual element enters, weaves between characters, and traces an edge
      // -------------------------------------------------------------------------
      if (visual) {
        tl.to(
          visual,
          {
            opacity: 1,
            scale: 1,
            duration: 0.3,
            ease: 'power2.out',
          },
          0.16
        );
      }

      if (path) {
        tl.to(
          path,
          {
            strokeDashoffset: 0,
            duration: 0.55,
            ease: 'power2.inOut',
            onUpdate: function () {
              if (dot && path.getPointAtLength) {
                const cur = pathLen * (1 - this.progress());
                const pt = path.getPointAtLength(pathLen - cur);
                dot.setAttribute('cx', `${pt.x}`);
                dot.setAttribute('cy', `${pt.y}`);
              }
            },
          },
          0.2
        );
      }

      // -------------------------------------------------------------------------
      // PHASE 4: REFORM (0.75s -> 1.25s)
      // All characters cleanly snap back into exact readable positions
      // -------------------------------------------------------------------------
      charElements.forEach((charEl) => {
        tl.to(
          charEl,
          {
            x: 0,
            y: 0,
            rotation: 0,
            scale: 1,
            opacity: 1,
            duration: 0.48,
            ease: 'power3.inOut',
          },
          0.72
        );
      });

      // Visual element settles into background baseline
      if (visual) {
        tl.to(
          visual,
          {
            opacity: 0.85,
            duration: 0.35,
            ease: 'power2.out',
          },
          0.9
        );
      }

      // Optional hover interaction replay on desktop
      const handleMouseEnter = () => {
        if (tl.progress() === 1) {
          tl.restart();
        }
      };

      container.addEventListener('mouseenter', handleMouseEnter);

      return () => {
        container.removeEventListener('mouseenter', handleMouseEnter);
        tl.kill();
      };
    },
    { scope: containerRef, dependencies: [text, variant] }
  );

  // Render variant-specific interactive visual elements
  const renderVisualElement = () => {
    switch (variant) {
      case 'telemetry':
        return (
          <div
            ref={visualRef}
            className="absolute -inset-x-4 inset-y-0 flex items-center justify-center pointer-events-none z-0 overflow-visible"
          >
            <svg
              className="w-full h-16 overflow-visible"
              viewBox="0 0 500 60"
              preserveAspectRatio="none"
              fill="none"
            >
              {/* Telemetry laser path weaving through characters */}
              <path
                ref={pathRef}
                d="M 10 30 C 80 30 110 12 160 12 C 210 12 240 45 300 45 C 360 45 390 28 490 28"
                stroke={accentColor}
                strokeWidth="2"
                strokeLinecap="round"
                className="drop-shadow-[0_0_8px_rgba(245,158,11,0.6)]"
              />
              <circle
                ref={dotRef}
                cx="10"
                cy="30"
                r="3.5"
                fill="#ffffff"
                className="drop-shadow-[0_0_6px_#f59e0b]"
              />
            </svg>
            <div className="absolute right-2 -bottom-2 text-[9px] font-mono text-amber-400/80 bg-black/80 px-2 py-0.5 rounded border border-amber-500/30">
              SYS_TELEM · ACTIVE
            </div>
          </div>
        );

      case 'git-branch':
        return (
          <div
            ref={visualRef}
            className="absolute -inset-x-4 inset-y-0 flex items-center justify-center pointer-events-none z-0 overflow-visible"
          >
            <svg
              className="w-full h-16 overflow-visible"
              viewBox="0 0 500 60"
              preserveAspectRatio="none"
              fill="none"
            >
              {/* Base upstream trunk */}
              <path
                d="M 10 40 H 490"
                stroke="#27272a"
                strokeWidth="1.5"
                strokeDasharray="4 4"
              />
              {/* Feature branch line weaving between words */}
              <path
                ref={pathRef}
                d="M 40 40 C 70 40 90 15 130 15 H 280 C 320 15 340 40 370 40 H 490"
                stroke="#38bdf8"
                strokeWidth="2"
                strokeLinecap="round"
                className="drop-shadow-[0_0_8px_rgba(56,189,248,0.6)]"
              />
              <circle cx="40" cy="40" r="3" fill="#38bdf8" />
              <circle cx="130" cy="15" r="3" fill="#38bdf8" />
              <circle cx="280" cy="15" r="3" fill="#38bdf8" />
              <circle
                ref={dotRef}
                cx="370"
                cy="40"
                r="3.5"
                fill="#ffffff"
                className="drop-shadow-[0_0_6px_#38bdf8]"
              />
            </svg>
            <div className="absolute right-4 -top-3 text-[9px] font-mono text-cyan-400/90 bg-black/80 px-2 py-0.5 rounded border border-cyan-500/30">
              git merge upstream/main
            </div>
          </div>
        );

      case 'blueprint':
        return (
          <div
            ref={visualRef}
            className="absolute -inset-3 flex flex-col justify-between pointer-events-none z-0 overflow-visible"
          >
            <div className="w-full flex items-center justify-between text-[10px] font-mono text-amber-400/80">
              <span>┌ [SPEC.05]</span>
              <span>[1440px] ┐</span>
            </div>
            <svg
              className="w-full h-8 overflow-visible"
              viewBox="0 0 400 30"
              preserveAspectRatio="none"
              fill="none"
            >
              <path
                ref={pathRef}
                d="M 10 15 H 390"
                stroke="#f59e0b"
                strokeWidth="1.5"
                strokeDasharray="6 3"
              />
              <circle ref={dotRef} cx="10" cy="15" r="3" fill="#f59e0b" />
            </svg>
            <div className="w-full flex items-center justify-between text-[10px] font-mono text-amber-400/80">
              <span>└ ARCH_SYSTEM</span>
              <span>RENDERED ┘</span>
            </div>
          </div>
        );

      case 'terminal':
        return (
          <div
            ref={visualRef}
            className="absolute -inset-x-2 inset-y-0 flex items-center justify-between pointer-events-none z-0 overflow-visible"
          >
            <svg
              className="w-full h-12 overflow-visible"
              viewBox="0 0 450 40"
              preserveAspectRatio="none"
              fill="none"
            >
              <path
                ref={pathRef}
                d="M 10 20 H 440"
                stroke="#f59e0b"
                strokeWidth="1.5"
                strokeDasharray="5 5"
              />
              <circle ref={dotRef} cx="10" cy="20" r="3" fill="#f59e0b" />
            </svg>
            <div className="absolute -left-5 top-1/2 -translate-y-1/2 font-mono text-amber-400 font-bold text-sm animate-pulse">
              &gt;
            </div>
            <div className="absolute -right-5 top-1/2 -translate-y-1/2 font-mono text-amber-400 font-bold text-sm animate-pulse">
              _
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <Component
      ref={containerRef as any}
      aria-label={text}
      className={`kinetic-heading relative inline-block cursor-default select-none group will-change-transform ${className}`}
    >
      {/* Accessible semantic text for screen readers */}
      <span className="sr-only">{text}</span>

      {/* Decorative Character-split Typography */}
      <span
        aria-hidden="true"
        className="kinetic-text-wrapper relative z-10 inline-flex flex-wrap items-baseline gap-x-[0.28em]"
      >
        {words.map((word, wordIndex) => (
          <span
            key={wordIndex}
            className="kinetic-word inline-flex items-baseline whitespace-nowrap"
          >
            {word.split('').map((char, charIndex) => (
              <span
                key={charIndex}
                className="kinetic-char inline-block will-change-transform origin-center transition-colors group-hover:text-amber-300"
              >
                {char}
              </span>
            ))}
          </span>
        ))}
      </span>

      {/* Surrounding Interactive Visual Element */}
      {renderVisualElement()}
    </Component>
  );
};

