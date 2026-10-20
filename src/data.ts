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
  visualType?: 'printer-system' | 'ai-food' | 'cli-tool';
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
  type?: string;
}

export interface CounterItem {
  value: string;
  label: string;
  color: 'red' | 'black';
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
        meta: 'Computer Science & Engineering',
      },
      {
        value: 19,
        suffix: ' APIs',
        label: 'REST APIS DELIVERED',
        meta: 'Enterprise Dynamics 365 migration workflows',
      },
    ] as StatItem[],
  },

  work: {
    sectionNum: '02',
    sectionTitle: 'Selected Work',
    projects: [
      {
        number: '01',
        category: 'UPSTREAM OPEN SOURCE',
        title: 'OpenPrinting / system-config-printer',
        oneLiner: 'Upstream Linux desktop printer subsystem & discovery overhaul.',
        description:
          'Resolved GTK UI freezes with GLib idle worker threads, fixed IPP-over-USB device classification, and implemented PPD human-readable metadata extraction.',
        techChips: ['Python', 'GTK / GLib', 'CUPS / PPD', 'D-Bus'],
        githubUrl: 'https://github.com/OpenPrinting/system-config-printer',
        images: ['./projects/system-config-printer_preview1.png', './projects/system-config-printer-preview2.png'],
        visualType: 'printer-system',
      },
      {
        number: '02',
        category: 'AI PRODUCT & WELLNESS',
        title: 'MoodBite.AI',
        oneLiner: 'Contextual AI meal planning & nutrition recommendation engine.',
        description:
          'Synthesizes emotional telemetry, nutritional guidelines, and ingredient inventories into real-time recipe generation with low-latency API streaming.',
        techChips: ['Python', 'Next.js', 'Node.js', 'FastAPI'],
        githubUrl: 'https://github.com/SinghCod3r',
        images: ['./projects/moodbite_landing_page.png', './projects/moodbite_example.png'],
        visualType: 'ai-food',
      },
      {
        number: '03',
        category: 'AI AGENT PLATFORM',
        title: 'Aura.AI',
        oneLiner: 'Intelligent AI workspace & contextual task automation interface.',
        description:
          'Multi-modal workspace connecting autonomous agents with real-time reasoning workflows, document context, and dynamic conversational interfaces.',
        techChips: ['TypeScript', 'Next.js', 'TailwindCSS', 'LLM Agents'],
        githubUrl: 'https://github.com/SinghCod3r',
        images: ['./projects/Aurai_landing.png', './projects/auraai_second_page.png'],
        visualType: 'cli-tool',
      },
      {
        number: '04',
        category: 'SYSTEMS & COMPILERS',
        title: 'Ezy — Scripting Language',
        oneLiner: 'Deterministic scripting language, lexer, AST parser & tree-walking runtime.',
        description:
          'Indentation-aware lexer, recursive-descent parser, and tree-walking interpreter. Built-in CLI with run, check, and REPL modes with first-class HTTP, JSON, and files standard library.',
        techChips: ['Python', 'Compilers / AST', 'Interpreters', 'pytest'],
        githubUrl: 'https://github.com/SinghCod3r',
        liveUrl: 'https://singhcod3r.github.io/ezy',
        images: ['./projects/ezy_page_image.png'],
        visualType: 'cli-tool',
      },
    ] as Project[],
  },

  journey: {
    sectionNum: '03',
    sectionTitle: 'Journey',
    startYear: 2022,
    currentYear: 2026,
    headline: 'LEARNING\nOUT LOUD.',
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
    evolution: [
      'STUDENT',
      'ENGINEER',
      'OPEN SOURCE CONTRIBUTOR',
      'MAINTAINER',
      'SPEAKER',
    ],
  },

  toolkit: {
    sectionNum: '04',
    sectionTitle: 'Toolkit',
    headline: 'EVERYTHING\nIN ORBIT.',
    skills: [
      'Python',
      'JavaScript',
      'TypeScript',
      'SQL',
      'React',
      'Next.js',
      'Node.js',
      'Express',
      'REST APIs',
      'Git',
      'GitHub',
      'Linux',
      'Open Source',
      'Debugging',
      'Testing',
      'AI',
    ],
    marquee: [
      'PYTHON',
      'LINUX SYSTEMS',
      'OPENPRINTING',
      'TYPESCRIPT',
      'REACT',
      'GTK / GLIB',
      'D-BUS',
      'CUPS',
      'REST APIS',
      'DOCKER',
      'SYSTEMS DEBUGGING',
      'ROOT CAUSE ANALYSIS',
    ],
  },

  awards: {
    sectionNum: '05',
    sectionTitle: 'Impact & Credentials',
    speakerHighlight: {
      event: 'Open Source Conference 4.0 — IIIT Allahabad',
      date: 'Aug 2026',
      talk: 'AI Overload: How Careless AI Usage Is Quietly Killing Pull Request Quality',
      summary:
        'Keynote talk examining the erosion of code review hygiene from synthetic code generation and practical strategies for maintaining upstream signal-to-noise ratios.',
    },
    counters: [
      {
        value: '11+',
        label: 'MERGED UPSTREAM PRS',
        color: 'red',
      },
      {
        value: '04',
        label: 'OPEN-SOURCE ECOSYSTEMS',
        color: 'black',
      },
      {
        value: '19',
        label: 'ENTERPRISE REST APIS',
        color: 'red',
      },
      {
        value: '8.62',
        label: 'B.TECH CGPA',
        color: 'black',
      },
    ] as CounterItem[],
    certifications: [
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
      {
        title: 'Python for Data Science',
        issuer: 'IBM Cognitive Class',
        year: '2024',
        verified: true,
        highlight: 'Cognitive Class',
      },
      {
        title: 'Cloud Essentials',
        issuer: 'IBM Cognitive Class',
        year: '2024',
        verified: true,
        highlight: 'Cognitive Class',
      },
    ] as AwardItem[],
  },

  writing: {
    featuredArticle: {
      title: 'Fixing Driver Metadata & Upstream Linux Printer Configurations',
      publication: 'Medium / Technical Notes',
      url: 'https://singhcod3r.github.io',
      summary:
        'A deep dive into PPD catalogs, SpliX driver metadata correction, and eliminating synchronous UI locks in desktop Linux administration.',
    },
  },

  contact: {
    sectionNum: '06',
    sectionTitle: 'Contact',
    headline: "LET'S\nTALK",
    emailUser: 'ayushsinghceee',
    emailDomain: '@gmail.com',
    fullEmail: 'ayushsinghceee@gmail.com',
    links: [
      { label: 'GitHub', url: 'https://github.com/SinghCod3r' },
      { label: 'LinkedIn', url: 'https://linkedin.com/in/singhcod3r' },
      { label: 'Portfolio', url: 'https://singhcod3r.github.io' },
      { label: 'Résumé PDF', url: './resume.pdf' },
    ],
    footer: {
      copyrightYear: 2026,
      name: 'Ayush Singh',
      note: 'Crafted with precision & scroll kinematics.',
    },
  },
};

