"use client";

import React, { useState } from "react";
import {
  BookOpen,
  Feather,
  ExternalLink,
  Quote,
  Clock,
} from "lucide-react";
import { featuredBook } from "@/data/books";
import { articles } from "@/data/writing";

export function WritingBooksSection() {
  const [showExcerpt, setShowExcerpt] = useState(false);
  const [bookTilt, setBookTilt] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientY - rect.top) / rect.height - 0.5) * -16;
    const y = ((e.clientX - rect.left) / rect.width - 0.5) * 20;
    setBookTilt({ x, y });
  };

  const handleMouseLeave = () => {
    setBookTilt({ x: 0, y: 0 });
  };

  return (
    <section
      id="writing-books"
      aria-label="Books and Technical Writing"
      className="relative py-16 sm:py-24 md:py-32 px-4 sm:px-6 lg:px-12 max-w-7xl mx-auto z-10 w-full overflow-hidden"
    >
      {/* Section Motif */}
      <div
        aria-hidden="true"
        className="flex items-center gap-3 sm:gap-4 mb-6 sm:mb-8 text-xs font-mono text-neutral-400 tracking-wider"
      >
        <span className="w-6 sm:w-8 h-[1px] bg-[#00f5d4]" />
        <span className="text-[#00f5d4]">SECTION 05</span>
        <span className="text-neutral-600">//</span>
        <span>AUTHORED WORK & ESSAYS</span>
      </div>

      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-5 pb-8 sm:pb-12 border-b border-white/10 w-full">
        <div>
          <h2 className="text-3xl sm:text-5xl md:text-6xl font-black tracking-tight text-white">
            Books & Writing
          </h2>
          <p className="mt-3 text-sm sm:text-base md:text-lg text-neutral-300 max-w-2xl font-light">
            Fiction exploring human consciousness in an algorithmic world, alongside technical essays
            on Linux event loops and interpreter internals.
          </p>
        </div>

        <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs font-mono text-neutral-300 self-start">
          <Feather className="w-3.5 h-3.5 text-[#00f5d4]" />
          <span>Novel + Systems Essays</span>
        </div>
      </div>

      {/* FEATURED BOOK: The Last Human Update */}
      <div className="mt-8 sm:mt-12 rounded-2xl sm:rounded-3xl glass-panel border border-white/10 p-5 sm:p-8 md:p-12 relative overflow-hidden bg-gradient-to-br from-[#121622]/80 via-[#0a0c12]/90 to-black w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-10 items-center">
          {/* Interactive 3D Perspective Book Mockup */}
          <div
            className="lg:col-span-5 flex justify-center perspective-[1000px] select-none w-full"
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
          >
            <div
              className="relative w-48 sm:w-60 md:w-68 h-72 sm:h-88 rounded-xl border border-white/20 bg-gradient-to-b from-[#181d28] via-[#0f131a] to-[#080a0f] p-4 sm:p-5 shadow-2xl flex flex-col justify-between transition-transform duration-200 ease-out cursor-pointer group"
              style={{
                transform: `rotateX(${bookTilt.x}deg) rotateY(${bookTilt.y}deg)`,
                boxShadow: "0 25px 50px -12px rgba(0, 245, 212, 0.15)",
              }}
            >
              {/* Book Spine Texture Effect */}
              <div
                aria-hidden="true"
                className="absolute left-0 top-0 bottom-0 w-2.5 bg-gradient-to-r from-black/60 to-transparent rounded-l-xl pointer-events-none"
              />

              {/* Cover Top Meta */}
              <div className="flex items-center justify-between text-[9px] font-mono tracking-widest text-[#00f5d4] uppercase">
                <span>PSYCHOLOGICAL SCI-FI</span>
                <span>Pothi.com</span>
              </div>

              {/* Cover Typography */}
              <div className="my-auto text-center space-y-1.5">
                <span className="text-[9px] font-mono uppercase tracking-[0.25em] text-neutral-400 block">
                  A Novel By
                </span>
                <span className="text-[11px] font-mono tracking-widest text-white block">
                  {featuredBook.author}
                </span>

                <div className="py-2.5 border-y border-white/10 my-2.5">
                  <h3 className="text-xl sm:text-2xl font-black text-white tracking-tighter leading-tight font-serif uppercase">
                    THE LAST
                    <br />
                    HUMAN
                    <br />
                    UPDATE
                  </h3>
                </div>

                <p className="text-[10px] text-neutral-400 italic">
                  “When consciousness becomes deprecated code.”
                </p>
              </div>

              {/* Cover Bottom Details */}
              <div className="flex items-center justify-between text-[8px] sm:text-[9px] font-mono text-neutral-400 border-t border-white/10 pt-2.5">
                <span>POTHI PUBLISHING</span>
                <span>FIRST EDITION</span>
              </div>
            </div>
          </div>

          {/* Book Synopsis & Themes */}
          <div className="lg:col-span-7 flex flex-col justify-between w-full">
            <div>
              <div className="flex flex-wrap items-center gap-1.5 sm:gap-2 mb-2.5">
                <span className="px-2.5 py-0.5 rounded-full text-[11px] font-mono bg-[#00f5d4]/10 text-[#00f5d4] border border-[#00f5d4]/30">
                  {featuredBook.genre}
                </span>
                <span className="px-2.5 py-0.5 rounded-full text-[11px] font-mono bg-white/5 text-neutral-300 border border-white/10">
                  {featuredBook.publisherPlatform}
                </span>
              </div>

              <h3 className="text-2xl sm:text-3xl md:text-4xl font-black text-white tracking-tight">
                {featuredBook.title}
              </h3>
              <p className="text-xs sm:text-sm font-mono text-neutral-400 mt-0.5">{featuredBook.subtitle}</p>

              {/* Pull Quote */}
              <div className="mt-4 p-3 sm:p-4 rounded-xl bg-white/[0.03] border-l-2 border-[#00f5d4] italic text-neutral-200 text-xs sm:text-sm md:text-base leading-relaxed">
                {featuredBook.quote}
              </div>

              <p className="mt-3 text-xs sm:text-sm md:text-base text-neutral-300 font-light leading-relaxed">
                {featuredBook.synopsis}
              </p>

              {/* Core Themes */}
              <div className="mt-4">
                <span className="text-[11px] font-mono text-neutral-400 uppercase tracking-wider block mb-1.5">
                  Core Inquiries:
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 text-xs text-neutral-300">
                  {featuredBook.themes.map((theme, i) => (
                    <div key={i} className="flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#00f5d4] shrink-0" />
                      <span>{theme}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Excerpt Toggle & Action */}
            <div className="mt-6 pt-4 border-t border-white/10 flex flex-wrap items-center gap-3">
              <button
                onClick={() => setShowExcerpt(!showExcerpt)}
                type="button"
                className="px-3.5 py-2 rounded-full border border-white/15 bg-white/5 hover:bg-white/10 text-white text-xs font-mono transition cursor-pointer"
              >
                {showExcerpt ? "Hide Excerpt" : "Read Opening Excerpt"}
              </button>

              {featuredBook.url ? (
                <a
                  href={featuredBook.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 px-4 py-2 rounded-full bg-[#00f5d4] text-[#08090c] font-bold text-xs font-mono hover:bg-[#38bdf8] transition cursor-pointer"
                >
                  <BookOpen className="w-3.5 h-3.5" />
                  <span>Order on Pothi.com</span>
                </a>
              ) : (
                <span className="text-[11px] font-mono text-neutral-400">
                  Published via Pothi.com distribution channel
                </span>
              )}
            </div>

            {/* Expandable Excerpt */}
            {showExcerpt && (
              <div className="mt-3.5 p-4 rounded-xl bg-black/60 border border-white/10 font-serif text-xs sm:text-sm text-neutral-300 leading-relaxed italic animate-in fade-in duration-300">
                <Quote className="w-3.5 h-3.5 text-[#00f5d4] mb-1.5 not-italic" />
                {featuredBook.excerptSnippet}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* TECHNICAL ARTICLES */}
      <div className="mt-12 sm:mt-16 w-full">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6 pb-3 border-b border-white/10">
          <div>
            <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
              Technical Writing & Open Source Retrospectives
            </h3>
            <p className="text-xs font-mono text-neutral-400 mt-0.5">
              Published on Medium // Systems, Sandboxing & Linux Infrastructure
            </p>
          </div>

          <a
            href="https://singhcod3r.medium.com"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 hover:border-[#00f5d4]/40 text-xs font-mono text-[#00f5d4] transition self-start sm:self-auto cursor-pointer"
          >
            <span>Medium @SinghCod3r</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 w-full">
          {articles.map((article) => (
            <div
              key={article.id}
              className="rounded-2xl glass-panel border border-white/10 hover:border-[#00f5d4]/30 transition-all duration-300 flex flex-col justify-between group w-full overflow-hidden bg-gradient-to-b from-white/[0.02] to-black/40"
            >
              <div>
                {/* Visual Article Preview Banner */}
                {article.image && (
                  <a
                    href={article.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block relative aspect-[16/9] w-full overflow-hidden bg-black/60 border-b border-white/10 group-hover:opacity-95 transition"
                  >
                    <img
                      src={article.image}
                      alt={article.title}
                      className="w-full h-full object-cover object-top group-hover:scale-[1.03] transition duration-500 ease-out"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#08090c] via-transparent to-transparent opacity-80" />
                    <span className="absolute top-3 left-3 px-2 py-0.5 rounded text-[10px] font-mono bg-black/70 backdrop-blur-md text-[#00f5d4] border border-white/10">
                      {article.category}
                    </span>
                  </a>
                )}

                <div className="p-4 sm:p-5">
                  <div className="flex items-center justify-between text-xs font-mono text-neutral-400 mb-2">
                    <span className="text-[11px] text-neutral-400">{article.date}</span>
                    <div className="flex items-center gap-1 text-[11px]">
                      <Clock className="w-3 h-3 text-[#00f5d4]" />
                      <span>{article.readTime}</span>
                    </div>
                  </div>

                  <a
                    href={article.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block group/link"
                  >
                    <h4 className="text-base sm:text-lg font-bold text-white group-hover/link:text-[#00f5d4] transition leading-snug line-clamp-2">
                      {article.title}
                    </h4>
                  </a>

                  <p className="mt-2.5 text-xs sm:text-sm text-neutral-300 font-light leading-relaxed line-clamp-3">
                    {article.description}
                  </p>
                </div>
              </div>

              <div className="px-4 sm:px-5 pb-4 sm:pb-5 pt-3 border-t border-white/5">
                <div className="flex flex-wrap gap-1 mb-3.5">
                  {article.tags.slice(0, 4).map((tag) => (
                    <span
                      key={tag}
                      className="px-2 py-0.5 rounded text-[10px] font-mono bg-white/5 text-neutral-400 border border-white/5"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>

                <a
                  href={article.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between w-full px-3 py-2 rounded-xl bg-white/5 group-hover:bg-[#00f5d4]/10 border border-white/10 group-hover:border-[#00f5d4]/30 text-xs font-mono text-[#00f5d4] transition cursor-pointer"
                >
                  <span className="font-semibold">Read on Medium</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
