import React, { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { ArrowUpRight } from 'lucide-react';
import { portfolioData, Writing } from '../../data';

gsap.registerPlugin(ScrollTrigger);

export const Writings: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const row1Ref = useRef<HTMLDivElement>(null);
  const row2Ref = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  const writings: Writing[] = portfolioData.writings;

  // Split articles into Row 1 and Row 2 for opposite continuous movement
  const row1Articles = [writings[0], writings[1], writings[2]];
  const row2Articles = [writings[3], writings[4], writings[0]];

  useGSAP(
    () => {
      const section = sectionRef.current;
      const row1 = row1Ref.current;
      const row2 = row2Ref.current;
      const list = listRef.current;
      if (!section) return;

      const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

      // =========================================================================
      // DESKTOP / TABLET CONTINUOUS HORIZONTAL OPPOSING MARQUEES
      // =========================================================================
      if (!prefersReducedMotion && row1 && row2) {
        // Row 1: Moves LEFT -> RIGHT
        const tween1 = gsap.fromTo(
          row1,
          { xPercent: -50 },
          {
            xPercent: 0,
            duration: 38,
            ease: 'none',
            repeat: -1,
          }
        );

        // Row 2: Moves RIGHT -> LEFT (subtle speed difference)
        const tween2 = gsap.fromTo(
          row2,
          { xPercent: 0 },
          {
            xPercent: -50,
            duration: 42,
            ease: 'none',
            repeat: -1,
          }
        );

        // Pause/slow slightly on hover
        const handleMouseEnter = () => {
          gsap.to([tween1, tween2], { timeScale: 0.25, duration: 0.5, ease: 'power1.out' });
        };
        const handleMouseLeave = () => {
          gsap.to([tween1, tween2], { timeScale: 1.0, duration: 0.6, ease: 'power1.out' });
        };

        const rowsContainer = row1.parentElement?.parentElement;
        if (rowsContainer) {
          rowsContainer.addEventListener('mouseenter', handleMouseEnter);
          rowsContainer.addEventListener('mouseleave', handleMouseLeave);
        }

        // Velocity-based subtle scroll acceleration
        let velocityTimer: ReturnType<typeof setTimeout> | null = null;
        ScrollTrigger.create({
          trigger: section,
          start: 'top bottom',
          end: 'bottom top',
          onUpdate: (self) => {
            const rawVelocity = self.getVelocity();
            const velocityBonus = Math.min(Math.abs(rawVelocity) / 600, 1.8);
            const targetSpeed = 1 + velocityBonus;

            gsap.to([tween1, tween2], { timeScale: targetSpeed, duration: 0.2, overwrite: 'auto' });

            if (velocityTimer) clearTimeout(velocityTimer);
            velocityTimer = setTimeout(() => {
              gsap.to([tween1, tween2], { timeScale: 1.0, duration: 0.8, ease: 'power2.out', overwrite: 'auto' });
            }, 120);
          },
        });
      }

      // =========================================================================
      // EDITORIAL LIST REVEAL (Desktop & Tablet)
      // =========================================================================
      if (list && window.innerWidth >= 768) {
        const rows = list.querySelectorAll<HTMLElement>('.writing-list-row');
        if (rows.length > 0) {
          gsap.fromTo(
            rows,
            { opacity: 0, y: 24 },
            {
              opacity: 1,
              y: 0,
              duration: 0.6,
              stagger: 0.1,
              ease: 'power2.out',
              scrollTrigger: {
                trigger: list,
                start: 'top 85%',
                toggleActions: 'play none none reverse',
              },
            }
          );
        }
      }

      // =========================================================================
      // MOBILE CARD STAGGERED REVEAL (Contained & Smooth)
      // =========================================================================
      const mobileCards = section.querySelectorAll<HTMLElement>('.mobile-writing-card');
      if (mobileCards.length > 0 && window.innerWidth < 768) {
        gsap.fromTo(
          mobileCards,
          { opacity: 0, y: 20 },
          {
            opacity: 1,
            y: 0,
            duration: 0.5,
            stagger: 0.08,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: section.querySelector('.mobile-cards-container'),
              start: 'top 85%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      }
    },
    { scope: sectionRef }
  );

  return (
    <section
      id="writings"
      ref={sectionRef}
      className="relative w-full py-20 lg:py-32 bg-[#090a0d] text-white border-t border-zinc-800/80 overflow-hidden"
      style={{ isolation: 'isolate' }}
    >
      {/* Ambient background glow */}
      <div className="absolute top-1/4 right-1/4 w-[500px] h-[500px] bg-amber-500/5 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-1/4 left-1/4 w-[400px] h-[400px] bg-cyan-500/5 rounded-full blur-[130px] pointer-events-none" />

      {/* Top Thin Divider Hand-off from previous section */}
      <div className="max-w-7xl mx-auto px-6 lg:px-8 mb-12 sm:mb-16">
        <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-zinc-800 to-transparent" />
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        
        {/* ================================================================= */}
        {/* 1. SECTION HEADER                                                */}
        {/* ================================================================= */}
        <div className="space-y-3 mb-10 sm:mb-14">
          <div className="flex items-baseline gap-3">
            <h2 className="font-display font-black text-4xl sm:text-6xl lg:text-7xl tracking-tight text-white uppercase">
              WRITINGS.
            </h2>
            <span className="text-amber-400 font-mono text-base sm:text-lg opacity-75">
              (05)
            </span>
          </div>

          <p className="text-zinc-400 text-sm sm:text-base max-w-xl font-sans leading-relaxed">
            Ideas on AI, open source, Linux, software engineering and building.
          </p>
        </div>

      </div>

      {/* ================================================================= */}
      {/* 2. MAIN VISUAL LAYER: TWO HORIZONTAL OPPOSING MARQUEE LINES       */}
      {/* (Desktop & Tablet only: hidden on mobile)                        */}
      {/* ================================================================= */}
      <div className="hidden md:flex flex-col gap-4 my-6 sm:my-8 overflow-hidden select-none border-y border-zinc-800/50 py-6 bg-[#08080a]/60 backdrop-blur-sm">
        
        {/* ROW 1: Moves LEFT -> RIGHT */}
        <div className="w-full overflow-hidden flex">
          <div
            ref={row1Ref}
            className="flex items-center gap-4 shrink-0 will-change-transform"
          >
            {/* Primary Track */}
            {row1Articles.map((article, idx) => (
              <a
                key={`r1-orig-${idx}`}
                href={article.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-3.5 px-5 py-3 rounded-xl bg-zinc-900/50 hover:bg-zinc-900/90 border border-zinc-800 hover:border-amber-400/60 transition-all duration-300 shrink-0 text-zinc-300 hover:text-white shadow-sm"
              >
                <span className="font-mono text-xs text-amber-400 font-bold">{article.number}</span>
                <span className="font-display font-bold text-base sm:text-lg tracking-tight uppercase whitespace-nowrap">
                  {article.shortTitle || article.title}
                </span>
                <span className="w-1.5 h-1.5 rounded-full bg-zinc-700 group-hover:bg-amber-400 transition-colors" />
                <span className="font-mono text-xs text-zinc-400 whitespace-nowrap">{article.date}</span>
                <ArrowUpRight size={14} className="text-zinc-500 group-hover:text-amber-400 transition-all transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>
            ))}

            <div className="flex items-center gap-2 px-3 text-zinc-600 font-mono text-xs select-none">
              <span>—</span>
              <span>MEDIUM ARCHIVE</span>
              <span>—</span>
            </div>

            {/* Seamless Loop Duplicate (Accessible screen-reader hidden) */}
            {row1Articles.map((article, idx) => (
              <a
                key={`r1-dup-${idx}`}
                href={article.url}
                target="_blank"
                rel="noopener noreferrer"
                tabIndex={-1}
                aria-hidden="true"
                className="group inline-flex items-center gap-3.5 px-5 py-3 rounded-xl bg-zinc-900/50 hover:bg-zinc-900/90 border border-zinc-800 hover:border-amber-400/60 transition-all duration-300 shrink-0 text-zinc-300 hover:text-white shadow-sm"
              >
                <span className="font-mono text-xs text-amber-400 font-bold">{article.number}</span>
                <span className="font-display font-bold text-base sm:text-lg tracking-tight uppercase whitespace-nowrap">
                  {article.shortTitle || article.title}
                </span>
                <span className="w-1.5 h-1.5 rounded-full bg-zinc-700 group-hover:bg-amber-400 transition-colors" />
                <span className="font-mono text-xs text-zinc-400 whitespace-nowrap">{article.date}</span>
                <ArrowUpRight size={14} className="text-zinc-500 group-hover:text-amber-400 transition-all transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>
            ))}

            <div className="flex items-center gap-2 px-3 text-zinc-600 font-mono text-xs select-none" aria-hidden="true">
              <span>—</span>
              <span>MEDIUM ARCHIVE</span>
              <span>—</span>
            </div>
          </div>
        </div>

        {/* ROW 2: Moves RIGHT -> LEFT (Opposite direction, different speed) */}
        <div className="w-full overflow-hidden flex">
          <div
            ref={row2Ref}
            className="flex items-center gap-4 shrink-0 will-change-transform"
          >
            {/* Primary Track */}
            {row2Articles.map((article, idx) => (
              <a
                key={`r2-orig-${idx}`}
                href={article.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-3.5 px-5 py-3 rounded-xl bg-zinc-900/50 hover:bg-zinc-900/90 border border-zinc-800 hover:border-amber-400/60 transition-all duration-300 shrink-0 text-zinc-300 hover:text-white shadow-sm"
              >
                <span className="font-mono text-xs text-amber-400 font-bold">{article.number}</span>
                <span className="font-display font-bold text-base sm:text-lg tracking-tight uppercase whitespace-nowrap">
                  {article.shortTitle || article.title}
                </span>
                <span className="w-1.5 h-1.5 rounded-full bg-zinc-700 group-hover:bg-amber-400 transition-colors" />
                <span className="font-mono text-xs text-zinc-400 whitespace-nowrap">{article.date}</span>
                <ArrowUpRight size={14} className="text-zinc-500 group-hover:text-amber-400 transition-all transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>
            ))}

            <div className="flex items-center gap-2 px-3 text-zinc-600 font-mono text-xs select-none">
              <span>✦</span>
              <span>OPEN SOURCE · SYSTEMS · AI</span>
              <span>✦</span>
            </div>

            {/* Seamless Loop Duplicate (Accessible screen-reader hidden) */}
            {row2Articles.map((article, idx) => (
              <a
                key={`r2-dup-${idx}`}
                href={article.url}
                target="_blank"
                rel="noopener noreferrer"
                tabIndex={-1}
                aria-hidden="true"
                className="group inline-flex items-center gap-3.5 px-5 py-3 rounded-xl bg-zinc-900/50 hover:bg-zinc-900/90 border border-zinc-800 hover:border-amber-400/60 transition-all duration-300 shrink-0 text-zinc-300 hover:text-white shadow-sm"
              >
                <span className="font-mono text-xs text-amber-400 font-bold">{article.number}</span>
                <span className="font-display font-bold text-base sm:text-lg tracking-tight uppercase whitespace-nowrap">
                  {article.shortTitle || article.title}
                </span>
                <span className="w-1.5 h-1.5 rounded-full bg-zinc-700 group-hover:bg-amber-400 transition-colors" />
                <span className="font-mono text-xs text-zinc-400 whitespace-nowrap">{article.date}</span>
                <ArrowUpRight size={14} className="text-zinc-500 group-hover:text-amber-400 transition-all transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>
            ))}

            <div className="flex items-center gap-2 px-3 text-zinc-600 font-mono text-xs select-none" aria-hidden="true">
              <span>✦</span>
              <span>OPEN SOURCE · SYSTEMS · AI</span>
              <span>✦</span>
            </div>
          </div>
        </div>

      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">

        {/* ================================================================= */}
        {/* 3. MOBILE COMPOSITION: COMPACT ANIMATED CARD SYSTEM               */}
        {/* (Mobile only: hidden on md+)                                      */}
        {/* ================================================================= */}
        <div className="md:hidden mobile-cards-container space-y-4 my-6 w-full">
          {writings.map((article) => (
            <a
              key={`mobile-${article.id}`}
              href={article.url}
              target="_blank"
              rel="noopener noreferrer"
              className="mobile-writing-card block w-full p-5 rounded-2xl bg-[#0c0e14]/95 border border-zinc-800/80 active:border-amber-400/60 transition-all shadow-md select-none"
            >
              <div className="flex items-center justify-between text-xs font-mono text-zinc-400 mb-2.5">
                <span className="text-amber-400 font-bold">{article.number}</span>
                <span>{article.date}</span>
              </div>
              
              <h3 className="font-display font-bold text-base text-zinc-100 tracking-tight leading-snug mb-2">
                {article.title}
              </h3>
              
              <p className="text-xs font-sans text-zinc-400 leading-relaxed line-clamp-2 mb-3">
                {article.description}
              </p>

              <div className="flex items-center justify-between pt-2.5 border-t border-zinc-800/60 text-[11px] font-mono text-amber-400 font-semibold">
                <span className="text-zinc-500 font-normal">{article.author}</span>
                <div className="inline-flex items-center gap-1">
                  <span>Read on Medium</span>
                  <ArrowUpRight size={12} />
                </div>
              </div>
            </a>
          ))}
        </div>

        {/* ================================================================= */}
        {/* 4. SECONDARY INFORMATION LAYER: EDITORIAL ARTICLE LIST            */}
        {/* (Desktop & Tablet only: hidden on mobile below 768px)             */}
        {/* ================================================================= */}
        <div className="hidden md:block mt-12 sm:mt-16">
          <div className="flex items-center justify-between pb-4 border-b border-zinc-800/70 mb-6">
            <span className="text-xs font-mono uppercase tracking-widest text-zinc-400 font-semibold">
              PUBLISHED ARTICLES & ESSAYS
            </span>
            <span className="text-xs font-mono text-amber-400">
              MEDIUM · @SINGHCOD3R
            </span>
          </div>

          <div ref={listRef} className="space-y-4">
            {writings.map((article) => (
              <a
                key={`list-${article.id}`}
                href={article.url}
                target="_blank"
                rel="noopener noreferrer"
                className="writing-list-row group block p-5 sm:p-6 md:p-7 rounded-2xl bg-gradient-to-r from-[#0c0e14]/90 to-[#08090d]/90 border border-zinc-800/80 hover:border-amber-400/60 transition-all duration-300 shadow-lg hover:shadow-[0_12px_36px_rgba(245,158,11,0.08)] relative overflow-hidden"
              >
                <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                  {/* Left: Number + Title + Excerpt */}
                  <div className="flex items-start gap-4 sm:gap-6 flex-1">
                    <span className="font-mono text-sm sm:text-base font-bold text-amber-400/90 shrink-0 pt-0.5">
                      {article.number}
                    </span>
                    <div className="space-y-2 flex-1">
                      <h3 className="font-display font-bold text-base sm:text-lg md:text-xl text-white group-hover:text-amber-300 transition-colors tracking-tight leading-snug">
                        {article.title}
                      </h3>
                      <p className="font-sans text-xs sm:text-sm text-zinc-400 leading-relaxed max-w-3xl">
                        {article.description}
                      </p>
                    </div>
                  </div>

                  {/* Right: Meta & Read on Medium button */}
                  <div className="flex items-center md:flex-col md:items-end justify-between md:justify-start gap-2 shrink-0 pt-2 md:pt-0 border-t md:border-t-0 border-zinc-800/60">
                    <div className="flex items-center gap-2 text-xs font-mono text-zinc-400">
                      <span className="text-zinc-500">{article.date}</span>
                      <span>·</span>
                      <span className="text-zinc-400">{article.author}</span>
                    </div>
                    <div className="inline-flex items-center gap-1.5 text-xs font-mono font-semibold text-amber-400 group-hover:text-amber-300 transition-colors pt-1">
                      <span>Read on Medium</span>
                      <ArrowUpRight size={14} className="transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                    </div>
                  </div>
                </div>
              </a>
            ))}
          </div>
        </div>

        {/* Transition Out of Writings Hand-off to Speaking */}
        <div className="w-full mt-10 md:mt-20 flex items-center justify-end md:justify-between text-xs font-mono text-zinc-400 pt-6 border-t border-zinc-800/60">
          <span className="hidden md:inline text-zinc-500 uppercase tracking-widest">
            06 // WRITINGS COMPLETE
          </span>
          <a
            href="https://singhcod3r.medium.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-amber-400 hover:text-amber-300 transition-colors font-semibold uppercase"
          >
            <span>View All on Medium</span>
            <ArrowUpRight size={14} />
          </a>
        </div>

      </div>
    </section>
  );
};
