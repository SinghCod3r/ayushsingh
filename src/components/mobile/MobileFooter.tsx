import React from 'react';

export const MobileFooter: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="w-full py-10 px-6 bg-[#080909] text-[#F2F0E8] border-t border-white/[0.06] flex flex-col items-center text-center">
      {/* Massive Outline Brand Typography */}
      <div className="w-full overflow-hidden select-none mb-6">
        <span className="font-editorial text-[18vw] leading-none text-outline opacity-30 tracking-tight block">
          SINGHCODER
        </span>
      </div>

      <div className="flex flex-col items-center space-y-4">
        {/* Back to top button */}
        <button
          onClick={scrollToTop}
          className="px-4 py-2 rounded-full border border-white/10 font-mono text-xs text-[#8A8A8A] hover:border-[#F5D52F] hover:text-[#F5D52F] transition-colors"
        >
          BACK TO TOP ↑
        </button>

        <p className="text-[10px] font-mono text-[#8A8A8A] uppercase tracking-wider">
          © {new Date().getFullYear()} Ayush Singh · All rights reserved
        </p>
      </div>
    </footer>
  );
};
