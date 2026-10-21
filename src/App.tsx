import React, { useEffect, useState } from 'react';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import { IntroLoader } from './components/IntroLoader';
import { Navbar } from './components/Navbar';
import { CinemaAmbient } from './components/CinemaAmbient';

import { Hero } from './scenes/Hero';
import { About } from './scenes/About';
import { Skills } from './scenes/Skills';
import { Projects } from './scenes/Projects';
import { OpenSource } from './scenes/OpenSource';
import { Journey } from './scenes/Journey';
import { Achievements } from './scenes/Achievements';
import { Contact } from './scenes/Contact';

gsap.registerPlugin(ScrollTrigger);

export const App: React.FC = () => {
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    // Initialize Lenis smooth virtual scroll
    const lenis = new Lenis({
      lerp: 0.085,
      smoothWheel: true,
      wheelMultiplier: 0.9,
      syncTouch: false,
      touchMultiplier: 1.0,
    });

    lenis.on('scroll', ScrollTrigger.update);

    const tickerCallback = (time: number) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(tickerCallback);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(tickerCallback);
      lenis.destroy();
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <div className="portfolio-app-root">
      {/* 1. Cinematic Intro Preloader */}
      <IntroLoader onComplete={() => setIsReady(true)} />

      {/* 2. Top Navigation Bar */}
      <Navbar />

      {/* 3. 10% Cinematic Ambient Video Layer */}
      <CinemaAmbient />

      {/* 4. Film Grain Texture Overlay */}
      <div className="film-grain-overlay" aria-hidden="true" />

      {/* 5. Main Scroll Journey Container */}
      <main id="main-content" className={`main-scroll-flow ${isReady ? 'content-ready' : ''}`}>
        <Hero />
        <About />
        <Skills />
        <Projects />
        <OpenSource />
        <Journey />
        <Achievements />
        <Contact />
      </main>
    </div>
  );
};

export default App;
