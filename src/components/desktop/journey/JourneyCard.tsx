import { forwardRef } from 'react';

export interface MilestoneItem {
  year: string;
  title: string;
  context?: string;
  highlight?: string;
  subtitle?: string;
  milestone?: string;
  description?: string;
  railLabel?: string;
}

interface JourneyCardProps {
  item: MilestoneItem;
  index: number;
  total: number;
  accentColor: string;
  isActive?: boolean;
}

export const JourneyCard = forwardRef<HTMLDivElement, JourneyCardProps>(
  ({ item, index, total, accentColor, isActive = false }, ref) => {
    const contextText = item.context || item.subtitle || '';
    const highlightText = item.highlight || item.milestone || '';

    return (
      <div
        ref={ref}
        data-year={item.year}
        className={`journey-card relative shrink-0 rounded-2xl bg-[#0c0e14]/90 border p-6 sm:p-7 flex flex-col justify-between transition-all duration-300 overflow-hidden select-none will-change-transform w-[88vw] sm:w-[350px] md:w-[380px] lg:w-[420px] max-w-[440px] h-[220px] sm:h-[230px] md:h-[240px] shadow-[0_12px_32px_rgba(0,0,0,0.6)] backdrop-blur-sm ${
          isActive
            ? 'border-amber-400/50 shadow-[0_12px_40px_rgba(245,158,11,0.12)] ring-1 ring-amber-400/20'
            : 'border-zinc-800/80 hover:border-zinc-700/80'
        }`}
        style={{
          transformOrigin: '50% 50%',
        }}
      >
        {/* Subtle accent corner glow */}
        <div
          className="absolute -top-12 -right-12 w-28 h-28 rounded-full blur-2xl pointer-events-none transition-opacity duration-500"
          style={{
            backgroundColor: accentColor,
            opacity: isActive ? 0.25 : 0.08,
          }}
        />

        {/* Top Active Indicator Line */}
        <div
          className="absolute top-0 left-0 right-0 h-[2px] transition-all duration-500"
          style={{
            background: isActive
              ? `linear-gradient(90deg, transparent, ${accentColor}, transparent)`
              : 'transparent',
          }}
        />

        {/* 1. YEAR (Largest) */}
        <div className="flex items-start justify-between">
          <div className="journey-card-year transition-transform duration-300">
            <span className="font-display font-black text-3xl sm:text-4xl lg:text-[40px] tracking-tight leading-none text-white uppercase">
              {item.year}
            </span>
          </div>

          <div className="flex items-center gap-1.5 text-[10px] font-mono uppercase tracking-widest text-zinc-500 pt-1">
            <span>0{index + 1}</span>
            <span>/</span>
            <span>0{total}</span>
            <span
              className={`w-1.5 h-1.5 rounded-full transition-opacity duration-300 ml-0.5 ${
                isActive ? 'opacity-100' : 'opacity-40'
              }`}
              style={{ backgroundColor: accentColor }}
            />
          </div>
        </div>

        {/* 2. TITLE & ONE-LINE CONTEXT */}
        <div className="space-y-1 my-auto">
          <h3 className="journey-card-title font-display font-bold text-lg sm:text-xl text-zinc-100 tracking-tight leading-snug uppercase">
            {item.title}
          </h3>

          {contextText && (
            <p className="journey-card-context text-xs sm:text-sm font-sans text-zinc-400 leading-normal">
              {contextText}
            </p>
          )}
        </div>

        {/* 3. ONE COMPACT HIGHLIGHT (Smallest) */}
        {highlightText && (
          <div className="pt-2 border-t border-zinc-800/60 flex items-center justify-between">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-zinc-900/90 border border-zinc-800/80 text-[11px] font-mono font-medium text-zinc-300">
              <span
                className="w-1.5 h-1.5 rounded-full"
                style={{ backgroundColor: accentColor }}
              />
              <span>{highlightText}</span>
            </div>

            <span
              className="text-[10px] font-mono tracking-wider transition-opacity duration-300 uppercase"
              style={{
                color: accentColor,
                opacity: isActive ? 0.9 : 0.4,
              }}
            >
              {isActive ? 'ACTIVE' : `PHASE 0${index + 1}`}
            </span>
          </div>
        )}
      </div>
    );
  }
);

JourneyCard.displayName = 'JourneyCard';
