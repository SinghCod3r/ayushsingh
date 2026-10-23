import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const SignatureLine: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const pathRef = useRef<SVGPathElement>(null);
  const pulseDotRef = useRef<SVGCircleElement>(null);
  const textRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    const path = pathRef.current;
    const dot = pulseDotRef.current;
    if (!container || !path || !dot) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const length = path.getTotalLength();
    path.style.strokeDasharray = `${length}`;
    path.style.strokeDashoffset = `${length}`;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: container,
          start: 'top 85%',
          end: 'bottom 40%',
          scrub: 0.8,
        },
      });

      // Line draws along word edge, becomes underline, then section divider
      tl.to(path, {
        strokeDashoffset: 0,
        ease: 'none',
        onUpdate: function () {
          // Calculate current point along SVG path for pulse dot
          const currentLength = length * (1 - this.progress());
          const point = path.getPointAtLength(length - currentLength);
          dot.setAttribute('cx', `${point.x}`);
          dot.setAttribute('cy', `${point.y}`);
        },
      });

      // Text subtle stretch & glow as line contours along the word edge (Requirement 10)
      tl.to(
        textRef.current,
        {
          letterSpacing: '0.06em',
          scaleX: 1.03,
          color: '#ffffff',
          textShadow: '0 0 25px rgba(245, 158, 11, 0.5)',
          duration: 0.35,
          ease: 'power2.out',
        },
        0.2
      );

      // Text reforms into crisp display tracking
      tl.to(
        textRef.current,
        {
          letterSpacing: '-0.02em',
          scaleX: 1,
          duration: 0.35,
          ease: 'power3.inOut',
        },
        0.55
      );
    }, container);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative w-full py-12 md:py-16 overflow-hidden flex flex-col items-center justify-center select-none"
      style={{ isolation: 'isolate' }}
    >
      <div className="w-full max-w-7xl mx-auto px-6 lg:px-8 relative">
        
        {/* Large Statement that line contours around */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-baseline gap-3">
            <span
              ref={textRef}
              className="font-display text-2xl sm:text-4xl md:text-5xl font-bold tracking-tight text-zinc-400 transition-colors duration-300"
            >
              UPSTREAM FIRST.
            </span>
          </div>

          <span className="text-[11px] font-mono text-amber-400/80 hidden sm:inline-block">
            CONTINUOUS FLOW — 2026
          </span>
        </div>

        {/* Dynamic SVG Line that contours around the word and extends into next chapter */}
        <div className="relative w-full h-24 sm:h-28">
          <svg
            className="w-full h-full overflow-visible"
            viewBox="0 0 1000 100"
            preserveAspectRatio="none"
            fill="none"
          >
            <defs>
              <linearGradient id="lineGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#f59e0b" stopOpacity="0.1" />
                <stop offset="30%" stopColor="#f59e0b" stopOpacity="0.9" />
                <stop offset="70%" stopColor="#ff5e1a" stopOpacity="0.9" />
                <stop offset="100%" stopColor="#f59e0b" stopOpacity="0.2" />
              </linearGradient>
            </defs>

            {/* Background subtle guide path */}
            <path
              d="M 10 10 L 250 10 C 290 10 310 50 360 50 L 990 50"
              stroke="#22252d"
              strokeWidth="1.5"
              strokeDasharray="4 4"
            />

            {/* Animated Edge Line */}
            <path
              ref={pathRef}
              d="M 10 10 L 250 10 C 290 10 310 50 360 50 L 990 50"
              stroke="url(#lineGrad)"
              strokeWidth="2.5"
              strokeLinecap="round"
            />

            {/* Travelling pulse beacon along the contour */}
            <circle
              ref={pulseDotRef}
              cx="10"
              cy="10"
              r="4"
              fill="#fbbf24"
              className="drop-shadow-[0_0_8px_#f59e0b]"
            />
          </svg>
        </div>

      </div>
    </div>
  );
};

