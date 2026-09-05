import Link from "next/link";
import { siteConfig } from "@/config/siteConfig";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import Container from "./components/ui/Container";
import Icon from "./components/ui/Icon";

const LINKS = [
  { label: "Airport rentals", href: "/airports" },
  { label: "Vehicle types", href: "/vehicles" },
  { label: "Blog", href: "/blog" },
  { label: "Contact", href: "/contact" },
];

/**
 * 404.
 *
 * The status code is demoted to the eyebrow and the sentence carries the page,
 * which is the same header hierarchy every interior route uses. Below it the
 * two real exits (home and the phone), then the quiet route list, so a dead
 * URL still ends in a call rather than a dead end.
 */
export default function NotFound() {
  return (
    <Container className="flex min-h-[62vh] flex-col items-center justify-center py-14 text-center sm:py-16">
      <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">404</p>
      <h1 className="mt-1.5 font-display text-3xl tracking-tight sm:text-4xl">
        This page took a wrong turn
      </h1>
      <p className="mt-3 max-w-md text-[15px] leading-relaxed text-muted-foreground">
        The page you&rsquo;re looking for doesn&rsquo;t exist or has moved. Let&rsquo;s get you back on the road.
      </p>

      <div className="mt-7 flex w-full flex-col gap-2 sm:w-auto sm:flex-row">
        <Button asChild size="lg">
          <Link href="/">Back to home</Link>
        </Button>
        <Button asChild variant="outline" size="lg">
          <a href={`tel:${siteConfig.phone}`}>
            <Icon name="phone" />
            Call {siteConfig.phoneVanity}
          </a>
        </Button>
      </div>

      <Separator className="mt-10 max-w-md" />

      <nav className="mt-6 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-sm text-muted-foreground">
        {LINKS.map((l) => (
          <Link
            key={l.href}
            href={l.href}
            className="font-medium transition-colors hover:text-primary"
          >
            {l.label}
          </Link>
        ))}
      </nav>
    </Container>
  );
}
