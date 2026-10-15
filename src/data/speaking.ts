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
    location: "Prayagraj / Allahabad, Uttar Pradesh, India",
    date: "August 28–30, 2026",
    scheduleTime: "August 30, 2026 — 2:30 PM IST",
    coSpeaker: "Pankaj Kumar",
    status: "Accepted & Scheduled",
    abstract:
      "A pragmatic look at how unchecked copy-pasted LLM code compromises repository health, increases maintainer fatigue, and introduces subtle architectural debt. Explores concrete strategies for maintaining high signal-to-noise ratio in open-source contributions while leveraging AI responsibly.",
    keyTopics: [
      "Maintainer triage fatigue and hallucinated dependencies",
      "Architectural coherence vs. superficial line changes",
      "Rigorous local verification patterns before submission",
      "Actionable guidelines for open-source newcomers",
    ],
  },
  {
    id: "zero-to-open-source",
    title: "From Zero to Open Source: The Roadmap Every Beginner Wishes They Had",
    event: "Developer Community Workshop & Mentorship Track",
    host: "Community Tech Sessions",
    location: "Online / Hybrid",
    date: "Community Presentation",
    status: "Delivered / Recorded",
    abstract:
      "Demystifying the process of contributing to large-scale Linux and developer ecosystems. Covers navigation of multi-thousand line codebases, mailing list protocols, D-Bus/system daemon debugging, and building collaborative trust with upstream maintainers.",
    keyTopics: [
      "Navigating legacy codebases without fear",
      "Understanding build systems and local reproduction environments",
      "Writing courteous, high-context pull request descriptions",
      "Surviving code reviews and iterative refactoring",
    ],
  },
];
