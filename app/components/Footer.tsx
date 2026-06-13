import Link from "next/link";
import { siteConfig } from "@/config/siteConfig";
import Icon from "./ui/Icon";

export default function Footer() {
  const year = new Date().getFullYear();
  const {
    name,
    shortName,
    legalName,
    phone,
    phoneVanity,
    phoneDisplay,
    email,
    addressLine,
    addressCity,
    addressRegionCode,
    addressPostal,
    footerColumns,
    social,
    legalLinks,
    hours,
  } = siteConfig;

  return (
    <footer className="border-t border-slate-800 bg-slate-950 text-slate-300">
      <div className="mx-auto max-w-6xl px-5 py-12 sm:px-8 sm:py-14">
        <div className="grid gap-10 lg:grid-cols-12">
          {/* Brand + call block */}
          <div className="lg:col-span-4">
            <div className="flex items-center gap-2.5">
              <span className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-brand-600 text-white">
                <Icon name="car" className="h-5 w-5" />
              </span>
              <span className="text-lg font-extrabold tracking-tight text-white">{shortName}</span>
            </div>
            <p className="mt-3 max-w-xs text-sm leading-relaxed text-slate-400">
              Licensed, insured car rentals nationwide. Reserve by phone with a live US-based agent — no
              hidden fees, free cancellation, instant confirmation.
            </p>

            <a
              href={`tel:${phone}`}
              className="mt-5 inline-flex flex-col rounded-2xl border border-slate-800 bg-slate-900 px-5 py-3.5 transition hover:border-slate-700"
            >
              <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-500">
                Toll-free · 24/7
              </span>
              <span className="flex items-center gap-2 text-xl font-extrabold tracking-tight text-white">
                <Icon name="phone" className="h-5 w-5 text-brand-400" />
                {phoneVanity}
              </span>
            </a>

            {/* Social */}
            <div className="mt-6 flex items-center gap-3">
              {social.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  className="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-800 text-slate-400 transition hover:border-slate-600 hover:text-white"
                >
                  <Icon name={s.icon as "facebook"} className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Link columns */}
          <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 lg:col-span-5">
            {footerColumns.map((col) => (
              <div key={col.title}>
                <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">{col.title}</p>
                <ul className="mt-4 space-y-2.5 text-sm">
                  {col.links.map((l) => (
                    <li key={l.label}>
                      <Link href={l.href} className="text-slate-400 transition hover:text-white">
                        {l.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Contact */}
          <div className="lg:col-span-3">
            <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">Contact</p>
            <ul className="mt-4 space-y-3 text-sm">
              <li className="flex items-start gap-2.5">
                <Icon name="phone" className="mt-0.5 h-4 w-4 shrink-0 text-slate-500" />
                <a href={`tel:${phone}`} className="text-slate-300 hover:text-white">
                  {phoneDisplay}
                </a>
              </li>
              <li className="flex items-start gap-2.5">
                <Icon name="headset" className="mt-0.5 h-4 w-4 shrink-0 text-slate-500" />
                <a href={`mailto:${email}`} className="break-all text-slate-300 hover:text-white">
                  {email}
                </a>
              </li>
              <li className="flex items-start gap-2.5">
                <Icon name="map" className="mt-0.5 h-4 w-4 shrink-0 text-slate-500" />
                <address className="not-italic leading-relaxed text-slate-400">
                  {addressLine}
                  <br />
                  {addressCity}, {addressRegionCode} {addressPostal}
                </address>
              </li>
              <li className="flex items-center gap-2.5">
                <Icon name="clock" className="h-4 w-4 shrink-0 text-slate-500" />
                <span className="text-slate-400">{hours}</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="border-t border-slate-800">
        <div className="mx-auto flex max-w-6xl flex-col gap-3 px-5 py-5 text-xs text-slate-500 sm:px-8 md:flex-row md:items-center md:justify-between">
          <p>
            © {year} {legalName}. All rights reserved. {name} is a registered trademark.
          </p>
          <ul className="flex flex-wrap items-center gap-x-4 gap-y-1">
            {legalLinks.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="underline-offset-4 transition hover:text-slate-300 hover:underline">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div className="mx-auto max-w-6xl px-5 pb-6 text-xs text-slate-600 sm:px-8">
          <p>
            Vehicle images are illustrative. Rates from ${siteConfig.hero.priceFrom}/day are based on
            availability and confirmed by phone. This site uses cookies and third-party analytics
            (including Google Analytics &amp; Google Ads) to measure performance — see our{" "}
            <Link href="/privacy-policy" className="underline-offset-4 hover:underline">
              Privacy Policy
            </Link>
            .
          </p>
        </div>
      </div>
    </footer>
  );
}
