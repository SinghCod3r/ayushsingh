import React, { useEffect } from 'react';
import { X, ExternalLink, Github, Layers, ChevronLeft, ChevronRight } from 'lucide-react';
import { Project } from '../../data';
import { setScrollLocked } from '../utils/scroll';

interface ProjectDetailModalProps {
  project: Project | null;
  onClose: () => void;
  onPrev?: () => void;
  onNext?: () => void;
  hasPrev?: boolean;
  hasNext?: boolean;
}

export const ProjectDetailModal: React.FC<ProjectDetailModalProps> = ({
  project,
  onClose,
  onPrev,
  onNext,
  hasPrev = true,
  hasNext = true,
}) => {
  useEffect(() => {
    if (project) {
      setScrollLocked(true);
      const onKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'Escape') onClose();
        if (e.key === 'ArrowLeft' && onPrev) onPrev();
        if (e.key === 'ArrowRight' && onNext) onNext();
      };
      window.addEventListener('keydown', onKeyDown);
      return () => {
        setScrollLocked(false);
        window.removeEventListener('keydown', onKeyDown);
      };
    } else {
      setScrollLocked(false);
    }
  }, [project, onClose, onPrev, onNext]);

  if (!project) return null;

  const deep = project.deepDive || {
    problem: project.description,
    idea: project.subtitle,
    howItWorks: 'Built with performant primitives and clean system abstractions.',
    technology: project.tags.join(', '),
    whatILearned: 'Production deployment, architecture scaling, and performance optimizations.',
  };

  const steps = [
    { num: '01', title: 'The Problem', content: deep.problem },
    { num: '02', title: 'The Idea', content: deep.idea },
    { num: '03', title: 'How It Works', content: deep.howItWorks },
    { num: '04', title: 'Technology', content: deep.technology },
    { num: '05', title: 'What I Learned', content: deep.whatILearned },
  ];

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 lg:p-10 bg-black/90 backdrop-blur-xl"
      role="dialog"
      aria-modal="true"
    >
      {/* Modal Container */}
      <div className="relative w-full max-w-5xl max-h-[90vh] bg-[#0c0d10] border border-white/10 rounded-2xl sm:rounded-3xl shadow-2xl overflow-hidden flex flex-col">
        
        {/* Modal Top Bar */}
        <div className="px-6 py-4 sm:px-8 sm:py-5 border-b border-white/[0.08] flex items-center justify-between bg-[#101115]">
          <div className="flex items-center gap-3">
            <span className="font-mono text-xs uppercase px-2.5 py-1 rounded bg-[#F5D52F]/10 border border-[#F5D52F]/25 text-[#F5D52F] font-semibold">
              PROJECT {project.number}
            </span>
            <span className="font-display text-2xl sm:text-3xl text-[#F2F0E8] tracking-wide">
              {project.title}
            </span>
          </div>

          <div className="flex items-center gap-2">
            {onPrev && (
              <button
                onClick={onPrev}
                disabled={!hasPrev}
                className="p-2 rounded-full bg-white/[0.04] hover:bg-white/10 disabled:opacity-30 disabled:cursor-not-allowed text-[#8A8A8A] hover:text-[#F2F0E8] transition-colors cursor-pointer"
                aria-label="Previous project"
              >
                <ChevronLeft size={18} />
              </button>
            )}
            {onNext && (
              <button
                onClick={onNext}
                disabled={!hasNext}
                className="p-2 rounded-full bg-white/[0.04] hover:bg-white/10 disabled:opacity-30 disabled:cursor-not-allowed text-[#8A8A8A] hover:text-[#F2F0E8] transition-colors cursor-pointer"
                aria-label="Next project"
              >
                <ChevronRight size={18} />
              </button>
            )}
            <button
              onClick={onClose}
              className="p-2 rounded-full bg-white/[0.04] hover:bg-white/10 text-[#8A8A8A] hover:text-[#F5D52F] transition-colors ml-1 cursor-pointer"
              aria-label="Close project modal"
            >
              <X size={20} />
            </button>
          </div>
        </div>

        {/* Modal Scrollable Body */}
        <div className="p-6 sm:p-8 overflow-y-auto space-y-8">
          
          {/* Main Visual Banner */}
          <div className="relative rounded-2xl overflow-hidden aspect-[16/9] max-h-[380px] bg-black border border-white/10">
            <img
              src={project.image}
              alt={project.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />
            <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
              <span className="text-xs sm:text-sm font-mono text-zinc-300 bg-black/70 backdrop-blur-md px-3 py-1.5 rounded-lg border border-white/10">
                {project.subtitle}
              </span>
              <div className="flex items-center gap-2">
                {project.tags.slice(0, 3).map((tag) => (
                  <span
                    key={tag}
                    className="hidden sm:inline-block text-[11px] font-mono px-2 py-0.5 rounded bg-black/70 border border-white/10 text-[#F5D52F]"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Secondary Screenshot if available */}
          {project.secondaryImage && (
            <div className="rounded-xl overflow-hidden aspect-[16/9] max-h-[260px] bg-black border border-white/10">
              <img
                src={project.secondaryImage}
                alt={`${project.title} detail view`}
                className="w-full h-full object-cover"
              />
            </div>
          )}

          {/* 5-Step Deep Dive Narrative */}
          <div className="space-y-4 pt-2">
            <h3 className="font-display text-2xl text-[#F2F0E8] flex items-center gap-2">
              <Layers size={18} className="text-[#F5D52F]" />
              <span>Architectural Breakdown</span>
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {steps.map((step) => (
                <div
                  key={step.num}
                  className="p-5 rounded-xl bg-white/[0.02] border border-white/[0.07] flex flex-col justify-between space-y-2 hover:border-[#F5D52F]/30 transition-colors"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs font-bold text-[#F5D52F]">
                      {step.num}
                    </span>
                    <span className="text-xs font-medium uppercase tracking-wider text-[#8A8A8A]">
                      {step.title}
                    </span>
                  </div>
                  <p className="text-xs sm:text-sm text-[#F2F0E8]/90 leading-relaxed font-sans">
                    {step.content}
                  </p>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Modal Actions Footer */}
        <div className="px-6 py-4 sm:px-8 sm:py-4 border-t border-white/[0.08] bg-[#101115] flex items-center justify-between flex-wrap gap-4">
          <div className="flex items-center gap-2">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="text-[11px] font-mono px-2.5 py-1 rounded bg-white/[0.03] text-[#8A8A8A] border border-white/[0.06]"
              >
                {tag}
              </span>
            ))}
          </div>

          <div className="flex items-center gap-3">
            {project.github && (
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/[0.05] hover:bg-white/10 text-xs font-mono uppercase text-[#F2F0E8] transition-colors cursor-pointer border border-white/10"
              >
                <Github size={14} />
                <span>View Code</span>
              </a>
            )}
            {project.live && (
              <a
                href={project.live}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#F5D52F] hover:bg-white text-black text-xs font-mono uppercase font-semibold transition-colors cursor-pointer shadow-md"
              >
                <span>Live Project</span>
                <ExternalLink size={14} />
              </a>
            )}
          </div>
        </div>

      </div>
    </div>
  );
};
