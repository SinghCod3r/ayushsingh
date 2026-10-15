"use client";

import React, { useState } from "react";
import {
  BookOpen,
  Feather,
  ExternalLink,
  Sparkles,
  ArrowRight,
  Quote,
  Clock,
  Layers,
  FileText,
} from "lucide-react";
import { featuredBook } from "@/data/books";
import { articles } from "@/data/writing";

export function WritingBooksSection() {
  const [showExcerpt, setShowExcerpt] = useState(false);
  const [bookTilt, setBookTilt] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientY - rect.top) / rect.height - 0.5) * -18;
    const y = ((e.clientX - rect.left) / rect.width - 0.5) * 22;
    setBookTilt({ x, y });
  };

  const handleMouseLeave = () => {
    setBookTilt({ x: 0, y: 0 });
  };

  return (
    <section
      id="writing-books"
      aria-label="Books and Technical Writing"
      className="relative py-24 sm:py-32 px-4 sm:px-6 lg:px-12 max-w-7xl mx-auto z-10"
    >
      {/* Section Motif */}
      <div
        aria-hidden="true"
        className="flex items-center gap-4 mb-8 text-xs font-mono text-neutral-400 tracking-wider"
      >
        <span className="w-8 h-[1px] bg-[#00f5d4]" />
        <span className="text-[#00f5d4]">SECTION 05</span>
        <span className="text-neutral-600">//</span>
        <span>AUTHORED WORK & TECHNICAL ESSAYS</span>
      </div>

      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-12 border-b border-white/10">
        <div>
          <h2 className="text-4xl sm:text-6xl font-black tracking-tight text-white">
            Books & Writing
          </h2>
          <p className="mt-4 text-base sm:text-lg text-neutral-300 max-w-2xl font-light">
            Thinking in prose as well as code. From fiction exploring human autonomy in an algorithmic
            world to technical writing breaking down Linux daemon internals.
          </p>
        </div>

        <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs font-mono text-neutral-300 self-start">
          <Feather className="w-3.5 h-3.5 text-[#00f5d4]" />
          <span>Sci-Fi Novel + Systems Essays</span>
        </div>
      </div>

      {/* FEATURED BOOK: The Last Human Update */}
      <div className="mt-14 rounded-3xl glass-panel border border-white/10 p-6 sm:p-12 relative overflow-hidden bg-gradient-to-br from-[#121622]/80 via-[#0a0c12]/90 to-black">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          {/* Interactive 3D Perspective Book Mockup */}
          <div
            className="lg:col-span-5 flex justify-center perspective-[1000px] select-none"
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
          >
            <div
              className="relative w-64 sm:w-72 h-96 rounded-xl border border-white/20 bg-gradient-to-b from-[#181d28] via-[#0f131a] to-[#080a0f] p-6 shadow-2xl flex flex-col justify-between transition-transform duration-200 ease-out cursor-pointer group"
              style={{
                transform: `rotateX(${bookTilt.x}deg) rotateY(${bookTilt.y}deg)`,
                boxShadow: "0 25px 50px -12px rgba(0, 245, 212, 0.15)",
              }}
            >
              {/* Book Spine Texture Effect */}
              <div
                aria-hidden="true"
                className="absolute left-0 top-0 bottom-0 w-3 bg-gradient-to-r from-black/60 to-transparent rounded-l-xl pointer-events-none"
              />

              {/* Cover Top Meta */}
              <div className="flex items-center justify-between text-[10px] font-mono tracking-widest text-[#00f5d4] uppercase">
                <span>PSYCHOLOGICAL SCI-FI</span>
                <span>Pothi.com</span>
              </div>

              {/* Cover Typography */}
              <div className="my-auto text-center space-y-2">
                <span className="text-[10px] font-mono uppercase tracking-[0.3em] text-neutral-400 block">
                  A Novel By
                </span>
                <span className="text-xs font-mono tracking-widest text-white block">
                  {featuredBook.author}
                </span>

                <div className="py-4 border-y border-white/10 my-4">
                  <h3 className="text-2xl sm:text-3xl font-black text-white tracking-tighter leading-tight font-serif uppercase">
                    THE LAST
                    <br />
                    HUMAN
                    <br />
                    UPDATE
                  </h3>
                </div>

                <p className="text-[11px] text-neutral-400 italic">
                  “When consciousness becomes deprecated code.”
                </p>
              </div>

              {/* Cover Bottom Details */}
              <div className="flex items-center justify-between text-[9px] font-mono text-neutral-400 border-t border-white/10 pt-3">
                <span>POTHI PUBLISHING</span>
                <span>FIRST EDITION</span>
              </div>
            </div>
          </div>

          {/* Book Synopsis & Themes */}
          <div className="lg:col-span-7 flex flex-col justify-between">
            <div>
              <div className="flex flex-wrap items-center gap-2 mb-3">
                <span className="px-3 py-1 rounded-full text-xs font-mono bg-[#00f5d4]/10 text-[#00f5d4] border border-[#00f5d4]/30">
                  {featuredBook.genre}
                </span>
                <span className="px-3 py-1 rounded-full text-xs font-mono bg-white/5 text-neutral-300 border border-white/10">
                  {featuredBook.format}
                </span>
                <span className="px-3 py-1 rounded-full text-xs font-mono bg-white/5 text-neutral-300 border border-white/10">
                  {featuredBook.publisherPlatform}
                </span>
              </div>

              <h3 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
                {featuredBook.title}
              </h3>
              <p className="text-sm font-mono text-neutral-400 mt-1">{featuredBook.subtitle}</p>

              {/* Pull Quote */}
              <div className="mt-6 p-4 rounded-xl bg-white/[0.03] border-l-2 border-[#00f5d4] italic text-neutral-200 text-sm sm:text-base leading-relaxed">
                {featuredBook.quote}
              </div>

              <p className="mt-4 text-sm sm:text-base text-neutral-300 font-light leading-relaxed">
                {featuredBook.synopsis}
              </p>

              {/* Core Themes */}
              <div className="mt-6">
                <span className="text-xs font-mono text-neutral-400 uppercase tracking-wider block mb-2">
                  Central Thematic Inquiries:
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-neutral-300">
                  {featuredBook.themes.map((theme, i) => (
                    <div key={i} className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#00f5d4]" />
                      <span>{theme}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Excerpt Toggle & Action */}
            <div className="mt-8 pt-6 border-t border-white/10 flex flex-wrap items-center gap-4">
              <button
                onClick={() => setShowExcerpt(!showExcerpt)}
                type="button"
                className="px-4 py-2 rounded-full border border-white/15 bg-white/5 hover:bg-white/10 text-white text-xs font-mono transition cursor-pointer"
              >
                {showExcerpt ? "Hide Excerpt" : "Read Opening Excerpt"}
              </button>

              {featuredBook.url ? (
                <a
                  href={featuredBook.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-5 py-2 rounded-full bg-[#00f5d4] text-[#08090c] font-bold text-xs font-mono hover:bg-[#38bdf8] transition cursor-pointer"
                >
                  <BookOpen className="w-4 h-4" />
                  <span>Order on Pothi.com</span>
                </a>
              ) : (
                <span className="text-xs font-mono text-neutral-400">
                  Published via Pothi.com distribution channel
                </span>
              )}
            </div>

            {/* Expandable Excerpt */}
            {showExcerpt && (
              <div className="mt-4 p-5 rounded-2xl bg-black/60 border border-white/10 font-serif text-sm text-neutral-300 leading-relaxed italic animate-in fade-in duration-300">
                <Quote className="w-4 h-4 text-[#00f5d4] mb-2 not-italic" />
                {featuredBook.excerptSnippet}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* TECHNICAL ARTICLES & WRITING CATALOG */}
      <div className="mt-16">
        <div className="flex items-center justify-between mb-8 pb-4 border-b border-white/10">
          <div>
            <h3 className="text-2xl font-bold text-white tracking-tight">
              Technical Writing & Engineering Essays
            </h3>
            <p className="text-xs font-mono text-neutral-400 mt-1">
              Articles and architectural retrospectives
            </p>
          </div>

          <span className="text-xs font-mono text-[#00f5d4]">Medium Ready</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {articles.map((article) => (
            <div
              key={article.id}
              className="p-6 rounded-2xl glass-panel border border-white/10 hover:border-white/20 transition flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-center justify-between text-xs font-mono text-neutral-400 mb-3">
                  <span className="text-[#00f5d4]">{article.category}</span>
                  <div className="flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    <span>{article.readTime}</span>
                  </div>
                </div>

                <h4 className="text-lg font-bold text-white group-hover:text-[#00f5d4] transition leading-snug">
                  {article.title}
                </h4>

                <p className="mt-3 text-xs sm:text-sm text-neutral-300 font-light leading-relaxed">
                  {article.description}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-white/5">
                <div className="flex flex-wrap gap-1.5 mb-4">
                  {article.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2 py-0.5 rounded text-[10px] font-mono bg-white/5 text-neutral-400"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>

                {article.url ? (
                  <a
                    href={article.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1 text-xs font-mono text-[#00f5d4] hover:underline"
                  >
                    <span>Read on Medium</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                ) : (
                  <div className="flex items-center justify-between text-[11px] font-mono text-neutral-400">
                    <span>{article.date}</span>
                    <span className="text-neutral-400 italic">Article Entry</span>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
