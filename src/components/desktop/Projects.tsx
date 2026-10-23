import React, { useRef, useState } from 'react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { portfolioData, Project } from '../../../data';
import { ProjectDesktop } from './work/ProjectDesktop';
import { ProjectMobile } from './work/ProjectMobile';
import { ProjectDetailModal } from './ProjectDetailModal';
import { scrollToTarget } from '../../utils/scroll';
import { useMediaQuery } from '../../utils/useMediaQuery';

export const Projects: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const scrollTriggerRef = useRef<ScrollTrigger | null>(null);

  const [activeIndex, setActiveIndex] = useState(0);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const projects = portfolioData.projects;

  // Responsive mode: Desktop & Tablet (>= 768px) vs Mobile (< 768px)
  const isDesktopOrTablet = useMediaQuery('(min-width: 768px)');

  // Navigate to previous project
  const handlePrev = () => {
    const nextIdx = activeIndex > 0 ? activeIndex - 1 : projects.length - 1;
    setActiveIndex(nextIdx);
    syncScrollToProject(nextIdx);
  };

  // Navigate to next project
  const handleNext = () => {
    const nextIdx = activeIndex < projects.length - 1 ? activeIndex + 1 : 0;
    setActiveIndex(nextIdx);
    syncScrollToProject(nextIdx);
  };

  // Direct select project
  const handleSelect = (idx: number) => {
    setActiveIndex(idx);
    syncScrollToProject(idx);
  };

  // Synchronize desktop scroll position when navigating via buttons
  const syncScrollToProject = (idx: number) => {
    const st = scrollTriggerRef.current;
    if (!st || window.innerWidth < 768) return;

    const progress = (idx + 0.3) / projects.length;
    const targetY = st.start + progress * (st.end - st.start);
    scrollToTarget(targetY);
  };

  return (
    <section
      id="work"
      ref={sectionRef}
      className="work relative w-full bg-[#07080a] text-white border-t border-zinc-800/80 overflow-hidden"
      style={{ isolation: 'isolate' }}
    >
      {/* Responsive Rendering: Never mount both desktop showcase and mobile expandable list together */}
      {isDesktopOrTablet ? (
        <ProjectDesktop
          sectionRef={sectionRef}
          projects={projects}
          active={activeIndex}
          setActiveIndex={setActiveIndex}
          onSelect={handleSelect}
          onPrev={handlePrev}
          onNext={handleNext}
          onOpenModal={setSelectedProject}
          scrollTriggerRef={scrollTriggerRef}
        />
      ) : (
        <ProjectMobile
          projects={projects}
          onOpenModal={setSelectedProject}
        />
      )}

      {/* Interactive Project Deep Dive Modal */}
      <ProjectDetailModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
        onPrev={handlePrev}
        onNext={handleNext}
        hasPrev={true}
        hasNext={true}
      />
    </section>
  );
};
