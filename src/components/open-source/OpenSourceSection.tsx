"use client";

import React, { useState } from "react";
import {
  GitPullRequest,
  CheckCircle,
  ExternalLink,
  Zap,
  Activity,
  Workflow,
} from "lucide-react";
import {
  openSourceProjects,
  driverlessFixArchitecture,
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
      className="relative py-12 sm:py-16 md:py-20 px-4 sm:px-8 lg:px-12 xl:px-16 max-w-[1560px] mx-auto z-10 w-full overflow-hidden scroll-mt-16"
    >
      {/* Section Connection Header */}
      <div
        aria-hidden="true"
        className="flex items-center gap-3 sm:gap-4 mb-6 sm:mb-8 text-xs font-mono text-neutral-400 tracking-wider"
      >
        <span className="w-6 sm:w-8 h-[1px] bg-[#00f5d4]" />
        <span className="text-[#00f5d4]">SECTION 02</span>
        <span className="text-neutral-600">//</span>
        <span className="truncate">LINUX FOUNDATION & OPENPRINTING</span>
      </div>

      {/* Section Header */}
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-8 sm:pb-12 border-b border-white/10 w-full">
        <div>
          <h2 className="text-3xl sm:text-5xl md:text-6xl font-black tracking-tight text-white">
            Core Open Source Work
          </h2>
          <p className="mt-3 text-sm sm:text-base md:text-lg text-neutral-300 max-w-2xl font-light">
            Core contributor in Linux OpenPrinting. Architecting asynchronous thread safety,
            hardware daemon discovery, and responsive desktop workflows preinstalled across distributions.
          </p>
        </div>

        {/* Highlight Metric Pill */}
        <div className="flex items-center gap-3.5 p-3.5 sm:p-4 rounded-2xl glass-panel border border-[#00f5d4]/30 bg-[#00f5d4]/5 shrink-0 self-start lg:self-end">
          <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-[#00f5d4]/20 flex items-center justify-center text-[#00f5d4]">
            <GitPullRequest className="w-5 h-5 sm:w-6 sm:h-6" />
          </div>
          <div>
            <div className="flex items-baseline gap-1.5">
              <span className="text-2xl sm:text-3xl font-black text-white font-mono">11+</span>
              <span className="text-[11px] sm:text-xs font-mono text-[#00f5d4] uppercase">Merged PRs</span>
            </div>
            <p className="text-[11px] sm:text-xs text-neutral-300">system-config-printer core</p>
          </div>
        </div>
      </div>

      {/* Primary Flagship Showcase: system-config-printer */}
      <div className="mt-8 sm:mt-12 rounded-2xl sm:rounded-3xl glass-panel border border-white/10 p-5 sm:p-8 md:p-10 relative overflow-hidden w-full">
        <div
          aria-hidden="true"
          className="absolute top-0 right-0 w-72 sm:w-96 h-72 sm:h-96 bg-[#00f5d4]/5 rounded-full blur-3xl pointer-events-none"
        />

        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-5 pb-6 sm:pb-8 border-b border-white/10">
          <div>
            <div className="flex flex-wrap items-center gap-1.5 sm:gap-2 mb-2.5">
              <span className="px-2.5 py-0.5 rounded-full text-[11px] font-mono bg-[#00f5d4]/10 text-[#00f5d4] border border-[#00f5d4]/30">
                Linux Desktop Foundation
              </span>
              <span className="px-2.5 py-0.5 rounded-full text-[11px] font-mono bg-white/5 text-neutral-300 border border-white/10">
                OpenPrinting
              </span>
              <span className="px-2.5 py-0.5 rounded-full text-[11px] font-mono bg-white/5 text-neutral-300 border border-white/10">
                Ubuntu / Fedora / Debian
              </span>
            </div>
            <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white tracking-tight">
              {primaryProject.name}
            </h3>
            <p className="mt-2.5 text-neutral-300 max-w-3xl leading-relaxed text-xs sm:text-sm md:text-base font-light">
              Core Linux printing management GUI. Architected asynchronous driverless PPD validation to eliminate UI lockups, stabilized printer discovery over IPP/DNS-SD, and refactored PackageKit/D-Bus lifecycle handling.
            </p>
          </div>

          <a
            href={primaryProject.repo}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-4 py-2 rounded-full border border-white/20 bg-white/5 hover:bg-white/10 text-white font-mono text-xs hover:border-[#00f5d4]/50 transition shrink-0 cursor-pointer self-start lg:self-center"
          >
            <span>Upstream Repository</span>
            <ExternalLink className="w-3.5 h-3.5 text-[#00f5d4]" />
          </a>
        </div>

        {/* PR Contribution Highlights Matrix */}
        <div className="mt-6 sm:mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {primaryProject.highlightPrs?.map((item, idx) => (
            <div
              key={idx}
              className="p-3 sm:p-4 rounded-xl bg-white/[0.03] border border-white/5 hover:border-white/15 transition flex items-start gap-2.5"
            >
              <div className="w-4 h-4 rounded-full bg-[#00f5d4]/10 border border-[#00f5d4]/30 flex items-center justify-center text-[#00f5d4] shrink-0 mt-0.5">
                <CheckCircle className="w-2.5 h-2.5" />
              </div>
              <span className="text-xs sm:text-sm text-neutral-200 leading-snug">
                {item}
              </span>
            </div>
          ))}
        </div>

        {/* Technology Badges */}
        <div className="mt-6 pt-5 border-t border-white/10 flex flex-wrap items-center gap-1.5 sm:gap-2">
          <span className="text-xs font-mono text-neutral-400 mr-1">Stack:</span>
          {primaryProject.keyTechnologies.map((tech) => (
            <span
              key={tech}
              className="px-2 py-0.5 rounded-md bg-white/5 border border-white/10 text-[11px] font-mono text-neutral-300"
            >
              {tech}
            </span>
          ))}
        </div>

        {/* Ecosystem Collaborators */}
        {primaryProject.collaborators && (
          <div className="mt-4 flex flex-wrap items-center gap-2 text-xs font-mono text-neutral-400">
            <span>Collaborated with upstream maintainers:</span>
            {primaryProject.collaborators.map((name) => (
              <span
                key={name}
                className="px-2 py-0.5 rounded bg-[#00f5d4]/10 text-[#00f5d4] border border-[#00f5d4]/20"
              >
                {name}
              </span>
            ))}
          </div>
        )}
      </div>

      {/* ARCHITECTURAL CASE STUDY: The Driverless PPD Validation UI Freeze Solution */}
      <div id="architecture" className="mt-14 sm:mt-20 scroll-mt-24 w-full">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-3 mb-6 sm:mb-8">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono text-[#00f5d4] mb-1.5">
              <Zap className="w-3.5 h-3.5" />
              <span>ENGINEERING CASE STUDY</span>
            </div>
            <h3 className="text-2xl sm:text-3xl md:text-4xl font-black text-white tracking-tight">
              Resolving the GTK3 Driverless PPD UI Freeze
            </h3>
            <p className="mt-1.5 text-xs sm:text-sm md:text-base text-neutral-300 max-w-2xl font-light">
              Offloaded blocking IPP network queries to background worker threads, resuming state via GLib idle callbacks.
            </p>
          </div>

          <div className="flex items-center gap-2 text-xs font-mono text-neutral-400 bg-white/5 px-3 py-1.5 rounded-lg border border-white/10 self-start lg:self-end">
            <Activity className="w-3.5 h-3.5 text-emerald-400 animate-pulse" />
            <span>Interactive State Machine</span>
          </div>
        </div>

        {/* Responsive Pipeline Stepper */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2 sm:gap-2.5 mb-6 w-full">
          {driverlessFixArchitecture.map((step) => {
            const isSelected = activeStep === step.step;
            return (
              <button
                key={step.step}
                onClick={() => setActiveStep(step.step)}
                type="button"
                className={`p-2.5 sm:p-3 rounded-xl border text-left transition-all cursor-pointer flex flex-col justify-between min-h-[78px] sm:min-h-[92px] ${
                  isSelected
                    ? "bg-[#00f5d4]/15 border-[#00f5d4] shadow-[0_0_15px_rgba(0,245,212,0.2)]"
                    : "bg-white/[0.03] border-white/10 hover:border-white/20 hover:bg-white/[0.06]"
                }`}
              >
                <div className="flex items-center justify-between">
                  <span
                    className={`text-[9px] font-mono font-bold px-1.5 py-0.5 rounded ${
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
                    className={`block text-[11px] sm:text-xs font-medium leading-tight mt-1.5 ${
                      isSelected ? "text-white font-bold" : "text-neutral-300"
                    }`}
                  >
                    {step.label}
                  </span>
                  <span className="block text-[9px] sm:text-[10px] font-mono text-neutral-400 mt-0.5 truncate">
                    {step.layer}
                  </span>
                </div>
              </button>
            );
          })}
        </div>

        {/* Active Stage Technical Detail Card */}
        <div className="rounded-2xl glass-panel border border-[#00f5d4]/30 bg-[#00f5d4]/[0.02] p-4 sm:p-6 md:p-8 w-full">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 pb-4 sm:pb-5 border-b border-white/10">
            <div>
              <div className="flex items-center gap-2 font-mono text-[11px] sm:text-xs text-[#00f5d4]">
                <span>STAGE {currentStepData.step} OF 6</span>
                <span className="text-neutral-600">//</span>
                <span>{currentStepData.layer}</span>
              </div>
              <h4 className="text-lg sm:text-xl md:text-2xl font-bold text-white mt-1">
                {currentStepData.label}
              </h4>
            </div>

            <div className="px-2.5 py-1 rounded-lg bg-black/40 border border-white/10 font-mono text-[11px] text-neutral-300 self-start">
              Module: <span className="text-[#00f5d4]">{currentStepData.tech}</span>
            </div>
          </div>

          <div className="mt-5 grid grid-cols-1 lg:grid-cols-3 gap-5 items-center">
            <div className="lg:col-span-2">
              <p className="text-neutral-200 text-sm sm:text-base leading-relaxed font-light">
                {currentStepData.description}
              </p>

              {/* Technical Takeaway */}
              <div className="mt-4 flex items-start gap-2.5 p-3 sm:p-4 rounded-xl bg-black/40 border border-white/5 font-mono text-[11px] sm:text-xs text-neutral-400">
                <Workflow className="w-4 h-4 text-[#00f5d4] shrink-0 mt-0.5" />
                <div>
                  <span className="text-white font-semibold">Takeaway: </span>
                  {activeStep === 1 &&
                    "Decoupled GTK event loop from blocking synchronous network queries."}
                  {activeStep === 2 &&
                    "Thread isolation ensures network latency never freezes window drawing or user interaction."}
                  {activeStep === 3 &&
                    "Driverless PPD queries IPP attributes and verifies device models in memory."}
                  {activeStep === 4 &&
                    "Token checks prevent stale async results from overwriting newer user requests."}
                  {activeStep === 5 &&
                    "Safely re-enters GTK main thread via GLib.idle_add() to preserve thread safety."}
                  {activeStep === 6 &&
                    "Wizard advances smoothly with zero UI freezes or hangs."}
                </div>
              </div>
            </div>

            {/* Visual Architecture Mini-Diagram */}
            <div className="p-4 rounded-xl bg-black/60 border border-white/10 font-mono text-[11px] flex flex-col gap-2.5 w-full">
              <div className="text-[10px] text-neutral-400 border-b border-white/10 pb-1.5 flex items-center justify-between">
                <span>EXECUTION LIFECYCLE</span>
                <span className="text-[#00f5d4]">Thread Safe</span>
              </div>
              <div className="space-y-1.5">
                <div
                  className={`p-2 rounded border transition text-center ${
                    activeStep === 1 || activeStep === 6
                      ? "border-[#00f5d4] bg-[#00f5d4]/10 text-white"
                      : "border-white/10 bg-white/5 text-neutral-400"
                  }`}
                >
                  GTK Main Loop (GUI)
                </div>
                <div className="text-center text-neutral-500 text-[10px]">↓ idle_add / worker</div>
                <div
                  className={`p-2 rounded border transition text-center ${
                    activeStep >= 2 && activeStep <= 5
                      ? "border-amber-400 bg-amber-400/10 text-white"
                      : "border-white/10 bg-white/5 text-neutral-400"
                  }`}
                >
                  Worker Thread (IPP / CUPS)
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Additional Open Source Contributions: WP Rig & Ecosystem */}
      <div className="mt-10 sm:mt-14 grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 w-full">
        {openSourceProjects.slice(1).map((project) => (
          <div
            key={project.name}
            className="p-5 sm:p-7 rounded-2xl glass-panel border border-white/10 hover:border-white/20 transition flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-mono text-[#00f5d4]">{project.ecosystem}</span>
                {project.prCount && (
                  <span className="px-2 py-0.5 rounded-full text-[10px] sm:text-[11px] font-mono bg-white/5 border border-white/10 text-neutral-300">
                    {project.prCount}
                  </span>
                )}
              </div>
              <h4 className="text-lg sm:text-xl font-bold text-white">{project.name}</h4>
              <p className="mt-1.5 text-xs sm:text-sm text-neutral-300 leading-relaxed font-light">
                {project.summary}
              </p>
            </div>

            <div className="mt-5 pt-3.5 border-t border-white/10 flex items-center justify-between">
              <div className="flex flex-wrap gap-1">
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
                className="p-1.5 rounded-lg text-neutral-400 hover:text-white hover:bg-white/10 transition"
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
