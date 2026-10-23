import React, { useState, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { SectionLabel } from './SectionLabel';
import { TechIcon } from './skills/TechIcon';

gsap.registerPlugin(ScrollTrigger);

type CategoryKey = 'languages' | 'frontend' | 'backend' | 'systems';

interface SkillCategory {
  key: CategoryKey;
  label: string;
  items: {
    name: string;
    iconKey: string;
    color: string;
  }[];
}

const CATEGORIES: SkillCategory[] = [
  {
    key: 'languages',
    label: 'Languages',
    items: [
      { name: 'Python', iconKey: 'SiPython', color: '#38bdf8' },
      { name: 'JavaScript', iconKey: 'SiJavascript', color: '#f7df1e' },
      { name: 'TypeScript', iconKey: 'SiTypescript', color: '#3178c6' },
      { name: 'Java', iconKey: 'FaJava', color: '#f89820' },
    ],
  },
  {
    key: 'frontend',
    label: 'Frontend',
    items: [
      { name: 'React', iconKey: 'SiReact', color: '#61dafb' },
      { name: 'Next.js', iconKey: 'SiNextdotjs', color: '#ffffff' },
      { name: 'Tailwind', iconKey: 'SiTailwindcss', color: '#38bdf8' },
      { name: 'HTML5 Canvas', iconKey: 'SiHtml5', color: '#e34f26' },
    ],
  },
  {
    key: 'backend',
    label: 'Backend',
    items: [
      { name: 'Node.js', iconKey: 'SiNodedotjs', color: '#5fa04e' },
      { name: 'FastAPI', iconKey: 'SiFastapi', color: '#05998b' },
      { name: 'Express', iconKey: 'SiExpress', color: '#ffffff' },
      { name: 'PostgreSQL', iconKey: 'SiPostgresql', color: '#4169e1' },
    ],
  },
  {
    key: 'systems',
    label: 'Systems',
    items: [
      { name: 'Linux', iconKey: 'SiLinux', color: '#fcc624' },
      { name: 'GTK', iconKey: 'SiGtk', color: '#e11d48' },
      { name: 'CUPS / IPP', iconKey: 'CupsIcon', color: '#10b981' },
      { name: 'D-Bus IPC', iconKey: 'DbusIcon', color: '#f59e0b' },
    ],
  },
];

export const Skills: React.FC = () => {
  const containerRef = useRef<HTMLElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const cardsGridRef = useRef<HTMLDivElement>(null);
  const portraitRef = useRef<HTMLDivElement>(null);

  const [activeCategory, setActiveCategory] = useState<CategoryKey>('languages');

  const currentCategory = CATEGORIES.find((c) => c.key === activeCategory) || CATEGORIES[0];

  // Animate grid cards when tab changes
  const handleCategoryChange = (key: CategoryKey) => {
    if (key === activeCategory) return;
    setActiveCategory(key);

    if (cardsGridRef.current) {
      gsap.fromTo(
        cardsGridRef.current.children,
        { opacity: 0, scale: 0.92, y: 10 },
        {
          opacity: 1,
          scale: 1,
          y: 0,
          duration: 0.35,
          stagger: 0.05,
          ease: 'power2.out',
        }
      );
    }
  };

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
        cardsGridRef.current?.children || [],
        {
          opacity: 0,
          y: 20,
          duration: 0.5,
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
    <section
      id="skills"
      ref={containerRef}
      className="relative w-full py-24 sm:py-32 bg-[#080909] text-[#F2F0E8] overflow-hidden border-t border-white/[0.06]"
      style={{ isolation: 'isolate' }}
    >
      {/* Subtle Background Portrait Looking Up with Yellow Glow */}
      <div
        ref={portraitRef}
        className="absolute bottom-0 right-0 sm:right-10 w-72 sm:w-[440px] md:w-[520px] h-[480px] pointer-events-none opacity-20 sm:opacity-30 select-none z-0 overflow-hidden"
      >
        <img
          src="/images/hero-sequence/frame-170.webp"
          alt=""
          className="w-full h-full object-contain grayscale contrast-125 brightness-90"
          loading="lazy"
        />
        {/* Warm yellow ambient glow */}
        <div className="absolute bottom-12 left-1/2 -translate-x-1/2 w-[320px] h-[320px] rounded-full bg-[#F5D52F]/14 blur-[120px] pointer-events-none" />
      </div>

      <div className="max-w-7xl mx-auto px-6 sm:px-10 relative z-10">
        
        {/* Section Label: SKILLS */}
        <div className="mb-8">
          <SectionLabel label="SKILLS" />
        </div>

        {/* Headline: TOOLS (White) I WORK WITH. (Yellow) */}
        <h2
          ref={headlineRef}
          className="font-display text-6xl sm:text-8xl md:text-9xl leading-[0.88] tracking-wide uppercase mb-10"
        >
          TOOLS <br />
          <span className="text-[#F5D52F]">I WORK WITH.</span>
        </h2>

        {/* Category Pills (Active = Solid Yellow Pill) */}
        <div className="flex flex-wrap items-center gap-2.5 sm:gap-3 mb-10 max-w-xl">
          {CATEGORIES.map((cat) => {
            const isActive = activeCategory === cat.key;
            return (
              <button
                key={cat.key}
                onClick={() => handleCategoryChange(cat.key)}
                className={`px-4 sm:px-5 py-1.5 sm:py-2 rounded-full font-mono text-xs sm:text-sm font-semibold tracking-wider transition-all duration-200 cursor-pointer ${
                  isActive
                    ? 'bg-[#F5D52F] text-black shadow-[0_0_15px_rgba(245,213,47,0.35)]'
                    : 'bg-white/[0.03] text-[#8A8A8A] border border-white/[0.08] hover:text-[#F2F0E8] hover:border-white/20'
                }`}
              >
                {cat.label}
              </button>
            );
          })}
        </div>

        {/* 4 Cards Grid (Matching Screen 06 in Reference) */}
        <div
          ref={cardsGridRef}
          className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6 max-w-2xl mb-12"
        >
          {currentCategory.items.map((item, idx) => (
            <div
              key={idx}
              className="p-6 rounded-2xl bg-white/[0.025] border border-white/[0.08] flex flex-col items-center justify-center gap-4 hover:border-[#F5D52F]/40 transition-all duration-300 group"
            >
              <div className="w-14 h-14 rounded-full bg-black/60 border border-white/10 flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-md">
                <TechIcon
                  iconKey={item.iconKey}
                  style={{ color: item.color }}
                  className="w-7 h-7"
                />
              </div>
              <span className="font-display text-xl sm:text-2xl text-[#F2F0E8] tracking-wide group-hover:text-[#F5D52F] transition-colors">
                {item.name}
              </span>
            </div>
          ))}
        </div>

        {/* Editorial Quote Note Card */}
        <div className="max-w-md p-4 sm:p-5 rounded-xl bg-white/[0.02] border border-white/[0.07] backdrop-blur-sm">
          <p className="font-sans text-xs sm:text-sm text-[#8A8A8A] leading-relaxed italic">
            "I use the right tool for the right problem, and I'm always learning new ones."
          </p>
        </div>

      </div>
    </section>
  );
};
