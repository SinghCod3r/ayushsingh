import React, { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { ArrowDown, Github, Linkedin, Terminal } from 'lucide-react';
import { portfolioData } from '../../../data';
import { scrollToTarget } from '../../utils/scroll';

gsap.registerPlugin(ScrollTrigger);

export const Hero: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const leftColRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const container = containerRef.current;
      const leftCol = leftColRef.current;
      if (!container || !leftCol) return;

      const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      if (prefersReducedMotion) return;

      // Bidirectional ScrollTrigger: gently shifts and fades left content as user scrolls down to About
      gsap.to(leftCol, {
        scrollTrigger: {
          id: 'HERO_LEFT_EXIT',
          trigger: container,
          start: 'top top',
          end: 'bottom 20%',
          scrub: 0.6,
        },
        yPercent: -15,
        opacity: 0.2,
        ease: 'power1.out',
      });
    },
    { scope: containerRef }
  );

  return (
    <section
      id="hero"
      ref={containerRef}
      className="relative w-full min-h-[640px] h-screen max-h-[1080px] bg-transparent flex items-center justify-between overflow-hidden select-none"
      style={{ isolation: 'isolate' }}
    >
      <div className="relative z-20 w-full max-w-7xl mx-auto px-6 lg:px-12 h-full flex flex-col justify-between pt-24 pb-8 sm:pb-10">
        
        {/* Top Status Line */}
        <div className="flex items-center justify-between w-full text-[11px] font-mono tracking-widest text-zinc-500 uppercase">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400" />
            <span>Available for Engineering Roles</span>
          </div>
          <div className="hidden sm:flex items-center gap-2">
            <Terminal size={12} className="text-amber-400" />
            <span>{portfolioData.personal.location}</span>
          </div>
        </div>

        {/* Center 2-Column Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center my-auto w-full">
          {/* Left Column: Editorial Identity & Roles */}
          <div ref={leftColRef} className="lg:col-span-7 xl:col-span-8 space-y-5 sm:space-y-6">
            
            {/* Primary Large Typography */}
            <div className="space-y-1">
              <h1 className="font-display font-black text-6xl sm:text-7xl md:text-8xl lg:text-[7.2vw] xl:text-[7.6rem] leading-[0.88] tracking-tight text-zinc-100 uppercase">
                {portfolioData.personal.firstName}
              </h1>
              <h1 className="font-display font-black text-6xl sm:text-7xl md:text-8xl lg:text-[7.2vw] xl:text-[7.6rem] leading-[0.88] tracking-tight text-zinc-400 uppercase">
                {portfolioData.personal.lastName}
              </h1>
            </div>

            {/* Concise Role Statement */}
            <div className="space-y-2 max-w-2xl">
              <p className="font-mono text-xs sm:text-sm tracking-wider uppercase text-amber-400 font-semibold">
                Software Engineer • Open Source Contributor • Builder
              </p>
              <p className="text-zinc-400 text-sm sm:text-base leading-relaxed font-sans max-w-xl">
                Building reliable Linux systems, developer tooling, and modern distributed web applications. Core maintainer at The Linux Foundation’s OpenPrinting.
              </p>
            </div>

            {/* Action Buttons & Links */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <button
                onClick={() => scrollToTarget('#work', -30)}
                className="px-5 py-2.5 rounded-md bg-zinc-100 hover:bg-white text-zinc-950 font-mono text-xs font-semibold uppercase tracking-wider transition-all cursor-pointer shadow-sm hover:scale-[1.02] active:scale-[0.98]"
              >
                View Selected Work
              </button>

              <button
                onClick={() => scrollToTarget('#about', -30)}
                className="px-5 py-2.5 rounded-md border border-zinc-700/80 hover:border-zinc-500 bg-zinc-900/50 hover:bg-zinc-800 text-zinc-300 hover:text-white font-mono text-xs uppercase tracking-wider transition-all cursor-pointer"
              >
                About Me
              </button>

              <div className="flex items-center gap-3 pl-2 sm:pl-4 border-l border-zinc-800">
                <a
                  href={portfolioData.personal.socials.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 text-zinc-400 hover:text-zinc-100 transition-colors"
                  aria-label="GitHub Profile"
                >
                  <Github size={17} />
                </a>
                <a
                  href={portfolioData.personal.socials.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 text-zinc-400 hover:text-zinc-100 transition-colors"
                  aria-label="LinkedIn Profile"
                >
                  <Linkedin size={17} />
                </a>
              </div>
            </div>

          </div>

          {/* Right Column: Negative space allocated for the persistent portrait visual */}
          <div className="hidden lg:block lg:col-span-5 xl:col-span-4 h-full pointer-events-none" />
        </div>

        {/* Bottom Bar: Scroll Indicator */}
        <div className="flex items-center justify-between w-full pt-4 border-t border-zinc-800/40 text-[11px] font-mono text-zinc-500 uppercase">
          <div className="flex items-center gap-2">
            <span>The Linux Foundation / OpenPrinting Maintainer</span>
          </div>

          <button
            onClick={() => scrollToTarget('#about', -30)}
            className="flex items-center gap-2 text-zinc-400 hover:text-amber-400 transition-colors cursor-pointer group"
          >
            <span className="tracking-widest">Scroll</span>
            <ArrowDown size={13} className="group-hover:translate-y-0.5 transition-transform" />
          </button>
        </div>

      </div>
    </section>
  );
};
