export interface BookData {
  title: string;
  subtitle: string;
  author: string;
  genre: string;
  format: string;
  publisherPlatform: string;
  url: string; // The user will paste their actual book link here
  synopsis: string;
  themes: string[];
  quote: string;
  excerptSnippet: string;
}

export const featuredBook: BookData = {
  title: "The Last Human Update",
  subtitle: "A Sci-Fi Psychological Thriller",
  author: "Ayush Singh",
  genre: "Sci-Fi / Psychological Thriller",
  format: "Paperback & Digital Edition",
  publisherPlatform: "Pothi.com Publishing",
  url: "", // User will paste their actual Pothi.com or store URL here
  synopsis:
    "An intense, high-concept psychological thriller examining the blurred frontier between cognitive autonomy, artificial consciousness, and societal synchronization. When human perception itself becomes an updated protocol, the cost of staying unpatched becomes fatal.",
  themes: [
    "Algorithmic Determinism vs. Human Free Will",
    "Psychological Fragmentation & Digital Isolation",
    "Systemic Optimization at the Cost of Consciousness",
    "The Fragility of Biological Identity",
  ],
  quote:
    "“When consciousness is treated like deprecated legacy code, who decides which version of you gets deleted?”",
  excerptSnippet:
    "The telemetry stream didn't warn them. It arrived like an unscheduled routine patch in the dead hours of morning—quiet, mandatory, and irreversible. By the time the sensory latency cleared, the world outside was no longer running on biological consensus...",
};

