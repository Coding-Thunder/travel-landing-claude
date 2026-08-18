import { cn } from "@/lib/cn";
import { site } from "@/config/site";

/**
 * Flight Bizz mark: a compass star on a solid tile.
 *
 * Navigational rather than aeronautical, because Flight Bizz is a travel
 * platform covering six categories and the mark must not read as airline
 * livery. `currentColor` on the star lets the lockup invert with its scope.
 */
export function LogoMark({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 64 64"
      className={cn("text-primary", className)}
      role="img"
      aria-label={site.name}
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Tile follows the scope so the mark keeps its silhouette on the dark footer. */}
      <rect width="64" height="64" rx="12" className="fill-foreground" />
      <path
        fill="currentColor"
        d="M32 12.5 35.9 28.1 51.5 32 35.9 35.9 32 51.5 28.1 35.9 12.5 32 28.1 28.1Z"
      />
    </svg>
  );
}

/** Mark plus wordmark. Inherits color from its scope so it works on the footer. */
export function Logo({ className, markClassName }: { className?: string; markClassName?: string }) {
  return (
    <span className={cn("flex shrink-0 items-center gap-2", className)}>
      <LogoMark className={cn("h-7 w-7", markClassName)} />
      <span className="text-[15px] font-semibold tracking-tight">
        Flight <span className="text-primary">Bizz</span>
      </span>
    </span>
  );
}
