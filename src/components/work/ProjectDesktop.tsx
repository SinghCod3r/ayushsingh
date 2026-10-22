import React, { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { Project } from '../../../data';
import { ProjectShowcase } from './ProjectShowcase';
import { WorkMarquee } from './WorkMarquee';

gsap.registerPlugin(ScrollTrigger);

interface ProjectDesktopProps {
  sectionRef: React.RefObject<HTMLElement | null>;
  projects: Project[];
  active: number;
  setActiveIndex: (idx: number) => void;
  onSelect: (idx: number) => void;
  onPrev: () => void;
  onNext: () => void;
  onOpenModal: (project: Project) => void;
  scrollTriggerRef: React.MutableRefObject<ScrollTrigger | null>;
}

export const ProjectDesktop: React.FC<ProjectDesktopProps> = ({
  sectionRef,
  projects,
  active,
  setActiveIndex,
  onSelect,
  onPrev,
  onNext,
  onOpenModal,
  scrollTriggerRef,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const section = sectionRef.current || containerRef.current?.closest('section');
      const container = containerRef.current;
      if (!section || !container) return;

      const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      if (prefersReducedMotion) return;

      const mm = gsap.matchMedia();

      // ==============================================================
      // DESKTOP: CINEMATIC PINNED PROJECT SHOWCASE (1024px+)
      // ==============================================================
      mm.add('(min-width: 1024px)', () => {
        const getScrollDistance = () => window.innerHeight * (projects.length * 0.75);

        const tl = gsap.timeline({
          scrollTrigger: {
            id: 'WORK',
            trigger: section,
            start: 'top top',
            end: () => `+=${getScrollDistance()}`,
            pin: true,
            pinSpacing: true,
            scrub: 0.8,
            invalidateOnRefresh: true,
            anticipatePin: 1,
            refreshPriority: 3,
            onUpdate: (self) => {
              const targetIndex = Math.min(
                projects.length - 1,
                Math.floor(self.progress * projects.length)
              );
              setActiveIndex(targetIndex);
            },
          },
        });

        scrollTriggerRef.current = tl.scrollTrigger || null;
      });

      // ==============================================================
      // TABLET: BALANCED PINNED SHOWCASE (768px – 1023px)
      // ==============================================================
      mm.add('(min-width: 768px) and (max-width: 1023px)', () => {
        const getScrollDistance = () => window.innerHeight * (projects.length * 0.6);

        const tl = gsap.timeline({
          scrollTrigger: {
            id: 'WORK_TABLET',
            trigger: section,
            start: 'top top',
            end: () => `+=${getScrollDistance()}`,
            pin: true,
            pinSpacing: true,
            scrub: 0.8,
            invalidateOnRefresh: true,
            anticipatePin: 1,
            refreshPriority: 3,
            onUpdate: (self) => {
              const targetIndex = Math.min(
                projects.length - 1,
                Math.floor(self.progress * projects.length)
              );
              setActiveIndex(targetIndex);
            },
          },
        });

        scrollTriggerRef.current = tl.scrollTrigger || null;
      });

      return () => {
        mm.revert();
      };
    },
    { scope: containerRef }
  );

  return (
    <div
      ref={containerRef}
      className="work-desktop w-full h-screen overflow-hidden flex flex-col justify-between relative z-10 select-none py-6"
    >
      {/* Background Kinetic Two-Line Moving Marquee */}
      <WorkMarquee />

      {/* Project Showcase Stage */}
      <ProjectShowcase
        projects={projects}
        active={active}
        onSelect={onSelect}
        onPrev={onPrev}
        onNext={onNext}
        onOpenModal={onOpenModal}
      />
    </div>
  );
};
