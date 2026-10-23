import React, { useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { initSmoothScroll } from './utils/scroll';

gsap.registerPlugin(ScrollTrigger);
if (typeof window !== 'undefined') {
  (window as any).ScrollTrigger = ScrollTrigger;
  (window as any).gsap = gsap;
}

import { MouseFollower } from './components/MouseFollower';
import { PageLoader } from './components/PageLoader';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { AboutJourney } from './components/AboutJourney';
import { OpenSource } from './components/OpenSource';
import { Skills } from './components/Skills';
import { Projects } from './components/Projects';
import { Writings } from './components/Writings';
import { Speaking } from './components/Speaking';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';

export const App: React.FC = () => {
  useEffect(() => {
    // Initialize Lenis smooth virtual scroll
    const lenis = initSmoothScroll();
    if (typeof window !== 'undefined') {
      (window as any).lenis = lenis;
    }

    ScrollTrigger.sort();
    ScrollTrigger.refresh();

    const timer = setTimeout(() => {
      ScrollTrigger.sort();
      ScrollTrigger.refresh();
    }, 400);

    return () => {
      clearTimeout(timer);
      lenis?.destroy();
    };
  }, []);

  return (
    <div className="relative min-h-screen bg-[#080909] text-[#F2F0E8] overflow-x-hidden selection:bg-[#F5D52F]/30 selection:text-[#F5D52F]">
      {/* 01. Cinematic Intro Preloader (3-3.5s) */}
      <PageLoader
        onComplete={() => {
          ScrollTrigger.sort();
          ScrollTrigger.refresh();
        }}
      />

      {/* Desktop Fluid Mouse Follower (Disabled on Touch / Reduced Motion) */}
      <MouseFollower />

      {/* Global Minimalist Navigation Bar */}
      <Navbar />

      {/* Main Editorial Story Flow */}
      <main className="relative w-full">
        {/* 02. Hero Section (Controlled Frame Progression) */}
        <Hero />

        {/* 03. About: I BUILD THINGS. */}
        <About />

        {/* 04. Journey: Vertical Timeline A PATH OF BUILDING. */}
        <AboutJourney />

        {/* 05. Open Source: REAL CONTRIBUTIONS. REAL IMPACT. */}
        <OpenSource />

        {/* 06. Skills: TOOLS I WORK WITH. */}
        <Skills />

        {/* 07. Work: IDEAS INTO REALITY. */}
        <Projects />

        {/* 08. Writings: I ALSO TALK ABOUT TECHNOLOGY. */}
        <Writings />

        {/* 09. Talks: SHARING WHAT I LEARN. */}
        <Speaking />

        {/* 10. Contact: LET'S DO SOMETHING COOL. */}
        <Contact />
      </main>

      {/* Editorial Footer */}
      <Footer />
    </div>
  );
};

export default App;
