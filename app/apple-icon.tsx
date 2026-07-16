import { ImageResponse } from "next/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

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
          backgroundImage: "linear-gradient(135deg, #3168ea, #1a3a89)",
        }}
      >
        <svg width="118" height="118" viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">
          <path
            fill="#ffffff"
            d="M32 12c-8.8 0-15.5 6.8-15.5 15.4 0 10.7 13.6 22.2 14.9 23.2a1 1 0 0 0 1.2 0c1.3-1 14.9-12.5 14.9-23.2C47.5 18.8 40.8 12 32 12Z"
          />
          <circle cx="32" cy="27" r="5.4" fill="#22409f" />
        </svg>
      </div>
    ),
    { ...size }
  );
}
