"use client";

import React, { useState, useRef } from "react";
import {
  BookOpen,
  Feather,
  ExternalLink,
  Quote,
  Clock,
  ChevronLeft,
  ChevronRight,
  Sparkles,
} from "lucide-react";
import { SiMedium } from "react-icons/si";
import { books } from "@/data/books";
import { articles } from "@/data/writing";

export function WritingBooksSection() {
  // Books State
  const [selectedBookIndex, setSelectedBookIndex] = useState(0);
  const [showExcerpt, setShowExcerpt] = useState(false);
  const [bookTilt, setBookTilt] = useState({ x: 0, y: 0 });

  // Articles Horizontal Deck State
  const [articleIndex, setArticleIndex] = useState(0);
  const deckRef = useRef<HTMLDivElement>(null);

  const activeBook = books[selectedBookIndex];

  const handleBookMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientY - rect.top) / rect.height - 0.5) * -16;
    const y = ((e.clientX - rect.left) / rect.width - 0.5) * 20;
    setBookTilt({ x, y });
  };

  const handleBookMouseLeave = () => {
    setBookTilt({ x: 0, y: 0 });
  };

  const scrollDeck = (direction: "left" | "right") => {
    if (!deckRef.current) return;
    const cardWidth = 360;
    deckRef.current.scrollBy({
      left: direction === "left" ? -cardWidth : cardWidth,
      behavior: "smooth",
    });
    if (direction === "left") {
      setArticleIndex((prev) => Math.max(0, prev - 1));
    } else {
      setArticleIndex((prev) => Math.min(articles.length - 1, prev + 1));
    }
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
        <span>AUTHORED BOOKS & 3D ESSAY DECK</span>
      </div>

      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-5 pb-8 sm:pb-12 border-b border-white/10 w-full">
        <div>
          <h2 className="text-3xl sm:text-5xl md:text-6xl font-black tracking-tight text-white">
            Books & Writing
          </h2>
          <p className="mt-3 text-sm sm:text-base md:text-lg text-neutral-300 max-w-2xl font-light">
            Published speculative fiction and personal engineering retrospectives on Pothi.com, alongside
            technical architectural essays on Medium.
          </p>
        </div>

        <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs font-mono text-neutral-300 self-start">
          <Feather className="w-3.5 h-3.5 text-[#00f5d4]" />
          <span>2 Published Books · 5 Medium Stories</span>
        </div>
      </div>

      {/* BOOK SELECTION TABS */}
      <div className="mt-8 flex items-center gap-3">
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
        className="mt-6 rounded-2xl sm:rounded-3xl glass-panel border border-white/15 p-5 sm:p-8 md:p-12 relative overflow-hidden bg-gradient-to-br from-[#121622]/80 via-[#0a0c12]/90 to-black w-full"
        style={{
          boxShadow: `0 20px 50px -15px ${activeBook.glowColor}`,
        }}
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-10 items-center">
          {/* Interactive 3D Perspective Book Mockup */}
          <div
            className="lg:col-span-5 flex justify-center perspective-[1000px] select-none w-full"
            onMouseMove={handleBookMouseMove}
            onMouseLeave={handleBookMouseLeave}
          >
            <div
              className="relative w-52 sm:w-64 md:w-72 h-80 sm:h-96 rounded-xl border border-white/20 bg-gradient-to-b from-[#181d28] via-[#0f131a] to-[#080a0f] p-5 sm:p-6 shadow-2xl flex flex-col justify-between transition-transform duration-200 ease-out cursor-pointer group"
              style={{
                transform: `rotateX(${bookTilt.x}deg) rotateY(${bookTilt.y}deg)`,
                boxShadow: `0 25px 50px -10px ${activeBook.glowColor}`,
              }}
            >
              {/* Book Spine Texture Effect */}
              <div
                aria-hidden="true"
                className="absolute left-0 top-0 bottom-0 w-3 bg-gradient-to-r from-black/70 to-transparent rounded-l-xl pointer-events-none"
              />

              {/* Cover Top Meta */}
              <div className="flex items-center justify-between text-[10px] font-mono tracking-widest uppercase">
                <span style={{ color: activeBook.accentColor }}>{activeBook.genre}</span>
                <span className="text-neutral-400">Pothi.com</span>
              </div>

              {/* Cover Typography */}
              <div className="my-auto text-center space-y-2">
                <span className="text-[10px] font-mono uppercase tracking-[0.25em] text-neutral-400 block">
                  Authored By
                </span>
                <span className="text-xs font-mono tracking-widest text-white font-bold block">
                  {activeBook.author}
                </span>

                <div className="py-3 border-y border-white/10 my-3">
                  <h3 className="text-2xl sm:text-3xl font-black text-white tracking-tight leading-tight uppercase font-serif">
                    {activeBook.title}
                  </h3>
                </div>

                <p className="text-[11px] text-neutral-300 italic px-2">
                  “{activeBook.tagline}”
                </p>
              </div>

              {/* Cover Bottom Details */}
              <div className="flex items-center justify-between text-[9px] font-mono text-neutral-400 border-t border-white/10 pt-3">
                <span>POTHI STORE</span>
                <span>ORIGINAL EDITION</span>
              </div>
            </div>
          </div>

          {/* Book Synopsis & Themes */}
          <div className="lg:col-span-7 flex flex-col justify-between w-full space-y-4">
            <div>
              <div className="flex flex-wrap items-center gap-2 mb-3">
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
              <p className="text-xs sm:text-sm font-mono text-neutral-400 mt-1">{activeBook.subtitle}</p>

              {/* Pull Quote */}
              <div className="mt-4 p-4 rounded-xl bg-white/[0.03] border-l-2 italic text-neutral-200 text-xs sm:text-sm md:text-base leading-relaxed"
                style={{ borderColor: activeBook.accentColor }}
              >
                {activeBook.quote}
              </div>

              <p className="mt-3 text-xs sm:text-sm md:text-base text-neutral-300 font-light leading-relaxed">
                {activeBook.synopsis}
              </p>

              {/* Core Themes */}
              <div className="mt-4">
                <span className="text-[11px] font-mono text-neutral-400 uppercase tracking-wider block mb-2">
                  Core Inquiries & Themes:
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-neutral-300">
                  {activeBook.themes.map((theme, i) => (
                    <div key={i} className="flex items-center gap-2">
                      <span
                        className="w-1.5 h-1.5 rounded-full shrink-0"
                        style={{ backgroundColor: activeBook.accentColor }}
                      />
                      <span>{theme}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Actions & Excerpt Toggle */}
            <div className="pt-4 border-t border-white/10 flex flex-wrap items-center gap-3">
              <a
                href={activeBook.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-5 py-2.5 rounded-full text-[#08090c] font-bold text-xs font-mono transition cursor-pointer shadow-lg"
                style={{ backgroundColor: activeBook.accentColor }}
              >
                <BookOpen className="w-3.5 h-3.5" />
                <span>Order on Pothi.com</span>
                <ExternalLink className="w-3.5 h-3.5 ml-1" />
              </a>

              <button
                onClick={() => setShowExcerpt(!showExcerpt)}
                type="button"
                className="px-4 py-2.5 rounded-full border border-white/15 bg-white/5 hover:bg-white/10 text-white text-xs font-mono transition cursor-pointer"
              >
                {showExcerpt ? "Hide Excerpt" : "Read Opening Excerpt"}
              </button>
            </div>

            {/* Expandable Excerpt */}
            {showExcerpt && (
              <div className="p-4 rounded-xl bg-black/60 border border-white/10 font-serif text-xs sm:text-sm text-neutral-300 leading-relaxed italic animate-in fade-in duration-300">
                <Quote className="w-3.5 h-3.5 text-[#00f5d4] mb-1.5 not-italic" />
                {activeBook.excerptSnippet}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* 3D HORIZONTAL CONTINUOUS DECK: TECHNICAL WRITING & OPEN SOURCE RETROSPECTIVES */}
      <div className="mt-16 sm:mt-24 w-full">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 pb-3 border-b border-white/10">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <SiMedium className="w-5 h-5 text-white" />
              <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                Technical Writing & Open Source Retrospectives
              </h3>
            </div>
            <p className="text-xs font-mono text-neutral-400">
              Horizontal 3D Deck // Authentic Medium stories by SinghCod3r
            </p>
          </div>

          {/* Deck Controls (Left / Right Movement) */}
          <div className="flex items-center gap-3 self-end sm:self-auto">
            <a
              href="https://singhcod3r.medium.com"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 hover:border-[#00f5d4]/40 text-xs font-mono text-[#00f5d4] transition"
            >
              <span>Medium Profile</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>

            <div className="flex items-center gap-1.5">
              <button
                onClick={() => scrollDeck("left")}
                type="button"
                aria-label="Move deck left"
                className="p-2 rounded-full bg-white/5 hover:bg-white/15 border border-white/10 text-white transition hover:border-[#00f5d4]/40 cursor-pointer"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                onClick={() => scrollDeck("right")}
                type="button"
                aria-label="Move deck right"
                className="p-2 rounded-full bg-white/5 hover:bg-white/15 border border-white/10 text-white transition hover:border-[#00f5d4]/40 cursor-pointer"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* 3D Deck Horizontal Track */}
        <div
          ref={deckRef}
          className="flex items-stretch gap-5 overflow-x-auto snap-x snap-mandatory pb-6 pt-2 px-1 no-scrollbar w-full perspective-[1200px]"
          style={{ scrollBehavior: "smooth" }}
        >
          {articles.map((article, idx) => (
            <div
              key={article.id}
              className="w-[85vw] sm:w-[380px] md:w-[420px] flex-shrink-0 snap-center rounded-2xl glass-panel border border-white/15 hover:border-[#00f5d4]/40 transition-all duration-300 flex flex-col justify-between group p-5 sm:p-6 bg-gradient-to-br from-[#0c0f16]/90 via-[#080a0f]/95 to-black relative overflow-hidden"
              style={{
                boxShadow: "0 20px 40px -15px rgba(0, 0, 0, 0.7)",
              }}
            >
              {/* Top Card Glow */}
              <div
                aria-hidden="true"
                className="absolute top-0 right-0 w-32 h-32 opacity-15 pointer-events-none blur-2xl rounded-full"
                style={{ backgroundColor: article.accentColor }}
              />

              <div>
                {/* Header Strip with Medium Badge */}
                <div className="flex items-center justify-between text-xs font-mono mb-3">
                  <div className="flex items-center gap-1.5">
                    <SiMedium className="w-3.5 h-3.5 text-neutral-400 group-hover:text-white transition" />
                    <span
                      className="px-2 py-0.5 rounded text-[10px] font-bold border"
                      style={{
                        backgroundColor: `${article.accentColor}15`,
                        color: article.accentColor,
                        borderColor: `${article.accentColor}35`,
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
                  <h4 className="text-lg sm:text-xl font-bold text-white group-hover/link:text-[#00f5d4] transition leading-snug line-clamp-2">
                    {article.title}
                  </h4>
                </a>

                {/* Clean Synopsis */}
                <p className="mt-3 text-xs sm:text-sm text-neutral-300 font-light leading-relaxed line-clamp-3">
                  {article.description}
                </p>
              </div>

              {/* Tags & Action Link */}
              <div className="mt-6 pt-4 border-t border-white/10">
                <div className="flex flex-wrap gap-1.5 mb-3.5">
                  {article.tags.map((tag) => (
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
                  className="flex items-center justify-between w-full px-4 py-2.5 rounded-xl bg-white/5 group-hover:bg-[#00f5d4]/10 border border-white/10 group-hover:border-[#00f5d4]/30 text-xs font-mono text-[#00f5d4] transition cursor-pointer"
                >
                  <span className="font-bold">Read Full Story on Medium</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* Deck Position Indicator Dots */}
        <div className="flex items-center justify-center gap-1.5 mt-2">
          {articles.map((_, i) => (
            <div
              key={i}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                articleIndex === i ? "w-6 bg-[#00f5d4]" : "w-1.5 bg-white/20"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
