import React, { useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { ArrowUpRight, Github, ExternalLink } from 'lucide-react';
import { portfolioData, Project } from '../../../data';
import { ProjectDetailModal } from './ProjectDetailModal';

gsap.registerPlugin(ScrollTrigger);

export const Projects: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const showcaseRef = useRef<HTMLDivElement>(null);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const projects = portfolioData.projects;

  useGSAP(
    () => {
      const showcase = showcaseRef.current;
      if (!showcase) return;

      const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      if (prefersReducedMotion) return;

      const rows = showcase.querySelectorAll('.project-row');

      rows.forEach((row) => {
        gsap.from(row, {
          scrollTrigger: {
            trigger: row,
            start: 'top 85%',
            end: 'top 45%',
            scrub: 0.5,
          },
          y: 35,
          opacity: 0,
          ease: 'power2.out',
        });
      });
    },
    { scope: containerRef }
  );

  return (
    <section
      id="work"
      ref={containerRef}
      className="relative w-full py-24 lg:py-36 bg-transparent text-zinc-100 border-t border-zinc-800/60 overflow-hidden"
      style={{ isolation: 'isolate' }}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16 lg:mb-20">
          <div>
            <span className="text-[11px] font-mono uppercase tracking-widest text-zinc-500">
              Selected Work
            </span>
            <h2 className="font-display font-bold text-3xl sm:text-4xl lg:text-5xl text-zinc-100 tracking-tight mt-2">
              Featured Projects.
            </h2>
          </div>
          <p className="text-sm font-sans text-zinc-400 max-w-md">
            Production systems, compiler implementations, and AI products built for performance and resilience.
          </p>
        </div>

        {/* Editorial Project Showcase */}
        <div ref={showcaseRef} className="space-y-20 lg:space-y-28">
          {projects.map((project, idx) => {
            const isEven = idx % 2 === 1;

            return (
              <div
                key={project.id}
                className={`project-row grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center ${
                  isEven ? 'lg:grid-flow-dense' : ''
                }`}
              >
                {/* Visual / Screenshot Column */}
                <div
                  className={`lg:col-span-7 group cursor-pointer relative overflow-hidden rounded-xl border border-zinc-800/80 bg-zinc-950/60 shadow-lg ${
                    isEven ? 'lg:col-start-6' : ''
                  }`}
                  onClick={() => setSelectedProject(project)}
                >
                  <div className="aspect-[16/10] overflow-hidden bg-zinc-900/60">
                    <img
                      src={project.image}
                      alt={project.title}
                      loading="lazy"
                      className="w-full h-full object-cover object-top filter brightness-[0.92] contrast-[1.05] group-hover:brightness-100 group-hover:scale-[1.02] transition-all duration-700 ease-out"
                    />
                  </div>

                  {/* Subtle Corner Badge */}
                  <div className="absolute top-3 right-3 px-2.5 py-1 rounded bg-zinc-900/80 backdrop-blur-sm border border-zinc-700/60 text-[10px] font-mono uppercase tracking-wider text-zinc-300">
                    Click for Deep Dive
                  </div>
                </div>

                {/* Typography / Details Column */}
                <div
                  className={`lg:col-span-5 space-y-4 ${
                    isEven ? 'lg:col-start-1 lg:row-start-1' : ''
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className="text-xs font-mono text-amber-400 font-semibold">
                      {project.number}
                    </span>
                    <span className="text-zinc-600 font-mono text-xs">/</span>
                    <span className="text-xs font-mono uppercase tracking-wider text-zinc-400">
                      {project.category || 'Engineering'}
                    </span>
                  </div>

                  <h3
                    className="font-display font-bold text-2xl sm:text-3xl text-zinc-100 tracking-tight hover:text-amber-300 transition-colors cursor-pointer"
                    onClick={() => setSelectedProject(project)}
                  >
                    {project.title}
                  </h3>

                  <p className="text-sm sm:text-base text-zinc-300 font-sans leading-relaxed">
                    {project.subtitle}
                  </p>

                  <p className="text-xs sm:text-sm text-zinc-400 font-sans leading-relaxed">
                    {project.description}
                  </p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 pt-2">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-[11px] font-mono px-2.5 py-1 rounded bg-zinc-900/70 border border-zinc-800 text-zinc-400"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Action Links */}
                  <div className="flex items-center gap-4 pt-3">
                    {project.github && (
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 text-xs font-mono text-zinc-300 hover:text-white transition-colors"
                      >
                        <Github size={14} />
                        <span>Source</span>
                        <ArrowUpRight size={11} className="text-zinc-500" />
                      </a>
                    )}

                    {project.live && (
                      <a
                        href={project.live}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 text-xs font-mono text-amber-400 hover:text-amber-300 transition-colors"
                      >
                        <ExternalLink size={13} />
                        <span>Live Demo</span>
                        <ArrowUpRight size={11} className="text-amber-500" />
                      </a>
                    )}

                    <button
                      onClick={() => setSelectedProject(project)}
                      className="text-xs font-mono text-zinc-400 hover:text-zinc-200 transition-colors underline underline-offset-4 cursor-pointer ml-auto"
                    >
                      Case Study
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

      </div>

      {/* Deep-Dive Modal */}
      {selectedProject && (
        <ProjectDetailModal
          project={selectedProject}
          onClose={() => setSelectedProject(null)}
          onPrev={() => {
            const curIdx = projects.findIndex((p) => p.id === selectedProject.id);
            const prevIdx = curIdx > 0 ? curIdx - 1 : projects.length - 1;
            setSelectedProject(projects[prevIdx]);
          }}
          onNext={() => {
            const curIdx = projects.findIndex((p) => p.id === selectedProject.id);
            const nextIdx = curIdx < projects.length - 1 ? curIdx + 1 : 0;
            setSelectedProject(projects[nextIdx]);
          }}
          hasPrev={true}
          hasNext={true}
        />
      )}
    </section>
  );
};
