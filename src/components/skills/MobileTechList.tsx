import React, { useState } from 'react';
import { Technology, TechCategory } from '../../../data';
import { TechIcon } from './TechIcon';

interface MobileTechListProps {
  technologies: Technology[];
}

const CATEGORY_SECTIONS: { id: TechCategory; label: string }[] = [
  { id: 'languages', label: 'LANGUAGES' },
  { id: 'frontend', label: 'FRONTEND' },
  { id: 'backend', label: 'BACKEND' },
  { id: 'systems', label: 'SYSTEMS' },
  { id: 'tools', label: 'TOOLS' },
  { id: 'cloud', label: 'CLOUD' },
];

export const MobileTechList: React.FC<MobileTechListProps> = ({ technologies }) => {
  const [activeCategory, setActiveCategory] = useState<TechCategory>('all');

  const filteredTechnologies =
    activeCategory === 'all'
      ? technologies
      : technologies.filter((t) => t.category === activeCategory);

  return (
    <div className="w-full space-y-6 select-none" aria-label="Mobile technology list">
      {/* Horizontal Scrollable Category Filter Chips */}
      <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar pb-1 border-b border-zinc-800/60">
        <button
          onClick={() => setActiveCategory('all')}
          className={`px-3 py-1.5 rounded-full text-xs font-mono uppercase tracking-wider shrink-0 transition-all cursor-pointer ${
            activeCategory === 'all'
              ? 'bg-amber-400 text-black font-bold'
              : 'text-zinc-400 hover:text-white bg-zinc-900/80 border border-zinc-800/80'
          }`}
        >
          ALL ({technologies.length})
        </button>

        {CATEGORY_SECTIONS.map((cat) => {
          const count = technologies.filter((t) => t.category === cat.id).length;
          const isActive = activeCategory === cat.id;

          return (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-3 py-1.5 rounded-full text-xs font-mono uppercase tracking-wider shrink-0 transition-all cursor-pointer ${
                isActive
                  ? 'bg-amber-400 text-black font-bold'
                  : 'text-zinc-400 hover:text-white bg-zinc-900/80 border border-zinc-800/80'
              }`}
            >
              {cat.label} ({count})
            </button>
          );
        })}
      </div>

      {/* Render Grouped Sections when 'all' is selected, or filtered items directly */}
      {activeCategory === 'all' ? (
        <div className="space-y-6">
          {CATEGORY_SECTIONS.map((cat) => {
            const items = technologies.filter((t) => t.category === cat.id);
            if (items.length === 0) return null;

            return (
              <div key={cat.id} className="space-y-2.5">
                {/* Category Header */}
                <div className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                  <h3 className="font-mono text-xs font-bold uppercase tracking-wider text-zinc-400">
                    {cat.label}
                  </h3>
                </div>

                {/* Compact Interactive Item Grid */}
                <div className="flex flex-wrap gap-2">
                  {items.map((tech) => (
                    <button
                      key={tech.id}
                      type="button"
                      className="inline-flex items-center gap-2 px-3 py-2 rounded-xl bg-[#0f1115]/90 border border-zinc-800/80 active:border-amber-400/80 active:scale-95 transition-all text-xs font-semibold text-zinc-200"
                    >
                      <TechIcon
                        iconKey={tech.iconKey}
                        className="w-4 h-4 shrink-0"
                        style={{ color: tech.color || '#ffffff' }}
                      />
                      <span className="whitespace-nowrap font-display">{tech.name}</span>
                    </button>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="flex flex-wrap gap-2 pt-2">
          {filteredTechnologies.map((tech) => (
            <button
              key={tech.id}
              type="button"
              className="inline-flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl bg-[#0f1115]/90 border border-zinc-800/80 active:border-amber-400/80 active:scale-95 transition-all text-xs font-semibold text-zinc-200"
            >
              <TechIcon
                iconKey={tech.iconKey}
                className="w-5 h-5 shrink-0"
                style={{ color: tech.color || '#ffffff' }}
              />
              <span className="whitespace-nowrap font-display">{tech.name}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

