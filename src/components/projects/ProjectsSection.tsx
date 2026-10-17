"use client";

import React, { useState, useRef, useEffect } from "react";
import {
  ExternalLink,
  Workflow,
  Utensils,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Terminal,
  Layers,
  Sparkles,
  Maximize2,
  X,
  Code2,
} from "lucide-react";
import { GithubIcon } from "@/components/ui/Icons";
import { projects, ProjectItem } from "@/data/projects";

type CategoryFilter = "ALL" | "AI & LLM" | "Systems & Tooling" | "Language & Compilers" | "Full Stack";

export function ProjectsSection() {
  const [filter, setFilter] = useState<CategoryFilter>("ALL");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [activeImageTab, setActiveImageTab] = useState<Record<string, "primary" | "secondary">>({});
  const [lightboxImage, setLightboxImage] = useState<string | null>(null);

  // 3D Card Tilt State
  const [cardTilt, setCardTilt] = useState({ x: 0, y: 0, glowX: 50, glowY: 50 });
  const sliderRef = useRef<HTMLDivElement>(null);

  // MoodBite Interactive Simulation State
  const [selectedMood, setSelectedMood] = useState<"FATIGUED" | "STRESSED" | "FOCUS">("FATIGUED");
  const [isVegOnly, setIsVegOnly] = useState<boolean>(true);

  const moodSimulationData = {
    FATIGUED: {
      profile: "High Comfort · Warm Temperature · Glycine & Tryptophan",
      recommended: isVegOnly
        ? "Adrak Chai + Warm Moong Dal Khichdi with Ghee"
        : "Warm Chicken Clear Broth + Ginger & Turmeric Infusion",
      rationale:
        "Tryptophan-rich protein paired with gingerol intervention eases autonomic nervous tension without reactive glucose spikes.",
      confidence: "94.8% Vector Match",
    },
    STRESSED: {
      profile: "Crunch Sensory Intervention · High Magnesium · Cool Mint",
      recommended: isVegOnly
        ? "Sprouted Moong Chaat + Cold Mint & Jeera Chaas"
        : "Roasted Makhana & Grilled Paneer with Mint Chutney",
      rationale:
        "Crunchy textures activate mastication reflexes to regulate cortisol; menthol and probiotics modulate gut-brain axis inflammation.",
      confidence: "92.4% Vector Match",
    },
    FOCUS: {
      profile: "Sustained Energy · Low Glycemic Index · Acetylcholine Precursor",
      recommended: isVegOnly
        ? "Filter Coffee with Almond Milk + Steamed Rava Idli & Sambar"
        : "Black Coffee + Egg White & Spinach Scramble",
      rationale:
        "Slow-release complex carbohydrates with controlled caffeine sustain acetylcholine synthesis for high-focus analytical work.",
      confidence: "96.7% Vector Match",
    },
  };

  // Filter projects
  const filteredProjects = projects.filter((p) => {
    if (filter === "ALL") return true;
    return p.category === filter;
  });

  // Keep currentIndex bounded
  useEffect(() => {
    if (currentIndex >= filteredProjects.length) {
      setCurrentIndex(0);
    }
  }, [filter, filteredProjects.length, currentIndex]);

  const activeProject: ProjectItem = filteredProjects[currentIndex] || filteredProjects[0];

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev > 0 ? prev - 1 : filteredProjects.length - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev < filteredProjects.length - 1 ? prev + 1 : 0));
  };

  // 3D Perspective Tilt on Mouse Movement
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientY - rect.top) / rect.height - 0.5) * -8;
    const y = ((e.clientX - rect.left) / rect.width - 0.5) * 8;
    const glowX = ((e.clientX - rect.left) / rect.width) * 100;
    const glowY = ((e.clientY - rect.top) / rect.height) * 100;
    setCardTilt({ x, y, glowX, glowY });
  };

  const handleMouseLeave = () => {
    setCardTilt({ x: 0, y: 0, glowX: 50, glowY: 50 });
  };

  // Determine current image to display for active project
  const currentTab = activeImageTab[activeProject.id] || "primary";
  const displayImage =
    currentTab === "secondary" && activeProject.previewImage
      ? activeProject.previewImage
      : activeProject.image || activeProject.previewImage;

  return (
    <section
      id="projects"
      aria-label="Engineered Systems & Interactive Projects"
      className="relative py-12 sm:py-16 md:py-20 px-4 sm:px-8 lg:px-12 xl:px-16 max-w-[1560px] mx-auto z-10 w-full overflow-hidden scroll-mt-16"
    >
      {/* Section Header Motif */}
      <div
        aria-hidden="true"
        className="flex items-center gap-3 sm:gap-4 mb-6 sm:mb-8 text-xs font-mono text-neutral-400 tracking-wider"
      >
        <span className="w-6 sm:w-8 h-[1px] bg-[#00f5d4]" />
        <span className="text-[#00f5d4]">SECTION 03</span>
        <span className="text-neutral-600">//</span>
        <span>INTERACTIVE SYSTEMS SHOWCASE</span>
      </div>

      {/* Header & Filter Controls */}
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-8 sm:pb-12 border-b border-white/10 w-full">
        <div>
          <h2 className="text-3xl sm:text-5xl md:text-6xl font-black tracking-tight text-white">
            Featured Systems
          </h2>
          <p className="mt-3 text-sm sm:text-base md:text-lg text-neutral-300 max-w-2xl font-light">
            Architected beyond templates. Exploring compiler runtimes, deterministic sensory AI pipelines,
            hardware driver resolution, and developer tooling.
          </p>
        </div>

        {/* Filter Pills */}
        <div className="flex flex-wrap gap-1.5 sm:gap-2">
          {(["ALL", "AI & LLM", "Systems & Tooling", "Language & Compilers", "Full Stack"] as CategoryFilter[]).map(
            (cat) => (
              <button
                key={cat}
                onClick={() => {
                  setFilter(cat);
                  setCurrentIndex(0);
                }}
                type="button"
                className={`px-3 py-1.5 rounded-full font-mono text-[11px] sm:text-xs transition cursor-pointer ${
                  filter === cat
                    ? "bg-[#00f5d4] text-[#08090c] font-bold shadow-[0_0_15px_rgba(0,245,212,0.35)]"
                    : "bg-white/5 text-neutral-400 hover:text-white hover:bg-white/10 border border-white/10"
                }`}
              >
                {cat}
              </button>
            )
          )}
        </div>
      </div>

      {/* Slidable Controller Bar */}
      <div className="mt-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4 py-3 px-4 sm:px-6 rounded-2xl glass-panel border border-white/10 bg-black/40">
        <div className="flex items-center gap-3">
          <span className="px-2.5 py-1 rounded bg-[#00f5d4]/10 border border-[#00f5d4]/30 text-[#00f5d4] text-xs font-mono font-bold">
            0{currentIndex + 1} / 0{filteredProjects.length}
          </span>
          <span className="text-sm font-bold text-white font-mono truncate">
            {activeProject.name}
          </span>
          <span className="hidden md:inline text-xs font-mono text-neutral-400">
            · {activeProject.category}
          </span>
        </div>

        {/* Slide Navigation Buttons & Dot Indicators */}
        <div className="flex items-center gap-4 self-end sm:self-auto">
          {/* Dot Selectors */}
          <div className="flex items-center gap-1.5">
            {filteredProjects.map((p, idx) => (
              <button
                key={p.id}
                onClick={() => setCurrentIndex(idx)}
                aria-label={`Jump to project ${p.name}`}
                className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
                  currentIndex === idx ? "w-6 bg-[#00f5d4]" : "w-2 bg-white/20 hover:bg-white/40"
                }`}
              />
            ))}
          </div>

          {/* Prev / Next Buttons */}
          <div className="flex items-center gap-1.5">
            <button
              onClick={handlePrev}
              type="button"
              aria-label="Previous project"
              className="p-2 rounded-full bg-white/5 hover:bg-white/15 border border-white/10 text-white transition cursor-pointer hover:border-[#00f5d4]/40"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={handleNext}
              type="button"
              aria-label="Next project"
              className="p-2 rounded-full bg-white/5 hover:bg-white/15 border border-white/10 text-white transition cursor-pointer hover:border-[#00f5d4]/40"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* 3D Slidable Main Card Container */}
      <div
        className="mt-6 perspective-[1200px] w-full"
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      >
        <div
          ref={sliderRef}
          className="relative rounded-2xl sm:rounded-3xl glass-panel border border-white/15 p-5 sm:p-8 md:p-10 transition-transform duration-200 ease-out bg-gradient-to-br from-[#0c1017]/90 via-[#07090e]/95 to-black w-full overflow-hidden isolation-isolate"
          style={{
            transform: `rotateX(${cardTilt.x}deg) rotateY(${cardTilt.y}deg)`,
            boxShadow: "0 30px 60px -15px rgba(0, 0, 0, 0.7), 0 0 30px -10px rgba(0, 245, 212, 0.1)",
          }}
        >
          {/* Subtle Dynamic Specular Radial Light */}
          <div
            aria-hidden="true"
            className="absolute inset-0 pointer-events-none transition-opacity duration-300 opacity-60"
            style={{
              background: `radial-gradient(650px circle at ${cardTilt.glowX}% ${cardTilt.glowY}%, rgba(0, 245, 212, 0.08), transparent 70%)`,
            }}
          />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start relative z-10">
            {/* Left Column: Project Narrative & Technical Specs (7 Cols) */}
            <div className="lg:col-span-7 flex flex-col justify-between space-y-5">
              <div>
                {/* Meta Badges */}
                <div className="flex flex-wrap items-center gap-2 mb-3">
                  <span className="px-2.5 py-0.5 rounded-full text-[11px] font-mono bg-[#00f5d4]/10 text-[#00f5d4] border border-[#00f5d4]/30">
                    {activeProject.badge || activeProject.category}
                  </span>
                  {activeProject.statusText && (
                    <span className="px-2.5 py-0.5 rounded-full text-[11px] font-mono bg-white/5 text-neutral-300 border border-white/10">
                      {activeProject.statusText}
                    </span>
                  )}
                  {activeProject.metrics && (
                    <span className="px-2.5 py-0.5 rounded-full text-[11px] font-mono bg-emerald-500/10 text-emerald-300 border border-emerald-500/30">
                      {activeProject.metrics.label}: {activeProject.metrics.value}
                    </span>
                  )}
                </div>

                <h3 className="text-2xl sm:text-3xl md:text-4xl font-black text-white tracking-tight">
                  {activeProject.name}
                </h3>
                <p className="text-xs sm:text-sm font-mono text-[#00f5d4] mt-1">
                  {activeProject.tagline}
                </p>

                <p className="mt-4 text-xs sm:text-sm md:text-base text-neutral-300 font-light leading-relaxed">
                  {activeProject.description}
                </p>

                {/* Problem vs Architectural Solution */}
                <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="p-3.5 rounded-xl bg-black/40 border border-white/5 space-y-1">
                    <span className="text-[10px] font-mono uppercase tracking-wider text-rose-400 font-bold block">
                      Engineering Problem:
                    </span>
                    <p className="text-xs text-neutral-300 leading-relaxed">
                      {activeProject.problem}
                    </p>
                  </div>

                  <div className="p-3.5 rounded-xl bg-black/40 border border-white/5 space-y-1">
                    <span className="text-[10px] font-mono uppercase tracking-wider text-[#00f5d4] font-bold block">
                      Architectural Solution:
                    </span>
                    <p className="text-xs text-neutral-300 leading-relaxed">
                      {activeProject.solution}
                    </p>
                  </div>
                </div>

                {/* Architecture Highlights */}
                <div className="mt-4">
                  <span className="text-[11px] font-mono text-neutral-400 uppercase tracking-wider block mb-2">
                    Key Architectural Facets:
                  </span>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
                    {activeProject.architectureHighlights.map((hl, idx) => (
                      <div key={idx} className="flex items-center gap-2 text-xs text-neutral-300">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#00f5d4] shrink-0" />
                        <span className="truncate">{hl}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Technologies */}
                <div className="mt-4 flex flex-wrap gap-1.5">
                  {activeProject.technologies.map((t) => (
                    <span
                      key={t}
                      className="px-2.5 py-0.5 rounded text-[11px] font-mono bg-white/5 border border-white/10 text-neutral-300"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              {/* Actions & Live Links */}
              <div className="pt-4 border-t border-white/10 flex flex-wrap items-center gap-3">
                {activeProject.liveUrl && (
                  <a
                    href={activeProject.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#00f5d4] text-[#08090c] font-mono text-xs font-bold hover:bg-[#38bdf8] transition-all cursor-pointer shadow-[0_0_15px_rgba(0,245,212,0.3)]"
                  >
                    <span>Launch Live App</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                )}

                {activeProject.githubUrl && (
                  <a
                    href={activeProject.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-4 py-2.5 rounded-full bg-white/5 border border-white/15 text-white font-mono text-xs hover:bg-white/10 hover:border-white/30 transition cursor-pointer"
                  >
                    <GithubIcon className="w-3.5 h-3.5" />
                    <span>View Repository</span>
                  </a>
                )}
              </div>
            </div>

            {/* Right Column: High-Fidelity UI Frame & Interactive Widget (5 Cols) */}
            <div className="lg:col-span-5 flex flex-col space-y-4 w-full">
              {/* Properly Fitted UI Window Frame */}
              {displayImage ? (
                <div className="rounded-xl overflow-hidden border border-white/15 bg-[#07090e] shadow-2xl w-full flex flex-col isolation-isolate">
                  {/* Window Bar Header with Controls & Screenshot Switcher */}
                  <div className="px-3.5 py-2.5 bg-[#0f131a] border-b border-white/10 flex items-center justify-between text-xs font-mono text-neutral-400 select-none">
                    <div className="flex items-center gap-1.5">
                      <span className="w-2.5 h-2.5 rounded-full bg-[#ff5f56]" />
                      <span className="w-2.5 h-2.5 rounded-full bg-[#ffbd2e]" />
                      <span className="w-2.5 h-2.5 rounded-full bg-[#27c93f]" />
                      <span className="ml-2 text-[10px] text-neutral-400 hidden sm:inline truncate max-w-[130px]">
                        {activeProject.liveUrl
                          ? activeProject.liveUrl.replace("https://", "")
                          : `${activeProject.id}.app`}
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      {/* Multi-view Switcher if project has secondary image */}
                      {activeProject.previewImage && activeProject.image && (
                        <div className="flex items-center rounded-lg bg-black/40 p-0.5 border border-white/10 text-[10px]">
                          <button
                            type="button"
                            onClick={() =>
                              setActiveImageTab((prev) => ({ ...prev, [activeProject.id]: "primary" }))
                            }
                            className={`px-2 py-0.5 rounded cursor-pointer transition ${
                              currentTab === "primary"
                                ? "bg-[#00f5d4]/20 text-[#00f5d4] font-bold"
                                : "text-neutral-400 hover:text-white"
                            }`}
                          >
                            Main UI
                          </button>
                          <button
                            type="button"
                            onClick={() =>
                              setActiveImageTab((prev) => ({ ...prev, [activeProject.id]: "secondary" }))
                            }
                            className={`px-2 py-0.5 rounded cursor-pointer transition ${
                              currentTab === "secondary"
                                ? "bg-[#00f5d4]/20 text-[#00f5d4] font-bold"
                                : "text-neutral-400 hover:text-white"
                            }`}
                          >
                            Workflow
                          </button>
                        </div>
                      )}

                      {/* Expand Lightbox Button */}
                      <button
                        onClick={() => setLightboxImage(displayImage)}
                        type="button"
                        aria-label="View full resolution image"
                        className="p-1 rounded text-neutral-400 hover:text-white hover:bg-white/10 transition cursor-pointer"
                      >
                        <Maximize2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>

                  {/* Strictly Contained Aspect Ratio Image Container */}
                  <div
                    onClick={() => setLightboxImage(displayImage)}
                    className="relative w-full aspect-[16/10] sm:aspect-[16/9] bg-[#050608] overflow-hidden cursor-zoom-in group"
                  >
                    <img
                      src={displayImage}
                      alt={`${activeProject.name} Interface Screenshot`}
                      className="w-full h-full object-cover object-top group-hover:scale-[1.02] transition-transform duration-500 ease-out"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end justify-between p-3">
                      <span className="text-[10px] font-mono text-neutral-300 bg-black/70 px-2 py-0.5 rounded backdrop-blur-md">
                        Click to enlarge view
                      </span>
                    </div>
                  </div>
                </div>
              ) : null}

              {/* Specialized Interactive Companion Widget */}
              {activeProject.id === "moodbite-ai" ? (
                /* MoodBite Interactive Simulation Widget */
                <div className="rounded-xl bg-black/60 border border-white/10 p-4 sm:p-5 flex flex-col justify-between w-full space-y-3">
                  <div className="flex items-center justify-between border-b border-white/10 pb-2">
                    <div className="flex items-center gap-2 text-xs font-mono text-white">
                      <Utensils className="w-3.5 h-3.5 text-[#00f5d4]" />
                      <span>SENSORY PIPELINE SIMULATION</span>
                    </div>
                    <span className="text-[10px] font-mono text-emerald-400">LIVE DEMO</span>
                  </div>

                  {/* Mood Selector Buttons */}
                  <div>
                    <span className="text-[10px] font-mono text-neutral-400 block mb-1">
                      Context State:
                    </span>
                    <div className="grid grid-cols-3 gap-1.5">
                      {(["FATIGUED", "STRESSED", "FOCUS"] as const).map((m) => (
                        <button
                          key={m}
                          onClick={() => setSelectedMood(m)}
                          type="button"
                          className={`py-1 px-1.5 rounded-lg text-[10px] font-mono transition cursor-pointer text-center ${
                            selectedMood === m
                              ? "bg-[#00f5d4]/20 border border-[#00f5d4] text-[#00f5d4] font-bold"
                              : "bg-white/5 border border-white/10 text-neutral-400 hover:text-white"
                          }`}
                        >
                          {m}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Dietary Toggle */}
                  <div className="flex items-center justify-between py-1 px-2.5 rounded-lg bg-white/5 border border-white/10 text-xs font-mono">
                    <span className="text-neutral-300 text-[10px]">Dietary Constraint:</span>
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

                  {/* Recommendation Output */}
                  <div className="p-3 rounded-lg bg-[#08090c] border border-white/10 space-y-1.5 font-mono">
                    <div className="flex items-center justify-between text-[9px] text-neutral-400">
                      <span>SENSORY TARGET:</span>
                      <span className="text-emerald-400">{moodSimulationData[selectedMood].confidence}</span>
                    </div>
                    <p className="text-xs text-white font-bold leading-tight">
                      {moodSimulationData[selectedMood].recommended}
                    </p>
                    <p className="text-[10px] text-neutral-400 font-sans leading-relaxed">
                      {moodSimulationData[selectedMood].rationale}
                    </p>
                  </div>
                </div>
              ) : activeProject.id === "skillfoundry" ? (
                /* SkillFoundry CLI Terminal Preview */
                <div className="rounded-xl bg-black/70 border border-white/10 p-4 font-mono text-xs space-y-2">
                  <div className="flex items-center justify-between pb-2 border-b border-white/10 text-neutral-400 text-[10px]">
                    <div className="flex items-center gap-1.5 text-white">
                      <Terminal className="w-3.5 h-3.5 text-[#00f5d4]" />
                      <span>CLI TELEMETRY</span>
                    </div>
                    <span className="text-emerald-400">53 TESTS PASSING</span>
                  </div>
                  <div className="space-y-1 text-[11px] text-neutral-300 overflow-x-auto">
                    <p className="text-neutral-500">$ sf setup --provider ollama --model qwen2.5:1.5b</p>
                    <p className="text-[#00f5d4]">✓ Daemon connected (localhost:11434)</p>
                    <p className="text-neutral-500 mt-1">$ pytest tests/ -q</p>
                    <p className="text-emerald-400 font-bold">53 passed in 1.42s · 0 warnings</p>
                    <p className="text-neutral-500 mt-1">$ pyright src/</p>
                    <p className="text-emerald-400 font-bold">0 errors, 0 warnings, 0 diagnostics</p>
                  </div>
                </div>
              ) : activeProject.id === "ezy-lang" ? (
                /* Ezy AST & Pipeline Widget */
                <div className="rounded-xl bg-black/70 border border-white/10 p-4 font-mono text-xs space-y-2">
                  <div className="flex items-center justify-between pb-2 border-b border-white/10 text-neutral-400 text-[10px]">
                    <div className="flex items-center gap-1.5 text-white">
                      <Code2 className="w-3.5 h-3.5 text-amber-400" />
                      <span>AST INTERPRETER PIPELINE</span>
                    </div>
                    <span className="text-amber-400">TREE-WALK</span>
                  </div>
                  <div className="p-2.5 rounded bg-black/50 border border-white/5 text-[11px] text-neutral-300">
                    <div className="text-amber-300 mb-1">let radius = 7; let area = 3.14159 * radius * radius;</div>
                    <div className="text-[10px] text-neutral-400">
                      Lexer (Tokens) → Pratt Parser → BinaryExpr(*) → ScopedEnv → Evaluator: 153.9379
                    </div>
                  </div>
                </div>
              ) : (
                /* General Systems Spec Box */
                <div className="rounded-xl bg-black/60 border border-white/10 p-4 font-mono text-xs space-y-2">
                  <div className="flex items-center justify-between pb-2 border-b border-white/10 text-neutral-400 text-[10px]">
                    <span className="text-white">ARCHITECTURE PROFILE</span>
                    <span className="text-[#00f5d4]">VERIFIED</span>
                  </div>
                  <p className="text-[11px] text-neutral-300 font-sans leading-relaxed">
                    Engineered with modular abstraction layers, strict unit verification, and isolated execution
                    boundaries to prevent system contention.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Lightbox Modal for Full Resolution Screenshot Inspection */}
      {lightboxImage && (
        <div
          role="dialog"
          aria-label="Full-screen image preview"
          aria-modal="true"
          onClick={() => setLightboxImage(null)}
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4 sm:p-8 animate-in fade-in duration-200 cursor-zoom-out"
        >
          <div className="relative max-w-5xl max-h-[90vh] rounded-2xl overflow-hidden border border-white/20 bg-black/90 shadow-2xl">
            <button
              onClick={() => setLightboxImage(null)}
              className="absolute top-4 right-4 p-2 rounded-full bg-black/70 border border-white/20 text-white hover:text-[#00f5d4] transition z-10 cursor-pointer"
              aria-label="Close preview"
            >
              <X className="w-5 h-5" />
            </button>
            <img
              src={lightboxImage}
              alt="Full Resolution Interface Preview"
              className="w-full h-full object-contain max-h-[85vh]"
            />
          </div>
        </div>
      )}
    </section>
  );
}
