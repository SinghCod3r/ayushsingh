import React, { useState, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { ArrowUpRight, Check } from 'lucide-react';
import { portfolioData, Project } from '../../data';
import { SectionLabel } from './SectionLabel';
import { ProjectDetailModal } from './ProjectDetailModal';

gsap.registerPlugin(ScrollTrigger);

export const Projects: React.FC = () => {
  const containerRef = useRef<HTMLElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const portraitRef = useRef<HTMLDivElement>(null);

  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const projects = portfolioData.projects;

  useGSAP(
    () => {
      const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      if (prefersReducedMotion) return;

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 80%',
          toggleActions: 'play none none none',
        },
      });

      tl.from(headlineRef.current, {
        opacity: 0,
        y: 28,
        duration: 0.6,
        ease: 'power3.out',
      });

      tl.from(
        listRef.current?.children || [],
        {
          opacity: 0,
          y: 20,
          duration: 0.45,
          stagger: 0.08,
          ease: 'power3.out',
        },
        '-=0.3'
      );

      tl.from(
        portraitRef.current,
        {
          opacity: 0,
          scale: 0.95,
          duration: 0.7,
          ease: 'power2.out',
        },
        '-=0.4'
      );
    },
    { scope: containerRef }
  );

  const handleOpenProject = (project: Project) => {
    setSelectedProject(project);
  };

  const handleCloseModal = () => {
    setSelectedProject(null);
  };

  const currentIdx = selectedProject
    ? projects.findIndex((p) => p.id === selectedProject.id)
    : -1;

  const handlePrevProject = () => {
    if (currentIdx > 0) {
      setSelectedProject(projects[currentIdx - 1]);
    } else {
      setSelectedProject(projects[projects.length - 1]);
    }
  };

  const handleNextProject = () => {
    if (currentIdx < projects.length - 1) {
      setSelectedProject(projects[currentIdx + 1]);
    } else {
      setSelectedProject(projects[0]);
    }
  };

  return (
    <>
      <section
        id="work"
        ref={containerRef}
        className="relative w-full py-24 sm:py-32 bg-[#080909] text-[#F2F0E8] overflow-hidden border-t border-white/[0.06]"
        style={{ isolation: 'isolate' }}
      >
        {/* Background Portrait Looking Up/Right with Warm Yellow Glow */}
        <div
          ref={portraitRef}
          className="absolute bottom-0 right-0 sm:right-6 md:right-12 w-80 sm:w-[480px] md:w-[580px] h-[540px] pointer-events-none opacity-20 sm:opacity-30 select-none z-0 overflow-hidden"
        >
          <img
            src="/images/hero-sequence/frame-180.webp"
            alt=""
            className="w-full h-full object-contain grayscale contrast-125 brightness-90"
            loading="lazy"
          />
          {/* Warm yellow ambient glow */}
          <div className="absolute bottom-10 left-1/2 -translate-x-1/2 w-[340px] h-[340px] rounded-full bg-[#F5D52F]/14 blur-[120px] pointer-events-none" />
        </div>

        <div className="max-w-7xl mx-auto px-6 sm:px-10 relative z-10">
          
          {/* Section Label: WORK */}
          <div className="mb-8">
            <SectionLabel label="WORK" />
          </div>

          {/* Headline: IDEAS (White) INTO REALITY. (Yellow) */}
          <h2
            ref={headlineRef}
            className="font-display text-6xl sm:text-8xl md:text-9xl leading-[0.88] tracking-wide uppercase mb-12 sm:mb-16"
          >
            IDEAS <br />
            <span className="text-[#F5D52F]">INTO REALITY.</span>
          </h2>

          {/* Clean Editorial Numbered List (Matching Screen 07 in Reference) */}
          <div
            ref={listRef}
            className="max-w-2xl divide-y divide-white/[0.08] border-y border-white/[0.08] mb-12"
          >
            {projects.map((project) => (
              <button
                key={project.id}
                onClick={() => handleOpenProject(project)}
                className="w-full py-5 sm:py-6 flex items-start justify-between text-left group cursor-pointer transition-colors hover:bg-white/[0.015] px-2 sm:px-4 -mx-2 sm:-mx-4 rounded-xl"
              >
                <div className="flex items-start gap-4 sm:gap-6">
                  {/* Number */}
                  <span className="font-mono text-xs sm:text-sm text-[#F5D52F] font-bold tracking-wider pt-1">
                    {project.number}
                  </span>

                  {/* Title & Short Description */}
                  <div className="space-y-1">
                    <h3 className="font-display text-2xl sm:text-4xl text-[#F2F0E8] group-hover:text-[#F5D52F] tracking-wide uppercase transition-colors">
                      {project.title}
                    </h3>
                    <p className="font-sans text-xs sm:text-sm text-[#8A8A8A] line-clamp-1 max-w-md">
                      {project.subtitle || project.description}
                    </p>
                  </div>
                </div>

                {/* Arrow */}
                <div className="p-2 text-[#8A8A8A] group-hover:text-[#F5D52F] group-hover:translate-x-1 group-hover:-translate-y-1 transition-all">
                  <ArrowUpRight size={20} />
                </div>
              </button>
            ))}

            {/* Item 05: More Projects */}
            <div className="py-5 sm:py-6 flex items-start justify-between text-left px-2 sm:px-4 -mx-2 sm:-mx-4 opacity-70">
              <div className="flex items-start gap-4 sm:gap-6">
                <span className="font-mono text-xs sm:text-sm text-[#8A8A8A] font-bold tracking-wider pt-1">
                  0{projects.length + 1}
                </span>
                <div className="space-y-1">
                  <h3 className="font-display text-2xl sm:text-3xl text-[#8A8A8A] tracking-wide uppercase">
                    MORE PROJECTS
                  </h3>
                  <p className="font-sans text-xs sm:text-sm text-[#8A8A8A]/80">
                    Exploring, building, learning...
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Editorial Quote Card */}
          <div className="max-w-md p-4 sm:p-5 rounded-xl bg-white/[0.02] border border-white/[0.07] backdrop-blur-sm flex items-center gap-3">
            <div className="w-5 h-5 rounded-full bg-[#F5D52F]/15 text-[#F5D52F] flex items-center justify-center shrink-0">
              <Check size={13} strokeWidth={3} />
            </div>
            <p className="font-sans text-xs sm:text-sm text-[#8A8A8A] leading-relaxed">
              I love building products that solve real problems and make life easier.
            </p>
          </div>

        </div>
      </section>

      {/* Full-Screen Project Detail Modal */}
      <ProjectDetailModal
        project={selectedProject}
        onClose={handleCloseModal}
        onPrev={handlePrevProject}
        onNext={handleNextProject}
      />
    </>
  );
};
