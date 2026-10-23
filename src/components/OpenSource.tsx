import React, { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { ExternalLink, GitMerge, ArrowRight } from 'lucide-react';
import { portfolioData } from '../../data';
import { SectionLabel } from './SectionLabel';

gsap.registerPlugin(ScrollTrigger);

export const OpenSource: React.FC = () => {
  const containerRef = useRef<HTMLElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const mainCardRef = useRef<HTMLDivElement>(null);
  const contributionsRef = useRef<HTMLDivElement>(null);
  const portraitRef = useRef<HTMLDivElement>(null);

  const openSource = portfolioData.openSource;

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
        mainCardRef.current,
        {
          opacity: 0,
          y: 24,
          duration: 0.6,
          ease: 'power3.out',
        },
        '-=0.3'
      );

      tl.from(
        contributionsRef.current,
        {
          opacity: 0,
          y: 20,
          duration: 0.5,
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
      id="open-source"
      ref={containerRef}
      className="relative w-full py-24 sm:py-32 bg-[#080909] text-[#F2F0E8] overflow-hidden border-t border-white/[0.06]"
      style={{ isolation: 'isolate' }}
    >
      {/* Background Silhouette Portrait with Yellow Rim Light */}
      <div
        ref={portraitRef}
        className="absolute top-1/2 -translate-y-1/2 right-0 sm:right-6 md:right-12 w-80 sm:w-[480px] md:w-[580px] h-[550px] pointer-events-none opacity-20 sm:opacity-30 select-none z-0 overflow-hidden"
      >
        <img
          src="/images/hero-sequence/frame-140.webp"
          alt=""
          className="w-full h-full object-contain grayscale contrast-125 brightness-80"
          loading="lazy"
        />
        {/* Warm yellow ambient backlight */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[340px] h-[340px] rounded-full bg-[#F5D52F]/12 blur-[120px] pointer-events-none" />
      </div>

      <div className="max-w-7xl mx-auto px-6 sm:px-10 relative z-10">
        
        {/* Section Label: OPEN SOURCE */}
        <div className="mb-8">
          <SectionLabel label="OPEN SOURCE" />
        </div>

        {/* Headline: REAL (White) CONTRIBUTIONS. (Yellow) REAL IMPACT. (White) */}
        <div className="mb-10 sm:mb-14 max-w-2xl">
          <h2
            ref={headlineRef}
            className="font-display text-6xl sm:text-8xl md:text-9xl leading-[0.88] tracking-wide uppercase mb-4"
          >
            REAL <br />
            <span className="text-[#F5D52F]">CONTRIBUTIONS.</span> <br />
            REAL IMPACT.
          </h2>
          <p className="font-sans text-sm sm:text-base text-[#8A8A8A] leading-relaxed">
            I work on Linux systems used in the real world.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start max-w-4xl">
          
          {/* Main Featured Card: The Linux Foundation / OpenPrinting */}
          <div
            ref={mainCardRef}
            className="lg:col-span-7 p-6 sm:p-8 rounded-2xl bg-white/[0.025] border border-white/[0.09] backdrop-blur-md space-y-6"
          >
            {/* Header: Linux Foundation & OpenPrinting */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-black border border-white/10 flex items-center justify-center font-display text-lg font-bold text-[#F5D52F]">
                  OP
                </div>
                <div>
                  <div className="text-[10px] font-mono uppercase tracking-widest text-[#8A8A8A]">
                    LINUX FOUNDATION
                  </div>
                  <div className="font-display text-2xl text-[#F2F0E8] font-bold">
                    OpenPrinting
                  </div>
                </div>
              </div>

              <a
                href={openSource.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg text-[#8A8A8A] hover:text-[#F5D52F] transition-colors"
                aria-label="OpenPrinting repository"
              >
                <ExternalLink size={18} />
              </a>
            </div>

            {/* Quick Metrics */}
            <div className="flex items-center gap-6 py-3 border-y border-white/[0.06] font-mono text-xs">
              <div>
                <span className="text-[#F5D52F] font-bold text-base">4</span>
                <span className="text-[#8A8A8A] ml-1.5">repositories</span>
              </div>
              <div className="w-[1px] h-4 bg-white/10" />
              <div>
                <span className="text-[#F5D52F] font-bold text-base">11+</span>
                <span className="text-[#8A8A8A] ml-1.5">merged contributions</span>
              </div>
            </div>

            {/* Tech Stack & Sub-repo */}
            <div className="space-y-1 font-mono text-xs text-[#8A8A8A]">
              <p className="text-[#F2F0E8] font-medium">system-config-printer</p>
              <p>CUPS · GTK · D-Bus · Python</p>
            </div>

            {/* CTA Button: View on GitHub -> */}
            <a
              href={openSource.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 w-full py-3 px-5 rounded-xl font-mono text-xs font-semibold uppercase tracking-wider bg-[#F5D52F] text-black hover:bg-white transition-colors shadow-[0_0_20px_rgba(245,213,47,0.25)]"
            >
              <span>View on GitHub</span>
              <ArrowRight size={14} />
            </a>
          </div>

          {/* Right Column: Recent Contributions */}
          <div
            ref={contributionsRef}
            className="lg:col-span-5 space-y-4"
          >
            <h3 className="font-mono text-xs uppercase tracking-wider text-[#8A8A8A] mb-3">
              Recent Contributions
            </h3>

            <div className="space-y-3">
              {openSource.prs.slice(0, 3).map((pr, idx) => (
                <div
                  key={idx}
                  className="p-3.5 rounded-xl bg-white/[0.015] border border-white/[0.06] flex items-start gap-3 group hover:border-[#F5D52F]/30 transition-colors"
                >
                  <div className="p-1.5 rounded-md bg-[#238636]/15 text-[#3fb950] shrink-0 mt-0.5">
                    <GitMerge size={14} />
                  </div>
                  <div className="space-y-0.5">
                    <p className="font-sans text-xs sm:text-sm text-[#F2F0E8] font-medium group-hover:text-[#F5D52F] transition-colors leading-snug">
                      {pr.title}
                    </p>
                    <p className="font-mono text-[10px] text-[#8A8A8A]">
                      Merged · OpenPrinting
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <a
              href="https://github.com/OpenPrinting/system-config-printer/pulls?q=is%3Apr+author%3ASinghCod3r"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 font-mono text-xs text-[#8A8A8A] hover:text-[#F5D52F] transition-colors pt-2 group"
            >
              <span>View all contributions</span>
              <ArrowRight size={12} className="group-hover:translate-x-1 transition-transform" />
            </a>
          </div>

        </div>

      </div>
    </section>
  );
};
