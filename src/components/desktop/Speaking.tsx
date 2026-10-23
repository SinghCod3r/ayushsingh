import React, { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { ArrowUpRight, Mic, BookOpen } from 'lucide-react';
import { portfolioData } from '../../../data';

gsap.registerPlugin(ScrollTrigger);

export const Speaking: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const keynote = portfolioData.speaking.featuredTalk;
  const writings = portfolioData.writings.slice(0, 3);

  useGSAP(
    () => {
      const container = containerRef.current;
      if (!container) return;

      const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      if (prefersReducedMotion) return;

      gsap.from(container.querySelector('.keynote-card'), {
        scrollTrigger: {
          trigger: container,
          start: 'top 80%',
          end: 'top 45%',
          scrub: 0.5,
        },
        y: 30,
        opacity: 0,
        ease: 'power2.out',
      });
    },
    { scope: containerRef }
  );

  return (
    <section
      id="speaking"
      ref={containerRef}
      className="relative w-full py-24 lg:py-36 bg-transparent text-zinc-100 border-t border-zinc-800/60 overflow-hidden"
      style={{ isolation: 'isolate' }}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div>
            <span className="text-[11px] font-mono uppercase tracking-widest text-zinc-500">
              Thought Leadership & Discourse
            </span>
            <h2 className="font-display font-bold text-3xl sm:text-4xl lg:text-5xl text-zinc-100 tracking-tight mt-2">
              Speaking & Writings.
            </h2>
          </div>
          <p className="text-sm font-sans text-zinc-400 max-w-md">
            Sharing empirical systems insights, maintainer realities, and AI quality challenges.
          </p>
        </div>

        {/* 2-Column Split: Keynote Feature (Left) + Selected Publications (Right) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          
          {/* Left: Featured Conference Keynote */}
          <div className="keynote-card lg:col-span-7 p-8 sm:p-10 rounded-xl border border-zinc-800/80 bg-zinc-950/40 space-y-6">
            <div className="flex items-center justify-between flex-wrap gap-3">
              <span className="inline-flex items-center gap-1.5 text-xs font-mono text-amber-400 font-semibold uppercase">
                <Mic size={14} />
                Keynote Talk • IIIT Allahabad
              </span>
              <span className="text-xs font-mono text-zinc-500">
                {keynote.date} • {keynote.location}
              </span>
            </div>

            <div className="space-y-3">
              <h3 className="font-display font-bold text-2xl sm:text-3xl text-zinc-100 tracking-tight leading-snug">
                {keynote.title}
              </h3>
              <div className="text-xs font-mono uppercase text-zinc-400">
                {keynote.event}
              </div>
              <p className="text-sm sm:text-base font-sans text-zinc-400 leading-relaxed pt-2">
                {keynote.summary}
              </p>
            </div>

            <div className="flex flex-wrap gap-2 pt-2 border-t border-zinc-800/60">
              {keynote.tags.map((tag) => (
                <span
                  key={tag}
                  className="text-[11px] font-mono px-2.5 py-0.5 rounded bg-zinc-900 border border-zinc-800 text-zinc-400"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* Right: Selected Technical Writings */}
          <div className="lg:col-span-5 space-y-4">
            <div className="flex items-center gap-2 pb-2 border-b border-zinc-800/80">
              <BookOpen size={14} className="text-amber-400" />
              <span className="text-xs font-mono uppercase tracking-wider text-zinc-300 font-semibold">
                Selected Publications
              </span>
            </div>

            <div className="divide-y divide-zinc-800/60">
              {writings.map((article) => (
                <a
                  key={article.id}
                  href={article.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group py-4 block space-y-1.5 transition-colors"
                >
                  <div className="flex items-center justify-between text-[11px] font-mono text-zinc-500">
                    <span>{article.date}</span>
                    <span className="text-amber-400/80 uppercase">{article.category}</span>
                  </div>

                  <h4 className="font-display font-bold text-base text-zinc-200 group-hover:text-white group-hover:underline underline-offset-4 transition-colors leading-snug">
                    {article.title}
                  </h4>

                  <p className="text-xs font-sans text-zinc-500 line-clamp-2 leading-relaxed">
                    {article.description}
                  </p>

                  <div className="inline-flex items-center gap-1 text-[11px] font-mono text-zinc-400 group-hover:text-zinc-200 pt-1">
                    <span>Read on Medium</span>
                    <ArrowUpRight size={11} />
                  </div>
                </a>
              ))}
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
