"use client";

import React, { useState } from "react";
import {
  GraduationCap,
  Calendar,
  MapPin,
  CheckCircle2,
  Briefcase,
  Award,
  GitMerge,
  ArrowRight,
  Sparkles,
  Layers,
  Code2,
} from "lucide-react";
import { experiences, ExperienceItem } from "@/data/experience";

export function ExperienceSection() {
  const [activeId, setActiveId] = useState<string>(experiences[0].id);

  const activeItem =
    experiences.find((item) => item.id === activeId) || experiences[0];

  const getIcon = (type: ExperienceItem["type"]) => {
    switch (type) {
      case "Work Experience":
        return Briefcase;
      case "Milestone":
        return Award;
      case "Education":
        return GraduationCap;
      case "Open Source":
        return GitMerge;
      default:
        return Briefcase;
    }
  };

  return (
    <section
      id="experience"
      aria-label="Professional Experience, Academic Merit, and Engineering Journey"
      className="relative py-12 sm:py-16 md:py-24 px-4 sm:px-8 lg:px-12 xl:px-16 max-w-[1560px] mx-auto z-10 w-full overflow-hidden scroll-mt-20"
    >
      {/* Background Ambient Cyber Glows */}
      <div
        aria-hidden="true"
        className="absolute top-1/4 -left-20 w-96 h-96 bg-[#00f5d4]/8 rounded-full blur-3xl pointer-events-none"
      />
      <div
        aria-hidden="true"
        className="absolute bottom-1/4 -right-20 w-96 h-96 bg-[#38bdf8]/8 rounded-full blur-3xl pointer-events-none"
      />

      {/* Section Motif */}
      <div
        aria-hidden="true"
        className="flex items-center gap-3 sm:gap-4 mb-6 sm:mb-8 text-xs font-mono text-neutral-400 tracking-wider"
      >
        <span className="w-6 sm:w-8 h-[1px] bg-[#00f5d4]" />
        <span className="text-[#00f5d4]">SECTION 07</span>
        <span className="text-neutral-600">//</span>
        <span>TRAJECTORY & ENGINEERING JOURNEY</span>
      </div>

      {/* Section Header */}
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-8 sm:pb-12 border-b border-white/10 w-full">
        <div>
          <h2 className="text-3xl sm:text-5xl md:text-6xl font-black tracking-tight text-white">
            Engineering Journey
          </h2>
          <p className="mt-3 text-sm sm:text-base md:text-lg text-neutral-300 max-w-2xl font-light">
            B.Tech Computer Science graduate (2026) with an 8.6 CGPA, enterprise
            consulting experience with 19 BC API integrations at Acxion Consulting,
            cleared TCS Digital via NQT 2025, and active Linux OpenPrinting contributor.
          </p>
        </div>

        {/* Milestone Quick Badges */}
        <div className="flex flex-wrap items-center gap-2 font-mono text-xs text-neutral-300">
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#00f5d4]/10 border border-[#00f5d4]/30 text-[#00f5d4]">
            <Sparkles className="w-3.5 h-3.5" />
            <span>19 BC API Integrations</span>
          </div>
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#38bdf8]/10 border border-[#38bdf8]/30 text-[#38bdf8]">
            <Award className="w-3.5 h-3.5" />
            <span>TCS Digital · NQT 2025</span>
          </div>
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-neutral-200">
            <GraduationCap className="w-3.5 h-3.5 text-[#00f5d4]" />
            <span>CGPA: 8.6 / 10.0</span>
          </div>
        </div>
      </div>

      {/* Modern Interactive Motion Flow Highway / Stage Progression Track */}
      <div className="mt-8 sm:mt-12 w-full">
        {/* Horizontal Navigation Stations */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 relative w-full">
          {experiences.map((exp, index) => {
            const isSelected = exp.id === activeId;
            const Icon = getIcon(exp.type);

            return (
              <button
                key={exp.id}
                onClick={() => setActiveId(exp.id)}
                type="button"
                className={`relative p-3.5 sm:p-5 rounded-2xl border text-left transition-all duration-300 cursor-pointer overflow-hidden flex flex-col justify-between group ${
                  isSelected
                    ? "bg-[#0c121d] border-[#00f5d4]/50 shadow-[0_12px_35px_rgba(0,245,212,0.15)] ring-1 ring-[#00f5d4]/30"
                    : "bg-[#090d15]/80 border-white/10 hover:border-white/20 hover:bg-[#0c101a]"
                }`}
              >
                {/* Active Neon Accent Indicator Top Bar */}
                <div
                  className={`absolute top-0 left-0 right-0 h-[2px] transition-all duration-300 ${
                    isSelected
                      ? "bg-gradient-to-r from-[#00f5d4] via-[#38bdf8] to-[#a855f7]"
                      : "bg-transparent group-hover:bg-white/20"
                  }`}
                />

                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[10px] sm:text-[11px] font-mono text-neutral-400 font-semibold tracking-wider">
                      PHASE 0{index + 1}
                    </span>
                    <Icon
                      className={`w-4 h-4 transition-colors ${
                        isSelected ? "text-[#00f5d4]" : "text-neutral-400 group-hover:text-white"
                      }`}
                    />
                  </div>

                  <h3
                    className={`text-xs sm:text-sm font-bold tracking-tight line-clamp-1 transition-colors ${
                      isSelected ? "text-white" : "text-neutral-300 group-hover:text-white"
                    }`}
                  >
                    {exp.company}
                  </h3>
                  <span className="text-[11px] font-mono text-[#00f5d4] line-clamp-1 mt-0.5 block">
                    {exp.badge}
                  </span>
                </div>

                <div className="mt-3 sm:mt-4 pt-2 border-t border-white/5 flex items-center justify-between text-[10px] sm:text-[11px] font-mono text-neutral-400">
                  <span className="truncate">{exp.period}</span>
                  <ArrowRight
                    className={`w-3 h-3 transition-transform ${
                      isSelected ? "translate-x-1 text-[#00f5d4]" : "opacity-0 group-hover:opacity-100"
                    }`}
                  />
                </div>
              </button>
            );
          })}
        </div>

        {/* Active Stage Deep-Dive Showcase Deck with Motion Flow */}
        <div className="mt-6 sm:mt-8 relative rounded-3xl bg-[#090d16]/90 border border-white/12 p-5 sm:p-8 md:p-10 shadow-[0_20px_50px_rgba(0,0,0,0.6)] backdrop-blur-xl overflow-hidden w-full transition-all duration-300">
          {/* Subtle Ambient Backing Glow */}
          <div
            aria-hidden="true"
            className="absolute top-0 right-0 w-80 h-80 bg-[radial-gradient(circle_at_center,rgba(0,245,212,0.1)_0%,transparent_70%)] pointer-events-none blur-3xl"
          />

          <div className="relative z-10 flex flex-col gap-6">
            {/* Header Strip */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-white/10">
              <div>
                <div className="flex flex-wrap items-center gap-2.5 mb-1.5">
                  <span className="px-2.5 py-0.5 rounded-full font-mono text-[10px] sm:text-xs font-semibold bg-[#00f5d4]/10 text-[#00f5d4] border border-[#00f5d4]/30">
                    {activeItem.type}
                  </span>
                  <span className="px-2.5 py-0.5 rounded-full font-mono text-[10px] sm:text-xs font-semibold bg-white/5 text-neutral-300 border border-white/10">
                    {activeItem.badge}
                  </span>
                </div>

                <h3 className="text-xl sm:text-2xl md:text-3xl font-black text-white tracking-tight">
                  {activeItem.role}
                </h3>
                <span className="text-sm sm:text-base font-semibold text-[#00f5d4] font-mono mt-1 block">
                  {activeItem.company}
                </span>
              </div>

              {/* Time & Location Metadata */}
              <div className="flex flex-col md:items-end gap-1 font-mono text-xs text-neutral-400 shrink-0">
                <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-white font-medium">
                  <Calendar className="w-3.5 h-3.5 text-[#00f5d4]" />
                  <span>{activeItem.period}</span>
                </div>
                <div className="flex items-center gap-1.5 text-neutral-400 text-[11px] mt-1">
                  <MapPin className="w-3 h-3" />
                  <span>{activeItem.location}</span>
                </div>
              </div>
            </div>

            {/* Narrative Summary */}
            <p className="text-sm sm:text-base md:text-lg text-neutral-200 font-light leading-relaxed">
              {activeItem.summary}
            </p>

            {/* Specialized Projects Sub-Cards (if available, e.g. Acxion Apollo & Floor/Furnishing) */}
            {activeItem.projects && activeItem.projects.length > 0 && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5 sm:gap-4 my-1">
                {activeItem.projects.map((proj, pIdx) => (
                  <div
                    key={pIdx}
                    className="p-4 sm:p-5 rounded-2xl bg-black/40 border border-white/10 hover:border-[#00f5d4]/40 transition group flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm sm:text-base font-bold text-white group-hover:text-[#00f5d4] transition flex items-center gap-2">
                          <Code2 className="w-4 h-4 text-[#00f5d4]" />
                          {proj.name}
                        </span>
                        <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-[#00f5d4]/10 text-[#00f5d4] border border-[#00f5d4]/30">
                          {proj.tag}
                        </span>
                      </div>
                      <p className="text-xs sm:text-sm text-neutral-300 font-light leading-relaxed">
                        {proj.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Key Contributions / Highlights Grid */}
            <div className="space-y-2.5 pt-2">
              <span className="text-xs font-mono font-semibold text-neutral-400 uppercase tracking-wider block">
                Key Highlights:
              </span>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5 sm:gap-3">
                {activeItem.highlights.map((h, i) => (
                  <div
                    key={i}
                    className="flex items-start gap-2.5 p-3 rounded-xl bg-white/[0.02] border border-white/5 text-xs sm:text-sm text-neutral-300"
                  >
                    <CheckCircle2 className="w-4 h-4 text-[#00f5d4] shrink-0 mt-0.5" />
                    <span className="leading-snug">{h}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Technologies Strip */}
            <div className="pt-4 border-t border-white/10">
              <span className="text-xs font-mono text-neutral-400 block mb-2">
                Tech Stack & Core Competencies:
              </span>
              <div className="flex flex-wrap gap-1.5 sm:gap-2">
                {activeItem.technologies.map((tech) => (
                  <span
                    key={tech}
                    className="px-2.5 py-1 rounded-lg text-xs font-mono bg-white/5 border border-white/10 text-neutral-300 hover:text-white hover:border-[#00f5d4]/40 transition"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
