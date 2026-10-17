"use client";

import React from "react";
import {
  ArrowUp,
  ExternalLink,
  GitPullRequest,
  Award,
  Sparkles,
  FileText,
  Mail,
} from "lucide-react";
import { GithubIcon, LinkedinIcon } from "@/components/ui/Icons";
import { identity } from "@/data/identity";

const footerNavLinks = [
  { label: "01 // Hero Identity", href: "#hero" },
  { label: "02 // Linux OpenPrinting", href: "#open-source" },
  { label: "03 // Featured Systems", href: "#projects" },
  { label: "04 // Tech Stack", href: "#tech-stack" },
  { label: "05 // Books & Medium", href: "#writing-books" },
  { label: "06 // Conference Talks", href: "#speaking" },
  { label: "07 // Engineering Journey", href: "#experience" },
  { label: "08 // Philosophy", href: "#about" },
];

export function GiantFooter() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <footer
      aria-label="Portfolio Footer and Identity Monument"
      className="relative bg-gradient-to-t from-black via-[#06070a] to-[#08090c] pt-8 sm:pt-16 pb-8 sm:pb-12 px-3 sm:px-8 lg:px-12 xl:px-16 border-t border-white/10 overflow-hidden z-10 w-full"
    >
      <div className="max-w-[1560px] mx-auto flex flex-col justify-between w-full space-y-6 sm:space-y-10">
        {/* Top Control Bar: Filled from Left to Right with zero dead space */}
        <div className="flex items-center justify-between gap-3 pb-4 sm:pb-6 border-b border-white/10 w-full">
          {/* Left: Active Live Status Badge */}
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-[10px] sm:text-xs font-mono text-neutral-300">
            <span className="w-2 h-2 rounded-full bg-[#00f5d4] animate-pulse" />
            <span className="text-white font-medium truncate max-w-[210px] sm:max-w-none">
              Open for Systems & Full-Stack Engineering
            </span>
          </div>

          {/* Right: Sleek Interactive Back to Top */}
          <button
            onClick={scrollToTop}
            type="button"
            className="flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-1.5 rounded-full border border-white/10 hover:border-[#00f5d4]/40 bg-white/5 hover:bg-[#00f5d4]/10 text-neutral-300 hover:text-[#00f5d4] transition cursor-pointer font-mono text-xs shadow-md shrink-0"
          >
            <span>Top</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Middle Section: Efficient Mobile-Friendly Quick Matrix */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-5 sm:gap-6 py-2 w-full text-xs font-mono">
          {/* Col 1: Fast Section Navigation (5 cols on desktop) */}
          <div className="lg:col-span-5 p-4 sm:p-5 rounded-2xl bg-white/[0.02] border border-white/5 flex flex-col justify-between space-y-3">
            <div className="flex items-center justify-between border-b border-white/5 pb-2 text-neutral-400 text-[11px]">
              <span className="text-[#00f5d4] font-bold">DIRECTORY</span>
              <span>INDEX // 01–08</span>
            </div>

            <div className="grid grid-cols-2 gap-x-3 gap-y-2 text-[11px] text-neutral-300">
              {footerNavLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={(e) => handleLinkClick(e, link.href)}
                  className="hover:text-[#00f5d4] transition truncate py-0.5"
                >
                  {link.label}
                </a>
              ))}
            </div>
          </div>

          {/* Col 2: Core Engineering Verified Highlights (4 cols on desktop) */}
          <div className="lg:col-span-4 p-4 sm:p-5 rounded-2xl bg-white/[0.02] border border-white/5 flex flex-col justify-between space-y-3">
            <div className="flex items-center justify-between border-b border-white/5 pb-2 text-neutral-400 text-[11px]">
              <span className="text-[#38bdf8] font-bold">CREDENTIALS</span>
              <span>VERIFIED MILESTONES</span>
            </div>

            <div className="space-y-2 text-[11px] text-neutral-300">
              <div className="flex items-center gap-2">
                <GitPullRequest className="w-3.5 h-3.5 text-[#00f5d4] shrink-0" />
                <span className="truncate">11+ Merged Linux OpenPrinting PRs</span>
              </div>
              <div className="flex items-center gap-2">
                <Sparkles className="w-3.5 h-3.5 text-[#38bdf8] shrink-0" />
                <span className="truncate">19 BC API Integrations (Acxion)</span>
              </div>
              <div className="flex items-center gap-2">
                <Award className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                <span className="truncate">TCS Digital Candidate (NQT 2025)</span>
              </div>
              <div className="flex items-center gap-2">
                <FileText className="w-3.5 h-3.5 text-purple-400 shrink-0" />
                <span className="truncate">B.Tech CSE · 8.6 CGPA (Class of 2026)</span>
              </div>
            </div>
          </div>

          {/* Col 3: Direct Connect & Resources (3 cols on desktop) */}
          <div className="lg:col-span-3 p-4 sm:p-5 rounded-2xl bg-white/[0.02] border border-white/5 flex flex-col justify-between space-y-3">
            <div className="flex items-center justify-between border-b border-white/5 pb-2 text-neutral-400 text-[11px]">
              <span className="text-emerald-400 font-bold">CONNECT</span>
              <span>CHANNELS</span>
            </div>

            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-2">
                <a
                  href={identity.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 flex items-center justify-between px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-neutral-300 hover:text-white border border-white/5 transition"
                >
                  <span className="flex items-center gap-2">
                    <GithubIcon className="w-3.5 h-3.5" />
                    <span>GitHub</span>
                  </span>
                  <ExternalLink className="w-3 h-3 text-neutral-500" />
                </a>

                <a
                  href={identity.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 flex items-center justify-between px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-neutral-300 hover:text-white border border-white/5 transition"
                >
                  <span className="flex items-center gap-2">
                    <LinkedinIcon className="w-3.5 h-3.5 text-[#38bdf8]" />
                    <span>LinkedIn</span>
                  </span>
                  <ExternalLink className="w-3 h-3 text-neutral-500" />
                </a>
              </div>

              <a
                href="/Ayush_Singh_Resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                download="Ayush_Singh_Resume.pdf"
                className="w-full flex items-center justify-between px-3 py-1.5 rounded-lg bg-[#00f5d4]/10 hover:bg-[#00f5d4]/20 text-[#00f5d4] border border-[#00f5d4]/30 font-bold transition"
              >
                <span className="flex items-center gap-2">
                  <FileText className="w-3.5 h-3.5" />
                  <span>Download CV (PDF)</span>
                </span>
                <span className="text-[10px] uppercase font-mono">Verified</span>
              </a>
            </div>
          </div>
        </div>

        {/* GIANT MONUMENTAL AYUSH SINGH DISPLAY (Bold & Edge-to-Edge on Mobile & Desktop) */}
        <div className="relative py-4 sm:py-8 select-none overflow-hidden w-full">
          {/* Ambient Cyan / Blue Glow Behind Giant Typography */}
          <div
            aria-hidden="true"
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[140%] h-[120%] bg-[radial-gradient(circle_at_center,rgba(0,245,212,0.14)_0%,rgba(56,189,248,0.07)_45%,transparent_70%)] pointer-events-none blur-3xl"
          />

          <div className="flex flex-col items-center justify-center text-center w-full relative z-10">
            {/* Technical Subtitle Bar */}
            <div className="flex items-center justify-center gap-2 text-[10px] sm:text-xs font-mono text-neutral-400 mb-2 sm:mb-3 tracking-widest uppercase">
              <span className="text-[#00f5d4]">SINGHCOD3R</span>
              <span>//</span>
              <span>SYSTEMS & FULL STACK ARCHITECTURE</span>
            </div>

            {/* Monumental First Name - Boldly Fills Mobile Screen Width */}
            <h2
              className="w-full font-black text-[clamp(4.8rem,25vw,16rem)] tracking-tighter leading-[0.82] text-white hover:text-[#00f5d4] transition-colors duration-500 select-none text-center drop-shadow-[0_12px_40px_rgba(0,245,212,0.25)]"
              style={{ fontFamily: "var(--font-geist-sans), sans-serif" }}
            >
              AYUSH
            </h2>

            {/* Monumental Second Name with Metallic Gradient - Matched Width */}
            <h2
              className="w-full font-black text-[clamp(4.6rem,24vw,15.5rem)] tracking-tight leading-[0.82] -mt-1 sm:-mt-4 md:-mt-6 bg-gradient-to-b from-white via-neutral-200 to-neutral-500 bg-clip-text text-transparent select-none text-center drop-shadow-[0_12px_40px_rgba(56,189,248,0.2)]"
              style={{ fontFamily: "var(--font-geist-sans), sans-serif" }}
            >
              SINGH
            </h2>
          </div>
        </div>

        {/* Bottom Metadata & Copyright Bar */}
        <div className="pt-4 sm:pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs font-mono text-neutral-400 w-full text-center sm:text-left">
          <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
            <span>© 2026 Ayush Singh.</span>
            <span className="text-neutral-600 hidden sm:inline">·</span>
            <span className="text-neutral-400">All rights reserved.</span>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 text-neutral-400 text-[11px] sm:text-xs">
            <span>Linux OpenPrinting</span>
            <span className="text-neutral-700">·</span>
            <span>Systems Architecture</span>
            <span className="text-neutral-700">·</span>
            <span className="text-[#00f5d4]">Lucknow, India (IST)</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
