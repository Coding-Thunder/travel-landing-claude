import Link from "next/link";
import { siteConfig } from "@/config/siteConfig";
import Container from "./components/ui/Container";
import Icon from "./components/ui/Icon";

const LINKS = [
  { label: "Airport rentals", href: "/airports" },
  { label: "Vehicle types", href: "/vehicles" },
  { label: "Blog", href: "/blog" },
  { label: "Contact", href: "/contact" },
];

export default function NotFound() {
  return (
    <Container className="flex min-h-[62vh] flex-col items-center justify-center py-20 text-center">
      <p className="text-7xl font-extrabold tracking-tight text-brand-600 sm:text-8xl">404</p>
      <h1 className="mt-4 text-2xl font-extrabold tracking-tight text-slate-900 sm:text-3xl">
        This page took a wrong turn
      </h1>
      <p className="mt-3 max-w-md text-slate-600">
        The page you&rsquo;re looking for doesn&rsquo;t exist or has moved. Let&rsquo;s get you back on the road.
      </p>

      <div className="mt-7 flex w-full flex-col gap-2.5 sm:w-auto sm:flex-row">
        <Link
          href="/"
          className="inline-flex items-center justify-center gap-2 rounded-xl bg-brand-600 px-6 py-3.5 text-base font-bold text-white shadow-[0_10px_30px_-10px_rgba(37,99,235,0.55)] transition hover:bg-brand-700"
        >
          Back to home
        </Link>
        <a
          href={`tel:${siteConfig.phone}`}
          className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-6 py-3.5 text-base font-bold text-slate-900 transition hover:bg-slate-50"
        >
          <Icon name="phone" className="h-5 w-5 text-brand-600" />
          Call {siteConfig.phoneVanity}
        </a>
      </div>

      <div className="mt-10 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-sm font-semibold text-slate-500">
        {LINKS.map((l) => (
          <Link key={l.href} href={l.href} className="transition hover:text-brand-700">
            {l.label}
          </Link>
        ))}
      </div>
    </Container>
  );
}
