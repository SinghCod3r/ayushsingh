"use client";

import React, { useState } from "react";
import {
  SiLinux,
  SiPython,
  SiTypescript,
  SiJavascript,
  SiNextdotjs,
  SiNodedotjs,
  SiDocker,
  SiGit,
  SiSqlite,
  SiMongodb,
  SiPrisma,
  SiFastapi,
  SiTailwindcss,
  SiThreedotjs,
  SiVite,
  SiOllama,
  SiPytorch,
  SiTerraform,
  SiGtk,
  SiGnu,
  SiUbuntu,
  SiGithubactions,
} from "react-icons/si";
import {
  FaJava,
  FaTerminal,
  FaNetworkWired,
  FaPrint,
  FaDatabase,
  FaMicrochip,
  FaAws,
} from "react-icons/fa";
import { Sparkles, CheckCircle2, Cpu } from "lucide-react";
import { techStackCategories, TechItem } from "@/data/techstack";

// Map each technology name to its authentic brand icon and color
const techIconMap: Record<
  string,
  { icon: React.ComponentType<{ className?: string; style?: React.CSSProperties }>; color: string }
> = {
  // Systems & Linux
  Linux: { icon: SiLinux, color: "#facc15" },
  CUPS: { icon: FaPrint, color: "#38bdf8" },
  "GTK 3 / PyGObject": { icon: SiGtk, color: "#ef4444" },
  GLib: { icon: SiGnu, color: "#c084fc" },
  "D-Bus": { icon: FaNetworkWired, color: "#00f5d4" },
  "IPP / DNS-SD": { icon: FaPrint, color: "#38bdf8" },
  "PPD / IPP-over-USB": { icon: FaPrint, color: "#f59e0b" },
  PackageKit: { icon: SiUbuntu, color: "#f97316" },

  // Programming Languages
  Python: { icon: SiPython, color: "#38bdf8" },
  TypeScript: { icon: SiTypescript, color: "#3178c6" },
  "JavaScript (ES6+)": { icon: SiJavascript, color: "#f7df1e" },
  Java: { icon: FaJava, color: "#f89820" },
  SQL: { icon: FaDatabase, color: "#00f5d4" },

  // AI & Local LLM
  Ollama: { icon: SiOllama, color: "#ffffff" },
  "Local LLM Workflows": { icon: FaTerminal, color: "#00f5d4" },
  "EasyOCR / pdf2image": { icon: SiPython, color: "#a855f7" },
  "Recommendation Systems": { icon: SiPytorch, color: "#ee4c2c" },

  // Backend & APIs
  "Node.js & Express": { icon: SiNodedotjs, color: "#22c55e" },
  "FastAPI & Flask": { icon: SiFastapi, color: "#009688" },
  SQLite: { icon: SiSqlite, color: "#38bdf8" },
  "MySQL / MongoDB": { icon: SiMongodb, color: "#47a248" },
  "Prisma ORM": { icon: SiPrisma, color: "#e2e8f0" },

  // Frontend & Creative Tech
  "React & Next.js": { icon: SiNextdotjs, color: "#ffffff" },
  "Three.js / WebGL": { icon: SiThreedotjs, color: "#00f5d4" },
  "Tailwind CSS": { icon: SiTailwindcss, color: "#06b6d4" },
  Vite: { icon: SiVite, color: "#bd34fe" },

  // DevOps & Infrastructure
  Docker: { icon: SiDocker, color: "#2496ed" },
  "GitHub Actions": { icon: SiGithubactions, color: "#2088ff" },
  "AWS (EC2, S3)": { icon: FaAws, color: "#ff9900" },
  Terraform: { icon: SiTerraform, color: "#844fba" },
  "Git Workflow": { icon: SiGit, color: "#f05032" },
};

function getTechMeta(name: string) {
  return techIconMap[name] || { icon: FaMicrochip, color: "#00f5d4" };
}

export function TechStackSection() {
  // Active selected tech inspected in the 3D console
  const [activeTech, setActiveTech] = useState<TechItem>(techStackCategories[0].items[0]);

  // Group technologies into two continuous streams
  // Row 1: Systems, Linux, Languages, and AI Runtimes
  const row1Categories = techStackCategories.slice(0, 3);
  const row1Tech: TechItem[] = row1Categories.flatMap((c) => c.items);
  const stream1: TechItem[] = [...row1Tech, ...row1Tech, ...row1Tech];

  // Row 2: Backend, Frontend, Databases, and DevOps Infrastructure
  const row2Categories = techStackCategories.slice(3);
  const row2Tech: TechItem[] = row2Categories.flatMap((c) => c.items);
  const stream2: TechItem[] = [...row2Tech, ...row2Tech, ...row2Tech];

  const activeMeta = getTechMeta(activeTech.name);
  const ActiveIcon = activeMeta.icon;

  const renderTechPill = (tech: TechItem, prefix: string, idx: number) => {
    const meta = getTechMeta(tech.name);
    const Icon = meta.icon;
    const isSelected = activeTech.name === tech.name;

    return (
      <button
        key={`${prefix}-${tech.name}-${idx}`}
        onClick={() => setActiveTech(tech)}
        type="button"
        className={`flex items-center gap-3 px-4 py-2.5 rounded-2xl transition-all duration-200 select-none cursor-pointer flex-shrink-0 border ${
          isSelected
            ? "bg-white/15 text-white font-bold border-[#00f5d4] shadow-[0_0_20px_rgba(0,245,212,0.3)] scale-[1.03]"
            : "bg-[#0b0e15] border-white/10 hover:border-white/25 text-neutral-300 hover:text-white hover:bg-[#121622]"
        }`}
        style={{
          boxShadow: isSelected ? `0 0 18px ${meta.color}40` : undefined,
        }}
      >
        <div
          className="w-7 h-7 rounded-xl flex items-center justify-center shrink-0 border"
          style={{
            backgroundColor: `${meta.color}15`,
            borderColor: `${meta.color}35`,
          }}
        >
          <Icon className="w-4 h-4" style={{ color: meta.color }} />
        </div>
        <div className="flex flex-col text-left">
          <span className="text-xs font-mono font-bold leading-tight truncate max-w-[150px]">
            {tech.name}
          </span>
          <span className="text-[10px] font-mono text-neutral-400">
            {tech.category}
          </span>
        </div>
      </button>
    );
  };

  return (
    <section
      id="tech-stack"
      aria-label="Technologies & Practical Systems Exposure"
      className="relative py-12 sm:py-16 md:py-20 px-4 sm:px-6 lg:px-12 max-w-7xl mx-auto z-10 w-full overflow-hidden scroll-mt-16"
    >
      {/* Section Motif */}
      <div
        aria-hidden="true"
        className="flex items-center gap-3 sm:gap-4 mb-5 sm:mb-6 text-xs font-mono text-neutral-400 tracking-wider"
      >
        <span className="w-6 sm:w-8 h-[1px] bg-[#00f5d4]" />
        <span className="text-[#00f5d4]">SECTION 04</span>
        <span className="text-neutral-600">//</span>
        <span>CONTINUOUS 3D TECH STACK STREAM</span>
      </div>

      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-4 pb-6 sm:pb-8 border-b border-white/10 w-full">
        <div>
          <h2 className="text-3xl sm:text-5xl md:text-6xl font-black tracking-tight text-white">
            Practical Tech Stack
          </h2>
          <p className="mt-2 text-sm sm:text-base md:text-lg text-neutral-300 max-w-2xl font-light">
            Continuous dual-track architectural stream. Click any technology to inspect its production context without stopping the stream.
          </p>
        </div>

        <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs font-mono text-neutral-300 self-start">
          <Cpu className="w-3.5 h-3.5 text-[#00f5d4]" />
          <span>32+ Systems & Architectural Modules</span>
        </div>
      </div>

      {/* 3D HOLOGRAPHIC CONTEXT INSPECTOR CONSOLE */}
      <div
        className="mt-6 rounded-2xl sm:rounded-3xl glass-panel border border-white/15 p-5 sm:p-7 relative overflow-hidden bg-gradient-to-br from-[#00f5d4]/[0.06] via-black/80 to-[#0c121e] shadow-2xl transition-all duration-300 w-full"
        style={{
          boxShadow: `0 20px 45px -15px ${activeMeta.color}30`,
        }}
      >
        {/* Subtle Ambient Backlight */}
        <div
          aria-hidden="true"
          className="absolute top-0 right-0 w-72 h-72 rounded-full blur-3xl opacity-20 pointer-events-none"
          style={{ backgroundColor: activeMeta.color }}
        />

        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-5 relative z-10">
          <div className="flex items-center gap-4 sm:gap-5">
            {/* 3D Logo Emblem */}
            <div
              className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl border flex items-center justify-center p-3 shadow-xl shrink-0 group transition-transform duration-300 hover:scale-105"
              style={{
                backgroundColor: `${activeMeta.color}15`,
                borderColor: `${activeMeta.color}50`,
                boxShadow: `0 10px 25px -5px ${activeMeta.color}40`,
              }}
            >
              <ActiveIcon
                className="w-8 h-8 sm:w-9 sm:h-9 transition-transform duration-500 group-hover:rotate-6"
                style={{ color: activeMeta.color }}
              />
            </div>

            <div>
              <div className="flex flex-wrap items-center gap-2 mb-1">
                <h3 className="text-xl sm:text-2xl md:text-3xl font-black text-white tracking-tight">
                  {activeTech.name}
                </h3>
                <span
                  className="px-2.5 py-0.5 rounded text-[10px] font-mono font-bold border uppercase"
                  style={{
                    backgroundColor: `${activeMeta.color}20`,
                    color: activeMeta.color,
                    borderColor: `${activeMeta.color}50`,
                  }}
                >
                  {activeTech.proficiencyLevel || "Core Focus"}
                </span>
                <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-white/5 text-neutral-400 border border-white/10">
                  {activeTech.category}
                </span>
              </div>

              <p className="text-xs sm:text-sm text-neutral-200 font-light max-w-3xl leading-relaxed mt-0.5">
                <span className="text-[#00f5d4] font-mono font-medium">Production Context: </span>
                {activeTech.context}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 text-xs font-mono text-neutral-400 shrink-0 self-start lg:self-center border-t lg:border-t-0 pt-2 lg:pt-0 border-white/10 w-full lg:w-auto justify-between lg:justify-end">
            <span className="flex items-center gap-1.5 text-emerald-400 text-xs font-mono">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>Verified in Codebase</span>
            </span>
          </div>
        </div>
      </div>

      {/* DUAL-LINE CONTINUOUS NON-STOP TECH STREAM WITH ZERO EDGE CUTOFF */}
      <div className="mt-8 relative w-full overflow-hidden py-2 space-y-3.5">
        {/* Left Gradient Fade Mask (prevents left edge cutoff) */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-y-0 left-0 w-16 sm:w-28 bg-gradient-to-r from-[#08090c] to-transparent z-10"
        />

        {/* Right Gradient Fade Mask (prevents right edge cutoff) */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-y-0 right-0 w-16 sm:w-28 bg-gradient-to-l from-[#08090c] to-transparent z-10"
        />

        {/* STREAM 1 (Top Line): Glides continuously left without stopping on hover or click */}
        <div className="animate-tech-stream-left gap-3.5">
          {stream1.map((tech, i) => renderTechPill(tech, "s1", i))}
        </div>

        {/* STREAM 2 (Bottom Line): Glides continuously in reverse right without stopping on hover or click */}
        <div className="animate-tech-stream-right gap-3.5">
          {stream2.map((tech, i) => renderTechPill(tech, "s2", i))}
        </div>
      </div>
    </section>
  );
}
