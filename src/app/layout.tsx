import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

const siteUrl = "https://singhcod3r.vercel.app";

export const viewport: Viewport = {
  themeColor: "#08090c",
  colorScheme: "dark",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Ayush Singh (SinghCod3r) | Computer Science Engineer & Systems Developer",
    template: "%s | Ayush Singh (SinghCod3r)",
  },
  description:
    "Official digital portfolio of Ayush Singh (SinghCod3r / ayushsinghceee). Computer Science Engineer, Linux Foundation OpenPrinting core contributor (11+ PRs in system-config-printer), TCS Digital candidate (NQT 2025), Trainee Technical Consultant at Acxion Consulting (19 BC API Integrations), and systems architect.",
  keywords: [
    // Primary Name Variants & Aliases
    "Ayush Singh",
    "SinghCod3r",
    "singhcod3r",
    "Singh Ayush",
    "Engineer Ayush Singh",
    "Er. Ayush Singh",
    "Er Ayush Singh",
    "Er.Ayush Singh",
    "ayushsinghceee",
    "ayushsingh",
    "ayush singh ceee",
    "Ayush Singh Lucknow",

    // Specific Search Target Phrases
    "Ayush Singh OSS",
    "Ayush Singh Open Source",
    "Ayush Singh Tcs",
    "Ayush Singh TCS",
    "Ayush Singh TCS Digital",
    "Ayush Singh NQT 2025",
    "Ayush Singh OpenPrinting",
    "Ayush Singh Linux",
    "Ayush Singh SRM-CEM",
    "Ayush Singh SRMCEM",
    "Ayush Singh AKTU",
    "Ayush Singh Acxion",
    "Ayush Singh Acxion Consulting",
    "Ayush Singh 19 BC API Integrations",
    "Ayush Singh Business Central",
    "Ayush Singh Apollo Project",
    "Ayush Singh Floor and Furnishing",

    // Target Vercel Portfolio Domains
    "singhcod3r.vercel.app",
    "singhayush.vercel.app",
    "ayushsinghcs.vercel.app",

    // Core Contributions & Projects
    "system-config-printer contributor",
    "Linux OpenPrinting PRs",
    "The Last Manual Merge Ayush Singh",
    "The Road I Chose Ayush Singh",
    "SkillFoundry CLI Ayush Singh",
    "MoodBite AI Ayush Singh",
    "Ezy programming language Ayush Singh",

    // Technical Specializations
    "Computer Science Engineer",
    "Systems Engineer",
    "Linux Desktop Foundation",
    "GLib D-Bus Asynchronous Concurrency",
    "CUPS Driverless Printing",
    "Full Stack Developer India",
    "Three.js Portfolio",
  ],
  authors: [
    { name: "Ayush Singh", url: siteUrl },
    { name: "SinghCod3r", url: "https://github.com/SinghCod3r" },
  ],
  creator: "Ayush Singh (SinghCod3r)",
  publisher: "Ayush Singh",
  applicationName: "Ayush Singh Engineering Portfolio",
  alternates: {
    canonical: siteUrl,
    languages: {
      "en-US": siteUrl,
    },
  },
  openGraph: {
    title: "Ayush Singh (SinghCod3r) — Computer Science Engineer & Systems Architect",
    description:
      "Official portfolio of Ayush Singh. Core Linux OpenPrinting contributor, TCS Digital (NQT 2025), Acxion Consulting (19 BC API Integrations), systems & full-stack engineer.",
    url: siteUrl,
    siteName: "Ayush Singh (SinghCod3r) Portfolio",
    locale: "en_US",
    type: "profile",
    firstName: "Ayush",
    lastName: "Singh",
    username: "SinghCod3r",
    emails: ["ayushsinghceee@gmail.com"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Ayush Singh (SinghCod3r) | Computer Science Engineer",
    description:
      "Core Linux OpenPrinting contributor (11+ PRs), TCS Digital (NQT 2025), Acxion Consulting (19 BC API Integrations), systems & full-stack builder.",
    creator: "@singhcod3r",
    site: "@singhcod3r",
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  category: "technology",
};

// Comprehensive Schema.org JSON-LD Structured Data for Google Knowledge Graph & High-Ranking Entity Matching
const jsonLdData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Person",
      "@id": `${siteUrl}/#person`,
      name: "Ayush Singh",
      givenName: "Ayush",
      familyName: "Singh",
      alternateName: [
        "SinghCod3r",
        "singhcod3r",
        "Singh Ayush",
        "Engineer Ayush Singh",
        "Er. Ayush Singh",
        "Er Ayush Singh",
        "Er.Ayush Singh",
        "ayushsinghceee",
        "ayushsingh",
        "Ayush Singh OSS",
        "Ayush Singh Open Source",
        "Ayush Singh TCS",
      ],
      url: siteUrl,
      image: `${siteUrl}/opengraph-image`,
      email: "mailto:ayushsinghceee@gmail.com",
      jobTitle: "Computer Science Engineer & Systems Architect",
      telephone: "",
      address: {
        "@type": "PostalAddress",
        addressLocality: "Lucknow",
        addressRegion: "Uttar Pradesh",
        addressCountry: "India",
      },
      alumniOf: {
        "@type": "EducationalOrganization",
        name: "Shri Ramswaroop Memorial College of Engineering and Management (SRM-CEM / SRMCM)",
        parentOrganization: {
          "@type": "EducationalOrganization",
          name: "Dr. A.P.J. Abdul Kalam Technical University (AKTU), Lucknow",
        },
      },
      worksFor: {
        "@type": "Organization",
        name: "Acxion Consulting",
        description: "Enterprise ERP Consultant (Microsoft Dynamics 365 Business Central, 19 BC API Integrations, Apollo Project, Floor & Furnishing Project)",
      },
      memberOf: [
        {
          "@type": "Organization",
          name: "The Linux Foundation / OpenPrinting",
          url: "https://openprinting.github.io",
        },
      ],
      description:
        "Ayush Singh (SinghCod3r / ayushsinghceee) is a Computer Science Engineer (B.Tech CSE 2026, 8.6 CGPA), core open-source contributor in Linux Foundation OpenPrinting (11+ merged PRs in system-config-printer), TCS Digital candidate (NQT 2025), Trainee Technical Consultant at Acxion Consulting (19 BC API Integrations), and published author.",
      sameAs: [
        "https://github.com/SinghCod3r",
        "https://linkedin.com/in/singhcod3r",
        "https://singhcod3r.medium.com",
        "https://store.pothi.com/book/er-ayush-singh-last-manual-merge/",
        "https://store.pothi.com/book/er-ayush-singh-road-i-chose/",
        "https://singhcod3r.vercel.app",
        "https://singhayush.vercel.app",
        "https://ayushsinghcs.vercel.app",
      ],
      knowsAbout: [
        "Linux Kernel IPC",
        "system-config-printer",
        "OpenPrinting",
        "CUPS",
        "GTK 3",
        "GLib",
        "D-Bus Concurrency",
        "Python",
        "TypeScript",
        "Next.js",
        "TCS Digital",
        "TCS NQT 2025",
        "Microsoft Dynamics 365 Business Central",
        "19 BC API Integrations",
        "AL Language",
        "Compilers",
        "Ollama Local LLMs",
        "Three.js / WebGL",
      ],
    },
    {
      "@type": "WebSite",
      "@id": `${siteUrl}/#website`,
      url: siteUrl,
      name: "Ayush Singh (SinghCod3r) Engineering Portfolio",
      alternateName: [
        "SinghCod3r Portfolio",
        "Ayush Singh Portfolio",
        "singhcod3r.vercel.app",
        "singhayush.vercel.app",
      ],
      publisher: {
        "@id": `${siteUrl}/#person`,
      },
      inLanguage: "en-US",
    },
    {
      "@type": "ProfilePage",
      "@id": `${siteUrl}/#webpage`,
      url: siteUrl,
      name: "Ayush Singh (SinghCod3r) — Computer Science Engineer & Systems Architect",
      mainEntity: {
        "@id": `${siteUrl}/#person`,
      },
      about: {
        "@id": `${siteUrl}/#person`,
      },
    },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} dark scroll-smooth`}
    >
      <head>
        {/* Schema.org Structured Data for Google Knowledge Panel & Search Ranking */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdData) }}
        />
        {/* Additional Search Engine Directives */}
        <meta name="author" content="Ayush Singh (SinghCod3r)" />
        <meta
          name="subject"
          content="Ayush Singh (SinghCod3r) Portfolio, Linux OpenPrinting Contributor, TCS Digital, Acxion Consulting"
        />
        <meta name="rating" content="General" />
        <meta name="referrer" content="origin-when-cross-origin" />
      </head>
      <body className="min-h-screen bg-[#08090c] text-[#f1f3f7] antialiased selection:bg-[#00f5d4]/20 selection:text-white relative">
        {children}
      </body>
    </html>
  );
}
