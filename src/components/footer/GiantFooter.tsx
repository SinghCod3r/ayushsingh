"use client";

import React from "react";
import { ArrowUp, Terminal, Mail, Play, Heart } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "@/components/ui/Icons";
import { identity } from "@/data/identity";

interface GiantFooterProps {
  onReplayIntro?: () => void;
}

export function GiantFooter({ onReplayIntro }: GiantFooterProps) {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer
      aria-label="Portfolio Footer and Identity Monument"
      className="relative bg-gradient-to-t from-black via-[#06070a] to-[#08090c] pt-24 pb-12 px-4 sm:px-6 lg:px-12 border-t border-white/10 overflow-hidden z-10"
    >
      <div className="max-w-7xl mx-auto flex flex-col justify-between min-h-[70vh]">
        {/* Top Controls Strip */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 pb-12 border-b border-white/10 text-xs font-mono">
          <div className="flex items-center gap-3 text-neutral-400">
            <span className="w-2 h-2 rounded-full bg-[#00f5d4]" />
            <span className="text-white font-bold">SinghCod3r</span>
            <span className="text-neutral-600">//</span>
            <span>COMPUTER SCIENCE & SYSTEMS ENGINEER</span>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            {onReplayIntro && (
              <button
                onClick={onReplayIntro}
                type="button"
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-white/10 hover:border-[#00f5d4]/40 bg-white/5 hover:bg-white/10 text-neutral-300 hover:text-white transition cursor-pointer"
              >
                <Play className="w-3 h-3 text-[#00f5d4]" />
                <span>Replay Intro</span>
              </button>
            )}

            <button
              onClick={scrollToTop}
              type="button"
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-white/10 hover:border-white/30 bg-white/5 hover:bg-white/10 text-neutral-300 hover:text-white transition cursor-pointer"
            >
              <span>Back to Top</span>
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Quick Links Matrix */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 py-12 text-xs font-mono">
          <div>
            <span className="text-neutral-500 uppercase tracking-widest block mb-3">Navigation</span>
            <ul className="space-y-2 text-neutral-300">
              <li><a href="#hero" className="hover:text-[#00f5d4] transition">Hero Identity</a></li>
              <li><a href="#open-source" className="hover:text-[#00f5d4] transition">Open Source (11+ PRs)</a></li>
              <li><a href="#architecture" className="hover:text-[#00f5d4] transition">PPD Freeze Solution</a></li>
              <li><a href="#projects" className="hover:text-[#00f5d4] transition">Featured Systems</a></li>
            </ul>
          </div>

          <div>
            <span className="text-neutral-500 uppercase tracking-widest block mb-3">Systems & Projects</span>
            <ul className="space-y-2 text-neutral-300">
              <li><a href="#projects" className="hover:text-[#00f5d4] transition">MoodBite.AI</a></li>
              <li><a href="#projects" className="hover:text-[#00f5d4] transition">SkillFoundry CLI</a></li>
              <li><a href="#projects" className="hover:text-[#00f5d4] transition">Printer Support Resolver</a></li>
              <li><a href="#projects" className="hover:text-[#00f5d4] transition">Ezy Language Runtime</a></li>
            </ul>
          </div>

          <div>
            <span className="text-neutral-500 uppercase tracking-widest block mb-3">Writing & Talks</span>
            <ul className="space-y-2 text-neutral-300">
              <li><a href="#writing-books" className="hover:text-[#00f5d4] transition">The Last Human Update</a></li>
              <li><a href="#speaking" className="hover:text-[#00f5d4] transition">OOSC 4.0 IIIT Allahabad</a></li>
              <li><a href="#writing-books" className="hover:text-[#00f5d4] transition">Technical Writing</a></li>
              <li><a href="#experience" className="hover:text-[#00f5d4] transition">SRM-CEM 2026</a></li>
            </ul>
          </div>

          <div>
            <span className="text-neutral-500 uppercase tracking-widest block mb-3">Direct Presence</span>
            <ul className="space-y-2 text-neutral-300">
              <li>
                <a href={identity.github} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 hover:text-[#00f5d4] transition">
                  <GithubIcon className="w-3.5 h-3.5" />
                  <span>GitHub (@SinghCod3r)</span>
                </a>
              </li>
              <li>
                <a href={identity.linkedin} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 hover:text-[#38bdf8] transition">
                  <LinkedinIcon className="w-3.5 h-3.5 text-[#38bdf8]" />
                  <span>LinkedIn Profile</span>
                </a>
              </li>
              <li>
                <a href={`mailto:${identity.email}`} className="flex items-center gap-1.5 hover:text-white transition">
                  <Mail className="w-3.5 h-3.5" />
                  <span>Email Inbound</span>
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* GIANT MONUMENTAL AYUSH SINGH DISPLAY */}
        <div className="relative pt-12 pb-6 border-t border-white/10 select-none overflow-hidden">
          <div
            aria-hidden="true"
            className="absolute -top-1/2 left-1/2 -translate-x-1/2 w-[120%] h-full bg-radial from-[#00f5d4]/10 via-transparent to-transparent pointer-events-none blur-3xl"
          />

          <div className="flex flex-col items-center justify-center text-center">
            <h2
              className="font-black text-6xl sm:text-8xl md:text-[11rem] lg:text-[14rem] tracking-tighter leading-[0.8] text-white/90 hover:text-white transition-colors duration-500"
              style={{ fontFamily: "var(--font-geist-sans), sans-serif" }}
            >
              AYUSH
            </h2>
            <h2
              className="font-black text-5xl sm:text-7xl md:text-[10rem] lg:text-[13rem] tracking-tighter leading-[0.8] -mt-2 sm:-mt-6 md:-mt-10 bg-gradient-to-b from-neutral-200 via-neutral-400 to-neutral-700 bg-clip-text text-transparent"
              style={{ fontFamily: "var(--font-geist-sans), sans-serif" }}
            >
              SINGH
            </h2>
          </div>
        </div>

        {/* Bottom Metadata & Copyright Bar */}
        <div className="pt-8 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-neutral-400">
          <div>
            <span>© 2026 Ayush Singh (SinghCod3r). All systems nominal.</span>
          </div>

          <div className="flex items-center gap-3">
            <span>SRM-CEM / AKTU 2026</span>
            <span className="text-neutral-700">·</span>
            <span className="text-neutral-400">CGPA 8.6</span>
            <span className="text-neutral-700">·</span>
            <span className="text-[#00f5d4]">Open Source</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
