import Link from "next/link";
import { site } from "@/config/site";
import Container from "@/app/components/trip/container";
import Reveal from "@/app/components/trip/reveal";
import Icon from "@/app/components/trip/lucide-icon";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <section className="bg-white py-24 sm:py-28 lg:py-32">
      <Container className="max-w-3xl text-center">
        <Reveal>
          <p className="text-7xl font-semibold tracking-tight text-navy-900 sm:text-8xl">404</p>
          <h1 className="mt-6 text-2xl font-semibold tracking-tight text-navy-900 sm:text-3xl">
            This page could not be found.
          </h1>
          <p className="mx-auto mt-4 max-w-md text-base leading-relaxed text-navy-600">
            The page you were looking for may have moved, or the link might be out of date. Start a search below, or
            our team is on hand if you would rather ask.
          </p>

          <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Button asChild variant="royal" size="lg">
              <Link href="/#search">{site.cta.primary}</Link>
            </Button>
            <Button asChild variant="navyOutline" size="lg">
              <Link href="/contact">Contact support</Link>
            </Button>
          </div>

          <div className="mt-12 border-t border-navy-100 pt-8">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-royal-600">Travel services</p>
            <ul className="mt-5 grid gap-3 sm:grid-cols-3">
              {site.services.map((s) => (
                <li key={s.key}>
                  <Link
                    href={s.href}
                    className="flex items-center gap-2.5 rounded-xl border border-navy-100 px-4 py-3 text-sm font-medium text-navy-700 transition hover:border-royal-200 hover:text-royal-700"
                  >
                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-royal-50 text-royal-600">
                      <Icon name={s.icon} className="h-4 w-4" />
                    </span>
                    {s.name}
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
