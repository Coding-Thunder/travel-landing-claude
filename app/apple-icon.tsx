import { ImageResponse } from "next/og";
import { siteConfig } from "@/config/siteConfig";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

// Brand-aware Apple touch icon: brand initial on a blue rounded tile.
export default function AppleIcon() {
  const initial = siteConfig.name.trim().charAt(0).toUpperCase() || "C";
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(135deg,#2563eb,#1d4ed8)",
          color: "#fff",
          fontSize: 110,
          fontWeight: 800,
          borderRadius: 40,
        }}
      >
        {initial}
      </div>
    ),
    size,
  );
}
