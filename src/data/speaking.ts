export interface SpeakingItem {
  id: string;
  title: string;
  event: string;
  host: string;
  location: string;
  date: string;
  scheduleTime?: string;
  coSpeaker?: string;
  status: "Accepted & Scheduled" | "Delivered / Recorded";
  abstract: string;
  keyTopics: string[];
  link?: string;
}

export const speakingEngagements: SpeakingItem[] = [
  {
    id: "oosc-4-ai-overload",
    title: "AI Overload: How Careless AI Usage Is Quietly Killing Pull Request Quality",
    event: "Open Source Conference 4.0 (OOSC 4.0)",
    host: "IIIT Allahabad",
    location: "Prayagraj / Allahabad, India",
    date: "August 28–30, 2026",
    scheduleTime: "August 30, 2026 — 2:30 PM IST",
    coSpeaker: "Pankaj Kumar",
    status: "Accepted & Scheduled",
    abstract:
      "A pragmatic analysis of how unchecked AI code impacts repository health, introduces subtle regressions, and how to maintain high signal in open-source contributions.",
    keyTopics: [
      "Maintainer triage fatigue",
      "Architectural coherence vs. superficial edits",
      "Local verification patterns before PR submission",
    ],
  },
  {
    id: "zero-to-open-source",
    title: "From Zero to Open Source: The Roadmap Every Beginner Wishes They Had",
    event: "Developer Community Workshop",
    host: "Community Tech Sessions",
    location: "Online / Hybrid",
    date: "Community Presentation",
    status: "Delivered / Recorded",
    abstract:
      "Demystifying contributions to large-scale Linux codebases: navigating multi-thousand line trees, system daemons, and building collaborative trust with upstream maintainers.",
    keyTopics: [
      "Navigating large codebases",
      "Build systems & local reproduction",
      "Iterative refactoring & code reviews",
    ],
  },
];
