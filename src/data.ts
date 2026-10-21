export interface Project {
  number: string;
  category: string;
  title: string;
  oneLiner: string;
  description: string;
  techChips: string[];
  githubUrl: string;
  liveUrl?: string;
  images: string[];
  metrics?: string;
}

export interface StatItem {
  value: number;
  suffix: string;
  label: string;
  meta: string;
}

export interface TimelineItem {
  year: string;
  title: string;
  organization: string;
  role: string;
  description: string;
  highlight: string;
}

export interface AwardItem {
  title: string;
  issuer: string;
  year: string;
  verified: boolean;
  highlight?: string;
}

export interface OpenSourcePR {
  prNumber: string;
  title: string;
  repo: string;
  status: 'merged' | 'reviewed';
  summary: string;
  tags: string[];
  url: string;
}

export const PORTFOLIO_DATA = {
  identity: {
    firstName: 'AYUSH',
    lastName: 'SINGH',
    fullName: 'Ayush Singh',
    roleTag: 'SOFTWARE ENGINEER.',
    subTag: 'OPEN SOURCE CONTRIBUTOR.',
    heroDescription:
      'Engineering software close to real problems. Maintaining Linux system infrastructure, building responsive products, and contributing upstream.',
    bioShort:
      'I like software that works close to the real problem. I build products, debug systems, contribute upstream, and share what I learn.',
    location: 'Lucknow, India',
    email: 'ayushsinghceee@gmail.com',
    links: {
      github: 'https://github.com/SinghCod3r',
      linkedin: 'https://linkedin.com/in/singhcod3r',
      website: 'https://singhcod3r.github.io',
      resume: './resume.pdf',
    },
    philosophy: ['BUILD', 'DEBUG', 'CONTRIBUTE', 'SPEAK', 'SHARE'],
  },

  about: {
    sectionNum: '01',
    sectionTitle: 'About me',
    manifesto:
      'I like software that works close to the real problem. I build products, debug systems, contribute upstream, and share what I learn.',
    bioParagraphs: [
      'Software engineer focused on Linux desktop subsystems and upstream open source, with hands-on maintainer experience in The Linux Foundation’s OpenPrinting ecosystem.',
      'From isolating synchronous GTK UI freezes to architecting 19 enterprise REST APIs, I prioritize deterministic runtime behavior, verifiable regression test suites, and clean systems architecture.',
    ],
    stats: [
      {
        value: 11,
        suffix: '+',
        label: 'MERGED UPSTREAM PRS',
        meta: 'The Linux Foundation / OpenPrinting ecosystem',
      },
      {
        value: 8.62,
        suffix: '/10',
        label: 'B.TECH CGPA',
        meta: 'Computer Science & Engineering (SRMCEM)',
      },
      {
        value: 19,
        suffix: ' APIs',
        label: 'REST APIS SHIPPED',
        meta: 'Enterprise Dynamics 365 migration pipelines',
      },
    ] as StatItem[],
  },

  skills: {
    sectionNum: '02',
    sectionTitle: 'Skills & Architecture',
    tagline: 'EVERYTHING CONNECTED. EVERYTHING DETERMINISTIC.',
    categories: [
      {
        name: 'Systems & Linux',
        skills: ['Python', 'Linux Kernel / GTK', 'GLib / D-Bus', 'CUPS / PPD', 'DNS-SD', 'IPP-over-USB'],
      },
      {
        name: 'Full Stack & APIs',
        skills: ['React', 'Next.js', 'TypeScript', 'Node.js', 'Express', 'FastAPI', 'REST APIs', 'SQL / SQLite'],
      },
      {
        name: 'Upstream & Engineering',
        skills: ['Git / Branching', 'Regression Testing', 'Code Review', 'CI/CD Pipelines', 'Docker', 'AST / Interpreters'],
      },
    ],
  },

  projects: {
    sectionNum: '03',
    sectionTitle: 'Selected Projects',
    list: [
      {
        number: '01',
        category: 'UPSTREAM LINUX SUBSYSTEM',
        title: 'OpenPrinting / system-config-printer',
        oneLiner: 'Upstream Linux desktop printer subsystem & discovery overhaul.',
        description:
          'Resolved GTK UI freezes with GLib idle worker threads, fixed IPP-over-USB device classification so USB devices are never misreported as network printers, and implemented human-readable driver metadata extraction.',
        techChips: ['Python', 'GTK / GLib', 'CUPS / PPD', 'D-Bus', 'DNS-SD'],
        githubUrl: 'https://github.com/OpenPrinting/system-config-printer',
        images: ['./projects/system-config-printer_preview1.png', './projects/system-config-printer-preview2.png'],
        metrics: '11+ Upstream PRs · Linux Foundation',
      },
      {
        number: '02',
        category: 'SYSTEMS & RESOLVER',
        title: 'Printer Support Resolver (PSR)',
        oneLiner: 'Linux-native Python tool for fast printer support and driver resolution.',
        description:
          'Parses local PPD files into a SQLite index and resolves support via IEEE 1284 Device IDs. Implements a 5-stage pipeline (Index, Resolution, Support Gap Analysis, Ranking, Provisioning) eliminating synchronous PPD overhead.',
        techChips: ['Python', 'SQLite', 'CUPS', 'PPD', 'IEEE 1284'],
        githubUrl: 'https://github.com/SinghCod3r/printer-support-resolver',
        images: ['./files/psr.png'],
        metrics: '5-Stage Pipeline · SQLite Index',
      },
      {
        number: '03',
        category: 'LANGUAGE RUNTIME & AST',
        title: 'Ezy — Scripting Language & Runtime',
        oneLiner: 'Deterministic scripting language and tree-walking interpreter.',
        description:
          'Built with an indentation-aware lexer, recursive-descent parser, AST generator, and tree-walking interpreter with lexical environments. First-class support for files, processes, HTTP, and JSON with an interactive REPL.',
        techChips: ['Python', 'Lexer / Parser', 'AST', 'REPL CLI', 'PyTest'],
        githubUrl: 'https://github.com/SinghCod3r',
        liveUrl: 'https://singhcod3r.github.io/ezy',
        images: ['./projects/ezy_page_image.png'],
        metrics: 'Recursive-Descent · Full AST',
      },
      {
        number: '04',
        category: 'AI PRODUCT & WELLNESS',
        title: 'MoodBite.AI',
        oneLiner: 'Contextual AI meal planning & nutrition recommendation engine.',
        description:
          'Synthesizes emotional telemetry, nutritional guidelines, and ingredient inventories into real-time recipe generation with low-latency API streaming and dynamic meal suggestions.',
        techChips: ['Python', 'Next.js', 'FastAPI', 'Node.js', 'Tailwind'],
        githubUrl: 'https://github.com/SinghCod3r',
        images: ['./projects/moodbite_landing_page.png', './projects/moodbite_example.png'],
        metrics: 'Real-time Streaming · Contextual AI',
      },
      {
        number: '05',
        category: 'AUTONOMOUS INTERVIEW PREP',
        title: 'Aura.Ai',
        oneLiner: 'Autonomous interview preparation platform with local LLM integration.',
        description:
          'Generates tailored technical interview questions, evaluates answers, and provides feedback for software engineering candidates with a dedicated CLI for local AI execution via Ollama.',
        techChips: ['React', 'Llama', 'Ollama', 'TypeScript', 'Node.js'],
        githubUrl: 'https://github.com/SinghCod3r',
        images: ['./projects/Aurai_landing.png', './projects/auraai_second_page.png'],
        metrics: 'Local LLM · Interactive CLI',
      },
    ] as Project[],
  },

  opensource: {
    sectionNum: '04',
    sectionTitle: 'Upstream Open Source',
    tagline: 'THE LINUX FOUNDATION / OPENPRINTING',
    repo: 'OpenPrinting / system-config-printer',
    description:
      'As an upstream maintainer and engineer, I work on desktop Linux printer discovery, driver classification, and concurrency bottlenecks alongside senior maintainer Alexander Pevzner.',
    prs: [
      {
        prNumber: '#455',
        title: 'Delayed device presentation until DNS-SD discovery completes',
        repo: 'system-config-printer',
        status: 'merged',
        summary: 'Prevents race conditions by synchronizing UI device listing with active network mDNS scans.',
        tags: ['DNS-SD', 'mDNS', 'Concurrency'],
        url: 'https://github.com/OpenPrinting/system-config-printer/pull/455',
      },
      {
        prNumber: '#460',
        title: 'IPP-over-USB classification fix',
        repo: 'system-config-printer',
        status: 'merged',
        summary: 'Corrected device URI handling so locally connected USB printers are never misreported as network hardware.',
        tags: ['IPP-over-USB', 'Hardware Bus', 'URI'],
        url: 'https://github.com/OpenPrinting/system-config-printer/pull/460',
      },
      {
        prNumber: '#463',
        title: 'URI normalization & duplicate filtering',
        repo: 'system-config-printer',
        status: 'merged',
        summary: 'Filters already-configured printers across IPv4/IPv6 and LAN subnets, backed by regression tests.',
        tags: ['IPv6', 'Normalization', 'Regressions'],
        url: 'https://github.com/OpenPrinting/system-config-printer/pull/463',
      },
      {
        prNumber: '#469',
        title: 'Synchronous PPD catalog loading isolation',
        repo: 'system-config-printer',
        status: 'merged',
        summary: 'Traced driver-selection and PPD-loading paths to eliminate desktop UI freezes.',
        tags: ['PPD Catalog', 'UI Freeze', 'Performance'],
        url: 'https://github.com/OpenPrinting/system-config-printer/pull/469',
      },
      {
        prNumber: '#472',
        title: 'Human-readable driver names from PPD metadata',
        repo: 'system-config-printer',
        status: 'merged',
        summary: 'Parses complex PPD nick-names and extracts clean, accessible model descriptions for end users.',
        tags: ['PPD Metadata', 'UX', 'Parser'],
        url: 'https://github.com/OpenPrinting/system-config-printer/pull/472',
      },
      {
        prNumber: '#477',
        title: 'Unblock GTK main loop via GLib idle callbacks',
        repo: 'system-config-printer',
        status: 'merged',
        summary: 'Refactored driver installation to worker threads, dispatching progress safely to the GTK thread.',
        tags: ['GTK3', 'GLib Threads', 'Main Loop'],
        url: 'https://github.com/OpenPrinting/system-config-printer/pull/477',
      },
      {
        prNumber: '#478',
        title: 'Driver installation error path recovery',
        repo: 'system-config-printer',
        status: 'merged',
        summary: 'Collaborated with Alexander Pevzner to reproduce and resolve driver-installation failure locks.',
        tags: ['Maintainer Collab', 'Error Recovery'],
        url: 'https://github.com/OpenPrinting/system-config-printer/pull/478',
      },
      {
        prNumber: '#479',
        title: 'go-mfp nil-backend & UUID-merging regression suite',
        repo: 'go-mfp',
        status: 'merged',
        summary: 'Fixed printer-discovery crash on nil backends with cross-language Go/Python test coverage.',
        tags: ['Go', 'UUID', 'Test Suite'],
        url: 'https://github.com/OpenPrinting/system-config-printer/pull/479',
      },
    ] as OpenSourcePR[],
  },

  journey: {
    sectionNum: '05',
    sectionTitle: 'Journey & Experience',
    timeline: [
      {
        year: '2025 – PRESENT',
        title: 'Maintainer & Open Source Engineer',
        organization: 'The Linux Foundation / OpenPrinting',
        role: 'Upstream Systems Maintainer',
        description:
          'Maintaining system-config-printer, legacy-drivers, and Foomatic XML database. Debugging driver discovery, IPP-over-USB protocols, and GUI concurrency alongside senior maintainers.',
        highlight: 'Upstream Maintainer',
      },
      {
        year: '2026',
        title: 'Trainee Technical Consultant',
        organization: 'Acxiom Consulting',
        role: 'Enterprise Systems & APIs',
        description:
          'Architected and validated 19 REST APIs supporting migration pipelines for Microsoft Dynamics 365 Business Central. Built React Native CLI utilities and solved workflow edge cases.',
        highlight: '19 REST APIs Shipped',
      },
      {
        year: '2022 – 2026',
        title: 'B.Tech, Computer Science & Engineering',
        organization: 'SRMCEM, Lucknow',
        role: 'Honors Degree — CGPA 8.62 / 10',
        description:
          'Core training in Operating Systems, Compilers, Distributed Systems, and Data Structures. Formed foundational principles in systems diagnostics and deterministic runtimes.',
        highlight: 'CGPA 8.62 / 10',
      },
    ] as TimelineItem[],
  },

  achievements: {
    sectionNum: '06',
    sectionTitle: 'Impact & Credentials',
    speakerHighlight: {
      event: 'Open Source Conference 4.0 — IIIT Allahabad',
      date: 'Aug 2026',
      talk: 'AI Overload: How Careless AI Usage Is Quietly Killing Pull Request Quality',
      summary:
        'Keynote talk examining the erosion of code review hygiene from synthetic code generation and practical strategies for maintaining upstream signal-to-noise ratios.',
    },
    credentials: [
      {
        title: 'Speaker — OOSC 4.0',
        issuer: 'IIIT Allahabad',
        year: '2026',
        verified: true,
        highlight: 'Keynote Speaker',
      },
      {
        title: 'Hacktoberfest 2025',
        issuer: 'Super Contributor',
        year: '2025',
        verified: true,
        highlight: 'Top Tier Contributor',
      },
      {
        title: 'LFC102 Linux Essentials',
        issuer: 'The Linux Foundation',
        year: '2025',
        verified: true,
        highlight: 'Verified Credential',
      },
      {
        title: 'Campus Solution Challenge',
        issuer: 'Google Developer Groups',
        year: '2025',
        verified: true,
        highlight: 'Global Competition',
      },
    ] as AwardItem[],
  },

  contact: {
    sectionNum: '07',
    sectionTitle: 'Contact',
    headline: "LET'S BUILD SOMETHING GREAT.",
    fullEmail: 'ayushsinghceee@gmail.com',
    links: [
      { label: 'GitHub', url: 'https://github.com/SinghCod3r' },
      { label: 'LinkedIn', url: 'https://linkedin.com/in/singhcod3r' },
      { label: 'Résumé PDF', url: './resume.pdf' },
    ],
    footer: {
      copyrightYear: 2026,
      name: 'Ayush Singh',
      note: 'Engineered with GSAP, Lenis & brutalist precision.',
    },
  },
};
