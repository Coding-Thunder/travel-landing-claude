import { ImageResponse } from "next/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

/** Flight Bizz compass-star mark on the midnight tile. */
export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundImage: "linear-gradient(135deg, #21404c, #0c1c24)",
        }}
      >
        <svg width="132" height="132" viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">
          <circle cx="32" cy="32" r="22.5" fill="none" stroke="#d0a955" strokeOpacity="0.45" strokeWidth="1.2" />
          <path
            fill="#e8542c"
            d="M32 10.5 36.2 27.8 53.5 32 36.2 36.2 32 53.5 27.8 36.2 10.5 32 27.8 27.8Z"
          />
        </svg>
      </div>
    ),
    { ...size }
  );
}
