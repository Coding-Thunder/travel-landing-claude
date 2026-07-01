import Link from "next/link";
import { siteConfig } from "@/config/siteConfig";
import Icon from "./ui/Icon";
import CtaButton from "./call/CtaButton";

const NAV = [
  { label: "Airports", href: "/airports" },
  { label: "Vehicles", href: "/vehicles" },
  { label: "How it works", href: "/#how-it-works" },
  { label: "Blog", href: "/blog" },
  { label: "FAQ", href: "/#faq" },
];

export default function Header() {
  const { phone, phoneVanity, shortName } = siteConfig;

  return (
    <header>
      {/* Utility bar — toll-free number always visible */}
      <div className="bg-brand-700 text-white">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-5 py-2 text-xs sm:px-8">
          <p className="hidden items-center gap-2 font-medium text-white/90 sm:flex">
            <Icon name="shield" className="h-4 w-4 text-brand-200" />
            Licensed &amp; insured · Nationwide coverage in all 50 states
          </p>
          <a
            href={`tel:${phone}`}
            className="mx-auto flex items-center gap-2 font-semibold hover:text-white/90 sm:mx-0"
          >
            <span className="text-white/70">Call 24/7:</span>
            <span className="inline-flex items-center gap-1 font-extrabold tracking-tight">
              <Icon name="phone" className="h-3.5 w-3.5" />
              {phoneVanity}
            </span>
          </a>
        </div>
      </div>

      {/* Main nav — sticky */}
      <div className="sticky top-0 z-30 border-b border-slate-200 bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/80">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-5 py-3 sm:px-8">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5" aria-label={`${shortName} home`}>
            <span className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-brand-600 text-white shadow-[0_8px_20px_-8px_rgba(37,99,235,0.7)]">
              <Icon name="car" className="h-5 w-5" />
            </span>
            <span className="leading-none">
              <span className="block text-lg font-extrabold tracking-tight text-slate-900">
                {shortName}
              </span>
              <span className="block text-[10px] font-semibold uppercase tracking-[0.16em] text-slate-400">
                Car Rental
              </span>
            </span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden items-center gap-7 lg:flex" aria-label="Primary">
            {NAV.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-sm font-semibold text-slate-600 transition hover:text-brand-700"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* Right cluster */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Prominent toll-free (tablet+) */}
            <a href={`tel:${phone}`} className="hidden text-right leading-tight md:block">
              <span className="block text-[10px] font-semibold uppercase tracking-wider text-slate-400">
                Call 24/7 · best rate
              </span>
              <span className="block text-lg font-extrabold tracking-tight text-slate-900 hover:text-brand-700">
                {phoneVanity}
              </span>
            </a>

            {/* Get quote (soft CTA → popup) */}
            <CtaButton source="header-quote" variant="secondary" size="sm" className="hidden lg:inline-flex">
              Get Quote
            </CtaButton>

            {/* Call Now — desktop */}
            <a
              href={`tel:${phone}`}
              className="hidden items-center gap-2 rounded-xl bg-brand-600 px-4 py-2.5 text-sm font-bold text-white shadow-[0_8px_20px_-8px_rgba(37,99,235,0.6)] transition hover:bg-brand-700 sm:inline-flex"
            >
              <Icon name="phone" className="h-4 w-4" />
              Call Now
            </a>

            {/* Call — mobile one-tap */}
            <a
              href={`tel:${phone}`}
              aria-label={`Call ${phoneVanity}`}
              className="inline-flex items-center gap-1.5 rounded-xl bg-brand-600 px-3.5 py-2.5 text-sm font-bold text-white shadow-sm active:scale-[0.98] sm:hidden"
            >
              <Icon name="phone" className="h-4 w-4" />
              Call
            </a>
          </div>
        </div>
      </div>
    </header>
  );
}
