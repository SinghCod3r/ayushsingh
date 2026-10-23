import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { portfolioData } from '../../../data';

gsap.registerPlugin(ScrollTrigger);

export const Marquee: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const line1Ref = useRef<HTMLDivElement>(null);
  const line2Ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    const line1 = line1Ref.current;
    const line2 = line2Ref.current;
    if (!container || !line1 || !line2) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    let x1 = 0;
    let x2 = 0;
    let velocityMultiplier = 1;

    // ScrollTrigger to detect scroll velocity
    const st = ScrollTrigger.create({
      trigger: container,
      start: 'top bottom',
      end: 'bottom top',
      onUpdate: (self) => {
        const vel = Math.abs(self.getVelocity() / 300);
        velocityMultiplier = 1 + Math.min(vel, 3);
      },
    });

    let rafId: number;

    const tick = () => {
      // Line 1 moves right-to-left (standard)
      x1 -= 1.2 * velocityMultiplier;
      // Line 2 moves left-to-right (counter)
      x2 += 0.9 * velocityMultiplier;

      // Ease back velocity to 1
      velocityMultiplier += (1 - velocityMultiplier) * 0.05;

      // Loop thresholds (using 50% width of doubled text)
      if (line1) {
        if (Math.abs(x1) >= line1.scrollWidth / 2) {
          x1 = 0;
        }
        line1.style.transform = `translate3d(${x1}px, 0, 0)`;
      }

      if (line2) {
        if (x2 >= 0) {
          x2 = -line2.scrollWidth / 2;
        }
        line2.style.transform = `translate3d(${x2}px, 0, 0)`;
      }

      rafId = requestAnimationFrame(tick);
    };

    // Set initial position for line 2
    if (line2) {
      x2 = -line2.scrollWidth / 4;
    }

    rafId = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(rafId);
      st.kill();
    };
  }, []);

  const repeatLine1 = `${portfolioData.marquee.line1} `.repeat(4);
  const repeatLine2 = `${portfolioData.marquee.line2} `.repeat(4);

  return (
    <section
      ref={containerRef}
      className="relative w-full py-8 md:py-14 bg-[#0a0b0e] border-y border-zinc-800/60 overflow-hidden select-none"
    >
      {/* Edge gradient masks for seamless fade out */}
      <div className="absolute inset-y-0 left-0 w-24 sm:w-40 bg-gradient-to-r from-[#0a0b0e] to-transparent z-10 pointer-events-none" />
      <div className="absolute inset-y-0 right-0 w-24 sm:w-40 bg-gradient-to-l from-[#0a0b0e] to-transparent z-10 pointer-events-none" />

      <div className="flex flex-col gap-3 sm:gap-5">
        
        {/* LINE 1: RIGHT TO LEFT */}
        <div className="flex whitespace-nowrap overflow-hidden">
          <div
            ref={line1Ref}
            className="flex items-center text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-display font-extrabold uppercase tracking-tight text-zinc-100 will-change-transform"
          >
            <span>{repeatLine1}</span>
          </div>
        </div>

        {/* LINE 2: LEFT TO RIGHT (OUTLINE) */}
        <div className="flex whitespace-nowrap overflow-hidden">
          <div
            ref={line2Ref}
            className="flex items-center text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-display font-extrabold uppercase tracking-tight text-outline text-amber-400/30 will-change-transform"
          >
            <span>{repeatLine2}</span>
          </div>
        </div>

      </div>
    </section>
  );
};

