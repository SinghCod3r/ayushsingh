import React from 'react';
import { ArrowUp } from 'lucide-react';
import { portfolioData } from '../../data';
import { scrollToTarget } from '../utils/scroll';

export const Footer: React.FC = () => {
  return (
    <footer className="relative w-full bg-[#050608] text-white border-t border-zinc-800/80 pt-16 pb-12 overflow-hidden select-none">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        
        {/* Massive Editorial Outline Brand Name */}
        <div className="w-full overflow-hidden border-b border-zinc-800/60 pb-8 mb-12">
          <div className="flex flex-col items-start">
            <span className="font-display font-black text-6xl sm:text-8xl md:text-9xl lg:text-[11vw] leading-[0.82] tracking-tightest uppercase text-outline">
              AYUSH
            </span>
            <div className="flex items-baseline justify-between w-full">
              <span className="font-display font-black text-6xl sm:text-8xl md:text-9xl lg:text-[11vw] leading-[0.82] tracking-tightest uppercase text-outline">
                SINGH
              </span>

              {/* Quick Jump to Top */}
              <button
                onClick={() => scrollToTarget('#hero')}
                className="group flex items-center gap-2 px-4 py-2 rounded-full bg-zinc-900 border border-zinc-800 text-xs font-mono text-zinc-400 hover:text-amber-400 hover:border-amber-400 transition-all cursor-pointer"
                aria-label="Back to Top"
              >
                <span>TOP</span>
                <ArrowUp size={14} className="group-hover:-translate-y-0.5 transition-transform text-amber-400" />
              </button>
            </div>
          </div>
        </div>

        {/* Footer Meta Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start justify-between text-xs font-mono text-zinc-400">
          
          <div className="md:col-span-4 space-y-1">
            <div className="text-white font-display font-bold text-sm tracking-tight">
              {portfolioData.personal.name}
            </div>
            <p className="text-zinc-500 font-sans">
              Software Engineer • The Linux Foundation / OpenPrinting Maintainer
            </p>
            <p className="text-zinc-500 pt-1">
              {portfolioData.personal.location} • 2026
            </p>
          </div>

          <div className="md:col-span-5 space-y-1 font-sans">
            <p className="text-zinc-300">
              Designed & built by Ayush Singh.
            </p>
            <p className="text-zinc-500 text-xs">
              Crafted with curiosity, upstream Linux precision, and probably too much debugging.
            </p>
          </div>

          <div className="md:col-span-3 flex md:justify-end">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-zinc-900 border border-zinc-800 text-[11px] text-zinc-400">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
              <span>All Systems Operational</span>
            </div>
          </div>

        </div>

      </div>
    </footer>
  );
};
