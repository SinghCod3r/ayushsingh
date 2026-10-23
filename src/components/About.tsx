import React, { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { SectionLabel } from './SectionLabel';

gsap.registerPlugin(ScrollTrigger);

export const About: React.FC = () => {
  const containerRef = useRef<HTMLElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const bioRef = useRef<HTMLParagraphElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const portraitRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      if (prefersReducedMotion) return;

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 80%',
          toggleActions: 'play none none none',
        },
      });

      tl.from(headlineRef.current, {
        opacity: 0,
        y: 30,
        duration: 0.6,
        ease: 'power3.out',
      });

      tl.from(
        bioRef.current,
        {
          opacity: 0,
          y: 20,
          duration: 0.5,
          ease: 'power3.out',
        },
        '-=0.3'
      );

      tl.from(
        statsRef.current?.children || [],
        {
          opacity: 0,
          y: 20,
          duration: 0.5,
          stagger: 0.1,
          ease: 'power3.out',
        },
        '-=0.2'
      );

      tl.from(
        portraitRef.current,
        {
          opacity: 0,
          scale: 0.95,
          duration: 0.7,
          ease: 'power2.out',
        },
        '-=0.4'
      );
    },
    { scope: containerRef }
  );

  return (
    <section
      id="about"
      ref={containerRef}
      className="relative w-full py-24 sm:py-32 bg-[#080909] text-[#F2F0E8] overflow-hidden border-t border-white/[0.06]"
      style={{ isolation: 'isolate' }}
    >
      {/* Background Subtle Portrait with Yellow Rim Light */}
      <div
        ref={portraitRef}
        className="absolute top-1/2 -translate-y-1/2 right-0 sm:right-6 md:right-16 w-80 sm:w-[480px] md:w-[600px] h-[550px] pointer-events-none opacity-30 sm:opacity-40 select-none z-0 overflow-hidden"
      >
        <img
          src="/images/hero-sequence/frame-050.webp"
          alt=""
          className="w-full h-full object-contain grayscale contrast-125 brightness-95"
          loading="lazy"
        />
        {/* Warm yellow ambient backlight */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] h-[350px] rounded-full bg-[#F5D52F]/15 blur-[120px] pointer-events-none" />
      </div>

      <div className="max-w-7xl mx-auto px-6 sm:px-10 relative z-10">
        
        {/* Section Label: ABOUT */}
        <div className="mb-8">
          <SectionLabel label="ABOUT" />
        </div>

        <div className="max-w-2xl space-y-8">
          
          {/* Main Statement: I BUILD (White) THINGS. (Yellow) */}
          <h2
            ref={headlineRef}
            className="font-display text-6xl sm:text-8xl md:text-9xl leading-[0.88] tracking-wide uppercase"
          >
            I BUILD <br />
            <span className="text-[#F5D52F]">THINGS.</span>
          </h2>

          {/* Bio text */}
          <p
            ref={bioRef}
            className="font-sans text-base sm:text-lg text-[#8A8A8A] leading-relaxed max-w-xl"
          >
            I'm Ayush Singh, a software engineer who loves building useful systems, contributing to open source, and working at the intersection of technology and real-world impact.
          </p>

          {/* 3 Key Stats */}
          <div
            ref={statsRef}
            className="pt-6 border-t border-white/[0.08] flex flex-wrap items-baseline gap-10 sm:gap-16"
          >
            {/* Stat 1 */}
            <div>
              <div className="font-display text-4xl sm:text-5xl text-[#F5D52F] font-bold">
                25+
              </div>
              <div className="font-mono text-xs text-[#8A8A8A] uppercase tracking-wider mt-1">
                Merged PRs
              </div>
            </div>

            {/* Stat 2 */}
            <div>
              <div className="font-display text-4xl sm:text-5xl text-[#F2F0E8] font-bold">
                3+
              </div>
              <div className="font-mono text-xs text-[#8A8A8A] uppercase tracking-wider mt-1">
                Open Source Ecosystems
              </div>
            </div>

            {/* Stat 3 */}
            <div>
              <div className="font-display text-4xl sm:text-5xl text-[#F2F0E8] font-bold">
                8.62
              </div>
              <div className="font-mono text-xs text-[#8A8A8A] uppercase tracking-wider mt-1">
                CGPA · IIIT Allahabad
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
