import React, { useState } from 'react';
import { Cpu } from 'lucide-react';
import { portfolioData, TechCategory } from '../../../data';
import { SectionLabel } from './SectionLabel';
import { SkillsKineticTitle } from './skills/SkillsKineticTitle';
import { TechSphere3D } from './skills/TechSphere3D';
import { MobileTechList } from './skills/MobileTechList';

const CATEGORIES: { id: TechCategory; label: string }[] = [
  { id: 'all', label: 'ALL' },
  { id: 'languages', label: 'LANGUAGES' },
  { id: 'frontend', label: 'FRONTEND' },
  { id: 'backend', label: 'BACKEND' },
  { id: 'systems', label: 'SYSTEMS' },
  { id: 'tools', label: 'TOOLS' },
  { id: 'cloud', label: 'CLOUD' },
];

export const Skills: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<TechCategory>('all');
  const technologies = portfolioData.skills.technologies;

  return (
    <section
      id="skills"
      className="relative w-full py-20 lg:py-32 bg-[#08080a] text-white border-t border-zinc-800/80 overflow-hidden"
      style={{ isolation: 'isolate' }}
    >
      {/* Ambient Atmospheric Accents (Subtle and minimal) */}
      <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-amber-500/5 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[450px] h-[450px] bg-cyan-500/5 rounded-full blur-[140px] pointer-events-none" />

      {/* Top Divider Hand-off */}
      <div className="max-w-7xl mx-auto px-6 lg:px-8 mb-12 sm:mb-16">
        <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-zinc-800 to-transparent" />
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        
        {/* ================================================================= */}
        {/* 1. EDITORIAL HEADER & KINETIC TITLE                               */}
        {/* ================================================================= */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-12 sm:mb-16">
          <div className="space-y-4 max-w-3xl">
            <SectionLabel label="04 // CAPABILITIES" icon={<Cpu size={12} />} />
            
            {/* Kinetic Typography: "TOOLS I PLAY WITH." */}
            <SkillsKineticTitle />
          </div>

          {/* Editorial Note & Context */}
          <div className="max-w-sm space-y-2 lg:text-right">
            <span className="inline-block font-mono text-xs uppercase tracking-wider text-amber-400 font-semibold">
              {portfolioData.skills.editorialNote}
            </span>
            <p className="text-zinc-400 text-xs sm:text-sm font-sans leading-relaxed">
              Real technology identities from low-level POSIX drivers and upstream Linux subsystems to high-throughput web applications.
            </p>
          </div>
        </div>

        {/* ================================================================= */}
        {/* 2. DESKTOP VIEW: 3D ROTATING TECHNOLOGY SPHERE (md+)              */}
        {/* ================================================================= */}
        <div className="hidden md:block">
          {/* Minimal Editorial Category Navigation (No bulky rounded pills) */}
          <div className="flex items-center gap-6 lg:gap-8 border-b border-zinc-800/70 pb-3 mb-6">
            {CATEGORIES.map((cat) => {
              const isActive = activeCategory === cat.id;
              const count =
                cat.id === 'all'
                  ? technologies.length
                  : technologies.filter((t) => t.category === cat.id).length;

              return (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className="group relative pb-2 text-xs font-mono uppercase tracking-widest transition-colors cursor-pointer"
                >
                  <span
                    className={`transition-colors ${
                      isActive
                        ? 'text-amber-400 font-bold'
                        : 'text-zinc-400 hover:text-zinc-200'
                    }`}
                  >
                    {cat.label}
                    <span className="ml-1.5 text-[10px] opacity-70">
                      ({count})
                    </span>
                  </span>

                  {/* Clean yellow indicator line */}
                  {isActive && (
                    <span className="absolute bottom-0 left-0 w-full h-[2px] bg-amber-400 rounded-full" />
                  )}
                </button>
              );
            })}
          </div>

          {/* Interactive 3D Spherical Tech Ball (Attached to luminous center point) */}
          <TechSphere3D
            technologies={technologies}
            activeCategory={activeCategory}
          />
        </div>

        {/* ================================================================= */}
        {/* 3. MOBILE VIEW: TOUCH 3D SPHERE + COMPACT CHIPS (< md)            */}
        {/* ================================================================= */}
        <div className="md:hidden space-y-6">
          <TechSphere3D
            technologies={technologies}
            activeCategory={activeCategory}
          />
          <MobileTechList technologies={technologies} />
        </div>

      </div>
    </section>
  );
};
