"use client";

import React from "react";

export function AboutPhilosophy() {
  const stackLayers = [
    { title: "Interface & WebGL", desc: "Next.js, React, Tailwind, Micro-interactions", color: "#00f5d4" },
    { title: "API & Service Layer", desc: "RESTful endpoints, asynchronous workers, auth boundaries", color: "#38bdf8" },
    { title: "Storage & Persistence", desc: "Relational indexing, SQLite embedded queries, schema design", color: "#a78bfa" },
    { title: "Linux & System IPC", desc: "CUPS, D-Bus messages, GLib event loops, thread safety", color: "#10b981" },
    { title: "Applied AI & Runtimes", desc: "Local Ollama models, deterministic rankings, compiler ASTs", color: "#f59e0b" },
  ];

  return (
    <section
      id="about"
      aria-label="Engineering Philosophy & About Ayush Singh"
      className="relative py-12 sm:py-16 md:py-20 px-4 sm:px-8 lg:px-12 xl:px-16 max-w-[1560px] mx-auto z-10 w-full overflow-hidden scroll-mt-16"
    >
      {/* Section Motif */}
      <div
        aria-hidden="true"
        className="flex items-center gap-3 sm:gap-4 mb-6 sm:mb-8 text-xs font-mono text-neutral-400 tracking-wider"
      >
        <span className="w-6 sm:w-8 h-[1px] bg-[#00f5d4]" />
        <span className="text-[#00f5d4]">SECTION 08</span>
        <span className="text-neutral-600">//</span>
        <span>ENGINEERING PERSPECTIVE</span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-12 items-center w-full">
        {/* Narrative */}
        <div className="lg:col-span-7 space-y-4 sm:space-y-5 w-full">
          <h2 className="text-3xl sm:text-5xl md:text-6xl font-black tracking-tight text-white leading-tight">
            Curious about what lives beneath the abstraction layer.
          </h2>

          <div className="space-y-2.5 text-neutral-300 font-light text-sm sm:text-base md:text-lg leading-relaxed">
            <p>
              I build software from the core upward. When a desktop GUI freezes, I inspect the event loop; when local LLMs drift, I build deterministic validation harnesses.
            </p>
            <p className="text-neutral-400 text-xs sm:text-sm md:text-base">
              Spanning open-source Linux daemons, developer CLIs, AI systems, and full-stack web architectures.
            </p>
          </div>

          <div className="pt-2 flex flex-wrap items-center gap-2 sm:gap-3 text-xs font-mono text-neutral-400">
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-[11px] sm:text-xs">
              <span className="w-1.5 h-1.5 rounded-full bg-[#00f5d4]" />
              <span>Full-Stack & Systems Fluidity</span>
            </div>
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-[11px] sm:text-xs">
              <span className="w-1.5 h-1.5 rounded-full bg-[#38bdf8]" />
              <span>Open Source Discipline</span>
            </div>
          </div>
        </div>

        {/* Stack Continuum Visualizer */}
        <div className="lg:col-span-5 rounded-2xl sm:rounded-3xl glass-panel border border-white/10 p-4 sm:p-7 space-y-2.5 w-full">
          <div className="text-xs font-mono text-neutral-400 border-b border-white/10 pb-2.5 flex items-center justify-between">
            <span>THE CONTINUUM</span>
            <span className="text-[#00f5d4]">Execution</span>
          </div>

          <div className="space-y-2 pt-1">
            {stackLayers.map((layer, idx) => (
              <div
                key={layer.title}
                className="p-2.5 sm:p-3 rounded-xl bg-black/40 border border-white/5 hover:border-white/20 transition flex items-start gap-2.5"
              >
                <div
                  className="w-2 h-2 rounded-full mt-1.5 shrink-0"
                  style={{ backgroundColor: layer.color }}
                />
                <div>
                  <span className="text-xs font-bold text-white font-mono block">
                    0{idx + 1} // {layer.title}
                  </span>
                  <span className="text-[11px] text-neutral-400 font-sans block mt-0.5">
                    {layer.desc}
                  </span>
                </div>
              </div>
            ))}
          </div>

          <div className="pt-2.5 border-t border-white/5 text-[10px] font-mono text-neutral-500 text-center">
            UI → APIs → DATABASES → LINUX → SYSTEMS → AI
          </div>
        </div>
      </div>
    </section>
  );
}
