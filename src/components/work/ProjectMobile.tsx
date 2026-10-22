import React from 'react';
import { Project } from '../../../data';
import { MobileWorkList } from './MobileWorkList';

interface ProjectMobileProps {
  projects: Project[];
  onOpenModal: (project: Project) => void;
}

export const ProjectMobile: React.FC<ProjectMobileProps> = ({ projects, onOpenModal }) => {
  return (
    <div className="w-full py-12 px-4 sm:px-6 relative z-10">
      <div className="max-w-xl mx-auto space-y-6">
        
        {/* Section Header */}
        <div className="space-y-2">
          <div className="flex items-center gap-2.5">
            <h2 className="font-display font-black text-3xl sm:text-4xl uppercase tracking-tight text-white">
              WORK.
            </h2>
            <span className="text-amber-400 font-mono text-base font-normal opacity-75">
              (05)
            </span>
          </div>

          <p className="text-zinc-400 text-xs sm:text-sm font-sans leading-relaxed">
            From low-level Linux system tooling to intelligent web applications. Real projects, real code, and problems worth solving.
          </p>
        </div>

        {/* Skiper23 Expandable Editorial List */}
        <MobileWorkList projects={projects} onOpenModal={onOpenModal} />

      </div>
    </div>
  );
};
