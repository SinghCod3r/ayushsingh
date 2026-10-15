"use client";

import React, { useState } from "react";
import {
  BookOpen,
  Feather,
  ExternalLink,
  Quote,
  Clock,
  Sparkles,
} from "lucide-react";
import { SiMedium } from "react-icons/si";
import { books } from "@/data/books";
import { articles, ArticleItem } from "@/data/writing";

export function WritingBooksSection() {
  // Books State
  const [selectedBookIndex, setSelectedBookIndex] = useState(0);
  const [showExcerpt, setShowExcerpt] = useState(false);
  const [bookTilt, setBookTilt] = useState({ x: 0, y: 0 });

  const activeBook = books[selectedBookIndex];

  const handleBookMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientY - rect.top) / rect.height - 0.5) * -14;
    const y = ((e.clientX - rect.left) / rect.width - 0.5) * 16;
    setBookTilt({ x, y });
  };

  const handleBookMouseLeave = () => {
    setBookTilt({ x: 0, y: 0 });
  };

  // Prepare dual-line datasets for continuous infinite marquee
  const line1Articles: ArticleItem[] = [...articles, ...articles, ...articles];
  const line2Articles: ArticleItem[] = [
    ...articles.slice(2),
    ...articles.slice(0, 2),
    ...articles.slice(2),
    ...articles.slice(0, 2),
    ...articles,
  ];

  const renderArticleCard = (article: ArticleItem, keyPrefix: string, index: number) => (
    <div
      key={`${keyPrefix}-${article.id}-${index}`}
      className="w-[300px] sm:w-[360px] md:w-[390px] h-[215px] sm:h-[225px] flex-shrink-0 rounded-2xl glass-panel border border-white/15 hover:border-[#00f5d4]/50 transition-all duration-300 flex flex-col justify-between group p-4 sm:p-5 bg-gradient-to-br from-[#0d111a]/95 via-[#080a0f]/95 to-black relative overflow-hidden select-none hover:-translate-y-1 hover:shadow-[0_15px_30px_-10px_rgba(0,245,212,0.2)]"
    >
      {/* Top Ambient Glow */}
      <div
        aria-hidden="true"
        className="absolute top-0 right-0 w-28 h-28 opacity-15 pointer-events-none blur-xl rounded-full"
        style={{ backgroundColor: article.accentColor }}
      />

      <div>
        {/* Header Strip with Medium Badge */}
        <div className="flex items-center justify-between text-xs font-mono mb-2">
          <div className="flex items-center gap-1.5">
            <SiMedium className="w-3.5 h-3.5 text-neutral-400 group-hover:text-white transition" />
            <span
              className="px-2 py-0.5 rounded text-[10px] font-bold border"
              style={{
                backgroundColor: `${article.accentColor}15`,
                color: article.accentColor,
                borderColor: `${article.accentColor}40`,
              }}
            >
              {article.category}
            </span>
          </div>
          <div className="flex items-center gap-1 text-[11px] text-neutral-400">
            <Clock className="w-3 h-3" />
            <span>{article.readTime}</span>
          </div>
        </div>

        {/* Article Title */}
        <a
          href={article.url}
          target="_blank"
          rel="noopener noreferrer"
          className="block group/link"
        >
          <h4 className="text-sm sm:text-base font-bold text-white group-hover/link:text-[#00f5d4] transition leading-snug line-clamp-2">
            {article.title}
          </h4>
        </a>

        {/* Clean Synopsis */}
        <p className="mt-2 text-[11px] sm:text-xs text-neutral-300 font-light leading-relaxed line-clamp-2">
          {article.description}
        </p>
      </div>

      {/* Tags & Action Link */}
      <div className="pt-3 border-t border-white/10 flex items-center justify-between">
        <div className="flex flex-wrap gap-1">
          {article.tags.slice(0, 3).map((tag) => (
            <span
              key={tag}
              className="px-1.5 py-0.5 rounded text-[9px] font-mono bg-white/5 text-neutral-400 border border-white/5"
            >
              #{tag}
            </span>
          ))}
        </div>

        <a
          href={article.url}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-white/5 group-hover:bg-[#00f5d4]/10 border border-white/10 group-hover:border-[#00f5d4]/30 text-[11px] font-mono text-[#00f5d4] transition cursor-pointer shrink-0"
        >
          <span>Medium</span>
          <ExternalLink className="w-3 h-3" />
        </a>
      </div>
    </div>
  );

  return (
    <section
      id="writing-books"
      aria-label="Books and Technical Writing"
      className="relative py-12 sm:py-16 md:py-20 px-4 sm:px-6 lg:px-12 max-w-7xl mx-auto z-10 w-full overflow-hidden scroll-mt-16"
    >
      {/* Section Motif */}
      <div
        aria-hidden="true"
        className="flex items-center gap-3 sm:gap-4 mb-5 sm:mb-6 text-xs font-mono text-neutral-400 tracking-wider"
      >
        <span className="w-6 sm:w-8 h-[1px] bg-[#00f5d4]" />
        <span className="text-[#00f5d4]">SECTION 05</span>
        <span className="text-neutral-600">//</span>
        <span>AUTHORED BOOKS & DUAL-TRACK ESSAY STREAM</span>
      </div>

      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-4 pb-6 sm:pb-8 border-b border-white/10 w-full">
        <div>
          <h2 className="text-3xl sm:text-5xl md:text-6xl font-black tracking-tight text-white">
            Books & Writing
          </h2>
          <p className="mt-2 text-sm sm:text-base md:text-lg text-neutral-300 max-w-2xl font-light">
            Published speculative fiction and memoirs on Pothi.com, alongside architectural retrospectives on Medium.
          </p>
        </div>

        <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs font-mono text-neutral-300 self-start">
          <Feather className="w-3.5 h-3.5 text-[#00f5d4]" />
          <span>2 Published Books · 5 Medium Stories</span>
        </div>
      </div>

      {/* BOOK SELECTION TABS */}
      <div className="mt-6 flex items-center gap-2.5">
        {books.map((b, idx) => (
          <button
            key={b.id}
            onClick={() => {
              setSelectedBookIndex(idx);
              setShowExcerpt(false);
            }}
            type="button"
            className={`flex items-center gap-2 px-4 py-2 rounded-full font-mono text-xs sm:text-sm transition cursor-pointer ${
              selectedBookIndex === idx
                ? "bg-white/15 text-white font-bold border border-white/30 shadow-[0_0_15px_rgba(255,255,255,0.1)]"
                : "bg-white/5 text-neutral-400 hover:text-white border border-white/10"
            }`}
          >
            <BookOpen className="w-3.5 h-3.5" style={{ color: b.accentColor }} />
            <span>{b.title}</span>
          </button>
        ))}
      </div>

      {/* FEATURED BOOK SHOWCASE */}
      <div
        className="mt-5 rounded-2xl sm:rounded-3xl glass-panel border border-white/15 p-5 sm:p-7 md:p-10 relative overflow-hidden bg-gradient-to-br from-[#121622]/80 via-[#0a0c12]/90 to-black w-full"
        style={{
          boxShadow: `0 20px 50px -15px ${activeBook.glowColor}`,
        }}
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-center">
          {/* Interactive 3D Perspective Book Mockup */}
          <div
            className="lg:col-span-5 flex justify-center perspective-[1000px] select-none w-full"
            onMouseMove={handleBookMouseMove}
            onMouseLeave={handleBookMouseLeave}
          >
            <div
              className="relative w-48 sm:w-56 md:w-64 h-72 sm:h-84 md:h-88 rounded-xl border border-white/20 bg-gradient-to-b from-[#181d28] via-[#0f131a] to-[#080a0f] p-4 sm:p-5 shadow-2xl flex flex-col justify-between transition-transform duration-200 ease-out cursor-pointer group"
              style={{
                transform: `rotateX(${bookTilt.x}deg) rotateY(${bookTilt.y}deg)`,
                boxShadow: `0 25px 50px -10px ${activeBook.glowColor}`,
              }}
            >
              {/* Book Spine Texture Effect */}
              <div
                aria-hidden="true"
                className="absolute left-0 top-0 bottom-0 w-2.5 bg-gradient-to-r from-black/70 to-transparent rounded-l-xl pointer-events-none"
              />

              {/* Cover Top Meta */}
              <div className="flex items-center justify-between text-[10px] font-mono tracking-widest uppercase">
                <span style={{ color: activeBook.accentColor }}>{activeBook.genre}</span>
                <span className="text-neutral-400">Pothi.com</span>
              </div>

              {/* Cover Typography */}
              <div className="my-auto text-center space-y-1.5">
                <span className="text-[9px] font-mono uppercase tracking-[0.25em] text-neutral-400 block">
                  Authored By
                </span>
                <span className="text-xs font-mono tracking-widest text-white font-bold block">
                  {activeBook.author}
                </span>

                <div className="py-2.5 border-y border-white/10 my-2.5">
                  <h3 className="text-xl sm:text-2xl font-black text-white tracking-tight leading-tight uppercase font-serif">
                    {activeBook.title}
                  </h3>
                </div>

                <p className="text-[10px] text-neutral-300 italic px-1">
                  “{activeBook.tagline}”
                </p>
              </div>

              {/* Cover Bottom Details */}
              <div className="flex items-center justify-between text-[8px] sm:text-[9px] font-mono text-neutral-400 border-t border-white/10 pt-2.5">
                <span>POTHI STORE</span>
                <span>ORIGINAL EDITION</span>
              </div>
            </div>
          </div>

          {/* Book Synopsis & Themes */}
          <div className="lg:col-span-7 flex flex-col justify-between w-full space-y-3.5">
            <div>
              <div className="flex flex-wrap items-center gap-2 mb-2">
                <span
                  className="px-2.5 py-0.5 rounded-full text-[11px] font-mono border"
                  style={{
                    backgroundColor: `${activeBook.accentColor}15`,
                    color: activeBook.accentColor,
                    borderColor: `${activeBook.accentColor}40`,
                  }}
                >
                  {activeBook.genre}
                </span>
                <span className="px-2.5 py-0.5 rounded-full text-[11px] font-mono bg-white/5 text-neutral-300 border border-white/10">
                  {activeBook.publisherPlatform}
                </span>
              </div>

              <h3 className="text-2xl sm:text-3xl md:text-4xl font-black text-white tracking-tight">
                {activeBook.title}
              </h3>
              <p className="text-xs sm:text-sm font-mono text-neutral-400 mt-0.5">{activeBook.subtitle}</p>

              {/* Pull Quote */}
              <div
                className="mt-3 p-3.5 rounded-xl bg-white/[0.03] border-l-2 italic text-neutral-200 text-xs sm:text-sm leading-relaxed"
                style={{ borderColor: activeBook.accentColor }}
              >
                {activeBook.quote}
              </div>

              <p className="mt-2.5 text-xs sm:text-sm text-neutral-300 font-light leading-relaxed">
                {activeBook.synopsis}
              </p>

              {/* Core Themes */}
              <div className="mt-3">
                <span className="text-[10px] font-mono text-neutral-400 uppercase tracking-wider block mb-1.5">
                  Core Inquiries & Themes:
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 text-xs text-neutral-300">
                  {activeBook.themes.map((theme, i) => (
                    <div key={i} className="flex items-center gap-1.5">
                      <span
                        className="w-1.5 h-1.5 rounded-full shrink-0"
                        style={{ backgroundColor: activeBook.accentColor }}
                      />
                      <span className="text-[11px]">{theme}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Actions & Excerpt Toggle */}
            <div className="pt-3 border-t border-white/10 flex flex-wrap items-center gap-2.5">
              <a
                href={activeBook.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 px-4 sm:px-5 py-2 rounded-full text-[#08090c] font-bold text-xs font-mono transition cursor-pointer shadow-lg"
                style={{ backgroundColor: activeBook.accentColor }}
              >
                <BookOpen className="w-3.5 h-3.5" />
                <span>Order on Pothi.com</span>
                <ExternalLink className="w-3.5 h-3.5 ml-0.5" />
              </a>

              <button
                onClick={() => setShowExcerpt(!showExcerpt)}
                type="button"
                className="px-3.5 py-2 rounded-full border border-white/15 bg-white/5 hover:bg-white/10 text-white text-xs font-mono transition cursor-pointer"
              >
                {showExcerpt ? "Hide Excerpt" : "Read Opening Excerpt"}
              </button>
            </div>

            {/* Expandable Excerpt */}
            {showExcerpt && (
              <div className="p-3.5 rounded-xl bg-black/60 border border-white/10 font-serif text-xs text-neutral-300 leading-relaxed italic animate-in fade-in duration-300">
                <Quote className="w-3.5 h-3.5 text-[#00f5d4] mb-1 not-italic" />
                {activeBook.excerptSnippet}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* CONTINUOUS DUAL-LINE HORIZONTAL SLIDING STREAM */}
      <div className="mt-12 sm:mt-16 w-full">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-5 pb-3 border-b border-white/10">
          <div>
            <div className="flex items-center gap-2 mb-0.5">
              <SiMedium className="w-4 h-4 text-white" />
              <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                Technical Writing & Open Source Retrospectives
              </h3>
            </div>
            <p className="text-xs font-mono text-neutral-400">
              Dual-line continuous 3D motion stream // Hover any card to pause and inspect
            </p>
          </div>

          <a
            href="https://singhcod3r.medium.com"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 hover:border-[#00f5d4]/40 text-xs font-mono text-[#00f5d4] transition self-start sm:self-auto"
          >
            <span>Medium @SinghCod3r</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>

        {/* Dual-Line Continuous Marquee Container with Edge Gradient Masks */}
        <div className="relative w-full overflow-hidden pause-marquee py-2 space-y-4">
          {/* Left Gradient Fade Mask (prevents left edge cutoff) */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-y-0 left-0 w-16 sm:w-28 bg-gradient-to-r from-[#08090c] to-transparent z-10"
          />

          {/* Right Gradient Fade Mask (prevents right edge cutoff) */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-y-0 right-0 w-16 sm:w-28 bg-gradient-to-l from-[#08090c] to-transparent z-10"
          />

          {/* LINE 1 (Top Row): Slides continuously from right to left */}
          <div className="animate-marquee-left gap-4">
            {line1Articles.map((article, i) => renderArticleCard(article, "l1", i))}
          </div>

          {/* LINE 2 (Bottom Row): Slides continuously in reverse from left to right */}
          <div className="animate-marquee-right gap-4">
            {line2Articles.map((article, i) => renderArticleCard(article, "l2", i))}
          </div>
        </div>
      </div>
    </section>
  );
}
