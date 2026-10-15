export interface TechItem {
  name: string;
  category: string;
  context: string;
  proficiencyLevel?: "Core" | "Advanced" | "Working Knowledge";
}

export interface TechCategory {
  title: string;
  subtitle: string;
  tag: string;
  items: TechItem[];
}

export const techStackCategories: TechCategory[] = [
  {
    title: "Systems & Linux",
    subtitle: "Low-level daemons, IPC protocols, and desktop printing architecture",
    tag: "Core Focus",
    items: [
      { name: "Linux", category: "Systems", context: "OS internals, systemd, process lifecycle, packaging", proficiencyLevel: "Core" },
      { name: "CUPS", category: "Systems", context: "Common UNIX Printing System, raster filters, daemon queries", proficiencyLevel: "Core" },
      { name: "GTK 3 / PyGObject", category: "Systems", context: "GUI widgets, signal handlers, main-thread synchronization", proficiencyLevel: "Core" },
      { name: "GLib", category: "Systems", context: "Event loops, asynchronous idle dispatches, GMainContext", proficiencyLevel: "Core" },
      { name: "D-Bus", category: "Systems", context: "Inter-process communication, system daemon transactions", proficiencyLevel: "Core" },
      { name: "IPP / DNS-SD", category: "Systems", context: "Internet Printing Protocol & Avahi driverless service discovery", proficiencyLevel: "Core" },
      { name: "PPD / IPP-over-USB", category: "Systems", context: "PostScript printer description validation & USB protocol bridges", proficiencyLevel: "Core" },
      { name: "PackageKit", category: "Systems", context: "Linux package management daemon transactions and hooks", proficiencyLevel: "Working Knowledge" },
    ],
  },
  {
    title: "Programming Languages",
    subtitle: "From systems scripting and compiler design to type-safe web services",
    tag: "Polyglot",
    items: [
      { name: "Python", category: "Languages", context: "Systems tooling, language design (Ezy), AI pipelines, testing", proficiencyLevel: "Core" },
      { name: "TypeScript", category: "Languages", context: "Production web applications, type-safe APIs, UI components", proficiencyLevel: "Core" },
      { name: "JavaScript (ES6+)", category: "Languages", context: "Modern browser APIs, asynchronous event loop, node tooling", proficiencyLevel: "Core" },
      { name: "Java", category: "Languages", context: "Object-oriented software engineering, core data structures", proficiencyLevel: "Working Knowledge" },
      { name: "SQL", category: "Languages", context: "Relational queries, index optimization, schema migrations", proficiencyLevel: "Working Knowledge" },
    ],
  },
  {
    title: "AI & Local LLM Engineering",
    subtitle: "Local model pipelines, CLI automation, and deterministic inference",
    tag: "Applied AI",
    items: [
      { name: "Ollama", category: "AI", context: "Local LLM runtime integration (qwen2.5, qwen3) via SkillFoundry", proficiencyLevel: "Core" },
      { name: "Local LLM Workflows", category: "AI", context: "Prompt structuring, deterministic task execution, streaming", proficiencyLevel: "Core" },
      { name: "EasyOCR / pdf2image", category: "AI", context: "Document OCR ingestion pipelines for GATE examination dataset", proficiencyLevel: "Working Knowledge" },
      { name: "Recommendation Systems", category: "AI", context: "Multi-stage mood & sensory ranking heuristic in MoodBite.AI", proficiencyLevel: "Core" },
    ],
  },
  {
    title: "Backend & APIs",
    subtitle: "RESTful endpoints, asynchronous workers, and database architectures",
    tag: "Server Side",
    items: [
      { name: "Node.js & Express", category: "Backend", context: "Lightweight API microservices, asynchronous I/O handlers", proficiencyLevel: "Core" },
      { name: "FastAPI & Flask", category: "Backend", context: "High-performance Python backend endpoints and model serving", proficiencyLevel: "Core" },
      { name: "SQLite", category: "Databases", context: "Embedded hardware indexing in Printer Support Resolver", proficiencyLevel: "Core" },
      { name: "MySQL / MongoDB", category: "Databases", context: "Relational and document storage schemas for web applications", proficiencyLevel: "Working Knowledge" },
      { name: "Prisma ORM", category: "Databases", context: "Type-safe database modeling and schema migrations", proficiencyLevel: "Working Knowledge" },
    ],
  },
  {
    title: "Frontend & Creative Tech",
    subtitle: "Responsive design, modern React architecture, and WebGL experiences",
    tag: "Client Side",
    items: [
      { name: "React & Next.js", category: "Frontend", context: "App Router, SSR, Server Components, client state orchestration", proficiencyLevel: "Core" },
      { name: "Three.js / WebGL", category: "Frontend", context: "Interactive 3D particle systems, network nodes, camera kinematics", proficiencyLevel: "Working Knowledge" },
      { name: "Tailwind CSS", category: "Frontend", context: "Modern design systems, glassmorphism, responsive utility layouts", proficiencyLevel: "Core" },
      { name: "Vite", category: "Frontend", context: "Fast modern bundler workflows and modular frontends", proficiencyLevel: "Core" },
    ],
  },
  {
    title: "DevOps & Infrastructure",
    subtitle: "Reproducible containerization, version control, and CI automation",
    tag: "Infrastructure",
    items: [
      { name: "Docker", category: "Infra", context: "Containerized environments for isolated development and testing", proficiencyLevel: "Working Knowledge" },
      { name: "GitHub Actions", category: "Infra", context: "Automated CI/CD pipelines, linting, regression test suites", proficiencyLevel: "Core" },
      { name: "AWS (EC2, S3)", category: "Infra", context: "Cloud deployment, static hosting, compute instance management", proficiencyLevel: "Working Knowledge" },
      { name: "Terraform", category: "Infra", context: "Infrastructure-as-code foundational provisioning concepts", proficiencyLevel: "Working Knowledge" },
      { name: "Git Workflow", category: "Infra", context: "Rebase, multi-branching, upstream pull request lifecycles", proficiencyLevel: "Core" },
    ],
  },
];
