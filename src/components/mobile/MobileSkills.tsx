import React, { useState } from 'react';

type SkillCategory = 'languages' | 'frontend' | 'backend' | 'systems';

interface SkillItem {
  name: string;
  icon: string;
  color: string;
}

const SKILLS_DATA: Record<SkillCategory, SkillItem[]> = {
  languages: [
    { name: 'Python', icon: '🐍', color: '#3776AB' },
    { name: 'JavaScript', icon: '⚡', color: '#F7DF1E' },
    { name: 'TypeScript', icon: '📘', color: '#3178C6' },
    { name: 'Java', icon: '☕', color: '#ED8B00' },
  ],
  frontend: [
    { name: 'React', icon: '⚛️', color: '#61DAFB' },
    { name: 'Next.js', icon: '▲', color: '#FFFFFF' },
    { name: 'Tailwind', icon: '🎨', color: '#06B6D4' },
    { name: 'HTML5/CSS', icon: '🌐', color: '#E34F26' },
  ],
  backend: [
    { name: 'Node.js', icon: '🟢', color: '#339933' },
    { name: 'Express', icon: '🚂', color: '#EEEEEE' },
    { name: 'PostgreSQL', icon: '🐘', color: '#4169E1' },
    { name: 'Redis', icon: '🔴', color: '#DC382D' },
  ],
  systems: [
    { name: 'Linux', icon: '🐧', color: '#FCC624' },
    { name: 'C / C++', icon: '⚙️', color: '#A8B9CC' },
    { name: 'Git', icon: '🌿', color: '#F05032' },
    { name: 'Docker', icon: '🐳', color: '#2496ED' },
  ],
};

const CATEGORIES: { id: SkillCategory; label: string }[] = [
  { id: 'languages', label: 'Languages' },
  { id: 'frontend', label: 'Frontend' },
  { id: 'backend', label: 'Backend' },
  { id: 'systems', label: 'Systems' },
];

export const MobileSkills: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<SkillCategory>('languages');

  const currentSkills = SKILLS_DATA[activeCategory];

  return (
    <section
      id="mobile-skills"
      className="relative w-full py-14 px-6 bg-[#080909] text-[#F2F0E8] overflow-hidden border-t border-white/[0.06]"
    >
      {/* Subtle portrait frame 170 at bottom */}
      <div className="absolute bottom-0 right-[-10%] w-56 h-64 opacity-20 pointer-events-none filter grayscale contrast-125">
        <img
          src="/images/hero-sequence/frame-170.webp"
          alt="Ayush Singh"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#080909] via-[#080909]/70 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-l from-transparent via-[#080909]/60 to-[#080909]" />
      </div>

      <div className="relative z-10 flex flex-col">
        {/* Section Label */}
        <div className="flex items-center space-x-1.5 text-[10px] font-mono tracking-widest uppercase text-[#F5D52F] mb-3">
          <span>SKILLS</span>
          <span>↗</span>
        </div>

        {/* Editorial Headline */}
        <h2 className="font-editorial text-[14vw] leading-[0.9] tracking-tight mb-8">
          <span className="text-[#F2F0E8]">TOOLS<br /></span>
          <span className="text-[#F2F0E8]">I WORK WITH.</span>
        </h2>

        {/* 4 Category Pills */}
        <div className="flex items-center space-x-2 overflow-x-auto pb-2 mb-8 no-scrollbar">
          {CATEGORIES.map((cat) => {
            const isActive = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-4 py-2 rounded-full font-mono text-xs transition-all duration-200 whitespace-nowrap ${
                  isActive
                    ? 'bg-[#F5D52F] text-[#080909] font-bold shadow-[0_0_15px_rgba(245,213,47,0.3)]'
                    : 'bg-white/[0.04] text-[#8A8A8A] border border-white/[0.08] hover:text-[#F2F0E8]'
                }`}
              >
                {cat.label}
              </button>
            );
          })}
        </div>

        {/* 4 Clean Icon Cards (2x2 Grid) */}
        <div className="grid grid-cols-2 gap-3 mb-8">
          {currentSkills.map((skill) => (
            <div
              key={skill.name}
              className="p-5 rounded-2xl bg-white/[0.02] border border-white/[0.08] flex flex-col items-center justify-center text-center transition-all duration-300 hover:border-[#F5D52F]/40"
            >
              <span className="text-3xl mb-2 filter drop-shadow">
                {skill.icon}
              </span>
              <span className="font-editorial text-xl tracking-wide text-[#F2F0E8]">
                {skill.name}
              </span>
            </div>
          ))}
        </div>

        {/* Editorial Quote Card */}
        <div className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.06] backdrop-blur-sm">
          <p className="text-xs text-[#8A8A8A] italic leading-relaxed">
            "I use the right tool for the right problem, and I'm always learning new ones."
          </p>
        </div>
      </div>
    </section>
  );
};
