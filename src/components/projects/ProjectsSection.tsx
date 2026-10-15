"use client";

import React, { useState } from "react";
import {
  ExternalLink,
  Workflow,
  Utensils,
  CheckCircle2,
} from "lucide-react";
import { GithubIcon } from "@/components/ui/Icons";
import { projects } from "@/data/projects";

type CategoryFilter = "ALL" | "AI & LLM" | "Systems & Tooling" | "Language & Compilers" | "Full Stack";

export function ProjectsSection() {
  const [filter, setFilter] = useState<CategoryFilter>("ALL");

  // MoodBite Interactive Simulation State
  const [selectedMood, setSelectedMood] = useState<"FATIGUED" | "STRESSED" | "FOCUS">("FATIGUED");
  const [isVegOnly, setIsVegOnly] = useState<boolean>(true);

  const moodSimulationData = {
    FATIGUED: {
      profile: "High Comfort · Warm Temperature",
      recommended: isVegOnly ? "Adrak Chai + Warm Moong Dal Khichdi" : "Warm Chicken Clear Soup + Ginger Infusion",
      rationale:
        "Tryptophan-rich protein with gingerol intervention eases autonomic nervous tension without glucose spikes.",
      confidence: "94.2% Match",
    },
    STRESSED: {
      profile: "Crunch Sensory Intervention · High Magnesium",
      recommended: isVegOnly ? "Sprouted Moong Chaat + Cold Mint Chaas" : "Grilled Paneer & Roasted Makhana",
      rationale:
        "Crunchy textures stimulate mastication reflexes to regulate cortisol; mint modulates neuro-inflammation.",
      confidence: "91.8% Match",
    },
    FOCUS: {
      profile: "Sustained Energy · Low Glycemic Index",
      recommended: isVegOnly ? "South Indian Filter Coffee + Steamed Idli" : "Black Coffee + Egg White Scramble",
      rationale:
        "Slow-release complex carbs with balanced caffeine sustain acetylcholine for deep analytical work.",
      confidence: "96.5% Match",
    },
  };

  const moodBite = projects.find((p) => p.id === "moodbite-ai")!;
  const skillFoundry = projects.find((p) => p.id === "skillfoundry")!;
  const printerResolver = projects.find((p) => p.id === "printer-support-resolver")!;
  const ezyLang = projects.find((p) => p.id === "ezy-lang")!;
  const gateSystem = projects.find((p) => p.id === "gate-intelligence")!;
  const auraAi = projects.find((p) => p.id === "aura-ai")!;

  return (
    <section
      id="projects"
      aria-label="Engineered Projects & Systems"
      className="relative py-16 sm:py-24 md:py-32 px-4 sm:px-6 lg:px-12 max-w-7xl mx-auto z-10 w-full overflow-hidden"
    >
      {/* Section Header Motif */}
      <div
        aria-hidden="true"
        className="flex items-center gap-3 sm:gap-4 mb-6 sm:mb-8 text-xs font-mono text-neutral-400 tracking-wider"
      >
        <span className="w-6 sm:w-8 h-[1px] bg-[#00f5d4]" />
        <span className="text-[#00f5d4]">SECTION 03</span>
        <span className="text-neutral-600">//</span>
        <span className="truncate">SYSTEMS & AI APPLICATIONS</span>
      </div>

      {/* Header & Filter Controls */}
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-5 pb-8 sm:pb-12 border-b border-white/10 w-full">
        <div>
          <h2 className="text-3xl sm:text-5xl md:text-6xl font-black tracking-tight text-white">
            Featured Systems
          </h2>
          <p className="mt-3 text-sm sm:text-base md:text-lg text-neutral-300 max-w-2xl font-light">
            Architected beyond templates. Exploring compiler runtimes, deterministic AI pipelines,
            hardware driver resolution, and developer tooling.
          </p>
        </div>

        {/* Filter Pills */}
        <div className="flex flex-wrap gap-1.5 sm:gap-2">
          {(["ALL", "AI & LLM", "Systems & Tooling", "Language & Compilers", "Full Stack"] as CategoryFilter[]).map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              type="button"
              className={`px-3 py-1 rounded-full font-mono text-[11px] sm:text-xs transition cursor-pointer ${
                filter === cat
                  ? "bg-[#00f5d4] text-[#08090c] font-bold shadow-[0_0_12px_rgba(0,245,212,0.3)]"
                  : "bg-white/5 text-neutral-400 hover:text-white hover:bg-white/10 border border-white/10"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* SHOWCASE 1: MoodBite.AI */}
      {(filter === "ALL" || filter === "AI & LLM") && (
        <div className="mt-8 sm:mt-12 rounded-2xl sm:rounded-3xl glass-panel border border-[#00f5d4]/30 p-5 sm:p-8 md:p-10 relative overflow-hidden bg-gradient-to-b from-[#00f5d4]/[0.03] to-transparent w-full">
          <div className="flex flex-col lg:flex-row justify-between gap-6 sm:gap-8">
            {/* Left Narrative */}
            <div className="lg:w-7/12">
              <div className="flex flex-wrap items-center gap-1.5 sm:gap-2 mb-2.5">
                <span className="px-2.5 py-0.5 rounded-full text-[11px] font-mono bg-[#00f5d4]/10 text-[#00f5d4] border border-[#00f5d4]/30">
                  Featured AI Engine
                </span>
                <span className="px-2.5 py-0.5 rounded-full text-[11px] font-mono bg-white/5 text-neutral-300 border border-white/10">
                  Indian Culinary Ontologies
                </span>
              </div>

              <h3 className="text-2xl sm:text-3xl md:text-4xl font-black text-white tracking-tight">
                {moodBite.name}
              </h3>
              <p className="text-xs sm:text-sm font-mono text-[#00f5d4] mt-1">{moodBite.tagline}</p>

              <p className="mt-4 text-xs sm:text-sm md:text-base text-neutral-300 font-light leading-relaxed">
                {moodBite.description}
              </p>

              <div className="mt-4 p-3 sm:p-4 rounded-xl bg-black/40 border border-white/5 space-y-1.5">
                <div className="text-xs font-mono text-white font-semibold flex items-center gap-2">
                  <Workflow className="w-3.5 h-3.5 text-[#00f5d4]" />
                  <span>Pipeline Architecture:</span>
                </div>
                <div className="font-mono text-[11px] text-neutral-400 break-words">
                  Mood + Context → Dietary Guard → Sensory Profile → Deterministic Scoring → Explainable Rationale
                </div>
              </div>

              {/* Architecture Highlights */}
              <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 gap-2">
                {moodBite.architectureHighlights.map((hl, idx) => (
                  <div key={idx} className="flex items-center gap-2 text-xs text-neutral-300">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#00f5d4] shrink-0" />
                    <span>{hl}</span>
                  </div>
                ))}
              </div>

              {/* Technologies */}
              <div className="mt-5 flex flex-wrap gap-1.5">
                {moodBite.technologies.map((t) => (
                  <span
                    key={t}
                    className="px-2 py-0.5 rounded text-[11px] font-mono bg-white/5 border border-white/10 text-neutral-300"
                  >
                    {t}
                  </span>
                ))}
              </div>

              {/* Real Project Interface Preview */}
              {moodBite.image && (
                <div className="mt-5 rounded-xl overflow-hidden border border-white/10 group relative bg-black/40">
                  <img
                    src={moodBite.image}
                    alt="MoodBite.AI Application Interface"
                    className="w-full h-40 sm:h-48 object-cover object-top hover:scale-[1.02] transition duration-300"
                    loading="lazy"
                  />
                </div>
              )}

              {/* Actions */}
              <div className="mt-5 flex flex-wrap items-center gap-3">
                {moodBite.githubUrl && (
                  <a
                    href={moodBite.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-4 py-2.5 rounded-full bg-[#00f5d4] text-[#08090c] font-mono text-xs font-bold hover:bg-[#38bdf8] transition cursor-pointer"
                  >
                    <GithubIcon className="w-4 h-4" />
                    <span>View on GitHub</span>
                  </a>
                )}
                {moodBite.liveUrl && (
                  <a
                    href={moodBite.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 px-4 py-2.5 rounded-full bg-white/5 border border-white/15 text-white font-mono text-xs hover:bg-white/10 transition"
                  >
                    <span>Live Demo</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                )}
              </div>
            </div>

            {/* Right Interactive Culinary Pipeline Simulation */}
            <div className="lg:w-5/12 rounded-2xl bg-black/60 border border-white/10 p-4 sm:p-6 flex flex-col justify-between w-full">
              <div>
                <div className="flex items-center justify-between border-b border-white/10 pb-2.5 mb-3.5">
                  <div className="flex items-center gap-2 text-xs font-mono text-white">
                    <Utensils className="w-3.5 h-3.5 text-[#00f5d4]" />
                    <span>PIPELINE SIMULATION</span>
                  </div>
                  <span className="text-[10px] font-mono text-emerald-400">ACTIVE</span>
                </div>

                {/* Mood Input Selection */}
                <div className="mb-3.5">
                  <span className="text-[11px] font-mono text-neutral-400 block mb-1.5">
                    Select Context State:
                  </span>
                  <div className="grid grid-cols-3 gap-1.5">
                    {(["FATIGUED", "STRESSED", "FOCUS"] as const).map((m) => (
                      <button
                        key={m}
                        onClick={() => setSelectedMood(m)}
                        type="button"
                        className={`py-1 px-1.5 rounded-lg text-[11px] font-mono transition cursor-pointer text-center ${
                          selectedMood === m
                            ? "bg-[#00f5d4]/20 border border-[#00f5d4] text-white font-bold"
                            : "bg-white/5 border border-white/10 text-neutral-400 hover:text-white"
                        }`}
                      >
                        {m}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Dietary Preference Toggle */}
                <div className="flex items-center justify-between py-1.5 px-3 rounded-lg bg-white/5 border border-white/10 mb-3.5 text-xs font-mono">
                  <span className="text-neutral-300 text-[11px]">Dietary Guard:</span>
                  <button
                    onClick={() => setIsVegOnly(!isVegOnly)}
                    type="button"
                    className={`px-2 py-0.5 rounded text-[10px] font-bold transition cursor-pointer ${
                      isVegOnly
                        ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/30"
                        : "bg-amber-500/20 text-amber-300 border border-amber-500/30"
                    }`}
                  >
                    {isVegOnly ? "Pure Veg" : "Omnivore"}
                  </button>
                </div>

                {/* Output Card */}
                <div className="p-3.5 rounded-xl bg-[#08090c] border border-white/10 space-y-2.5 font-mono">
                  <div>
                    <span className="text-[9px] text-neutral-500 uppercase">Sensory Target:</span>
                    <p className="text-xs text-[#00f5d4] font-medium mt-0.5">
                      {moodSimulationData[selectedMood].profile}
                    </p>
                  </div>

                  <div>
                    <span className="text-[9px] text-neutral-500 uppercase">Recommendation:</span>
                    <p className="text-xs sm:text-sm text-white font-bold mt-0.5 break-words">
                      {moodSimulationData[selectedMood].recommended}
                    </p>
                  </div>

                  <div>
                    <span className="text-[9px] text-neutral-500 uppercase">Rationale:</span>
                    <p className="text-[11px] text-neutral-300 font-sans leading-relaxed mt-0.5">
                      {moodSimulationData[selectedMood].rationale}
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-3 pt-2.5 border-t border-white/10 flex items-center justify-between text-[10px] font-mono text-neutral-500">
                <span>Scoring Engine</span>
                <span className="text-[#00f5d4]">{moodSimulationData[selectedMood].confidence}</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* SHOWCASE 2: SkillFoundry */}
      {(filter === "ALL" || filter === "AI & LLM" || filter === "Systems & Tooling") && (
        <div className="mt-8 rounded-2xl sm:rounded-3xl glass-panel border border-white/10 p-5 sm:p-8 md:p-10 relative overflow-hidden w-full">
          <div className="flex flex-col lg:flex-row justify-between gap-6 sm:gap-8 items-start lg:items-center">
            {/* Left Narrative */}
            <div className="lg:w-6/12 w-full">
              <div className="flex flex-wrap items-center gap-1.5 sm:gap-2 mb-2.5">
                <span className="px-2.5 py-0.5 rounded-full text-[11px] font-mono bg-purple-500/10 text-purple-300 border border-purple-500/30">
                  CLI & LLM Tooling
                </span>
                <span className="px-2.5 py-0.5 rounded-full text-[11px] font-mono bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
                  53 Tests Passing
                </span>
                <span className="px-2.5 py-0.5 rounded-full text-[11px] font-mono bg-cyan-500/10 text-cyan-400 border border-cyan-500/30">
                  0 Pyright Diagnostics
                </span>
              </div>

              <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white tracking-tight">
                {skillFoundry.name}
              </h3>
              <p className="text-xs font-mono text-neutral-400 mt-1">{skillFoundry.tagline}</p>

              <p className="mt-3 text-xs sm:text-sm md:text-base text-neutral-300 font-light leading-relaxed">
                {skillFoundry.description}
              </p>

              <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-neutral-300">
                {skillFoundry.architectureHighlights.map((hl, idx) => (
                  <div key={idx} className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-purple-400 shrink-0" />
                    <span>{hl}</span>
                  </div>
                ))}
              </div>

              <div className="mt-5 flex flex-wrap gap-1.5">
                {skillFoundry.technologies.map((t) => (
                  <span
                    key={t}
                    className="px-2 py-0.5 rounded text-[11px] font-mono bg-white/5 border border-white/10 text-neutral-300"
                  >
                    {t}
                  </span>
                ))}
              </div>

              <div className="mt-6 flex items-center gap-3">
                {skillFoundry.githubUrl && (
                  <a
                    href={skillFoundry.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-4 py-2.5 rounded-full border border-purple-500/40 bg-purple-500/10 hover:bg-purple-500/20 text-white font-mono text-xs transition cursor-pointer"
                  >
                    <GithubIcon className="w-4 h-4 text-purple-400" />
                    <span>View on GitHub</span>
                  </a>
                )}
              </div>
            </div>

            {/* Right Terminal Simulation */}
            <div className="lg:w-6/12 w-full rounded-2xl bg-[#050608] border border-white/10 p-4 sm:p-5 font-mono text-xs shadow-2xl overflow-hidden">
              <div className="flex items-center justify-between border-b border-white/10 pb-2.5 mb-3">
                <div className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
                  <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80" />
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
                  <span className="ml-2 text-neutral-400 text-[11px]">sf-cli // terminal</span>
                </div>
                <span className="text-emerald-400 text-[10px]">VERIFIED</span>
              </div>

              <div className="space-y-1.5 text-neutral-300 overflow-x-auto text-[11px] sm:text-xs">
                <p className="text-neutral-500">$ sf setup --provider ollama --model qwen2.5:1.5b</p>
                <p className="text-[#00f5d4]">✓ Connected to local Ollama daemon (localhost:11434)</p>
                <p className="text-neutral-500 mt-2">$ pytest tests/ -v</p>
                <p className="text-emerald-400 font-bold">
                  ✓ 53 passed in 1.42s (100% test coverage)
                </p>
                <p className="text-neutral-500 mt-2">$ pyright src/</p>
                <p className="text-emerald-400 font-bold">
                  0 errors, 0 warnings, 0 informations
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* SHOWCASE 3 & 4: Printer Support Resolver + Ezy Language & Runtime */}
      <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-6 w-full">
        {/* Printer Support Resolver */}
        {(filter === "ALL" || filter === "Systems & Tooling") && (
          <div className="rounded-2xl sm:rounded-3xl glass-panel border border-white/10 p-5 sm:p-7 flex flex-col justify-between w-full">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="px-2.5 py-0.5 rounded-full text-[11px] font-mono bg-blue-500/10 text-blue-300 border border-blue-500/30">
                  Hardware Systems
                </span>
                <span className="text-xs font-mono text-neutral-400">CUPS / PPD</span>
              </div>

              <h4 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                {printerResolver.name}
              </h4>
              <p className="text-xs font-mono text-neutral-400 mt-0.5">{printerResolver.tagline}</p>

              <p className="mt-3 text-xs sm:text-sm text-neutral-300 font-light leading-relaxed">
                {printerResolver.description}
              </p>

              <div className="mt-4 p-3 rounded-xl bg-black/40 border border-white/5 text-[11px] font-mono text-neutral-400">
                <span className="text-blue-400 font-semibold block mb-0.5">Pipeline:</span>
                IEEE 1284 ID → SQLite Index → PPD vs Driverless Gap Analysis → PackageKit
              </div>

              <div className="mt-4 flex flex-wrap gap-1">
                {printerResolver.technologies.map((t) => (
                  <span key={t} className="px-2 py-0.5 rounded text-[10px] sm:text-[11px] font-mono bg-white/5 text-neutral-300 border border-white/10">
                    {t}
                  </span>
                ))}
              </div>
            </div>

            <div className="mt-6 pt-3.5 border-t border-white/10 flex items-center justify-between">
              <span className="text-xs font-mono text-neutral-400">Resolution Engine</span>
              {printerResolver.githubUrl && (
                <a
                  href={printerResolver.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 text-xs font-mono text-white hover:text-[#00f5d4] transition"
                >
                  <span>Repository</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              )}
            </div>
          </div>
        )}

        {/* Ezy Scripting Language & Runtime */}
        {(filter === "ALL" || filter === "Language & Compilers" || filter === "Systems & Tooling") && (
          <div className="rounded-2xl sm:rounded-3xl glass-panel border border-white/10 p-5 sm:p-7 flex flex-col justify-between w-full">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="px-2.5 py-0.5 rounded-full text-[11px] font-mono bg-amber-500/10 text-amber-300 border border-amber-500/30">
                  Language & Compiler
                </span>
                <span className="text-xs font-mono text-neutral-400">AST Tree-Walk</span>
              </div>

              <h4 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                {ezyLang.name}
              </h4>
              <p className="text-xs font-mono text-neutral-400 mt-0.5">{ezyLang.tagline}</p>

              <p className="mt-3 text-xs sm:text-sm text-neutral-300 font-light leading-relaxed">
                {ezyLang.description}
              </p>

              <div className="mt-4 p-3 rounded-xl bg-black/40 border border-white/5 text-[11px] font-mono text-neutral-400">
                <span className="text-amber-400 font-semibold block mb-0.5">Stages:</span>
                Source Code → Lexer (Tokens) → Recursive Descent Parser → AST → Scoped Evaluator
              </div>

              {ezyLang.image && (
                <div className="mt-4 rounded-xl overflow-hidden border border-white/10 bg-black/40">
                  <img
                    src={ezyLang.image}
                    alt="Ezy Language AST and Interpreter"
                    className="w-full h-32 sm:h-36 object-cover object-top hover:scale-[1.02] transition duration-300"
                    loading="lazy"
                  />
                </div>
              )}

              <div className="mt-4 flex flex-wrap gap-1">
                {ezyLang.technologies.map((t) => (
                  <span key={t} className="px-2 py-0.5 rounded text-[10px] sm:text-[11px] font-mono bg-white/5 text-neutral-300 border border-white/10">
                    {t}
                  </span>
                ))}
              </div>
            </div>

            <div className="mt-6 pt-3.5 border-t border-white/10 flex items-center justify-between">
              <span className="text-xs font-mono text-neutral-400">Interpreter Engine</span>
              {ezyLang.githubUrl && (
                <a
                  href={ezyLang.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 text-xs font-mono text-white hover:text-amber-400 transition"
                >
                  <span>Repository</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              )}
            </div>
          </div>
        )}
      </div>

      {/* SHOWCASE 5 & 6: GATE Question Intelligence & Aura.AI */}
      <div className="mt-6 grid grid-cols-1 lg:grid-cols-2 gap-6 w-full">
        {(filter === "ALL" || filter === "AI & LLM") && (
          <div className="rounded-2xl sm:rounded-3xl glass-panel border border-white/10 p-5 sm:p-7 flex flex-col justify-between w-full">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="px-2.5 py-0.5 rounded-full text-[11px] font-mono bg-teal-500/10 text-teal-300 border border-teal-500/30">
                  OCR & Analytics
                </span>
                <span className="text-xs font-mono text-neutral-400">GATE CS</span>
              </div>
              <h4 className="text-lg sm:text-xl font-bold text-white">{gateSystem.name}</h4>
              <p className="mt-1.5 text-xs sm:text-sm text-neutral-300 font-light leading-relaxed">
                {gateSystem.description}
              </p>
            </div>
            <div className="mt-5 pt-3.5 border-t border-white/10 flex flex-wrap gap-1">
              {gateSystem.technologies.map((t) => (
                <span key={t} className="px-2 py-0.5 rounded text-[10px] font-mono bg-white/5 text-neutral-400">
                  {t}
                </span>
              ))}
            </div>
          </div>
        )}

        {(filter === "ALL" || filter === "Full Stack") && (
          <div className="rounded-2xl sm:rounded-3xl glass-panel border border-white/10 p-5 sm:p-7 flex flex-col justify-between w-full">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="px-2.5 py-0.5 rounded-full text-[11px] font-mono bg-indigo-500/10 text-indigo-300 border border-indigo-500/30">
                  Full Stack
                </span>
                <span className="text-xs font-mono text-neutral-400">Career Mentorship</span>
              </div>
              <h4 className="text-lg sm:text-xl font-bold text-white">{auraAi.name}</h4>
              <p className="mt-1.5 text-xs sm:text-sm text-neutral-300 font-light leading-relaxed">
                {auraAi.description}
              </p>
            </div>
            {auraAi.image && (
              <div className="mt-3 rounded-xl overflow-hidden border border-white/10 bg-black/40">
                <img
                  src={auraAi.image}
                  alt="Aura.AI Career Assessment Platform"
                  className="w-full h-32 sm:h-36 object-cover object-top hover:scale-[1.02] transition duration-300"
                  loading="lazy"
                />
              </div>
            )}
            <div className="mt-5 pt-3.5 border-t border-white/10 flex flex-wrap gap-1">
              {auraAi.technologies.map((t) => (
                <span key={t} className="px-2 py-0.5 rounded text-[10px] font-mono bg-white/5 text-neutral-400">
                  {t}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
