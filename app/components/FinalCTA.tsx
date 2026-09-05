import { siteConfig } from "@/config/siteConfig";
import Container from "./ui/Container";
import Icon from "./ui/Icon";
import CtaButton from "./call/CtaButton";
import { Button } from "@/components/ui/button";

/**
 * The closing conversion band.
 *
 * The number is the largest thing on the page here, and it is a real tel: link
 * rather than a decorative display, so tapping the big type dials.
 */
export default function FinalCTA() {
  const { finalCta, phone, phoneVanity, phoneDisplay, callResponse } = siteConfig;

  return (
    <section className="dark border-t bg-background text-foreground">
      <Container className="py-14 sm:py-16">
        <div className="grid gap-8 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-6">
            <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
              {finalCta.eyebrow}
            </p>
            <h2 className="mt-2 font-display text-3xl tracking-tight sm:text-4xl">{finalCta.title}</h2>
            <p className="mt-3 text-[15px] leading-relaxed text-muted-foreground">{finalCta.subtitle}</p>

            <ul className="mt-6 grid gap-2 sm:grid-cols-2">
              {finalCta.points.map((p) => (
                <li key={p} className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Icon name="check" className="h-4 w-4 shrink-0 text-primary" />
                  {p}
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-5 lg:col-start-8">
            <a
              href={`tel:${phone}`}
              data-cta="final-cta-number"
              className="block rounded-lg border bg-card p-6 transition-colors hover:bg-accent"
            >
              <span className="text-xs font-medium text-muted-foreground">
                Reservations · {callResponse}
              </span>
              <span className="mt-1 flex items-center gap-2.5 text-3xl font-semibold tracking-tight sm:text-4xl">
                <Icon name="phone" className="h-7 w-7 shrink-0 text-primary" />
                {phoneVanity}
              </span>
              <span className="mt-1 block text-sm text-muted-foreground">{phoneDisplay}</span>
            </a>

            <div className="mt-3 flex flex-col gap-2 sm:flex-row">
              <Button asChild size="lg" className="w-full sm:flex-1" data-cta="final-cta-call">
                <a href={`tel:${phone}`}>
                  <Icon name="phone" />
                  Call Now
                </a>
              </Button>
              <CtaButton source="final-cta-callback" variant="outline" size="lg" fullWidth className="sm:flex-1">
                <Icon name="headset" />
                Request a Callback
              </CtaButton>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
