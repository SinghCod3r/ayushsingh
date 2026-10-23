import React from 'react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { MobilePageLoader } from './MobilePageLoader';
import { MobileNavbar } from './MobileNavbar';
import { MobileHero } from './MobileHero';
import { MobileAbout } from './MobileAbout';
import { MobileJourney } from './MobileJourney';
import { MobileOpenSource } from './MobileOpenSource';
import { MobileSkills } from './MobileSkills';
import { MobileWork } from './MobileWork';
import { MobileWritings } from './MobileWritings';
import { MobileSpeaking } from './MobileSpeaking';
import { MobileContact } from './MobileContact';
import { MobileFooter } from './MobileFooter';

export const MobileApp: React.FC = () => {
  return (
    <div className="relative min-h-screen bg-[#080909] text-[#F2F0E8] overflow-x-hidden selection:bg-[#F5D52F]/30 selection:text-[#F5D52F]">
      {/* 01. Mobile Cinematic Intro (3-3.5s) */}
      <MobilePageLoader
        onComplete={() => {
          ScrollTrigger.refresh();
        }}
      />

      {/* 02. Minimalist Mobile Header */}
      <MobileNavbar />

      <main className="relative w-full">
        {/* 02. Mobile Hero (Strongest screen, fits in ~1 viewport) */}
        <MobileHero />

        {/* 03. About: I BUILD THINGS. */}
        <MobileAbout />

        {/* 04. Journey: A PATH OF BUILDING. */}
        <MobileJourney />

        {/* 05. Open Source: REAL CONTRIBUTIONS. REAL IMPACT. */}
        <MobileOpenSource />

        {/* 06. Skills: TOOLS I WORK WITH. */}
        <MobileSkills />

        {/* 07. Work: IDEAS INTO REALITY. */}
        <MobileWork />

        {/* 08. Writings: I ALSO TALK ABOUT TECHNOLOGY. */}
        <MobileWritings />

        {/* 09. Talks: SHARING WHAT I LEARN. */}
        <MobileSpeaking />

        {/* 10. Contact: LET'S DO SOMETHING COOL. */}
        <MobileContact />
      </main>

      {/* Mobile Editorial Footer */}
      <MobileFooter />
    </div>
  );
};
