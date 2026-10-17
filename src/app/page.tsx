"use client";

import React from "react";
import { CanvasBackground } from "@/components/three/CanvasBackground";
import { CinematicIntro } from "@/components/intro/CinematicIntro";
import { CustomCursor } from "@/components/ui/CustomCursor";
import { FloatingNav } from "@/components/navigation/FloatingNav";
import { SectionReveal } from "@/components/ui/SectionReveal";
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

      {/* Main Narrative Flow with Animated Coming & Going for Every Section */}
      <main className="relative z-10 flex flex-col gap-12 sm:gap-20 w-full overflow-x-hidden">
        {/* Section 01: Hero Identity */}
        <SectionReveal>
          <HeroIdentity />
        </SectionReveal>

        {/* Section 02: Open Source Contributions & UI Freeze Architecture */}
        <SectionReveal>
          <OpenSourceSection />
        </SectionReveal>

        {/* Section 03: Featured Systems & Interactive Projects */}
        <SectionReveal>
          <ProjectsSection />
        </SectionReveal>

        {/* Section 04: Practical Tech Stack & Systems Toolchain */}
        <SectionReveal>
          <TechStackSection />
        </SectionReveal>

        {/* Section 05: Books & Technical Writing */}
        <SectionReveal>
          <WritingBooksSection />
        </SectionReveal>

        {/* Section 06: Conference Speaking & Community Dialogue */}
        <SectionReveal>
          <SpeakingSection />
        </SectionReveal>

        {/* Section 07: Trajectory & Professional Experience */}
        <SectionReveal>
          <ExperienceSection />
        </SectionReveal>

        {/* Section 08: Engineering Philosophy & The Continuum */}
        <SectionReveal>
          <AboutPhilosophy />
        </SectionReveal>

        {/* Section 09: Direct Contact & Communication Console */}
        <SectionReveal>
          <ContactSection />
        </SectionReveal>
      </main>

      {/* Section 10: Monumental Giant AYUSH SINGH Footer */}
      <GiantFooter />
    </div>
  );
}
