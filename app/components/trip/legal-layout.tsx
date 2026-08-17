import Link from "next/link";
import Container from "./container";
import { site } from "@/config/site";

/** Shared wrapper for legal pages: header band, readable prose, and legal footer. */
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
    <div className="bg-white">
      <section className="border-b border-navy-100 bg-navy-50">
        <Container className="py-12 sm:py-16">
          <nav aria-label="Breadcrumb">
            <ol className="flex flex-wrap items-center gap-1.5 text-xs text-navy-500">
              <li>
                <Link href="/" className="hover:text-royal-700">
                  Home
                </Link>
              </li>
              <li className="text-navy-400">/</li>
              <li aria-current="page" className="font-medium text-navy-700">
                {title}
              </li>
            </ol>
          </nav>
          <h1 className="mt-4 text-3xl font-semibold tracking-tight text-navy-900 sm:text-4xl">{title}</h1>
          <p className="mt-3 text-sm text-navy-500">Last updated: {updated}</p>
          {intro ? <p className="mt-4 max-w-3xl text-base leading-relaxed text-navy-700">{intro}</p> : null}
        </Container>
      </section>

      <Container className="py-12 sm:py-16">
        <article className="max-w-3xl space-y-6 text-[15px] leading-relaxed text-navy-700 [&_a]:font-medium [&_a]:text-royal-700 [&_a:hover]:underline [&_h2]:mt-8 [&_h2]:text-xl [&_h2]:font-semibold [&_h2]:text-navy-900 [&_h3]:mt-6 [&_h3]:text-base [&_h3]:font-semibold [&_h3]:text-navy-900 [&_p]:mt-3 [&_ul]:mt-3 [&_ul]:list-disc [&_ul]:space-y-1.5 [&_ul]:pl-6">
          {children}
        </article>

        {/* Standing disclosures repeated on every legal page */}
        <div className="mt-12 max-w-3xl space-y-3 rounded-2xl border border-navy-100 bg-navy-50 p-6 text-sm text-navy-600 sm:p-8">
          <p className="text-base font-semibold text-navy-900">{site.name}</p>
          <p className="font-medium text-navy-800">{site.operatedBy}</p>
          <p className="text-xs leading-relaxed">{site.supplierDisclosure}</p>
          <p className="text-xs leading-relaxed">{site.accreditationNotice}</p>

          <div className="!mt-5 border-t border-navy-200 pt-4 text-sm">
            <p className="font-semibold text-navy-900">{site.company.registeredName}</p>
            {site.contact.hasCompanyNumber ? (
              <p className="mt-1">Registration ID: {site.company.companyNumber}</p>
            ) : null}
            {site.contact.hasAddress ? <p className="mt-1">{site.company.registeredOffice}</p> : null}
            <p className="mt-1">
              {site.contact.hasEmail ? (
                <a href={`mailto:${site.company.supportEmail}`} className="font-medium text-royal-700 hover:underline">
                  {site.company.supportEmail}
                </a>
              ) : null}
              {site.contact.hasEmail && site.contact.hasPhone ? " · " : null}
              {site.contact.hasPhone ? site.company.phone : null}
            </p>
          </div>

          <ul className="!mt-4 flex flex-wrap gap-x-4 gap-y-1.5 text-xs font-medium text-navy-600">
            {site.legalLinks.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="underline-offset-4 hover:text-royal-700 hover:underline">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>

          <p className="!mt-5 text-xs leading-relaxed text-navy-500">
            These policies are provided in good faith and reflect how {site.name} operates. They should be reviewed
            by qualified legal counsel for {site.legalName} before launch, and updated to reflect the jurisdictions,
            payment arrangements and supplier contracts actually in force.
          </p>
        </div>
      </Container>
    </div>
  );
}
