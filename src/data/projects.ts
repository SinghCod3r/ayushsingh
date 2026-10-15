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
  featured: boolean;
  statusText?: string;
  metrics?: { label: string; value: string };
  badge?: string;
}

export const projects: ProjectItem[] = [
  {
    id: "moodbite-ai",
    name: "MoodBite.AI",
    tagline: "Deterministic Mood-to-Culinary Sensory Intervention Engine",
    category: "AI & LLM",
    description:
      "A mood-driven culinary intelligence system connecting emotional state and contextual cues to dietary constraints, sensory intervention profiles, deterministic ranking, and explainable nutritional rationale.",
    problem:
      "Conventional food apps recommend dishes based solely on order history or marketing boosts, ignoring immediate psycho-physiological states, situational context, emotional stress, and dietary constraints.",
    solution:
      "Engineered an end-to-end recommendation pipeline that maps normalized emotional states into tailored sensory profiles (e.g. crunch, warmth, umami, cooling) calibrated specifically for commonly available Indian cuisine and beverages. Features confidence-based emotion rejection, invalid-food elimination, and conversational emotion depth.",
    architectureHighlights: [
      "Mood + Context Vector Normalization",
      "Confidence-Based Emotion Rejection Guardrails",
      "Dietary Constraints & Pure Veg / Non-Veg Filtering",
      "Sensory Profile Mapping (Texture, Temperature, Flavor)",
      "Deterministic Multi-Factor Scoring & Ranking",
      "Explainable Nutritional Rationale Generation",
    ],
    technologies: [
      "Python",
      "Next.js",
      "FastAPI / REST",
      "Natural Language Processing",
      "Tailwind CSS",
      "Vector Scoring",
    ],
    githubUrl: "https://github.com/SinghCod3r/MoodBite.Ai",
    liveUrl: "", // Ready for live deployment URL
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
      "A developer tooling CLI engineered for reliable local LLM orchestration and workflow automation, featuring zero-dependency Ollama-compatible provider integration, deterministic task builders, and strict type verification.",
    problem:
      "Developing with local models often involves brittle API wrappers, unverified prompt state, lack of local test suites, and high latency with monolithic frameworks.",
    solution:
      "Built a modular CLI architecture with `sf setup` and `sf build` commands, supporting local models such as qwen2.5:1.5b and qwen3:8b via Ollama. Backed by rigorous quality assurance: 53 passing automated tests and 0 Pyright type errors.",
    architectureHighlights: [
      "Modular CLI commands (`sf setup`, `sf build`)",
      "Local Ollama-compatible provider abstraction layer",
      "Strict static typing with zero Pyright diagnostics",
      "53-test automated test harness covering edge-cases",
      "Optimized for low-latency local execution on consumer hardware",
    ],
    technologies: ["Python", "Ollama", "CLI Engineering", "Pyright", "Automated Testing", "Local LLMs"],
    githubUrl: "https://github.com/SinghCod3r/SkillFoundry",
    liveUrl: "",
    featured: true,
    statusText: "53 Tests Passing · 0 Pyright Errors",
    metrics: { label: "Test Suite", value: "53 Tests Passing" },
    badge: "Verified CLI Tooling",
  },
  {
    id: "printer-support-resolver",
    name: "Printer Support Resolver",
    tagline: "Automated Hardware Support Discovery & Gap Analysis Engine",
    category: "Systems & Tooling",
    description:
      "A systems engineering utility designed to resolve Linux printing hardware compatibility through automated driverless capability indexing, PPD resolution, support-gap analysis, and package provisioning.",
    problem:
      "Identifying compatible driverless architectures or legacy PPD drivers for thousands of printer models across Linux distributions involves fragmented databases and manual trial-and-error.",
    solution:
      "Developed a structured resolution engine that ingests printer hardware IDs, queries local and remote CUPS/PPD indexes, performs gap analysis against modern driverless Printer Applications, and suggests deterministic provisioning commands via PackageKit.",
    architectureHighlights: [
      "Hardware IEEE 1284 Device ID normalization",
      "SQLite-backed driverless capability indexing",
      "Support-gap analysis engine comparing PPD vs IPP Everywhere",
      "Deterministic driver ranking & recommendation heuristic",
      "Automated PackageKit provisioning hooks",
    ],
    technologies: ["Python", "SQLite", "CUPS", "PPD", "Printer Applications", "PackageKit", "Linux"],
    githubUrl: "https://github.com/SinghCod3r", // User will link direct sub-repo or umbrella
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
      "A custom interpreted programming language engineered from scratch in Python, implementing a handwritten lexical scanner, recursive descent parser, abstract syntax tree (AST) visualizer, and runtime interpreter.",
    problem:
      "Understanding compiler internals, execution environments, scoping rules, and memory management requires building a complete language pipeline from bare source code to evaluation.",
    solution:
      "Implemented a complete programming language featuring tokenization, clean operator precedence parsing, AST generation, lexical scoping, dynamic variable resolution, control flow structures, and runtime error reporting.",
    architectureHighlights: [
      "Handwritten regex-free lexical tokenizer",
      "Recursive descent parser with operator precedence table",
      "Explicit Abstract Syntax Tree (AST) node hierarchy",
      "Tree-walk interpreter with nested lexical environment scopes",
      "Custom error diagnostics with line/column coordinates",
    ],
    technologies: ["Python", "Language Design", "Lexer / Parser", "AST", "Interpreter", "Compilers"],
    githubUrl: "https://github.com/SinghCod3r",
    liveUrl: "",
    featured: true,
    statusText: "Language Experiment",
    metrics: { label: "Architecture", value: "Lexer → AST → Runtime" },
    badge: "CS Foundations",
  },
  {
    id: "gate-intelligence",
    name: "GATE Question Intelligence & Prediction",
    tagline: "Multi-Year Examination OCR Ingestion & Pattern Analytics",
    category: "AI & LLM",
    description:
      "A research & data engineering platform designed to process decades of GATE Computer Science examination papers, extracting structured question corpora and analyzing topic frequency distributions.",
    problem:
      "Historical GATE exam papers exist primarily as unstructured scanned PDFs with varying font quality, diagrams, and mathematical notations, making quantitative topic tracking tedious.",
    solution:
      "Engineered an ingestion pipeline utilizing pdf2image and EasyOCR to extract textual question units, parse mathematical equations, clean OCR artifacts, and index questions into structured datasets for predictive syllabus weightage analysis.",
    architectureHighlights: [
      "Multi-year PDF rasterization via pdf2image",
      "Optical character recognition pipeline with EasyOCR",
      "Noise filtration & mathematical symbol recovery heuristics",
      "Structured JSON schema question extraction",
      "Topic distribution & historical recurrence pattern analysis",
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
    tagline: "AI-Powered Career Assessment & Mentorship Platform",
    category: "Full Stack",
    description:
      "A modern web application providing automated career path assessment, skill gap diagnostics, and interactive mentorship roadmap generation using modern frontend and AI services.",
    problem:
      "Engineering students and early-career developers struggle to benchmark their capabilities against current industry roles without personalized, objective guidance.",
    solution:
      "Built a full-stack interactive assessment platform with intuitive step-by-step evaluations, personalized skill radar diagnostics, and actionable learning trajectory roadmaps.",
    architectureHighlights: [
      "Interactive multi-stage assessment interface",
      "Dynamic skill radar visualization",
      "Automated roadmap generation tailored to engineering disciplines",
      "Fast, responsive client-side state management",
    ],
    technologies: ["React", "Node.js", "REST APIs", "Tailwind CSS", "Chart.js"],
    githubUrl: "https://github.com/SinghCod3r",
    liveUrl: "",
    featured: false,
    statusText: "Web Application",
    metrics: { label: "Stack", value: "React + Node.js" },
    badge: "Full Stack Web",
  },
];
