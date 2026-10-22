import React, { useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { ArrowRight, ArrowUpRight, MousePointer2 } from 'lucide-react';
import { portfolioData } from '../../data';
import { scrollToTarget } from '../utils/scroll';
import { JourneyCard } from './journey/JourneyCard';

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

const MILESTONE_COLORS = ['#f59e0b', '#38bdf8', '#a855f7', '#10b981', '#f97316'];

export const AboutJourney: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const bgTextRef = useRef<HTMLDivElement>(null);
  const bridgeRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const scrollTriggerRef = useRef<ScrollTrigger | null>(null);

  const [activeMilestoneIndex, setActiveMilestoneIndex] = useState(0);
  const currentActiveRef = useRef(0);

  const journey = portfolioData.journey;

  // =========================================================================
  // GSAP SCROLLTRIGGER: SINGLE MASTER TIMELINE, SINGLE PIN OWNER
  // =========================================================================
  useGSAP(
    () => {
      const section = sectionRef.current;
      const track = trackRef.current;
      const bgText = bgTextRef.current;
      const bridge = bridgeRef.current;
      if (!section || !track) return;

      const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      if (prefersReducedMotion) return;

      const cards = cardRefs.current.filter(Boolean) as HTMLDivElement[];
      if (cards.length === 0) return;

      // Distance calculations
      const getScrollDistance = () => Math.max(0, track.scrollWidth - window.innerWidth);
      const getEndCushion = () => Math.max(window.innerWidth * 0.25, 260);
      const getTotalJourneyScroll = () => getScrollDistance() + getEndCushion();

      const horizontalDistance = getScrollDistance();
      const endCushion = getEndCushion();
      const totalJourneyScroll = horizontalDistance + endCushion;
      const moveRatio = totalJourneyScroll > 0 ? horizontalDistance / totalJourneyScroll : 1;

      // Deterministic, screen-independent milestone focus & motion
      const updateFocalStates = () => {
        const p = tl.progress();
        const numMilestones = journey.length;
        if (numMilestones <= 1) return;

        // Exact active index derived from timeline progress
        const targetIdx = Math.min(
          numMilestones - 1,
          Math.max(0, Math.round(p * (numMilestones - 1)))
        );

        // Update active milestone state only when index changes
        if (targetIdx !== currentActiveRef.current) {
          currentActiveRef.current = targetIdx;
          setActiveMilestoneIndex(targetIdx);
        }

        // Apply clean, subtle scale (1 -> 0.95) and opacity (1 -> 0.60)
        cards.forEach((card, idx) => {
          const cardP = idx / (numMilestones - 1);
          const dist = Math.abs(p - cardP);
          const ratio = Math.min(dist / 0.35, 1);

          const scale = 1 - ratio * 0.05;
          const opacity = 1 - ratio * 0.4;

          card.style.transform = `scale(${scale})`;
          card.style.opacity = `${opacity}`;
        });
      };

      // Master GSAP timeline with ONE single ScrollTrigger pinning the section itself
      const tl = gsap.timeline({
        onUpdate: updateFocalStates,
        scrollTrigger: {
          id: 'JOURNEY',
          trigger: section,
          start: 'top top',
          end: () => `+=${getTotalJourneyScroll()}`,
          pin: true,
          pinSpacing: true, // Native GSAP pin-spacer: exact scroll range, zero gaps, zero snapping
          scrub: 1,
          invalidateOnRefresh: true,
          anticipatePin: 1,
          refreshPriority: 5,
          onUpdate: updateFocalStates,
        },
      });

      // Save scrollTrigger instance for click-to-jump calculation
      scrollTriggerRef.current = tl.scrollTrigger || null;

      // 1. Foreground Track moves horizontally
      tl.to(
        track,
        {
          x: () => -getScrollDistance(),
          ease: 'none',
          duration: moveRatio,
        },
        0
      );

      // 2. Background Typography moves at slow parallax speed ~25%
      if (bgText) {
        tl.to(
          bgText,
          {
            x: () => -(getScrollDistance() * 0.25),
            ease: 'none',
            duration: moveRatio,
          },
          0
        );
      }

      // 3. Final 2026 stay & transition into Open Source
      if (bridge) {
        tl.fromTo(
          bridge,
          { opacity: 0.7, scale: 0.98 },
          { opacity: 1, scale: 1, duration: 1 - moveRatio, ease: 'power1.out' },
          moveRatio
        );
      }

      // Refresh on window resize
      const handleResize = () => {
        ScrollTrigger.refresh();
      };

      window.addEventListener('resize', handleResize);

      return () => {
        window.removeEventListener('resize', handleResize);
      };
    },
    { scope: sectionRef }
  );

  // =========================================================================
  // INTERACTIVE YEAR PILL CLICK-TO-JUMP
  // =========================================================================
  const scrollToMilestone = (index: number) => {
    const st = scrollTriggerRef.current;
    if (!st || journey.length <= 1) return;

    const targetProgress = index / (journey.length - 1);
    const targetScrollY = st.start + targetProgress * (st.end - st.start);

    scrollToTarget(targetScrollY);
  };

  return (
    <section
      id="journey"
      ref={sectionRef}
      className="journey relative w-full h-screen overflow-hidden border-t border-zinc-800/80 bg-[#08080a] text-white select-none flex flex-col justify-between py-5 sm:py-6 md:py-8"
      style={{ isolation: 'isolate' }}
    >
      {/* Ambient background illumination */}
      <div className="absolute top-1/4 right-1/4 w-[500px] h-[500px] bg-amber-500/5 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-1/3 left-1/4 w-[400px] h-[400px] bg-cyan-500/5 rounded-full blur-[130px] pointer-events-none" />

      {/* ================================================================= */}
      {/* 1. TOP HEADER (Stationary & Clean inside pinned viewport)         */}
      {/* ================================================================= */}
        <div className="max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 shrink-0 relative z-20">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-3">
            
            {/* Section Heading & Context */}
            <div className="space-y-1">
              <div className="flex items-center gap-3">
                <h2 className="font-display font-black text-2xl sm:text-3xl md:text-4xl lg:text-5xl tracking-tight text-white uppercase inline-block">
                  A QUICK JOURNEY.
                </h2>
                <span className="text-amber-400 font-mono text-base sm:text-lg font-normal opacity-75">
                  (03)
                </span>
              </div>

              <p className="text-zinc-400 text-xs sm:text-sm max-w-2xl font-sans leading-relaxed">
                Chronological trajectory from academic operating systems deep dives to Linux Foundation maintainership and conference keynotes.
              </p>
            </div>

            {/* Quick-Jump Milestone Year Bar & Scroll Hint */}
            <div className="flex flex-wrap items-center gap-2 self-start md:self-auto">
              <div className="flex items-center gap-1.5 p-1 rounded-full bg-zinc-900/80 border border-zinc-800/80 backdrop-blur-md">
                {journey.map((item, idx) => {
                  const isActive = activeMilestoneIndex === idx;
                  return (
                    <button
                      key={item.year}
                      onClick={() => scrollToMilestone(idx)}
                      className={`px-3 py-1 rounded-full text-xs font-mono transition-all cursor-pointer ${
                        isActive
                          ? 'bg-amber-400 text-black font-bold shadow-md shadow-amber-500/20'
                          : 'text-zinc-400 hover:text-white hover:bg-zinc-800/60'
                      }`}
                    >
                      {item.railLabel || item.year}
                    </button>
                  );
                })}
              </div>

              {/* Interaction hint */}
              <div className="hidden sm:inline-flex items-center gap-1.5 text-[11px] font-mono text-zinc-400 bg-zinc-900/70 border border-zinc-800/80 px-3 py-1.5 rounded-full backdrop-blur-sm">
                <MousePointer2 size={11} className="text-amber-400" />
                <span>VERTICAL SCROLL → HORIZONTAL TIMELINE</span>
              </div>
            </div>

          </div>
        </div>

        {/* ================================================================= */}
        {/* 2. CENTER STAGE: HORIZONTAL TIMELINE TRACK & SVG CONNECTOR        */}
        {/* ================================================================= */}
        <div className="w-full overflow-hidden relative my-auto py-2 flex-1 flex flex-col justify-center">
          
          {/* Parallax Background Typography (Requirement 11 & 12) */}
          <div
            ref={bgTextRef}
            className="absolute top-1/2 -translate-y-1/2 left-0 pointer-events-none select-none z-0 whitespace-nowrap will-change-transform opacity-[0.035]"
          >
            <span className="font-display font-black text-[20vw] leading-none uppercase tracking-tighter text-outline">
              TRAJECTORY 2022 — 2026
            </span>
          </div>

          {/* Horizontal Moving Track (Foreground) */}
          <div
            ref={trackRef}
            className="journey-track flex flex-col w-max will-change-transform relative z-10 pl-4 sm:pl-8 md:pl-16 lg:pl-24 pr-16 sm:pr-24 md:pr-40 lg:pr-56"
          >
            {/* Continuous Horizontal SVG Timeline Rail (Requirement 9 & 10) */}
            <div className="w-full relative mb-3 px-2">
              <div className="flex items-center w-full">
                {journey.map((item, idx) => {
                  const isPast = idx < activeMilestoneIndex;
                  const isCurrent = idx === activeMilestoneIndex;

                  return (
                    <React.Fragment key={item.year}>
                      {/* Milestone Node on Rail */}
                      <div className="flex items-center gap-2 shrink-0">
                        <div
                          className={`relative flex items-center justify-center transition-all duration-300 ${
                            isCurrent ? 'scale-125' : 'scale-100'
                          }`}
                        >
                          <div
                            className={`w-3.5 h-3.5 rounded-full border-2 transition-colors duration-300 ${
                              isCurrent
                                ? 'border-amber-400 bg-amber-400 shadow-[0_0_12px_rgba(245,158,11,0.9)]'
                                : isPast
                                ? 'border-amber-400/80 bg-amber-400/30'
                                : 'border-zinc-700 bg-zinc-900'
                            }`}
                          />
                          {isCurrent && (
                            <div className="absolute inset-0 rounded-full bg-amber-400/50 animate-ping pointer-events-none" />
                          )}
                        </div>

                        <span
                          className={`text-xs font-mono font-bold transition-colors duration-300 ${
                            isCurrent
                              ? 'text-amber-400'
                              : isPast
                              ? 'text-zinc-300'
                              : 'text-zinc-500'
                          }`}
                        >
                          {item.railLabel || item.year}
                        </span>
                      </div>

                      {/* Connecting Rail Segment (Very thin, subtle connector) */}
                      {idx < journey.length - 1 ? (
                        <div className="flex-1 mx-3 h-[1px] bg-zinc-800/80 relative overflow-hidden min-w-[100px] sm:min-w-[140px] md:min-w-[180px]">
                          <div
                            className={`absolute inset-0 bg-gradient-to-r from-amber-400 to-amber-300 transition-transform duration-500 origin-left ${
                              idx < activeMilestoneIndex ? 'scale-x-100' : 'scale-x-0'
                            }`}
                          />
                        </div>
                      ) : (
                        /* Final continuation segment leading directly into Open Source */
                        <div className="flex-1 mx-3 h-[1px] bg-zinc-800/80 relative min-w-[120px] sm:min-w-[160px] md:min-w-[200px]">
                          <div
                            className={`absolute inset-0 bg-gradient-to-r from-amber-400 via-amber-300 to-emerald-400 transition-transform duration-500 origin-left ${
                              activeMilestoneIndex >= journey.length - 1 ? 'scale-x-100' : 'scale-x-0'
                            }`}
                          />
                          <div className="absolute -top-3.5 right-0 flex items-center gap-1.5 text-[10px] font-mono text-amber-400 font-semibold tracking-wider uppercase">
                            <span>OPEN SOURCE</span>
                            <span>→</span>
                          </div>
                        </div>
                      )}
                    </React.Fragment>
                  );
                })}
              </div>
            </div>

            {/* Horizontal Row of Milestone Cards & Transition Bridge Panel */}
            <div className="flex flex-row items-center gap-4 sm:gap-6 md:gap-8 lg:gap-10">
              {journey.map((item, index) => {
                const isActive = activeMilestoneIndex === index;

                return (
                  <JourneyCard
                    key={item.year}
                    ref={(el) => {
                      cardRefs.current[index] = el;
                    }}
                    item={item}
                    index={index}
                    total={journey.length}
                    accentColor={MILESTONE_COLORS[index]}
                    isActive={isActive}
                  />
                );
              })}

              {/* Transition Bridge Panel into Open Source (Compact Editorial Sizing) */}
              <div
                ref={bridgeRef}
                className="shrink-0 w-[240px] sm:w-[270px] md:w-[300px] h-[220px] sm:h-[230px] md:h-[240px] rounded-2xl bg-gradient-to-b from-[#0c0e14]/90 to-[#07080b]/90 border border-zinc-800/90 p-5 sm:p-6 flex flex-col justify-between shadow-[0_12px_32px_rgba(0,0,0,0.6)] backdrop-blur-sm group hover:border-amber-400/50 transition-colors select-none"
              >
                <div className="space-y-1.5">
                  <div className="flex items-center gap-2 text-[10px] font-mono text-emerald-400 font-semibold uppercase tracking-widest">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    <span>CONTINUING TRAJECTORY</span>
                  </div>

                  <h4 className="font-display font-black text-lg sm:text-xl text-white uppercase tracking-tight">
                    UPSTREAM LEADERSHIP
                  </h4>

                  <p className="text-xs text-zinc-400 font-sans leading-relaxed">
                    The Linux Foundation · OpenPrinting
                  </p>
                </div>

                <div className="pt-2 border-t border-zinc-800/60">
                  <button
                    type="button"
                    onClick={() => scrollToTarget('#open-source', -20)}
                    className="w-full py-2 px-3 rounded-xl bg-amber-400 hover:bg-amber-300 active:bg-amber-500 text-black text-xs font-mono font-bold transition-colors flex items-center justify-center gap-1.5 cursor-pointer shadow-md shadow-amber-500/20"
                  >
                    <span>Explore Upstream</span>
                    <ArrowRight size={13} />
                  </button>
                </div>
              </div>

            </div>
          </div>

        </div>

        {/* ================================================================= */}
        {/* 3. BOTTOM STATUS & CONTINUITY BAR                                */}
        {/* ================================================================= */}
        <div className="max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 shrink-0 relative z-20 flex items-center justify-between text-xs font-mono text-zinc-400 pt-3 border-t border-zinc-800/50">
          
          {/* Active Milestone Title */}
          <div className="flex items-center gap-2">
            <span
              className="w-2 h-2 rounded-full transition-colors duration-300"
              style={{ backgroundColor: MILESTONE_COLORS[activeMilestoneIndex] || '#f59e0b' }}
            />
            <span className="text-zinc-500">ACTIVE:</span>
            <span className="font-bold text-white tracking-wide">
              {journey[activeMilestoneIndex]?.year} · {journey[activeMilestoneIndex]?.title?.toUpperCase()}
            </span>
          </div>

          {/* Milestone Indicator Dots */}
          <div className="hidden sm:flex items-center gap-2">
            {journey.map((item, i) => (
              <button
                key={item.year}
                onClick={() => scrollToMilestone(i)}
                className={`w-2 h-2 rounded-full transition-all cursor-pointer ${
                  i === activeMilestoneIndex
                    ? 'w-6 bg-amber-400'
                    : 'bg-zinc-700 hover:bg-zinc-500'
                }`}
                aria-label={`Jump to milestone ${item.year}`}
              />
            ))}
          </div>

          {/* Forward Section Link */}
          <button
            onClick={() => scrollToTarget('#open-source', -20)}
            className="inline-flex items-center gap-1.5 text-xs font-mono uppercase text-amber-400 hover:text-amber-300 transition-colors cursor-pointer font-semibold"
          >
            <span>UPSTREAM LEADERSHIP</span>
            <ArrowUpRight size={14} />
          </button>

        </div>
    </section>
  );
};
