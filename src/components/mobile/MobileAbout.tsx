import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const MobileAbout: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const mm = gsap.matchMedia();
    mm.add('(max-width: 767px)', () => {
      gsap.fromTo(
        '.mobile-about-content',
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    });

    return () => mm.revert();
  }, []);

  return (
    <section
      id="mobile-about"
      ref={sectionRef}
      className="relative w-full min-h-[92svh] flex flex-col justify-between py-12 px-6 bg-[#080909] text-[#F2F0E8] overflow-hidden border-t border-white/[0.06]"
    >
      {/* Subtle frame 050 portrait on top-right background */}
      <div className="absolute top-10 right-[-10%] w-56 h-72 opacity-25 pointer-events-none filter grayscale contrast-125">
        <img
          src="/images/hero-sequence/frame-050.webp"
          alt="Ayush Singh"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-l from-transparent via-[#080909]/60 to-[#080909]" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#080909] via-transparent to-transparent" />
      </div>

      <div className="mobile-about-content relative z-10 flex flex-col">
        {/* Section Label */}
        <div className="flex items-center space-x-1.5 text-[10px] font-mono tracking-widest uppercase text-[#F5D52F] mb-3">
          <span>ABOUT</span>
          <span>↗</span>
        </div>

        {/* Editorial Headline */}
        <h2 className="font-editorial text-[15vw] leading-[0.9] tracking-tight mb-6">
          <span className="text-[#F2F0E8]">I BUILD </span>
          <span className="text-[#F5D52F]">THINGS.</span>
        </h2>

        {/* Short bio paragraph */}
        <p className="text-sm text-[#8A8A8A] leading-relaxed max-w-sm mb-10">
          I'm Ayush Singh, a software engineer who loves building useful systems, contributing to open source, and working at the intersection of technology and real-world impact.
        </p>

        {/* 3 Impact Stats */}
        <div className="flex flex-col space-y-6">
          <div className="border-l-2 border-[#F5D52F] pl-4 py-0.5">
            <span className="block font-editorial text-4xl text-[#F5D52F] tracking-wide">
              25+
            </span>
            <span className="block font-mono text-xs text-[#8A8A8A] uppercase tracking-wider">
              Merged PRs
            </span>
          </div>

          <div className="border-l-2 border-[#F5D52F] pl-4 py-0.5">
            <span className="block font-editorial text-4xl text-[#F5D52F] tracking-wide">
              3+
            </span>
            <span className="block font-mono text-xs text-[#8A8A8A] uppercase tracking-wider">
              Open Source Ecosystems
            </span>
          </div>

          <div className="border-l-2 border-[#F5D52F] pl-4 py-0.5">
            <span className="block font-editorial text-4xl text-[#F5D52F] tracking-wide">
              8.62
            </span>
            <span className="block font-mono text-xs text-[#8A8A8A] uppercase tracking-wider">
              CGPA · IIIT Allahabad
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};
