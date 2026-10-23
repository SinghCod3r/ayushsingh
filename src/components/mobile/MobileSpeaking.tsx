import React from 'react';
import { portfolioData } from '../../../data';

export const MobileSpeaking: React.FC = () => {
  return (
    <section
      id="mobile-talks"
      className="relative w-full py-14 px-6 bg-[#080909] text-[#F2F0E8] overflow-hidden border-t border-white/[0.06]"
    >
      <div className="relative z-10 flex flex-col">
        {/* Section Label */}
        <div className="flex items-center space-x-1.5 text-[10px] font-mono tracking-widest uppercase text-[#F5D52F] mb-3">
          <span>TALKS</span>
          <span>↗</span>
        </div>

        {/* Editorial Headline */}
        <h2 className="font-editorial text-[14vw] leading-[0.9] tracking-tight mb-8">
          <span className="text-[#F2F0E8]">SHARING<br /></span>
          <span className="text-[#F2F0E8]">WHAT I </span>
          <span className="text-[#F5D52F]">LEARN.</span>
        </h2>

        {/* Featured Keynote Card */}
        <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/[0.08] backdrop-blur-md mb-8">
          {/* Keynote Stage Photo */}
          <div className="relative w-full aspect-[4/3] rounded-xl overflow-hidden mb-4 bg-black/40 border border-white/10">
            <img
              src="/images/talks/ayush-keynote.webp"
              alt="Ayush Singh presenting keynote at IIIT Allahabad"
              className="w-full h-full object-cover filter contrast-110 brightness-95"
            />
            <div className="absolute top-3 right-3 px-2 py-0.5 rounded text-[9px] font-mono bg-black/60 text-[#F5D52F] backdrop-blur-md border border-white/10">
              FEATURED
            </div>
          </div>

          <span className="text-[10px] font-mono text-[#8A8A8A] uppercase tracking-wider">
            OOSC 4.0 · IIIT Allahabad
          </span>
          <h3 className="font-editorial text-2xl text-[#F2F0E8] tracking-wide mt-1 mb-2 leading-tight">
            AI OVERLOAD: HOW CARELESS AI USAGE IS QUIETLY KILLING PR QUALITY
          </h3>
          <p className="text-xs text-[#8A8A8A] leading-relaxed mb-4 font-sans">
            A deep-dive keynote on maintaining code quality, architectural discernment, and avoiding noisy automated PRs in open source.
          </p>

          <a
            href={portfolioData.personal.socials.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full flex items-center justify-center py-3 rounded-xl bg-[#F5D52F] text-[#080909] font-mono text-xs font-bold tracking-wider hover:bg-yellow-400 transition-colors"
          >
            VIEW PRESENTATION →
          </a>

          {/* 3 pagination dots */}
          <div className="flex items-center justify-center space-x-1.5 mt-4">
            <span className="w-1.5 h-1.5 rounded-full bg-[#F5D52F]" />
            <span className="w-1.5 h-1.5 rounded-full bg-white/20" />
            <span className="w-1.5 h-1.5 rounded-full bg-white/20" />
          </div>
        </div>

        {/* Past Talks row */}
        <div className="flex flex-col">
          <span className="text-[11px] font-mono text-[#8A8A8A] uppercase tracking-wider mb-2">
            Past Talks
          </span>
          <div className="p-3.5 rounded-xl bg-white/[0.02] border border-white/[0.06] flex items-center justify-between">
            <div>
              <h4 className="text-xs font-medium text-[#F2F0E8]">
                Open Source for Students
              </h4>
              <span className="text-[10px] font-mono text-[#8A8A8A]">
                Tech Meetup · 2024
              </span>
            </div>
            <span className="text-xs font-mono text-[#8A8A8A]">↗</span>
          </div>
        </div>

        {/* Circular Scroll Down Arrow */}
        <div className="mt-10 flex items-center justify-center">
          <a
            href="#mobile-contact"
            className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center text-xs font-mono text-[#8A8A8A] hover:border-[#F5D52F] hover:text-[#F5D52F] transition-colors"
          >
            <span>↓</span>
          </a>
        </div>
      </div>
    </section>
  );
};
