import Link from "next/link";
import { siteConfig } from "@/config/siteConfig";
import Icon from "./ui/Icon";
import { Logo } from "./site/logo";
import { Separator } from "@/components/ui/separator";

/**
 * Inverted scope: the `dark` class swaps the token values, so every component
 * inside renders correctly against the deep surface without a parallel set of
 * colour classes.
 */
export default function Footer() {
  const year = new Date().getFullYear();
  const {
    name,
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
    <footer className="dark border-t bg-background text-foreground">
      <div className="mx-auto max-w-6xl px-5 py-12 sm:px-8">
        <div className="grid gap-10 lg:grid-cols-12">
          {/* Brand and the call block. The number is the conversion, so it is
              the only thing in the footer with a card around it. */}
          <div className="lg:col-span-4">
            <Logo />
            <p className="mt-3 max-w-xs text-sm leading-relaxed text-muted-foreground">
              Licensed, insured car rentals nationwide. Reserve by phone with a live US-based agent: no
              hidden fees, free cancellation, instant confirmation.
            </p>

            <a
              href={`tel:${phone}`}
              data-cta="footer-call"
              className="mt-5 inline-flex flex-col rounded-lg border bg-card px-5 py-3.5 transition-colors hover:bg-accent"
            >
              <span className="text-xs font-medium text-muted-foreground">Reservations · {hours}</span>
              <span className="mt-0.5 flex items-center gap-2 text-xl font-semibold tracking-tight">
                <Icon name="phone" className="h-5 w-5 text-primary" />
                {phoneVanity}
              </span>
            </a>

            <ul className="mt-6 flex items-center gap-2">
              {social.map((s) => (
                <li key={s.label}>
                  <a
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={s.label}
                    className="flex h-10 w-10 items-center justify-center rounded-md border text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
                  >
                    <Icon name={s.icon as "facebook"} className="h-4 w-4" />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="grid grid-cols-2 gap-x-6 gap-y-8 sm:grid-cols-3 lg:col-span-5">
            {footerColumns.map((col) => (
              <nav key={col.title} aria-label={col.title}>
                <h2 className="text-sm font-medium text-foreground">{col.title}</h2>
                <ul className="mt-3 space-y-2 text-sm">
                  {col.links.map((l) => (
                    <li key={l.label}>
                      <Link
                        href={l.href}
                        className="inline-block rounded-sm py-1 text-muted-foreground transition-colors hover:text-foreground"
                      >
                        {l.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
            ))}
          </div>

          <div className="lg:col-span-3">
            <h2 className="text-sm font-medium text-foreground">Contact</h2>
            <ul className="mt-3 space-y-3 text-sm text-muted-foreground">
              <li className="flex items-start gap-2.5">
                <Icon name="phone" className="mt-0.5 h-4 w-4 shrink-0" />
                <a href={`tel:${phone}`} className="transition-colors hover:text-foreground">
                  {phoneDisplay}
                </a>
              </li>
              <li className="flex items-start gap-2.5">
                <Icon name="mail" className="mt-0.5 h-4 w-4 shrink-0" />
                <a href={`mailto:${email}`} className="break-all transition-colors hover:text-foreground">
                  {email}
                </a>
              </li>
              <li className="flex items-start gap-2.5">
                <Icon name="pin" className="mt-0.5 h-4 w-4 shrink-0" />
                <address className="not-italic leading-relaxed">
                  {addressLine}
                  <br />
                  {addressCity}, {addressRegionCode} {addressPostal}
                </address>
              </li>
              <li className="flex items-start gap-2.5">
                <Icon name="clock" className="mt-0.5 h-4 w-4 shrink-0" />
                <span>{hours}</span>
              </li>
            </ul>
          </div>
        </div>

        <Separator className="my-8" />

        <p className="max-w-4xl text-xs leading-relaxed text-muted-foreground">
          Vehicle images are illustrative. Rates from ${siteConfig.hero.priceFrom}/day are based on
          availability and confirmed by phone. This site uses cookies and third-party analytics
          (including Google Analytics &amp; Google Ads) to measure performance. See our{" "}
          <Link href="/privacy-policy" className="underline underline-offset-4 hover:text-foreground">
            Privacy Policy
          </Link>
          .
        </p>

        <div className="mt-6 flex flex-col gap-2 text-xs text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {year} {legalName}. All rights reserved. {name} is a registered trademark.
          </p>
          <ul className="flex flex-wrap items-center gap-x-4 gap-y-1">
            {legalLinks.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="inline-block rounded-sm py-1 transition-colors hover:text-foreground">
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
