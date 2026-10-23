import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { portfolioData } from '../../../data';

gsap.registerPlugin(ScrollTrigger);

export const MobileOpenSource: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const mm = gsap.matchMedia();
    mm.add('(max-width: 767px)', () => {
      gsap.fromTo(
        '.mobile-os-card',
        { opacity: 0, y: 25 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
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
      id="mobile-opensource"
      ref={sectionRef}
      className="relative w-full py-14 px-6 bg-[#080909] text-[#F2F0E8] overflow-hidden border-t border-white/[0.06]"
    >
      {/* Dark silhouette portrait frame 140 */}
      <div className="absolute top-16 right-[-8%] w-56 h-72 opacity-20 pointer-events-none filter grayscale contrast-125">
        <img
          src="/images/hero-sequence/frame-140.webp"
          alt="Ayush Singh"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-l from-transparent via-[#080909]/60 to-[#080909]" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#080909] via-transparent to-transparent" />
      </div>

      <div className="relative z-10 flex flex-col">
        {/* Section Label */}
        <div className="flex items-center space-x-1.5 text-[10px] font-mono tracking-widest uppercase text-[#F5D52F] mb-3">
          <span>OPEN SOURCE</span>
          <span>↗</span>
        </div>

        {/* Editorial Headline */}
        <h2 className="font-editorial text-[14vw] leading-[0.9] tracking-tight mb-3">
          <span className="text-[#F2F0E8]">REAL<br /></span>
          <span className="text-[#F2F0E8]">CONTRIBUTIONS.<br /></span>
          <span className="text-[#F5D52F]">REAL IMPACT.</span>
        </h2>

        <p className="text-sm text-[#8A8A8A] leading-relaxed max-w-sm mb-8 font-sans">
          I work on Linux desktop systems used in the real world across distributions.
        </p>

        {/* Major Feature Card: OpenPrinting */}
        <div className="mobile-os-card p-5 rounded-2xl bg-white/[0.03] border border-white/[0.08] backdrop-blur-md mb-8">
          <div className="flex items-center justify-between mb-4">
            <div>
              <span className="block text-[11px] font-mono text-[#8A8A8A] uppercase tracking-wider">
                The Linux Foundation
              </span>
              <h3 className="font-editorial text-2xl text-[#F2F0E8] tracking-wide">
                OpenPrinting
              </h3>
            </div>
            <a
              href="https://github.com/OpenPrinting"
              target="_blank"
              rel="noopener noreferrer"
              className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center text-[#8A8A8A] hover:text-[#F5D52F]"
            >
              ↗
            </a>
          </div>

          <div className="grid grid-cols-2 gap-3 py-3 border-y border-white/[0.06] mb-4">
            <div>
              <span className="block font-editorial text-2xl text-[#F5D52F]">4</span>
              <span className="block text-[10px] font-mono text-[#8A8A8A] uppercase">Repositories</span>
            </div>
            <div>
              <span className="block font-editorial text-2xl text-[#F5D52F]">11+</span>
              <span className="block text-[10px] font-mono text-[#8A8A8A] uppercase">Merged PRs</span>
            </div>
          </div>

          <p className="text-xs font-mono text-[#8A8A8A] mb-5">
            CUPS · GTK · D-Bus · system-config-printer
          </p>

          <a
            href="https://github.com/OpenPrinting"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full flex items-center justify-center py-3 rounded-xl bg-[#F5D52F] text-[#080909] font-mono text-xs font-bold tracking-wider hover:bg-yellow-400 transition-colors"
          >
            VIEW ON GITHUB →
          </a>
        </div>

        {/* Recent Contributions feed */}
        <div className="flex flex-col">
          <span className="text-[11px] font-mono text-[#8A8A8A] uppercase tracking-wider mb-3">
            Recent Contributions
          </span>

          <div className="flex flex-col space-y-3">
            <div className="p-3.5 rounded-xl bg-white/[0.02] border border-white/[0.06] flex items-start justify-between">
              <div>
                <h4 className="text-xs font-medium text-[#F2F0E8]">
                  Add support for new printer options
                </h4>
                <span className="text-[10px] font-mono text-[#8A8A8A]">
                  system-config-printer · 2 weeks ago
                </span>
              </div>
              <span className="px-2 py-0.5 rounded text-[9px] font-mono bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                MERGED
              </span>
            </div>

            <div className="p-3.5 rounded-xl bg-white/[0.02] border border-white/[0.06] flex items-start justify-between">
              <div>
                <h4 className="text-xs font-medium text-[#F2F0E8]">
                  Fix dialog crash on GTK 4
                </h4>
                <span className="text-[10px] font-mono text-[#8A8A8A]">
                  cups-filters · 1 month ago
                </span>
              </div>
              <span className="px-2 py-0.5 rounded text-[9px] font-mono bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                MERGED
              </span>
            </div>

            <div className="p-3.5 rounded-xl bg-white/[0.02] border border-white/[0.06] flex items-start justify-between">
              <div>
                <h4 className="text-xs font-medium text-[#F2F0E8]">
                  Improve D-Bus handling
                </h4>
                <span className="text-[10px] font-mono text-[#8A8A8A]">
                  OpenPrinting · 1 month ago
                </span>
              </div>
              <span className="px-2 py-0.5 rounded text-[9px] font-mono bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                MERGED
              </span>
            </div>
          </div>

          <a
            href={portfolioData.personal.socials.github}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 text-xs font-mono text-[#F5D52F] hover:underline"
          >
            View all contributions →
          </a>
        </div>
      </div>
    </section>
  );
};
