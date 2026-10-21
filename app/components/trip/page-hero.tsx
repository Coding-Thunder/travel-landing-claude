import Container from "./container";
import { Breadcrumb, type Crumb } from "@/components/ui/breadcrumb";

/**
 * Page header for interior pages. A typographic header rather than a photo
 * hero: only the home page earns imagery, so interior pages get to the content
 * quickly instead of repeating a decorative banner six times.
 */
export default function PageHeader({
  title,
  description,
  breadcrumbs,
  actions,
}: {
  title: string;
  description?: string;
  breadcrumbs: Crumb[];
  actions?: React.ReactNode;
}) {
  return (
    <div className="border-b bg-muted/40">
      <Container className="py-8 sm:py-10">
        <Breadcrumb items={breadcrumbs} />
        <div className="mt-4 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div className="max-w-2xl">
            <h1 className="font-display text-3xl tracking-tight sm:text-4xl">{title}</h1>
            {description ? (
              <p className="mt-3 text-[15px] leading-relaxed text-muted-foreground">{description}</p>
            ) : null}
          </div>
          {actions ? <div className="flex shrink-0 flex-wrap items-center gap-2">{actions}</div> : null}
        </div>
      </Container>
    </div>
  );
}

export type { Crumb };
