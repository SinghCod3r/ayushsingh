import React, { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger);

const CAPABILITIES = [
  {
    num: '01',
    title: 'Software Engineering',
    desc: 'Architecting maintainable systems, decoupled service pipelines, and type-safe architectures designed for correctness, concurrency, and performance.',
    tags: ['Architecture', 'Concurrency', 'Algorithms'],
  },
  {
    num: '02',
    title: 'Full-Stack Development',
    desc: 'Crafting responsive, low-latency web applications with React, Next.js, and TypeScript, backed by high-throughput async Python (FastAPI) or Node.js APIs.',
    tags: ['React', 'Next.js', 'FastAPI', 'Node.js'],
  },
  {
    num: '03',
    title: 'Open Source Leadership',
    desc: 'Maintaining upstream Linux infrastructure at The Linux Foundation, fixing race conditions, refactoring blocking I/O, and reviewing community contributions.',
    tags: ['The Linux Foundation', 'OpenPrinting', 'Upstream'],
  },
  {
    num: '04',
    title: 'Systems & QA Testing',
    desc: 'Automating regression suites, validating POSIX driver communication, and testing asynchronous GTK main-loop callbacks against live hardware.',
    tags: ['Pytest', 'GLib Loops', 'D-Bus IPC', 'CUPS'],
  },
  {
    num: '05',
    title: 'Developer Tools & Compilers',
    desc: 'Designing custom interpreters (Ezy Scripting Language), CLI productivity utilities, and automated tooling to accelerate developer workflows.',
    tags: ['Interpreters', 'AST', 'CLI Tooling'],
  },
];

export const WhatIDo: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const container = containerRef.current;
      const list = listRef.current;
      if (!container || !list) return;

      const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      if (prefersReducedMotion) return;

      const items = list.querySelectorAll('.capability-item');

      gsap.from(items, {
        scrollTrigger: {
          id: 'WHAT_I_DO_REVEAL',
          trigger: list,
          start: 'top 80%',
          end: 'bottom 70%',
          scrub: 0.5,
        },
        y: 30,
        opacity: 0,
        stagger: 0.1,
        ease: 'power2.out',
      });
    },
    { scope: containerRef }
  );

  return (
    <section
      id="what-i-do"
      ref={containerRef}
      className="relative w-full py-24 lg:py-36 bg-transparent text-zinc-100 border-t border-zinc-800/60 overflow-hidden"
      style={{ isolation: 'isolate' }}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div>
            <span className="text-[11px] font-mono uppercase tracking-widest text-zinc-500">
              Capabilities
            </span>
            <h2 className="font-display font-bold text-3xl sm:text-4xl lg:text-5xl text-zinc-100 tracking-tight mt-2">
              What I Do.
            </h2>
          </div>
          <p className="text-sm font-sans text-zinc-400 max-w-md">
            Bridging foundational systems engineering with modern, responsive digital products.
          </p>
        </div>

        {/* Numbered 01 - 05 Editorial Capabilities List */}
        <div ref={listRef} className="divide-y divide-zinc-800/60 border-y border-zinc-800/60">
          {CAPABILITIES.map((cap) => (
            <div
              key={cap.num}
              className="capability-item group py-8 lg:py-10 flex flex-col lg:flex-row lg:items-baseline justify-between gap-6 transition-colors duration-200 hover:bg-zinc-900/20"
            >
              {/* Number and Title */}
              <div className="lg:w-1/2 flex items-baseline gap-6 sm:gap-10">
                <span className="text-sm font-mono text-amber-400/90 font-medium tracking-wider">
                  {cap.num}
                </span>
                <h3 className="font-display font-bold text-2xl sm:text-3xl lg:text-4xl text-zinc-100 group-hover:text-amber-300 transition-colors tracking-tight">
                  {cap.title}
                </h3>
              </div>

              {/* Description & Tags */}
              <div className="lg:w-1/2 space-y-3">
                <p className="text-sm sm:text-base text-zinc-400 font-sans leading-relaxed max-w-xl">
                  {cap.desc}
                </p>
                <div className="flex flex-wrap gap-2 pt-1">
                  {cap.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-[11px] font-mono px-2 py-0.5 rounded bg-zinc-800/60 text-zinc-400 border border-zinc-700/50"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

