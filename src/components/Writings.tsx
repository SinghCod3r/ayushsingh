import React, { useState, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { ArrowUpRight, ArrowRight, BookOpen } from 'lucide-react';
import { portfolioData, Writing } from '../../data';
import { SectionLabel } from './SectionLabel';
import { ArticleModal } from './ArticleModal';

gsap.registerPlugin(ScrollTrigger);

export const Writings: React.FC = () => {
  const containerRef = useRef<HTMLElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const portraitRef = useRef<HTMLDivElement>(null);

  const [selectedArticle, setSelectedArticle] = useState<Writing | null>(null);

  const writings = portfolioData.writings;

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
        listRef.current?.children || [],
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
          duration: 0.7,
          ease: 'power2.out',
        },
        '-=0.4'
      );
    },
    { scope: containerRef }
  );

  return (
    <>
      <section
        id="writings"
        ref={containerRef}
        className="relative w-full py-24 sm:py-32 bg-[#080909] text-[#F2F0E8] overflow-hidden border-t border-white/[0.06]"
        style={{ isolation: 'isolate' }}
      >
        {/* Subtle Background Portrait with Yellow Glow */}
        <div
          ref={portraitRef}
          className="absolute bottom-0 right-0 sm:right-6 md:right-12 w-80 sm:w-[480px] md:w-[580px] h-[540px] pointer-events-none opacity-20 sm:opacity-30 select-none z-0 overflow-hidden"
        >
          <img
            src="/images/hero-sequence/frame-185.webp"
            alt=""
            className="w-full h-full object-contain grayscale contrast-125 brightness-90"
            loading="lazy"
          />
          {/* Warm yellow ambient glow */}
          <div className="absolute bottom-10 left-1/2 -translate-x-1/2 w-[340px] h-[340px] rounded-full bg-[#F5D52F]/14 blur-[120px] pointer-events-none" />
        </div>

        <div className="max-w-7xl mx-auto px-6 sm:px-10 relative z-10">
          
          {/* Section Label: WRITINGS */}
          <div className="mb-8">
            <SectionLabel label="WRITINGS" />
          </div>

          {/* Headline: I ALSO TALK ABOUT (White) TECHNOLOGY. (Yellow) */}
          <h2
            ref={headlineRef}
            className="font-display text-6xl sm:text-8xl md:text-9xl leading-[0.88] tracking-wide uppercase mb-12 sm:mb-16"
          >
            I ALSO <br />
            TALK ABOUT <br />
            <span className="text-[#F5D52F]">TECHNOLOGY.</span>
          </h2>

          {/* Clean Article Cards List (Matching Screen 08 in Reference) */}
          <div
            ref={listRef}
            className="max-w-2xl space-y-3.5 mb-8"
          >
            {writings.map((writing) => (
              <button
                key={writing.id}
                onClick={() => setSelectedArticle(writing)}
                className="w-full p-4 sm:p-5 rounded-xl bg-white/[0.025] border border-white/[0.08] hover:border-[#F5D52F]/40 flex items-center justify-between text-left group transition-all duration-200 cursor-pointer"
              >
                <div className="flex items-center gap-3.5 sm:gap-4">
                  {/* Square Thumbnail Icon */}
                  <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-lg bg-black/60 border border-white/10 flex items-center justify-center shrink-0 group-hover:border-[#F5D52F]/50 transition-colors">
                    <BookOpen size={18} className="text-[#F5D52F]" />
                  </div>

                  {/* Title & Date */}
                  <div className="space-y-0.5">
                    <h3 className="font-display text-lg sm:text-2xl text-[#F2F0E8] group-hover:text-[#F5D52F] tracking-wide uppercase transition-colors line-clamp-1">
                      {writing.shortTitle || writing.title}
                    </h3>
                    <p className="font-mono text-[11px] text-[#8A8A8A]">
                      {writing.date} · {writing.category || 'Article'}
                    </p>
                  </div>
                </div>

                {/* Arrow */}
                <div className="p-2 text-[#8A8A8A] group-hover:text-[#F5D52F] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform shrink-0">
                  <ArrowUpRight size={18} />
                </div>
              </button>
            ))}
          </div>

          {/* View all writings -> */}
          <a
            href="https://singhcod3r.medium.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 font-mono text-xs sm:text-sm text-[#8A8A8A] hover:text-[#F5D52F] transition-colors group"
          >
            <span>View all writings</span>
            <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
          </a>

        </div>
      </section>

      {/* Article Modal */}
      <ArticleModal
        article={selectedArticle}
        onClose={() => setSelectedArticle(null)}
      />
    </>
  );
};
