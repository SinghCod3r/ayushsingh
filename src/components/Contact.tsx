import React, { useState } from 'react';
import { Mail, Github, Linkedin, FileText, Send, ArrowUpRight, Sparkles } from 'lucide-react';
import { portfolioData } from '../../data';
import { KineticHeading } from './KineticHeading';
import { Magnetic } from './Magnetic';

export const Contact: React.FC = () => {
  const contact = portfolioData.contact;
  const [copied, setCopied] = useState(false);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(contact.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <section
      id="contact"
      className="relative w-full py-24 lg:py-36 bg-[#08080a] text-white border-t border-zinc-800/80 overflow-hidden"
      style={{ isolation: 'isolate' }}
    >
      {/* Background warm amber glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[700px] h-[500px] bg-amber-500/10 rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        
        {/* Large Editorial Headline with Kinetic Typography */}
        <div className="space-y-2 mb-12">
          <KineticHeading
            text="LET'S BUILD"
            variant="terminal"
            className="font-display font-black text-5xl sm:text-7xl lg:text-8xl tracking-tight leading-[0.9] text-white uppercase"
          />
          <div className="font-display font-black text-3xl sm:text-5xl lg:text-6xl tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-orange-400 to-amber-200 uppercase">
            SOMETHING COOL.
          </div>
          <p className="text-zinc-400 text-sm sm:text-lg max-w-xl font-sans pt-3">
            {contact.subtext}
          </p>
        </div>

        {/* Action Grid: Primary Email + Character Visual + Social CTAs */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch mb-16">
          
          {/* Left Column: Direct Email Box + Quick Message */}
          <div className="lg:col-span-7 flex flex-col justify-between p-6 sm:p-10 rounded-2xl bg-[#0e1015] border border-zinc-800/90 shadow-2xl space-y-6">
            <div className="space-y-6">
              <span className="text-xs font-mono uppercase tracking-wider text-zinc-500">
                Direct Contact Channel
              </span>

              <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 p-4 rounded-xl bg-zinc-900/80 border border-zinc-800">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400 shrink-0">
                    <Mail size={18} />
                  </div>
                  <div>
                    <div className="text-[11px] font-mono text-zinc-500">PRIMARY EMAIL</div>
                    <div className="font-mono text-sm sm:text-base font-semibold text-white select-all">
                      {contact.email}
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={handleCopyEmail}
                    className="px-4 py-2 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-200 text-xs font-mono transition-colors"
                  >
                    {copied ? 'Copied!' : 'Copy'}
                  </button>
                  <Magnetic strength={0.25}>
                    <a
                      href={`mailto:${contact.email}`}
                      className="px-4 py-2 rounded-lg bg-amber-400 hover:bg-amber-300 text-black text-xs font-mono font-semibold transition-colors flex items-center gap-1.5"
                    >
                      <span>Write</span>
                      <Send size={12} />
                    </a>
                  </Magnetic>
                </div>
              </div>

              {/* Status Note */}
              <div className="flex items-center justify-between text-xs font-mono text-zinc-500 pt-2 border-t border-zinc-800/60">
                <span className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  {contact.locationNote}
                </span>
                <span>Typically replies within 24h</span>
              </div>
            </div>

            {/* Official PDF Resume Download Bar with Skipper Magnetic Pull */}
            <Magnetic strength={0.15} className="w-full mt-4">
              <a
                href={contact.resume}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full p-5 rounded-2xl bg-gradient-to-r from-amber-500/10 via-zinc-900/80 to-zinc-900/80 border border-amber-500/30 hover:border-amber-400 transition-all flex items-center justify-between group block"
              >
                <div className="flex items-center gap-3.5">
                  <div className="w-10 h-10 rounded-full bg-amber-400 text-black flex items-center justify-center font-bold shrink-0">
                    <FileText size={18} />
                  </div>
                  <div>
                    <div className="text-[10px] font-mono uppercase text-amber-400/90 font-semibold">
                      OFFICIAL PDF RESUME
                    </div>
                    <div className="font-display font-bold text-base text-white group-hover:text-amber-300 transition-colors">
                      Download Ayush Singh Resume
                    </div>
                  </div>
                </div>
                <ArrowUpRight size={18} className="text-amber-400 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform shrink-0" />
              </a>
            </Magnetic>
          </div>

          {/* Right Column: Character Visual Returning to Hero Language + Social Badges */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-6">
            
            {/* Character Card matching Moodboard 09 */}
            <div className="relative rounded-2xl overflow-hidden bg-gradient-to-b from-[#13151b] to-[#0c0d11] border border-zinc-800/90 p-5 shadow-2xl flex flex-col items-center justify-between">
              
              {/* Warm Amber Halo */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 rounded-full bg-amber-500/20 blur-3xl pointer-events-none" />

              {/* Floating Quote Badge */}
              <div className="self-end z-10 mb-2">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-400/15 border border-amber-400/30 text-amber-300 text-[11px] font-mono font-medium shadow-lg">
                  <Sparkles size={11} />
                  Good Ideas Always Welcome!
                </span>
              </div>

              {/* Character Image (Hero Frame 001) */}
              <div className="relative z-0 w-44 h-44 sm:w-52 sm:h-52 rounded-full overflow-hidden border-2 border-amber-500/40 shadow-[0_0_30px_rgba(245,158,11,0.25)] bg-black my-2">
                <img
                  src="/images/hero-sequence/frame-001.webp"
                  alt="Ayush Singh - Let's Talk"
                  className="w-full h-full object-cover object-top scale-110"
                  loading="lazy"
                />
              </div>

              <div className="text-center pt-2 z-10">
                <div className="font-display font-bold text-base text-zinc-100">
                  Ayush Singh
                </div>
                <div className="text-xs font-mono text-zinc-400">
                  Software Engineer & Open Source Maintainer
                </div>
              </div>
            </div>

            {/* Social Grid (GitHub & LinkedIn) */}
            <div className="grid grid-cols-2 gap-4">
              <a
                href={contact.github}
                target="_blank"
                rel="noopener noreferrer"
                className="p-4 rounded-xl bg-[#0f1115] border border-zinc-800/80 hover:border-zinc-700 hover:bg-[#13151b] transition-all flex flex-col justify-between group"
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="w-8 h-8 rounded-full bg-zinc-900 flex items-center justify-center text-zinc-300 group-hover:text-white">
                    <Github size={16} />
                  </div>
                  <ArrowUpRight size={14} className="text-zinc-600 group-hover:text-amber-400 transition-colors" />
                </div>
                <div>
                  <span className="text-[10px] font-mono uppercase text-zinc-500">Code & Commits</span>
                  <div className="font-display font-bold text-sm text-zinc-100 group-hover:text-amber-400 transition-colors">
                    GitHub Profile
                  </div>
                </div>
              </a>

              <a
                href={contact.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="p-4 rounded-xl bg-[#0f1115] border border-zinc-800/80 hover:border-zinc-700 hover:bg-[#13151b] transition-all flex flex-col justify-between group"
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="w-8 h-8 rounded-full bg-zinc-900 flex items-center justify-center text-zinc-300 group-hover:text-white">
                    <Linkedin size={16} />
                  </div>
                  <ArrowUpRight size={14} className="text-zinc-600 group-hover:text-amber-400 transition-colors" />
                </div>
                <div>
                  <span className="text-[10px] font-mono uppercase text-zinc-500">Professional</span>
                  <div className="font-display font-bold text-sm text-zinc-100 group-hover:text-amber-400 transition-colors">
                    LinkedIn
                  </div>
                </div>
              </a>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
