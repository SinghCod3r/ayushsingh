export interface ExperienceItem {
  id: string;
  role: string;
  company: string;
  location: string;
  period: string;
  type: "Work Experience" | "Education" | "Milestone" | "Open Source";
  summary: string;
  highlights: string[];
  projects?: { name: string; description: string; tag: string }[];
  technologies: string[];
  badge: string;
  accentColor: string;
}

export const experiences: ExperienceItem[] = [
  {
    id: "acxion-consulting",
    role: "Trainee Technical Consultant",
    company: "Acxion Consulting",
    location: "Noida / Hybrid, India",
    period: "Feb 2026 — May 2026",
    type: "Work Experience",
    summary:
      "Engineered enterprise ERP workflows and 19 BC API integrations in Microsoft Dynamics 365 Business Central.",
    highlights: [
      "Architected and delivered 19 Business Central (BC) API Integrations across enterprise services.",
      "Spearheaded backend business logic and AL table schemas for the Apollo Project.",
      "Automated order processing and custom ledger sync for the Floor and Furnishing Project.",
    ],
    projects: [
      {
        name: "Apollo Project",
        description: "Enterprise system customization and AL business logic automation.",
        tag: "Enterprise ERP",
      },
      {
        name: "Floor and Furnishing Project",
        description: "Data pipelines, custom ledger sync, and automated transaction routing.",
        tag: "19 BC API Integrations",
      },
    ],
    technologies: [
      "Microsoft Dynamics 365 BC",
      "19 BC API Integrations",
      "AL Language",
      "REST APIs",
      "SQL",
    ],
    badge: "19 BC API Integrations",
    accentColor: "#00f5d4",
  },
  {
    id: "tcs-digital",
    role: "TCS Digital Candidate (Cleared via NQT 2025)",
    company: "Tata Consultancy Services (TCS)",
    location: "India",
    period: "Qualified NQT 2025",
    type: "Milestone",
    summary:
      "Qualified the premier TCS National Qualifier Test (NQT 2025) into the highest-tier TCS Digital engineering cadre (~7 LPA).",
    highlights: [
      "Cleared advanced algorithmic and data structure evaluation in TCS NQT 2025.",
      "Selected directly for the top-tier TCS Digital engineering cadre.",
      "Ranked in top competitive percentile in problem solving and systems reasoning.",
    ],
    technologies: [
      "Advanced Algorithms",
      "Data Structures",
      "Problem Solving",
      "Systems Architecture",
      "TCS NQT 2025",
    ],
    badge: "TCS Digital · NQT 2025",
    accentColor: "#38bdf8",
  },
  {
    id: "education-srmcem",
    role: "B.Tech — Computer Science & Engineering",
    company: "Shri Ramswaroop Memorial College of Engg. & Management (SRM-CEM)",
    location: "Lucknow, India (AKTU)",
    period: "2022 — 2026 (Class of 2026)",
    type: "Education",
    summary:
      "B.Tech in Computer Science & Engineering under AKTU Lucknow, graduating with an 8.6 CGPA.",
    highlights: [
      "Maintained strong cumulative academic merit of 8.6 / 10.0 CGPA.",
      "Core focus: Operating Systems, Compilers, Distributed Systems, and DBMS.",
      "Mentored peers in Linux fundamentals, systems programming, and open-source tooling.",
    ],
    technologies: [
      "Operating Systems",
      "Compilers",
      "Computer Networks",
      "Data Structures",
      "DBMS",
      "CGPA: 8.6",
    ],
    badge: "CGPA 8.6 · Class of 2026",
    accentColor: "#a855f7",
  },
  {
    id: "linux-openprinting",
    role: "Core Open Source Contributor & Maintainer",
    company: "The Linux Foundation / OpenPrinting",
    location: "Global Open Source",
    period: "2024 — Present",
    type: "Open Source",
    summary:
      "Active contributor across Linux desktop printing infrastructure, solving async concurrency issues and driverless metadata regeneration.",
    highlights: [
      "Engineered async GLib/D-Bus resolver in system-config-printer, eliminating UI thread freezes.",
      "Regenerated complete driverless printer metadata across Foomatic-DB.",
      "Merged 11+ pull requests across upstream OpenPrinting and Linux driver repositories.",
    ],
    technologies: [
      "Linux Kernel IPC",
      "Python",
      "GLib / GObject",
      "D-Bus Concurrency",
      "CUPS Architecture",
    ],
    badge: "11+ Merged Upstream PRs",
    accentColor: "#10b981",
  },
];
