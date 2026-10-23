import React, { useState } from 'react';
import { portfolioData, Writing } from '../../../data';
import { MobileArticleModal } from './MobileArticleModal';

export const MobileWritings: React.FC = () => {
  const [selectedArticle, setSelectedArticle] = useState<Writing | null>(null);

  const writings = portfolioData.writings;

  return (
    <>
      <section
        id="mobile-writings"
        className="relative w-full py-14 px-6 bg-[#080909] text-[#F2F0E8] overflow-hidden border-t border-white/[0.06]"
      >
        {/* Subtle portrait frame 185 at bottom */}
        <div className="absolute bottom-0 right-[-10%] w-56 h-64 opacity-20 pointer-events-none filter grayscale contrast-125">
          <img
            src="/images/hero-sequence/frame-185.webp"
            alt="Ayush Singh"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#080909] via-[#080909]/70 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-l from-transparent via-[#080909]/60 to-[#080909]" />
        </div>

        <div className="relative z-10 flex flex-col">
          {/* Section Label */}
          <div className="flex items-center space-x-1.5 text-[10px] font-mono tracking-widest uppercase text-[#F5D52F] mb-3">
            <span>WRITINGS</span>
            <span>↗</span>
          </div>

          {/* Editorial Headline */}
          <h2 className="font-editorial text-[14vw] leading-[0.9] tracking-tight mb-8">
            <span className="text-[#F2F0E8]">I ALSO<br /></span>
            <span className="text-[#F2F0E8]">TALK ABOUT<br /></span>
            <span className="text-[#F5D52F]">TECHNOLOGY.</span>
          </h2>

          {/* 5 Compact Article Rows */}
          <div className="flex flex-col space-y-3 mb-6">
            {writings.slice(0, 5).map((article, idx) => (
              <button
                key={article.id}
                onClick={() => setSelectedArticle(article)}
                className="w-full p-3.5 rounded-xl bg-white/[0.02] border border-white/[0.06] text-left flex items-center justify-between hover:border-[#F5D52F]/40 hover:bg-white/[0.04] transition-all group"
              >
                <div className="flex items-center space-x-3.5 pr-2">
                  {/* Square thumbnail placeholder / icon */}
                  <div className="w-11 h-11 rounded-lg bg-white/[0.04] border border-white/[0.08] flex-shrink-0 flex items-center justify-center font-mono text-xs text-[#F5D52F]">
                    {(idx + 1).toString().padStart(2, '0')}
                  </div>
                  <div className="flex flex-col min-w-0">
                    <span className="text-xs font-medium text-[#F2F0E8] group-hover:text-[#F5D52F] transition-colors line-clamp-2 leading-snug">
                      {article.title}
                    </span>
                    <span className="text-[10px] font-mono text-[#8A8A8A] mt-1">
                      {article.date}, 2026
                    </span>
                  </div>
                </div>
                <span className="text-xs font-mono text-[#8A8A8A] group-hover:text-[#F5D52F] group-hover:translate-x-0.5 transition-all flex-shrink-0">
                  ↗
                </span>
              </button>
            ))}
          </div>

          {/* Link to all writings */}
          <a
            href="https://singhcod3r.medium.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs font-mono text-[#F5D52F] hover:underline"
          >
            View all writings →
          </a>
        </div>
      </section>

      {/* Article Detail Modal */}
      <MobileArticleModal
        article={selectedArticle}
        onClose={() => setSelectedArticle(null)}
      />
    </>
  );
};
