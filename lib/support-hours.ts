import { site } from "@/config/site";

export type SupportStatus = {
  open: boolean;
  /** e.g. "Monday – Friday, 9:00 AM – 8:00 PM" for the next opening slot. */
  nextOpen: string | null;
};

const DAY_NAMES = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

function formatHour(hour: number): string {
  const suffix = hour >= 12 ? "PM" : "AM";
  const h = hour % 12 === 0 ? 12 : hour % 12;
  return `${h}:00 ${suffix}`;
}

/**
 * Whether the support desk is open right now, evaluated against the published
 * hours in the visitor-independent business timezone (see `site.hoursTimeZone`).
 *
 * Must only be called on the client: it reads the current time, so calling it
 * during SSR would bake a stale value into the HTML and mismatch on hydration.
 */
export function getSupportStatus(now: Date = new Date()): SupportStatus {
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone: site.hoursTimeZone,
    weekday: "short",
    hour: "numeric",
    minute: "numeric",
    hour12: false,
  }).formatToParts(now);

  const weekday = parts.find((p) => p.type === "weekday")?.value ?? "";
  const hour = Number(parts.find((p) => p.type === "hour")?.value ?? "0");
  const minute = Number(parts.find((p) => p.type === "minute")?.value ?? "0");

  const dayIndex = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].indexOf(weekday);
  if (dayIndex < 0) return { open: false, nextOpen: null };

  const today = site.hoursByDay[dayIndex];
  const minutesNow = hour * 60 + minute;
  const open = Boolean(today && minutesNow >= today.open * 60 && minutesNow < today.close * 60);

  if (open) return { open: true, nextOpen: null };

  // Walk forward to the next slot that has not already closed today.
  for (let offset = 0; offset < 8; offset++) {
    const idx = (dayIndex + offset) % 7;
    const slot = site.hoursByDay[idx];
    if (!slot) continue;
    if (offset === 0 && minutesNow >= slot.close * 60) continue;
    const label = offset === 0 ? "today" : offset === 1 ? "tomorrow" : DAY_NAMES[idx];
    return { open: false, nextOpen: `${label} from ${formatHour(slot.open)} ${site.hoursLabel}` };
  }

  return { open: false, nextOpen: null };
}
