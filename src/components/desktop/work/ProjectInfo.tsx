import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowUpRight, Github, ExternalLink } from 'lucide-react';
import { Project } from '../../../../data';

interface ProjectInfoProps {
  project: Project;
  active: number;
  total: number;
  onOpenModal: (project: Project) => void;
}

export const ProjectInfo: React.FC<ProjectInfoProps> = ({
  project,
  active,
  total,
  onOpenModal,
}) => {
  return (
    <div className="w-full flex flex-col justify-between space-y-6">
      
      {/* Dynamic Animated Content Container */}
      <AnimatePresence mode="wait">
        <motion.div
          key={project.id}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -16 }}
          transition={{ duration: 0.36, ease: [0.22, 1, 0.36, 1] }}
          className="space-y-4"
        >
          {/* Milestone Number & Category Metadata */}
          <div className="flex items-center gap-2.5 text-xs font-mono">
            <span className="font-bold text-amber-400 text-sm">
              0{active + 1} / 0{total}
            </span>
            <span className="text-zinc-600">·</span>
            <span className="text-[11px] text-zinc-400 uppercase tracking-wider font-semibold">
              {project.category || 'SYSTEMS & AI'}
            </span>
            <span className="text-zinc-600">·</span>
            <span className="text-[11px] text-zinc-400">
              {project.year || '2026'}
            </span>
          </div>

          {/* Large Editorial Project Title */}
          <h3 className="font-display font-black text-3xl sm:text-4xl lg:text-5xl uppercase tracking-tight text-white leading-[1.05]">
            {project.title}
          </h3>

          {/* Subtitle / Architectural Role */}
          {project.subtitle && (
            <div className="text-xs sm:text-sm font-mono text-amber-300/90 font-medium">
              {project.subtitle}
            </div>
          )}

          {/* Concise Description */}
          <p className="text-sm sm:text-base text-zinc-300 font-sans leading-relaxed max-w-xl pt-1">
            {project.description}
          </p>

          {/* Technology Pills */}
          <div className="flex flex-wrap items-center gap-2 pt-2">
            {project.tags.map((tag, i) => (
              <span
                key={i}
                className="px-3 py-1 rounded-full bg-zinc-900/90 border border-zinc-800 text-xs font-mono text-zinc-300"
              >
                {tag}
              </span>
            ))}
          </div>

          {/* Action Links */}
          <div className="flex flex-wrap items-center gap-3 pt-4 border-t border-zinc-800/60">
            <button
              type="button"
              onClick={() => onOpenModal(project)}
              className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-full bg-amber-400 hover:bg-amber-300 active:bg-amber-500 text-black text-xs font-mono font-bold transition-all shadow-md shadow-amber-500/20 cursor-pointer"
            >
              <span>View project</span>
              <ArrowUpRight size={14} />
            </button>

            {project.github && (
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-full bg-zinc-900/90 border border-zinc-800 text-xs font-mono text-zinc-300 hover:text-white hover:border-zinc-700 transition-colors"
              >
                <Github size={14} />
                <span>GitHub</span>
              </a>
            )}

            {project.live && (
              <a
                href={project.live}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-full bg-zinc-900/90 border border-zinc-800 text-xs font-mono text-amber-400 hover:text-amber-300 hover:border-amber-400/50 transition-colors"
              >
                <ExternalLink size={14} />
                <span>Live Demo</span>
              </a>
            )}
          </div>
        </motion.div>
      </AnimatePresence>

    </div>
  );
};
