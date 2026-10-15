"use client";

import React, { useState } from "react";
import { CanvasBackground } from "@/components/three/CanvasBackground";
import { CinematicIntro } from "@/components/intro/CinematicIntro";
import { FloatingNav } from "@/components/navigation/FloatingNav";
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
  const [replayKey, setReplayKey] = useState(0);

  const handleReplayIntro = () => {
    // Reset session storage flag and trigger forcePlay
    if (typeof window !== "undefined") {
      sessionStorage.removeItem("ayush_singh_intro_seen");
      window.scrollTo({ top: 0, behavior: "smooth" });
      setReplayKey((prev) => prev + 1);
    }
  };

  return (
    <div className="relative min-h-screen bg-[#08090c] text-[#f1f3f7] selection:bg-[#00f5d4]/20 selection:text-white">
      {/* Background Interactive Three.js WebGL Scene */}
      <CanvasBackground />

      {/* Cinematic Opening & Identity Reveal Experience */}
      <CinematicIntro key={replayKey} forcePlay={replayKey > 0} />

      {/* Floating Glassmorphism Navigation */}
      <FloatingNav onReplayIntro={handleReplayIntro} />

      {/* Main Narrative Flow */}
      <main className="relative z-10 flex flex-col gap-12 sm:gap-16">
        {/* Section 01: Hero Identity */}
        <HeroIdentity />

        {/* Section 02: Open Source Contributions & UI Freeze Architecture */}
        <OpenSourceSection />

        {/* Section 03: Featured Systems & Interactive Projects */}
        <ProjectsSection />

        {/* Section 04: Practical Tech Stack & Systems Toolchain */}
        <TechStackSection />

        {/* Section 05: Books (The Last Human Update) & Technical Writing */}
        <WritingBooksSection />

        {/* Section 06: Conference Speaking & Community Dialogue */}
        <SpeakingSection />

        {/* Section 07: Trajectory & Professional Experience */}
        <ExperienceSection />

        {/* Section 08: Engineering Philosophy & The Continuum */}
        <AboutPhilosophy />

        {/* Section 09: Direct Contact & Communication Console */}
        <ContactSection />
      </main>

      {/* Section 10: Monumental Giant AYUSH SINGH Footer */}
      <GiantFooter onReplayIntro={handleReplayIntro} />
    </div>
  );
}
