import React, { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { portfolioData } from '../../../data';

gsap.registerPlugin(ScrollTrigger);

const CORE_FACTS = [
  {
    num: '01',
    title: 'Software Engineering',
    desc: 'End-to-end web apps, custom interpreters, and high-performance developer tooling built with TypeScript, Python, and modern frameworks.',
  },
  {
    num: '02',
    title: 'Open Source Leadership',
    desc: 'Active maintainer for The Linux Foundation’s OpenPrinting project, with 25+ merged pull requests across critical system repositories.',
  },
  {
    num: '03',
    title: 'Systems & Architecture',
    desc: 'Hands-on experience with Linux desktop subsystems, D-Bus IPC, CUPS raster filters, and asynchronous worker-thread execution.',
  },
  {
    num: '04',
    title: 'Speaking & Research',
    desc: 'Invited keynote speaker at IIIT Allahabad (OOSC 4.0) sharing empirical analysis on upstream open source maintenance and AI code quality.',
  },
];

export const About: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const container = containerRef.current;
      const headline = headlineRef.current;
      const cards = cardsRef.current;
      if (!container || !headline || !cards) return;

      const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      if (prefersReducedMotion) return;

      const tl = gsap.timeline({
        scrollTrigger: {
          id: 'ABOUT_REVEAL',
          trigger: container,
          start: 'top 75%',
          end: 'top 30%',
          scrub: 0.5,
        },
      });

      tl.from(headline, {
        y: 30,
        opacity: 0,
        ease: 'power2.out',
      });

      tl.from(
        cards.children,
        {
          y: 24,
          opacity: 0,
          stagger: 0.08,
          ease: 'power2.out',
        },
        '-=0.2'
      );
    },
    { scope: containerRef }
  );

  return (
    <section
      id="about"
      ref={containerRef}
      className="relative w-full py-24 lg:py-36 bg-transparent text-zinc-100 border-t border-zinc-800/60 overflow-hidden"
      style={{ isolation: 'isolate' }}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10">
        
        {/* Section Identifier */}
        <div className="mb-8">
          <span className="text-[11px] font-mono uppercase tracking-widest text-zinc-500">
            About • Engineering Philosophy
          </span>
        </div>

        {/* Big Editorial Statement */}
        <div className="max-w-4xl mb-16 lg:mb-24">
          <h2
            ref={headlineRef}
            className="font-display font-medium text-3xl sm:text-4xl lg:text-5xl tracking-tight leading-[1.2] text-zinc-100"
          >
            I build software, contribute to open source, and enjoy turning complex systems problems into useful, high-impact products.
          </h2>
          <p className="mt-6 text-zinc-400 font-sans text-base sm:text-lg leading-relaxed max-w-2xl">
            {portfolioData.personal.bio}
          </p>
        </div>

        {/* 4 Clear Core Facts Grid */}
        <div
          ref={cardsRef}
          className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 pt-8 border-t border-zinc-800/60"
        >
          {CORE_FACTS.map((fact) => (
            <div key={fact.num} className="space-y-2.5">
              <span className="text-xs font-mono text-amber-400/90 font-medium tracking-wider">
                {fact.num}
              </span>
              <h3 className="font-display font-bold text-lg sm:text-xl text-zinc-100 tracking-tight">
                {fact.title}
              </h3>
              <p className="text-sm text-zinc-400 font-sans leading-relaxed max-w-md">
                {fact.desc}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
