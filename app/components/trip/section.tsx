import Container from "./container";
import { cn } from "@/lib/cn";

/**
 * Vertical rhythm for page sections. Two tones only: the page surface and a
 * quiet tinted band used sparingly to separate one region from the next.
 */
export function Section({
  id,
  children,
  tone = "default",
  className,
}: {
  id?: string;
  children: React.ReactNode;
  tone?: "default" | "muted";
  className?: string;
}) {
  return (
    <section
      id={id}
      className={cn("scroll-mt-20 py-14 sm:py-16", tone === "muted" && "border-y bg-muted/40", className)}
    >
      <Container>{children}</Container>
    </section>
  );
}

/**
 * Section heading. Deliberately no eyebrow and no centring by default: those
 * two habits are most of what makes a page read as a marketing template.
 */
export function SectionHeading({
  title,
  description,
  actions,
  className,
}: {
  title: React.ReactNode;
  description?: React.ReactNode;
  actions?: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between", className)}>
      <div className="max-w-2xl">
        <h2 className="text-xl font-semibold tracking-tight sm:text-2xl">{title}</h2>
        {description ? <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{description}</p> : null}
      </div>
      {actions ? <div className="flex shrink-0 items-center gap-2">{actions}</div> : null}
    </div>
  );
}
