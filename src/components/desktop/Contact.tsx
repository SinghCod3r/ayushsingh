import React, { useState, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { Mail, Github, Linkedin, FileText, ArrowUpRight, Copy, Check } from 'lucide-react';
import { portfolioData } from '../../../data';

gsap.registerPlugin(ScrollTrigger);

export const Contact: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const [copied, setCopied] = useState(false);

  const contact = portfolioData.contact;

  const handleCopy = () => {
    navigator.clipboard.writeText(contact.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  useGSAP(
    () => {
      const headline = headlineRef.current;
      if (!headline) return;

      const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      if (prefersReducedMotion) return;

      gsap.from(headline, {
        scrollTrigger: {
          trigger: headline,
          start: 'top 85%',
          end: 'top 50%',
          scrub: 0.5,
        },
        y: 35,
        opacity: 0,
        ease: 'power2.out',
      });
    },
    { scope: containerRef }
  );

  return (
    <section
      id="contact"
      ref={containerRef}
      className="relative w-full py-28 lg:py-40 bg-transparent text-zinc-100 border-t border-zinc-800/60 overflow-hidden"
      style={{ isolation: 'isolate' }}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10">
        
        {/* Section Tag */}
        <div className="mb-6">
          <span className="text-[11px] font-mono uppercase tracking-widest text-zinc-500">
            Contact
          </span>
        </div>

        {/* Large Typography Headline */}
        <div className="space-y-4 max-w-5xl mb-16">
          <h2
            ref={headlineRef}
            className="font-display font-black text-5xl sm:text-6xl md:text-7xl lg:text-8xl tracking-tight leading-[0.92] text-zinc-100 uppercase"
          >
            Let's Build Something.
          </h2>
          <p className="text-zinc-400 font-sans text-base sm:text-lg max-w-xl leading-relaxed pt-2">
            {contact.subtext}
          </p>
        </div>

        {/* Clean Contact Matrix */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 items-start pt-8 border-t border-zinc-800/60">
          
          {/* Email Channel */}
          <div className="lg:col-span-6 space-y-4">
            <span className="text-xs font-mono uppercase tracking-wider text-zinc-500">
              Direct Inquiries
            </span>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 p-5 rounded-lg border border-zinc-800/80 bg-zinc-950/40">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-zinc-900 border border-zinc-800 flex items-center justify-center text-amber-400 shrink-0">
                  <Mail size={16} />
                </div>
                <div>
                  <div className="text-[10px] font-mono text-zinc-500 uppercase">Email Address</div>
                  <div className="font-mono text-sm sm:text-base font-semibold text-zinc-100 select-all">
                    {contact.email}
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={handleCopy}
                  className="px-3 py-1.5 rounded border border-zinc-700/80 hover:border-zinc-500 bg-zinc-900 text-xs font-mono text-zinc-300 hover:text-white transition-colors flex items-center gap-1 cursor-pointer"
                  aria-label="Copy email address"
                >
                  {copied ? <Check size={12} className="text-emerald-400" /> : <Copy size={12} />}
                  <span>{copied ? 'Copied' : 'Copy'}</span>
                </button>
                <a
                  href={`mailto:${contact.email}`}
                  className="px-3.5 py-1.5 rounded bg-zinc-100 hover:bg-white text-zinc-950 font-mono text-xs font-semibold transition-all"
                >
                  Write
                </a>
              </div>
            </div>

            <div className="flex items-center gap-2 text-xs font-mono text-zinc-500 pt-1">
              <span className="w-2 h-2 rounded-full bg-emerald-400" />
              <span>{contact.locationNote}</span>
            </div>
          </div>

          {/* Social Profiles & Resume */}
          <div className="lg:col-span-6 space-y-4 lg:pl-10">
            <span className="text-xs font-mono uppercase tracking-wider text-zinc-500">
              Profiles & Resume
            </span>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <a
                href={contact.github}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center justify-between p-4 rounded-lg border border-zinc-800/80 bg-zinc-950/40 hover:border-zinc-600 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <Github size={16} className="text-zinc-400 group-hover:text-white transition-colors" />
                  <span className="font-mono text-xs text-zinc-300 group-hover:text-white">GitHub</span>
                </div>
                <ArrowUpRight size={13} className="text-zinc-500 group-hover:text-zinc-300" />
              </a>

              <a
                href={contact.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center justify-between p-4 rounded-lg border border-zinc-800/80 bg-zinc-950/40 hover:border-zinc-600 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <Linkedin size={16} className="text-zinc-400 group-hover:text-white transition-colors" />
                  <span className="font-mono text-xs text-zinc-300 group-hover:text-white">LinkedIn</span>
                </div>
                <ArrowUpRight size={13} className="text-zinc-500 group-hover:text-zinc-300" />
              </a>

              <a
                href={contact.resume}
                target="_blank"
                rel="noopener noreferrer"
                className="group col-span-1 sm:col-span-2 flex items-center justify-between p-4 rounded-lg border border-zinc-800/80 bg-zinc-950/40 hover:border-zinc-600 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <FileText size={16} className="text-amber-400" />
                  <div>
                    <span className="font-mono text-xs text-zinc-200 group-hover:text-white font-medium block">
                      Curriculum Vitae (PDF)
                    </span>
                    <span className="text-[10px] font-mono text-zinc-500">Official technical resume</span>
                  </div>
                </div>
                <ArrowUpRight size={13} className="text-zinc-500 group-hover:text-zinc-300" />
              </a>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
