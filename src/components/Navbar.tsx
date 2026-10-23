import React, { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { X, Github, Linkedin, Mail } from 'lucide-react';
import { portfolioData } from '../../data';
import { scrollToTarget, setScrollLocked } from '../utils/scroll';

interface NavItem {
  number: string;
  label: string;
  target: string;
}

const NAV_ITEMS: NavItem[] = [
  { number: '01', label: 'ABOUT', target: '#about' },
  { number: '02', label: 'JOURNEY', target: '#journey' },
  { number: '03', label: 'OPEN SOURCE', target: '#open-source' },
  { number: '04', label: 'SKILLS', target: '#skills' },
  { number: '05', label: 'WORK', target: '#work' },
  { number: '06', label: 'WRITINGS', target: '#writings' },
  { number: '07', label: 'TALKS', target: '#talks' },
  { number: '08', label: 'CONTACT', target: '#contact' },
];

export const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState<string>('');

  const menuOverlayRef = useRef<HTMLDivElement>(null);
  const menuLinksRef = useRef<HTMLButtonElement[]>([]);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);

      const triggerY = window.innerHeight * 0.35;
      let current = '';

      for (const item of NAV_ITEMS) {
        const el = document.querySelector(item.target);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= triggerY && rect.bottom > triggerY) {
            current = item.target;
            break;
          }
        }
      }

      if (!current && window.scrollY > 200) {
        for (let i = NAV_ITEMS.length - 1; i >= 0; i--) {
          const el = document.querySelector(NAV_ITEMS[i].target);
          if (el && el.getBoundingClientRect().top <= triggerY) {
            current = NAV_ITEMS[i].target;
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

  // GSAP animation for full-screen menu overlay
  useGSAP(
    () => {
      const overlay = menuOverlayRef.current;
      if (!overlay) return;

      if (isOpen) {
        gsap.to(overlay, {
          opacity: 1,
          visibility: 'visible',
          duration: 0.35,
          ease: 'power3.out',
        });

        gsap.fromTo(
          menuLinksRef.current,
          {
            opacity: 0,
            y: 24,
          },
          {
            opacity: 1,
            y: 0,
            duration: 0.45,
            stagger: 0.04,
            ease: 'power3.out',
            delay: 0.1,
          }
        );
      } else {
        gsap.to(overlay, {
          opacity: 0,
          duration: 0.25,
          ease: 'power2.in',
          onComplete: () => {
            gsap.set(overlay, { visibility: 'hidden' });
          },
        });
      }
    },
    { dependencies: [isOpen] }
  );

  const handleNavClick = (target: string) => {
    setIsOpen(false);
    setScrollLocked(false);
    setTimeout(() => {
      scrollToTarget(target, -20);
    }, 120);
  };

  const toggleMenu = () => {
    const next = !isOpen;
    setIsOpen(next);
    setScrollLocked(next);
  };

  menuLinksRef.current = [];

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled ? 'py-3 bg-[#080909]/80 backdrop-blur-md border-b border-white/[0.05]' : 'py-5 bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-5 sm:px-8 flex items-center justify-between">
          
          {/* Brand Logo: singhcod3r */}
          <button
            onClick={() => handleNavClick('#hero')}
            className="flex items-center gap-1.5 group text-left cursor-pointer"
            aria-label="Ayush Singh (singhcod3r) Home"
          >
            <span className="font-display text-xl sm:text-2xl tracking-wide text-[#F2F0E8] transition-colors">
              singh<span className="text-[#F5D52F]">cod3r</span>
            </span>
          </button>

          {/* Desktop Navigation Links */}
          <div className="hidden lg:flex items-center gap-6">
            {NAV_ITEMS.map((item) => {
              const isActive = activeSection === item.target;
              return (
                <button
                  key={item.target}
                  onClick={() => handleNavClick(item.target)}
                  className={`relative text-xs font-mono font-medium tracking-widest uppercase transition-colors cursor-pointer py-1 ${
                    isActive ? 'text-[#F5D52F]' : 'text-[#8A8A8A] hover:text-[#F2F0E8]'
                  }`}
                >
                  {item.label}
                  {isActive && (
                    <span className="absolute -bottom-1 left-0 right-0 h-[1.5px] bg-[#F5D52F]" />
                  )}
                </button>
              );
            })}
          </div>

          {/* Right: Minimalist Hamburger Menu Button */}
          <div className="flex items-center gap-4">
            <button
              onClick={() => handleNavClick('#contact')}
              className="hidden sm:inline-flex px-4 py-1.5 rounded-full text-xs font-mono font-semibold tracking-wider bg-[#F5D52F] text-black hover:bg-white transition-colors cursor-pointer shadow-[0_0_15px_rgba(245,213,47,0.3)]"
            >
              LET'S TALK
            </button>

            <button
              onClick={toggleMenu}
              className="p-2 text-[#F2F0E8] hover:text-[#F5D52F] transition-colors cursor-pointer"
              aria-label={isOpen ? 'Close menu' : 'Open menu'}
            >
              {isOpen ? (
                <X size={24} />
              ) : (
                <div className="flex flex-col gap-1.5 w-6 items-end group">
                  <span className="w-6 h-[2px] bg-[#F2F0E8] group-hover:bg-[#F5D52F] transition-colors" />
                  <span className="w-4 h-[2px] bg-[#F2F0E8] group-hover:bg-[#F5D52F] transition-colors" />
                </div>
              )}
            </button>
          </div>

        </div>
      </header>

      {/* Full-Screen Dark Overlay Menu */}
      <div
        ref={menuOverlayRef}
        className="fixed inset-0 z-40 bg-[#080909]/98 backdrop-blur-2xl flex flex-col justify-between p-6 sm:p-12 pt-28 opacity-0 invisible"
      >
        <div className="max-w-4xl mx-auto w-full space-y-6">
          <p className="text-xs uppercase tracking-[0.25em] text-[#8A8A8A] font-mono">
            NAVIGATION
          </p>
          <div className="flex flex-col divide-y divide-white/[0.06]">
            {NAV_ITEMS.map((item) => (
              <button
                key={item.target}
                ref={(el) => {
                  if (el) menuLinksRef.current.push(el);
                }}
                onClick={() => handleNavClick(item.target)}
                className="text-left font-display text-4xl sm:text-6xl tracking-tight text-[#F2F0E8] hover:text-[#F5D52F] transition-colors flex items-center justify-between py-3 sm:py-4 group cursor-pointer"
              >
                <span>{item.label}</span>
                <span className="text-sm sm:text-base font-mono text-[#8A8A8A] group-hover:text-[#F5D52F] transition-colors">
                  {item.number}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Menu Footer */}
        <div className="max-w-4xl mx-auto w-full pt-8 border-t border-white/[0.08] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <p className="text-xs text-[#8A8A8A] font-mono">{portfolioData.personal.location}</p>
            <p className="text-xs text-[#8A8A8A] font-mono">{portfolioData.personal.socials.email}</p>
          </div>
          <div className="flex items-center gap-4">
            <a
              href={portfolioData.personal.socials.github}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 text-[#8A8A8A] hover:text-[#F5D52F] transition-colors"
              aria-label="GitHub"
            >
              <Github size={18} />
            </a>
            <a
              href={portfolioData.personal.socials.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 text-[#8A8A8A] hover:text-[#F5D52F] transition-colors"
              aria-label="LinkedIn"
            >
              <Linkedin size={18} />
            </a>
            <a
              href={`mailto:${portfolioData.personal.socials.email}`}
              className="p-2 text-[#8A8A8A] hover:text-[#F5D52F] transition-colors"
              aria-label="Email"
            >
              <Mail size={18} />
            </a>
          </div>
        </div>
      </div>
    </>
  );
};
