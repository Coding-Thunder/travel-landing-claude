import Link from "next/link";
import { siteConfig } from "@/config/siteConfig";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-slate-800 bg-slate-950 text-slate-300">
      <div className="mx-auto grid max-w-6xl gap-10 px-5 py-12 sm:px-8 sm:py-14 md:grid-cols-4">
        {/* Brand + pitch */}
        <div className="md:col-span-1">
          <p className="text-lg font-extrabold tracking-tight text-white">
            {siteConfig.name}
          </p>
          <p className="mt-1 text-xs font-semibold uppercase tracking-wider text-slate-500">
            {siteConfig.legalName}
          </p>
          <p className="mt-3 max-w-xs text-sm leading-relaxed text-slate-400">
            Locally operated car rental provider in {siteConfig.city},{" "}
            {siteConfig.regionCode}. Reservations by phone with a live agent.
          </p>
          <a
            href={`tel:${siteConfig.phone}`}
            className="mt-5 inline-flex items-center gap-2 rounded-lg bg-red-600 px-4 py-2.5 text-sm font-bold text-white transition hover:bg-red-700"
          >
            <svg
              className="h-4 w-4"
              viewBox="0 0 24 24"
              fill="currentColor"
              aria-hidden="true"
            >
              <path d="M20.01 15.38c-1.23 0-2.42-.2-3.53-.56a.977.977 0 00-1.01.24l-1.57 1.97c-2.83-1.35-5.48-3.9-6.89-6.83l1.95-1.66c.27-.28.35-.67.24-1.02-.37-1.11-.56-2.3-.56-3.53 0-.54-.45-.99-.99-.99H4.19C3.65 3 3 3.24 3 3.99 3 13.28 10.73 21 20.01 21c.71 0 .99-.63.99-1.18v-3.45c0-.54-.45-.99-.99-.99z" />
            </svg>
            {siteConfig.phoneDisplay}
          </a>
        </div>

        {/* Contact */}
        <div>
          <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">
            Contact
          </p>
          <ul className="mt-4 space-y-2 text-sm">
            <li>
              <a
                href={`tel:${siteConfig.phone}`}
                className="text-slate-300 hover:text-white"
              >
                {siteConfig.phoneDisplay}
              </a>
            </li>
            <li>
              <a
                href={`mailto:${siteConfig.email}`}
                className="break-all text-slate-300 hover:text-white"
              >
                {siteConfig.email}
              </a>
            </li>
            <li>
              <a
                href={siteConfig.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-slate-300 hover:text-white"
              >
                WhatsApp
              </a>
            </li>
            <li className="text-slate-400">{siteConfig.hours}</li>
          </ul>
        </div>

        {/* Location */}
        <div>
          <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">
            Location
          </p>
          <address className="mt-4 not-italic text-sm leading-relaxed text-slate-400">
            {siteConfig.addressLine}
            <br />
            {siteConfig.addressCity}, {siteConfig.addressRegionCode}{" "}
            {siteConfig.addressPostal}
            <br />
            {siteConfig.addressRegion}, {siteConfig.country}
          </address>
          <p className="mt-3 text-xs text-slate-500">
            Pickup &amp; delivery across the {siteConfig.city} area.
          </p>
        </div>

        {/* Legal */}
        <div>
          <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">
            Legal
          </p>
          <ul className="mt-4 space-y-2 text-sm">
            {siteConfig.legalLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="text-slate-300 hover:text-white"
                >
                  {link.label}
                </Link>
              </li>
            ))}
            <li>
              <Link href="/#about" className="text-slate-300 hover:text-white">
                About the business
              </Link>
            </li>
            <li>
              <Link
                href="/#how-it-works"
                className="text-slate-300 hover:text-white"
              >
                How it works
              </Link>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-slate-800">
        <div className="mx-auto flex max-w-6xl flex-col gap-3 px-5 py-5 text-xs text-slate-500 sm:px-8 md:flex-row md:items-center md:justify-between">
          <p>
            © {year} {siteConfig.legalName}. All rights reserved.
          </p>
          <p className="text-slate-500">
            This site uses cookies and third-party analytics (including Google
            Analytics &amp; Google Ads) to measure performance. See our{" "}
            <Link
              href="/privacy-policy"
              className="underline-offset-4 hover:underline"
            >
              Privacy Policy
            </Link>
            .
          </p>
        </div>
      </div>
    </footer>
  );
}
