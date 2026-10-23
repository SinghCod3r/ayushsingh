import React, { useState, useEffect } from 'react';
import { Menu, X, ArrowUpRight, Github, Linkedin, Mail } from 'lucide-react';
import { portfolioData } from '../../../data';
import { scrollToTarget, setScrollLocked } from '../../utils/scroll';
import { MagneticButton } from './MagneticButton';
import { TextRoll } from './TextRoll';

interface NavItem {
  label: string;
  target: string;
}

const NAV_ITEMS: NavItem[] = [
  { label: 'About', target: '#about' },
  { label: 'Journey', target: '#journey' },
  { label: 'Open Source', target: '#open-source' },
  { label: 'Skills', target: '#skills' },
  { label: 'Work', target: '#work' },
  { label: 'Writings', target: '#writings' },
  { label: 'Contact', target: '#contact' },
];

export const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState<string>('');
  const [mobileRollingTarget, setMobileRollingTarget] = useState<string | null>(null);

  useEffect(() => {
    // 1. Precise trigger line check (section crossing 30%–40% of viewport height)
    const updateActiveSection = () => {
      setScrolled(window.scrollY > 50);

      // Top of page (Hero) check
      if (window.scrollY < 200) {
        setActiveSection('');
        return;
      }

      // Focal trigger line at 35% from the top of the viewport
      const triggerY = window.innerHeight * 0.35;
      let current = '';

      for (const item of NAV_ITEMS) {
        const el = document.querySelector(item.target);
        if (el) {
          const rect = el.getBoundingClientRect();
          // The section encompasses the 35% trigger line
          if (rect.top <= triggerY && rect.bottom > triggerY) {
            current = item.target;
            break;
          }
        }
      }

      // Fallback for fast scrolling or transitions between sections
      if (!current) {
        for (let i = NAV_ITEMS.length - 1; i >= 0; i--) {
          const item = NAV_ITEMS[i];
          const el = document.querySelector(item.target);
          if (el) {
            const rect = el.getBoundingClientRect();
            if (rect.top <= triggerY) {
              current = item.target;
              break;
            }
          }
        }
      }

      setActiveSection(current);
    };

    // 2. IntersectionObserver with rootMargin -30% top and -40% bottom (focus zone)
    const observer = new IntersectionObserver(
      () => {
        updateActiveSection();
      },
      {
        root: null,
        rootMargin: '-30% 0px -40% 0px',
        threshold: [0, 0.1, 0.25, 0.5],
      }
    );

    // Observe all nav targets + hero
    const heroEl = document.getElementById('hero');
    if (heroEl) observer.observe(heroEl);

    NAV_ITEMS.forEach((item) => {
      const el = document.querySelector(item.target);
      if (el) observer.observe(el);
    });

    window.addEventListener('scroll', updateActiveSection, { passive: true });
    updateActiveSection();

    return () => {
      observer.disconnect();
      window.removeEventListener('scroll', updateActiveSection);
    };
  }, []);

  const handleNavClick = (target: string) => {
    setIsOpen(false);
    setScrollLocked(false);
    setTimeout(() => {
      scrollToTarget(target, -20);
    }, 100);
  };

  const handleMobileNavSelect = (target: string) => {
    setMobileRollingTarget(target);
    // Tactile Skipper drum roll animation plays before sheet dismissal & scroll
    setTimeout(() => {
      handleNavClick(target);
      setMobileRollingTarget(null);
    }, 240);
  };

  const toggleMobileMenu = () => {
    const nextState = !isOpen;
    setIsOpen(nextState);
    setScrollLocked(nextState);
  };

  return (
    <>
      {/* Top Viewport Fade Mask for smooth navbar passage */}
      <div
        className="pointer-events-none fixed top-0 left-0 right-0 h-24 z-30"
        style={{
          background: 'linear-gradient(to bottom, rgba(10,10,10,0.92) 0%, rgba(10,10,10,0.5) 60%, transparent 100%)',
        }}
        aria-hidden="true"
      />

      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 ${
          scrolled ? 'py-3' : 'py-5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav
            className={`flex items-center justify-between px-4 sm:px-6 py-2.5 rounded-full border transition-all duration-500 backdrop-blur-xl ${
              scrolled
                ? 'bg-[#0e1015]/85 border-zinc-800/80 shadow-[0_8px_32px_rgba(0,0,0,0.5)]'
                : 'bg-[#101217]/50 border-zinc-800/40'
            }`}
          >
            {/* Brand Logo */}
            <button
              onClick={() => handleNavClick('#hero')}
              className="flex items-center gap-2.5 group text-left cursor-pointer"
              aria-label="Ayush Singh Home"
            >
              <span className="w-2.5 h-2.5 rounded-full bg-amber-500 group-hover:scale-125 transition-transform duration-300 shadow-[0_0_10px_rgba(245,158,11,0.8)]" />
              <span className="font-display font-bold text-base tracking-tight text-white group-hover:text-amber-400 transition-colors">
                {portfolioData.personal.firstName}
              </span>
            </button>

            {/* Desktop Navigation Links with Skipper Text Roll */}
            <div className="hidden md:flex items-center gap-1 lg:gap-2">
              {NAV_ITEMS.map((item) => {
                const isActive = activeSection === item.target;
                return (
                  <button
                    key={item.target}
                    onClick={() => handleNavClick(item.target)}
                    className={`relative px-3 py-1.5 text-xs lg:text-sm font-medium rounded-full transition-all duration-300 cursor-pointer group ${
                      isActive
                        ? 'text-amber-400 bg-amber-400/10'
                        : 'text-zinc-400 hover:text-zinc-100 hover:bg-zinc-800/40'
                    }`}
                  >
                    <TextRoll
                      active={isActive}
                      duplicateClassName="text-amber-400 font-semibold"
                    >
                      {item.label}
                    </TextRoll>
                    {isActive && (
                      <span className="absolute bottom-0 left-2.5 right-2.5 h-[2px] bg-amber-400 rounded-full shadow-[0_0_8px_rgba(245,158,11,0.9)]" />
                    )}
                  </button>
                );
              })}
            </div>

            {/* Right Actions */}
            <div className="flex items-center gap-3">
              <MagneticButton
                onClick={() => handleNavClick('#contact')}
                className="hidden sm:inline-flex px-4 py-1.5 text-xs font-semibold uppercase tracking-wider rounded-full bg-white text-black hover:bg-amber-400 transition-colors shadow-sm"
              >
                Let's Talk
              </MagneticButton>

              {/* Mobile Menu Toggle Button */}
              <button
                onClick={toggleMobileMenu}
                className="md:hidden p-2 text-zinc-300 hover:text-white rounded-full bg-zinc-800/40 border border-zinc-700/40"
                aria-label="Toggle Navigation"
              >
                {isOpen ? <X size={20} /> : <Menu size={20} />}
              </button>
            </div>
          </nav>
        </div>
      </header>

      {/* Mobile Drawer Overlay */}
      <div
        className={`fixed inset-0 z-30 md:hidden bg-[#08080a]/98 backdrop-blur-2xl transition-all duration-500 flex flex-col justify-between p-6 pt-24 ${
          isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      >
        <div className="space-y-4">
          <p className="text-xs uppercase tracking-widest text-zinc-500 font-mono">Navigation</p>
          <div className="flex flex-col space-y-3">
            {NAV_ITEMS.map((item, idx) => (
              <button
                key={item.target}
                onClick={() => handleMobileNavSelect(item.target)}
                className="text-left font-display text-3xl font-bold tracking-tight text-zinc-200 hover:text-amber-400 transition-colors flex items-center justify-between py-2.5 border-b border-zinc-800/50 group"
                style={{ transitionDelay: `${idx * 40}ms` }}
              >
                <TextRoll
                  active={mobileRollingTarget === item.target || activeSection === item.target}
                  duplicateClassName="text-amber-400"
                >
                  {item.label}
                </TextRoll>
                <span className="text-xs font-mono text-zinc-600 group-hover:text-amber-400 transition-colors">
                  0{idx + 1}
                </span>
              </button>
            ))}
            <button
              onClick={() => handleMobileNavSelect('#contact')}
              className="text-left font-display text-3xl font-bold tracking-tight text-amber-400 flex items-center justify-between py-2.5 border-b border-zinc-800/50 group"
            >
              <TextRoll
                active={mobileRollingTarget === '#contact' || activeSection === '#contact'}
                duplicateClassName="text-amber-300"
              >
                {"Let's Talk"}
              </TextRoll>
              <ArrowUpRight size={24} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
            </button>
          </div>
        </div>

        {/* Mobile Drawer Footer */}
        <div className="pt-6 border-t border-zinc-800/60 flex items-center justify-between">
          <div>
            <p className="text-xs text-zinc-400 font-mono">{portfolioData.personal.location}</p>
            <p className="text-[11px] text-zinc-500">{portfolioData.personal.socials.email}</p>
          </div>
          <div className="flex items-center gap-3">
            <a
              href={portfolioData.personal.socials.github}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2.5 rounded-full bg-zinc-900 border border-zinc-800 text-zinc-300 hover:text-white"
              aria-label="GitHub"
            >
              <Github size={16} />
            </a>
            <a
              href={portfolioData.personal.socials.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2.5 rounded-full bg-zinc-900 border border-zinc-800 text-zinc-300 hover:text-white"
              aria-label="LinkedIn"
            >
              <Linkedin size={16} />
            </a>
            <a
              href={`mailto:${portfolioData.personal.socials.email}`}
              className="p-2.5 rounded-full bg-zinc-900 border border-zinc-800 text-zinc-300 hover:text-white"
              aria-label="Email"
            >
              <Mail size={16} />
            </a>
          </div>
        </div>
      </div>
    </>
  );
};

