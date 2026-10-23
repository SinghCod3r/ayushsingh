import React from 'react';
import { Project } from '../../../data';

interface MobileProjectModalProps {
  project: Project | null;
  onClose: () => void;
}

export const MobileProjectModal: React.FC<MobileProjectModalProps> = ({ project, onClose }) => {
  if (!project) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/85 backdrop-blur-sm p-0 sm:p-4">
      <div className="relative w-full max-h-[90vh] bg-[#0c0d0e] border-t sm:border border-white/10 rounded-t-3xl sm:rounded-2xl p-6 overflow-y-auto text-[#F2F0E8] shadow-2xl">
        {/* Close Button */}
        <button
          onClick={onClose}
          aria-label="Close project details"
          className="absolute top-5 right-5 w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-[#8A8A8A] hover:text-[#F2F0E8]"
        >
          ✕
        </button>

        {/* Header */}
        <span className="text-[10px] font-mono tracking-widest uppercase text-[#F5D52F]">
          {project.number} · {project.category}
        </span>
        <h3 className="font-editorial text-3xl tracking-wide mt-1 text-[#F2F0E8]">
          {project.title}
        </h3>
        <p className="text-xs text-[#8A8A8A] font-mono mt-1 mb-4">
          {project.subtitle}
        </p>

        {/* Primary Image */}
        {project.image && (
          <div className="relative w-full rounded-xl overflow-hidden border border-white/10 mb-5 bg-black/40 aspect-video">
            <img
              src={project.image}
              alt={project.title}
              className="w-full h-full object-cover"
            />
          </div>
        )}

        {/* Description */}
        <p className="text-sm text-[#F2F0E8]/90 leading-relaxed mb-6 font-sans">
          {project.description}
        </p>

        {/* Tech Tags */}
        <div className="flex flex-wrap gap-1.5 mb-6">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="px-2.5 py-1 rounded-md text-[11px] font-mono bg-white/[0.04] text-[#F5D52F] border border-white/[0.08]"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Deep Dive details */}
        {project.deepDive && (
          <div className="flex flex-col space-y-4 mb-6 pt-4 border-t border-white/[0.08]">
            <div>
              <span className="block text-[11px] font-mono uppercase text-[#F5D52F]">
                The Problem
              </span>
              <p className="text-xs text-[#8A8A8A] leading-relaxed mt-0.5">
                {project.deepDive.problem}
              </p>
            </div>
            <div>
              <span className="block text-[11px] font-mono uppercase text-[#F5D52F]">
                Architecture & Implementation
              </span>
              <p className="text-xs text-[#8A8A8A] leading-relaxed mt-0.5">
                {project.deepDive.howItWorks}
              </p>
            </div>
          </div>
        )}

        {/* Action Links */}
        <div className="flex gap-3 pt-2">
          {project.github && (
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 py-3 text-center rounded-xl bg-[#F5D52F] text-[#080909] font-mono text-xs font-bold hover:bg-yellow-400 transition-colors"
            >
              VIEW CODE ↗
            </a>
          )}
          {project.live && (
            <a
              href={project.live}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 py-3 text-center rounded-xl bg-white/10 text-[#F2F0E8] font-mono text-xs font-medium border border-white/15 hover:bg-white/20 transition-colors"
            >
              LIVE DEMO ↗
            </a>
          )}
        </div>
      </div>
    </div>
  );
};
