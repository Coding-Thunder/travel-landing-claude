import Link from "next/link";
import { site, telHref, mailtoHref } from "@/config/site";
import { Logo } from "./logo";
import { Separator } from "@/components/ui/separator";

/**
 * Inverted scope: `dark` swaps the token values, so everything inside renders
 * against the midnight surface without a parallel set of color classes.
 */
export default function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="dark border-t bg-background text-foreground">
      <div className="mx-auto max-w-6xl px-5 py-12 sm:px-8">
        <div className="grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-3">
            <Logo />
            <p className="mt-3 text-sm text-muted-foreground">{site.tagline}</p>
            <p className="mt-4 text-sm text-muted-foreground">{site.operatedBy}</p>

            <ul className="mt-5 space-y-1.5 text-sm">
              {site.contact.hasPhone ? (
                <li>
                  <a href={telHref} className="rounded-sm transition-colors hover:text-primary">
                    {site.company.phone}
                  </a>
                </li>
              ) : null}
              {site.contact.hasEmail ? (
                <li>
                  <a href={mailtoHref} className="break-all rounded-sm transition-colors hover:text-primary">
                    {site.company.supportEmail}
                  </a>
                </li>
              ) : null}
              {site.contact.hasAddress ? (
                <li className="text-muted-foreground">{site.company.registeredOffice}</li>
              ) : null}
            </ul>
          </div>

          <div className="grid grid-cols-2 gap-x-6 gap-y-8 sm:grid-cols-4 lg:col-span-8 lg:col-start-5">
            {site.footerColumns.map((col) => (
              <nav key={col.title} aria-label={col.title}>
                <h2 className="text-sm font-medium text-foreground">{col.title}</h2>
                <ul className="mt-3 space-y-2 text-sm">
                  {col.links.map((l) => (
                    <li key={l.href}>
                      <Link href={l.href} className="rounded-sm text-muted-foreground transition-colors hover:text-foreground">
                        {l.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
            ))}
          </div>
        </div>

        <Separator className="my-8" />

        {/* Required disclosures. Legible, deliberately secondary. */}
        <div className="space-y-2.5 text-xs leading-relaxed text-muted-foreground">
          <p className="max-w-4xl">{site.supplierDisclosure}</p>
          <p className="max-w-4xl">{site.accreditationNotice}</p>
        </div>

        <div className="mt-6 flex flex-col gap-2 text-xs text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
          <p>
            {`© ${year} ${site.legalName}. All rights reserved.`}
            {site.contact.hasCompanyNumber ? ` Registration ID: ${site.company.companyNumber}.` : null}
          </p>
          <ul className="flex flex-wrap items-center gap-x-4 gap-y-1">
            {site.legalLinks.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="rounded-sm transition-colors hover:text-foreground">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
}
