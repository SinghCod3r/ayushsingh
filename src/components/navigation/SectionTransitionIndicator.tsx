"use client";

import React, { useState, useEffect, useRef } from "react";
import { Zap, ChevronDown, Radio, Activity } from "lucide-react";

export const portfolioSections = [
  { id: "hero", sector: "01", label: "IDENTITY & OVERVIEW", short: "IDENTITY" },
  { id: "open-source", sector: "02", label: "OPEN SOURCE ARCHITECTURE", short: "OPEN SOURCE" },
  { id: "projects", sector: "03", label: "FEATURED SYSTEMS & EXPERIMENTS", short: "SYSTEMS" },
  { id: "tech-stack", sector: "04", label: "PRACTICAL TECH STACK", short: "TECH STACK" },
  { id: "writing-books", sector: "05", label: "PUBLICATIONS & WRITING", short: "BOOKS & ESSAYS" },
  { id: "speaking", sector: "06", label: "KEYNOTES & COMMUNITY", short: "SPEAKING" },
  { id: "experience", sector: "07", label: "TRAJECTORY & EXPERIENCE", short: "EXPERIENCE" },
  { id: "about", sector: "08", label: "ENGINEERING PHILOSOPHY", short: "PHILOSOPHY" },
  { id: "contact", sector: "09", label: "COMMUNICATION CONSOLE", short: "CONTACT" },
];

export function SectionTransitionIndicator() {
  const [activeSector, setActiveSector] = useState(portfolioSections[0]);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [showNotification, setShowNotification] = useState(false);
  const [scanBeamKey, setScanBeamKey] = useState(0);
  const previousSectorId = useRef("hero");
  const notificationTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPos = window.scrollY + window.innerHeight * 0.35;
      let current = portfolioSections[0];

      for (let i = portfolioSections.length - 1; i >= 0; i--) {
        const sec = portfolioSections[i];
        const el = document.getElementById(sec.id);
        if (el && el.offsetTop <= scrollPos) {
          current = sec;
          break;
        }
      }

      if (current.id !== previousSectorId.current) {
        previousSectorId.current = current.id;
        setActiveSector(current);
        setIsTransitioning(true);
        setShowNotification(true);
        setScanBeamKey((prev) => prev + 1);

        if (notificationTimeoutRef.current) {
          clearTimeout(notificationTimeoutRef.current);
        }

        notificationTimeoutRef.current = setTimeout(() => {
          setShowNotification(false);
          setIsTransitioning(false);
        }, 2600);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (notificationTimeoutRef.current) {
        clearTimeout(notificationTimeoutRef.current);
      }
    };
  }, []);

  const currentIndex = portfolioSections.findIndex((s) => s.id === activeSector.id);
  const totalCount = portfolioSections.length;

  return (
    <>
      {/* 1. Full-screen Holographic Laser Scanner Beam that sweeps on section change */}
      {isTransitioning && (
        <div
          key={`scanbeam-${scanBeamKey}`}
          aria-hidden="true"
          className="fixed top-0 left-0 right-0 h-[2px] z-50 pointer-events-none overflow-hidden"
        >
          <div className="w-full h-full bg-gradient-to-r from-transparent via-[#00f5d4] to-transparent shadow-[0_0_20px_#00f5d4] animate-section-scanline" />
        </div>
      )}

      {/* 2. Floating Cybernetic Section Transition Banner (Flashes when moving to a new section) */}
      <aside
        aria-live="polite"
        className={`fixed top-18 sm:top-20 right-3 sm:right-6 z-40 transition-all duration-500 pointer-events-none select-none max-w-[calc(100vw-1.5rem)] ${
          showNotification
            ? "opacity-100 translate-y-0 scale-100"
            : "opacity-0 -translate-y-4 scale-95 pointer-events-none"
        }`}
      >
        <div className="relative p-[1px] rounded-2xl bg-gradient-to-r from-[#00f5d4]/60 via-[#38bdf8]/50 to-[#a855f7]/40 shadow-[0_12px_40px_rgba(0,245,212,0.22)] backdrop-blur-xl">
          <div className="bg-[#090d15]/95 rounded-2xl px-3.5 sm:px-4 py-2.5 sm:py-3 flex items-center gap-3 border border-white/10">
            {/* Pulsing telemetry node */}
            <div className="relative flex items-center justify-center shrink-0">
              <span className="w-2.5 h-2.5 rounded-full bg-[#00f5d4] animate-ping absolute" />
              <span className="w-2.5 h-2.5 rounded-full bg-[#00f5d4] relative" />
            </div>

            {/* Transition Details */}
            <div className="flex flex-col">
              <div className="flex items-center gap-2 font-mono text-[10px] text-[#00f5d4] tracking-widest uppercase">
                <Radio className="w-3 h-3 text-[#00f5d4] animate-pulse" />
                <span>ENTERING SECTOR {activeSector.sector}</span>
                <span className="text-neutral-500">//</span>
                <span className="text-neutral-400">
                  [{activeSector.sector}/{totalCount < 10 ? `0${totalCount}` : totalCount}]
                </span>
              </div>
              <span className="text-xs sm:text-sm font-bold text-white font-mono tracking-tight truncate max-w-[240px] sm:max-w-[320px]">
                {activeSector.label}
              </span>
            </div>

            {/* Audio/Data Wave Graphic */}
            <div className="hidden sm:flex items-center gap-0.5 h-4 pl-2 border-l border-white/10 shrink-0">
              <span className="w-1 bg-[#00f5d4] rounded-full animate-soundwave-1" />
              <span className="w-1 bg-[#38bdf8] rounded-full animate-soundwave-2" />
              <span className="w-1 bg-[#a855f7] rounded-full animate-soundwave-3" />
              <span className="w-1 bg-[#00f5d4] rounded-full animate-soundwave-4" />
            </div>
          </div>
        </div>
      </aside>

      {/* 3. Persistent Corner Sector Telemetry HUD (Bottom Right on Desktop) */}
      <div
        aria-hidden="true"
        className="fixed bottom-4 right-4 z-30 hidden md:flex items-center gap-2.5 px-3 py-1.5 rounded-full bg-[#0a0e17]/80 backdrop-blur-md border border-white/10 font-mono text-[10px] text-neutral-400 select-none hover:border-[#00f5d4]/40 transition group pointer-events-auto"
        title={`Active Sector: ${activeSector.label}`}
      >
        <Activity className="w-3 h-3 text-[#00f5d4] animate-pulse" />
        <span className="text-white font-semibold">{activeSector.sector}</span>
        <span className="text-neutral-600">//</span>
        <span className="text-neutral-300 tracking-wider truncate max-w-[130px]">
          {activeSector.short}
        </span>
        <div className="w-12 h-1 bg-white/10 rounded-full overflow-hidden ml-1">
          <div
            className="h-full bg-gradient-to-r from-[#00f5d4] to-[#38bdf8] transition-all duration-300"
            style={{ width: `${((currentIndex + 1) / totalCount) * 100}%` }}
          />
        </div>
      </div>
    </>
  );
}
