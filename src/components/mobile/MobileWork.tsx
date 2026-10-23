import React, { useState } from 'react';
import { portfolioData, Project } from '../../../data';
import { MobileProjectModal } from './MobileProjectModal';

export const MobileWork: React.FC = () => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const projects = portfolioData.projects;

  return (
    <>
      <section
        id="mobile-work"
        className="relative w-full py-14 px-6 bg-[#080909] text-[#F2F0E8] overflow-hidden border-t border-white/[0.06]"
      >
        {/* Subtle portrait frame 180 at bottom */}
        <div className="absolute bottom-0 right-[-10%] w-56 h-64 opacity-20 pointer-events-none filter grayscale contrast-125">
          <img
            src="/images/hero-sequence/frame-180.webp"
            alt="Ayush Singh"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#080909] via-[#080909]/70 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-l from-transparent via-[#080909]/60 to-[#080909]" />
        </div>

        <div className="relative z-10 flex flex-col">
          {/* Section Label */}
          <div className="flex items-center space-x-1.5 text-[10px] font-mono tracking-widest uppercase text-[#F5D52F] mb-3">
            <span>WORK</span>
            <span>↗</span>
          </div>

          {/* Editorial Headline */}
          <h2 className="font-editorial text-[14vw] leading-[0.9] tracking-tight mb-8">
            <span className="text-[#F2F0E8]">IDEAS<br /></span>
            <span className="text-[#F2F0E8]">INTO </span>
            <span className="text-[#F5D52F]">REALITY.</span>
          </h2>

          {/* Clean Editorial Numbered List */}
          <div className="flex flex-col space-y-3 mb-8">
            {projects.slice(0, 5).map((project, idx) => {
              const numStr = (idx + 1).toString().padStart(2, '0');
              return (
                <button
                  key={project.id}
                  onClick={() => setSelectedProject(project)}
                  className="w-full p-4 rounded-2xl bg-white/[0.02] border border-white/[0.06] text-left flex items-center justify-between hover:border-[#F5D52F]/40 hover:bg-white/[0.04] transition-all group"
                >
                  <div className="flex items-start space-x-4">
                    <span className="font-editorial text-2xl text-[#F5D52F] group-hover:scale-105 transition-transform">
                      {numStr}
                    </span>
                    <div className="flex flex-col">
                      <span className="font-editorial text-xl tracking-wide text-[#F2F0E8] group-hover:text-[#F5D52F] transition-colors">
                        {project.title.toUpperCase()}
                      </span>
                      <span className="text-xs text-[#8A8A8A] font-mono mt-0.5 line-clamp-1">
                        {project.subtitle}
                      </span>
                    </div>
                  </div>
                  <span className="text-xs font-mono text-[#8A8A8A] group-hover:text-[#F5D52F] group-hover:translate-x-0.5 transition-all">
                    ↗
                  </span>
                </button>
              );
            })}
          </div>

          {/* Editorial Quote Card */}
          <div className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.06] backdrop-blur-sm">
            <p className="text-xs text-[#8A8A8A] italic leading-relaxed">
              "I love building products that solve real problems and make life easier."
            </p>
          </div>
        </div>
      </section>

      {/* Project Deep Dive Modal */}
      <MobileProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </>
  );
};
