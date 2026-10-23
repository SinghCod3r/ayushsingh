import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface Milestone {
  year: string;
  title: string;
  desc?: string;
  badge?: string;
}

const MILESTONES: Milestone[] = [
  {
    year: '2022',
    title: 'Started Computer Science',
    desc: 'IIIT Allahabad',
  },
  {
    year: '2024',
    title: 'Got into Open Source',
    desc: 'Contributing upstream to Linux desktop tools',
  },
  {
    year: '2026',
    title: 'Linux Foundation / OpenPrinting',
    desc: 'Architecture & modern printing dialogs',
    badge: 'OpenPrinting',
  },
  {
    year: 'NOW',
    title: 'Building systems',
    desc: 'Exploring what is next in software and intelligence',
  },
];

export const MobileJourney: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const mm = gsap.matchMedia();
    mm.add('(max-width: 767px)', () => {
      gsap.fromTo(
        '.mobile-milestone-card',
        { opacity: 0, x: -20 },
        {
          opacity: 1,
          x: 0,
          stagger: 0.15,
          duration: 0.7,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 75%',
          },
        }
      );
    });

    return () => mm.revert();
  }, []);

  return (
    <section
      id="mobile-journey"
      ref={sectionRef}
      className="relative w-full py-14 px-6 bg-[#080909] text-[#F2F0E8] overflow-hidden border-t border-white/[0.06]"
    >
      {/* Side portrait frame 100 */}
      <div className="absolute top-12 right-[-5%] w-52 h-64 opacity-20 pointer-events-none filter grayscale contrast-125">
        <img
          src="/images/hero-sequence/frame-100.webp"
          alt="Ayush Singh"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-l from-transparent via-[#080909]/60 to-[#080909]" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#080909] via-transparent to-transparent" />
      </div>

      <div className="relative z-10 flex flex-col">
        {/* Section Label */}
        <div className="flex items-center space-x-1.5 text-[10px] font-mono tracking-widest uppercase text-[#F5D52F] mb-3">
          <span>JOURNEY</span>
          <span>↗</span>
        </div>

        {/* Editorial Headline */}
        <h2 className="font-editorial text-[15vw] leading-[0.9] tracking-tight mb-10">
          <span className="text-[#F2F0E8]">A PATH<br /></span>
          <span className="text-[#F2F0E8]">OF BUILDING.</span>
        </h2>

        {/* Vertical Timeline */}
        <div className="relative pl-6 border-l-2 border-[#F5D52F]/80 flex flex-col space-y-8">
          {MILESTONES.map((item) => (
            <div
              key={item.year}
              className="mobile-milestone-card relative flex flex-col group"
            >
              {/* Glowing yellow node circle on the track */}
              <div className="absolute -left-[31px] top-1.5 w-3.5 h-3.5 rounded-full bg-[#080909] border-2 border-[#F5D52F] flex items-center justify-center shadow-[0_0_10px_rgba(245,213,47,0.5)]">
                <div className="w-1.5 h-1.5 rounded-full bg-[#F5D52F]" />
              </div>

              {/* Year badge */}
              <div className="flex items-center space-x-2">
                <span className="font-editorial text-2xl tracking-wide text-[#F5D52F]">
                  {item.year}
                </span>
                {item.badge && (
                  <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-white/[0.06] text-[#F2F0E8] border border-white/10">
                    {item.badge}
                  </span>
                )}
              </div>

              {/* Title & Desc */}
              <h3 className="text-sm font-medium text-[#F2F0E8] mt-1">
                {item.title}
              </h3>
              {item.desc && (
                <p className="text-xs text-[#8A8A8A] font-mono mt-0.5">
                  {item.desc}
                </p>
              )}
            </div>
          ))}
        </div>

        {/* Circular Arrow Indicator */}
        <div className="mt-12 flex items-center justify-center">
          <a
            href="#mobile-opensource"
            className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center text-xs font-mono text-[#8A8A8A] hover:border-[#F5D52F] hover:text-[#F5D52F] transition-colors"
          >
            <span>↓</span>
          </a>
        </div>
      </div>
    </section>
  );
};
