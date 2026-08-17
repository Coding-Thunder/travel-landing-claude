import Link from "next/link";
import { Mail, MapPin, Phone } from "lucide-react";
import { site, telHref, mailtoHref } from "@/config/site";
import { Logo } from "./logo";

export default function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-navy-800 bg-navy-900 text-navy-100">
      <div className="mx-auto max-w-6xl px-5 py-14 sm:px-8">
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-8">
          {/* Brand lockup */}
          <div className="lg:col-span-4">
            <Logo tone="dark" />
            <p className="mt-3 text-sm font-medium text-royal-300">{site.tagline}</p>
            <div aria-hidden className="rule-gold mt-4 h-px w-24" />
            <p className="mt-4 text-sm text-navy-200">{site.operatedBy}</p>
            <p className="mt-3 text-xs uppercase tracking-[0.12em] text-navy-300">{site.categoryLine}</p>

            <ul className="mt-6 space-y-2.5 text-sm">
              {site.contact.hasEmail ? (
                <li className="flex items-start gap-2.5">
                  <Mail className="mt-0.5 h-4 w-4 shrink-0 text-royal-300" />
                  <a href={mailtoHref} className="break-all text-navy-100 hover:text-white">
                    {site.company.supportEmail}
                  </a>
                </li>
              ) : null}
              {site.contact.hasPhone ? (
                <li className="flex items-start gap-2.5">
                  <Phone className="mt-0.5 h-4 w-4 shrink-0 text-royal-300" />
                  <a href={telHref} className="text-navy-100 hover:text-white">
                    {site.company.phone}
                  </a>
                </li>
              ) : null}
              {site.contact.hasAddress ? (
                <li className="flex items-start gap-2.5">
                  <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-royal-300" />
                  <span className="text-navy-200">{site.company.registeredOffice}</span>
                </li>
              ) : null}
            </ul>
          </div>

          <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 lg:col-span-7 lg:col-start-6">
            {site.footerColumns.map((col) => (
              <div key={col.title}>
                <p className="text-xs font-semibold uppercase tracking-wider text-navy-300">{col.title}</p>
                <ul className="mt-4 space-y-2.5 text-sm">
                  {col.links.map((l) => (
                    <li key={l.href}>
                      <Link href={l.href} className="text-navy-200 transition hover:text-white">
                        {l.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-12 space-y-4 border-t border-white/10 pt-8">
          <p className="max-w-4xl text-xs leading-relaxed text-navy-300">{site.supplierDisclosure}</p>
          <p className="max-w-4xl text-xs leading-relaxed text-navy-300">{site.accreditationNotice}</p>

          <div className="flex flex-col gap-3 pt-2 text-xs text-navy-300 md:flex-row md:items-center md:justify-between">
            <p>
              © {year} {site.legalName}. All rights reserved.
              {site.contact.hasCompanyNumber ? <> · Registration ID: {site.company.companyNumber}</> : null}
            </p>
            <ul className="flex flex-wrap items-center gap-x-4 gap-y-1">
              {site.legalLinks.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="underline-offset-4 transition hover:text-white hover:underline">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
}
