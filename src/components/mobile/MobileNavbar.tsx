import React, { useState } from 'react';
import { portfolioData } from '../../../data';

export const MobileNavbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { label: 'ABOUT', href: '#mobile-about', num: '01' },
    { label: 'JOURNEY', href: '#mobile-journey', num: '02' },
    { label: 'OPEN SOURCE', href: '#mobile-opensource', num: '03' },
    { label: 'SKILLS', href: '#mobile-skills', num: '04' },
    { label: 'WORK', href: '#mobile-work', num: '05' },
    { label: 'WRITINGS', href: '#mobile-writings', num: '06' },
    { label: 'TALKS', href: '#mobile-talks', num: '07' },
    { label: 'CONTACT', href: '#mobile-contact', num: '08' },
  ];

  const handleLinkClick = (href: string) => {
    setIsOpen(false);
    const el = document.querySelector(href);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      {/* Sticky Mobile Header */}
      <header className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-5 py-4 bg-[#080909]/85 backdrop-blur-md border-b border-white/[0.06]">
        {/* Brand */}
        <a href="#mobile-hero" className="flex items-center text-lg font-mono tracking-tight">
          <span className="text-[#F2F0E8] font-medium">singh</span>
          <span className="text-[#F5D52F] font-bold">cod3r</span>
        </a>

        {/* 2-line Minimalist Hamburger */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle Navigation Menu"
          className="relative w-8 h-8 flex flex-col items-end justify-center gap-1.5 focus:outline-none"
        >
          <span
            className={`h-0.5 bg-[#F2F0E8] transition-all duration-300 ${
              isOpen ? 'w-6 rotate-45 translate-y-2' : 'w-6'
            }`}
          />
          <span
            className={`h-0.5 bg-[#F5D52F] transition-all duration-300 ${
              isOpen ? 'w-6 -rotate-45 -translate-y-0.5' : 'w-4'
            }`}
          />
        </button>
      </header>

      {/* Full-screen Dark Menu Overlay */}
      {isOpen && (
        <div className="fixed inset-0 z-40 bg-[#080909] flex flex-col justify-between px-6 pt-24 pb-8 overflow-y-auto">
          <div className="flex flex-col space-y-4">
            <span className="text-[10px] font-mono tracking-widest uppercase text-[#F5D52F] mb-2">
              INDEX / NAVIGATION
            </span>
            {navLinks.map((link) => (
              <button
                key={link.label}
                onClick={() => handleLinkClick(link.href)}
                className="flex items-baseline justify-between text-left group py-1.5 border-b border-white/[0.05]"
              >
                <span className="font-editorial text-3xl tracking-wide text-[#F2F0E8] group-hover:text-[#F5D52F] transition-colors">
                  {link.label}
                </span>
                <span className="font-mono text-xs text-[#8A8A8A] group-hover:text-[#F5D52F]">
                  {link.num}
                </span>
              </button>
            ))}
          </div>

          <div className="pt-6 border-t border-white/[0.08] flex items-center justify-between">
            <a
              href={portfolioData.personal.socials.resume}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center px-4 py-2 rounded-full bg-[#F5D52F] text-[#080909] font-mono text-xs font-semibold hover:bg-yellow-400 transition-colors"
            >
              RESUME ↗
            </a>
            <div className="flex space-x-4 font-mono text-xs text-[#8A8A8A]">
              <a href={portfolioData.personal.socials.github} target="_blank" rel="noopener noreferrer" className="hover:text-[#F5D52F]">
                GH
              </a>
              <a href={portfolioData.personal.socials.linkedin} target="_blank" rel="noopener noreferrer" className="hover:text-[#F5D52F]">
                IN
              </a>
              <a href={`mailto:${portfolioData.personal.socials.email}`} className="hover:text-[#F5D52F]">
                MAIL
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
