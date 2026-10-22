import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';

export const WorkMarquee: React.FC = () => {
  const row1Ref = useRef<HTMLDivElement>(null);
  const row2Ref = useRef<HTMLDivElement>(null);

  const x1 = useRef(0);
  const x2 = useRef(0);

  const line1 = 'SELECTED WORK — SOFTWARE — OPEN SOURCE — BUILDING — SELECTED WORK — SOFTWARE — OPEN SOURCE — BUILDING — ';
  const line2 = '— LINUX — AI — SYSTEMS — PRODUCTS — ENGINEERING — — LINUX — AI — SYSTEMS — PRODUCTS — ENGINEERING — ';

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const baseSpeed1 = 0.04; // Calm base speed moving Left -> Right
    const baseSpeed2 = -0.045; // Calm base speed moving Right -> Left
    let velocityMultiplier = 0;

    let lastScrollY = window.scrollY;
    let lastTime = performance.now();

    const onScroll = () => {
      const now = performance.now();
      const dt = Math.max(1, now - lastTime);
      const dy = window.scrollY - lastScrollY;
      const v = (dy / dt) * 0.35;
      velocityMultiplier = Math.max(-1.8, Math.min(1.8, v));
      lastScrollY = window.scrollY;
      lastTime = now;
    };

    window.addEventListener('scroll', onScroll, { passive: true });

    const onTick = () => {
      // Smoothly return velocity addition to 0
      velocityMultiplier += (0 - velocityMultiplier) * 0.06;

      const currentSpeed1 = baseSpeed1 + velocityMultiplier * 0.08;
      const currentSpeed2 = baseSpeed2 - velocityMultiplier * 0.08;

      x1.current += currentSpeed1;
      x2.current += currentSpeed2;

      // Wrap-around modulo at 50%
      if (x1.current >= 50) x1.current -= 50;
      if (x1.current <= 0) x1.current += 50;

      if (x2.current <= -50) x2.current += 50;
      if (x2.current >= 0) x2.current -= 50;

      if (row1Ref.current) {
        row1Ref.current.style.transform = `translate3d(${x1.current - 50}%, 0, 0)`;
      }
      if (row2Ref.current) {
        row2Ref.current.style.transform = `translate3d(${x2.current}%, 0, 0)`;
      }
    };

    gsap.ticker.add(onTick);

    return () => {
      window.removeEventListener('scroll', onScroll);
      gsap.ticker.remove(onTick);
    };
  }, []);

  return (
    <div className="absolute inset-0 pointer-events-none select-none overflow-hidden z-0 flex flex-col justify-between py-12 lg:py-20 opacity-[0.045]">
      {/* Line A: Upper track moving Left -> Right */}
      <div className="w-full overflow-hidden whitespace-nowrap">
        <div ref={row1Ref} className="inline-flex will-change-transform">
          <span className="font-display font-black text-5xl sm:text-7xl lg:text-8xl uppercase tracking-tight text-outline px-4">
            {line1}
          </span>
          <span className="font-display font-black text-5xl sm:text-7xl lg:text-8xl uppercase tracking-tight text-outline px-4" aria-hidden="true">
            {line1}
          </span>
        </div>
      </div>

      {/* Line B: Lower track moving Right -> Left */}
      <div className="w-full overflow-hidden whitespace-nowrap">
        <div ref={row2Ref} className="inline-flex will-change-transform">
          <span className="font-display font-black text-5xl sm:text-7xl lg:text-8xl uppercase tracking-tight text-outline px-4">
            {line2}
          </span>
          <span className="font-display font-black text-5xl sm:text-7xl lg:text-8xl uppercase tracking-tight text-outline px-4" aria-hidden="true">
            {line2}
          </span>
        </div>
      </div>
    </div>
  );
};
