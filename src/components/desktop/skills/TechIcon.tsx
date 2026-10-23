import React from 'react';
import {
  SiPython,
  SiTypescript,
  SiJavascript,
  SiCplusplus,
  SiReact,
  SiNextdotjs,
  SiTailwindcss,
  SiHtml5,
  SiNodedotjs,
  SiFastapi,
  SiExpress,
  SiFlask,
  SiMongodb,
  SiPostgresql,
  SiSqlite,
  SiLinux,
  SiGtk,
  SiDocker,
  SiGit,
  SiGithub,
} from 'react-icons/si';
import { FaAws, FaJava } from 'react-icons/fa';

// Custom clean SVG for CUPS / IPP (Printer & Protocol)
export const CupsIcon: React.FC<{ className?: string }> = ({ className = 'w-6 h-6' }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    aria-label="CUPS IPP"
  >
    <path d="M6 9V2h12v7" />
    <path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2" />
    <rect x="6" y="14" width="12" height="8" rx="1" />
    <circle cx="18" cy="13" r="1.5" fill="currentColor" />
  </svg>
);

// Custom clean SVG for D-Bus IPC (System IPC & Signal Bus)
export const DbusIcon: React.FC<{ className?: string }> = ({ className = 'w-6 h-6' }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    aria-label="D-Bus IPC"
  >
    <circle cx="5" cy="6" r="2.5" />
    <circle cx="19" cy="6" r="2.5" />
    <circle cx="5" cy="18" r="2.5" />
    <circle cx="19" cy="18" r="2.5" />
    <line x1="7.5" y1="6" x2="16.5" y2="6" />
    <line x1="5" y1="8.5" x2="5" y2="15.5" />
    <line x1="19" y1="8.5" x2="19" y2="15.5" />
    <line x1="7.5" y1="18" x2="16.5" y2="18" />
    <circle cx="12" cy="12" r="1.5" fill="currentColor" />
  </svg>
);

const ICON_MAP: Record<string, React.ComponentType<{ className?: string }>> = {
  SiPython,
  SiTypescript,
  SiJavascript,
  SiCplusplus,
  FaJava,
  SiReact,
  SiNextdotjs,
  SiTailwindcss,
  SiHtml5,
  SiNodedotjs,
  SiFastapi,
  SiExpress,
  SiFlask,
  SiMongodb,
  SiPostgresql,
  SiSqlite,
  SiLinux,
  SiGtk,
  CupsIcon,
  DbusIcon,
  SiDocker,
  SiGit,
  SiGithub,
  FaAws,
};

interface TechIconProps {
  iconKey: string;
  className?: string;
  style?: React.CSSProperties;
}

export const TechIcon: React.FC<TechIconProps> = ({ iconKey, className = 'w-6 h-6', style }) => {
  const IconComponent = ICON_MAP[iconKey] || SiPython;
  return (
    <span className="inline-flex items-center justify-center shrink-0" style={style}>
      <IconComponent className={className} />
    </span>
  );
};

