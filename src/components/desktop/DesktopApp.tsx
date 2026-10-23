import React from 'react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { MouseFollower } from './MouseFollower';
import { PageLoader } from './PageLoader';
import { Navbar } from './Navbar';
import { Hero } from './Hero';
import { SignatureLine } from './SignatureLine';
import { About } from './About';
import { AboutJourney } from './AboutJourney';
import { OpenSource } from './OpenSource';
import { Skills } from './Skills';
import { Projects } from './Projects';
import { Writings } from './Writings';
import { Speaking } from './Speaking';
import { Contact } from './Contact';
import { Footer } from './Footer';

export const DesktopApp: React.FC = () => {
  return (
    <div className="relative min-h-screen bg-[#08080a] text-zinc-100 overflow-x-hidden selection:bg-amber-500/30 selection:text-amber-200">
      {/* 00. Initial Page-load Animation: Individual Letter Behavior (singhcod3r) */}
      <PageLoader
        onComplete={() => {
          ScrollTrigger.sort();
          ScrollTrigger.refresh();
        }}
      />

      {/* Skipper UI Fluid Mouse Follower & Spotlight Glow */}
      <MouseFollower />

      {/* Persistent Navigation */}
      <Navbar />

      {/* Page Flow: Story Chapters */}
      <main className="relative w-full">
        {/* 01. Hero with 192-frame Canvas Sequence */}
        <Hero />

        {/* Signature SVG Line Text Effect */}
        <SignatureLine />

        {/* 02. About: Profile & Engineering Philosophy */}
        <About />

        {/* 03. Journey: Pinned Horizontal Timeline (2022 -> 2026) */}
        <AboutJourney />

        {/* 04. Open Source: Upstream Leadership */}
        <OpenSource />

        {/* 05. Visual & Interactive Skills (3D Core) */}
        <Skills />

        {/* 06. Production Projects (Work) */}
        <Projects />

        {/* 07. Writings & Publications */}
        <Writings />

        {/* 08. Speaking & Keynotes */}
        <Speaking />

        {/* 09. Contact & Closing */}
        <Contact />
      </main>

      {/* 10. Editorial Footer */}
      <Footer />
    </div>
  );
};
