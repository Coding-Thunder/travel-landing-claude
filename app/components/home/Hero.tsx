import Image from "next/image";
import { airports } from "@/config/airports";
import { siteConfig } from "@/config/siteConfig";
import { Button } from "@/components/ui/button";
import Container from "../ui/Container";
import Icon from "../ui/Icon";
import BookingForm from "../booking/BookingForm";

/**
 * The hero backdrop: an ordinary full-size SUV on an open American road.
 *
 * The previous backdrop was an aircraft wing, left over from the travel site
 * this codebase grew out of — the wrong subject entirely for a car rental
 * brand. The replacement is deliberately an unbadged, everyday rental-class
 * vehicle rather than a luxury car: this brand is called My Budget Car, and a
 * recognisable premium marque in the hero works against that. Composition
 * keeps the vehicle right of centre so the headline sits over open sky.
 */
const HERO_IMAGE =
  "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&w=1920&q=60";

const TRUST = ["No hidden fees", "Free cancellation", "24/7 support", "Licensed & insured"];

/**
 * Home page hero.
 *
 * Deliberately short: the search module is the focal point, so the copy above
 * it earns its space or comes out. `dark` swaps the token scope, which is how
 * this renders on the deep surface without a single raw colour value.
 *
 * The phone number is a real button here, not a text link. On a site whose
 * primary conversion is a call, the dial has to be a first-class control above
 * the fold rather than a sentence someone has to find.
 */
export default function Hero() {
  const { phone, phoneVanity } = siteConfig;
  const heroAirports = airports.map((a) => ({ iata: a.iata, city: a.city }));

  return (
    <>
      <section className="dark relative isolate border-b bg-background text-foreground">
        <Image
          src={HERO_IMAGE}
          alt=""
          aria-hidden
          fill
          preload
          quality={55}
          sizes="(max-width: 640px) 100vw, 960px"
          className="object-cover object-[70%_center] opacity-30"
        />
        <div aria-hidden className="absolute inset-0 bg-background/70" />

        <Container className="relative pb-10 pt-12 sm:pb-12 sm:pt-16">
          <div className="max-w-2xl">
            <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
              Airport car rental · 300+ US locations
            </p>
            <h1 className="mt-3 font-display text-3xl leading-tight tracking-tight sm:text-4xl lg:text-[2.75rem]">
              Rent a car the moment you land.
            </h1>
            <p className="mt-3 max-w-xl text-base leading-relaxed text-muted-foreground">
              Premium vehicles at every major US airport, confirmed in a single call. No hidden fees, free
              cancellation, and a real person on the line — around the clock.
            </p>

            <div className="mt-6 flex flex-wrap items-center gap-3">
              <Button asChild size="lg" data-cta="hero-call">
                <a href={`tel:${phone}`}>
                  <Icon name="phone" />
                  Call {phoneVanity}
                </a>
              </Button>
              <Button asChild variant="outline" size="lg">
                <a href="#search">
                  <Icon name="search" />
                  Check availability
                </a>
              </Button>
            </div>

            <ul className="mt-6 flex flex-wrap gap-x-5 gap-y-1.5 text-[13px] text-muted-foreground">
              {TRUST.map((t) => (
                <li key={t} className="flex items-center gap-1.5">
                  <Icon name="check" className="h-3.5 w-3.5 shrink-0 text-primary" />
                  {t}
                </li>
              ))}
            </ul>
          </div>
        </Container>
      </section>

      {/* The search module, lifted over the hero edge so it reads as the
          primary interaction surface rather than another content band. */}
      <Container id="search" className="relative z-10 -mt-6 scroll-mt-20">
        <div className="rounded-lg border bg-card p-4 shadow-md sm:p-5">
          <BookingForm airports={heroAirports} />
        </div>
      </Container>
    </>
  );
}
