import React, { useRef, useState, useEffect } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

interface PageLoaderProps {
  onComplete?: () => void;
}

const FULL_TEXT = 'SINGH CODE 3R';

export const PageLoader: React.FC<PageLoaderProps> = ({ onComplete }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const [displayedText, setDisplayedText] = useState('');
  const [isDone, setIsDone] = useState(false);

  useEffect(() => {
    // Progressive editorial character reveal:
    // S -> SI -> SIN -> SING -> SINGH -> SINGH C -> ... -> SINGH CODE 3R
    let currentIdx = 0;
    const intervalMs = 45; // crisp, refined cadence

    const interval = setInterval(() => {
      currentIdx++;
      if (currentIdx <= FULL_TEXT.length) {
        setDisplayedText(FULL_TEXT.slice(0, currentIdx));
      } else {
        clearInterval(interval);
      }
    }, intervalMs);

    return () => clearInterval(interval);
  }, []);

  useGSAP(
    () => {
      const container = containerRef.current;
      const text = textRef.current;
      if (!container || !text) return;

      const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

      if (prefersReducedMotion) {
        container.style.display = 'none';
        setIsDone(true);
        onComplete?.();
        return;
      }

      // Timeline starts after progressive typing finishes (13 chars * 45ms = ~585ms + 220ms rest)
      const tl = gsap.timeline({
        delay: 0.80,
        onComplete: () => {
          if (container) container.style.display = 'none';
          setIsDone(true);
          onComplete?.();
        },
      });

      // 1. Subtle, refined letter spacing expansion
      tl.to(text, {
        letterSpacing: '0.28em',
        opacity: 0.95,
        duration: 0.35,
        ease: 'power2.out',
      });

      // 2. Smooth, natural transition: curtain dissolves upward and fades out
      tl.to(
        container,
        {
          opacity: 0,
          yPercent: -8,
          duration: 0.40,
          ease: 'power2.inOut',
        },
        '+=0.08'
      );
    },
    { scope: containerRef }
  );

  if (isDone) return null;

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[100] bg-[#08080a] flex flex-col items-center justify-center select-none cursor-default"
      aria-label="Loading portfolio"
      role="status"
    >
      <div className="relative flex flex-col items-center">
        {/* Editorial Wordmark Reveal */}
        <div
          ref={textRef}
          className="text-lg sm:text-xl md:text-2xl font-mono tracking-[0.22em] text-zinc-100 uppercase transition-all duration-75 select-none font-medium"
          style={{ minHeight: '2.5rem' }}
        >
          {displayedText}
          <span className="opacity-0">|</span>
        </div>

        {/* Quiet, minimalist status hint */}
        <div className="mt-6 text-[10px] font-mono tracking-[0.3em] uppercase text-zinc-600 transition-opacity duration-300">
          Ayush Singh • Portfolio
        </div>
      </div>
    </div>
  );
};
