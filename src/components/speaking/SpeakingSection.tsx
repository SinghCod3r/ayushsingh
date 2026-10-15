"use client";

import React from "react";
import { Mic2, Calendar, MapPin, Users, CheckCircle2 } from "lucide-react";
import { speakingEngagements } from "@/data/speaking";

export function SpeakingSection() {
  const ooscTalk = speakingEngagements[0];
  const beginnerTalk = speakingEngagements[1];

  return (
    <section
      id="speaking"
      aria-label="Conference Speaking and Community Presentations"
      className="relative py-12 sm:py-16 md:py-20 px-4 sm:px-6 lg:px-12 max-w-7xl mx-auto z-10 w-full overflow-hidden scroll-mt-16"
    >
      {/* Section Motif */}
      <div
        aria-hidden="true"
        className="flex items-center gap-3 sm:gap-4 mb-6 sm:mb-8 text-xs font-mono text-neutral-400 tracking-wider"
      >
        <span className="w-6 sm:w-8 h-[1px] bg-[#00f5d4]" />
        <span className="text-[#00f5d4]">SECTION 06</span>
        <span className="text-neutral-600">//</span>
        <span>SPEAKING & COMMUNITY</span>
      </div>

      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-5 pb-8 sm:pb-12 border-b border-white/10 w-full">
        <div>
          <h2 className="text-3xl sm:text-5xl md:text-6xl font-black tracking-tight text-white">
            Conference Talks
          </h2>
          <p className="mt-3 text-sm sm:text-base md:text-lg text-neutral-300 max-w-2xl font-light">
            Sharing practical insights on open-source sustainability, maintainer triage health,
            and navigating Linux daemons.
          </p>
        </div>

        <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-mono self-start">
          <Mic2 className="w-3.5 h-3.5" />
          <span>OOSC 4.0 Accepted Speaker</span>
        </div>
      </div>

      {/* Primary Keynote Card: OOSC 4.0 at IIIT Allahabad */}
      <div className="mt-8 sm:mt-12 rounded-2xl sm:rounded-3xl glass-panel border border-[#00f5d4]/30 p-5 sm:p-8 md:p-10 relative overflow-hidden bg-gradient-to-r from-[#00f5d4]/[0.04] via-transparent to-transparent w-full">
        <div className="flex flex-col lg:flex-row justify-between gap-6 sm:gap-8">
          <div className="lg:w-8/12 w-full">
            <div className="flex flex-wrap items-center gap-1.5 sm:gap-2 mb-2.5">
              <span className="px-2.5 py-0.5 rounded-full text-[11px] font-mono bg-[#00f5d4]/10 text-[#00f5d4] border border-[#00f5d4]/30">
                {ooscTalk.status}
              </span>
              <span className="px-2.5 py-0.5 rounded-full text-[11px] font-mono bg-white/5 text-neutral-300 border border-white/10">
                {ooscTalk.event}
              </span>
            </div>

            <h3 className="text-xl sm:text-2xl md:text-3xl font-black text-white tracking-tight leading-snug">
              “{ooscTalk.title}”
            </h3>

            <p className="mt-3 text-xs sm:text-sm md:text-base text-neutral-300 font-light leading-relaxed">
              {ooscTalk.abstract}
            </p>

            {/* Key Focus Areas */}
            <div className="mt-4 sm:mt-5">
              <span className="text-[11px] font-mono text-neutral-400 uppercase tracking-wider block mb-1.5">
                Key Topics:
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 text-xs text-neutral-300">
                {ooscTalk.keyTopics.map((topic, i) => (
                  <div key={i} className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#00f5d4] shrink-0" />
                    <span>{topic}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Event Badge Details */}
          <div className="lg:w-4/12 w-full rounded-2xl bg-black/60 border border-white/10 p-4 sm:p-5 flex flex-col justify-between font-mono text-xs text-neutral-300">
            <div className="space-y-3 sm:space-y-4">
              <div className="border-b border-white/10 pb-2.5">
                <span className="text-neutral-500 text-[10px] uppercase block">Host</span>
                <span className="text-sm sm:text-base font-bold text-white block mt-0.5">{ooscTalk.host}</span>
                <span className="text-[11px] text-neutral-400 flex items-center gap-1 mt-0.5">
                  <MapPin className="w-3 h-3 text-[#00f5d4]" />
                  {ooscTalk.location}
                </span>
              </div>

              <div>
                <span className="text-neutral-500 text-[10px] uppercase block">Schedule</span>
                <span className="text-xs sm:text-sm font-semibold text-[#00f5d4] block mt-0.5 flex items-center gap-1">
                  <Calendar className="w-3 h-3" />
                  {ooscTalk.scheduleTime}
                </span>
              </div>

              {ooscTalk.coSpeaker && (
                <div className="border-t border-white/10 pt-2.5">
                  <span className="text-neutral-500 text-[10px] uppercase block">Co-Speaker</span>
                  <span className="text-xs font-semibold text-white flex items-center gap-1 mt-0.5">
                    <Users className="w-3 h-3 text-[#38bdf8]" />
                    {ooscTalk.coSpeaker}
                  </span>
                </div>
              )}
            </div>

            <div className="mt-4 pt-2.5 border-t border-white/10 text-[10px] text-neutral-500">
              OPEN SOURCE DIALOGUE
            </div>
          </div>
        </div>
      </div>

      {/* Secondary Talk Card */}
      <div className="mt-6 p-4 sm:p-6 rounded-2xl glass-panel border border-white/10 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 w-full">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-neutral-400 mb-1">
            <span className="text-[#38bdf8] font-bold">WORKSHOP</span>
            <span>//</span>
            <span>Community Mentorship</span>
          </div>
          <h4 className="text-base sm:text-lg font-bold text-white">
            “{beginnerTalk.title}”
          </h4>
          <p className="mt-1.5 text-xs sm:text-sm text-neutral-300 font-light max-w-2xl leading-relaxed">
            {beginnerTalk.abstract}
          </p>
        </div>

        <div className="shrink-0 text-xs font-mono text-neutral-400">
          <span className="px-2.5 py-1 rounded bg-white/5 border border-white/10 text-neutral-300 text-[11px]">
            Community Track
          </span>
        </div>
      </div>
    </section>
  );
}
