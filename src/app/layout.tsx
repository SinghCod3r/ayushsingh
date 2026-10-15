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

export const viewport: Viewport = {
  themeColor: "#08090c",
  colorScheme: "dark",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  title: "Ayush Singh | Computer Science Engineer & Systems Developer",
  description:
    "Interactive digital portfolio of Ayush Singh (SinghCod3r). Open-source contributor in Linux OpenPrinting, full-stack engineer, Python systems builder, and AI application developer.",
  keywords: [
    "Ayush Singh",
    "SinghCod3r",
    "Computer Science Engineer",
    "Open Source Developer",
    "Linux OpenPrinting",
    "system-config-printer",
    "Python Developer",
    "Full Stack Developer",
    "Three.js Portfolio",
  ],
  authors: [{ name: "Ayush Singh", url: "https://github.com/SinghCod3r" }],
  creator: "Ayush Singh",
  openGraph: {
    title: "Ayush Singh — Computer Science Engineer & Open Source Developer",
    description:
      "Interactive digital identity & portfolio. Linux OpenPrinting contributor, AI builder, systems engineer.",
    url: "https://github.com/SinghCod3r",
    siteName: "Ayush Singh Portfolio",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Ayush Singh | Computer Science Engineer",
    description:
      "Open-source contributor in Linux OpenPrinting, full-stack engineer, Python systems builder.",
  },
  robots: {
    index: true,
    follow: true,
  },
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
      <body className="min-h-screen bg-[#08090c] text-[#f1f3f7] antialiased selection:bg-[#00f5d4]/20 selection:text-white relative">
        {children}
      </body>
    </html>
  );
}
