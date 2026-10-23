import React, { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { ArrowDown } from 'lucide-react';
import { SectionLabel } from './SectionLabel';
import { scrollToTarget } from '../utils/scroll';

gsap.registerPlugin(ScrollTrigger);

interface TimelineItem {
  year: string;
  title: string;
  description: string;
  badge?: string;
  active?: boolean;
}

const TIMELINE_DATA: TimelineItem[] = [
  {
    year: '2022',
    title: 'Started Computer Science',
    description: 'B.Tech CSE at IIIT Allahabad (CGPA 8.62). Founded systems interest.',
  },
  {
    year: '2024',
    title: 'Got into Open Source',
    description: 'First upstream PRs merged. Built Ezy scripting language in Python.',
  },
  {
    year: '2026',
    title: 'Linux Foundation (OpenPrinting)',
    description: 'Selected as Maintainer for system-config-printer. Debugged CUPS, IPP, GTK.',
    badge: 'OpenPrinting',
  },
  {
    year: 'NOW',
    title: 'Building Systems & Exploring Next',
    description: 'Engineering resilient Linux desktop tools, distributed backends, and AI workflows.',
    active: true,
  },
];

export const AboutJourney: React.FC = () => {
  const containerRef = useRef<HTMLElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const timelineRef = useRef<HTMLDivElement>(null);
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
        y: 28,
        duration: 0.6,
        ease: 'power3.out',
      });

      tl.from(
        timelineRef.current?.querySelectorAll('.timeline-node-card') || [],
        {
          opacity: 0,
          x: -20,
          duration: 0.5,
          stagger: 0.12,
          ease: 'power3.out',
        },
        '-=0.3'
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
      id="journey"
      ref={containerRef}
      className="relative w-full py-24 sm:py-32 bg-[#080909] text-[#F2F0E8] overflow-hidden border-t border-white/[0.06]"
      style={{ isolation: 'isolate' }}
    >
      {/* Side Background Portrait with Warm Yellow Rim Light */}
      <div
        ref={portraitRef}
        className="absolute top-1/2 -translate-y-1/2 right-0 sm:right-6 md:right-12 w-80 sm:w-[480px] md:w-[580px] h-[550px] pointer-events-none opacity-25 sm:opacity-35 select-none z-0 overflow-hidden"
      >
        <img
          src="/images/hero-sequence/frame-100.webp"
          alt=""
          className="w-full h-full object-contain grayscale contrast-125 brightness-90"
          loading="lazy"
        />
        {/* Warm yellow ambient glow */}
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[340px] h-[340px] rounded-full bg-[#F5D52F]/14 blur-[120px] pointer-events-none" />
      </div>

      <div className="max-w-7xl mx-auto px-6 sm:px-10 relative z-10">
        
        {/* Section Label: JOURNEY */}
        <div className="mb-8">
          <SectionLabel label="JOURNEY" />
        </div>

        {/* Headline: A PATH (White) OF BUILDING. (Yellow) */}
        <h2
          ref={headlineRef}
          className="font-display text-6xl sm:text-8xl md:text-9xl leading-[0.88] tracking-wide uppercase mb-12 sm:mb-16"
        >
          A PATH <br />
          <span className="text-[#F5D52F]">OF BUILDING.</span>
        </h2>

        {/* Vertical Editorial Timeline */}
        <div ref={timelineRef} className="relative max-w-xl pl-6 sm:pl-8 space-y-8 sm:space-y-10">
          
          {/* Vertical Yellow Timeline Track */}
          <div className="absolute top-3 bottom-3 left-[9px] sm:left-[11px] w-[2px] bg-gradient-to-b from-[#F5D52F] via-[#F5D52F]/80 to-[#F5D52F]/30" />

          {TIMELINE_DATA.map((item, idx) => (
            <div key={idx} className="relative timeline-node-card group">
              
              {/* Yellow Node Dot */}
              <div
                className={`absolute -left-[27px] sm:-left-[29px] top-1.5 w-3.5 h-3.5 rounded-full border-2 border-[#080909] transition-transform duration-300 ${
                  item.active
                    ? 'bg-[#F5D52F] shadow-[0_0_12px_rgba(245,213,47,0.9)] scale-110'
                    : 'bg-[#F5D52F] group-hover:scale-125'
                }`}
              />

              {/* Translucent Dark Glass Card */}
              <div className="p-5 sm:p-6 rounded-xl bg-white/[0.02] border border-white/[0.07] backdrop-blur-sm hover:border-[#F5D52F]/40 transition-colors">
                
                {/* Year Badge */}
                <div className="flex items-center justify-between mb-2">
                  <span className="font-mono text-xs sm:text-sm font-bold tracking-wider text-[#F5D52F]">
                    {item.year}
                  </span>
                  {item.badge && (
                    <span className="px-2 py-0.5 rounded text-[10px] font-mono uppercase tracking-wider bg-[#F5D52F]/10 border border-[#F5D52F]/25 text-[#F5D52F]">
                      {item.badge}
                    </span>
                  )}
                </div>

                {/* Title */}
                <h3 className="font-display text-2xl sm:text-3xl text-[#F2F0E8] tracking-wide mb-1">
                  {item.title}
                </h3>

                {/* Description */}
                <p className="font-sans text-xs sm:text-sm text-[#8A8A8A] leading-relaxed">
                  {item.description}
                </p>

              </div>
            </div>
          ))}

        </div>

        {/* Bottom Circular Arrow Button */}
        <div className="pt-12 sm:pt-16">
          <button
            onClick={() => scrollToTarget('#open-source', -20)}
            className="w-10 h-10 rounded-full border border-white/20 hover:border-[#F5D52F] flex items-center justify-center text-[#8A8A8A] hover:text-[#F5D52F] transition-colors cursor-pointer group"
            aria-label="Scroll to Open Source section"
          >
            <ArrowDown size={16} className="text-[#F2F0E8] group-hover:text-[#F5D52F] group-hover:translate-y-0.5 transition-transform" />
          </button>
        </div>

      </div>
    </section>
  );
};
