import React from 'react';
import { motion } from 'motion/react';
import { ArrowUpRight, Sparkles } from 'lucide-react';
import { Project } from '../../../data';

interface ProjectVisualProps {
  projects: Project[];
  active: number;
  onOpenModal: (project: Project) => void;
  isMobile?: boolean;
}

// Subtle editorial tilt angles for physical sheet depth (-2.2° to +2.2°)
const TILTS = [-2, 1.8, -1.5, 2.2, -1.2];

export const ProjectVisual: React.FC<ProjectVisualProps> = ({
  projects,
  active,
  onOpenModal,
  isMobile = false,
}) => {

  return (
    <div className="relative w-full aspect-[16/10] sm:aspect-[16/10] max-w-[680px] mx-auto select-none">
      
      {/* Background ambient depth glow */}
      <div className="absolute -inset-4 bg-gradient-to-r from-amber-500/10 to-cyan-500/10 rounded-3xl blur-2xl opacity-60 pointer-events-none" />

      {/* Layered Project Visuals (Animated Stack) */}
      <div className="relative w-full h-full">
        {projects.map((project, index) => {
          const isActive = index === active;
          const offset = (index - active + projects.length) % projects.length;
          const tilt = TILTS[index % TILTS.length];

          // Determine stacking depth
          let scale = 1;
          let rotate = 0;
          let opacity = 0;
          let zIndex = 0;
          let y = 0;

          if (isActive) {
            scale = 1;
            rotate = 0;
            opacity = 1;
            zIndex = 20;
            y = 0;
          } else if (offset === 1) {
            scale = 0.94;
            rotate = tilt;
            opacity = isMobile ? 0 : 0.45;
            zIndex = 10;
            y = 10;
          } else if (offset === 2 && !isMobile) {
            scale = 0.88;
            rotate = -tilt;
            opacity = 0.2;
            zIndex = 5;
            y = 20;
          } else {
            scale = 0.82;
            rotate = 0;
            opacity = 0;
            zIndex = 0;
            y = 30;
          }

          return (
            <motion.div
              key={project.id}
              initial={false}
              animate={{
                scale,
                rotate,
                opacity,
                zIndex,
                y,
              }}
              transition={{
                type: 'spring',
                stiffness: 280,
                damping: 26,
                mass: 0.9,
              }}
              onClick={() => {
                if (isActive) onOpenModal(project);
              }}
              className={`absolute inset-0 rounded-2xl overflow-hidden bg-black/95 border transition-colors ${
                isActive
                  ? 'border-zinc-700/80 hover:border-amber-400/60 shadow-[0_20px_60px_rgba(0,0,0,0.85)] cursor-pointer'
                  : 'border-zinc-800/60 pointer-events-none'
              }`}
            >
              {/* Actual Project Screenshot */}
              <img
                src={project.image}
                alt={project.title}
                className="w-full h-full object-cover object-top select-none pointer-events-none"
                loading={isActive ? 'eager' : 'lazy'}
                decoding="async"
              />

              {/* Active Image Subtle Gradient Overlay for Contrast */}
              {isActive && (
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20 pointer-events-none" />
              )}

              {/* Top Accent Pill for Featured / Core Upstream */}
              {isActive && project.featured && (
                <div className="absolute top-3.5 left-3.5 z-10 flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-black/80 backdrop-blur-md border border-amber-500/40 text-[10px] font-mono text-amber-300 shadow-md">
                  <Sparkles size={11} className="text-amber-400" />
                  <span>CORE UPSTREAM</span>
                </div>
              )}

              {/* Bottom Right Inspect Hint */}
              {isActive && (
                <div className="absolute bottom-3.5 right-3.5 z-10 hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-black/85 backdrop-blur-md border border-zinc-700/80 text-xs font-mono text-zinc-300 hover:text-white hover:border-amber-400 transition-colors shadow-lg">
                  <span>Deep Dive</span>
                  <ArrowUpRight size={13} className="text-amber-400" />
                </div>
              )}
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};
