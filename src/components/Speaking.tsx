import React, { useState, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { ArrowDown, ArrowUpRight, ArrowRight, ExternalLink, X } from 'lucide-react';
import { portfolioData } from '../../data';
import { SectionLabel } from './SectionLabel';
import { scrollToTarget } from '../utils/scroll';

gsap.registerPlugin(ScrollTrigger);

export const Speaking: React.FC = () => {
  const containerRef = useRef<HTMLElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const pastTalksRef = useRef<HTMLDivElement>(null);

  const [showPresentationModal, setShowPresentationModal] = useState(false);

  const talk = portfolioData.speaking.featuredTalk;

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
        cardRef.current,
        {
          opacity: 0,
          y: 24,
          duration: 0.6,
          ease: 'power3.out',
        },
        '-=0.3'
      );

      tl.from(
        pastTalksRef.current,
        {
          opacity: 0,
          y: 20,
          duration: 0.5,
          ease: 'power3.out',
        },
        '-=0.2'
      );
    },
    { scope: containerRef }
  );

  return (
    <>
      <section
        id="talks"
        ref={containerRef}
        className="relative w-full py-24 sm:py-32 bg-[#080909] text-[#F2F0E8] overflow-hidden border-t border-white/[0.06]"
        style={{ isolation: 'isolate' }}
      >
        <div className="max-w-7xl mx-auto px-6 sm:px-10 relative z-10">
          
          {/* Section Label: TALKS */}
          <div className="mb-8">
            <SectionLabel label="TALKS" />
          </div>

          {/* Headline: SHARING (White) WHAT I LEARN. (Yellow) */}
          <h2
            ref={headlineRef}
            className="font-display text-6xl sm:text-8xl md:text-9xl leading-[0.88] tracking-wide uppercase mb-12 sm:mb-16"
          >
            SHARING <br />
            <span className="text-[#F5D52F]">WHAT I LEARN.</span>
          </h2>

          <div className="max-w-xl space-y-10">
            
            {/* Main Featured Talk Card (Matching Screen 09 in Reference) */}
            <div
              ref={cardRef}
              className="p-6 sm:p-7 rounded-2xl bg-white/[0.025] border border-white/[0.08] backdrop-blur-md space-y-5"
            >
              {/* Photo Preview of Keynote Stage */}
              <div className="relative w-full h-56 sm:h-64 rounded-xl overflow-hidden bg-black border border-white/10 group">
                <img
                  src="/images/talks/ayush-keynote.webp"
                  alt="Ayush Singh speaking at OOSC 4.0, IIIT Allahabad"
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20" />
                
                {/* External link indicator */}
                <button
                  onClick={() => setShowPresentationModal(true)}
                  className="absolute top-3.5 right-3.5 p-2 rounded-lg bg-black/60 border border-white/20 text-[#F2F0E8] hover:text-[#F5D52F] hover:bg-black/80 transition-colors cursor-pointer"
                  aria-label="Expand keynote slide view"
                >
                  <ExternalLink size={16} />
                </button>
              </div>

              {/* Title & Venue */}
              <div className="space-y-1.5">
                <h3 className="font-display text-2xl sm:text-3xl text-[#F2F0E8] tracking-wide leading-tight">
                  {talk.title}
                </h3>
                <p className="font-mono text-xs sm:text-sm text-[#8A8A8A]">
                  {talk.event} · {talk.institution}
                </p>
              </div>

              {/* Button: View presentation -> */}
              <button
                onClick={() => setShowPresentationModal(true)}
                className="inline-flex items-center justify-center gap-2 w-full py-3 px-5 rounded-xl font-mono text-xs font-semibold uppercase tracking-wider bg-[#F5D52F] text-black hover:bg-white transition-colors cursor-pointer shadow-[0_0_20px_rgba(245,213,47,0.25)]"
              >
                <span>View presentation</span>
                <ArrowRight size={14} />
              </button>

              {/* Dots indicator below */}
              <div className="flex items-center justify-center gap-1.5 pt-1">
                <span className="w-1.5 h-1.5 rounded-full bg-[#F5D52F]" />
                <span className="w-1.5 h-1.5 rounded-full bg-white/20" />
                <span className="w-1.5 h-1.5 rounded-full bg-white/20" />
              </div>
            </div>

            {/* Past Talks List */}
            <div ref={pastTalksRef} className="space-y-3 pt-2">
              <h4 className="font-mono text-xs uppercase tracking-wider text-[#8A8A8A]">
                Past Talks
              </h4>

              <div className="p-4 rounded-xl bg-white/[0.015] border border-white/[0.06] flex items-center justify-between group hover:border-[#F5D52F]/30 transition-colors">
                <div>
                  <h5 className="font-display text-lg sm:text-xl text-[#F2F0E8] group-hover:text-[#F5D52F] transition-colors">
                    Open Source for Students
                  </h5>
                  <p className="font-mono text-[11px] text-[#8A8A8A]">
                    Tech Meetup · 2024
                  </p>
                </div>
                <ArrowUpRight size={18} className="text-[#8A8A8A] group-hover:text-[#F5D52F] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
              </div>
            </div>

            {/* Circular Down Button */}
            <div className="pt-4">
              <button
                onClick={() => scrollToTarget('#contact', -20)}
                className="w-10 h-10 rounded-full border border-white/20 hover:border-[#F5D52F] flex items-center justify-center text-[#8A8A8A] hover:text-[#F5D52F] transition-colors cursor-pointer group"
                aria-label="Scroll to Contact section"
              >
                <ArrowDown size={16} className="text-[#F2F0E8] group-hover:text-[#F5D52F] group-hover:translate-y-0.5 transition-transform" />
              </button>
            </div>

          </div>

        </div>
      </section>

      {/* Presentation Modal */}
      {showPresentationModal && (
        <div
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-xl flex items-center justify-center p-4 sm:p-8"
          role="dialog"
          aria-modal="true"
        >
          <div className="relative w-full max-w-4xl bg-[#0c0d11] border border-white/10 rounded-2xl p-6 sm:p-8 space-y-6">
            <div className="flex items-start justify-between">
              <div>
                <span className="font-mono text-xs text-[#F5D52F] uppercase tracking-wider">
                  KEYNOTE PRESENTATION · OOSC 4.0
                </span>
                <h3 className="font-display text-3xl sm:text-5xl text-[#F2F0E8] uppercase mt-1">
                  {talk.title}
                </h3>
              </div>
              <button
                onClick={() => setShowPresentationModal(false)}
                className="p-2 rounded-lg text-[#8A8A8A] hover:text-[#F5D52F] hover:bg-white/5 transition-colors cursor-pointer"
                aria-label="Close modal"
              >
                <X size={22} />
              </button>
            </div>

            <div className="space-y-4 font-sans text-sm sm:text-base text-[#8A8A8A] leading-relaxed">
              <p>{talk.summary}</p>
              <div className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.07] font-mono text-xs text-[#F2F0E8] space-y-1">
                <p><span className="text-[#F5D52F]">Date:</span> {talk.date}</p>
                <p><span className="text-[#F5D52F]">Location:</span> {talk.location}</p>
                <p><span className="text-[#F5D52F]">Institution:</span> {talk.institution}</p>
              </div>
            </div>

            <div className="flex items-center justify-end gap-3 pt-4 border-t border-white/10">
              <button
                onClick={() => setShowPresentationModal(false)}
                className="px-5 py-2 rounded-xl font-mono text-xs text-[#8A8A8A] hover:text-white transition-colors cursor-pointer"
              >
                Close
              </button>
              <a
                href={`mailto:${portfolioData.personal.socials.email}?subject=Inquiry about Keynote: ${talk.title}`}
                className="px-5 py-2 rounded-xl font-mono text-xs font-semibold uppercase tracking-wider bg-[#F5D52F] text-black hover:bg-white transition-colors"
              >
                Request Slides
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
