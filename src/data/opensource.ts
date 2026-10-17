export interface OpenSourceProject {
  name: string;
  repo: string;
  ecosystem: string;
  role: string;
  prCount?: string;
  summary: string;
  highlightPrs?: string[];
  keyTechnologies: string[];
  collaborators?: string[];
}

export interface ArchitectureStep {
  step: number;
  label: string;
  layer: string;
  description: string;
  tech: string;
}

export const openSourceProjects: OpenSourceProject[] = [
  {
    name: "system-config-printer",
    repo: "https://github.com/OpenPrinting/system-config-printer",
    ecosystem: "Linux Foundation / OpenPrinting",
    role: "Core Contributor & Maintainer Work",
    prCount: "11+ Merged PRs",
    summary:
      "Core Linux printing manager across Ubuntu, Fedora, and Debian. Architected async driverless resolution to eliminate desktop GUI freezes.",
    highlightPrs: [
      "Async driverless PPD validation worker threads",
      "Eliminated GTK main-thread UI freeze",
      "IPP-over-USB discovery lifecycle & crash fixes",
      "PackageKit D-Bus transaction isolation",
    ],
    keyTechnologies: [
      "Linux",
      "Python",
      "GLib",
      "D-Bus",
      "CUPS",
      "IPP",
      "GTK 3",
    ],
    collaborators: ["Alexander Pevzner", "Till Kamppeter"],
  },
  {
    name: "WP Rig",
    repo: "https://github.com/wprig/wprig",
    ecosystem: "Modern Web Tooling Ecosystem",
    role: "Open Source Contributor",
    prCount: "3 Merged PRs",
    summary:
      "Modern build pipeline and performance-focused framework using modern JavaScript tooling and automated asset optimization.",
    highlightPrs: [
      "Build pipeline maintenance",
      "Asset bundling & minification",
    ],
    keyTechnologies: ["JavaScript", "Node.js", "Webpack", "Gulp"],
  },
  {
    name: "OpenPrinting Legacy Drivers",
    repo: "https://github.com/OpenPrinting",
    ecosystem: "Linux Printing Ecosystem",
    role: "Contributor",
    summary:
      "Maintained legacy printer driver bridges, metadata regeneration, and verified IPP protocol support.",
    keyTechnologies: ["CUPS", "Linux Daemons", "PPD", "XML"],
  },
];

export const driverlessFixArchitecture: ArchitectureStep[] = [
  {
    step: 1,
    label: "Main Thread Detection",
    layer: "GTK3 Event Loop",
    description: "Identified blocking CUPS IPP network calls executed directly inside the GTK main UI thread.",
    tech: "python-gi / GTK3",
  },
  {
    step: 2,
    label: "Thread Decoupling",
    layer: "Concurrency Boundary",
    description: "Decoupled synchronous device discovery from the window rendering loop into background worker threads.",
    tech: "GLib.Thread",
  },
  {
    step: 3,
    label: "Async D-Bus Query",
    layer: "System IPC Layer",
    description: "Dispatched non-blocking asynchronous calls to the OpenPrinting driverless resolution daemon.",
    tech: "Gio.DBusProxy",
  },
  {
    step: 4,
    label: "Idle Callback State",
    layer: "Event Loop Dispatcher",
    description: "Safely marshaled query results back into the UI thread using GLib idle callbacks.",
    tech: "GLib.idle_add()",
  },
  {
    step: 5,
    label: "Fallback Mitigation",
    layer: "Resilience Strategy",
    description: "Implemented graceful timeouts preventing infinite waiting when remote hardware is unreachable.",
    tech: "Timeout Protocol",
  },
  {
    step: 6,
    label: "Zero UI Latency",
    layer: "Validated Production",
    description: "Achieved continuous 60fps window responsiveness during hardware discovery. Merged upstream.",
    tech: "Upstream Release",
  },
];
