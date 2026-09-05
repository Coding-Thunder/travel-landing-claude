import { siteConfig } from "@/config/siteConfig";
import { Button } from "@/components/ui/button";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import JsonLd from "./seo/JsonLd";
import { breadcrumbSchema } from "@/lib/schema";
import Icon from "./ui/Icon";

type LegalLayoutProps = {
  title: string;
  updated: string;
  intro?: string;
  /** Path of this policy page, e.g. "/privacy-policy". Drives the breadcrumb. */
  path: string;
  children: React.ReactNode;
};

/**
 * Shell for the policy pages.
 *
 * A typographic header over a narrow reading measure: legal copy is read, not
 * scanned, so the column stays at max-w-3xl and the prose styles are declared
 * once here rather than repeated on every heading in four page files.
 */
export default function LegalLayout({
  title,
  updated,
  intro,
  path,
  children,
}: LegalLayoutProps) {
  const crumbs = [
    { name: "Home", href: "/" },
    { name: title, href: path },
  ];

  return (
    <div className="bg-background">
      {/*
        The four policy pages were the only routes with neither a visible
        breadcrumb nor BreadcrumbList markup, so they sat outside the site
        hierarchy for both readers and crawlers.
      */}
      <JsonLd data={breadcrumbSchema(crumbs.map((c) => ({ name: c.name, path: c.href })))} />
      {/* Hero band */}
      <div className="border-b bg-muted/40">
        <div className="mx-auto max-w-3xl px-5 py-8 sm:px-8 sm:py-10">
          <Breadcrumb items={crumbs} />
          <p className="mt-4 text-xs font-medium uppercase tracking-wider text-muted-foreground">
            Legal · {siteConfig.name}
          </p>
          <h1 className="mt-1.5 font-display text-3xl tracking-tight sm:text-4xl">
            {title}
          </h1>
          <p className="mt-3 text-sm text-muted-foreground">Last updated: {updated}</p>
          {intro ? (
            <p className="mt-3 text-[15px] leading-relaxed text-muted-foreground">
              {intro}
            </p>
          ) : null}
        </div>
      </div>

      {/* Body */}
      <article className="mx-auto max-w-3xl px-5 py-14 sm:px-8 sm:py-16">
        <div className="space-y-8 text-[15px] leading-relaxed text-muted-foreground [&_h2]:mt-2 [&_h2]:text-xl [&_h2]:font-semibold [&_h2]:tracking-tight [&_h2]:text-foreground sm:[&_h2]:text-2xl [&_h3]:mt-2 [&_h3]:text-[15px] [&_h3]:font-medium [&_h3]:text-foreground [&_p]:mt-3 [&_strong]:font-medium [&_strong]:text-foreground [&_ul]:mt-3 [&_ul]:list-disc [&_ul]:space-y-1.5 [&_ul]:pl-6">
          {children}
        </div>

        {/* CTA back to home */}
        <div className="mt-12 rounded-lg border bg-muted/50 p-6 sm:p-7">
          <div className="flex flex-col items-start gap-5 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                Questions?
              </p>
              <p className="mt-1 text-lg font-semibold tracking-tight sm:text-xl">
                Call our team 24/7
              </p>
            </div>
            <Button asChild size="lg" className="w-full sm:w-auto">
              <a href={`tel:${siteConfig.phone}`}>
                <Icon name="phone" />
                {siteConfig.phoneDisplay}
              </a>
            </Button>
          </div>
        </div>
      </article>
    </div>
  );
}
