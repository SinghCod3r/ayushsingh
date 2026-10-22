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
import { SignatureLine } from './components/SignatureLine';
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
    // Initialize Lenis smooth scrolling and synchronize with GSAP ScrollTrigger
    const lenis = initSmoothScroll();
    if (typeof window !== 'undefined') {
      (window as any).lenis = lenis;
    }

    // Ensure all triggers created across components are sorted by DOM order
    ScrollTrigger.sort();
    ScrollTrigger.refresh();

    // Refresh again after fonts and images finish layout
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

export default App;
