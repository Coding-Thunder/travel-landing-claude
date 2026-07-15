import Link from "next/link";
import { Mail, MapPin, Phone } from "lucide-react";
import { site } from "@/config/site";

const hasPhone = !site.company.phone.startsWith("[");

export default function SiteFooter() {
  const year = new Date().getFullYear();
  return (
    <footer className="border-t border-navy-100 bg-navy-900 text-navy-100">
      <div className="mx-auto max-w-6xl px-5 py-14 sm:px-8">
        <div className="grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <div className="flex items-center gap-2.5">
              <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-royal-600 text-sm font-bold text-white">TR</span>
              <span className="text-lg font-semibold tracking-tight text-white">{site.name}</span>
            </div>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-navy-200">
              Professional hotel reservation assistance for leisure, business and group travel through a trusted
              supplier network.
            </p>
            <ul className="mt-5 space-y-2.5 text-sm">
              <li className="flex items-start gap-2.5">
                <Mail className="mt-0.5 h-4 w-4 shrink-0 text-royal-300" />
                <a href={`mailto:${site.company.supportEmail}`} className="break-all text-navy-100 hover:text-white">{site.company.supportEmail}</a>
              </li>
              {hasPhone ? (
                <li className="flex items-start gap-2.5">
                  <Phone className="mt-0.5 h-4 w-4 shrink-0 text-royal-300" />
                  <a href={`tel:${site.company.phoneHref || site.company.phone}`} className="text-navy-100 hover:text-white">{site.company.phone}</a>
                </li>
              ) : null}
              <li className="flex items-start gap-2.5">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-royal-300" />
                <span className="text-navy-200">{site.company.registeredOffice}</span>
              </li>
            </ul>
          </div>

          <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 lg:col-span-6 lg:col-start-7">
            {site.footerColumns.map((col) => (
              <div key={col.title}>
                <p className="text-xs font-semibold uppercase tracking-wider text-navy-300">{col.title}</p>
                <ul className="mt-4 space-y-2.5 text-sm">
                  {col.links.map((l) => (
                    <li key={l.href}>
                      <Link href={l.href} className="text-navy-200 transition hover:text-white">{l.label}</Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-12 border-t border-white/10 pt-8">
          <p className="max-w-4xl text-xs leading-relaxed text-navy-300">{site.disclaimer}</p>
          <div className="mt-5 flex flex-col gap-3 text-xs text-navy-300 md:flex-row md:items-center md:justify-between">
            <p>
              © {year} {site.company.registeredName} · Company No. {site.company.companyNumber}. All rights reserved.
            </p>
            <ul className="flex flex-wrap items-center gap-x-4 gap-y-1">
              {site.legalLinks.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="underline-offset-4 transition hover:text-white hover:underline">{l.label}</Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
}
