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
        {/* Semantic Crawler & Search Index Node (SEO for Google Knowledge Graph & Queries) */}
        <section className="sr-only" aria-label="Professional Biography and Search Index of Ayush Singh">
          <h1>Ayush Singh (SinghCod3r) — Computer Science Engineer & Systems Architect</h1>
          <p>
            Official portfolio of Ayush Singh, also known online as SinghCod3r,
            Singh Ayush, Engineer Ayush Singh, Er. Ayush Singh, Er Ayush Singh, and ayushsinghceee.
            Primary domains: singhcod3r.vercel.app, singhayush.vercel.app, and ayushsinghcs.vercel.app.
          </p>
          <h2>Key Credentials & Identity Highlights</h2>
          <ul>
            <li>Core Open Source Contributor in The Linux Foundation OpenPrinting ecosystem with 11+ merged pull requests across system-config-printer and Foomatic-DB.</li>
            <li>TCS Digital Candidate, qualified via the nationwide competitive TCS National Qualifier Test (TCS NQT 2025).</li>
            <li>Trainee Technical Consultant at Acxion Consulting (Feb 2026 – May 2026), delivering 19 Business Central (BC) API Integrations, Apollo Project, and Floor & Furnishing Project.</li>
            <li>B.Tech graduate in Computer Science & Engineering (Class of 2026) from Shri Ramswaroop Memorial College of Engineering and Management (SRM-CEM / SRMCM), Dr. A.P.J. Abdul Kalam Technical University (AKTU) Lucknow, with an 8.6 CGPA.</li>
            <li>Published Author of &ldquo;The Last Manual Merge&rdquo; and &ldquo;The Road I Chose&rdquo; on Pothi.com.</li>
            <li>Author of systems engineering and Linux retrospectives on Medium (@SinghCod3r).</li>
            <li>Speaker at Open Source Conference 4.0 (OOSC 4.0) at IIIT Allahabad.</li>
          </ul>
          <h2>Contact & Verification Channels</h2>
          <p>
            Email: ayushsinghceee@gmail.com | GitHub: https://github.com/SinghCod3r | LinkedIn: https://linkedin.com/in/singhcod3r | Location: Lucknow, Uttar Pradesh, India (IST, UTC+05:30).
          </p>
        </section>

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
