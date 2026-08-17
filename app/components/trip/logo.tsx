import { cn } from "@/lib/cn";
import { site } from "@/config/site";

/**
 * Flight Bizz brand mark — a compass star on a midnight tile, ringed in gold.
 *
 * Deliberately navigational rather than aeronautical: Flight Bizz is a travel
 * platform covering six categories, not an airline, so the mark must not read
 * as aircraft livery.
 */
export function LogoMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 64 64" className={className} role="img" aria-label={site.name} xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="fb-tile" x1="0" y1="0" x2="64" y2="64" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#21404c" />
          <stop offset="1" stopColor="#0c1c24" />
        </linearGradient>
        <linearGradient id="fb-star" x1="18" y1="10" x2="46" y2="54" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#ffa084" />
          <stop offset="1" stopColor="#d2401f" />
        </linearGradient>
      </defs>
      <rect width="64" height="64" rx="16" fill="url(#fb-tile)" />
      <circle cx="32" cy="32" r="22.5" fill="none" stroke="#d0a955" strokeOpacity="0.45" strokeWidth="1.2" />
      <path fill="url(#fb-star)" d="M32 10.5 36.2 27.8 53.5 32 36.2 36.2 32 53.5 27.8 36.2 10.5 32 27.8 27.8Z" />
      <circle cx="32" cy="32" r="2.6" fill="#0c1c24" fillOpacity="0.55" />
    </svg>
  );
}

/**
 * Full brand lockup: mark + wordmark. `tone` switches the wordmark for use on
 * light chrome (header) or the midnight footer.
 */
export function Logo({
  className,
  markClassName,
  tone = "light",
}: {
  className?: string;
  markClassName?: string;
  tone?: "light" | "dark";
}) {
  return (
    <span className={cn("flex shrink-0 items-center gap-2.5", className)}>
      <LogoMark className={cn("h-9 w-9", markClassName)} />
      <span className={cn("text-lg font-semibold tracking-tight", tone === "dark" ? "text-white" : "text-navy-900")}>
        Flight <span className={tone === "dark" ? "text-royal-300" : "text-royal-600"}>Bizz</span>
      </span>
    </span>
  );
}
