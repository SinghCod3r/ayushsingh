import React, { useEffect, useState } from 'react';
import { director } from './engine/director';
import { frameStore } from './engine/frames';
import { Stage } from './components/Stage';
import { Layers } from './components/Layers';
import { Preloader, HUD, Cursor } from './components/Chrome';

import { Hero } from './scenes/Hero';
import { About } from './scenes/About';
import { Work } from './scenes/Work';
import { Journey } from './scenes/Journey';
import { Skills } from './scenes/Skills';
import { Awards } from './scenes/Awards';
import { Contact } from './scenes/Contact';

export const App: React.FC = () => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Initialize frame store and director
    frameStore.init();
    director.init();

    return () => {
      director.destroy();
    };
  }, []);

  return (
    <div className="portfolio-app">
      {/* 1. Global Preloader (Split red halves with counter) */}
      <Preloader onComplete={() => setIsLoaded(true)} />

      {/* 2. HUD & Custom Cursor */}
      <HUD />
      <Cursor />

      {/* 3. Layer Architecture: */}
      {/* z0: Fixed .layer-back (behind person) */}
      {/* z2: Fixed .layer-front (front half of orbit) */}
      <Layers />

      {/* z1: Fixed Canvas Stage */}
      <Stage />

      {/* z3: Main Scroll Container */}
      <main id="main-content">
        <Hero />
        <About />
        <Work />
        <Journey />
        <Skills />
        <Awards />
        <Contact />
      </main>
    </div>
  );
};
export default App;

