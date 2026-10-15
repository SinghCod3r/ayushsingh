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
import { Sparkles, Terminal, CheckCircle2 } from "lucide-react";
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
  const [selectedCategory, setSelectedCategory] = useState<string>("ALL");
  const [activeTech, setActiveTech] = useState<TechItem>(techStackCategories[0].items[0]);
  const [cardTilt, setCardTilt] = useState<{ [key: string]: { x: number; y: number } }>({});

  const displayedCategories =
    selectedCategory === "ALL"
      ? techStackCategories
      : techStackCategories.filter((c) => c.title === selectedCategory);

  const handleCardMouseMove = (title: string, e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientY - rect.top) / rect.height - 0.5) * -10;
    const y = ((e.clientX - rect.left) / rect.width - 0.5) * 10;
    setCardTilt((prev) => ({ ...prev, [title]: { x, y } }));
  };

  const handleCardMouseLeave = (title: string) => {
    setCardTilt((prev) => ({ ...prev, [title]: { x: 0, y: 0 } }));
  };

  const activeMeta = getTechMeta(activeTech.name);
  const ActiveIcon = activeMeta.icon;

  return (
    <section
      id="tech-stack"
      aria-label="Technologies & Practical Systems Exposure"
      className="relative py-16 sm:py-24 md:py-32 px-4 sm:px-6 lg:px-12 max-w-7xl mx-auto z-10 w-full overflow-hidden"
    >
      {/* Section Motif */}
      <div
        aria-hidden="true"
        className="flex items-center gap-3 sm:gap-4 mb-6 sm:mb-8 text-xs font-mono text-neutral-400 tracking-wider"
      >
        <span className="w-6 sm:w-8 h-[1px] bg-[#00f5d4]" />
        <span className="text-[#00f5d4]">SECTION 04</span>
        <span className="text-neutral-600">//</span>
        <span>MODERN 3D TECH STACK & ARCHITECTURAL LOGOS</span>
      </div>

      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-5 pb-8 sm:pb-12 border-b border-white/10 w-full">
        <div>
          <h2 className="text-3xl sm:text-5xl md:text-6xl font-black tracking-tight text-white">
            Practical Tech Stack
          </h2>
          <p className="mt-3 text-sm sm:text-base md:text-lg text-neutral-300 max-w-2xl font-light">
            Engineered toolchains across open-source daemons, compiler runtimes, and local AI pipelines.
            Contextualized with authentic brand icons and real production usage.
          </p>
        </div>

        {/* Filter by Category */}
        <div className="flex flex-wrap gap-1.5 sm:gap-2">
          <button
            onClick={() => setSelectedCategory("ALL")}
            type="button"
            className={`px-3 py-1.5 rounded-full text-[11px] sm:text-xs font-mono transition cursor-pointer ${
              selectedCategory === "ALL"
                ? "bg-[#00f5d4] text-[#08090c] font-bold shadow-[0_0_15px_rgba(0,245,212,0.3)]"
                : "bg-white/5 text-neutral-400 hover:text-white border border-white/10"
            }`}
          >
            All
          </button>
          {techStackCategories.map((c) => (
            <button
              key={c.title}
              onClick={() => setSelectedCategory(c.title)}
              type="button"
              className={`px-3 py-1.5 rounded-full text-[11px] sm:text-xs font-mono transition cursor-pointer ${
                selectedCategory === c.title
                  ? "bg-[#00f5d4] text-[#08090c] font-bold shadow-[0_0_15px_rgba(0,245,212,0.3)]"
                  : "bg-white/5 text-neutral-400 hover:text-white border border-white/10"
              }`}
            >
              {c.title}
            </button>
          ))}
        </div>
      </div>

      {/* 3D HOLOGRAPHIC CONTEXT INSPECTOR CONSOLE */}
      {activeTech && (
        <div
          className="mt-8 rounded-2xl sm:rounded-3xl glass-panel border border-[#00f5d4]/40 p-5 sm:p-7 relative overflow-hidden bg-gradient-to-br from-[#00f5d4]/[0.08] via-black/80 to-[#0c121e] shadow-2xl transition-all duration-300 w-full"
          style={{
            boxShadow: `0 20px 50px -15px ${activeMeta.color}35`,
          }}
        >
          {/* Subtle Dynamic Ambient Backlight */}
          <div
            aria-hidden="true"
            className="absolute top-0 right-0 w-80 h-80 rounded-full blur-3xl opacity-20 pointer-events-none"
            style={{ backgroundColor: activeMeta.color }}
          />

          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 relative z-10">
            <div className="flex items-center gap-4 sm:gap-6">
              {/* 3D Rotating Logo Emblem */}
              <div
                className="w-14 h-14 sm:w-18 sm:h-18 rounded-2xl border flex items-center justify-center p-3 shadow-xl shrink-0 group transition-transform duration-300 hover:scale-105"
                style={{
                  backgroundColor: `${activeMeta.color}15`,
                  borderColor: `${activeMeta.color}50`,
                  boxShadow: `0 10px 30px -5px ${activeMeta.color}40`,
                }}
              >
                <ActiveIcon
                  className="w-8 h-8 sm:w-10 sm:h-10 transition-transform duration-500 group-hover:rotate-6"
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

                <p className="text-xs sm:text-sm text-neutral-200 font-light max-w-3xl leading-relaxed mt-1">
                  <span className="text-[#00f5d4] font-mono font-medium">Production Context: </span>
                  {activeTech.context}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2 text-xs font-mono text-neutral-400 shrink-0 self-start lg:self-center border-t lg:border-t-0 pt-3 lg:pt-0 border-white/10 w-full lg:w-auto justify-between lg:justify-end">
              <span className="flex items-center gap-1.5 text-emerald-400">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>Verified in Codebase</span>
              </span>
            </div>
          </div>
        </div>
      )}

      {/* 3D CATEGORIES GRID WITH AUTHENTIC BRAND LOGOS */}
      <div className="mt-8 sm:mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
        {displayedCategories.map((cat) => {
          const tilt = cardTilt[cat.title] || { x: 0, y: 0 };
          return (
            <div
              key={cat.title}
              className="perspective-[1000px] w-full"
              onMouseMove={(e) => handleCardMouseMove(cat.title, e)}
              onMouseLeave={() => handleCardMouseLeave(cat.title)}
            >
              <div
                className="p-5 sm:p-6 rounded-2xl sm:rounded-3xl glass-panel border border-white/15 flex flex-col justify-between transition-transform duration-200 ease-out h-full bg-gradient-to-br from-[#0c0f16]/90 via-[#07090f]/95 to-black relative overflow-hidden"
                style={{
                  transform: `rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
                  boxShadow: "0 20px 40px -15px rgba(0, 0, 0, 0.6)",
                }}
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[11px] font-mono text-[#00f5d4] uppercase tracking-wider font-bold">
                      {cat.tag}
                    </span>
                    <span className="text-[10px] font-mono text-neutral-400">
                      {cat.items.length} Modules
                    </span>
                  </div>

                  <h3 className="text-xl font-bold text-white tracking-tight">{cat.title}</h3>
                  <p className="mt-1 text-xs text-neutral-300 font-light leading-relaxed">
                    {cat.subtitle}
                  </p>

                  {/* 3D Interactive Technology Badges with Real Brand Logos */}
                  <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {cat.items.map((tech) => {
                      const meta = getTechMeta(tech.name);
                      const Icon = meta.icon;
                      const isInspected = activeTech?.name === tech.name;

                      return (
                        <button
                          key={tech.name}
                          onClick={() => setActiveTech(tech)}
                          type="button"
                          className={`flex items-center gap-2.5 p-2 rounded-xl text-xs font-mono transition-all duration-200 text-left cursor-pointer border ${
                            isInspected
                              ? "bg-white/15 text-white font-bold border-[#00f5d4] shadow-[0_0_15px_rgba(0,245,212,0.25)] scale-[1.02]"
                              : "bg-white/5 hover:bg-white/10 border-white/10 text-neutral-300 hover:text-white hover:border-white/20"
                          }`}
                        >
                          <div
                            className="w-6 h-6 rounded-lg flex items-center justify-center shrink-0 border"
                            style={{
                              backgroundColor: `${meta.color}15`,
                              borderColor: `${meta.color}30`,
                            }}
                          >
                            <Icon
                              className="w-3.5 h-3.5"
                              style={{ color: meta.color }}
                            />
                          </div>
                          <span className="truncate">{tech.name}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div className="mt-6 pt-3 border-t border-white/5 flex items-center justify-between text-[10px] font-mono text-neutral-500">
                  <span>Interactive 3D Deck</span>
                  <span className="text-neutral-400">Click node to inspect</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
