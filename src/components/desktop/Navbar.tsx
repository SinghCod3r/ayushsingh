import React, { useState, useEffect } from 'react';
import { ArrowUpRight } from 'lucide-react';
import { portfolioData } from '../../../data';
import { scrollToTarget } from '../../utils/scroll';

interface NavLink {
  label: string;
  target: string;
}

const NAV_LINKS: NavLink[] = [
  { label: 'About', target: '#about' },
  { label: 'What I Do', target: '#what-i-do' },
  { label: 'Work', target: '#work' },
  { label: 'Open Source', target: '#open-source' },
  { label: 'Journey', target: '#journey' },
  { label: 'Contact', target: '#contact' },
];

export const Navbar: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState<string>('');

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);

      // Trigger line at 35% viewport height
      const triggerY = window.innerHeight * 0.35;
      let current = '';

      for (const item of NAV_LINKS) {
        const el = document.querySelector(item.target);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= triggerY && rect.bottom > triggerY) {
            current = item.target;
            break;
          }
        }
      }

      setActiveSection(current);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (e: React.MouseEvent, target: string) => {
    e.preventDefault();
    scrollToTarget(target, -40);
  };

  return (
    <header
      className={`fixed top-0 left-0 w-full z-40 transition-all duration-300 ${
        scrolled
          ? 'bg-[#08080a]/85 backdrop-blur-md border-b border-zinc-800/60 py-3.5 shadow-sm'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-12 flex items-center justify-between">
        {/* Brand Wordmark */}
        <button
          onClick={(e) => handleNavClick(e, '#hero')}
          className="group text-left cursor-pointer focus:outline-none"
          aria-label="Scroll to top"
        >
          <span className="font-display font-bold text-sm tracking-widest text-zinc-100 group-hover:text-amber-400 transition-colors uppercase">
            {portfolioData.personal.name}
          </span>
          <span className="block text-[10px] font-mono tracking-wider text-zinc-500 uppercase">
            Linux & Full-Stack Engineer
          </span>
        </button>

        {/* Minimal Navigation Links */}
        <nav className="flex items-center gap-7 lg:gap-9 text-xs font-mono uppercase tracking-wider text-zinc-400">
          {NAV_LINKS.map((item) => {
            const isActive = activeSection === item.target;
            return (
              <button
                key={item.target}
                onClick={(e) => handleNavClick(e, item.target)}
                className={`relative py-1 transition-colors cursor-pointer ${
                  isActive
                    ? 'text-zinc-100 font-semibold'
                    : 'hover:text-zinc-200'
                }`}
              >
                {item.label}
                {isActive && (
                  <span className="absolute -bottom-1 left-0 w-full h-[1.5px] bg-amber-400/90 rounded-full" />
                )}
              </button>
            );
          })}
        </nav>

        {/* Direct Email Action Button */}
        <div className="flex items-center gap-3">
          <a
            href={`mailto:${portfolioData.personal.socials.email}`}
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-md border border-zinc-700/80 hover:border-zinc-500 bg-zinc-900/60 hover:bg-zinc-800 text-zinc-300 hover:text-white text-xs font-mono tracking-wider transition-all"
          >
            <span>Let's Talk</span>
            <ArrowUpRight size={12} className="text-zinc-400" />
          </a>
        </div>
      </div>
    </header>
  );
};
