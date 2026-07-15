import Link from "next/link";
import Container from "@/app/components/trip/container";
import Reveal from "@/app/components/trip/reveal";
import { Button } from "@/components/ui/button";

const QUICK_LINKS = [
  { label: "Browse hotel categories", href: "/hotels" },
  { label: "Frequently asked questions", href: "/faq" },
];

export default function NotFound() {
  return (
    <section className="bg-white py-24 sm:py-28 lg:py-32">
      <Container className="max-w-2xl text-center">
        <Reveal>
          <p className="text-7xl font-semibold tracking-tight text-navy-900 sm:text-8xl">404</p>
          <h1 className="mt-6 text-2xl font-semibold tracking-tight text-navy-900 sm:text-3xl">
            This page could not be found.
          </h1>
          <p className="mx-auto mt-4 max-w-md text-base leading-relaxed text-navy-600">
            The page you were looking for may have moved, or the link might be
            out of date. Our reservation team is on hand if you need help finding
            the right stay.
          </p>

          <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Button asChild variant="royal" size="lg">
              <Link href="/">Back to home</Link>
            </Button>
            <Button asChild variant="navyOutline" size="lg">
              <Link href="/contact">Contact support</Link>
            </Button>
          </div>

          <div className="mt-12 border-t border-navy-100 pt-8">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-royal-600">
              Popular pages
            </p>
            <ul className="mt-4 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm font-medium text-navy-700">
              {QUICK_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="underline-offset-4 transition-colors hover:text-royal-700 hover:underline"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
