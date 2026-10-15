"use client";

import React from "react";
import { Briefcase, GraduationCap, Award, Calendar, MapPin, CheckCircle2 } from "lucide-react";
import { experiences } from "@/data/experience";

export function ExperienceSection() {
  return (
    <section
      id="experience"
      aria-label="Professional Experience and Academic Background"
      className="relative py-24 sm:py-32 px-4 sm:px-6 lg:px-12 max-w-7xl mx-auto z-10"
    >
      {/* Section Motif */}
      <div
        aria-hidden="true"
        className="flex items-center gap-4 mb-8 text-xs font-mono text-neutral-400 tracking-wider"
      >
        <span className="w-8 h-[1px] bg-[#00f5d4]" />
        <span className="text-[#00f5d4]">SECTION 07</span>
        <span className="text-neutral-600">//</span>
        <span>TRAJECTORY & BACKGROUND</span>
      </div>

      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-12 border-b border-white/10">
        <div>
          <h2 className="text-4xl sm:text-6xl font-black tracking-tight text-white">
            Engineering Journey
          </h2>
          <p className="mt-4 text-base sm:text-lg text-neutral-300 max-w-2xl font-light">
            Grounded in rigorous computer science education and practical consulting experience,
            complementing deep self-directed open-source systems engineering.
          </p>
        </div>

        <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs font-mono text-neutral-300 self-start">
          <GraduationCap className="w-3.5 h-3.5 text-[#00f5d4]" />
          <span>B.Tech CSE 2026 · CGPA 8.6</span>
        </div>
      </div>

      {/* Timeline Stream */}
      <div className="mt-14 space-y-8 relative before:absolute before:inset-0 before:left-3 sm:before:left-5 before:w-0.5 before:bg-white/10">
        {experiences.map((item) => (
          <div
            key={item.id}
            className="relative pl-8 sm:pl-14 group transition-all"
          >
            {/* Timeline Node */}
            <div className="absolute left-1.5 sm:left-3.5 top-1.5 w-3.5 h-3.5 rounded-full bg-[#08090c] border-2 border-[#00f5d4] group-hover:scale-125 transition-transform" />

            <div className="p-6 sm:p-8 rounded-2xl glass-panel border border-white/10 group-hover:border-white/20 transition">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-white/10 pb-4 mb-4">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xl sm:text-2xl font-bold text-white">
                      {item.role}
                    </span>
                    {item.badge && (
                      <span className="px-2.5 py-0.5 rounded text-[11px] font-mono bg-[#00f5d4]/10 text-[#00f5d4] border border-[#00f5d4]/30">
                        {item.badge}
                      </span>
                    )}
                  </div>
                  <span className="text-sm font-semibold text-[#00f5d4] font-mono mt-0.5 block">
                    {item.company}
                  </span>
                </div>

                <div className="flex flex-col sm:items-end text-xs font-mono text-neutral-400">
                  <span className="flex items-center gap-1.5 text-neutral-300">
                    <Calendar className="w-3 h-3 text-[#00f5d4]" />
                    {item.period}
                  </span>
                  <span className="flex items-center gap-1.5 mt-0.5 text-neutral-400">
                    <MapPin className="w-3 h-3" />
                    {item.location}
                  </span>
                </div>
              </div>

              <p className="text-sm text-neutral-300 font-light leading-relaxed mb-4">
                {item.summary}
              </p>

              <div className="space-y-1.5 mb-6">
                {item.contributions.map((c, i) => (
                  <div key={i} className="flex items-start gap-2 text-xs text-neutral-300">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#00f5d4] shrink-0 mt-0.5" />
                    <span>{c}</span>
                  </div>
                ))}
              </div>

              <div className="flex flex-wrap gap-1.5 pt-4 border-t border-white/5">
                {item.technologies.map((tech) => (
                  <span
                    key={tech}
                    className="px-2.5 py-0.5 rounded text-[11px] font-mono bg-white/5 border border-white/10 text-neutral-400"
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
