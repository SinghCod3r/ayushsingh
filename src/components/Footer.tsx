import React from 'react';
import { ArrowUp } from 'lucide-react';
import { portfolioData } from '../../data';
import { scrollToTarget } from '../utils/scroll';

export const Footer: React.FC = () => {
  return (
    <footer className="relative w-full bg-[#080909] text-[#F2F0E8] border-t border-white/[0.08] pt-16 pb-12 overflow-hidden select-none">
      <div className="max-w-7xl mx-auto px-6 sm:px-10 relative z-10">
        
        {/* Massive Editorial Outline Brand Name */}
        <div className="w-full overflow-hidden border-b border-white/[0.08] pb-8 mb-12">
          <div className="flex flex-col items-start">
            <span className="font-display font-black text-6xl sm:text-8xl md:text-9xl lg:text-[11vw] leading-[0.82] tracking-wide uppercase text-white/20 hover:text-white/40 transition-colors">
              AYUSH
            </span>
            <div className="flex items-baseline justify-between w-full">
              <span className="font-display font-black text-6xl sm:text-8xl md:text-9xl lg:text-[11vw] leading-[0.82] tracking-wide uppercase text-[#F5D52F]/40 hover:text-[#F5D52F]/70 transition-colors">
                SINGH
              </span>

              {/* Quick Jump to Top */}
              <button
                onClick={() => scrollToTarget('#hero')}
                className="group flex items-center gap-2 px-4 py-2 rounded-full bg-white/[0.03] border border-white/10 text-xs font-mono text-[#8A8A8A] hover:text-[#F5D52F] hover:border-[#F5D52F]/50 transition-all cursor-pointer"
                aria-label="Back to Top"
              >
                <span>TOP</span>
                <ArrowUp size={14} className="group-hover:-translate-y-0.5 transition-transform text-[#F5D52F]" />
              </button>
            </div>
          </div>
        </div>

        {/* Footer Meta Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start justify-between text-xs font-mono text-[#8A8A8A]">
          
          <div className="md:col-span-4 space-y-1">
            <div className="text-[#F2F0E8] font-display text-xl tracking-wider">
              {portfolioData.personal.name}
            </div>
            <p className="text-[#8A8A8A] font-sans">
              Software Engineer · Open Source Maintainer · Builder
            </p>
            <p className="text-[#8A8A8A]/70 pt-1">
              {portfolioData.personal.location} · 2026
            </p>
          </div>

          <div className="md:col-span-5 space-y-1 font-sans">
            <p className="text-[#F2F0E8]/90">
              Designed & built by Ayush Singh.
            </p>
            <p className="text-[#8A8A8A] text-xs">
              Editorial design, high-performance animation, and Linux systems architecture.
            </p>
          </div>

          <div className="md:col-span-3 flex md:justify-end">
            <div className="font-mono text-[11px] text-[#8A8A8A]">
              singh<span className="text-[#F5D52F]">cod3r</span> // VOL. 2026
            </div>
          </div>

        </div>

      </div>
    </footer>
  );
};
