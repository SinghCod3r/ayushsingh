export interface ProjectItem {
  id: string;
  name: string;
  tagline: string;
  category: "AI & LLM" | "Systems & Tooling" | "Language & Compilers" | "Full Stack";
  description: string;
  problem: string;
  solution: string;
  architectureHighlights: string[];
  technologies: string[];
  githubUrl?: string;
  liveUrl?: string;
  image?: string;
  previewImage?: string;
  featured: boolean;
  statusText?: string;
  metrics?: { label: string; value: string };
  badge?: string;
}

export const projects: ProjectItem[] = [
  {
    id: "moodbite-ai",
    name: "MoodBite.AI",
    tagline: "Mood-to-Culinary Sensory Intelligence Engine",
    category: "AI & LLM",
    description:
      "A culinary intelligence engine mapping emotional context to dietary profiles, sensory attributes, and explainable recommendations.",
    problem:
      "Conventional food apps recommend dishes based solely on order history, ignoring immediate context and dietary constraints.",
    solution:
      "Deterministic pipeline mapping emotion vectors to calibrated sensory profiles with confidence-based guardrails.",
    architectureHighlights: [
      "Mood & Context Vector Normalization",
      "Confidence-Based Emotion Rejection Guardrails",
      "Deterministic Multi-Factor Scoring",
    ],
    technologies: ["Python", "Next.js", "FastAPI", "NLP", "Vector Scoring"],
    githubUrl: "https://github.com/SinghCod3r/MoodBite.Ai",
    liveUrl: "https://moodbiteai.vercel.app/",
    image: "/projects/moodbite_landing_page.png",
    previewImage: "/projects/moodbite_example.png",
    featured: true,
    statusText: "Active Project",
    metrics: { label: "Pipeline", value: "Deterministic + NLP" },
    badge: "Featured AI Project",
  },
  {
    id: "skillfoundry",
    name: "SkillFoundry",
    tagline: "Local LLM Developer Tooling & Workflow CLI",
    category: "AI & LLM",
    description:
      "High-performance developer CLI for local LLM orchestration with zero-dependency Ollama integration and type-verified pipelines.",
    problem:
      "Local model execution often suffers from bloated wrappers, high latency, and brittle prompt state.",
    solution:
      "Modular CLI commands (`sf setup`, `sf build`) backed by 53 automated tests and zero Pyright type errors.",
    architectureHighlights: [
      "Zero-dependency Ollama provider abstraction",
      "Strict typing with 0 Pyright errors",
      "53-test automated regression harness",
    ],
    technologies: ["Python", "Ollama", "CLI Engineering", "Pyright", "pytest"],
    githubUrl: "https://github.com/SinghCod3r/SkillFoundry",
    liveUrl: "",
    featured: true,
    statusText: "53 Tests · 0 Errors",
    metrics: { label: "Test Suite", value: "53 Passing" },
    badge: "Verified CLI Tooling",
  },
  {
    id: "ezy-lang",
    name: "Ezy Language & Runtime",
    tagline: "Custom Scripting Language & Interpreter",
    category: "Language & Compilers",
    description:
      "Interpreted programming language engineered from scratch in Python, implementing a lexical scanner, recursive descent parser, and runtime.",
    problem:
      "Understanding compiler internals and execution scoping requires building a complete language pipeline from raw tokens to evaluation.",
    solution:
      "Complete language pipeline featuring tokenization, operator precedence parsing, AST generation, and nested lexical scoping.",
    architectureHighlights: [
      "Handwritten lexical tokenizer",
      "Recursive descent parser with precedence tables",
      "Tree-walk interpreter with nested lexical scopes",
    ],
    technologies: ["Python", "Compilers", "Lexer / Parser", "AST", "Interpreter"],
    githubUrl: "https://github.com/SinghCod3r",
    liveUrl: "https://singhcod3r.github.io/ezy/",
    image: "/projects/ezy_page_image.png",
    featured: true,
    statusText: "Language Runtime",
    metrics: { label: "Pipeline", value: "Lexer → AST → VM" },
    badge: "CS Foundations",
  },
  {
    id: "printer-support-resolver",
    name: "Printer Support Resolver",
    tagline: "Hardware Discovery & Capability Indexing Engine",
    category: "Systems & Tooling",
    description:
      "Systems utility resolving Linux printing hardware compatibility through automated driverless capability indexing and PPD gap analysis.",
    problem:
      "Identifying compatible driverless architectures across thousands of printer models involves fragmented databases and manual trial.",
    solution:
      "Automated engine ingesting hardware IDs, querying CUPS/PPD indexes, and suggesting package provisioning via PackageKit.",
    architectureHighlights: [
      "IEEE 1284 Device ID normalization",
      "SQLite driverless capability indexing",
      "PackageKit automated provisioning hooks",
    ],
    technologies: ["Python", "SQLite", "CUPS", "PPD", "PackageKit", "Linux"],
    githubUrl: "https://github.com/SinghCod3r",
    liveUrl: "",
    featured: true,
    statusText: "Systems Engine",
    metrics: { label: "Domain", value: "Linux Hardware" },
    badge: "Systems Architecture",
  },
  {
    id: "gate-intelligence",
    name: "GATE Question Intelligence",
    tagline: "Examination OCR Ingestion & Pattern Analytics",
    category: "AI & LLM",
    description:
      "Data engineering pipeline processing decades of GATE CS exam papers, extracting structured question corpora and topic recurrence patterns.",
    problem:
      "Historical exam papers exist as low-contrast scanned PDFs with complex mathematical notation.",
    solution:
      "Automated pipeline with pdf2image and EasyOCR extracting questions, parsing formulas, and structuring JSON datasets.",
    architectureHighlights: [
      "Multi-year PDF rasterization & OCR extraction",
      "Mathematical symbol recovery & noise filtering",
      "Structured JSON question schema extraction",
    ],
    technologies: ["Python", "EasyOCR", "pdf2image", "OpenCV", "Pandas"],
    githubUrl: "https://github.com/SinghCod3r",
    liveUrl: "",
    featured: false,
    statusText: "Research Tool",
    metrics: { label: "Corpus", value: "Multi-Year Papers" },
    badge: "Data & OCR Pipeline",
  },
  {
    id: "aura-ai",
    name: "Aura.AI",
    tagline: "Career Assessment & Mentorship Platform",
    category: "Full Stack",
    description:
      "Interactive web platform providing automated career path assessment, skill diagnostics, and mentorship roadmap generation.",
    problem:
      "Early-career developers struggle to benchmark capabilities against current industry roles without structured guidance.",
    solution:
      "Interactive assessment platform with step-by-step evaluations and dynamic skill radar diagnostics.",
    architectureHighlights: [
      "Multi-stage interactive evaluation interface",
      "Dynamic skill radar visualization",
      "Automated roadmap generation for engineering roles",
    ],
    technologies: ["React", "Node.js", "REST APIs", "Tailwind CSS"],
    githubUrl: "https://github.com/SinghCod3r",
    liveUrl: "",
    image: "/projects/Aurai_landing.png",
    previewImage: "/projects/auraai_second_page.png",
    featured: false,
    statusText: "Web Application",
    metrics: { label: "Stack", value: "React + Node.js" },
    badge: "Full Stack Web",
  },
];
