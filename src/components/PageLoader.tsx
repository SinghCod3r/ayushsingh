import React, { useRef, useState, useEffect } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

interface PageLoaderProps {
  onComplete?: () => void;
}

export const PageLoader: React.FC<PageLoaderProps> = ({ onComplete }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const dotsRef = useRef<HTMLDivElement>(null);
  const silhouetteRef = useRef<HTMLDivElement>(null);
  const [isDone, setIsDone] = useState(false);

  useEffect(() => {
    // Check if user already saw the intro in this session
    const seen = sessionStorage.getItem('ayush_intro_seen');
    if (seen === 'true') {
      setIsDone(true);
      onComplete?.();
    }
  }, [onComplete]);

  useGSAP(
    () => {
      if (isDone) return;
      const container = containerRef.current;
      const logo = logoRef.current;
      const dots = dotsRef.current;
      const silhouette = silhouetteRef.current;
      if (!container || !logo) return;

      const tl = gsap.timeline({
        onComplete: () => {
          sessionStorage.setItem('ayush_intro_seen', 'true');
          setIsDone(true);
          onComplete?.();
        },
      });

      // 0.0 - 0.6s: Pure Black + very subtle silhouette glow emergence
      tl.set([logo, dots], { opacity: 0 });
      tl.set(silhouette, { opacity: 0, scale: 0.96 });

      tl.to(silhouette, {
        opacity: 0.25,
        scale: 1,
        duration: 0.8,
        ease: 'power2.out',
      }, 0.2);

      // 0.6 - 1.3s: "singhcod3r" appears smoothly with subtle vertical drift
      tl.fromTo(
        logo,
        { opacity: 0, y: 16, filter: 'blur(8px)' },
        {
          opacity: 1,
          y: 0,
          filter: 'blur(0px)',
          duration: 0.7,
          ease: 'power3.out',
        },
        0.6
      );

      // Dots pulse below logo
      if (dots) {
        tl.fromTo(
          dots,
          { opacity: 0, y: 8 },
          { opacity: 1, y: 0, duration: 0.4, ease: 'power2.out' },
          0.9
        );
      }

      // 1.3 - 2.0s: Logo holds calmly in center with soft breathing light
      tl.to(logo, {
        scale: 1.02,
        duration: 0.7,
        ease: 'sine.inOut',
      }, 1.3);

      // 2.0 - 3.0s: Logo & silhouette transition smoothly into the Hero
      tl.to(
        [logo, dots],
        {
          opacity: 0,
          y: -24,
          duration: 0.6,
          ease: 'power2.in',
        },
        2.2
      );

      tl.to(
        container,
        {
          opacity: 0,
          duration: 0.7,
          ease: 'power3.inOut',
        },
        2.5
      );
    },
    { scope: containerRef, dependencies: [isDone] }
  );

  // Allow clicking anywhere to skip
  const handleSkip = () => {
    if (containerRef.current) {
      gsap.to(containerRef.current, {
        opacity: 0,
        duration: 0.3,
        ease: 'power2.out',
        onComplete: () => {
          sessionStorage.setItem('ayush_intro_seen', 'true');
          setIsDone(true);
          onComplete?.();
        },
      });
    }
  };

  if (isDone) return null;

  return (
    <div
      ref={containerRef}
      onClick={handleSkip}
      className="fixed inset-0 z-50 bg-[#080909] flex flex-col items-center justify-center select-none cursor-pointer overflow-hidden"
    >
      {/* Background Silhouette with warm yellow rim lighting */}
      <div
        ref={silhouetteRef}
        className="absolute inset-0 z-0 flex items-center justify-center pointer-events-none opacity-0"
      >
        <img
          src="/images/hero-sequence/frame-001.webp"
          alt=""
          className="w-full h-full max-w-3xl object-contain grayscale brightness-75 contrast-125"
        />
        {/* Warm yellow ambient rim glow behind portrait */}
        <div className="absolute w-[400px] h-[400px] rounded-full bg-[#F5D52F]/10 blur-[120px] pointer-events-none" />
      </div>

      {/* Center Branding: singhcod3r */}
      <div className="relative z-10 flex flex-col items-center gap-3">
        <div ref={logoRef} className="font-display text-4xl sm:text-6xl tracking-wider text-[#F2F0E8] drop-shadow-[0_10px_30px_rgba(0,0,0,0.8)]">
          singh<span className="text-[#F5D52F]">cod3r</span>
        </div>

        {/* 3 Amber Dots */}
        <div ref={dotsRef} className="flex items-center gap-1.5 opacity-0">
          <span className="w-1.5 h-1.5 rounded-full bg-[#F5D52F] animate-pulse" />
          <span className="w-1.5 h-1.5 rounded-full bg-[#F5D52F]/70 animate-pulse delay-100" />
          <span className="w-1.5 h-1.5 rounded-full bg-[#F5D52F]/40 animate-pulse delay-200" />
        </div>
      </div>

      {/* Subtle skip hint */}
      <div className="absolute bottom-6 font-mono text-[10px] tracking-widest uppercase text-[#8A8A8A]/60">
        CLICK TO SKIP
      </div>
    </div>
  );
};
