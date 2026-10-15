"use client";

import React, { useState } from "react";
import { techStackCategories, TechItem } from "@/data/techstack";

export function TechStackSection() {
  const [selectedCategory, setSelectedCategory] = useState<string>("ALL");
  const [activeTech, setActiveTech] = useState<TechItem | null>(
    techStackCategories[0].items[0]
  );

  const displayedCategories =
    selectedCategory === "ALL"
      ? techStackCategories
      : techStackCategories.filter((c) => c.title === selectedCategory);

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
        <span>TOOLCHAINS & PROFICIENCIES</span>
      </div>

      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-5 pb-8 sm:pb-12 border-b border-white/10 w-full">
        <div>
          <h2 className="text-3xl sm:text-5xl md:text-6xl font-black tracking-tight text-white">
            Practical Tech Stack
          </h2>
          <p className="mt-3 text-sm sm:text-base md:text-lg text-neutral-300 max-w-2xl font-light">
            Technologies applied across open-source daemons, compiler runtimes, and local AI pipelines.
            Contextualized by real production code.
          </p>
        </div>

        {/* Filter by Category */}
        <div className="flex flex-wrap gap-1.5 sm:gap-2">
          <button
            onClick={() => setSelectedCategory("ALL")}
            type="button"
            className={`px-3 py-1 rounded-full text-[11px] sm:text-xs font-mono transition cursor-pointer ${
              selectedCategory === "ALL"
                ? "bg-[#00f5d4] text-[#08090c] font-bold"
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
              className={`px-3 py-1 rounded-full text-[11px] sm:text-xs font-mono transition cursor-pointer ${
                selectedCategory === c.title
                  ? "bg-[#00f5d4] text-[#08090c] font-bold"
                  : "bg-white/5 text-neutral-400 hover:text-white border border-white/10"
              }`}
            >
              {c.title}
            </button>
          ))}
        </div>
      </div>

      {/* Active Tech Context Inspector Card */}
      {activeTech && (
        <div className="mt-6 sm:mt-8 p-4 sm:p-6 rounded-2xl glass-panel border border-[#00f5d4]/40 bg-[#00f5d4]/5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4 w-full">
          <div className="flex items-center gap-3 sm:gap-4">
            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-[#00f5d4]/20 border border-[#00f5d4]/40 flex items-center justify-center text-[#00f5d4] shrink-0 font-mono font-bold text-xs sm:text-sm">
              {activeTech.name.substring(0, 2).toUpperCase()}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-base sm:text-lg font-bold text-white">{activeTech.name}</span>
                <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-white/10 text-neutral-300">
                  {activeTech.proficiencyLevel || "Core"}
                </span>
              </div>
              <p className="text-xs sm:text-sm text-neutral-300 font-light mt-0.5">
                <span className="text-[#00f5d4] font-mono">In Practice: </span>
                {activeTech.context}
              </p>
            </div>
          </div>
          <span className="text-[10px] font-mono text-neutral-400 shrink-0 self-start sm:self-center">
            Inspector Target
          </span>
        </div>
      )}

      {/* Categories Grid */}
      <div className="mt-8 sm:mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 w-full">
        {displayedCategories.map((cat) => (
          <div
            key={cat.title}
            className="p-4 sm:p-6 rounded-2xl glass-panel border border-white/10 flex flex-col justify-between hover:border-white/20 transition w-full"
          >
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-[11px] sm:text-xs font-mono text-[#00f5d4] uppercase tracking-wider">
                  {cat.tag}
                </span>
                <span className="text-[10px] font-mono text-neutral-400">
                  {cat.items.length} Modules
                </span>
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-white">{cat.title}</h3>
              <p className="mt-0.5 text-xs text-neutral-400 font-light">{cat.subtitle}</p>

              {/* Technologies List */}
              <div className="mt-4 sm:mt-5 flex flex-wrap gap-1.5 sm:gap-2">
                {cat.items.map((tech) => {
                  const isInspected = activeTech?.name === tech.name;
                  return (
                    <button
                      key={tech.name}
                      onClick={() => setActiveTech(tech)}
                      type="button"
                      className={`px-2.5 py-1 rounded-lg text-xs font-mono transition text-left cursor-pointer ${
                        isInspected
                          ? "bg-[#00f5d4] text-[#08090c] font-bold shadow-[0_0_12px_rgba(0,245,212,0.3)]"
                          : "bg-white/5 hover:bg-white/10 border border-white/10 text-neutral-300 hover:text-white"
                      }`}
                    >
                      {tech.name}
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="mt-5 pt-3 border-t border-white/5 text-[10px] font-mono text-neutral-500">
              <span>Click to inspect</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
