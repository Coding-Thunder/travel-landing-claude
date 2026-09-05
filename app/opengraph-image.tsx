import { ImageResponse } from "next/og";
import { siteConfig } from "@/config/siteConfig";

export const alt = `${siteConfig.name}, Rent a Car Anywhere in the USA`;
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
          {/* The real brand mark, not an initial: the card is the first thing
              a shared link shows, so it has to match the favicon and header. */}
          <svg width="64" height="64" viewBox="0 0 64 64" style={{ display: "flex" }}>
            <rect width="64" height="64" rx="14" fill="#2563eb" />
            <g transform="translate(8,8) scale(2)" fill="#ffffff">
              <path d="M18.92 6.01C18.72 5.42 18.16 5 17.5 5h-11c-.66 0-1.21.42-1.42 1.01L3 12v8a1 1 0 0 0 1 1h1a1 1 0 0 0 1-1v-1h12v1a1 1 0 0 0 1 1h1a1 1 0 0 0 1-1v-8l-2.08-5.99zM6.5 16a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm11 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zM5 11l1.5-4.5h11L19 11H5z" />
            </g>
          </svg>
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
