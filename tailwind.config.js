/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./data.ts"
  ],
  theme: {
    extend: {
      colors: {
        background: "#080909",
        surface: "#101112",
        "surface-card": "rgba(255, 255, 255, 0.03)",
        "surface-border": "rgba(255, 255, 255, 0.08)",
        primary: "#F2F0E8",
        muted: "#8A8A8A",
        accent: {
          yellow: "#F5D52F",
          amber: "#F5D52F",
        },
      },
      fontFamily: {
        sans: ["Inter", "-apple-system", "BlinkMacSystemFont", "Segoe UI", "Roboto", "sans-serif"],
        display: ["Bebas Neue", "Anton", "Inter", "sans-serif"],
        mono: ["JetBrains Mono", "Fira Code", "monospace"],
      },
      letterSpacing: {
        condensed: "0.02em",
        tightest: "-0.04em",
      },
    },
  },
  plugins: [],
}

