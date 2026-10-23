import type { Metadata, Viewport } from "next";
import "@fontsource-variable/bricolage-grotesque";
import "@fontsource-variable/hanken-grotesk";
import "./globals.css";
import { Intro } from "@/components/intro";
import { Nav } from "@/components/nav";
import { SmoothScroll } from "@/components/smooth-scroll";
import { ThemeProvider } from "@/components/theme-provider";

export const metadata: Metadata = {
  title: "Ayush Singh",
  description:
    "Software engineer in Lucknow building web apps and AI tools, and maintaining parts of OpenPrinting.",
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f5f5f5" },
    { media: "(prefers-color-scheme: dark)", color: "#070707" },
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Without JavaScript, skip the intro and show the text. */}
        <noscript>
          <style>{`.intro{display:none!important}.k-char{transform:none!important}.k-word{opacity:1!important}`}</style>
        </noscript>
      </head>
      <body>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <SmoothScroll />
          <Intro />
          <Nav />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
