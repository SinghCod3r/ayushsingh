import React from 'react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { PageLoader } from './PageLoader';
import { Navbar } from './Navbar';
import { PersistentPortraitSequence } from './PersistentPortraitSequence';
import { Hero } from './Hero';
import { About } from './About';
import { WhatIDo } from './WhatIDo';
import { TechStack } from './TechStack';
import { Projects } from './Projects';
import { OpenSource } from './OpenSource';
import { AboutJourney } from './AboutJourney';
import { Speaking } from './Speaking';
import { Contact } from './Contact';
import { Footer } from './Footer';

export const DesktopApp: React.FC = () => {
  return (
    <div className="relative min-h-screen bg-[#08080a] text-zinc-100 overflow-x-hidden selection:bg-amber-500/20 selection:text-amber-200">
      {/* 00. Minimal Cinematic Text Intro: "SINGH CODE 3R" */}
      <PageLoader
        onComplete={() => {
          ScrollTrigger.sort();
          ScrollTrigger.refresh();
        }}
      />

      {/* Persistent Minimal Editorial Navigation */}
      <Navbar />

      {/* Persistent Cinematic Portrait Sequence Canvas */}
      <PersistentPortraitSequence />

      {/* Page Flow: Story Chapters */}
      <main className="relative z-10 w-full">
        {/* 01. Hero: Spacious 2-Column Identity & Visual */}
        <Hero />

        {/* 02. About: Concise Editorial Statement & 4 Core Pillars */}
        <About />

        {/* 03. What I Do: 01 to 05 Numbered Capabilities */}
        <WhatIDo />

        {/* 04. Tech Stack: Typographic Matrix (Languages, Frontend, Backend, Systems) */}
        <TechStack />

        {/* 05. Selected Work: Editorial Showcase of Real Production Projects */}
        <Projects />

        {/* 06. Open Source: The Linux Foundation / OpenPrinting Maintainer */}
        <OpenSource />

        {/* 07. Experience: Concise Editorial Journey & Track Record */}
        <AboutJourney />

        {/* 08. Speaking & Writings: Conference Keynote & Published Systems Articles */}
        <Speaking />

        {/* 09. Contact: Large Typography "LET'S BUILD SOMETHING." */}
        <Contact />
      </main>

      {/* 10. Clean Minimal Footer */}
      <Footer />
    </div>
  );
};

export default DesktopApp;
