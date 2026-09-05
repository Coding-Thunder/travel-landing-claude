import Container from "./Container";
import { cn } from "@/lib/cn";

type SectionProps = {
  id?: string;
  children: React.ReactNode;
  className?: string;
  /** Surface tone. `dark` flips the token scope rather than hardcoding colours. */
  tone?: "white" | "gray" | "dark";
  containerClassName?: string;
};

/**
 * Vertical rhythm for page sections.
 *
 * Three tones, and only two of them are page surfaces: `gray` is the quiet band
 * used to separate one region from the next, and `dark` enters the inverted
 * token scope so the components inside need no parallel colour classes.
 */
const TONES: Record<NonNullable<SectionProps["tone"]>, string> = {
  white: "bg-background",
  gray: "border-y bg-muted/40",
  dark: "dark bg-background text-foreground",
};

export function Section({
  id,
  children,
  className,
  tone = "white",
  containerClassName,
}: SectionProps) {
  return (
    <section id={id} className={cn("scroll-mt-20 py-14 sm:py-16", TONES[tone], className)}>
      <Container className={containerClassName}>{children}</Container>
    </section>
  );
}

type HeadingProps = {
  eyebrow?: string;
  title: React.ReactNode;
  subtitle?: React.ReactNode;
  /** Trailing action, e.g. a "view all" link. */
  actions?: React.ReactNode;
  className?: string;
};

/**
 * Section heading.
 *
 * Left aligned with the description beneath and any action pinned to the
 * right — a page of centred eyebrow-title-subtitle stacks is most of what makes
 * a site read as a marketing template rather than a product. The `eyebrow` prop
 * is still accepted and rendered, but quietly, as a label rather than a banner.
 *
 * In the inverted (`dark`) scope this needs no `invert` prop: the tokens
 * already carry the right values.
 */
export function SectionHeading({ eyebrow, title, subtitle, actions, className }: HeadingProps) {
  return (
    <div className={cn("flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between", className)}>
      <div className="max-w-2xl">
        {eyebrow ? (
          <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">{eyebrow}</p>
        ) : null}
        <h2 className={cn("text-xl font-semibold tracking-tight sm:text-2xl", eyebrow && "mt-1.5")}>
          {title}
        </h2>
        {subtitle ? (
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{subtitle}</p>
        ) : null}
      </div>
      {actions ? <div className="flex shrink-0 items-center gap-2">{actions}</div> : null}
    </div>
  );
}
