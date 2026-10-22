import React from 'react';

// Skiper UI skiper104 inspired custom milestone SVGs
// Attribution: Interaction model inspired by Skiper UI (skiper104: Scroll reveal grid cards)

export const LearningTreeSVG: React.FC<{ className?: string }> = ({ className = '' }) => (
  <svg
    viewBox="0 0 160 80"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={`w-full max-w-[140px] h-auto overflow-visible ${className}`}
  >
    {/* Root to branch paths */}
    <path
      d="M 15 40 H 45 C 55 40 60 22 75 22 H 115"
      stroke="#f59e0b"
      strokeWidth="2"
      strokeLinecap="round"
      className="journey-svg-path transition-all duration-700"
    />
    <path
      d="M 45 40 H 135"
      stroke="#f59e0b"
      strokeWidth="2"
      strokeLinecap="round"
      className="journey-svg-path transition-all duration-700"
    />
    <path
      d="M 45 40 C 55 40 60 58 75 58 H 115"
      stroke="#f59e0b"
      strokeWidth="2"
      strokeLinecap="round"
      className="journey-svg-path transition-all duration-700"
    />

    {/* Subsystem nodes */}
    <circle cx="15" cy="40" r="4" fill="#f59e0b" className="animate-pulse" />
    <circle cx="45" cy="40" r="3" fill="#f59e0b" />
    <circle cx="75" cy="22" r="3" fill="#f59e0b" />
    <circle cx="115" cy="22" r="3" fill="#f59e0b" />
    <circle cx="135" cy="40" r="3.5" fill="#f59e0b" />
    <circle cx="75" cy="58" r="3" fill="#f59e0b" />
    <circle cx="115" cy="58" r="3" fill="#f59e0b" />

    {/* Architecture labels */}
    <text x="120" y="20" fill="#a1a1aa" fontSize="8" fontFamily="monospace">
      OS/COMPILERS
    </text>
    <text x="140" y="43" fill="#a1a1aa" fontSize="8" fontFamily="monospace">
      DATA STRUCTURES
    </text>
    <text x="120" y="66" fill="#a1a1aa" fontSize="8" fontFamily="monospace">
      NETWORKS
    </text>
  </svg>
);

export const GitBranchSVG: React.FC<{ className?: string }> = ({ className = '' }) => (
  <svg
    viewBox="0 0 160 80"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={`w-full max-w-[140px] h-auto overflow-visible ${className}`}
  >
    {/* Main trunk */}
    <path
      d="M 15 50 H 145"
      stroke="#38bdf8"
      strokeWidth="2"
      strokeLinecap="round"
      className="journey-svg-path transition-all duration-700"
    />

    {/* Feature branch & merge */}
    <path
      d="M 40 50 C 50 50 55 24 70 24 H 105 C 120 24 125 50 135 50"
      stroke="#38bdf8"
      strokeWidth="2"
      strokeLinecap="round"
      className="journey-svg-path transition-all duration-700"
    />

    {/* Commit nodes */}
    <circle cx="15" cy="50" r="3.5" fill="#38bdf8" />
    <circle cx="40" cy="50" r="4" fill="#38bdf8" />
    <circle cx="75" cy="24" r="3.5" fill="#38bdf8" />
    <circle cx="105" cy="24" r="3.5" fill="#38bdf8" />
    <circle cx="90" cy="50" r="3.5" fill="#38bdf8" />
    <circle cx="135" cy="50" r="4.5" fill="#38bdf8" className="animate-pulse" />

    {/* Labels */}
    <text x="70" y="16" fill="#71717a" fontSize="8" fontFamily="monospace">
      feat/ezy-ast
    </text>
    <text x="95" y="65" fill="#71717a" fontSize="8" fontFamily="monospace">
      upstream/main
    </text>
  </svg>
);

export const SystemPipelineSVG: React.FC<{ className?: string }> = ({ className = '' }) => (
  <svg
    viewBox="0 0 160 80"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={`w-full max-w-[140px] h-auto overflow-visible ${className}`}
  >
    {/* Pipeline channels */}
    <path
      d="M 15 40 H 50 C 60 40 65 24 80 24 H 105 C 115 24 120 40 130 40 H 145"
      stroke="#ff5e1a"
      strokeWidth="2"
      strokeLinecap="round"
      className="journey-svg-path transition-all duration-700"
    />
    <path
      d="M 50 40 C 60 40 65 56 80 56 H 105 C 115 56 120 40 130 40"
      stroke="#ff5e1a"
      strokeWidth="2"
      strokeLinecap="round"
      className="journey-svg-path transition-all duration-700"
    />

    {/* D-Bus & CUPS filter nodes */}
    <rect x="38" y="32" width="16" height="16" rx="3" fill="#181a20" stroke="#ff5e1a" strokeWidth="1.5" />
    <rect x="80" y="16" width="16" height="16" rx="3" fill="#181a20" stroke="#ff5e1a" strokeWidth="1.5" />
    <rect x="80" y="48" width="16" height="16" rx="3" fill="#181a20" stroke="#ff5e1a" strokeWidth="1.5" />
    <circle cx="145" cy="40" r="4" fill="#ff5e1a" className="animate-pulse" />

    {/* Stream labels */}
    <text x="36" y="24" fill="#a1a1aa" fontSize="7" fontFamily="monospace">
      D-BUS IPC
    </text>
    <text x="100" y="12" fill="#a1a1aa" fontSize="7" fontFamily="monospace">
      ASYNC GLIB
    </text>
    <text x="100" y="74" fill="#a1a1aa" fontSize="7" fontFamily="monospace">
      IPP DRIVERLESS
    </text>
  </svg>
);

export const SignalBroadcasterSVG: React.FC<{ className?: string }> = ({ className = '' }) => (
  <svg
    viewBox="0 0 160 80"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={`w-full max-w-[140px] h-auto overflow-visible ${className}`}
  >
    {/* Source signal node */}
    <circle cx="25" cy="40" r="5" fill="#10b981" className="animate-pulse" />
    <line x1="25" y1="40" x2="25" y2="65" stroke="#10b981" strokeWidth="2" />
    <line x1="15" y1="65" x2="35" y2="65" stroke="#10b981" strokeWidth="2" />

    {/* Expanding keynote broadcast waves */}
    <path
      d="M 45 28 A 20 20 0 0 1 45 52"
      stroke="#10b981"
      strokeWidth="2"
      strokeLinecap="round"
      className="journey-svg-path transition-all duration-700"
    />
    <path
      d="M 65 18 A 38 38 0 0 1 65 62"
      stroke="#10b981"
      strokeWidth="2"
      strokeLinecap="round"
      className="journey-svg-path transition-all duration-700"
    />
    <path
      d="M 85 8 A 56 56 0 0 1 85 72"
      stroke="#10b981"
      strokeWidth="2"
      strokeLinecap="round"
      className="journey-svg-path transition-all duration-700"
    />

    {/* Conference & Systems target nodes */}
    <circle cx="115" cy="24" r="3" fill="#10b981" />
    <circle cx="135" cy="40" r="3.5" fill="#10b981" />
    <circle cx="115" cy="56" r="3" fill="#10b981" />

    <text x="100" y="14" fill="#a1a1aa" fontSize="7" fontFamily="monospace">
      OOSC 4.0
    </text>
    <text x="120" y="74" fill="#a1a1aa" fontSize="7" fontFamily="monospace">
      PSR LAUNCH
    </text>
  </svg>
);

