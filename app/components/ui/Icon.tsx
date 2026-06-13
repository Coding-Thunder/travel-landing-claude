import type { IconName } from "@/config/siteConfig";

type Name = IconName | "facebook" | "instagram" | "x" | "linkedin";

// Icons drawn with fill (vs. the default stroke set).
const FILLED = new Set<Name>(["phone", "star", "car", "facebook", "instagram", "x", "linkedin"]);

const PATHS: Record<Name, React.ReactNode> = {
  phone: (
    <path d="M20.01 15.38c-1.23 0-2.42-.2-3.53-.56a.977.977 0 00-1.01.24l-1.57 1.97c-2.83-1.35-5.48-3.9-6.89-6.83l1.95-1.66c.27-.28.35-.67.24-1.02-.37-1.11-.56-2.3-.56-3.53 0-.54-.45-.99-.99-.99H4.19C3.65 3 3 3.24 3 3.99 3 13.28 10.73 21 20.01 21c.71 0 .99-.63.99-1.18v-3.45c0-.54-.45-.99-.99-.99z" />
  ),
  shield: (
    <>
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 3l7 3v5.5c0 4.2-2.9 7.4-7 8.5-4.1-1.1-7-4.3-7-8.5V6l7-3z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4" />
    </>
  ),
  map: (
    <>
      <path strokeLinecap="round" strokeLinejoin="round" d="M3 7l6-3 6 3 6-3v13l-6 3-6-3-6 3V7z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 4v13M15 7v13" />
    </>
  ),
  tag: (
    <>
      <path strokeLinecap="round" strokeLinejoin="round" d="M3 7v5l9 9 7-7-9-9H3z" />
      <circle cx="7.5" cy="7.5" r="1.4" />
    </>
  ),
  users: (
    <>
      <path strokeLinecap="round" strokeLinejoin="round" d="M16 19a4 4 0 00-8 0" />
      <circle cx="12" cy="9" r="3" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M20 18a3 3 0 00-3-3M4 18a3 3 0 013-3" />
    </>
  ),
  star: (
    <path d="M12 2l2.9 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l7.1-1.01L12 2z" />
  ),
  clock: (
    <>
      <circle cx="12" cy="12" r="8.5" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4.5l3 1.8" />
    </>
  ),
  check: <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />,
  bolt: <path strokeLinecap="round" strokeLinejoin="round" d="M13 2L4 14h6l-1 8 9-12h-6l1-8z" />,
  calendar: (
    <>
      <rect x="3.5" y="5" width="17" height="15" rx="2.5" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M3.5 9.5h17M8 3v4M16 3v4" />
    </>
  ),
  lock: (
    <>
      <rect x="5" y="11" width="14" height="9" rx="2" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M8 11V8a4 4 0 018 0v3" />
    </>
  ),
  headset: (
    <>
      <path strokeLinecap="round" strokeLinejoin="round" d="M4 13v-1a8 8 0 0116 0v1" />
      <rect x="3" y="13" width="4" height="6" rx="1.5" />
      <rect x="17" y="13" width="4" height="6" rx="1.5" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M21 19a4 4 0 01-4 4h-3" />
    </>
  ),
  plane: (
    <path strokeLinecap="round" strokeLinejoin="round" d="M21 15.5l-8-4.5V4.5a1.5 1.5 0 00-3 0V11l-8 4.5V18l8-2.2V20l-2.2 1.5V23l3.7-1 3.7 1v-1.5L13 20v-4.2l8 2.2v-2.5z" />
  ),
  wrench: (
    <path strokeLinecap="round" strokeLinejoin="round" d="M15.5 6.5a3.5 3.5 0 00-4.6 4.6L4 18l2 2 6.9-6.9a3.5 3.5 0 004.6-4.6l-2.4 2.4-2-2 2.4-2.4z" />
  ),
  sparkles: (
    <>
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 4l1.6 4.4L18 10l-4.4 1.6L12 16l-1.6-4.4L6 10l4.4-1.6L12 4z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M18.5 14.5l.7 1.8 1.8.7-1.8.7-.7 1.8-.7-1.8-1.8-.7 1.8-.7.7-1.8z" />
    </>
  ),
  car: (
    <path d="M18.92 6.01C18.72 5.42 18.16 5 17.5 5h-11c-.66 0-1.21.42-1.42 1.01L3 12v8a1 1 0 001 1h1a1 1 0 001-1v-1h12v1a1 1 0 001 1h1a1 1 0 001-1v-8l-2.08-5.99zM6.5 16a1.5 1.5 0 110-3 1.5 1.5 0 010 3zm11 0a1.5 1.5 0 110-3 1.5 1.5 0 010 3zM5 11l1.5-4.5h11L19 11H5z" />
  ),
  facebook: (
    <path d="M22 12a10 10 0 10-11.56 9.88v-6.99H7.9V12h2.54V9.8c0-2.5 1.49-3.89 3.78-3.89 1.09 0 2.24.2 2.24.2v2.46h-1.26c-1.24 0-1.63.77-1.63 1.56V12h2.78l-.44 2.89h-2.34v6.99A10 10 0 0022 12z" />
  ),
  instagram: (
    <path d="M12 2.2c3.2 0 3.58.01 4.85.07 1.17.05 1.8.25 2.23.41.56.22.96.48 1.38.9.42.42.68.82.9 1.38.16.42.36 1.06.41 2.23.06 1.27.07 1.65.07 4.85s-.01 3.58-.07 4.85c-.05 1.17-.25 1.8-.41 2.23-.22.56-.48.96-.9 1.38-.42.42-.82.68-1.38.9-.42.16-1.06.36-2.23.41-1.27.06-1.65.07-4.85.07s-3.58-.01-4.85-.07c-1.17-.05-1.8-.25-2.23-.41a3.7 3.7 0 01-1.38-.9 3.7 3.7 0 01-.9-1.38c-.16-.42-.36-1.06-.41-2.23C2.21 15.58 2.2 15.2 2.2 12s.01-3.58.07-4.85c.05-1.17.25-1.8.41-2.23.22-.56.48-.96.9-1.38.42-.42.82-.68 1.38-.9.42-.16 1.06-.36 2.23-.41C8.42 2.21 8.8 2.2 12 2.2zm0 3.05A6.75 6.75 0 1018.75 12 6.75 6.75 0 0012 5.25zm0 11.13A4.38 4.38 0 1116.38 12 4.38 4.38 0 0112 16.38zm6.99-11.4a1.58 1.58 0 11-1.58-1.58 1.58 1.58 0 011.58 1.58z" />
  ),
  x: (
    <path d="M17.53 3H20l-6.06 6.93L21 21h-5.6l-4.38-5.73L5.99 21H3.5l6.49-7.42L3 3h5.74l3.96 5.24L17.53 3zm-.98 16h1.54L7.53 4.5H5.88L16.55 19z" />
  ),
  linkedin: (
    <path d="M4.98 3.5A2.5 2.5 0 002.5 6a2.5 2.5 0 002.48 2.5A2.5 2.5 0 007.5 6a2.5 2.5 0 00-2.52-2.5zM3 9h4v12H3V9zm6 0h3.8v1.64h.05c.53-.95 1.83-1.95 3.76-1.95C20.4 8.69 22 10.3 22 13.6V21h-4v-6.5c0-1.55-.03-3.55-2.16-3.55-2.16 0-2.49 1.69-2.49 3.43V21H9V9z" />
  ),
};

export default function Icon({
  name,
  className = "h-5 w-5",
}: {
  name: Name;
  className?: string;
}) {
  const filled = FILLED.has(name);
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      aria-hidden="true"
      fill={filled ? "currentColor" : "none"}
      stroke={filled ? "none" : "currentColor"}
      strokeWidth={filled ? undefined : 1.8}
    >
      {PATHS[name]}
    </svg>
  );
}
