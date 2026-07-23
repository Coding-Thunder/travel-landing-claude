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
            d="M52.4 12.2 12.9 27.9c-1.5.6-1.4 2.8.1 3.3l15.6 5 5 15.6c.5 1.5 2.7 1.6 3.3.1l15.7-39.5c.5-1.4-.8-2.7-2.2-2.2Z"
          />
        </svg>
      </div>
    ),
    { ...size }
  );
}
