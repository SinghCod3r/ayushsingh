import React, { useState } from 'react';
import { MapPin, Calendar, ExternalLink, Sparkles, Award, ChevronLeft, ChevronRight, MonitorPlay, Terminal, ShieldAlert } from 'lucide-react';
import { portfolioData } from '../../../data';
import { MagneticButton } from './MagneticButton';
import { AnimatedHeading } from './AnimatedHeading';

interface Slide {
  id: number;
  slideNumber: string;
  tagline: string;
  title: string;
  keyBullet: string;
  visualType: 'stats' | 'code' | 'framework';
  speakerNote: string;
}

const slides: Slide[] = [
  {
    id: 0,
    slideNumber: 'SLIDE 01 / 03',
    tagline: 'THE ASYMMETRIC BURDEN',
    title: 'The Hallucination Flood in Open Source',
    keyBullet: 'LLMs reduce PR creation time to 15 seconds while multiplying maintainer verification time to 45 minutes.',
    visualType: 'stats',
    speakerNote: 'At OpenPrinting, inbound PR volume jumped 320% following generative AI tooling, but clean merges plummeted by 45%. Volunteer maintainers are absorbing the cognitive tax of synthetic PRs.',
  },
  {
    id: 1,
    slideNumber: 'SLIDE 02 / 03',
    tagline: 'SYSTEMS ENGINEERING REALITIES',
    title: 'Silent Thread & D-Bus Regressions',
    keyBullet: 'Compilers catch syntax errors in milliseconds; they cannot catch hallucinated IPC parameters or GTK thread deadlocks.',
    visualType: 'code',
    speakerNote: 'Plausible-looking code frequently violates async GLib loop conventions. When LLMs write direct UI model mutations inside background threads, desktop users suffer silent freezes.',
  },
  {
    id: 2,
    slideNumber: 'SLIDE 03 / 03',
    tagline: 'THE DEFENSE PROTOCOL',
    title: 'Structural CI & Verification Defenses',
    keyBullet: 'Mandate hardware repro terminal logs, automated AST signature linting, and genuine intellectual code ownership.',
    visualType: 'framework',
    speakerNote: 'We do not ban AI; we demand empirical proof. Contributors must run real pytest suites and provide device verification logs before human review begins.',
  },
];

export const Speaking: React.FC = () => {
  const speaking = portfolioData.speaking;
  const talk = speaking.featuredTalk;
  const [activeSlide, setActiveSlide] = useState(0);

  const currentSlide = slides[activeSlide];

  const handlePrevSlide = () => {
    setActiveSlide((prev) => (prev > 0 ? prev - 1 : slides.length - 1));
  };

  const handleNextSlide = () => {
    setActiveSlide((prev) => (prev < slides.length - 1 ? prev + 1 : 0));
  };

  return (
    <section
      id="speaking"
      className="relative w-full py-20 lg:py-32 bg-[#08080a] text-white border-t border-zinc-800/60 overflow-hidden"
      style={{ isolation: 'isolate' }}
    >
      {/* Background radial accent glow */}
      <div className="absolute top-1/4 right-0 w-[500px] h-[500px] bg-amber-500/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div className="space-y-3">
            <AnimatedHeading
              text={speaking.title}
              className="font-display font-black text-4xl sm:text-6xl lg:text-7xl tracking-tight text-white uppercase"
            />
            <p className="text-zinc-400 text-sm sm:text-base max-w-xl font-sans">
              {speaking.subtitle}
            </p>
          </div>

          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-mono font-medium">
            <Sparkles size={13} />
            <span>Keynote Speaker • OOSC 4.0 • IIIT Allahabad</span>
          </div>
        </div>

        {/* Main Keynote Feature Stage */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Left Column: Keynote Talk Editorial Card */}
          <div className="lg:col-span-5 rounded-2xl bg-[#0f1115] border border-zinc-800/90 p-6 sm:p-8 flex flex-col justify-between shadow-2xl relative">
            <div className="space-y-6">
              
              {/* Event Badge & Institution */}
              <div className="flex items-center justify-between flex-wrap gap-2">
                <span className="px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-mono font-semibold uppercase flex items-center gap-1.5">
                  <Award size={12} />
                  Invited Keynote Speaker
                </span>
                <span className="text-xs font-mono text-zinc-400 flex items-center gap-1">
                  <MapPin size={12} className="text-zinc-500" />
                  {talk.institution}
                </span>
              </div>

              {/* Talk Title */}
              <h3 className="font-display font-black text-2xl sm:text-3xl lg:text-4xl text-white leading-tight">
                "{talk.title}"
              </h3>

              {/* Event Meta */}
              <div className="flex items-center gap-4 text-xs font-mono text-zinc-400">
                <span className="flex items-center gap-1.5">
                  <Calendar size={13} className="text-amber-400" />
                  {talk.date}
                </span>
                <span>•</span>
                <span>{talk.location}</span>
              </div>

              {/* Talk Summary */}
              <p className="text-xs sm:text-sm text-zinc-300 font-sans leading-relaxed">
                {talk.summary}
              </p>

              {/* Topic Tags */}
              <div className="flex flex-wrap gap-1.5 pt-1">
                {talk.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-[11px] font-mono px-2.5 py-0.5 rounded bg-zinc-900 border border-zinc-800 text-zinc-300"
                  >
                    #{tag}
                  </span>
                ))}
              </div>

            </div>

            {/* Bottom Speaker Profile Link */}
            <div className="pt-6 mt-6 border-t border-zinc-800/80 flex items-center justify-between flex-wrap gap-4">
              <div className="text-xs font-mono text-zinc-500">
                OOSC 4.0 • Hybrid Auditorium
              </div>

              <a
                href={portfolioData.personal.socials.linkedin}
                target="_blank"
                rel="noopener noreferrer"
              >
                <MagneticButton className="px-4 py-2 rounded-full bg-zinc-800 hover:bg-zinc-700 text-zinc-200 text-xs font-mono uppercase transition-colors">
                  <span>Speaker Profile</span>
                  <ExternalLink size={12} />
                </MagneticButton>
              </a>
            </div>

          </div>

          {/* Right Column: Interactive Keynote Slide Deck Preview */}
          <div className="lg:col-span-7 rounded-2xl bg-[#0a0b0e] border border-zinc-800/90 p-6 sm:p-8 flex flex-col justify-between shadow-2xl relative overflow-hidden">
            
            {/* Top Deck Navigation Bar */}
            <div className="flex items-center justify-between pb-4 border-b border-zinc-800/80 gap-3">
              <div className="flex items-center gap-2">
                <div className="w-2.5 h-2.5 rounded-full bg-amber-400 animate-pulse" />
                <span className="text-xs font-mono uppercase tracking-wider text-zinc-300 font-semibold flex items-center gap-1.5">
                  <MonitorPlay size={13} className="text-amber-400" />
                  Keynote Slide Deck Preview
                </span>
              </div>

              {/* Slide Selector Pills */}
              <div className="flex items-center gap-1.5">
                {slides.map((s, idx) => (
                  <button
                    key={s.id}
                    onClick={() => setActiveSlide(idx)}
                    className={`px-2.5 py-1 rounded-md text-[11px] font-mono transition-all ${
                      activeSlide === idx
                        ? 'bg-amber-400 text-black font-bold shadow-md'
                        : 'bg-zinc-900 text-zinc-400 hover:text-white border border-zinc-800'
                    }`}
                  >
                    0{idx + 1}
                  </button>
                ))}
              </div>
            </div>

            {/* Active Slide Canvas (16:9 Presentation Aspect) */}
            <div className="my-6 p-6 sm:p-8 rounded-xl bg-gradient-to-br from-[#12141a] to-[#0c0d12] border border-zinc-800 flex flex-col justify-between min-h-[300px] sm:min-h-[320px] relative shadow-inner">
              
              {/* Slide Header */}
              <div className="space-y-2">
                <div className="flex items-center justify-between text-[11px] font-mono">
                  <span className="text-amber-400 font-bold uppercase tracking-wider">
                    {currentSlide.slideNumber} • {currentSlide.tagline}
                  </span>
                  <span className="text-zinc-500 uppercase">IIIT ALLAHABAD • OOSC 4.0</span>
                </div>

                <h4 className="font-display font-black text-xl sm:text-2xl lg:text-3xl text-white pt-1">
                  {currentSlide.title}
                </h4>

                <p className="text-xs sm:text-sm text-zinc-300 font-sans leading-relaxed pt-2">
                  {currentSlide.keyBullet}
                </p>
              </div>

              {/* Dynamic Slide Visual Content */}
              <div className="my-4 pt-4 border-t border-zinc-800/60">
                {currentSlide.visualType === 'stats' && (
                  <div className="grid grid-cols-3 gap-3 text-center">
                    <div className="p-2.5 rounded-lg bg-black/40 border border-zinc-800/80">
                      <div className="font-display font-black text-xl sm:text-2xl text-amber-400">+320%</div>
                      <div className="text-[10px] font-mono text-zinc-400">PR Volume</div>
                    </div>
                    <div className="p-2.5 rounded-lg bg-black/40 border border-zinc-800/80">
                      <div className="font-display font-black text-xl sm:text-2xl text-rose-400">-45%</div>
                      <div className="text-[10px] font-mono text-zinc-400">Merge Rate</div>
                    </div>
                    <div className="p-2.5 rounded-lg bg-black/40 border border-zinc-800/80">
                      <div className="font-display font-black text-xl sm:text-2xl text-emerald-400">45m</div>
                      <div className="text-[10px] font-mono text-zinc-400">Review Time</div>
                    </div>
                  </div>
                )}

                {currentSlide.visualType === 'code' && (
                  <div className="p-3 rounded-lg bg-black/50 border border-zinc-800/80 font-mono text-[11px] space-y-1">
                    <div className="text-rose-400 flex items-center gap-1">
                      <ShieldAlert size={12} />
                      <span>- GLib.idle_add(None) // Unsynchronized Thread Crash</span>
                    </div>
                    <div className="text-emerald-400 flex items-center gap-1">
                      <Terminal size={12} />
                      <span>+ GLib.idle_add(self._safe_queue_callback, device_id) // Verified</span>
                    </div>
                  </div>
                )}

                {currentSlide.visualType === 'framework' && (
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-[11px] font-mono">
                    <div className="p-2 rounded bg-zinc-900/80 border border-zinc-800 text-zinc-300">
                      1. Headless Pytest
                    </div>
                    <div className="p-2 rounded bg-zinc-900/80 border border-zinc-800 text-zinc-300">
                      2. AST Validation
                    </div>
                    <div className="p-2 rounded bg-zinc-900/80 border border-zinc-800 text-zinc-300">
                      3. Repro Hardware Log
                    </div>
                  </div>
                )}
              </div>

              {/* Speaker Notes Callout */}
              <div className="p-3 rounded-lg bg-zinc-900/70 border border-amber-500/20 text-xs font-sans text-zinc-400 italic">
                <span className="text-amber-400 font-mono font-semibold not-italic text-[10px] uppercase block mb-1">
                  Speaker Note
                </span>
                "{currentSlide.speakerNote}"
              </div>
            </div>

            {/* Deck Navigation Controls */}
            <div className="flex items-center justify-between pt-2">
              <div className="text-xs font-mono text-zinc-500">
                Slide {activeSlide + 1} of {slides.length}
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={handlePrevSlide}
                  className="p-2 rounded-full bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-white transition-colors"
                  aria-label="Previous Slide"
                >
                  <ChevronLeft size={16} />
                </button>
                <button
                  onClick={handleNextSlide}
                  className="p-2 rounded-full bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-white transition-colors"
                  aria-label="Next Slide"
                >
                  <ChevronRight size={16} />
                </button>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
