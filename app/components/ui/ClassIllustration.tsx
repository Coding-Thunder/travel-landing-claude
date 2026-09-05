import Icon, { type Name } from "./Icon";
import { cn } from "@/lib/cn";

/**
 * Stand-in for a vehicle class that has no photograph.
 *
 * Three classes lost their images because the photographs showed a different
 * kind of vehicle entirely, and the project contains no correct replacement.
 * Rather than leave a misleading picture up, or a blank hole in the grid, the
 * class is drawn as a diagram from the site's own icon family.
 *
 * It reads as a diagram, not a photograph, so nobody can mistake it for the
 * specific car they will be given. Swap it for a real photograph of the class
 * as soon as one is licensed.
 */
const GLYPH: Record<string, Name> = {
  suv: "suv",
  minivan: "minivan",
  "pickup-truck": "pickup",
  electric: "electric",
};

export default function ClassIllustration({
  slug,
  name,
  className,
}: {
  slug: string;
  name: string;
  className?: string;
}) {
  return (
    <div
      className={cn("flex h-full w-full flex-col items-center justify-center gap-2 bg-muted", className)}
      role="img"
      aria-label={`${name} class illustration. No photograph of this vehicle class is available yet.`}
    >
      <Icon name={GLYPH[slug] ?? "car"} className="h-12 w-12 text-muted-foreground/60" />
      <span className="text-xs font-medium text-muted-foreground/80">{name}</span>
    </div>
  );
}
