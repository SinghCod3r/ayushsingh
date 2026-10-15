export interface ArticleItem {
  id: string;
  title: string;
  description: string;
  category: "Systems & Linux" | "Open Source" | "Software Architecture" | "Engineering Reflections";
  date: string;
  readTime: string;
  url: string; // The user will paste their actual Medium or blog URLs here
  tags: string[];
  featured?: boolean;
}

export const articles: ArticleItem[] = [
  {
    id: "demystifying-driverless-linux-printing",
    title: "Debugging Asynchronous Event Loops in GTK3: Eliminating UI Freezes",
    description:
      "A deep dive into thread isolation, GLib idle dispatching, and state-machine recovery when offloading blocking hardware validation away from desktop GUI threads.",
    category: "Systems & Linux",
    date: "Technical Essay",
    readTime: "7 min read",
    url: "", // Easy placeholder for user's actual Medium article URL
    tags: ["Linux", "GTK3", "GLib", "Threading", "CUPS"],
    featured: true,
  },
  {
    id: "open-source-signal-noise",
    title: "The Architecture of a High-Signal Pull Request in Open Source",
    description:
      "Practical lessons from 11+ merged pull requests in system-config-printer: handling maintainer feedback, writing regression tests, and navigating complex upstream ecosystems.",
    category: "Open Source",
    date: "Engineering Guide",
    readTime: "6 min read",
    url: "",
    tags: ["Open Source", "Code Quality", "Git", "Collaboration"],
    featured: true,
  },
  {
    id: "building-custom-interpreters-in-python",
    title: "Building a Tree-Walk Interpreter from Scratch in Python",
    description:
      "Exploring lexical analysis, Pratt-style operator precedence, AST token trees, and lexical environment scopes through the design of the Ezy scripting runtime.",
    category: "Software Architecture",
    date: "Systems Deep Dive",
    readTime: "9 min read",
    url: "",
    tags: ["Compilers", "Python", "AST", "Language Design"],
    featured: true,
  },
];

