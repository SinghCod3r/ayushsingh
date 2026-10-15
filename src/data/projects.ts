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
    tagline: "Deterministic Mood-to-Culinary Sensory Recommendation Engine",
    category: "AI & LLM",
    description:
      "A mood-driven culinary intelligence system connecting emotional state and context to dietary constraints, sensory intervention profiles, deterministic scoring, and explainable nutritional rationale.",
    problem:
      "Conventional food apps recommend dishes based solely on order history, ignoring immediate psycho-physiological state, situational context, and dietary constraints.",
    solution:
      "Engineered an end-to-end pipeline mapping normalized emotions to tailored sensory profiles (texture, temperature, flavor) calibrated for Indian cuisine. Includes confidence-based rejection and explainable nutritional logic.",
    architectureHighlights: [
      "Mood & Context Vector Normalization",
      "Confidence-Based Emotion Rejection Guardrails",
      "Dietary Filtering (Pure Veg / Omnivore)",
      "Sensory Profile Mapping (Texture, Temp, Flavor)",
      "Deterministic Multi-Factor Scoring & Ranking",
      "Explainable Nutritional Rationale Generation",
    ],
    technologies: [
      "Python",
      "Next.js",
      "FastAPI",
      "NLP",
      "Tailwind CSS",
      "Vector Scoring",
    ],
    githubUrl: "https://github.com/SinghCod3r/MoodBite.Ai",
    liveUrl: "",
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
      "A developer tooling CLI engineered for local LLM orchestration and workflow automation, featuring zero-dependency Ollama integration, deterministic task builders, and strict type verification.",
    problem:
      "Working with local models frequently suffers from brittle wrappers, untested prompt state, and high latency from bloated frameworks.",
    solution:
      "Built a modular CLI architecture (`sf setup`, `sf build`) supporting local models (qwen2.5:1.5b, qwen3:8b) via Ollama. Backed by 53 passing automated tests and 0 Pyright type errors.",
    architectureHighlights: [
      "Modular CLI commands (`sf setup`, `sf build`)",
      "Local Ollama-compatible provider abstraction",
      "Strict static typing with zero Pyright diagnostics",
      "53-test automated test harness covering edge cases",
      "Low-latency execution on consumer hardware",
    ],
    technologies: ["Python", "Ollama", "CLI Engineering", "Pyright", "pytest", "Local LLMs"],
    githubUrl: "https://github.com/SinghCod3r/SkillFoundry",
    liveUrl: "",
    featured: true,
    statusText: "53 Tests · 0 Pyright Errors",
    metrics: { label: "Test Suite", value: "53 Passing" },
    badge: "Verified CLI Tooling",
  },
  {
    id: "printer-support-resolver",
    name: "Printer Support Resolver",
    tagline: "Hardware Support Discovery & Gap Analysis Engine",
    category: "Systems & Tooling",
    description:
      "A systems engineering utility designed to resolve Linux printing hardware compatibility through automated driverless capability indexing, PPD resolution, and package provisioning.",
    problem:
      "Identifying compatible driverless architectures or legacy PPD drivers across thousands of models involves fragmented databases and manual trial-and-error.",
    solution:
      "Developed a resolution engine that ingests printer hardware IDs, queries CUPS/PPD indexes, evaluates driverless Printer Application gaps, and suggests provisioning via PackageKit.",
    architectureHighlights: [
      "IEEE 1284 Device ID normalization",
      "SQLite driverless capability indexing",
      "Support-gap analysis (PPD vs IPP Everywhere)",
      "Deterministic driver recommendation heuristic",
      "Automated PackageKit provisioning hooks",
    ],
    technologies: ["Python", "SQLite", "CUPS", "PPD", "Printer Applications", "PackageKit", "Linux"],
    githubUrl: "https://github.com/SinghCod3r",
    liveUrl: "",
    featured: true,
    statusText: "Systems Engine",
    metrics: { label: "Domain", value: "Linux Hardware" },
    badge: "Systems Architecture",
  },
  {
    id: "ezy-lang",
    name: "Ezy Language & Runtime",
    tagline: "Custom Scripting Language & Tree-Walk Interpreter",
    category: "Language & Compilers",
    description:
      "An interpreted programming language engineered from scratch in Python, implementing a lexical scanner, recursive descent parser, abstract syntax tree (AST) visualizer, and runtime interpreter.",
    problem:
      "Understanding compiler internals, scoping rules, and memory management requires building a complete language pipeline from raw source code to evaluation.",
    solution:
      "Implemented a complete programming language featuring tokenization, operator precedence parsing, AST generation, lexical scoping, dynamic variable resolution, and error reporting.",
    architectureHighlights: [
      "Handwritten lexical tokenizer",
      "Recursive descent parser with precedence tables",
      "Explicit Abstract Syntax Tree (AST) hierarchy",
      "Tree-walk interpreter with nested lexical scopes",
      "Accurate runtime diagnostics with source coordinates",
    ],
    technologies: ["Python", "Compilers", "Lexer / Parser", "AST", "Interpreter", "Language Design"],
    githubUrl: "https://github.com/SinghCod3r",
    liveUrl: "",
    image: "/projects/ezy_page_image.png",
    featured: true,
    statusText: "Language Experiment",
    metrics: { label: "Pipeline", value: "Lexer → AST → Runtime" },
    badge: "CS Foundations",
  },
  {
    id: "gate-intelligence",
    name: "GATE Question Intelligence",
    tagline: "Multi-Year Examination OCR Ingestion & Pattern Analytics",
    category: "AI & LLM",
    description:
      "A research and data engineering platform processing decades of GATE Computer Science examination papers, extracting structured question corpora and analyzing topic recurrence distributions.",
    problem:
      "Historical GATE exam papers exist primarily as unstructured scanned PDFs with varying font quality and mathematical notation.",
    solution:
      "Engineered an ingestion pipeline with pdf2image and EasyOCR to extract questions, parse formulas, clean artifacts, and index structured datasets for syllabus weightage analysis.",
    architectureHighlights: [
      "Multi-year PDF rasterization via pdf2image",
      "Optical character recognition with EasyOCR",
      "Noise filtration & mathematical symbol recovery",
      "Structured JSON question schema extraction",
      "Historical topic recurrence pattern analysis",
    ],
    technologies: ["Python", "EasyOCR", "pdf2image", "OpenCV", "Pandas", "Data Analytics"],
    githubUrl: "https://github.com/SinghCod3r",
    liveUrl: "",
    featured: false,
    statusText: "Research Prototype",
    metrics: { label: "Corpus", value: "Multi-Year Papers" },
    badge: "Data & OCR Pipeline",
  },
  {
    id: "aura-ai",
    name: "Aura.AI",
    tagline: "AI Career Assessment & Mentorship Platform",
    category: "Full Stack",
    description:
      "A web application providing automated career path assessment, skill gap diagnostics, and interactive mentorship roadmap generation.",
    problem:
      "Early-career developers struggle to benchmark capabilities against current industry roles without structured guidance.",
    solution:
      "Built an interactive assessment platform with step-by-step evaluations, skill radar diagnostics, and actionable learning trajectory roadmaps.",
    architectureHighlights: [
      "Interactive multi-stage assessment interface",
      "Dynamic skill radar visualization",
      "Automated roadmap generation for engineering roles",
      "Fast, responsive client-side state management",
    ],
    technologies: ["React", "Node.js", "REST APIs", "Tailwind CSS", "Chart.js"],
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
