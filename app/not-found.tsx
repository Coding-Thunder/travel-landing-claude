import Link from "next/link";
import { site } from "@/config/site";
import Container from "@/app/components/trip/container";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

export default function NotFound() {
  return (
    <Container className="py-20 sm:py-24">
      <div className="max-w-xl">
        <p className="text-sm font-medium text-muted-foreground">404</p>
        <h1 className="mt-2 font-display text-3xl tracking-tight sm:text-4xl">This page could not be found</h1>
        <p className="mt-3 text-[15px] leading-relaxed text-muted-foreground">
          The page may have moved, or the link might be out of date. Start a search below, or ask our team.
        </p>
        <div className="mt-6 flex flex-wrap gap-2">
          <Button asChild>
            <Link href="/#search">{site.cta.primary}</Link>
          </Button>
          <Button asChild variant="outline">
            <Link href="/contact">Contact support</Link>
          </Button>
        </div>
      </div>

      <Separator className="my-10" />

      <h2 className="text-sm font-medium">Travel services</h2>
      <ul className="mt-4 grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
        {site.services.map((s) => (
          <li key={s.key}>
            <Link
              href={s.href}
              className="block rounded-md px-3 py-2 text-sm transition-colors hover:bg-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              {s.name}
            </Link>
          </li>
        ))}
      </ul>
    </Container>
  );
}
