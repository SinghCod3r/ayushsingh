export interface ExperienceItem {
  id: string;
  role: string;
  company: string;
  location: string;
  period: string;
  type: "Work Experience" | "Education" | "Milestone";
  summary: string;
  contributions: string[];
  technologies: string[];
  badge?: string;
}

export const experiences: ExperienceItem[] = [
  {
    id: "acxiom-consulting",
    role: "Trainee Technical Consultant",
    company: "Acxiom Consulting",
    location: "Noida / Hybrid, India",
    period: "4-Month Tenure",
    type: "Work Experience",
    summary:
      "Collaborated in technical consulting, working extensively with enterprise ERP platforms, backend service integrations, and production issue triage in an Agile delivery environment.",
    contributions: [
      "Worked with Microsoft Dynamics 365 Business Central customization, table schemas, and business logic extensions.",
      "Diagnosed and resolved REST API integration bottlenecks connecting enterprise systems with external services.",
      "Participated in production debugging, error logging analysis, and defect resolution.",
      "Collaborated in sprint planning, code reviews, and Agile project delivery workflows.",
    ],
    technologies: ["Microsoft Dynamics 365 Business Central", "REST APIs", "ERP Systems", "Agile", "SQL"],
    badge: "Enterprise Consulting",
  },
  {
    id: "tech-superior",
    role: "Business Analyst & SQA Engineer — Trainee",
    company: "Tech Superior Consulting",
    location: "India",
    period: "Internship Tenure",
    type: "Work Experience",
    summary:
      "Conducted software quality assurance testing, requirements mapping, and functional test lifecycle validations for client software implementations.",
    contributions: [
      "Drafted comprehensive test plans, edge-case scenarios, and defect verification workflows.",
      "Validated software functionality against business requirement specifications to prevent regression defects.",
      "Documented API behavior and reported systematic test metrics to development teams.",
    ],
    technologies: ["Software Quality Assurance", "Functional Testing", "Requirement Analysis", "Defect Tracking"],
    badge: "Quality Assurance",
  },
  {
    id: "tcs-digital",
    role: "TCS Digital Candidate (7 LPA)",
    company: "Tata Consultancy Services (TCS)",
    location: "India",
    period: "Academic Milestone",
    type: "Milestone",
    summary:
      "Selected through TCS competitive technical evaluation for the premier Digital engineering cadre, participating in TCS Xplore/ILP foundation learning tracks.",
    contributions: [
      "Qualified the TCS Digital competitive recruitment stream (~7 LPA tier).",
      "Engaged with enterprise learning modules covering systems engineering, software lifecycles, and modern development standards.",
    ],
    technologies: ["Software Engineering", "Algorithms", "Core Computer Science"],
    badge: "Recruitment Milestone",
  },
  {
    id: "education-srmcem",
    role: "B.Tech — Computer Science & Engineering",
    company: "Shri Ramswaroop Memorial College of Engineering & Management (SRM-CEM)",
    location: "Lucknow, Uttar Pradesh, India",
    period: "2022 — 2026 (Graduation 2026)",
    type: "Education",
    summary:
      "Core curriculum in Computer Science & Engineering affiliated with Dr. A.P.J. Abdul Kalam Technical University (AKTU), Lucknow. Maintained strong academic rigor alongside open-source software engineering.",
    contributions: [
      "Academic Performance: CGPA 8.6 / 10.0.",
      "Coursework: Operating Systems, Computer Networks, Compilers, Database Management Systems, Data Structures & Algorithms, Distributed Systems.",
      "Leadership & Community: Active technical mentoring, open-source workshops, and university hackathon participation.",
    ],
    technologies: ["Computer Science", "Algorithms", "Operating Systems", "Networking", "Database Systems"],
    badge: "CGPA: 8.6",
  },
];
