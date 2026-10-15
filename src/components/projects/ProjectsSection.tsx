"use client";

import React, { useState } from "react";
import {
  Sparkles,
  ExternalLink,
  Cpu,
  Layers,
  Terminal,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  Workflow,
  Utensils,
  Code2,
  FileSearch,
  Compass,
} from "lucide-react";
import { GithubIcon } from "@/components/ui/Icons";
import { projects, ProjectItem } from "@/data/projects";

type CategoryFilter = "ALL" | "AI & LLM" | "Systems & Tooling" | "Language & Compilers" | "Full Stack";

export function ProjectsSection() {
  const [filter, setFilter] = useState<CategoryFilter>("ALL");

  // MoodBite Interactive Simulation State
  const [selectedMood, setSelectedMood] = useState<"FATIGUED" | "STRESSED" | "FOCUS">("FATIGUED");
  const [isVegOnly, setIsVegOnly] = useState<boolean>(true);

  const moodSimulationData = {
    FATIGUED: {
      profile: "High Comfort · Warm Temperature · Mild Spices",
      recommended: isVegOnly ? "Adrak Chai + Warm Moong Dal Khichdi" : "Warm Chicken Clear Soup + Ginger Infusion",
      rationale:
        "Tryptophan-rich protein with gingerol intervention eases autonomic nervous tension and replenishes metabolic reserves without blood sugar spikes.",
      confidence: "94.2% Emotion Vector Match",
    },
    STRESSED: {
      profile: "Crunch Sensory Intervention · High Magnesium · Cool Temperature",
      recommended: isVegOnly ? "Sprouted Moong Chaat + Cold Mint Chaas" : "Grilled Paneer & Roasted Makhana Bowl",
      rationale:
        "Mastication of crunchy sensory textures triggers parasympathetic cortisol regulation; mint polyphenols modulate neuro-inflammatory markers.",
      confidence: "91.8% Emotion Vector Match",
    },
    FOCUS: {
      profile: "Sustained Energy · Low Glycemic Index · Thermogenic",
      recommended: isVegOnly ? "South Indian Filter Coffee + Steamed Idli Sambar" : "Black Coffee + Egg White Masala Scramble",
      rationale:
        "Balanced caffeine half-life with fermented complex carbohydrates sustains acetylcholine synthesis for deep analytical flow states.",
      confidence: "96.5% Emotion Vector Match",
    },
  };

  const filteredProjects =
    filter === "ALL"
      ? projects
      : projects.filter((p) => p.category === filter);

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
      className="relative py-24 sm:py-32 px-4 sm:px-6 lg:px-12 max-w-7xl mx-auto z-10"
    >
      {/* Section Motif */}
      <div
        aria-hidden="true"
        className="flex items-center gap-4 mb-8 text-xs font-mono text-neutral-400 tracking-wider"
      >
        <span className="w-8 h-[1px] bg-[#00f5d4]" />
        <span className="text-[#00f5d4]">SECTION 03</span>
        <span className="text-neutral-600">//</span>
        <span>ENGINEERED SYSTEMS & AI APPLICATIONS</span>
      </div>

      {/* Header & Filter Controls */}
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-12 border-b border-white/10">
        <div>
          <h2 className="text-4xl sm:text-6xl font-black tracking-tight text-white">
            Featured Systems
          </h2>
          <p className="mt-4 text-base sm:text-lg text-neutral-300 max-w-2xl font-light">
            Architected beyond templates. Exploring compiler internals, deterministic AI pipelines,
            hardware driver resolution, and production developer tooling.
          </p>
        </div>

        {/* Filter Pills */}
        <div className="flex flex-wrap gap-2">
          {(["ALL", "AI & LLM", "Systems & Tooling", "Language & Compilers", "Full Stack"] as CategoryFilter[]).map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              type="button"
              className={`px-3.5 py-1.5 rounded-full font-mono text-xs transition cursor-pointer ${
                filter === cat
                  ? "bg-[#00f5d4] text-[#08090c] font-bold shadow-[0_0_15px_rgba(0,245,212,0.3)]"
                  : "bg-white/5 text-neutral-400 hover:text-white hover:bg-white/10 border border-white/10"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* SHOWCASE 1: MoodBite.AI (Flagship AI Pipeline with Interactive Simulation) */}
      {(filter === "ALL" || filter === "AI & LLM") && (
        <div className="mt-14 rounded-3xl glass-panel border border-[#00f5d4]/30 p-6 sm:p-10 relative overflow-hidden bg-gradient-to-b from-[#00f5d4]/[0.03] to-transparent">
          <div className="flex flex-col lg:flex-row justify-between gap-8">
            {/* Left Narrative */}
            <div className="lg:w-7/12">
              <div className="flex flex-wrap items-center gap-2 mb-3">
                <span className="px-3 py-1 rounded-full text-xs font-mono bg-[#00f5d4]/10 text-[#00f5d4] border border-[#00f5d4]/30">
                  Featured AI Engine
                </span>
                <span className="px-3 py-1 rounded-full text-xs font-mono bg-white/5 text-neutral-300 border border-white/10">
                  Indian Culinary Ontologies
                </span>
              </div>

              <h3 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
                {moodBite.name}
              </h3>
              <p className="text-sm font-mono text-[#00f5d4] mt-1">{moodBite.tagline}</p>

              <div className="mt-6 space-y-4 text-sm sm:text-base text-neutral-300 font-light leading-relaxed">
                <p>{moodBite.description}</p>
                <div className="p-4 rounded-xl bg-black/40 border border-white/5 space-y-2">
                  <div className="text-xs font-mono text-white font-semibold flex items-center gap-2">
                    <Workflow className="w-4 h-4 text-[#00f5d4]" />
                    <span>The Multi-Factor Pipeline:</span>
                  </div>
                  <div className="font-mono text-xs text-neutral-400">
                    Mood + Context → Dietary Filter → Sensory Intervention → Deterministic Scoring → Explainable Rationale
                  </div>
                </div>
              </div>

              {/* Architecture Checklist */}
              <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {moodBite.architectureHighlights.map((hl, idx) => (
                  <div key={idx} className="flex items-center gap-2 text-xs text-neutral-300">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#00f5d4] shrink-0" />
                    <span>{hl}</span>
                  </div>
                ))}
              </div>

              {/* Technologies */}
              <div className="mt-6 flex flex-wrap gap-2">
                {moodBite.technologies.map((t) => (
                  <span
                    key={t}
                    className="px-2.5 py-1 rounded text-xs font-mono bg-white/5 border border-white/10 text-neutral-300"
                  >
                    {t}
                  </span>
                ))}
              </div>

              {/* Actions */}
              <div className="mt-8 flex items-center gap-3">
                {moodBite.githubUrl && (
                  <a
                    href={moodBite.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#00f5d4] text-[#08090c] font-mono text-xs font-bold hover:bg-[#38bdf8] transition cursor-pointer"
                  >
                    <GithubIcon className="w-4 h-4" />
                    <span>View MoodBite.AI on GitHub</span>
                  </a>
                )}
                {moodBite.liveUrl && (
                  <a
                    href={moodBite.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-4 py-2.5 rounded-full bg-white/5 border border-white/15 text-white font-mono text-xs hover:bg-white/10 transition"
                  >
                    <span>Live Demo</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                )}
              </div>
            </div>

            {/* Right Interactive Culinary Pipeline Simulation */}
            <div className="lg:w-5/12 rounded-2xl bg-black/60 border border-white/10 p-6 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between border-b border-white/10 pb-3 mb-4">
                  <div className="flex items-center gap-2 text-xs font-mono text-white">
                    <Utensils className="w-3.5 h-3.5 text-[#00f5d4]" />
                    <span>LIVE PIPELINE SIMULATION</span>
                  </div>
                  <span className="text-[10px] font-mono text-emerald-400">STATUS: ACTIVE</span>
                </div>

                {/* Mood Input Selection */}
                <div className="mb-4">
                  <span className="text-xs font-mono text-neutral-400 block mb-2">
                    Simulate Input Context:
                  </span>
                  <div className="grid grid-cols-3 gap-2">
                    {(["FATIGUED", "STRESSED", "FOCUS"] as const).map((m) => (
                      <button
                        key={m}
                        onClick={() => setSelectedMood(m)}
                        type="button"
                        className={`py-1.5 px-2 rounded-lg text-xs font-mono transition cursor-pointer ${
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
                <div className="flex items-center justify-between py-2 px-3 rounded-lg bg-white/5 border border-white/10 mb-4 text-xs font-mono">
                  <span className="text-neutral-300">Vegetarian Dietary Guard:</span>
                  <button
                    onClick={() => setIsVegOnly(!isVegOnly)}
                    type="button"
                    className={`px-2.5 py-0.5 rounded text-[11px] font-bold transition cursor-pointer ${
                      isVegOnly
                        ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/30"
                        : "bg-amber-500/20 text-amber-300 border border-amber-500/30"
                    }`}
                  >
                    {isVegOnly ? "Pure Vegetarian" : "Omnivore Allowed"}
                  </button>
                </div>

                {/* Simulation Output Card */}
                <div className="p-4 rounded-xl bg-[#08090c] border border-white/10 space-y-3 font-mono">
                  <div>
                    <span className="text-[10px] text-neutral-500 uppercase">Sensory Intervention:</span>
                    <p className="text-xs text-[#00f5d4] font-medium mt-0.5">
                      {moodSimulationData[selectedMood].profile}
                    </p>
                  </div>

                  <div>
                    <span className="text-[10px] text-neutral-500 uppercase">Recommended Food/Beverage:</span>
                    <p className="text-sm text-white font-bold mt-0.5">
                      {moodSimulationData[selectedMood].recommended}
                    </p>
                  </div>

                  <div>
                    <span className="text-[10px] text-neutral-500 uppercase">Explainable Rationale:</span>
                    <p className="text-[11px] text-neutral-300 font-sans leading-relaxed mt-0.5">
                      {moodSimulationData[selectedMood].rationale}
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-white/10 flex items-center justify-between text-[11px] font-mono text-neutral-500">
                <span>Deterministic Scoring Engine</span>
                <span className="text-[#00f5d4]">{moodSimulationData[selectedMood].confidence}</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* SHOWCASE 2: SkillFoundry (Developer Tooling CLI with passing test suite) */}
      {(filter === "ALL" || filter === "AI & LLM" || filter === "Systems & Tooling") && (
        <div className="mt-10 rounded-3xl glass-panel border border-white/10 p-6 sm:p-10 relative overflow-hidden">
          <div className="flex flex-col lg:flex-row justify-between gap-8 items-center">
            {/* Left Narrative */}
            <div className="lg:w-6/12">
              <div className="flex flex-wrap items-center gap-2 mb-3">
                <span className="px-3 py-1 rounded-full text-xs font-mono bg-purple-500/10 text-purple-300 border border-purple-500/30">
                  CLI & Developer Infrastructure
                </span>
                <span className="px-3 py-1 rounded-full text-xs font-mono bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
                  53 Tests Passing
                </span>
                <span className="px-3 py-1 rounded-full text-xs font-mono bg-cyan-500/10 text-cyan-400 border border-cyan-500/30">
                  0 Pyright Diagnostics
                </span>
              </div>

              <h3 className="text-2xl sm:text-4xl font-bold text-white tracking-tight">
                {skillFoundry.name}
              </h3>
              <p className="text-xs font-mono text-neutral-400 mt-1">{skillFoundry.tagline}</p>

              <p className="mt-4 text-sm sm:text-base text-neutral-300 font-light leading-relaxed">
                {skillFoundry.description}
              </p>

              <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-neutral-300">
                {skillFoundry.architectureHighlights.map((hl, idx) => (
                  <div key={idx} className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-purple-400 shrink-0" />
                    <span>{hl}</span>
                  </div>
                ))}
              </div>

              <div className="mt-6 flex flex-wrap gap-2">
                {skillFoundry.technologies.map((t) => (
                  <span
                    key={t}
                    className="px-2.5 py-1 rounded text-xs font-mono bg-white/5 border border-white/10 text-neutral-300"
                  >
                    {t}
                  </span>
                ))}
              </div>

              <div className="mt-8 flex items-center gap-3">
                {skillFoundry.githubUrl && (
                  <a
                    href={skillFoundry.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-5 py-2.5 rounded-full border border-purple-500/40 bg-purple-500/10 hover:bg-purple-500/20 text-white font-mono text-xs transition cursor-pointer"
                  >
                    <GithubIcon className="w-4 h-4 text-purple-400" />
                    <span>View SkillFoundry on GitHub</span>
                  </a>
                )}
              </div>
            </div>

            {/* Right Terminal Output Simulation */}
            <div className="lg:w-6/12 w-full rounded-2xl bg-[#050608] border border-white/10 p-5 font-mono text-xs shadow-2xl">
              <div className="flex items-center justify-between border-b border-white/10 pb-3 mb-4">
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-red-500/80" />
                  <span className="w-3 h-3 rounded-full bg-amber-500/80" />
                  <span className="w-3 h-3 rounded-full bg-emerald-500/80" />
                  <span className="ml-2 text-neutral-400 text-[11px]">sf-cli // pytest & pyright</span>
                </div>
                <span className="text-emerald-400 text-[11px]">CLEAN BUILD</span>
              </div>

              <div className="space-y-2 text-neutral-300">
                <p className="text-neutral-500">$ sf setup --provider ollama --model qwen2.5:1.5b</p>
                <p className="text-[#00f5d4]">✓ Connected to local Ollama daemon at http://localhost:11434</p>
                <p className="text-neutral-400">✓ Validated context token window: 32768 tokens</p>
                <p className="text-neutral-500 mt-3">$ pytest tests/ -v</p>
                <div className="text-neutral-400 text-[11px] pl-2 border-l border-white/10 space-y-1">
                  <p>tests/test_provider.py::test_ollama_streaming <span className="text-emerald-400">PASSED</span></p>
                  <p>tests/test_builder.py::test_deterministic_pipeline <span className="text-emerald-400">PASSED</span></p>
                  <p>tests/test_cli.py::test_sf_build_execution <span className="text-emerald-400">PASSED</span></p>
                  <p className="text-neutral-500">... [50 additional test cases passed] ...</p>
                </div>
                <p className="text-emerald-400 font-bold pt-1">
                  ✓ 53 passed in 1.42s (100% test coverage)
                </p>
                <p className="text-neutral-500 mt-3">$ pyright src/</p>
                <p className="text-emerald-400 font-bold">
                  0 errors, 0 warnings, 0 informations
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* SHOWCASE 3 & 4: Printer Support Resolver + Ezy Language & Runtime */}
      <div className="mt-10 grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Printer Support Resolver */}
        {(filter === "ALL" || filter === "Systems & Tooling") && (
          <div className="rounded-3xl glass-panel border border-white/10 p-6 sm:p-8 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="px-3 py-1 rounded-full text-xs font-mono bg-blue-500/10 text-blue-300 border border-blue-500/30">
                  Systems & Hardware Tooling
                </span>
                <span className="text-xs font-mono text-neutral-400">CUPS / PPD</span>
              </div>

              <h4 className="text-2xl font-bold text-white tracking-tight">
                {printerResolver.name}
              </h4>
              <p className="text-xs font-mono text-neutral-400 mt-1">{printerResolver.tagline}</p>

              <p className="mt-4 text-sm text-neutral-300 font-light leading-relaxed">
                {printerResolver.description}
              </p>

              <div className="mt-6 p-4 rounded-xl bg-black/40 border border-white/5 space-y-2 text-xs font-mono text-neutral-300">
                <span className="text-blue-400 font-semibold block">Resolution Pipeline:</span>
                <p className="text-neutral-400">
                  IEEE 1284 Device ID → SQLite Index Query → PPD vs Driverless Gap Analysis → PackageKit Provision
                </p>
              </div>

              <div className="mt-6 flex flex-wrap gap-1.5">
                {printerResolver.technologies.map((t) => (
                  <span key={t} className="px-2 py-0.5 rounded text-[11px] font-mono bg-white/5 text-neutral-300 border border-white/10">
                    {t}
                  </span>
                ))}
              </div>
            </div>

            <div className="mt-8 pt-4 border-t border-white/10 flex items-center justify-between">
              <span className="text-xs font-mono text-neutral-400">Architecture Engine</span>
              {printerResolver.githubUrl && (
                <a
                  href={printerResolver.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 text-xs font-mono text-white hover:text-[#00f5d4] transition"
                >
                  <span>Explore Repository</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              )}
            </div>
          </div>
        )}

        {/* Ezy Scripting Language & Runtime */}
        {(filter === "ALL" || filter === "Language & Compilers" || filter === "Systems & Tooling") && (
          <div className="rounded-3xl glass-panel border border-white/10 p-6 sm:p-8 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="px-3 py-1 rounded-full text-xs font-mono bg-amber-500/10 text-amber-300 border border-amber-500/30">
                  Compiler & Language Design
                </span>
                <span className="text-xs font-mono text-neutral-400">AST Tree-Walk</span>
              </div>

              <h4 className="text-2xl font-bold text-white tracking-tight">
                {ezyLang.name}
              </h4>
              <p className="text-xs font-mono text-neutral-400 mt-1">{ezyLang.tagline}</p>

              <p className="mt-4 text-sm text-neutral-300 font-light leading-relaxed">
                {ezyLang.description}
              </p>

              <div className="mt-6 p-4 rounded-xl bg-black/40 border border-white/5 space-y-2 text-xs font-mono text-neutral-300">
                <span className="text-amber-400 font-semibold block">Execution Stages:</span>
                <p className="text-neutral-400">
                  Source Code → Lexer (Tokens) → Recursive Descent Parser → AST Nodes → Scoped Environment Evaluator
                </p>
              </div>

              <div className="mt-6 flex flex-wrap gap-1.5">
                {ezyLang.technologies.map((t) => (
                  <span key={t} className="px-2 py-0.5 rounded text-[11px] font-mono bg-white/5 text-neutral-300 border border-white/10">
                    {t}
                  </span>
                ))}
              </div>
            </div>

            <div className="mt-8 pt-4 border-t border-white/10 flex items-center justify-between">
              <span className="text-xs font-mono text-neutral-400">Interpreter Engine</span>
              {ezyLang.githubUrl && (
                <a
                  href={ezyLang.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 text-xs font-mono text-white hover:text-amber-400 transition"
                >
                  <span>Explore Repository</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              )}
            </div>
          </div>
        )}
      </div>

      {/* SHOWCASE 5 & 6: GATE Question Intelligence & Aura.AI */}
      <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-8">
        {(filter === "ALL" || filter === "AI & LLM") && (
          <div className="rounded-3xl glass-panel border border-white/10 p-6 sm:p-8 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="px-3 py-1 rounded-full text-xs font-mono bg-teal-500/10 text-teal-300 border border-teal-500/30">
                  Research & OCR Analytics
                </span>
                <span className="text-xs font-mono text-neutral-400">GATE CS Dataset</span>
              </div>
              <h4 className="text-xl font-bold text-white">{gateSystem.name}</h4>
              <p className="mt-2 text-sm text-neutral-300 font-light leading-relaxed">
                {gateSystem.description}
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-white/10 flex flex-wrap gap-1.5">
              {gateSystem.technologies.map((t) => (
                <span key={t} className="px-2 py-0.5 rounded text-[10px] font-mono bg-white/5 text-neutral-400">
                  {t}
                </span>
              ))}
            </div>
          </div>
        )}

        {(filter === "ALL" || filter === "Full Stack") && (
          <div className="rounded-3xl glass-panel border border-white/10 p-6 sm:p-8 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="px-3 py-1 rounded-full text-xs font-mono bg-indigo-500/10 text-indigo-300 border border-indigo-500/30">
                  Web Application Platform
                </span>
                <span className="text-xs font-mono text-neutral-400">Career Mentorship</span>
              </div>
              <h4 className="text-xl font-bold text-white">{auraAi.name}</h4>
              <p className="mt-2 text-sm text-neutral-300 font-light leading-relaxed">
                {auraAi.description}
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-white/10 flex flex-wrap gap-1.5">
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
