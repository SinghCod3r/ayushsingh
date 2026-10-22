export interface Project {
  id: string;
  number: string;
  title: string;
  subtitle: string;
  description: string;
  tags: string[];
  image: string;
  secondaryImage?: string;
  github?: string;
  live?: string;
  year?: string;
  category?: string;
  featured?: boolean;
  deepDive?: {
    problem: string;
    idea: string;
    howItWorks: string;
    technology: string;
    whatILearned: string;
  };
}

export interface Writing {
  id: string;
  number: string;
  title: string;
  shortTitle?: string;
  date: string;
  author: string;
  description: string;
  url: string;
  category?: string;
  image?: string;
  snippet?: string;
  link?: string;
  readTime?: string;
  featured?: boolean;
}

export interface Conference {
  title: string;
  event: string;
  institution: string;
  date: string;
  location: string;
  summary: string;
  badge: string;
  link?: string;
}

export interface OpenSourceContribution {
  repo: string;
  organization: string;
  role: string;
  period: string;
  description: string;
  highlights: string[];
  prList: {
    pr: string;
    status: 'merged' | 'open';
    title: string;
    tag?: string;
  }[];
}

export type TechCategory = 'all' | 'languages' | 'frontend' | 'backend' | 'systems' | 'tools' | 'cloud';

export interface Technology {
  id: string;
  name: string;
  category: 'languages' | 'frontend' | 'backend' | 'systems' | 'tools' | 'cloud';
  iconKey: string;
  color: string;
  tagline?: string;
  featured?: boolean;
}

export const portfolioData = {
  personal: {
    name: "Ayush Singh",
    firstName: "AYUSH",
    lastName: "SINGH",
    role: "Software Engineer",
    subRoles: ["Open Source Maintainer", "Systems & Linux Engineer", "Builder"],
    tagline: "Software Engineer & Open Source Maintainer building reliable Linux systems, developer tooling, and intelligent web applications.",
    location: "Lucknow, India",
    bio: "Software engineer focused on Linux and upstream open source, with hands-on maintainer experience in The Linux Foundation’s OpenPrinting ecosystem. Builds Python tooling, debugs Linux desktop/system software, and collaborates with upstream maintainers across distributed codebases.",
    stats: [
      { label: "Merged PRs", value: "25+" },
      { label: "Upstream Ecosystems", value: "3+" },
      { label: "College CGPA", value: "8.62" },
      { label: "Keynote Talks", value: "IIIT Allahabad" }
    ],
    socials: {
      github: "https://github.com/SinghCod3r",
      linkedin: "https://linkedin.com/in/singhcod3r",
      portfolio: "https://singhcod3r.github.io",
      email: "ayushsinghceee@gmail.com",
      resume: "/Resume/Ayush_Singh.pdf",
    }
  },

  journey: [
    {
      year: "2022",
      railLabel: "2022",
      title: "Computer Science",
      context: "SRMCEM, Lucknow",
      highlight: "B.Tech CSE · CGPA 8.62",
      subtitle: "SRMCEM, Lucknow",
      milestone: "B.Tech CSE · CGPA 8.62",
      description: "B.Tech in Computer Science & Engineering",
    },
    {
      year: "2024",
      railLabel: "2024",
      title: "Open Source Begins",
      context: "First upstream contributions",
      highlight: "Ezy · Open Source",
      subtitle: "First upstream contributions",
      milestone: "Ezy · Open Source",
      description: "First upstream contributions",
    },
    {
      year: "Feb–May 2026",
      railLabel: "Acxiom",
      title: "Trainee Technical Consultant",
      context: "Acxiom Consulting",
      highlight: "Enterprise REST APIs",
      subtitle: "Acxiom Consulting",
      milestone: "Enterprise REST APIs",
      description: "Enterprise REST APIs",
    },
    {
      year: "2025–2026",
      railLabel: "OpenPrinting",
      title: "OpenPrinting",
      context: "The Linux Foundation",
      highlight: "Maintainer",
      subtitle: "The Linux Foundation",
      milestone: "Maintainer",
      description: "The Linux Foundation maintainer",
    },
    {
      year: "2026",
      railLabel: "2026",
      title: "Keynote Speaker",
      context: "IIIT Allahabad · OOSC 4.0",
      highlight: "AI Overload",
      subtitle: "IIIT Allahabad · OOSC 4.0",
      milestone: "AI Overload",
      description: "Invited keynote talk on AI Overload at OOSC 4.0",
    },
  ],

  openSource: {
    title: "OPEN SOURCE",
    subtitle: "Contributing to a more open, accessible and resilient Linux printing ecosystem.",
    organization: "The Linux Foundation / OpenPrinting",
    role: "Maintainer & Open Source Engineer",
    period: "Jul 2025 – Present",
    repos: ["system-config-printer", "go-mfp", "foomatic-db", "legacy-drivers"],
    githubUrl: "https://github.com/OpenPrinting/system-config-printer",
    stats: [
      { label: "Organization", value: "Linux Foundation" },
      { label: "Core Repos", value: "4 Repositories" },
      { label: "Key Milestone", value: "Non-blocking GTK UI" },
      { label: "Focus", value: "CUPS, IPP, D-Bus, GTK" }
    ],
    prs: [
      { pr: "#455", status: "merged" as const, title: "Fix PPD detection & catalog freeze", tag: "cups" },
      { pr: "#460", status: "merged" as const, title: "Improve driver detection & IPP-over-USB", tag: "usb" },
      { pr: "#463", status: "merged" as const, title: "Add new printer model & URI normalization", tag: "dns-sd" },
      { pr: "#469", status: "merged" as const, title: "Refactor backend logic to async worker threads", tag: "concurrency" },
      { pr: "#471", status: "merged" as const, title: "Fix IPP connection bug & nil-backend check", tag: "go-mfp" },
      { pr: "#478", status: "merged" as const, title: "Update documentation & LAN regression suite", tag: "testing" },
    ],
    highlights: [
      "Delayed device presentation until DNS-SD discovery completes; corrected IPP-over-USB classification so locally connected printers are no longer misreported as network devices.",
      "Reworked driver-loading paths to keep the GTK main loop unblocked using GLib idle callbacks and worker-thread execution, directly pairing with upstream maintainer Alexander Pevzner.",
      "Maintained legacy driver metadata, corrected broken upstream references in the Foomatic XML database, and built lookup tooling for foomatic-lookup-site.",
      "Additional upstream merged work in WP Rig (#890, #891, #892) and Medic / CHT (cht-core, cht-conf)."
    ]
  },

  skills: {
    editorialNote: "A STACK BUILT THROUGH OPEN SOURCE + PRODUCT WORK.",
    categories: [
      { id: "all", label: "ALL" },
      { id: "languages", label: "LANGUAGES" },
      { id: "frontend", label: "FRONTEND" },
      { id: "backend", label: "BACKEND" },
      { id: "systems", label: "SYSTEMS" },
      { id: "tools", label: "TOOLS" },
      { id: "cloud", label: "CLOUD" },
    ],
    technologies: [
      // Languages
      { id: "python", name: "Python", category: "languages" as const, iconKey: "SiPython", color: "#38bdf8", featured: true, tagline: "Open source, tooling & automation" },
      { id: "typescript", name: "TypeScript", category: "languages" as const, iconKey: "SiTypescript", color: "#3178c6", featured: true, tagline: "Type-safe modern full-stack" },
      { id: "javascript", name: "JavaScript", category: "languages" as const, iconKey: "SiJavascript", color: "#f7df1e", tagline: "ES6+, event loop & web APIs" },
      { id: "c-cpp", name: "C / C++", category: "languages" as const, iconKey: "SiCplusplus", color: "#659ad2", tagline: "POSIX, raster filters & low-level drivers" },
      { id: "java", name: "Java", category: "languages" as const, iconKey: "FaJava", color: "#f89820", tagline: "Object-oriented core & algorithms" },
      { id: "sql", name: "SQL", category: "languages" as const, iconKey: "SiPostgresql", color: "#4169e1", tagline: "Relational queries, joins & indexing" },

      // Frontend
      { id: "react", name: "React", category: "frontend" as const, iconKey: "SiReact", color: "#61dafb", featured: true, tagline: "Component architecture, hooks & GSAP" },
      { id: "nextjs", name: "Next.js", category: "frontend" as const, iconKey: "SiNextdotjs", color: "#ffffff", featured: true, tagline: "App Router, SSR & edge routes" },
      { id: "tailwind", name: "Tailwind CSS", category: "frontend" as const, iconKey: "SiTailwindcss", color: "#38bdf8", tagline: "Utility design systems & tokens" },
      { id: "html-canvas", name: "HTML5 Canvas", category: "frontend" as const, iconKey: "SiHtml5", color: "#e34f26", tagline: "2D rendering & 192-frame motion" },

      // Backend
      { id: "nodejs", name: "Node.js", category: "backend" as const, iconKey: "SiNodedotjs", color: "#5fa04e", featured: true, tagline: "Asynchronous runtime & CLI tooling" },
      { id: "fastapi", name: "FastAPI", category: "backend" as const, iconKey: "SiFastapi", color: "#05998b", tagline: "High-throughput async Python APIs" },
      { id: "express", name: "Express", category: "backend" as const, iconKey: "SiExpress", color: "#ffffff", tagline: "REST services & middleware" },
      { id: "flask", name: "Flask", category: "backend" as const, iconKey: "SiFlask", color: "#ffffff", tagline: "Lightweight Python microservices" },
      { id: "mongodb", name: "MongoDB", category: "backend" as const, iconKey: "SiMongodb", color: "#47a248", tagline: "Document stores & schema design" },
      { id: "postgresql", name: "PostgreSQL", category: "backend" as const, iconKey: "SiPostgresql", color: "#4169e1", tagline: "Production relational databases" },
      { id: "sqlite", name: "SQLite", category: "backend" as const, iconKey: "SiSqlite", color: "#003b57", tagline: "High-speed indexed local caching" },

      // Systems
      { id: "linux", name: "Linux", category: "systems" as const, iconKey: "SiLinux", color: "#fcc624", featured: true, tagline: "Kernel, systemd, desktop & packaging" },
      { id: "gtk", name: "GTK", category: "systems" as const, iconKey: "SiGtk", color: "#e11d48", tagline: "PyGObject, GLib idle loops & UI" },
      { id: "cups", name: "CUPS / IPP", category: "systems" as const, iconKey: "CupsIcon", color: "#10b981", tagline: "OpenPrinting ecosystem maintainer" },
      { id: "dbus", name: "D-Bus IPC", category: "systems" as const, iconKey: "DbusIcon", color: "#f59e0b", tagline: "Asynchronous system signals & RPC" },

      // Tools
      { id: "docker", name: "Docker", category: "tools" as const, iconKey: "SiDocker", color: "#2496ed", tagline: "Linux containers & reproducible builds" },
      { id: "git", name: "Git", category: "tools" as const, iconKey: "SiGit", color: "#f05032", tagline: "Distributed version control & rebase" },
      { id: "github", name: "GitHub", category: "tools" as const, iconKey: "SiGithub", color: "#ffffff", tagline: "Upstream collaboration & Actions CI/CD" },

      // Cloud
      { id: "aws", name: "AWS", category: "cloud" as const, iconKey: "FaAws", color: "#ff9900", tagline: "Cloud infrastructure, S3 & compute" },
    ],
  },

  projects: [
    {
      id: "moodbite-ai",
      number: "01",
      title: "MoodBite AI",
      subtitle: "Mood-based Food Recommendation Engine",
      description: "An AI-powered culinary companion that translates human emotional states into tailored recipes, restaurants, and cooking inspiration.",
      tags: ["Next.js", "Python", "FastAPI", "Tailwind CSS", "AI / LLM"],
      image: "/images/project-screenshots/moodbite_landing_page.png",
      secondaryImage: "/images/project-screenshots/moodbite_example.png",
      github: "https://github.com/SinghCod3r",
      live: "https://moodbite.vercel.app",
      year: "2026",
      category: "AI / Next.js / Python",
      deepDive: {
        problem: "When people are fatigued, stressed, or craving comfort, decision fatigue around what to eat causes paralysis.",
        idea: "Replace traditional rigid search filters with an intuitive mood conversational dial that understands psychological cravings.",
        howItWorks: "Uses sentiment analysis and prompt routing to map emotional nuances to flavor profiles, prep times, and local culinary availability.",
        technology: "Next.js 14 App Router, FastAPI asynchronous backend, vector prompt embeddings, and responsive Tailwind UI.",
        whatILearned: "Engineering low-latency streaming responses and maintaining state across multi-turn dietary preference evaluations."
      }
    },
    {
      id: "printer-support-resolver",
      number: "02",
      title: "Printer Support Resolver (PSR)",
      subtitle: "High-Performance Linux Driver Resolution Tool",
      description: "Linux-native Python tool for fast printer support and driver resolution; parses local PPD files into a SQLite index and resolves support via IEEE 1284 Device IDs.",
      tags: ["Python", "SQLite", "CUPS / PPD", "Linux Systems"],
      image: "/images/project-screenshots/psr.png",
      github: "https://github.com/SinghCod3r/printer-support-resolver",
      year: "2026",
      category: "Linux Systems Tooling",
      deepDive: {
        problem: "Legacy printer driver resolution on Linux relied on slow synchronous PPD disk scans and outdated PackageKit/Jockey dependencies.",
        idea: "A lightning-fast 5-stage decoupled pipeline separating resolution from provisioning with SQLite indexed metadata.",
        howItWorks: "Parses local PPDs into a cached SQLite index, parses IEEE 1284 device IDs, analyzes support gaps, and ranks drivers using system-config-printer semantics.",
        technology: "Python 3.11, SQLite indexed full-text search, CUPS API bindings, automated pytest benchmarking.",
        whatILearned: "Deep architecture of CUPS raster filters, PPD specifications, and optimizing multi-thousand-file disk scans into sub-50ms queries."
      }
    },
    {
      id: "ezy-language",
      number: "03",
      title: "Ezy Scripting Language",
      subtitle: "Deterministic Interpreter & Automation Runtime",
      description: "A custom scripting language and interpreter written from scratch in Python, featuring indentation-aware grammar, recursive descent parser, and first-class automation primitives.",
      tags: ["Python", "Compiler Design", "AST", "CLI Tooling"],
      image: "/images/project-screenshots/ezy_page_image.png",
      github: "https://github.com/SinghCod3r/ezy",
      live: "https://singhcod3r.github.io/ezy",
      year: "2025",
      category: "Compiler & Interpreter Design",
      deepDive: {
        problem: "Writing reproducible, cross-platform system automation scripts often incurs bloated runtime overhead or inconsistent bash behavior.",
        idea: "Create an expressive, readable language with clean syntax and built-in process orchestration, HTTP requests, and JSON parsing.",
        howItWorks: "Lexer generates token streams handling indent/dedent blocks; recursive descent parser builds AST; tree-walking interpreter evaluates lexical scopes.",
        technology: "Pure Python, zero external parser dependencies, comprehensive test suite with 100+ unit and integration tests.",
        whatILearned: "Lexical scope chaining, environment closures, custom error stack unwinding, and designing developer-friendly REPLs."
      }
    },
    {
      id: "aura-ai",
      number: "04",
      title: "Aura.AI",
      subtitle: "Intelligent Workflow & Knowledge Workspace",
      description: "Modern productivity and task orchestration interface utilizing natural language context to streamline multi-step developer operations.",
      tags: ["React", "TypeScript", "Tailwind CSS", "FastAPI"],
      image: "/images/project-screenshots/Aurai_landing.png",
      secondaryImage: "/images/project-screenshots/auraai_second_page.png",
      github: "https://github.com/SinghCod3r",
      year: "2025",
      category: "Developer Productivity Workspace",
      deepDive: {
        problem: "Fragmented knowledge tools force builders to constantly context-switch across terminals, docs, and project trackers.",
        idea: "A unified canvas with AI copilot capabilities tailored for software and system engineering workflows.",
        howItWorks: "Combines real-time markdown rendering, reactive task graph trees, and contextual prompt helpers.",
        technology: "React, TypeScript, Tailwind CSS, WebSockets for live sync, and FastAPI endpoints.",
        whatILearned: "Optimizing DOM reflows during streaming token renders and architecting intuitive keyboard-first interfaces."
      }
    },
    {
      id: "system-config-printer",
      number: "05",
      title: "system-config-printer Upstream",
      subtitle: "The Linux Foundation Official Print Management UI",
      description: "Core print administration utility standard across Ubuntu, Fedora, Debian, and major Linux distributions for CUPS queue management.",
      tags: ["Python", "GTK 3", "GLib", "D-Bus", "CUPS"],
      image: "/images/project-screenshots/system-config-printer_preview1.png",
      secondaryImage: "/images/project-screenshots/system-config-printer-preview2.png",
      github: "https://github.com/OpenPrinting/system-config-printer",
      year: "2024–2026",
      category: "Linux Foundation / Core Upstream",
      featured: true,
      deepDive: {
        problem: "Users experienced UI lockups during network discovery and printer queue installation due to blocking synchronous I/O.",
        idea: "Decouple device probing and PPD catalog downloads from the GTK main loop using worker threads and GLib idle callbacks.",
        howItWorks: "Asynchronous D-Bus signals, background thread execution, and safe queue updating in the GTK thread context.",
        technology: "Python, PyGObject, GLib, GTK 3, D-Bus system bus, CUPS client library.",
        whatILearned: "Navigating large multi-decade C/Python hybrid codebases and safely managing thread safety in GTK."
      }
    }
  ],

  writings: [
    {
      id: "ai-agents-containing-them",
      number: "01",
      title: "AI Agents Are Getting More Powerful. The Next Big Problem Is Containing Them",
      shortTitle: "AI AGENTS ARE GETTING MORE POWERFUL",
      date: "Sep 30",
      author: "Ayush Singh",
      description: "For years, we asked AI to write code.",
      url: "https://singhcod3r.medium.com/ai-agents-are-getting-more-powerful-the-next-big-problem-is-containing-them-18c318ebbd29",
      category: "AI & Security",
      link: "https://singhcod3r.medium.com/ai-agents-are-getting-more-powerful-the-next-big-problem-is-containing-them-18c318ebbd29",
      snippet: "For years, we asked AI to write code.",
      featured: true,
    },
    {
      id: "almost-quit-open-source",
      number: "02",
      title: "I Almost Quit Open Source After GSoC 2026 — Then system-config-printer Changed Everything",
      shortTitle: "I ALMOST QUIT OPEN SOURCE",
      date: "Aug 24",
      author: "Ayush Singh",
      description: "How learning Python, finding great mentors, and one Linux project changed the way I think about software engineering.",
      url: "https://singhcod3r.medium.com/i-almost-quit-open-source-after-gsoc-2026-then-system-config-printer-changed-everything-49ff8c2707d1",
      category: "Open Source & Systems",
      link: "https://singhcod3r.medium.com/i-almost-quit-open-source-after-gsoc-2026-then-system-config-printer-changed-everything-49ff8c2707d1",
      snippet: "How learning Python, finding great mentors, and one Linux project changed the way I think about software engineering.",
    },
    {
      id: "fixing-dead-upstream-url",
      number: "03",
      title: "Fixing a Dead Upstream URL in OpenPrinting: A Small but Important Contribution",
      shortTitle: "FIXING A DEAD UPSTREAM URL",
      date: "Aug 24",
      author: "Ayush Singh",
      description: "Fixing a dead upstream URL in OpenPrinting.",
      url: "https://singhcod3r.medium.com/fixing-a-dead-upstream-url-in-openprinting-a-small-but-important-contribution-e07f94526d09",
      category: "OpenPrinting",
      link: "https://singhcod3r.medium.com/fixing-a-dead-upstream-url-in-openprinting-a-small-but-important-contribution-e07f94526d09",
      snippet: "Fixing a dead upstream URL in OpenPrinting.",
    },
    {
      id: "pr-openprinting-splix",
      number: "04",
      title: "My Pull Request to OpenPrinting Got Merged: Fixing SpliX Driver Metadata",
      shortTitle: "MY PULL REQUEST TO OPENPRINTING GOT MERGED",
      date: "Dec 14, 2025",
      author: "Ayush Singh",
      description: "My Pull Request to OpenPrinting Got Merged: Fixing SpliX Driver Metadata",
      url: "https://singhcod3r.medium.com/my-pull-request-to-openprinting-got-merged-fixing-splix-driver-metadata-23558cb44dfc",
      category: "Linux Drivers",
      link: "https://singhcod3r.medium.com/my-pull-request-to-openprinting-got-merged-fixing-splix-driver-metadata-23558cb44dfc",
      snippet: "My Pull Request to OpenPrinting Got Merged: Fixing SpliX Driver Metadata",
    },
    {
      id: "first-pr-foomatic-db",
      number: "05",
      title: "My First Merged Pull Request: Regenerating Printer Data from Foomatic-DB",
      shortTitle: "MY FIRST MERGED PULL REQUEST",
      date: "Dec 14, 2025",
      author: "Ayush Singh",
      description: "How I used foomatic-db to generate complete static printer data and learned from open-source reviews.",
      url: "https://singhcod3r.medium.com/my-first-merged-pull-request-regenerating-printer-data-from-foomatic-db-eba2f7324b34",
      category: "Foomatic-DB",
      link: "https://singhcod3r.medium.com/my-first-merged-pull-request-regenerating-printer-data-from-foomatic-db-eba2f7324b34",
      snippet: "How I used foomatic-db to generate complete static printer data and learned from open-source reviews.",
    },
  ],

  speaking: {
    badge: "Keynote Speaker",
    title: "I ALSO TALK ABOUT TECHNOLOGY.",
    subtitle: "Sharing hands-on systems knowledge, open-source maintainer realities, and engineering ethics.",
    featuredTalk: {
      title: "AI Overload: How Careless AI Usage Is Quietly Killing PR Quality",
      event: "OOSC 4.0 (Open Source Conference)",
      institution: "IIIT Allahabad",
      date: "August 2026",
      location: "Prayagraj / Allahabad, India",
      summary: "Delivered an invited conference keynote analyzing the surge in LLM-assisted contributions to upstream Linux projects, the cognitive load imposed on volunteer maintainers, and pragmatic technical solutions for CI linting, device testing verification, and thoughtful AI adoption.",
      tags: ["Keynote", "Open Source", "Upstream Maintenance", "AI Ethics", "IIIT Allahabad"],
      posterBadge: "OOSC 4.0 Keynote"
    }
  },

  marquee: {
    line1: "AYUSH — SOFTWARE — OPEN SOURCE — BUILDING — LINUX SYSTEMS — ",
    line2: "— ENGINEERING — PRODUCTS — SYSTEMS — EXPERIMENTS — UPSTREAM — "
  },

  contact: {
    headline: "LET'S BUILD SOMETHING COOL.",
    subtext: "Whether you have an interesting systems engineering role, an open-source collaboration, or a bold product idea — let's connect.",
    locationNote: "Based in Lucknow, India • Available Worldwide",
    email: "ayushsinghceee@gmail.com",
    github: "https://github.com/SinghCod3r",
    linkedin: "https://linkedin.com/in/singhcod3r",
    resume: "/Resume/Ayush_Singh.pdf"
  }
};

