import React from 'react';
import { portfolioData } from '../../../data';

export const MobileContact: React.FC = () => {
  const contactLinks = [
    {
      label: 'Email',
      value: portfolioData.personal.socials.email,
      href: `mailto:${portfolioData.personal.socials.email}`,
      icon: '✉',
    },
    {
      label: 'GitHub',
      value: 'github.com/singhcod3r',
      href: portfolioData.personal.socials.github,
      icon: '⌥',
    },
    {
      label: 'LinkedIn',
      value: 'linkedin.com/in/ayush-singh-dev',
      href: portfolioData.personal.socials.linkedin,
      icon: '⌘',
    },
    {
      label: 'Resume',
      value: 'Download Resume (PDF)',
      href: portfolioData.personal.socials.resume,
      icon: '↓',
    },
  ];

  return (
    <section
      id="mobile-contact"
      className="relative w-full py-14 px-6 bg-[#080909] text-[#F2F0E8] overflow-hidden border-t border-white/[0.06]"
    >
      <div className="relative z-10 flex flex-col">
        {/* Section Label */}
        <div className="flex items-center space-x-1.5 text-[10px] font-mono tracking-widest uppercase text-[#F5D52F] mb-3">
          <span>CONTACT</span>
          <span>↗</span>
        </div>

        {/* Editorial Headline */}
        <h2 className="font-editorial text-[14vw] leading-[0.9] tracking-tight mb-4">
          <span className="text-[#F2F0E8]">LET'S DO<br /></span>
          <span className="text-[#F2F0E8]">SOMETHING<br /></span>
          <span className="text-[#F5D52F]">COOL.</span>
        </h2>

        <p className="text-sm text-[#8A8A8A] leading-relaxed max-w-sm mb-8 font-sans">
          I'm always open to discussing new opportunities, interesting projects, or just tech in general.
        </p>

        {/* 4 Contact Pills */}
        <div className="flex flex-col space-y-3 mb-10">
          {contactLinks.map((item) => (
            <a
              key={item.label}
              href={item.href}
              target={item.label === 'Email' ? undefined : '_blank'}
              rel={item.label === 'Email' ? undefined : 'noopener noreferrer'}
              className="p-3.5 rounded-xl bg-white/[0.03] border border-white/[0.08] flex items-center justify-between hover:border-[#F5D52F]/40 hover:bg-white/[0.05] transition-all group"
            >
              <div className="flex items-center space-x-3">
                <span className="w-8 h-8 rounded-lg bg-white/[0.04] border border-white/10 flex items-center justify-center font-mono text-sm text-[#F5D52F]">
                  {item.icon}
                </span>
                <div className="flex flex-col">
                  <span className="text-[11px] font-mono text-[#8A8A8A] uppercase">
                    {item.label}
                  </span>
                  <span className="text-xs font-medium text-[#F2F0E8] group-hover:text-[#F5D52F] transition-colors">
                    {item.value}
                  </span>
                </div>
              </div>
              <span className="text-xs font-mono text-[#8A8A8A] group-hover:text-[#F5D52F] group-hover:translate-x-0.5 transition-all">
                ↗
              </span>
            </a>
          ))}
        </div>

        {/* Final Portrait with Yellow Rim Light & Signature */}
        <div className="relative w-full aspect-[3/4] max-h-[380px] rounded-2xl overflow-hidden border border-white/10 bg-black/60 shadow-[0_0_50px_rgba(245,213,47,0.15)] flex flex-col justify-end p-6">
          <img
            src="/images/hero-sequence/frame-192.webp"
            alt="Ayush Singh Portrait"
            className="absolute inset-0 w-full h-full object-cover filter grayscale contrast-125 brightness-95"
          />
          {/* Subtle gradient overlay to make signature legible */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#080909] via-transparent to-transparent opacity-80" />

          {/* Yellow script signature */}
          <div className="relative z-10 w-44 self-center">
            <img
              src="/images/ayush-signature-yellow.png"
              alt="Ayush Singh Signature"
              className="w-full h-auto filter drop-shadow-[0_2px_12px_rgba(245,213,47,0.5)]"
            />
          </div>
        </div>
      </div>
    </section>
  );
};
