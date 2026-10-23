import React from 'react';
import { Sparkles, ArrowDown, Terminal, Cpu, Award, Globe } from 'lucide-react';
import { portfolioData } from '../../../data';
import { KineticHeading } from './KineticHeading';
import { scrollToTarget } from '../../utils/scroll';

export const About: React.FC = () => {
  const stats = portfolioData.personal.stats;

  const statIcons = [
    <Terminal size={16} className="text-amber-400" />,
    <Globe size={16} className="text-cyan-400" />,
    <Award size={16} className="text-emerald-400" />,
    <Cpu size={16} className="text-orange-400" />,
  ];

  return (
    <section
      id="about"
      className="relative w-full py-20 lg:py-28 bg-[#08080a] text-white border-t border-zinc-800/80 overflow-hidden"
      style={{ isolation: 'isolate' }}
    >
      {/* Ambient background glow */}
      <div className="absolute top-1/3 right-10 w-[500px] h-[500px] bg-amber-500/5 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-[450px] h-[450px] bg-cyan-500/5 rounded-full blur-[130px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        
        {/* ========================================================= */}
        {/* SECTION HEADER & BIO GRID                                 */}
        {/* ========================================================= */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">
          
          {/* Left Column: Heading, Animated Text, and 4-Stat Metric Cards */}
          <div className="lg:col-span-6 space-y-6">
            <div className="space-y-3">
              <KineticHeading
                text="I BUILD THINGS"
                variant="telemetry"
                className="font-display font-extrabold text-4xl sm:text-5xl lg:text-6xl tracking-tight leading-[0.98] text-white"
              />
              <div className="text-xs sm:text-sm font-mono text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-orange-400 to-amber-200 font-semibold tracking-wider uppercase">
                DOWN TO THE KERNEL · UPSTREAM ARCHITECTURE
              </div>

              <p className="text-zinc-400 text-sm sm:text-base font-sans leading-relaxed pt-1 max-w-xl">
                Software engineer and Linux Foundation maintainer dedicated to low-level system stability, developer tooling, and modern distributed architectures.
              </p>
            </div>

            {/* 4-Stat Metric Grid */}
            <div className="grid grid-cols-2 gap-4 pt-4 border-t border-zinc-800/80 max-w-lg">
              {stats.map((stat, i) => (
                <div
                  key={i}
                  className="p-4 rounded-xl bg-zinc-900/60 border border-zinc-800/80 hover:border-zinc-700 transition-colors"
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-[11px] font-mono uppercase text-zinc-400">
                      {stat.label}
                    </span>
                    {statIcons[i] || <Sparkles size={14} className="text-amber-400" />}
                  </div>
                  <div className="font-display font-bold text-2xl sm:text-3xl text-white">
                    {stat.value}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: Bio Narrative & Story In Motion Visual Frame */}
          <div className="lg:col-span-6 space-y-6 lg:pt-4">
            <div className="space-y-4 text-zinc-300 font-sans text-base sm:text-lg leading-relaxed">
              <p>
                I am a software engineer focused on low-level Linux systems, developer tooling, and modern distributed applications. As an active maintainer for <strong className="text-white font-medium">The Linux Foundation’s OpenPrinting</strong> project, I solve real-world concurrency, driver-loading, and hardware-discovery challenges used by millions of Linux users worldwide.
              </p>
              <p className="text-zinc-400 text-sm sm:text-base">
                My engineering philosophy is simple: write maintainable upstream code, understand the full stack down to the kernel and IPC layers, and bridge low-level stability with fluid, modern interfaces.
              </p>
            </div>

            {/* Visual Accent Badge with Hero Pose Thumbnail & Downward Link */}
            <div className="p-4 rounded-2xl bg-gradient-to-r from-[#12141a] to-[#0c0d12] border border-zinc-800/80 flex items-center justify-between shadow-xl">
              <div className="flex items-center gap-3.5">
                <div className="w-12 h-12 rounded-full overflow-hidden border border-amber-500/40 bg-black shrink-0 shadow-md">
                  <img
                    src="/images/hero-sequence/frame-192.webp"
                    alt="Ayush Singh"
                    className="w-full h-full object-cover scale-110"
                    loading="lazy"
                  />
                </div>
                <div>
                  <div className="text-[10px] font-mono uppercase tracking-widest text-amber-400 font-semibold">
                    STORY IN MOTION
                  </div>
                  <div className="font-display font-bold text-sm text-white">
                    2022 → 2026 Upstream Trajectory
                  </div>
                </div>
              </div>

              <button
                type="button"
                onClick={() => scrollToTarget('#journey', -10)}
                className="inline-flex items-center gap-1.5 text-xs font-mono text-amber-400 hover:text-amber-300 transition-colors cursor-pointer bg-zinc-900/80 border border-zinc-800 px-3 py-1.5 rounded-full"
              >
                <span>Timeline</span>
                <ArrowDown size={12} />
              </button>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};

