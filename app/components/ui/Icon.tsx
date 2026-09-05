import type { IconName } from "@/config/siteConfig";

/**
 * The My Budget Car icon family.
 *
 * ONE drawing language, so a page of these reads as a designed set rather than
 * an assortment:
 *   • 24x24 viewBox, artwork on a 20px live area (2px optical margin).
 *   • Outline only. `currentColor` stroke, 1.75 weight, round caps and joins.
 *   • Vehicles share a common baseline (y=16.5) and wheel geometry (r=1.9 at
 *     x=7 and x=17), so the classes read as one fleet rather than five
 *     unrelated silhouettes.
 *   • Corners are radiused ~1.2 units. Nothing is drawn with a hard 90 degrees
 *     except deliberate structure (license card, luggage).
 *
 * Social marks are the exception: those are third-party brand assets, must be
 * reproduced as filled logos, and are kept out of the outline family below.
 *
 * No icon library is loaded for these. Each glyph is a handful of paths, and
 * the set ships as part of the server-rendered HTML.
 */

type OutlineName =
  | IconName
  | "airport"
  | "suv"
  | "minivan"
  | "pickup"
  | "electric"
  | "pin"
  | "search"
  | "oneWay"
  | "mileage"
  | "license"
  | "key"
  | "fuel"
  | "luggage"
  | "help"
  | "mail"
  | "arrowRight"
  | "chevronDown"
  | "chevronUp"
  | "chevronLeft"
  | "chevronRight"
  | "menu"
  | "close"
  | "plus"
  | "minus";

type BrandName = "facebook" | "instagram" | "x" | "linkedin";

export type Name = OutlineName | BrandName;

/* Shared vehicle geometry. Every vehicle sits on the same baseline with the
   same wheels, which is what makes the class icons look like one family. */
const WHEELS = (
  <>
    <circle cx="7" cy="16.5" r="1.9" />
    <circle cx="17" cy="16.5" r="1.9" />
  </>
);
/* The chassis line, broken where the wheels interrupt it. */
const CHASSIS = <path d="M3.5 16.5h1.6M8.9 16.5h6.2M18.9 16.5h1.6" />;

/**
 * Airport, drawn as a terminal and control tower rather than an aircraft.
 *
 * This site sells car rental, so an aeroplane in the icon set is off-brand —
 * and this glyph only ever labels "Airport Pickup", "Airport convenience" and
 * "Airport car rentals", where the word does the naming and the mark supports
 * it. Shared by the `airport` key and the legacy `plane` key that `siteConfig`
 * still refers to.
 */
const AIRPORT = (
  <>
    <path d="M2.6 20.6h18.8" />
    <path d="M4.2 20.6v-5.3a1.7 1.7 0 0 1 1.7-1.7h6.6a1.7 1.7 0 0 1 1.7 1.7v5.3" />
    <path d="M6.9 17.2h1.3M10.4 17.2h1.3" />
    <path d="M16.5 20.6V8.9l2.1-1.7 2.1 1.7v11.7" />
    <path d="M16.5 12.1h4.2" />
    <path d="M18.6 7.2V4.4" />
  </>
);

const OUTLINE: Record<OutlineName, React.ReactNode> = {
  /* ---------------- Vehicles ---------------- */
  car: (
    <>
      <path d="M3.5 16.5v-3.3a1.2 1.2 0 0 1 .9-1.16l1.75-.44 2.1-3.6A2.2 2.2 0 0 1 10.15 6.9h3.7a2.2 2.2 0 0 1 1.9 1.09l2.1 3.6 1.75.44a1.2 1.2 0 0 1 .9 1.16v3.3" />
      <path d="M6.15 11.6h11.7" />
      {CHASSIS}
      {WHEELS}
    </>
  ),
  suv: (
    <>
      <path d="M3.5 16.5v-4.1a1.2 1.2 0 0 1 .9-1.16l1.4-.35V7.6A1.2 1.2 0 0 1 7 6.4h10a1.2 1.2 0 0 1 1.2 1.2v3.29l1.4.35a1.2 1.2 0 0 1 .9 1.16v4.1" />
      <path d="M5.8 10.9h12.4" />
      {CHASSIS}
      {WHEELS}
    </>
  ),
  minivan: (
    <>
      <path d="M3.4 16.5v-4.6a1.4 1.4 0 0 1 .55-1.11l4.3-3.34A2.4 2.4 0 0 1 9.72 6.9h7.48a1.4 1.4 0 0 1 1.4 1.4v8.2" />
      <path d="M4.6 11.5h14" />
      <path d="M12.4 11.5v5" />
      {CHASSIS}
      {WHEELS}
    </>
  ),
  pickup: (
    <>
      <path d="M3.4 16.5v-3.9a1.2 1.2 0 0 1 .9-1.16l1.3-.33 1.95-3.4A2.2 2.2 0 0 1 9.47 6.6h2.63a1.3 1.3 0 0 1 1.3 1.3v4.3h6.4a1.2 1.2 0 0 1 1.2 1.2v3.1" />
      <path d="M3.4 12.2h10" />
      <path d="M6.2 11.1h7.2" />
      {CHASSIS}
      {WHEELS}
    </>
  ),
  electric: (
    <>
      <path d="M9 3.4v4.2M15 3.4v4.2" />
      <path d="M6.6 7.6h10.8v3.3a5.4 5.4 0 0 1-10.8 0Z" />
      <path d="M12 16.3v4.3" />
    </>
  ),

  /* ---------------- Place and journey ---------------- */
  pin: (
    <>
      <path d="M12 20.8s6.8-5.6 6.8-10.8a6.8 6.8 0 1 0-13.6 0c0 5.2 6.8 10.8 6.8 10.8Z" />
      <circle cx="12" cy="10" r="2.5" />
    </>
  ),
  map: (
    <>
      <path d="M3.2 6.9 9 4.2l6 2.7 5.8-2.7v12.9L15 19.8l-6-2.7-5.8 2.7Z" />
      <path d="M9 4.2v12.9M15 6.9v12.9" />
    </>
  ),
  plane: AIRPORT,
  airport: AIRPORT,


  oneWay: (
    <>
      <circle cx="4.8" cy="12" r="2.2" />
      <path d="M7.6 12h8.6" />
      <path d="M12.9 8.4 16.5 12l-3.6 3.6" />
    </>
  ),
  mileage: (
    <>
      <path d="M4 16.8a9 9 0 1 1 16 0" />
      <path d="m12 12.6 3.6-3.2" />
      <circle cx="12" cy="16.8" r="1.2" />
    </>
  ),
  fuel: (
    <>
      <path d="M4.4 20V5.4A1.4 1.4 0 0 1 5.8 4h5.6a1.4 1.4 0 0 1 1.4 1.4V20" />
      <path d="M3.2 20h11M4.4 11.2h8.4" />
      <path d="M12.8 8.6h2.6a1.4 1.4 0 0 1 1.4 1.4v5.4a1.6 1.6 0 0 0 3.2 0V9.4l-2.1-2.1" />
    </>
  ),

  /* ---------------- Booking and support ---------------- */
  phone: (
    <path d="M7.1 3.6H4.7A1.6 1.6 0 0 0 3.1 5.2C3.1 13.9 10.1 20.9 18.8 20.9a1.6 1.6 0 0 0 1.6-1.6v-2.2a1.1 1.1 0 0 0-.87-1.07l-3.3-.73a1.1 1.1 0 0 0-1.1.41l-1.05 1.35a13.5 13.5 0 0 1-5.85-5.85l1.35-1.05a1.1 1.1 0 0 0 .41-1.1L8.17 4.47A1.1 1.1 0 0 0 7.1 3.6Z" />
  ),
  headset: (
    <>
      <path d="M4.3 13.6v-1.7a7.7 7.7 0 0 1 15.4 0v1.7" />
      <path d="M3.2 14.4a1.4 1.4 0 0 1 1.4-1.4h1.5v5.2H4.6a1.4 1.4 0 0 1-1.4-1.4Z" />
      <path d="M20.8 14.4a1.4 1.4 0 0 0-1.4-1.4h-1.5v5.2h1.5a1.4 1.4 0 0 0 1.4-1.4Z" />
      <path d="M19.4 18.2a2.8 2.8 0 0 1-2.8 2.8h-2.1" />
    </>
  ),
  calendar: (
    <>
      <rect x="3.2" y="4.8" width="17.6" height="15.4" rx="2.4" />
      <path d="M3.2 9.4h17.6M8.2 2.9v3.8M15.8 2.9v3.8" />
    </>
  ),
  clock: (
    <>
      <circle cx="12" cy="12" r="8.6" />
      <path d="M12 7.2v5.1l3.2 1.9" />
    </>
  ),
  search: (
    <>
      <circle cx="10.7" cy="10.7" r="6.4" />
      <path d="m15.4 15.4 5 5" />
    </>
  ),
  mail: (
    <>
      <rect x="2.8" y="4.9" width="18.4" height="14.2" rx="2.4" />
      <path d="m3.4 6.6 8.6 6.2 8.6-6.2" />
    </>
  ),
  help: (
    <>
      <circle cx="12" cy="12" r="8.6" />
      <path d="M9.6 9.5a2.5 2.5 0 1 1 3.3 2.4c-.66.23-1 .82-1 1.5v.5" />
      <path d="M11.95 17.1h.1" />
    </>
  ),

  /* ---------------- Driver, trust, value ---------------- */
  license: (
    <>
      <rect x="2.6" y="4.9" width="18.8" height="14.2" rx="2.4" />
      <circle cx="8.2" cy="11" r="2" />
      <path d="M5.2 16.3a3.3 3.3 0 0 1 6 0" />
      <path d="M14.4 10.1h4.6M14.4 13.5h4.6" />
    </>
  ),
  shield: (
    <>
      <path d="m12 3.2 7.2 3.05v5.35c0 4.2-3 7.9-7.2 8.9-4.2-1-7.2-4.7-7.2-8.9V6.25Z" />
      <path d="m9.2 11.9 2 2 3.8-3.9" />
    </>
  ),
  lock: (
    <>
      <rect x="4.8" y="10.6" width="14.4" height="9.6" rx="2.2" />
      <path d="M8.2 10.6V7.9a3.8 3.8 0 0 1 7.6 0v2.7" />
    </>
  ),
  key: (
    <>
      <circle cx="8.1" cy="8.1" r="3.9" />
      <path d="m10.9 10.9 9.2 9.2" />
      <path d="m14.6 14.6 1.9-1.9M17.3 17.3l1.9-1.9" />
    </>
  ),
  check: <path d="m4.6 12.4 4.9 4.9L19.4 7.4" />,
  star: (
    <path d="M12 3.3l2.29 5.55 5.98.46-4.56 3.9 1.4 5.83L12 15.9l-5.11 3.14 1.4-5.83-4.56-3.9 5.98-.46Z" />
  ),
  tag: (
    <>
      <path d="M20.6 12.9 12.9 20.6a1.8 1.8 0 0 1-2.5 0l-7-7a1.8 1.8 0 0 1-.5-1.3V4.7a1.8 1.8 0 0 1 1.8-1.8h7.6a1.8 1.8 0 0 1 1.3.5l7 7a1.8 1.8 0 0 1 0 2.5Z" />
      <path d="M7.35 7.35h.02" />
    </>
  ),
  users: (
    <>
      <path d="M16.5 19.6a4.5 4.5 0 0 0-9 0" />
      <circle cx="12" cy="9" r="3.2" />
      <path d="M19.9 18.4a3.6 3.6 0 0 0-2.8-3M4.1 18.4a3.6 3.6 0 0 1 2.8-3" />
    </>
  ),
  luggage: (
    <>
      <rect x="3.6" y="7.4" width="16.8" height="12" rx="2.2" />
      <path d="M8.6 7.4V5.2a1.7 1.7 0 0 1 1.7-1.7h3.4a1.7 1.7 0 0 1 1.7 1.7v2.2" />
      <path d="M8.6 19.4v1.4M15.4 19.4v1.4" />
    </>
  ),
  bolt: (
    <path d="M13.2 2.9 4.9 13.1a.6.6 0 0 0 .47.98h5.13l-.7 6.03a.6.6 0 0 0 1.07.43l8.3-10.2a.6.6 0 0 0-.47-.98h-5.13l.7-6.03a.6.6 0 0 0-1.07-.43Z" />
  ),
  wrench: (
    <path d="M15.6 6.4a3.6 3.6 0 0 0-4.75 4.75L4 18l2 2 6.85-6.85A3.6 3.6 0 0 0 17.6 8.4l-2.5 2.5-2-2Z" />
  ),
  sparkles: (
    <>
      <path d="m11.4 4 1.6 4.3 4.3 1.6-4.3 1.6-1.6 4.3-1.6-4.3L5.5 9.9l4.3-1.6Z" />
      <path d="m18 14.4.75 1.85 1.85.75-1.85.75L18 19.6l-.75-1.85-1.85-.75 1.85-.75Z" />
    </>
  ),

  /* ---------------- Interface ---------------- */
  arrowRight: <path d="M4 12h15m-5.4-5.4L19 12l-5.4 5.4" />,
  chevronDown: <path d="m6.2 9.4 5.8 5.8 5.8-5.8" />,
  chevronUp: <path d="m6.2 14.6 5.8-5.8 5.8 5.8" />,
  chevronLeft: <path d="M14.6 6.2 8.8 12l5.8 5.8" />,
  chevronRight: <path d="m9.4 6.2 5.8 5.8-5.8 5.8" />,
  menu: <path d="M3.6 7h16.8M3.6 12h16.8M3.6 17h16.8" />,
  close: <path d="m6.2 6.2 11.6 11.6M17.8 6.2 6.2 17.8" />,
  plus: <path d="M12 5.2v13.6M5.2 12h13.6" />,
  minus: <path d="M5.2 12h13.6" />,
};

/** Filled at 24x24, because these are third-party marks with fixed artwork. */
const BRAND: Record<BrandName, React.ReactNode> = {
  facebook: (
    <path d="M22 12a10 10 0 1 0-11.56 9.88v-6.99H7.9V12h2.54V9.8c0-2.5 1.49-3.89 3.78-3.89 1.09 0 2.24.2 2.24.2v2.46h-1.26c-1.24 0-1.63.77-1.63 1.56V12h2.78l-.44 2.89h-2.34v6.99A10 10 0 0 0 22 12Z" />
  ),
  instagram: (
    <path d="M12 2.2c3.2 0 3.58.01 4.85.07 1.17.05 1.8.25 2.23.41.56.22.96.48 1.38.9.42.42.68.82.9 1.38.16.42.36 1.06.41 2.23.06 1.27.07 1.65.07 4.85s-.01 3.58-.07 4.85c-.05 1.17-.25 1.8-.41 2.23-.22.56-.48.96-.9 1.38-.42.42-.82.68-1.38.9-.42.16-1.06.36-2.23.41-1.27.06-1.65.07-4.85.07s-3.58-.01-4.85-.07c-1.17-.05-1.8-.25-2.23-.41a3.7 3.7 0 0 1-1.38-.9 3.7 3.7 0 0 1-.9-1.38c-.16-.42-.36-1.06-.41-2.23C2.21 15.58 2.2 15.2 2.2 12s.01-3.58.07-4.85c.05-1.17.25-1.8.41-2.23.22-.56.48-.96.9-1.38.42-.42.82-.68 1.38-.9.42-.16 1.06-.36 2.23-.41C8.42 2.21 8.8 2.2 12 2.2Zm0 3.05A6.75 6.75 0 1 0 18.75 12 6.75 6.75 0 0 0 12 5.25Zm0 11.13A4.38 4.38 0 1 1 16.38 12 4.38 4.38 0 0 1 12 16.38Zm6.99-11.4a1.58 1.58 0 1 1-1.58-1.58 1.58 1.58 0 0 1 1.58 1.58Z" />
  ),
  x: (
    <path d="M17.53 3H20l-6.06 6.93L21 21h-5.6l-4.38-5.73L5.99 21H3.5l6.49-7.42L3 3h5.74l3.96 5.24L17.53 3Zm-.98 16h1.54L7.53 4.5H5.88L16.55 19Z" />
  ),
  linkedin: (
    <path d="M4.98 3.5A2.5 2.5 0 0 0 2.5 6a2.5 2.5 0 0 0 2.48 2.5A2.5 2.5 0 0 0 7.5 6a2.5 2.5 0 0 0-2.52-2.5ZM3 9h4v12H3V9Zm6 0h3.8v1.64h.05c.53-.95 1.83-1.95 3.76-1.95C20.4 8.69 22 10.3 22 13.6V21h-4v-6.5c0-1.55-.03-3.55-2.16-3.55-2.16 0-2.49 1.69-2.49 3.43V21H9V9Z" />
  ),
};

const isBrand = (n: Name): n is BrandName => n in BRAND;

export default function Icon({
  name,
  className = "h-5 w-5",
  title,
}: {
  name: Name;
  className?: string;
  /**
   * Supply this ONLY when the icon carries meaning no adjacent text conveys.
   * Without it the glyph is marked decorative, which is the right default:
   * almost every icon here sits beside its own label.
   */
  title?: string;
}) {
  const labelled = title
    ? { role: "img" as const, "aria-label": title }
    : { "aria-hidden": true as const, focusable: "false" as const };

  if (isBrand(name)) {
    return (
      <svg viewBox="0 0 24 24" className={className} fill="currentColor" {...labelled}>
        {BRAND[name]}
      </svg>
    );
  }

  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth={1.75}
      strokeLinecap="round"
      strokeLinejoin="round"
      {...labelled}
    >
      {OUTLINE[name]}
    </svg>
  );
}
