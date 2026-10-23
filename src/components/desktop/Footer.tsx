import React from 'react';
import { ArrowUp } from 'lucide-react';
import { scrollToTarget } from '../../utils/scroll';
import { portfolioData } from '../../../data';

export const Footer: React.FC = () => {
  return (
    <footer className="w-full py-12 border-t border-zinc-800/60 bg-[#08080a] text-zinc-500 text-xs font-mono select-none">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 flex flex-col sm:flex-row items-center justify-between gap-4">
        {/* Left: Attribution */}
        <div className="flex items-center gap-3">
          <span className="text-zinc-400 font-semibold uppercase">{portfolioData.personal.name}</span>
          <span>•</span>
          <span>© {new Date().getFullYear()}</span>
          <span>•</span>
          <span>Editorial Edition</span>
        </div>

        {/* Center / Right: Location & Scroll to Top */}
        <div className="flex items-center gap-6">
          <span className="text-zinc-500 hidden md:inline">
            {portfolioData.personal.location}
          </span>

          <button
            onClick={() => scrollToTarget('#hero')}
            className="flex items-center gap-1.5 text-zinc-400 hover:text-amber-400 transition-colors cursor-pointer uppercase tracking-wider"
            aria-label="Back to top"
          >
            <span>Back to top</span>
            <ArrowUp size={12} />
          </button>
        </div>
      </div>
    </footer>
  );
};
