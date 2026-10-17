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
      "Engineered enterprise ERP workflows and backend integrations in Microsoft Dynamics 365 Business Central (BC), delivering mission-critical integrations and resolving data pipeline latency.",
    highlights: [
      "Architected and implemented 19 Business Central (BC) API Integrations connecting enterprise systems with external services, accounting pipelines, and inventory platforms.",
      "Spearheaded technical development for the Apollo Project: backend business logic customization, AL table schemas, and automated record sync.",
      "Engineered the Floor and Furnishing Project: order processing automation, custom report generators, and production issue triage in Agile sprints.",
      "Optimized payload parsing and error recovery protocols across RESTful microservice boundaries.",
    ],
    projects: [
      {
        name: "Apollo Project",
        description: "Enterprise system customization, AL table extensions, and business logic automation.",
        tag: "Enterprise ERP",
      },
      {
        name: "Floor and Furnishing Project",
        description: "End-to-end data pipelines, custom ledger sync, and automated transaction routing.",
        tag: "19 BC API Integrations",
      },
    ],
    technologies: [
      "Microsoft Dynamics 365 BC",
      "19 BC API Integrations",
      "AL Language",
      "REST APIs",
      "ERP Data Architecture",
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
      "Cleared the premier TCS National Qualifier Test (NQT 2025) into the highest-tier TCS Digital engineering cadre (~7 LPA), ranking in the top competitive percentile nationwide.",
    highlights: [
      "Qualified the advanced algorithmic, data structure, and problem-solving evaluation of TCS NQT 2025.",
      "Selected directly for the TCS Digital engineering cadre, the highest competitive recruitment tier for emerging software engineers.",
      "Demonstrated core competencies in distributed systems, computational complexity, and modern full-stack systems engineering.",
    ],
    technologies: [
      "Advanced Algorithms",
      "Data Structures",
      "Competitive Problem Solving",
      "Systems Architecture",
      "TCS NQT 2025",
    ],
    badge: "TCS Digital · NQT 2025",
    accentColor: "#38bdf8",
  },
  {
    id: "education-srmcem",
    role: "B.Tech — Computer Science & Engineering",
    company: "Shri Ramswaroop Memorial College of Engg. & Management (SRM-CEM / SRMCM)",
    location: "Lucknow, Uttar Pradesh, India (AKTU)",
    period: "2022 — 2026 (Class of 2026)",
    type: "Education",
    summary:
      "Undergraduate engineering curriculum in Computer Science & Engineering under Dr. A.P.J. Abdul Kalam Technical University (AKTU), Lucknow. Maintained high academic merit with an 8.6 CGPA.",
    highlights: [
      "Academic Distinction: Maintained a strong cumulative CGPA of 8.6 / 10.0 across all semesters.",
      "Core Curricular Focus: Operating Systems, Computer Networks, Compiler Design, Database Management Systems, Data Structures & Algorithms, Distributed Computing.",
      "Technical Leadership: Led student open-source study groups, mentored juniors in Linux fundamentals, and built experimental compilers & developer tools.",
    ],
    technologies: [
      "Operating Systems",
      "Compilers",
      "Computer Networks",
      "Data Structures & Algorithms",
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
      "Active contributor across core Linux desktop printing infrastructure, solving upstream asynchronous concurrency issues and driverless metadata regeneration.",
    highlights: [
      "Engineered asynchronous GLib/D-Bus daemon resolver in system-config-printer, eradicating the persistent GTK thread freeze.",
      "Regenerated complete driverless printer metadata from XML repositories across Foomatic-DB.",
      "Merged 11+ pull requests across upstream OpenPrinting and Linux driver repositories.",
    ],
    technologies: [
      "Linux Kernel IPC",
      "Python",
      "GLib / GObject",
      "D-Bus Concurrency",
      "CUPS Architecture",
      "Git / Upstream",
    ],
    badge: "11+ Merged Upstream PRs",
    accentColor: "#10b981",
  },
];
