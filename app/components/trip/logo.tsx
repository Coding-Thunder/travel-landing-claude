import { cn } from "@/lib/cn";
import { site } from "@/config/site";

/**
 * Rental Confirmation mark: a confirmation check on a solid tile.
 *
 * Same tile, radius and scope-inverting treatment as the rest of the lockup
 * system; the glyph is a check rather than a compass star because the promise
 * the brand makes is a confirmed booking, not wayfinding. `currentColor` on the
 * check lets the lockup invert with its scope.
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
        fill="none"
        stroke="currentColor"
        strokeWidth="6"
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M20 32.8 28.4 41.2 44 25.6"
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
        Rental <span className="text-primary">Confirmation</span>
      </span>
    </span>
  );
}
