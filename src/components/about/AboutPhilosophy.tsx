"use client";

import React from "react";
import { Terminal, Shield, Cpu, Code2, Sparkles, Network, ArrowRight } from "lucide-react";

export function AboutPhilosophy() {
  const stackLayers = [
    { title: "Visual & Interface", desc: "Next.js, React, Tailwind, Micro-interactions, WebGL", color: "#00f5d4" },
    { title: "Service & API Layer", desc: "RESTful endpoints, asynchronous workers, auth boundaries", color: "#38bdf8" },
    { title: "Storage & Persistence", desc: "Relational indexing, SQLite embedded queries, schema design", color: "#a78bfa" },
    { title: "Linux & System IPC", desc: "CUPS, D-Bus messages, GLib event loops, thread safety", color: "#10b981" },
    { title: "Applied AI & Runtimes", desc: "Local Ollama models, deterministic rankings, compiler ASTs", color: "#f59e0b" },
  ];

  return (
    <section
      id="about"
      aria-label="Engineering Philosophy & About Ayush Singh"
      className="relative py-24 sm:py-32 px-4 sm:px-6 lg:px-12 max-w-7xl mx-auto z-10"
    >
      {/* Section Motif */}
      <div
        aria-hidden="true"
        className="flex items-center gap-4 mb-8 text-xs font-mono text-neutral-400 tracking-wider"
      >
        <span className="w-8 h-[1px] bg-[#00f5d4]" />
        <span className="text-[#00f5d4]">SECTION 08</span>
        <span className="text-neutral-600">//</span>
        <span>ENGINEERING PHILOSOPHY & PERSPECTIVE</span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        {/* Narrative */}
        <div className="lg:col-span-7 space-y-6">
          <h2 className="text-4xl sm:text-6xl font-black tracking-tight text-white leading-tight">
            Curious about what lives beneath the abstraction layer.
          </h2>

          <div className="space-y-4 text-neutral-300 font-light text-base sm:text-lg leading-relaxed">
            <p>
              I am a Computer Science & Engineering graduate driven by an instinct to understand how
              software behaves when the abstractions are stripped away. When a GUI hangs, I look into
              the main thread event loop; when a model hallucinates, I build deterministic validation
              guardrails; when a language behaves unexpectedly, I construct a tree-walk interpreter from scratch.
            </p>
            <p>
              My work spans open-source Linux system daemons, developer CLI tools, AI-assisted decision systems,
              and modern web applications. Rather than confining myself to a single slice of the stack,
              I move freely across the entire engineering continuum.
            </p>
          </div>

          <div className="pt-4 flex flex-wrap items-center gap-4 text-xs font-mono text-neutral-400">
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/5 border border-white/10">
              <span className="w-2 h-2 rounded-full bg-[#00f5d4]" />
              <span>Full-Stack & Systems Fluidity</span>
            </div>
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/5 border border-white/10">
              <span className="w-2 h-2 rounded-full bg-[#38bdf8]" />
              <span>Open Source Discipline</span>
            </div>
          </div>
        </div>

        {/* Stack Continuum Visualizer */}
        <div className="lg:col-span-5 rounded-3xl glass-panel border border-white/10 p-6 sm:p-8 space-y-3">
          <div className="text-xs font-mono text-neutral-400 border-b border-white/10 pb-3 flex items-center justify-between">
            <span>THE CONTINUUM</span>
            <span className="text-[#00f5d4]">End-to-End Execution</span>
          </div>

          <div className="space-y-3 pt-2">
            {stackLayers.map((layer, idx) => (
              <div
                key={layer.title}
                className="p-3.5 rounded-xl bg-black/40 border border-white/5 hover:border-white/20 transition flex items-start gap-3"
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

          <div className="pt-3 border-t border-white/5 text-[10px] font-mono text-neutral-500 text-center">
            UI → APIs → DATABASES → LINUX → SYSTEMS → AI
          </div>
        </div>
      </div>
    </section>
  );
}
