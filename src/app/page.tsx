"use client";

import React from "react";
import { CanvasBackground } from "@/components/three/CanvasBackground";
import { CinematicIntro } from "@/components/intro/CinematicIntro";
import { CustomCursor } from "@/components/ui/CustomCursor";
import { FloatingNav } from "@/components/navigation/FloatingNav";
import { SectionTransitionIndicator } from "@/components/navigation/SectionTransitionIndicator";
import { SectionBridge } from "@/components/ui/SectionBridge";
import { HeroIdentity } from "@/components/hero/HeroIdentity";
import { OpenSourceSection } from "@/components/open-source/OpenSourceSection";
import { ProjectsSection } from "@/components/projects/ProjectsSection";
import { TechStackSection } from "@/components/tech-stack/TechStackSection";
import { WritingBooksSection } from "@/components/writing-books/WritingBooksSection";
import { SpeakingSection } from "@/components/speaking/SpeakingSection";
import { ExperienceSection } from "@/components/experience/ExperienceSection";
import { AboutPhilosophy } from "@/components/about/AboutPhilosophy";
import { ContactSection } from "@/components/contact/ContactSection";
import { GiantFooter } from "@/components/footer/GiantFooter";

export default function Home() {
  return (
    <div className="relative min-h-screen bg-[#08090c] text-[#f1f3f7] selection:bg-[#00f5d4]/20 selection:text-white overflow-x-hidden">
      {/* Background Interactive Three.js WebGL Scene */}
      <CanvasBackground />

      {/* Cinematic Opening & Identity Reveal Experience */}
      <CinematicIntro />

      {/* Modern Colorful Interactive Cursor & Click Particle Ripple */}
      <CustomCursor />

      {/* Floating Glassmorphism Navigation */}
      <FloatingNav />

      {/* Section Transition Indicator & Holographic Scan Beam */}
      <SectionTransitionIndicator />

      {/* Main Narrative Flow */}
      <main className="relative z-10 flex flex-col gap-6 sm:gap-10 w-full overflow-x-hidden">
        {/* Section 01: Hero Identity */}
        <HeroIdentity />

        <SectionBridge
          fromSector="01"
          fromName="IDENTITY"
          toSector="02"
          toName="OPEN SOURCE"
          nextHref="#open-source"
        />

        {/* Section 02: Open Source Contributions & UI Freeze Architecture */}
        <OpenSourceSection />

        <SectionBridge
          fromSector="02"
          fromName="OPEN SOURCE"
          toSector="03"
          toName="SYSTEMS"
          nextHref="#projects"
        />

        {/* Section 03: Featured Systems & Interactive Projects */}
        <ProjectsSection />

        <SectionBridge
          fromSector="03"
          fromName="SYSTEMS"
          toSector="04"
          toName="TECH STACK"
          nextHref="#tech-stack"
        />

        {/* Section 04: Practical Tech Stack & Systems Toolchain */}
        <TechStackSection />

        <SectionBridge
          fromSector="04"
          fromName="TECH STACK"
          toSector="05"
          toName="PUBLICATIONS"
          nextHref="#writing-books"
        />

        {/* Section 05: Books & Technical Writing */}
        <WritingBooksSection />

        <SectionBridge
          fromSector="05"
          fromName="PUBLICATIONS"
          toSector="06"
          toName="SPEAKING"
          nextHref="#speaking"
        />

        {/* Section 06: Conference Speaking & Community Dialogue */}
        <SpeakingSection />

        <SectionBridge
          fromSector="06"
          fromName="SPEAKING"
          toSector="07"
          toName="EXPERIENCE"
          nextHref="#experience"
        />

        {/* Section 07: Trajectory & Professional Experience */}
        <ExperienceSection />

        <SectionBridge
          fromSector="07"
          fromName="EXPERIENCE"
          toSector="08"
          toName="PHILOSOPHY"
          nextHref="#about"
        />

        {/* Section 08: Engineering Philosophy & The Continuum */}
        <AboutPhilosophy />

        <SectionBridge
          fromSector="08"
          fromName="PHILOSOPHY"
          toSector="09"
          toName="CONTACT"
          nextHref="#contact"
        />

        {/* Section 09: Direct Contact & Communication Console */}
        <ContactSection />
      </main>

      {/* Section 10: Monumental Giant AYUSH SINGH Footer */}
      <GiantFooter />
    </div>
  );
}
