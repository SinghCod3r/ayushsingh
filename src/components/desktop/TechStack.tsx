import React, { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger);

interface TechGroup {
  category: string;
  items: { name: string; note: string }[];
}

const STACK_GROUPS: TechGroup[] = [
  {
    category: 'Languages',
    items: [
      { name: 'Python', note: 'Open source, systems tooling & automation' },
      { name: 'TypeScript', note: 'Type-safe full-stack web applications' },
      { name: 'JavaScript', note: 'Modern ES6+, async runtimes & DOM' },
      { name: 'C / C++', note: 'POSIX APIs, raster filters & drivers' },
      { name: 'Java', note: 'Core OOP, algorithms & data structures' },
      { name: 'SQL', note: 'Relational schema design, queries & indexes' },
    ],
  },
  {
    category: 'Frontend',
    items: [
      { name: 'React', note: 'Component architecture & custom hooks' },
      { name: 'Next.js', note: 'App Router, SSR & server components' },
      { name: 'GSAP', note: 'ScrollTrigger, choreography & timelines' },
      { name: 'HTML5 & Canvas', note: 'Semantic web & frame-based 2D motion' },
      { name: 'Tailwind CSS', note: 'Design token systems & responsive layouts' },
    ],
  },
  {
    category: 'Backend & Data',
    items: [
      { name: 'Node.js', note: 'Asynchronous runtime & CLI utilities' },
      { name: 'FastAPI', note: 'High-throughput async Python APIs' },
      { name: 'Express / Flask', note: 'RESTful microservices & middleware' },
      { name: 'PostgreSQL / MySQL', note: 'Relational data stores & indexing' },
      { name: 'SQLite', note: 'High-speed indexed local database cache' },
      { name: 'MongoDB', note: 'Document stores & flexible schemas' },
    ],
  },
  {
    category: 'Systems & DevOps',
    items: [
      { name: 'Linux', note: 'Kernel, systemd, desktop & packaging' },
      { name: 'CUPS / IPP', note: 'OpenPrinting print spooler architecture' },
      { name: 'GTK / GLib', note: 'PyGObject, event loops & worker threads' },
      { name: 'D-Bus IPC', note: 'Asynchronous desktop signals & methods' },
      { name: 'Docker', note: 'Linux containers & reproducible builds' },
      { name: 'Git & GitHub CI', note: 'Distributed workflows, rebases & Actions' },
    ],
  },
];

export const TechStack: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const container = containerRef.current;
      const grid = gridRef.current;
      if (!container || !grid) return;

      const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      if (prefersReducedMotion) return;

      const cols = grid.children;

      gsap.from(cols, {
        scrollTrigger: {
          id: 'STACK_REVEAL',
          trigger: grid,
          start: 'top 80%',
          end: 'top 35%',
          scrub: 0.5,
        },
        y: 35,
        opacity: 0,
        stagger: 0.1,
        ease: 'power2.out',
      });
    },
    { scope: containerRef }
  );

  return (
    <section
      id="skills"
      ref={containerRef}
      className="relative w-full py-24 lg:py-36 bg-transparent text-zinc-100 border-t border-zinc-800/60 overflow-hidden"
      style={{ isolation: 'isolate' }}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div>
            <span className="text-[11px] font-mono uppercase tracking-widest text-zinc-500">
              Stack & Technologies
            </span>
            <h2 className="font-display font-bold text-3xl sm:text-4xl lg:text-5xl text-zinc-100 tracking-tight mt-2">
              Tools I Work With.
            </h2>
          </div>
          <p className="text-sm font-sans text-zinc-400 max-w-md">
            Grounded in systems programming and refined through production full-stack engineering.
          </p>
        </div>

        {/* Typographic 4-Column Matrix */}
        <div
          ref={gridRef}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8 pt-4"
        >
          {STACK_GROUPS.map((group) => (
            <div key={group.category} className="space-y-6">
              <div className="border-b border-zinc-800/80 pb-3">
                <span className="text-xs font-mono uppercase tracking-wider text-amber-400 font-semibold">
                  {group.category}
                </span>
              </div>

              <ul className="space-y-4">
                {group.items.map((item) => (
                  <li key={item.name} className="group cursor-default">
                    <div className="font-sans font-medium text-sm sm:text-base text-zinc-200 group-hover:text-white transition-colors">
                      {item.name}
                    </div>
                    <div className="font-sans text-xs text-zinc-500 leading-snug group-hover:text-zinc-400 transition-colors mt-0.5">
                      {item.note}
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

