export interface ArticleItem {
  id: string;
  title: string;
  description: string;
  category: "Linux & OpenPrinting" | "AI & Systems" | "Open Source Journey" | "Kernel & Drivers";
  date: string;
  readTime: string;
  url: string;
  tags: string[];
  accentColor: string;
  featured?: boolean;
}

export const articles: ArticleItem[] = [
  {
    id: "quit-open-source-gsoc-linux",
    title: "I Almost Quit Open Source After GSoC 2026. Then I Found My Way Back to Linux",
    description:
      "A personal retrospective on navigating open source setbacks, finding purpose in the Linux Foundation OpenPrinting ecosystem, and how tackling system-config-printer reignited engineering passion.",
    category: "Open Source Journey",
    date: "Medium Story",
    readTime: "6 min read",
    url: "https://singhcod3r.medium.com/i-almost-quit-open-source-after-gsoc-2026-then-system-config-printer-changed-everything-49ff8c2707d1",
    tags: ["Linux", "OpenPrinting", "Open Source", "system-config-printer", "GSoC"],
    accentColor: "#00f5d4",
    featured: true,
  },
  {
    id: "ai-agents-problem-containing-them",
    title: "AI Agents Are Getting More Powerful. The Next Big Problem Is Containing Them",
    description:
      "An architectural analysis of agent safety boundaries, runtime sandboxing, prompt injection mitigation, and the security challenges of granting autonomous LLM agents terminal and filesystem access.",
    category: "AI & Systems",
    date: "Technical Analysis",
    readTime: "7 min read",
    url: "https://singhcod3r.medium.com/ai-agents-are-getting-more-powerful-the-next-big-problem-is-containing-them-18c318ebbd29",
    tags: ["AI Agents", "LLM Security", "Sandboxing", "Infrastructure", "Systems"],
    accentColor: "#a855f7",
    featured: true,
  },
  {
    id: "fixing-dead-upstream-url-openprinting",
    title: "Fixing a Dead Upstream URL in OpenPrinting: A Small but Important Contribution",
    description:
      "Why upstream metadata integrity matters in Linux hardware compatibility, exploring driver indexes, and preserving legacy printer support across distributed distributions.",
    category: "Linux & OpenPrinting",
    date: "Engineering Note",
    readTime: "4 min read",
    url: "https://singhcod3r.medium.com/fixing-a-dead-upstream-url-in-openprinting-a-small-but-important-contribution-e07f94526d09",
    tags: ["OpenPrinting", "CUPS", "Linux", "Metadata", "Infrastructure"],
    accentColor: "#38bdf8",
    featured: true,
  },
  {
    id: "merged-pr-openprinting-splix-driver",
    title: "My Pull Request to OpenPrinting Got Merged: Fixing SpliX Driver Metadata",
    description:
      "Debugging driver metadata within the SpliX Samsung/Xerox printer driver suite, verifying PPD resolution, and landing a merged fix into upstream OpenPrinting repositories.",
    category: "Kernel & Drivers",
    date: "Merged PR Story",
    readTime: "5 min read",
    url: "https://singhcod3r.medium.com/my-pull-request-to-openprinting-got-merged-fixing-splix-driver-metadata-23558cb44dfc",
    tags: ["OpenPrinting", "SpliX", "CUPS", "PPD Drivers", "Linux"],
    accentColor: "#f59e0b",
    featured: true,
  },
  {
    id: "first-merged-pr-foomatic-db",
    title: "My First Merged Pull Request: Regenerating Printer Data from Foomatic-DB",
    description:
      "A deep dive into regenerating Linux printer capability databases from XML sources in Foomatic-DB, learning the Linux printing stack, and celebrating the milestone of a first upstream merge.",
    category: "Linux & OpenPrinting",
    date: "Milestone Story",
    readTime: "5 min read",
    url: "https://singhcod3r.medium.com/my-first-merged-pull-request-regenerating-printer-data-from-foomatic-db-eba2f7324b34",
    tags: ["Foomatic-DB", "Linux", "OpenPrinting", "First PR", "CUPS"],
    accentColor: "#10b981",
    featured: true,
  },
];
