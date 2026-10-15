"use client";

import React, { useState } from "react";
import {
  GitPullRequest,
  CheckCircle,
  Cpu,
  Layers,
  ArrowRight,
  ExternalLink,
  ShieldAlert,
  Zap,
  Terminal,
  Activity,
  Workflow,
  Sparkles,
} from "lucide-react";
import {
  openSourceProjects,
  driverlessFixArchitecture,
  ArchitectureStep,
} from "@/data/opensource";

export function OpenSourceSection() {
  const [activeStep, setActiveStep] = useState<number>(1);
  const primaryProject = openSourceProjects[0]; // system-config-printer

  const currentStepData =
    driverlessFixArchitecture.find((s) => s.step === activeStep) ||
    driverlessFixArchitecture[0];

  return (
    <section
      id="open-source"
      aria-label="Open Source Contributions & Engineering Architecture"
      className="relative py-24 sm:py-32 px-4 sm:px-6 lg:px-12 max-w-7xl mx-auto z-10"
    >
      {/* Visual Section Connection Line Motif */}
      <div
        aria-hidden="true"
        className="flex items-center gap-4 mb-8 text-xs font-mono text-neutral-400 tracking-wider"
      >
        <span className="w-8 h-[1px] bg-[#00f5d4]" />
        <span className="text-[#00f5d4]">SECTION 02</span>
        <span className="text-neutral-600">//</span>
        <span>LINUX FOUNDATION & OPENPRINTING ECOSYSTEM</span>
      </div>

      {/* Section Header */}
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-12 border-b border-white/10">
        <div>
          <h2 className="text-4xl sm:text-6xl font-black tracking-tight text-white">
            Core Open Source Work
          </h2>
          <p className="mt-4 text-base sm:text-lg text-neutral-300 max-w-2xl font-light">
            Active contributor and maintainer in the Linux desktop printing ecosystem.
            Architecting thread safety, hardware daemon communication, and responsive desktop workflows
            installed across millions of Linux workstations.
          </p>
        </div>

        {/* Highlight Metric Pill */}
        <div className="flex items-center gap-4 p-4 rounded-2xl glass-panel border border-[#00f5d4]/30 bg-[#00f5d4]/5 shrink-0">
          <div className="w-12 h-12 rounded-xl bg-[#00f5d4]/20 flex items-center justify-center text-[#00f5d4]">
            <GitPullRequest className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-black text-white font-mono">11+</span>
              <span className="text-xs font-mono text-[#00f5d4] uppercase">Merged PRs</span>
            </div>
            <p className="text-xs text-neutral-300">In system-config-printer core</p>
          </div>
        </div>
      </div>

      {/* Primary Flagship Showcase: system-config-printer */}
      <div className="mt-12 rounded-3xl glass-panel border border-white/10 p-6 sm:p-10 relative overflow-hidden">
        <div
          aria-hidden="true"
          className="absolute top-0 right-0 w-96 h-96 bg-[#00f5d4]/5 rounded-full blur-3xl pointer-events-none"
        />

        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-8 border-b border-white/10">
          <div>
            <div className="flex flex-wrap items-center gap-2 mb-3">
              <span className="px-3 py-1 rounded-full text-xs font-mono bg-[#00f5d4]/10 text-[#00f5d4] border border-[#00f5d4]/30">
                Linux Desktop Foundation
              </span>
              <span className="px-3 py-1 rounded-full text-xs font-mono bg-white/5 text-neutral-300 border border-white/10">
                OpenPrinting
              </span>
              <span className="px-3 py-1 rounded-full text-xs font-mono bg-white/5 text-neutral-300 border border-white/10">
                Preinstalled on Ubuntu / Fedora / Debian
              </span>
            </div>
            <h3 className="text-2xl sm:text-4xl font-bold text-white tracking-tight">
              {primaryProject.name}
            </h3>
            <p className="mt-3 text-neutral-300 max-w-3xl leading-relaxed text-sm sm:text-base font-light">
              {primaryProject.summary}
            </p>
          </div>

          <a
            href={primaryProject.repo}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-5 py-2.5 rounded-full border border-white/20 bg-white/5 hover:bg-white/10 text-white font-mono text-xs hover:border-[#00f5d4]/50 transition shrink-0 cursor-pointer self-start lg:self-center"
          >
            <span>View Upstream Repository</span>
            <ExternalLink className="w-3.5 h-3.5 text-[#00f5d4]" />
          </a>
        </div>

        {/* PR Contribution Highlights Matrix */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {primaryProject.highlightPrs?.map((item, idx) => (
            <div
              key={idx}
              className="p-4 rounded-xl bg-white/[0.03] border border-white/5 hover:border-white/15 transition flex items-start gap-3"
            >
              <div className="w-5 h-5 rounded-full bg-[#00f5d4]/10 border border-[#00f5d4]/30 flex items-center justify-center text-[#00f5d4] shrink-0 mt-0.5">
                <CheckCircle className="w-3 h-3" />
              </div>
              <span className="text-xs sm:text-sm text-neutral-200 leading-snug">
                {item}
              </span>
            </div>
          ))}
        </div>

        {/* Technology Badges */}
        <div className="mt-8 pt-6 border-t border-white/10 flex flex-wrap items-center gap-2">
          <span className="text-xs font-mono text-neutral-400 mr-2">Core Tech:</span>
          {primaryProject.keyTechnologies.map((tech) => (
            <span
              key={tech}
              className="px-2.5 py-1 rounded-md bg-white/5 border border-white/10 text-xs font-mono text-neutral-300"
            >
              {tech}
            </span>
          ))}
        </div>

        {/* Ecosystem Collaborators */}
        {primaryProject.collaborators && (
          <div className="mt-6 flex flex-wrap items-center gap-2 text-xs font-mono text-neutral-400">
            <span>Collaborated upstream alongside:</span>
            {primaryProject.collaborators.map((name, i) => (
              <span
                key={name}
                className="px-2.5 py-0.5 rounded bg-[#00f5d4]/10 text-[#00f5d4] border border-[#00f5d4]/20"
              >
                {name}
              </span>
            ))}
          </div>
        )}
      </div>

      {/* ARCHITECTURAL DEEP DIVE: The Driverless PPD Validation UI Freeze Solution */}
      <div id="architecture" className="mt-20 scroll-mt-24">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-4 mb-10">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono text-[#00f5d4] mb-2">
              <Zap className="w-3.5 h-3.5" />
              <span>ENGINEERING CASE STUDY</span>
            </div>
            <h3 className="text-2xl sm:text-4xl font-black text-white tracking-tight">
              Resolving the GTK3 Driverless PPD UI Freeze
            </h3>
            <p className="mt-2 text-sm sm:text-base text-neutral-300 max-w-3xl font-light">
              How moving long-running IPP/PPD network validation off the GTK main loop into
              worker threads with GLib idle dispatches eliminated desktop application stalls.
            </p>
          </div>

          <div className="flex items-center gap-2 text-xs font-mono text-neutral-400 bg-white/5 px-3 py-1.5 rounded-lg border border-white/10 self-start lg:self-end">
            <Activity className="w-3.5 h-3.5 text-emerald-400 animate-pulse" />
            <span>Interactive State Machine</span>
          </div>
        </div>

        {/* Visual Pipeline Interactive Stepper */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2 sm:gap-3 mb-8">
          {driverlessFixArchitecture.map((step) => {
            const isSelected = activeStep === step.step;
            return (
              <button
                key={step.step}
                onClick={() => setActiveStep(step.step)}
                type="button"
                className={`p-3 rounded-xl border text-left transition-all cursor-pointer flex flex-col justify-between min-h-[96px] ${
                  isSelected
                    ? "bg-[#00f5d4]/15 border-[#00f5d4] shadow-[0_0_20px_rgba(0,245,212,0.2)]"
                    : "bg-white/[0.03] border-white/10 hover:border-white/20 hover:bg-white/[0.06]"
                }`}
              >
                <div className="flex items-center justify-between">
                  <span
                    className={`text-[10px] font-mono font-bold px-1.5 py-0.5 rounded ${
                      isSelected
                        ? "bg-[#00f5d4] text-[#08090c]"
                        : "bg-white/10 text-neutral-400"
                    }`}
                  >
                    0{step.step}
                  </span>
                  {isSelected && (
                    <span className="w-1.5 h-1.5 rounded-full bg-[#00f5d4] animate-ping" />
                  )}
                </div>
                <div>
                  <span
                    className={`block text-xs font-medium leading-tight mt-2 ${
                      isSelected ? "text-white font-bold" : "text-neutral-300"
                    }`}
                  >
                    {step.label}
                  </span>
                  <span className="block text-[10px] font-mono text-neutral-400 mt-1 truncate">
                    {step.layer}
                  </span>
                </div>
              </button>
            );
          })}
        </div>

        {/* Active Stage Technical Detail Card */}
        <div className="rounded-2xl glass-panel border border-[#00f5d4]/30 bg-[#00f5d4]/[0.02] p-6 sm:p-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-white/10">
            <div>
              <div className="flex items-center gap-2 font-mono text-xs text-[#00f5d4]">
                <span>STAGE {currentStepData.step} OF 6</span>
                <span className="text-neutral-600">//</span>
                <span>{currentStepData.layer}</span>
              </div>
              <h4 className="text-xl sm:text-2xl font-bold text-white mt-1">
                {currentStepData.label}
              </h4>
            </div>

            <div className="px-3 py-1.5 rounded-lg bg-black/40 border border-white/10 font-mono text-xs text-neutral-300 self-start">
              Module: <span className="text-[#00f5d4]">{currentStepData.tech}</span>
            </div>
          </div>

          <div className="mt-6 grid grid-cols-1 lg:grid-cols-3 gap-6 items-center">
            <div className="lg:col-span-2">
              <p className="text-neutral-200 text-base sm:text-lg leading-relaxed font-light">
                {currentStepData.description}
              </p>

              {/* Technical Takeaway */}
              <div className="mt-6 flex items-start gap-3 p-4 rounded-xl bg-black/40 border border-white/5 font-mono text-xs text-neutral-400">
                <Workflow className="w-4 h-4 text-[#00f5d4] shrink-0 mt-0.5" />
                <div>
                  <span className="text-white font-semibold">Engineering Rationale: </span>
                  {activeStep === 1 &&
                    "Preventing user interaction lockups requires decoupling GTK event dispatching from synchronous network I/O."}
                  {activeStep === 2 &&
                    "Thread isolation guarantees that slower network latency (e.g. WiFi discovery timeouts) never prevents window resizing, redrawing, or cancellation."}
                  {activeStep === 3 &&
                    "Driverless PPD generation queries IPP daemon attributes, filters capability maps, and builds valid device models in memory."}
                  {activeStep === 4 &&
                    "Token-based transactions guard against race conditions where a fast second click from the user would be overwritten by a delayed first response."}
                  {activeStep === 5 &&
                    "GTK is not thread-safe. All visual state mutations must be scheduled back onto the main loop via GLib.idle_add()."}
                  {activeStep === 6 &&
                    "The wizard advances seamlessly. Zero UI freezes, zero unhandled worker exceptions, and robust cancellation behavior."}
                </div>
              </div>
            </div>

            {/* Visual Architecture Mini-Diagram */}
            <div className="p-5 rounded-xl bg-black/60 border border-white/10 font-mono text-xs flex flex-col gap-3">
              <div className="text-[11px] text-neutral-400 border-b border-white/10 pb-2 flex items-center justify-between">
                <span>EXECUTION LIFECYCLE</span>
                <span className="text-[#00f5d4]">Thread Safe</span>
              </div>
              <div className="space-y-2">
                <div
                  className={`p-2 rounded border transition ${
                    activeStep === 1 || activeStep === 6
                      ? "border-[#00f5d4] bg-[#00f5d4]/10 text-white"
                      : "border-white/10 bg-white/5 text-neutral-400"
                  }`}
                >
                  GTK Main Loop (GUI)
                </div>
                <div className="flex justify-center text-neutral-500">↓ idle_add / worker</div>
                <div
                  className={`p-2 rounded border transition ${
                    activeStep >= 2 && activeStep <= 5
                      ? "border-amber-400 bg-amber-400/10 text-white"
                      : "border-white/10 bg-white/5 text-neutral-400"
                  }`}
                >
                  Background Worker Thread (IPP / CUPS)
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Additional Open Source Contributions: WP Rig & Ecosystem */}
      <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-6">
        {openSourceProjects.slice(1).map((project) => (
          <div
            key={project.name}
            className="p-6 sm:p-8 rounded-2xl glass-panel border border-white/10 hover:border-white/20 transition flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-mono text-[#00f5d4]">{project.ecosystem}</span>
                {project.prCount && (
                  <span className="px-2.5 py-0.5 rounded-full text-[11px] font-mono bg-white/5 border border-white/10 text-neutral-300">
                    {project.prCount}
                  </span>
                )}
              </div>
              <h4 className="text-xl font-bold text-white">{project.name}</h4>
              <p className="mt-2 text-sm text-neutral-300 leading-relaxed font-light">
                {project.summary}
              </p>
            </div>

            <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between">
              <div className="flex flex-wrap gap-1.5">
                {project.keyTechnologies.map((t) => (
                  <span
                    key={t}
                    className="px-2 py-0.5 rounded text-[10px] font-mono bg-white/5 text-neutral-400"
                  >
                    {t}
                  </span>
                ))}
              </div>

              <a
                href={project.repo}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg text-neutral-400 hover:text-white hover:bg-white/10 transition"
                aria-label={`View ${project.name} on GitHub`}
              >
                <ExternalLink className="w-4 h-4" />
              </a>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
