import React from 'react';
import { Writing } from '../../../data';

interface MobileArticleModalProps {
  article: Writing | null;
  onClose: () => void;
}

export const MobileArticleModal: React.FC<MobileArticleModalProps> = ({ article, onClose }) => {
  if (!article) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/85 backdrop-blur-sm p-0 sm:p-4">
      <div className="relative w-full max-h-[85vh] bg-[#0c0d0e] border-t sm:border border-white/10 rounded-t-3xl sm:rounded-2xl p-6 overflow-y-auto text-[#F2F0E8] shadow-2xl">
        {/* Close Button */}
        <button
          onClick={onClose}
          aria-label="Close article preview"
          className="absolute top-5 right-5 w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-[#8A8A8A] hover:text-[#F2F0E8]"
        >
          ✕
        </button>

        {/* Header */}
        <span className="text-[10px] font-mono tracking-widest uppercase text-[#F5D52F]">
          {article.category} · {article.date}
        </span>
        <h3 className="font-editorial text-2xl tracking-wide mt-1 text-[#F2F0E8] leading-tight">
          {article.title}
        </h3>
        <p className="text-xs text-[#8A8A8A] font-mono mt-1 mb-4">
          By {article.author || 'Ayush Singh'}
        </p>

        {/* Content */}
        <div className="prose prose-invert prose-sm text-[#8A8A8A] leading-relaxed mb-6 font-sans">
          <p>{article.description}</p>
          {article.snippet && article.snippet !== article.description && (
            <p className="mt-3">{article.snippet}</p>
          )}
        </div>

        {/* Action Link */}
        <div className="pt-2">
          <a
            href={article.url || article.link}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full flex items-center justify-center py-3 rounded-xl bg-[#F5D52F] text-[#080909] font-mono text-xs font-bold hover:bg-yellow-400 transition-colors"
          >
            READ FULL ARTICLE ON MEDIUM ↗
          </a>
        </div>
      </div>
    </div>
  );
};
