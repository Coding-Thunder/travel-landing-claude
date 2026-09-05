import type { Metadata } from "next";
import { siteConfig } from "@/config/siteConfig";
import Container from "../components/ui/Container";
import Icon from "../components/ui/Icon";
import PageHero from "../components/PageHero";
import CtaButton from "../components/call/CtaButton";
import JsonLd from "../components/seo/JsonLd";
import { Button } from "@/components/ui/button";
import { breadcrumbSchema, organizationSchema } from "@/lib/schema";

export const metadata: Metadata = {
  title: "About Us — Licensed Nationwide Car Rental",
  description: `Learn about ${siteConfig.name}, a licensed and insured car rental provider serving all 50 US states. Transparent pricing, 24/7 live support and a fleet for every trip — book by phone in minutes.`,
  alternates: { canonical: "/about" },
  openGraph: {
    title: `About ${siteConfig.name}`,
    description: `Licensed, insured nationwide car rental with transparent pricing and 24/7 live phone support.`,
    url: "/about",
    type: "website",
  },
};

const VALUES = [
  { icon: "tag" as const, title: "Transparent by default", body: "The all-in price we quote on the phone is exactly what you pay at pickup. No junk fees, no fine-print surprises." },
  { icon: "headset" as const, title: "Real people, 24/7", body: "Every call is answered by a live US-based agent — day, night, weekends and holidays. No phone trees, no chatbots." },
  { icon: "shield" as const, title: "Licensed & insured", body: "We operate as a fully licensed and insured rental provider, with coverage and roadside assistance available on every booking." },
  { icon: "map" as const, title: "Truly nationwide", body: "300+ airport and city pickup locations across all 50 states, with one-way rentals between cities." },
];

export default function AboutPage() {
  const { name, legalName, phone, phoneVanity, stats, trust } = siteConfig;

  return (
    <>
      <JsonLd
        data={[
          organizationSchema(),
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "About Us", path: "/about" },
          ]),
        ]}
      />

      <PageHero
        eyebrow="About us"
        title={`Car rental, the way it should be`}
        subtitle={`${name} is a nationwide car rental provider built on a simple idea: renting a car should be fast, honest and human.`}
        breadcrumbs={[
          { name: "Home", href: "/" },
          { name: "About Us", href: "/about" },
        ]}
      />

      <Container className="py-14 sm:py-16">
        <div className="max-w-3xl text-[15px] leading-relaxed text-muted-foreground">
          <p>
            {name} was founded to fix the parts of car rental that frustrate travelers most — confusing
            online checkouts, surprise fees at the counter, and support lines that never seem to reach a
            real person. We took a different approach: reserve by phone with a live US-based agent who
            quotes one clear, all-in price and has your vehicle ready when you arrive.
          </p>
          <p className="mt-4">
            Today we serve drivers in all 50 states through a network of more than 300 airport and city
            pickup locations. Our fleet spans fuel-efficient economy and compact cars, spacious SUVs and
            seven-seat minivans, premium luxury sedans, zero-emission electric vehicles, convertibles and
            pickup trucks — so there&rsquo;s a right vehicle for every trip, whether it&rsquo;s a weekend getaway, a
            business trip, or a cross-country family vacation.
          </p>
          <p className="mt-4">
            What hasn&rsquo;t changed is our commitment to transparency. The rate we quote includes taxes and
            mandatory fees, free cancellation is standard up to the moment of pickup, and 24/7 roadside
            assistance means help is always one call away. {legalName} is fully licensed and insured, and
            our agents are trained to answer questions about coverage, additional drivers and requirements
            clearly and honestly — before you ever commit.
          </p>
          <p className="mt-4">
            We measure our success in repeat customers and word-of-mouth referrals, not upsells. That focus
            has earned {name} an average rating of {trust.rating} out of 5 from {trust.ratingCount} verified
            rentals — and it&rsquo;s why so many drivers call us first.
          </p>
        </div>

        {/* Stats — one hairline grid rather than four floating panels. */}
        <dl className="mt-10 grid grid-cols-2 gap-px overflow-hidden rounded-lg border bg-border sm:grid-cols-4">
          {stats.map((s) => (
            <div key={s.label} className="bg-card p-5 text-center">
              <dt className="sr-only">{s.label}</dt>
              <dd>
                <span className="block text-2xl font-semibold tracking-tight tabular-nums">{s.value}</span>
                <span className="mt-1 block text-xs font-medium uppercase tracking-wider text-muted-foreground">{s.label}</span>
              </dd>
            </div>
          ))}
        </dl>

        {/* Values */}
        <h2 className="mt-14 text-xl font-semibold tracking-tight sm:text-2xl">
          What we stand for
        </h2>
        <ul className="mt-6 grid gap-px overflow-hidden rounded-lg border bg-border sm:grid-cols-2">
          {VALUES.map((v) => (
            <li key={v.title} className="flex flex-col bg-card p-5">
              <h3 className="flex items-center gap-2 text-[15px] font-medium">
                <Icon name={v.icon} className="h-4 w-4 shrink-0 text-primary" />
                {v.title}
              </h3>
              <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{v.body}</p>
            </li>
          ))}
        </ul>

        {/* CTA */}
        <div className="mt-12 flex flex-col items-start gap-5 rounded-lg border bg-muted/50 p-6 sm:flex-row sm:items-center sm:justify-between sm:p-7">
          <p className="flex-1 text-[15px] font-medium">
            Ready to drive? Talk to a {name} agent now.
          </p>
          <div className="flex w-full flex-col gap-2 sm:w-auto sm:flex-row">
            <Button asChild size="lg">
              <a href={`tel:${phone}`}>
                <Icon name="phone" />
                Call {phoneVanity}
              </a>
            </Button>
            <CtaButton source="about-callback" variant="outline" size="lg">
              Request a Callback
            </CtaButton>
          </div>
        </div>
      </Container>
    </>
  );
}
