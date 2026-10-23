import React, { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger);

interface TimelineItem {
  period: string;
  role: string;
  organization: string;
  location: string;
  summary: string;
  highlight?: string;
}

const EXPERIENCE_ITEMS: TimelineItem[] = [
  {
    period: '2025 – Present',
    role: 'Maintainer & Systems Engineer',
    organization: 'The Linux Foundation / OpenPrinting',
    location: 'Remote',
    summary: 'Maintaining system-config-printer and go-mfp. Solved multi-year GUI freeze issues by decoupling PPD loading into asynchronous worker threads with GLib idle callbacks. Collaborating directly with upstream maintainer Alexander Pevzner.',
    highlight: 'Core Linux Subsystems',
  },
  {
    period: 'Feb 2026 – May 2026',
    role: 'Trainee Technical Consultant',
    organization: 'Acxiom Consulting',
    location: 'India',
    summary: 'Developing enterprise REST APIs, backend integrations, and data validation pipelines for enterprise client architectures.',
    highlight: 'Enterprise APIs',
  },
  {
    period: '2024 – 2025',
    role: 'Systems Tooling & Language Creator',
    organization: 'Ezy Language & Open Source',
    location: 'Remote',
    summary: 'Designed and implemented the Ezy scripting language interpreter from scratch in Python, featuring recursive descent parsing and deterministic process execution. Contributed upstream patches to WP Rig and Medic CHT.',
    highlight: 'Compiler & Tooling',
  },
  {
    period: '2022 – 2026',
    role: 'B.Tech in Computer Science & Engineering',
    organization: 'SRMCEM',
    location: 'Lucknow, India',
    summary: 'Completed B.Tech CSE with 8.62 CGPA. Deep coursework in operating systems, compiler theory, distributed architectures, and algorithms.',
    highlight: 'CGPA: 8.62 / 10',
  },
];

export const AboutJourney: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const rowsRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const container = containerRef.current;
      const rows = rowsRef.current;
      if (!container || !rows) return;

      const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      if (prefersReducedMotion) return;

      const items = rows.querySelectorAll('.exp-row');

      gsap.from(items, {
        scrollTrigger: {
          id: 'EXPERIENCE_REVEAL',
          trigger: rows,
          start: 'top 80%',
          end: 'bottom 70%',
          scrub: 0.5,
        },
        y: 25,
        opacity: 0,
        stagger: 0.1,
        ease: 'power2.out',
      });
    },
    { scope: containerRef }
  );

  return (
    <section
      id="journey"
      ref={containerRef}
      className="relative w-full py-24 lg:py-36 bg-transparent text-zinc-100 border-t border-zinc-800/60 overflow-hidden"
      style={{ isolation: 'isolate' }}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div>
            <span className="text-[11px] font-mono uppercase tracking-widest text-zinc-500">
              Trajectory
            </span>
            <h2 className="font-display font-bold text-3xl sm:text-4xl lg:text-5xl text-zinc-100 tracking-tight mt-2">
              Experience & Journey.
            </h2>
          </div>
          <p className="text-sm font-sans text-zinc-400 max-w-md">
            Track record across upstream Linux engineering, enterprise consulting, and computer science foundations.
          </p>
        </div>

        {/* Clean Editorial Timeline Table */}
        <div ref={rowsRef} className="divide-y divide-zinc-800/60 border-y border-zinc-800/60">
          {EXPERIENCE_ITEMS.map((item, idx) => (
            <div
              key={idx}
              className="exp-row group py-8 lg:py-10 grid grid-cols-1 lg:grid-cols-12 gap-6 items-baseline transition-colors hover:bg-zinc-900/20"
            >
              {/* Date / Period Column */}
              <div className="lg:col-span-3 space-y-1">
                <span className="text-xs font-mono text-amber-400/90 font-medium tracking-wider">
                  {item.period}
                </span>
                <div className="text-[11px] font-mono text-zinc-500 uppercase">
                  {item.location}
                </div>
              </div>

              {/* Role & Org Column */}
              <div className="lg:col-span-4 space-y-1">
                <h3 className="font-display font-bold text-lg sm:text-xl text-zinc-100 tracking-tight group-hover:text-amber-300 transition-colors">
                  {item.role}
                </h3>
                <div className="text-sm font-sans text-zinc-400">
                  {item.organization}
                </div>
                {item.highlight && (
                  <span className="inline-block mt-1 text-[10px] font-mono uppercase px-2 py-0.5 rounded bg-zinc-800/60 text-zinc-400 border border-zinc-700/50">
                    {item.highlight}
                  </span>
                )}
              </div>

              {/* Summary Column */}
              <div className="lg:col-span-5">
                <p className="text-sm text-zinc-400 font-sans leading-relaxed">
                  {item.summary}
                </p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
