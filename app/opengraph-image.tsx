import { ImageResponse } from "next/og";
import { siteConfig } from "@/config/siteConfig";

export const alt = `${siteConfig.name} — Rent a Car Anywhere in the USA`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// Brand-aware Open Graph / Twitter card generated at build time.
// Note: only Latin text + explicit display:flex divs (next/og / Satori constraints).
export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 80,
          background: "linear-gradient(135deg,#0f172a 0%,#1d4ed8 100%)",
          color: "#fff",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          <div
            style={{
              width: 64,
              height: 64,
              borderRadius: 16,
              background: "#2563eb",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 36,
              fontWeight: 800,
            }}
          >
            {siteConfig.name.trim().charAt(0).toUpperCase()}
          </div>
          <div style={{ fontSize: 36, fontWeight: 700 }}>{siteConfig.name}</div>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 68, fontWeight: 800, lineHeight: 1.05 }}>
            Rent a Car Anywhere in the USA
          </div>
          <div style={{ fontSize: 34, color: "#bfdbfe", fontWeight: 600, marginTop: 16 }}>
            {`No hidden fees · Free cancellation · Call ${siteConfig.phoneVanity}`}
          </div>
        </div>

        <div style={{ fontSize: 26, color: "#e2e8f0" }}>
          {`Rated ${siteConfig.trust.rating}/5 · 300+ locations · 50 states · 24/7 support`}
        </div>
      </div>
    ),
    size,
  );
}
