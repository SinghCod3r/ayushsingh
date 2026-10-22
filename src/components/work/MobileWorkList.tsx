import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowUpRight, Plus, Minus, ExternalLink, Github, Sparkles } from 'lucide-react';
import { Project } from '../../../data';

// Attribution: Interaction model inspired by Skiper UI (skiper23: Expandable List)
// Redesigned as a bespoke mobile editorial project showcase for Ayush Singh

interface MobileWorkListProps {
  projects: Project[];
  onOpenModal: (project: Project) => void;
}

export const MobileWorkList: React.FC<MobileWorkListProps> = ({ projects, onOpenModal }) => {
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const toggleExpand = (id: string) => {
    setExpandedId((prev) => (prev === id ? null : id));
  };

  return (
    <div className="w-full divide-y divide-zinc-800/80 border-y border-zinc-800/80">
      {projects.map((project) => {
        const isExpanded = expandedId === project.id;

        return (
          <div
            key={project.id}
            className={`transition-colors duration-300 ${
              isExpanded ? 'bg-zinc-900/40' : 'hover:bg-zinc-900/15'
            }`}
          >
            {/* ===================================================== */}
            {/* COLLAPSED ROW (Tactile tap target)                   */}
            {/* ===================================================== */}
            <button
              type="button"
              onClick={() => toggleExpand(project.id)}
              aria-expanded={isExpanded}
              aria-controls={`mobile-project-${project.id}`}
              className="w-full text-left py-4 sm:py-5 px-1 sm:px-2 flex items-center justify-between gap-4 cursor-pointer focus:outline-none focus-visible:ring-1 focus-visible:ring-amber-400 rounded-lg group select-none"
            >
              <div className="space-y-0.5 flex-1 min-w-0 pr-2">
                {/* Number & Category meta */}
                <div className="flex items-center gap-2 text-xs font-mono">
                  <span className="font-bold text-amber-400">{project.number}</span>
                  <span className="text-zinc-600">·</span>
                  <span className="text-[10px] sm:text-[11px] text-zinc-400 uppercase tracking-wider truncate">
                    {project.category || 'SYSTEMS & AI'}
                  </span>
                  {project.featured && (
                    <span className="inline-flex items-center gap-1 text-[9px] text-amber-400 bg-amber-400/10 px-1.5 py-0.5 rounded font-mono font-semibold">
                      <Sparkles size={8} />
                      CORE
                    </span>
                  )}
                </div>

                {/* Title */}
                <h3
                  className={`font-display font-bold text-lg sm:text-xl md:text-2xl tracking-tight uppercase transition-colors truncate ${
                    isExpanded ? 'text-amber-400' : 'text-white group-hover:text-zinc-200'
                  }`}
                >
                  {project.title}
                </h3>
              </div>

              {/* Minimal Expand Indicator (+ / −) */}
              <div
                className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full border flex items-center justify-center shrink-0 transition-all duration-300 ${
                  isExpanded
                    ? 'bg-amber-400 border-amber-400 text-black shadow-md shadow-amber-500/20 rotate-180'
                    : 'bg-zinc-900/80 border-zinc-800 text-zinc-400 group-hover:text-white group-hover:border-zinc-700'
                }`}
              >
                {isExpanded ? <Minus size={13} /> : <Plus size={13} />}
              </div>
            </button>

            {/* ===================================================== */}
            {/* EXPANDED CONTENT (Skiper23 Smooth Spring Expansion)   */}
            {/* ===================================================== */}
            <AnimatePresence initial={false}>
              {isExpanded && (
                <motion.div
                  id={`mobile-project-${project.id}`}
                  role="region"
                  aria-labelledby={`mobile-project-btn-${project.id}`}
                  initial={{ opacity: 0, height: 0 }}
                  animate={{
                    opacity: 1,
                    height: 'auto',
                    transition: {
                      height: { type: 'spring', stiffness: 320, damping: 28 },
                      opacity: { duration: 0.25, delay: 0.05 },
                    },
                  }}
                  exit={{
                    opacity: 0,
                    height: 0,
                    transition: {
                      height: { duration: 0.25, ease: [0.32, 0.72, 0, 1] },
                      opacity: { duration: 0.15 },
                    },
                  }}
                  className="overflow-hidden"
                >
                  <div className="pt-2 pb-6 px-1 sm:px-2 space-y-3.5">
                    
                    {/* Real Project Screenshot Frame */}
                    <motion.div
                      initial={{ scale: 0.97, opacity: 0, y: 10 }}
                      animate={{ scale: 1, opacity: 1, y: 0 }}
                      transition={{ type: 'spring', stiffness: 300, damping: 25, delay: 0.08 }}
                      onClick={() => onOpenModal(project)}
                      className="w-full aspect-[16/10] rounded-xl overflow-hidden bg-black border border-zinc-800/90 relative cursor-pointer shadow-lg active:scale-[0.99] transition-transform"
                    >
                      <img
                        src={project.image}
                        alt={project.title}
                        className="w-full h-full object-cover object-top"
                        loading="lazy"
                      />
                      {/* Tap to inspect overlay hint */}
                      <div className="absolute bottom-2.5 right-2.5 bg-black/80 backdrop-blur-md px-2 py-1 rounded text-[10px] font-mono text-amber-300 border border-zinc-800 flex items-center gap-1">
                        <span>Deep Dive</span>
                        <ArrowUpRight size={10} />
                      </div>
                    </motion.div>

                    {/* Short Concise Description */}
                    <motion.p
                      initial={{ opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.2, delay: 0.12 }}
                      className="text-xs sm:text-sm text-zinc-300 font-sans leading-relaxed"
                    >
                      {project.description}
                    </motion.p>

                    {/* Tech Stack & Year */}
                    <motion.div
                      initial={{ opacity: 0, y: 4 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.2, delay: 0.16 }}
                      className="flex items-center justify-between text-xs font-mono text-zinc-400 pt-1"
                    >
                      <span className="text-amber-400 font-medium">
                        {project.tags.slice(0, 3).join(' · ')}
                      </span>
                      <span className="text-zinc-500">{project.year || '2026'}</span>
                    </motion.div>

                    {/* Action Links */}
                    <motion.div
                      initial={{ opacity: 0, y: 4 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.2, delay: 0.2 }}
                      className="flex items-center gap-2.5 pt-3 border-t border-zinc-800/60"
                    >
                      <button
                        type="button"
                        onClick={() => onOpenModal(project)}
                        className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full bg-amber-400 text-black text-xs font-mono font-bold hover:bg-amber-300 active:bg-amber-500 transition-colors shadow-sm cursor-pointer"
                      >
                        <span>View project</span>
                        <ArrowUpRight size={13} />
                      </button>

                      {project.github && (
                        <a
                          href={project.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 px-3 py-2 rounded-full bg-zinc-900 border border-zinc-800 text-xs font-mono text-zinc-300 hover:text-white transition-colors"
                        >
                          <Github size={13} />
                          <span>GitHub</span>
                        </a>
                      )}

                      {project.live && (
                        <a
                          href={project.live}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 px-3 py-2 rounded-full bg-zinc-900 border border-zinc-800 text-xs font-mono text-amber-400 hover:text-amber-300 transition-colors"
                        >
                          <ExternalLink size={13} />
                          <span>Live</span>
                        </a>
                      )}
                    </motion.div>

                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
};
