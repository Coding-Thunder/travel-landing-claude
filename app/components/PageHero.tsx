import Container from "./ui/Container";
import { Breadcrumb, type Crumb } from "@/components/ui/breadcrumb";

export type { Crumb };

/**
 * Header for interior pages.
 *
 * A typographic header rather than a photo hero: only the home page earns
 * imagery, so interior pages reach their content immediately instead of
 * repeating a decorative banner on every route. `actions` carries the phone CTA
 * on commercial pages.
 */
export default function PageHero({
  eyebrow,
  title,
  subtitle,
  breadcrumbs,
  actions,
}: {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  breadcrumbs: Crumb[];
  actions?: React.ReactNode;
}) {
  return (
    <div className="border-b bg-muted/40">
      <Container className="py-8 sm:py-10">
        <Breadcrumb items={breadcrumbs} />
        <div className="mt-4 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div className="max-w-2xl">
            {eyebrow ? (
              <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">{eyebrow}</p>
            ) : null}
            <h1 className="mt-1.5 font-display text-3xl tracking-tight sm:text-4xl">{title}</h1>
            {subtitle ? (
              <p className="mt-3 text-[15px] leading-relaxed text-muted-foreground">{subtitle}</p>
            ) : null}
          </div>
          {actions ? <div className="flex shrink-0 flex-wrap items-center gap-2">{actions}</div> : null}
        </div>
      </Container>
    </div>
  );
}
