import type { Metadata } from "next";
import { siteConfig } from "@/config/siteConfig";
import Container from "../components/ui/Container";
import Icon from "../components/ui/Icon";
import PageHero from "../components/PageHero";
import CtaButton from "../components/call/CtaButton";
import JsonLd from "../components/seo/JsonLd";
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
        <div className="mx-auto max-w-3xl text-[15px] leading-relaxed text-slate-700 sm:text-base">
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

        {/* Stats */}
        <dl className="mt-12 grid grid-cols-2 gap-4 rounded-2xl border border-slate-200 bg-slate-50 p-6 sm:grid-cols-4 sm:gap-6 sm:p-8">
          {stats.map((s) => (
            <div key={s.label} className="text-center">
              <dt className="sr-only">{s.label}</dt>
              <dd>
                <span className="block text-2xl font-extrabold tracking-tight text-slate-900 sm:text-3xl">{s.value}</span>
                <span className="mt-1 block text-xs font-medium uppercase tracking-wider text-slate-500">{s.label}</span>
              </dd>
            </div>
          ))}
        </dl>

        {/* Values */}
        <h2 className="mt-14 text-2xl font-extrabold tracking-tight text-slate-900 sm:text-3xl">
          What we stand for
        </h2>
        <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2">
          {VALUES.map((v) => (
            <article key={v.title} className="flex gap-4 rounded-2xl border border-slate-200 bg-white p-6">
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-brand-50 text-brand-600">
                <Icon name={v.icon} className="h-5 w-5" />
              </span>
              <div>
                <h3 className="text-base font-bold text-slate-900">{v.title}</h3>
                <p className="mt-1 text-sm leading-relaxed text-slate-600">{v.body}</p>
              </div>
            </article>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-12 flex flex-col items-center justify-center gap-3 rounded-2xl border border-brand-100 bg-brand-50 p-6 text-center sm:flex-row sm:p-8">
          <p className="flex-1 text-base font-bold text-slate-900 sm:text-lg">
            Ready to drive? Talk to a {name} agent now.
          </p>
          <div className="flex flex-col gap-2 sm:flex-row">
            <a
              href={`tel:${phone}`}
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-brand-600 px-6 py-3.5 text-base font-bold text-white shadow-[0_10px_30px_-10px_rgba(37,99,235,0.55)] transition hover:bg-brand-700"
            >
              <Icon name="phone" className="h-5 w-5" />
              Call {phoneVanity}
            </a>
            <CtaButton source="about-callback" variant="secondary" size="lg">
              Request a Callback
            </CtaButton>
          </div>
        </div>
      </Container>
    </>
  );
}
