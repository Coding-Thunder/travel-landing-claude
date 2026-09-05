import { cn } from "@/lib/cn";
import { siteConfig } from "@/config/siteConfig";

/**
 * The existing My Budget Car mark, lifted verbatim from app/icon.svg so the
 * favicon, the PWA icon and the header lockup are the same drawing.
 *
 * The only change is that the tile and the car address the primary token pair
 * rather than literal hex, so the lockup keeps its contrast in the light
 * interface AND in the inverted footer scope, where the two tokens swap.
 */
export function LogoMark({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 64 64"
      className={className}
      role="img"
      aria-label={siteConfig.name}
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect width="64" height="64" rx="14" className="fill-primary" />
      <g transform="translate(8,8) scale(2)" className="fill-primary-foreground">
        <path d="M18.92 6.01C18.72 5.42 18.16 5 17.5 5h-11c-.66 0-1.21.42-1.42 1.01L3 12v8a1 1 0 0 0 1 1h1a1 1 0 0 0 1-1v-1h12v1a1 1 0 0 0 1 1h1a1 1 0 0 0 1-1v-8l-2.08-5.99zM6.5 16a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm11 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zM5 11l1.5-4.5h11L19 11H5z" />
      </g>
    </svg>
  );
}

/**
 * Mark plus wordmark. Text colour is inherited from the surrounding scope, so
 * the same component works on the light header and the inverted footer.
 */
export function Logo({ className, markClassName }: { className?: string; markClassName?: string }) {
  return (
    <span className={cn("flex shrink-0 items-center gap-2.5", className)}>
      <LogoMark className={cn("h-8 w-8", markClassName)} />
      <span className="text-[15px] font-semibold tracking-tight">{siteConfig.shortName}</span>
    </span>
  );
}
