import React, { useEffect, useRef, useState } from 'react';
import { X, Clock, Calendar, BookOpen, Share2, Check, ArrowLeft } from 'lucide-react';
import { Writing } from '../../data';

interface ArticleModalProps {
  article: Writing | null;
  isOpen: boolean;
  onClose: () => void;
}

export const ArticleModal: React.FC<ArticleModalProps> = ({ article, isOpen, onClose }) => {
  const contentRef = useRef<HTMLDivElement>(null);
  const [readingProgress, setReadingProgress] = useState(0);
  const [copied, setCopied] = useState(false);

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  // Track scroll progress within article modal
  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const target = e.currentTarget;
    const progress = (target.scrollTop / (target.scrollHeight - target.clientHeight)) * 100;
    setReadingProgress(Math.min(100, Math.max(0, progress)));
  };

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  if (!isOpen || !article) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md animate-fadeIn"
      onClick={onClose}
    >
      {/* Modal Dialog Card */}
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-4xl h-[92vh] flex flex-col bg-[#0b0c10] border border-zinc-800 rounded-2xl shadow-2xl overflow-hidden"
      >
        {/* Progress bar */}
        <div
          className="h-1 bg-amber-400 z-30 transition-all duration-100 ease-out"
          style={{ width: `${readingProgress}%` }}
        />

        {/* Top Sticky Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-zinc-800/80 bg-[#0d0e13]/90 backdrop-blur-md z-20 shrink-0">
          <button
            onClick={onClose}
            className="inline-flex items-center gap-2 text-xs font-mono uppercase text-zinc-400 hover:text-white transition-colors"
          >
            <ArrowLeft size={14} />
            <span>Back to Portfolio</span>
          </button>

          <div className="flex items-center gap-3">
            <button
              onClick={handleShare}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-amber-400 text-xs font-mono transition-colors"
            >
              {copied ? <Check size={12} className="text-emerald-400" /> : <Share2 size={12} />}
              <span>{copied ? 'Link Copied' : 'Share'}</span>
            </button>
            <button
              onClick={onClose}
              className="p-1.5 rounded-full bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-white transition-colors"
              aria-label="Close article modal"
            >
              <X size={16} />
            </button>
          </div>
        </div>

        {/* Scrollable Reader Body */}
        <div
          ref={contentRef}
          onScroll={handleScroll}
          className="flex-1 overflow-y-auto px-6 sm:px-12 py-8 sm:py-12 space-y-8 text-zinc-300 font-sans selection:bg-amber-500/30 selection:text-amber-200"
        >
          {/* Article Header Meta */}
          <div className="space-y-4 pb-6 border-b border-zinc-800/80">
            <div className="flex flex-wrap items-center gap-3 text-xs font-mono text-zinc-400">
              <span className="px-2.5 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 uppercase font-semibold">
                {article.category}
              </span>
              <span className="flex items-center gap-1">
                <Calendar size={13} className="text-zinc-500" />
                {article.date}
              </span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <Clock size={13} className="text-zinc-500" />
                {article.readTime}
              </span>
            </div>

            <h1 className="font-display font-black text-3xl sm:text-5xl text-white leading-tight">
              {article.title}
            </h1>

            {/* Author Byline */}
            <div className="flex items-center gap-3 pt-2">
              <div className="w-10 h-10 rounded-full overflow-hidden border border-amber-500/40 bg-zinc-900 shrink-0">
                <img
                  src="/images/hero-sequence/frame-001.webp"
                  alt="Ayush Singh"
                  className="w-full h-full object-cover scale-110"
                />
              </div>
              <div>
                <div className="font-display font-bold text-sm text-white">Ayush Singh</div>
                <div className="text-xs font-mono text-zinc-400">
                  Maintainer, The Linux Foundation / OpenPrinting
                </div>
              </div>
            </div>
          </div>

          {/* Article Essay Body */}
          <div className="space-y-6 text-base sm:text-lg leading-relaxed text-zinc-300 max-w-none">
            {/* Lead paragraph */}
            <p className="font-serif text-lg sm:text-xl text-zinc-200 leading-relaxed italic border-l-2 border-amber-400 pl-4 py-1">
              "The cost of generating code has dropped to near-zero. But the cost of verifying, debugging, and maintaining that code remains stubbornly, humanly expensive."
            </p>

            <p>
              Over the last eighteen months, the open-source software ecosystem has undergone a profound transformation. What began as enthusiastic experiments with GitHub Copilot and ChatGPT has evolved into an avalanche of autonomous pull requests, one-click agent-generated fixes, and synthetic refactors.
            </p>

            <p>
              On surface evaluation, this looks like an explosion of developer productivity. But if you sit on the receiving end of these contributions—triaging issues and reviewing patches for foundational Linux desktop utilities like <code className="text-amber-300 font-mono text-sm bg-zinc-900 px-1.5 py-0.5 rounded">system-config-printer</code>, CUPS daemons, or GLib wrappers—the reality is very different.
            </p>

            <h2 className="font-display font-extrabold text-2xl text-white pt-6">
              1. The Asymmetry of Effort
            </h2>

            <p>
              In open source, healthy contributions follow an unwritten social contract: the contributor invests time to understand the problem, tests their fix in a real environment, and presents a focused change. The maintainer reviews it, suggests polish, and merges it.
            </p>

            <p>
              Careless AI usage completely destroys this balance. An aspiring contributor pastes an issue description into a chat interface, asks an LLM to "write a PR to fix this," copy-pastes the markdown diff into a new branch, and submits a pull request.
            </p>

            <div className="p-4 rounded-xl bg-zinc-900/80 border border-zinc-800 space-y-2">
              <div className="font-mono text-xs text-amber-400 uppercase font-semibold">
                The Maintainer Equation
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
                <div className="p-3 rounded-lg bg-black/40 border border-zinc-800">
                  <span className="text-zinc-500 font-mono text-xs block">Contributor Effort</span>
                  <span className="text-white font-bold">~15 to 45 Seconds</span>
                  <p className="text-zinc-400 text-xs mt-1">Prompting an LLM and clicking "Create PR".</p>
                </div>
                <div className="p-3 rounded-lg bg-black/40 border border-zinc-800">
                  <span className="text-zinc-500 font-mono text-xs block">Maintainer Verification Time</span>
                  <span className="text-amber-400 font-bold">~30 to 60 Minutes</span>
                  <p className="text-zinc-400 text-xs mt-1">Tracing D-Bus message loops, verifying PPD edge cases, auditing memory safety.</p>
                </div>
              </div>
            </div>

            <h2 className="font-display font-extrabold text-2xl text-white pt-6">
              2. Plausible-Sounding Hallucinations in Systems Code
            </h2>

            <p>
              The most dangerous code is not code with blatant syntax errors. Compilers and linters catch syntax errors in milliseconds. The true threat is <em>syntactically pristine, semantically hallucinated code</em>.
            </p>

            <p>
              In systems engineering, APIs are heavily shaped by historic conventions, async event loops, and hardware peculiarities. We have routinely encountered PRs where an LLM:
            </p>

            <ul className="list-disc list-inside space-y-2 pl-2 text-zinc-300">
              <li>
                <strong className="text-white">Invented D-Bus signal arguments:</strong> Calling non-existent methods on system daemon interfaces that compile cleanly in Python because dynamic typing defers failure to runtime.
              </li>
              <li>
                <strong className="text-white">Bypassed thread safety locks in GTK:</strong> Directly modifying UI tree models from background worker threads, causing silent intermittent segmentation faults on Linux distributions.
              </li>
              <li>
                <strong className="text-white">Misinterpreted IEEE 1284 Device IDs:</strong> Replacing nuanced heuristic string parsers with generic regexes that broke driver resolution for hundreds of legacy HP and Epson printer models.
              </li>
            </ul>

            <h2 className="font-display font-extrabold text-2xl text-white pt-6">
              3. The Real-World Data at OpenPrinting
            </h2>

            <p>
              When analyzing pull request metrics across our repositories over the past year:
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 my-6">
              <div className="p-4 rounded-xl bg-[#0f1115] border border-zinc-800 text-center">
                <div className="font-display font-black text-3xl text-amber-400">+320%</div>
                <div className="text-xs font-mono text-zinc-400 mt-1">Surge in Inbound PR Volume</div>
              </div>
              <div className="p-4 rounded-xl bg-[#0f1115] border border-zinc-800 text-center">
                <div className="font-display font-black text-3xl text-rose-400">-45%</div>
                <div className="text-xs font-mono text-zinc-400 mt-1">Merge Acceptance Rate</div>
              </div>
              <div className="p-4 rounded-xl bg-[#0f1115] border border-zinc-800 text-center">
                <div className="font-display font-black text-3xl text-emerald-400">2.4x</div>
                <div className="text-xs font-mono text-zinc-400 mt-1">Triage Time per Volunteer</div>
              </div>
            </div>

            <p>
              Maintainer burnout in open source was already an acute crisis before AI. Adding an endless stream of synthetic PRs risks driving away the volunteer maintainers who keep our critical infrastructure alive.
            </p>

            <h2 className="font-display font-extrabold text-2xl text-white pt-6">
              4. Pragmatic Architectural Defenses
            </h2>

            <p>
              Banning AI is neither enforceable nor practical. AI tools, when used with rigor, are immense accelerators. Instead, upstream projects must establish structural guardrails:
            </p>

            <div className="space-y-3">
              <div className="p-4 rounded-xl bg-zinc-900/60 border border-zinc-800">
                <div className="font-display font-bold text-white text-base">
                  A. Mandatory Hardware / Test Reproduction Logs
                </div>
                <p className="text-xs sm:text-sm text-zinc-400 mt-1">
                  Require PR templates to include terminal output of actual test runs or headless pytest runs. If a contributor cannot provide logs showing the code running on their machine, the PR is automatically flagged for review.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-zinc-900/60 border border-zinc-800">
                <div className="font-display font-bold text-white text-base">
                  B. Automated AST & API Surface Verification
                </div>
                <p className="text-xs sm:text-sm text-zinc-400 mt-1">
                  Enhance CI pipelines to inspect D-Bus introspection XMLs and CUPS API signatures automatically, immediately rejecting PRs calling nonexistent methods before a human ever spends time reviewing.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-zinc-900/60 border border-zinc-800">
                <div className="font-display font-bold text-white text-base">
                  C. Culture of Intellectual Ownership
                </div>
                <p className="text-xs sm:text-sm text-zinc-400 mt-1">
                  Contributors should be able to explain <em>every single line</em> they submit. If you don't know why an LLM suggested a specific conditional check or flag, you do not yet understand the solution.
                </p>
              </div>
            </div>

            <h2 className="font-display font-extrabold text-2xl text-white pt-6">
              Conclusion: Code with Integrity
            </h2>

            <p>
              AI is a miraculous thinking companion, but it is not a substitute for architectural empathy. In open source, code isn't just pushed to production; it is shared, inherited, and maintained by a global commons. As engineers, our primary duty is not just to produce code faster, but to ensure that what we contribute is durable, verified, and worthy of trust.
            </p>
          </div>

          {/* Footer signature */}
          <div className="pt-8 border-t border-zinc-800/80 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-center gap-2 text-xs font-mono text-zinc-400">
              <BookOpen size={14} className="text-amber-400" />
              <span>Published by Ayush Singh • Presented at IIIT Allahabad OOSC 4.0</span>
            </div>

            <button
              onClick={onClose}
              className="px-5 py-2 rounded-full bg-amber-400 text-black text-xs font-mono font-semibold hover:bg-amber-300 transition-colors"
            >
              Done Reading
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
