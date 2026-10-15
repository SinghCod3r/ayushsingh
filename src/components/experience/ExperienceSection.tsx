"use client";

import React from "react";
import { GraduationCap, Calendar, MapPin, CheckCircle2 } from "lucide-react";
import { experiences } from "@/data/experience";

export function ExperienceSection() {
  return (
    <section
      id="experience"
      aria-label="Professional Experience and Academic Background"
      className="relative py-12 sm:py-16 md:py-20 px-4 sm:px-6 lg:px-12 max-w-7xl mx-auto z-10 w-full overflow-hidden scroll-mt-16"
    >
      {/* Section Motif */}
      <div
        aria-hidden="true"
        className="flex items-center gap-3 sm:gap-4 mb-6 sm:mb-8 text-xs font-mono text-neutral-400 tracking-wider"
      >
        <span className="w-6 sm:w-8 h-[1px] bg-[#00f5d4]" />
        <span className="text-[#00f5d4]">SECTION 07</span>
        <span className="text-neutral-600">//</span>
        <span>TRAJECTORY & BACKGROUND</span>
      </div>

      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-5 pb-8 sm:pb-12 border-b border-white/10 w-full">
        <div>
          <h2 className="text-3xl sm:text-5xl md:text-6xl font-black tracking-tight text-white">
            Engineering Journey
          </h2>
          <p className="mt-3 text-sm sm:text-base md:text-lg text-neutral-300 max-w-2xl font-light">
            Computer science education combined with practical enterprise consulting
            and upstream open-source software engineering.
          </p>
        </div>

        <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs font-mono text-neutral-300 self-start">
          <GraduationCap className="w-3.5 h-3.5 text-[#00f5d4]" />
          <span>B.Tech CSE · Class of 2026</span>
        </div>
      </div>

      {/* Timeline Stream */}
      <div className="mt-8 sm:mt-12 space-y-6 sm:space-y-8 relative before:absolute before:inset-0 before:left-2 sm:before:left-3.5 md:before:left-4 before:w-0.5 before:bg-white/10 w-full">
        {experiences.map((item) => (
          <div
            key={item.id}
            className="relative pl-6 sm:pl-9 md:pl-12 group transition-all w-full"
          >
            {/* Timeline Node */}
            <div className="absolute left-0.5 sm:left-2 md:left-2.5 top-2 w-3 sm:w-3.5 h-3 sm:h-3.5 rounded-full bg-[#08090c] border-2 border-[#00f5d4] group-hover:scale-125 transition-transform" />

            <div className="p-4 sm:p-6 md:p-7 rounded-2xl glass-panel border border-white/10 group-hover:border-white/20 transition w-full">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-white/10 pb-3 mb-3">
                <div>
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="text-base sm:text-xl font-bold text-white">
                      {item.role}
                    </span>
                    {item.badge && (
                      <span className="px-2 py-0.5 rounded text-[10px] sm:text-[11px] font-mono bg-[#00f5d4]/10 text-[#00f5d4] border border-[#00f5d4]/30">
                        {item.badge}
                      </span>
                    )}
                  </div>
                  <span className="text-xs sm:text-sm font-semibold text-[#00f5d4] font-mono mt-0.5 block">
                    {item.company}
                  </span>
                </div>

                <div className="flex flex-wrap sm:flex-col sm:items-end gap-2 sm:gap-0.5 text-xs font-mono text-neutral-400">
                  <span className="flex items-center gap-1.5 text-neutral-300 text-[11px] sm:text-xs">
                    <Calendar className="w-3 h-3 text-[#00f5d4]" />
                    {item.period}
                  </span>
                  <span className="flex items-center gap-1.5 text-neutral-400 text-[10px] sm:text-[11px]">
                    <MapPin className="w-3 h-3" />
                    {item.location}
                  </span>
                </div>
              </div>

              <p className="text-xs sm:text-sm text-neutral-300 font-light leading-relaxed mb-3">
                {item.summary}
              </p>

              <div className="space-y-1 mb-4">
                {item.contributions.map((c, i) => (
                  <div key={i} className="flex items-start gap-2 text-xs text-neutral-300">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#00f5d4] shrink-0 mt-0.5" />
                    <span>{c}</span>
                  </div>
                ))}
              </div>

              <div className="flex flex-wrap gap-1 pt-3 border-t border-white/5">
                {item.technologies.map((tech) => (
                  <span
                    key={tech}
                    className="px-2 py-0.5 rounded text-[10px] sm:text-[11px] font-mono bg-white/5 border border-white/10 text-neutral-400"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
