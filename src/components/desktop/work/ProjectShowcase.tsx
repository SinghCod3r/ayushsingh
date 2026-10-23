import React from 'react';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { Project } from '../../../../data';
import { KineticHeading } from '../KineticHeading';
import { ProjectVisual } from './ProjectVisual';
import { ProjectInfo } from './ProjectInfo';

interface ProjectShowcaseProps {
  projects: Project[];
  active: number;
  onSelect: (index: number) => void;
  onPrev: () => void;
  onNext: () => void;
  onOpenModal: (project: Project) => void;
}

export const ProjectShowcase: React.FC<ProjectShowcaseProps> = ({
  projects,
  active,
  onSelect,
  onPrev,
  onNext,
  onOpenModal,
}) => {
  const currentProject = projects[active] || projects[0];

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col justify-between h-full py-4 sm:py-6">
      
      {/* ========================================================= */}
      {/* 1. SECTION INTRO HEADER                                   */}
      {/* ========================================================= */}
      <div className="mb-6 sm:mb-8 shrink-0">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3">
          <div className="space-y-1">
            <div className="flex items-center gap-3">
              <KineticHeading
                text="THINGS I BUILD"
                variant="blueprint"
                className="font-display font-black text-2xl sm:text-3xl lg:text-4xl uppercase tracking-tight text-white"
              />
              <span className="text-amber-400 font-mono text-base lg:text-lg font-normal opacity-75">
                (05)
              </span>
            </div>

            <p className="text-zinc-400 text-xs sm:text-sm max-w-2xl font-sans leading-relaxed">
              From low-level Linux system tooling to intelligent web applications. Real projects, real code, and problems worth solving.
            </p>
          </div>

          <div className="hidden md:flex items-center gap-2 text-xs font-mono text-zinc-500 bg-zinc-900/60 border border-zinc-800/80 px-3 py-1.5 rounded-full">
            <span className="text-amber-400">PROJECT EXHIBITION</span>
            <span>· SCROLL OR ARROWS</span>
          </div>
        </div>
      </div>

      {/* ========================================================= */}
      {/* 2. MAIN COMPOSITION: VISUAL + EDITORIAL TEXT               */}
      {/* ========================================================= */}
      <div className="my-auto py-2">
        {/* Desktop & Tablet Side-by-Side Grid */}
        <div className="hidden md:grid grid-cols-12 gap-8 lg:gap-14 items-center">
          {/* Left Column: Large Project Screenshot Stack (58% width) */}
          <div className="col-span-7">
            <ProjectVisual
              projects={projects}
              active={active}
              onOpenModal={onOpenModal}
              isMobile={false}
            />
          </div>

          {/* Right Column: Editorial Text & Meta (42% width) */}
          <div className="col-span-5 pl-2 lg:pl-6">
            <ProjectInfo
              project={currentProject}
              active={active}
              total={projects.length}
              onOpenModal={onOpenModal}
            />
          </div>
        </div>

        {/* Mobile Vertical Flow */}
        <div className="md:hidden flex flex-col space-y-6">
          <ProjectVisual
            projects={projects}
            active={active}
            onOpenModal={onOpenModal}
            isMobile={true}
          />
          <ProjectInfo
            project={currentProject}
            active={active}
            total={projects.length}
            onOpenModal={onOpenModal}
          />
        </div>
      </div>

      {/* ========================================================= */}
      {/* 3. MINIMAL NAVIGATION CONTROLS                             */}
      {/* ========================================================= */}
      <div className="pt-6 border-t border-zinc-800/60 flex items-center justify-between shrink-0 mt-6">
        
        {/* Project Number Indicator Row */}
        <div className="flex items-center gap-1.5 sm:gap-2">
          {projects.map((p, idx) => {
            const isActive = idx === active;
            return (
              <button
                key={p.id}
                onClick={() => onSelect(idx)}
                className={`text-xs font-mono transition-all px-2.5 py-1 rounded-md cursor-pointer ${
                  isActive
                    ? 'text-amber-400 font-bold bg-amber-400/10 border border-amber-400/30 shadow-sm'
                    : 'text-zinc-500 hover:text-white hover:bg-zinc-900 border border-transparent'
                }`}
                aria-label={`Jump to project ${p.title}`}
              >
                0{idx + 1}
              </button>
            );
          })}
        </div>

        {/* Tactile Arrow Buttons */}
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={onPrev}
            aria-label="Previous Project"
            className="w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-zinc-900/90 border border-zinc-800 flex items-center justify-center text-zinc-300 hover:text-white hover:border-amber-400/60 active:scale-95 transition-all shadow-md cursor-pointer"
          >
            <ArrowLeft size={16} />
          </button>

          <button
            type="button"
            onClick={onNext}
            aria-label="Next Project"
            className="w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-zinc-900/90 border border-zinc-800 flex items-center justify-center text-zinc-300 hover:text-white hover:border-amber-400/60 active:scale-95 transition-all shadow-md cursor-pointer"
          >
            <ArrowRight size={16} />
          </button>
        </div>

      </div>

    </div>
  );
};
