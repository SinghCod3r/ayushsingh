import React, { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { Technology, TechCategory } from '../../../data';
import { TechIcon } from './TechIcon';

interface DesktopTechFieldProps {
  technologies: Technology[];
  activeCategory: TechCategory;
}

// Deterministic spatial coordinates and idle animation profiles for each technology
// Creates an organic, rhythmic editorial constellation rather than a rigid centered grid
interface SpatialNode {
  id: string;
  // Visual position offset in percentage or flex order
  colSpan: string;
  justify: 'justify-start' | 'justify-center' | 'justify-end';
  offsetY: number; // slight vertical rhythm offset
  idleType: 'float-y' | 'rotate' | 'pulse' | 'drift-x';
  idleDuration: number;
  idleDistance: number;
}

const SPATIAL_MAP: Record<string, SpatialNode> = {
  // Row 1: Python & TypeScript (Flagship languages)
  python: { id: 'python', colSpan: 'col-span-5', justify: 'justify-end', offsetY: -6, idleType: 'float-y', idleDuration: 4.2, idleDistance: 3.5 },
  typescript: { id: 'typescript', colSpan: 'col-span-5 col-start-8', justify: 'justify-start', offsetY: 4, idleType: 'pulse', idleDuration: 3.8, idleDistance: 1.04 },

  // Row 2: React, JavaScript, Next.js
  react: { id: 'react', colSpan: 'col-span-4', justify: 'justify-start', offsetY: 6, idleType: 'rotate', idleDuration: 11.0, idleDistance: 8 },
  javascript: { id: 'javascript', colSpan: 'col-span-4 col-start-5', justify: 'justify-center', offsetY: -4, idleType: 'float-y', idleDuration: 4.6, idleDistance: 3.0 },
  nextjs: { id: 'nextjs', colSpan: 'col-span-4 col-start-9', justify: 'justify-end', offsetY: 8, idleType: 'float-y', idleDuration: 4.0, idleDistance: 2.5 },

  // Row 3: Linux, Node.js, MongoDB
  linux: { id: 'linux', colSpan: 'col-span-4 col-start-2', justify: 'justify-center', offsetY: -8, idleType: 'rotate', idleDuration: 5.2, idleDistance: 3.5 },
  nodejs: { id: 'nodejs', colSpan: 'col-span-4 col-start-6', justify: 'justify-center', offsetY: 2, idleType: 'float-y', idleDuration: 3.9, idleDistance: 3.0 },
  mongodb: { id: 'mongodb', colSpan: 'col-span-3 col-start-10', justify: 'justify-start', offsetY: -6, idleType: 'drift-x', idleDuration: 4.8, idleDistance: 2.5 },

  // Row 4: Java, SQL, Docker, AWS
  java: { id: 'java', colSpan: 'col-span-3', justify: 'justify-start', offsetY: 4, idleType: 'float-y', idleDuration: 4.4, idleDistance: 2.5 },
  sql: { id: 'sql', colSpan: 'col-span-3 col-start-4', justify: 'justify-center', offsetY: -4, idleType: 'drift-x', idleDuration: 5.0, idleDistance: 3.0 },
  docker: { id: 'docker', colSpan: 'col-span-3 col-start-7', justify: 'justify-center', offsetY: 6, idleType: 'drift-x', idleDuration: 5.4, idleDistance: 3.2 },
  aws: { id: 'aws', colSpan: 'col-span-3 col-start-10', justify: 'justify-end', offsetY: -2, idleType: 'float-y', idleDuration: 4.3, idleDistance: 2.5 },

  // Row 5: GitHub, Git, C / C++, GTK
  github: { id: 'github', colSpan: 'col-span-3 col-start-2', justify: 'justify-center', offsetY: -4, idleType: 'pulse', idleDuration: 4.1, idleDistance: 1.03 },
  git: { id: 'git', colSpan: 'col-span-3 col-start-5', justify: 'justify-center', offsetY: 8, idleType: 'drift-x', idleDuration: 4.7, idleDistance: 2.8 },
  'c-cpp': { id: 'c-cpp', colSpan: 'col-span-3 col-start-8', justify: 'justify-center', offsetY: -6, idleType: 'rotate', idleDuration: 4.9, idleDistance: 3.0 },
  gtk: { id: 'gtk', colSpan: 'col-span-2 col-start-11', justify: 'justify-start', offsetY: 6, idleType: 'float-y', idleDuration: 4.5, idleDistance: 2.5 },

  // Row 6: CUPS / IPP, D-Bus IPC, FastAPI, Tailwind CSS, SQLite
  cups: { id: 'cups', colSpan: 'col-span-3 col-start-1', justify: 'justify-center', offsetY: 2, idleType: 'float-y', idleDuration: 4.2, idleDistance: 2.5 },
  dbus: { id: 'dbus', colSpan: 'col-span-3 col-start-4', justify: 'justify-center', offsetY: -6, idleType: 'pulse', idleDuration: 3.9, idleDistance: 1.03 },
  fastapi: { id: 'fastapi', colSpan: 'col-span-3 col-start-7', justify: 'justify-center', offsetY: 4, idleType: 'float-y', idleDuration: 4.4, idleDistance: 2.5 },
  tailwind: { id: 'tailwind', colSpan: 'col-span-3 col-start-10', justify: 'justify-center', offsetY: -4, idleType: 'drift-x', idleDuration: 5.1, idleDistance: 2.5 },
};

export const DesktopTechField: React.FC<DesktopTechFieldProps> = ({
  technologies,
  activeCategory,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const itemsRef = useRef<(HTMLDivElement | null)[]>([]);

  // Subtle continuous idle animation for all tech items
  useGSAP(
    () => {
      const container = containerRef.current;
      if (!container) return;

      const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      if (prefersReducedMotion) return;

      const elements = container.querySelectorAll<HTMLElement>('.tech-field-item');

      elements.forEach((el) => {
        const id = el.getAttribute('data-id') || '';
        const node = SPATIAL_MAP[id];
        if (!node) return;

        const iconEl = el.querySelector<HTMLElement>('.tech-icon-wrap');
        if (!iconEl) return;

        if (node.idleType === 'float-y') {
          gsap.to(iconEl, {
            y: node.idleDistance,
            duration: node.idleDuration,
            ease: 'sine.inOut',
            repeat: -1,
            yoyo: true,
          });
        } else if (node.idleType === 'drift-x') {
          gsap.to(iconEl, {
            x: node.idleDistance,
            duration: node.idleDuration,
            ease: 'sine.inOut',
            repeat: -1,
            yoyo: true,
          });
        } else if (node.idleType === 'rotate') {
          gsap.to(iconEl, {
            rotation: node.idleDistance,
            duration: node.idleDuration,
            ease: 'sine.inOut',
            repeat: -1,
            yoyo: true,
          });
        } else if (node.idleType === 'pulse') {
          gsap.to(iconEl, {
            scale: node.idleDistance,
            duration: node.idleDuration,
            ease: 'sine.inOut',
            repeat: -1,
            yoyo: true,
          });
        }
      });
    },
    { scope: containerRef }
  );

  // Entrance reveal: independent entry from varied vectors
  useGSAP(
    () => {
      const container = containerRef.current;
      if (!container) return;

      const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      if (prefersReducedMotion) return;

      const elements = container.querySelectorAll<HTMLElement>('.tech-field-item');
      if (elements.length === 0) return;

      gsap.fromTo(
        elements,
        {
          opacity: 0,
          y: (i) => ((i % 3) - 1) * 22,
          x: (i) => ((i % 4) - 1.5) * 16,
          scale: 0.88,
        },
        {
          opacity: 1,
          y: 0,
          x: 0,
          scale: 1,
          duration: 0.7,
          stagger: 0.03,
          ease: 'back.out(1.8)',
          clearProps: 'opacity',
          scrollTrigger: {
            trigger: container,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    },
    { scope: containerRef }
  );

  // Micro-interaction handlers on hover
  const handleMouseEnter = (idx: number) => {
    const el = itemsRef.current[idx];
    if (!el) return;

    const icon = el.querySelector<HTMLElement>('.tech-icon-wrap');
    const label = el.querySelector<HTMLElement>('.tech-label');
    const line = el.querySelector<HTMLElement>('.tech-hover-line');

    if (icon) {
      gsap.to(icon, {
        scale: 1.15,
        y: -4,
        duration: 0.28,
        ease: 'power2.out',
        overwrite: 'auto',
      });
    }
    if (label) {
      gsap.to(label, {
        color: '#ffffff',
        y: -1.5,
        duration: 0.24,
        ease: 'power2.out',
        overwrite: 'auto',
      });
    }
    if (line) {
      gsap.to(line, {
        scaleX: 1,
        opacity: 1,
        duration: 0.25,
        ease: 'power2.out',
        overwrite: 'auto',
      });
    }

    // Subtle repulsion on immediate adjacent neighbors
    const prev = itemsRef.current[idx - 1];
    const next = itemsRef.current[idx + 1];
    if (prev) gsap.to(prev, { x: -3, duration: 0.3, ease: 'power2.out', overwrite: 'auto' });
    if (next) gsap.to(next, { x: 3, duration: 0.3, ease: 'power2.out', overwrite: 'auto' });
  };

  const handleMouseLeave = (idx: number) => {
    const el = itemsRef.current[idx];
    if (!el) return;

    const icon = el.querySelector<HTMLElement>('.tech-icon-wrap');
    const label = el.querySelector<HTMLElement>('.tech-label');
    const line = el.querySelector<HTMLElement>('.tech-hover-line');

    if (icon) {
      gsap.to(icon, {
        scale: 1,
        y: 0,
        duration: 0.35,
        ease: 'power2.out',
        overwrite: 'auto',
      });
    }
    if (label) {
      gsap.to(label, {
        color: '',
        y: 0,
        duration: 0.3,
        ease: 'power2.out',
        overwrite: 'auto',
      });
    }
    if (line) {
      gsap.to(line, {
        scaleX: 0,
        opacity: 0,
        duration: 0.2,
        ease: 'power2.in',
        overwrite: 'auto',
      });
    }

    const prev = itemsRef.current[idx - 1];
    const next = itemsRef.current[idx + 1];
    if (prev) gsap.to(prev, { x: 0, duration: 0.35, ease: 'power2.out', overwrite: 'auto' });
    if (next) gsap.to(next, { x: 0, duration: 0.35, ease: 'power2.out', overwrite: 'auto' });
  };

  return (
    <div
      ref={containerRef}
      className="relative w-full py-6 select-none"
      aria-label="Interactive technology field"
    >
      {/* 12-Column Spatial Constellation Grid */}
      <div className="grid grid-cols-12 gap-y-7 sm:gap-y-9 gap-x-4 items-center">
        {technologies.map((tech, idx) => {
          const spatial = SPATIAL_MAP[tech.id] || {
            id: tech.id,
            colSpan: 'col-span-3',
            justify: 'justify-center',
            offsetY: 0,
            idleType: 'float-y',
            idleDuration: 4.0,
            idleDistance: 2.5,
          };

          const isMatchingCategory =
            activeCategory === 'all' || tech.category === activeCategory;

          return (
            <div
              key={tech.id}
              ref={(el) => {
                itemsRef.current[idx] = el;
              }}
              data-id={tech.id}
              onMouseEnter={() => handleMouseEnter(idx)}
              onMouseLeave={() => handleMouseLeave(idx)}
              className={`tech-field-item flex ${spatial.colSpan} ${spatial.justify} transition-all duration-300 cursor-pointer ${
                isMatchingCategory
                  ? 'opacity-100 pointer-events-auto'
                  : 'opacity-20 grayscale pointer-events-none'
              }`}
              style={{
                transform: `translateY(${spatial.offsetY}px)`,
              }}
            >
              {/* Interactive Item Unit */}
              <div className="group relative flex flex-col items-center gap-2 p-2">
                {/* Official Recognizable Technology Logo */}
                <div
                  className="tech-icon-wrap relative flex items-center justify-center will-change-transform transition-colors"
                  style={{ color: tech.color || '#ffffff' }}
                >
                  <TechIcon
                    iconKey={tech.iconKey}
                    className={
                      tech.featured
                        ? 'w-10 h-10 lg:w-12 lg:h-12'
                        : 'w-7 h-7 lg:w-8 lg:h-8'
                    }
                  />
                </div>

                {/* Typography Label: Clean, crisp, editorial */}
                <div className="relative flex flex-col items-center">
                  <span
                    className={`tech-label font-display tracking-tight text-center whitespace-nowrap transition-colors duration-200 ${
                      tech.featured
                        ? 'text-base lg:text-lg font-bold text-zinc-100'
                        : 'text-xs lg:text-sm font-semibold text-zinc-300'
                    }`}
                  >
                    {tech.name}
                  </span>

                  {/* Micro-accent underline appearing on hover */}
                  <span
                    className="tech-hover-line block h-[1.5px] w-full rounded-full origin-center will-change-transform"
                    style={{
                      backgroundColor: tech.color || '#f59e0b',
                      transform: 'scaleX(0)',
                      opacity: 0,
                    }}
                  />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
