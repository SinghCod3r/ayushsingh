import React, { useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { initSmoothScroll } from './utils/scroll';
import { DesktopApp } from './components/desktop/DesktopApp';
import { MobileApp } from './components/mobile/MobileApp';

gsap.registerPlugin(ScrollTrigger);
if (typeof window !== 'undefined') {
  (window as any).ScrollTrigger = ScrollTrigger;
  (window as any).gsap = gsap;
}

export const App: React.FC = () => {
  useEffect(() => {
    // Initialize Lenis smooth virtual scroll (automatically bypassed on mobile < 768px)
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
    <div className="relative min-h-screen bg-[#08080a] text-zinc-100 overflow-x-hidden selection:bg-amber-500/30 selection:text-amber-200">
      {/* Desktop Composition (>= 768px) */}
      <div className="hidden md:block">
        <DesktopApp />
      </div>

      {/* Dedicated Mobile Composition (< 768px) */}
      <div className="block md:hidden">
        <MobileApp />
      </div>
    </div>
  );
};

export default App;
