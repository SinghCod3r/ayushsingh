import { ImageResponse } from "next/og";

export const alt = "Ayush Singh (SinghCod3r) — Computer Science Engineer & Systems Architect";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          backgroundColor: "#08090c",
          padding: "60px 70px",
          fontFamily: "sans-serif",
          position: "relative",
          border: "2px solid rgba(0, 245, 212, 0.25)",
        }}
      >
        {/* Subtle Top Cyan Glow */}
        <div
          style={{
            position: "absolute",
            top: "-120px",
            left: "200px",
            width: "500px",
            height: "500px",
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(0, 245, 212, 0.18) 0%, transparent 70%)",
          }}
        />

        {/* Top Header Strip */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            width: "100%",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "12px",
            }}
          >
            <div
              style={{
                width: "14px",
                height: "14px",
                borderRadius: "50%",
                backgroundColor: "#00f5d4",
              }}
            />
            <span
              style={{
                color: "#00f5d4",
                fontSize: "24px",
                fontWeight: 700,
                letterSpacing: "1px",
              }}
            >
              SINGHCOD3R // PORTFOLIO
            </span>
          </div>

          <span
            style={{
              color: "#94a3b8",
              fontSize: "20px",
              fontWeight: 500,
            }}
          >
            singhcod3r.vercel.app
          </span>
        </div>

        {/* Middle Typography */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "14px",
            marginTop: "auto",
            marginBottom: "auto",
          }}
        >
          <h1
            style={{
              fontSize: "76px",
              fontWeight: 900,
              color: "#ffffff",
              lineHeight: 1.0,
              margin: 0,
              letterSpacing: "-2px",
            }}
          >
            AYUSH SINGH
          </h1>

          <p
            style={{
              fontSize: "30px",
              fontWeight: 400,
              color: "#38bdf8",
              margin: 0,
              lineHeight: 1.2,
            }}
          >
            Computer Science Engineer · Linux OpenPrinting Core Contributor
          </p>

          <p
            style={{
              fontSize: "22px",
              fontWeight: 300,
              color: "#94a3b8",
              margin: 0,
              maxWidth: "950px",
            }}
          >
            11+ Merged PRs in Linux system-config-printer · TCS Digital (NQT 2025) · Acxion Consulting (19 BC API Integrations) · B.Tech CSE (8.6 CGPA)
          </p>
        </div>

        {/* Bottom Feature Badges */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "16px",
            width: "100%",
            borderTop: "1px solid rgba(255, 255, 255, 0.12)",
            paddingTop: "24px",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              backgroundColor: "rgba(0, 245, 212, 0.12)",
              border: "1px solid rgba(0, 245, 212, 0.4)",
              borderRadius: "9999px",
              padding: "10px 22px",
              color: "#00f5d4",
              fontSize: "18px",
              fontWeight: 600,
            }}
          >
            Linux Foundation OpenPrinting
          </div>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              backgroundColor: "rgba(56, 189, 248, 0.12)",
              border: "1px solid rgba(56, 189, 248, 0.4)",
              borderRadius: "9999px",
              padding: "10px 22px",
              color: "#38bdf8",
              fontSize: "18px",
              fontWeight: 600,
            }}
          >
            19 BC API Integrations (Acxion)
          </div>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              backgroundColor: "rgba(255, 255, 255, 0.08)",
              border: "1px solid rgba(255, 255, 255, 0.15)",
              borderRadius: "9999px",
              padding: "10px 22px",
              color: "#f1f3f7",
              fontSize: "18px",
              fontWeight: 600,
            }}
          >
            TCS Digital · NQT 2025
          </div>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              backgroundColor: "rgba(168, 85, 247, 0.12)",
              border: "1px solid rgba(168, 85, 247, 0.4)",
              borderRadius: "9999px",
              padding: "10px 22px",
              color: "#c084fc",
              fontSize: "18px",
              fontWeight: 600,
            }}
          >
            B.Tech CSE (8.6 CGPA)
          </div>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
