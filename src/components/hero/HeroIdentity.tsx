"use client";

import React, { useState } from "react";
import {
  Terminal,
  GitPullRequest,
  Cpu,
  Layers,
  ArrowDownRight,
  ExternalLink,
  Sparkles,
  CheckCircle2,
  Copy,
  Check,
} from "lucide-react";
import { identity } from "@/data/identity";

export function HeroIdentity() {
  const [copied, setCopied] = useState(false);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(identity.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2200);
  };

  return (
    <section
      id="hero"
      aria-label="Ayush Singh Identity & Overview"
      className="relative min-h-[92vh] flex flex-col justify-between pt-28 sm:pt-36 pb-16 px-4 sm:px-6 lg:px-12 max-w-7xl mx-auto z-10"
    >
      {/* Top Identity Meta HUD */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-6">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 px-3 py-1 rounded-md bg-white/5 border border-white/10 font-mono text-xs text-neutral-300">
            <span className="w-2 h-2 rounded-full bg-[#00f5d4]" />
            <span className="font-semibold text-white">ID:</span>
            <span className="text-[#00f5d4]">SinghCod3r</span>
          </div>
          <span className="text-xs font-mono text-neutral-400">
            CSE GRADUATE · CLASS OF 2026
          </span>
        </div>

        <div className="flex items-center gap-3 font-mono text-xs text-neutral-400">
          <span className="flex items-center gap-1.5 text-neutral-300">
            <span className="inline-block w-1.5 h-1.5 rounded-full bg-emerald-400" />
            CGPA 8.6
          </span>
          <span className="text-neutral-600">/</span>
          <span>SRM-CEM LUCKNOW (AKTU)</span>
        </div>
      </div>

      {/* Main Massive Editorial Typography Hero Composition */}
      <div className="my-auto py-8 sm:py-12">
        <div className="relative">
          {/* Subtle Backing Glow */}
          <div
            aria-hidden="true"
            className="absolute -top-10 -left-10 w-96 h-96 bg-[#00f5d4]/10 rounded-full blur-3xl pointer-events-none"
          />

          <div className="relative flex flex-col items-start select-none">
            {/* Monumental First Name */}
            <h1
              className="font-black text-7xl sm:text-9xl md:text-[11rem] lg:text-[14rem] tracking-tighter leading-[0.85] text-white"
              style={{ fontFamily: "var(--font-geist-sans), sans-serif" }}
            >
              AYUSH
            </h1>

            {/* Layered Second Name with Cybernetic Gradient */}
            <div className="flex flex-wrap items-baseline gap-4 sm:gap-8 -mt-2 sm:-mt-6 md:-mt-10">
              <span
                className="font-black text-6xl sm:text-8xl md:text-[10rem] lg:text-[13rem] tracking-tighter leading-[0.85] bg-gradient-to-r from-white via-neutral-200 to-neutral-400 bg-clip-text text-transparent"
                style={{ fontFamily: "var(--font-geist-sans), sans-serif" }}
              >
                SINGH
              </span>

              {/* Editorial Inline Badge */}
              <div className="hidden md:flex flex-col border-l border-[#00f5d4]/40 pl-4 py-1 font-mono text-xs text-neutral-400 max-w-xs">
                <span className="text-[#00f5d4] font-semibold">ENGINEERING IDENTITY</span>
                <span>Open Source Linux Contributor & Systems Problem-Solver</span>
              </div>
            </div>
          </div>
        </div>

        {/* Technical Subtitle Strip */}
        <div className="mt-8 sm:mt-12 flex flex-wrap items-center gap-2 sm:gap-3 text-xs sm:text-sm font-mono text-neutral-400">
          <span className="px-2.5 py-1 rounded bg-white/5 border border-white/10 text-neutral-200">
            LINUX OPENPRINTING
          </span>
          <span className="text-neutral-600">·</span>
          <span className="px-2.5 py-1 rounded bg-white/5 border border-white/10 text-neutral-200">
            SYSTEMS & IPC
          </span>
          <span className="text-neutral-600">·</span>
          <span className="px-2.5 py-1 rounded bg-white/5 border border-white/10 text-neutral-200">
            PYTHON & COMPILERS
          </span>
          <span className="text-neutral-600">·</span>
          <span className="px-2.5 py-1 rounded bg-white/5 border border-white/10 text-neutral-200">
            LOCAL LLMs & AI
          </span>
          <span className="text-neutral-600">·</span>
          <span className="px-2.5 py-1 rounded bg-white/5 border border-white/10 text-neutral-200">
            FULL STACK
          </span>
        </div>

        {/* Narrative Description — Confident, Technical, Human */}
        <p className="mt-6 text-base sm:text-lg md:text-xl text-neutral-300 max-w-3xl leading-relaxed font-sans font-light">
          Computer Science & Engineering graduate focused on understanding software beneath the
          abstraction layer. From resolving thread lockups and hardware daemon protocols in the{" "}
          <span className="text-white font-medium">Linux Foundation OpenPrinting ecosystem</span> to
          architecting deterministic AI pipelines and local developer tools.
        </p>

        {/* Primary Interactive CTAs */}
        <div className="mt-8 flex flex-wrap items-center gap-3 sm:gap-4 font-mono text-xs sm:text-sm">
          <a
            href="#open-source"
            className="flex items-center gap-2 px-5 py-3 rounded-full bg-[#00f5d4] text-[#08090c] font-bold hover:bg-[#38bdf8] hover:shadow-[0_0_25px_rgba(0,245,212,0.4)] transition-all cursor-pointer"
          >
            <GitPullRequest className="w-4 h-4" />
            <span>Explore Open Source (11+ PRs)</span>
          </a>

          <a
            href="#projects"
            className="flex items-center gap-2 px-5 py-3 rounded-full bg-white/5 border border-white/15 text-white hover:bg-white/10 hover:border-white/30 transition cursor-pointer"
          >
            <Cpu className="w-4 h-4 text-[#00f5d4]" />
            <span>Featured Projects</span>
          </a>

          <button
            onClick={handleCopyEmail}
            type="button"
            className="flex items-center gap-2 px-4 py-3 rounded-full border border-white/10 bg-white/5 hover:bg-white/10 text-neutral-300 hover:text-white transition cursor-pointer"
          >
            {copied ? (
              <>
                <Check className="w-4 h-4 text-emerald-400" />
                <span className="text-emerald-400">Email Copied!</span>
              </>
            ) : (
              <>
                <Copy className="w-4 h-4 text-neutral-400" />
                <span>Copy Email</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Bottom Metrics Matrix */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 pt-8 border-t border-white/10">
        {identity.metrics.map((item, index) => (
          <div
            key={index}
            className="glass-panel p-4 rounded-xl border border-white/5 hover:border-white/15 transition flex flex-col justify-between"
          >
            <span className="text-[11px] font-mono text-neutral-400 uppercase tracking-wider">
              {item.label}
            </span>
            <div className="my-2">
              <span className="text-2xl sm:text-3xl font-black text-white font-mono tracking-tight">
                {item.value}
              </span>
            </div>
            <span className="text-[11px] text-neutral-400 leading-snug">
              {item.detail}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}
