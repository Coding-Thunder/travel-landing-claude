import Link from "next/link";
import Container from "./container";
import PageHeader from "./page-hero";
import { site } from "@/config/site";
import { Separator } from "@/components/ui/separator";

/**
 * Shared wrapper for legal pages: header, readable prose, standing disclosures.
 *
 * MAINTAINER NOTE, deliberately not rendered: these policies reflect how Flight
 * Bizz operates and are written in good faith, but they have not been reviewed
 * by counsel for GlobeVista LLC. Have them reviewed, and updated to match the
 * jurisdictions, payment arrangements and supplier contracts actually in force,
 * before relying on them.
 */
export default function LegalLayout({
  title,
  updated,
  intro,
  children,
}: {
  title: string;
  updated: string;
  intro?: string;
  children: React.ReactNode;
}) {
  return (
    <>
      <PageHeader
        title={title}
        description={intro}
        breadcrumbs={[
          { name: "Home", href: "/" },
          { name: title, href: "#" },
        ]}
      />

      <Container className="py-10 sm:py-12">
        <p className="text-sm text-muted-foreground">Last updated: {updated}</p>

        <article className="mt-6 max-w-3xl space-y-6 text-[15px] leading-relaxed [&_a]:font-medium [&_a]:text-primary [&_a:hover]:underline [&_h2]:mt-8 [&_h2]:text-lg [&_h2]:font-semibold [&_h3]:mt-6 [&_h3]:text-base [&_h3]:font-semibold [&_p]:mt-3 [&_p]:text-muted-foreground [&_ul]:mt-3 [&_ul]:list-disc [&_ul]:space-y-1.5 [&_ul]:pl-6 [&_ul]:text-muted-foreground">
          {children}
        </article>

        <div className="mt-12 max-w-3xl rounded-lg border bg-muted/40 p-5 text-sm">
          <p className="font-medium">{site.name}</p>
          <p className="mt-1 text-muted-foreground">{site.operatedBy}</p>

          <Separator className="my-4" />

          <div className="space-y-2 text-xs leading-relaxed text-muted-foreground">
            <p>{site.supplierDisclosure}</p>
            <p>{site.accreditationNotice}</p>
          </div>

          <Separator className="my-4" />

          <div className="text-sm">
            <p className="font-medium">{site.company.registeredName}</p>
            {site.contact.hasCompanyNumber ? (
              <p className="mt-1 text-muted-foreground">Registration ID: {site.company.companyNumber}</p>
            ) : null}
            {site.contact.hasAddress ? (
              <p className="mt-1 text-muted-foreground">{site.company.registeredOffice}</p>
            ) : null}
            {site.contact.hasEmail ? (
              <p className="mt-1">
                <a href={`mailto:${site.company.supportEmail}`} className="font-medium text-primary hover:underline">
                  {site.company.supportEmail}
                </a>
                {site.contact.hasPhone ? (
                  <span className="text-muted-foreground">{` and ${site.company.phone}`}</span>
                ) : null}
              </p>
            ) : null}
          </div>

          <ul className="mt-4 flex flex-wrap gap-x-4 gap-y-1.5 text-xs">
            {site.legalLinks.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="text-muted-foreground underline-offset-4 hover:text-foreground hover:underline">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>

        </div>
      </Container>
    </>
  );
}
