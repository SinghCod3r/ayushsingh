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
      "Core Linux desktop printing management tool installed on major Linux distributions (Ubuntu, Fedora, Debian). Architected asynchronous driverless PPD validation to eliminate UI lockups, stabilized printer discovery over IPP/DNS-SD, and refactored PackageKit/D-Bus lifecycle handling.",
    highlightPrs: [
      "Asynchronous driverless PPD validation worker threads",
      "UI responsiveness & GLib idle callback integration",
      "IPP-over-USB discovery lifecycle & crash investigation",
      "PackageKit D-Bus transaction isolation",
      "Regression test coverage for driverless printer enumeration",
      "Modern CUPS architecture compatibility updates",
    ],
    keyTechnologies: [
      "Linux",
      "Python",
      "GTK 3",
      "GLib",
      "D-Bus",
      "CUPS",
      "IPP",
      "DNS-SD",
      "PPD",
      "IPP-over-USB",
      "PackageKit",
    ],
    collaborators: ["Alexander Pevzner", "Till Kamppeter"],
  },
  {
    name: "WP Rig",
    repo: "https://github.com/wprig/wprig",
    ecosystem: "Modern Web Tooling Ecosystem",
    role: "Open Source Contributor",
    prCount: "3 Merged PRs (#890, #891, #892)",
    summary:
      "Modern build pipeline and performance-focused development framework for WordPress themes using contemporary JavaScript tooling, Gulp/Webpack pipelines, and automated asset optimization.",
    highlightPrs: ["#890 Tooling maintenance", "#891 Build pipeline enhancement", "#892 Asset optimization updates"],
    keyTechnologies: ["JavaScript", "Node.js", "Build Pipelines", "Git Workflow"],
  },
  {
    name: "OpenPrinting & Legacy Drivers",
    repo: "https://github.com/OpenPrinting",
    ecosystem: "Linux Printing Ecosystem",
    role: "Contributor",
    summary:
      "Contributions across related Linux printing repositories and legacy driver ecosystems, testing driverless printer application bridges and verifying hardware protocol support.",
    keyTechnologies: ["CUPS", "Printer Applications", "Linux Daemons", "PPD"],
  },
];

export const driverlessFixArchitecture: ArchitectureStep[] = [
  {
    step: 1,
    label: "User Initiates Discovery",
    layer: "GTK Main Thread",
    description: "User selects or configures a driverless network/USB printer in the wizard UI.",
    tech: "GTK3 / PyGObject",
  },
  {
    step: 2,
    label: "Offload from Main Event Loop",
    layer: "Async Boundary",
    description:
      "Instead of blocking the GTK main loop with network queries & PPD generation, a dedicated background worker thread is spawned.",
    tech: "Python threading / Queue",
  },
  {
    step: 3,
    label: "Background PPD Validation",
    layer: "Worker Thread",
    description:
      "Worker queries the IPP daemon, validates driverless attributes, verifies PPD integrity, and checks device capability caches.",
    tech: "IPP / CUPS / DNS-SD",
  },
  {
    step: 4,
    label: "Token-Based Freshness Verification",
    layer: "Concurrency Safety",
    description:
      "A unique transaction token ensures stale results from earlier cancelled user actions or superseded requests are discarded safely.",
    tech: "Atomic State Tokens",
  },
  {
    step: 5,
    label: "GLib Idle Callback Dispatch",
    layer: "GLib Loop",
    description:
      "Results are safely handed back to the UI thread via GLib.idle_add(), avoiding thread safety violations in GTK.",
    tech: "GLib.idle_add()",
  },
  {
    step: 6,
    label: "Wizard State Machine Resumes",
    layer: "UI State Machine",
    description:
      "The UI updates smoothly without a single dropped frame or spinner hang; next configuration step unlocks seamlessly.",
    tech: "GTK Wizard Controller",
  },
];

