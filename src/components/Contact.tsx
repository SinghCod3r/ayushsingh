import React, { useState, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { Mail, Github, Linkedin, FileText, Check } from 'lucide-react';
import { portfolioData } from '../../data';
import { SectionLabel } from './SectionLabel';

gsap.registerPlugin(ScrollTrigger);

export const Contact: React.FC = () => {
  const containerRef = useRef<HTMLElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const buttonsRef = useRef<HTMLDivElement>(null);
  const portraitRef = useRef<HTMLDivElement>(null);

  const [copied, setCopied] = useState(false);

  const contact = portfolioData.contact;

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(contact.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

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
        buttonsRef.current?.children || [],
        {
          opacity: 0,
          y: 20,
          duration: 0.45,
          stagger: 0.08,
          ease: 'power3.out',
        },
        '-=0.3'
      );

      tl.from(
        portraitRef.current,
        {
          opacity: 0,
          scale: 0.95,
          duration: 0.8,
          ease: 'power2.out',
        },
        '-=0.2'
      );
    },
    { scope: containerRef }
  );

  return (
    <section
      id="contact"
      ref={containerRef}
      className="relative w-full py-24 sm:py-32 bg-[#080909] text-[#F2F0E8] overflow-hidden border-t border-white/[0.06]"
      style={{ isolation: 'isolate' }}
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-10 relative z-10">
        
        {/* Section Label: CONTACT */}
        <div className="mb-8">
          <SectionLabel label="CONTACT" />
        </div>

        {/* Headline: LET'S DO SOMETHING (White) COOL. (Yellow) */}
        <h2
          ref={headlineRef}
          className="font-display text-6xl sm:text-8xl md:text-9xl leading-[0.88] tracking-wide uppercase mb-6"
        >
          LET'S DO <br />
          SOMETHING <br />
          <span className="text-[#F5D52F]">COOL.</span>
        </h2>

        {/* Subtext */}
        <p className="font-sans text-sm sm:text-base text-[#8A8A8A] leading-relaxed max-w-lg mb-10">
          I'm always open to discussing new opportunities, interesting projects, or just tech in general.
        </p>

        {/* 4 Contact Pill Buttons (Matching Screen 10 in Reference) */}
        <div
          ref={buttonsRef}
          className="flex flex-col sm:flex-row flex-wrap gap-3.5 sm:gap-4 max-w-2xl mb-16"
        >
          {/* Email button */}
          <button
            onClick={handleCopyEmail}
            className="inline-flex items-center gap-3 px-5 py-3 rounded-full bg-white/[0.03] border border-white/[0.09] hover:border-[#F5D52F]/60 text-left transition-all duration-200 group cursor-pointer"
          >
            <div className="w-8 h-8 rounded-full bg-black/60 border border-white/10 flex items-center justify-center text-[#F5D52F] shrink-0 group-hover:scale-105 transition-transform">
              {copied ? <Check size={14} /> : <Mail size={14} />}
            </div>
            <div>
              <div className="font-mono text-[10px] text-[#8A8A8A] uppercase tracking-wider">
                {copied ? 'COPIED TO CLIPBOARD' : 'EMAIL'}
              </div>
              <div className="font-mono text-xs sm:text-sm text-[#F2F0E8] group-hover:text-[#F5D52F] transition-colors">
                {contact.email}
              </div>
            </div>
          </button>

          {/* GitHub button */}
          <a
            href={contact.github}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 px-5 py-3 rounded-full bg-white/[0.03] border border-white/[0.09] hover:border-[#F5D52F]/60 text-left transition-all duration-200 group"
          >
            <div className="w-8 h-8 rounded-full bg-black/60 border border-white/10 flex items-center justify-center text-[#F5D52F] shrink-0 group-hover:scale-105 transition-transform">
              <Github size={14} />
            </div>
            <div>
              <div className="font-mono text-[10px] text-[#8A8A8A] uppercase tracking-wider">
                GITHUB
              </div>
              <div className="font-mono text-xs sm:text-sm text-[#F2F0E8] group-hover:text-[#F5D52F] transition-colors">
                github.com/singhcod3r
              </div>
            </div>
          </a>

          {/* LinkedIn button */}
          <a
            href={contact.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 px-5 py-3 rounded-full bg-white/[0.03] border border-white/[0.09] hover:border-[#F5D52F]/60 text-left transition-all duration-200 group"
          >
            <div className="w-8 h-8 rounded-full bg-black/60 border border-white/10 flex items-center justify-center text-[#F5D52F] shrink-0 group-hover:scale-105 transition-transform">
              <Linkedin size={14} />
            </div>
            <div>
              <div className="font-mono text-[10px] text-[#8A8A8A] uppercase tracking-wider">
                LINKEDIN
              </div>
              <div className="font-mono text-xs sm:text-sm text-[#F2F0E8] group-hover:text-[#F5D52F] transition-colors">
                linkedin.com/in/singhcod3r
              </div>
            </div>
          </a>

          {/* Resume button */}
          <a
            href={contact.resume}
            download="Ayush_Singh_Resume.pdf"
            className="inline-flex items-center gap-3 px-5 py-3 rounded-full bg-white/[0.03] border border-white/[0.09] hover:border-[#F5D52F]/60 text-left transition-all duration-200 group"
          >
            <div className="w-8 h-8 rounded-full bg-black/60 border border-white/10 flex items-center justify-center text-[#F5D52F] shrink-0 group-hover:scale-105 transition-transform">
              <FileText size={14} />
            </div>
            <div>
              <div className="font-mono text-[10px] text-[#8A8A8A] uppercase tracking-wider">
                RESUME
              </div>
              <div className="font-mono text-xs sm:text-sm text-[#F2F0E8] group-hover:text-[#F5D52F] transition-colors">
                Download Resume (PDF)
              </div>
            </div>
          </a>
        </div>

        {/* Full Monochrome Portrait with Warm Yellow Rim Glow + Handwritten Signature */}
        <div
          ref={portraitRef}
          className="relative w-full max-w-lg sm:max-w-xl mx-auto rounded-3xl overflow-hidden bg-black/40 border border-white/[0.08] shadow-[0_20px_50px_rgba(0,0,0,0.9)]"
        >
          {/* Portrait Image */}
          <div className="relative aspect-[4/3] w-full overflow-hidden">
            <img
              src="/images/hero-sequence/frame-192.webp"
              alt="Ayush Singh"
              className="w-full h-full object-cover object-top grayscale contrast-125 brightness-95"
              loading="lazy"
            />
            {/* Dark vignette gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#080909] via-transparent to-transparent opacity-90" />
            <div className="absolute inset-0 bg-gradient-to-b from-[#080909]/40 via-transparent to-transparent" />
            
            {/* Warm yellow ambient glow behind image */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] h-[350px] rounded-full bg-[#F5D52F]/18 blur-[100px] pointer-events-none" />

            {/* Handwritten Signature: Ayush Singh (Yellow Script Overlay matching Reference) */}
            <div className="absolute bottom-5 right-6 sm:bottom-7 sm:right-8 z-10 pointer-events-none">
              <img
                src="/images/ayush-signature-yellow.png"
                alt="Ayush Singh Signature"
                className="h-12 sm:h-16 w-auto drop-shadow-[0_4px_12px_rgba(0,0,0,0.8)] filter brightness-110"
              />
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
