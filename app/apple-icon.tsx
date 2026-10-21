import { ImageResponse } from "next/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

/** Rental Confirmation compass-star mark on the midnight tile. */
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
              fill="none"
              stroke="#e8542c"
              strokeWidth={5.4}
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21 32.6 28.6 40.2 43.4 25.4"
            />
        </svg>
      </div>
    ),
    { ...size }
  );
}
