import type { Metadata } from "next";
import { siteConfig } from "@/config/siteConfig";
import Container from "../components/ui/Container";
import Icon from "../components/ui/Icon";
import PageHero from "../components/PageHero";
import CtaButton from "../components/call/CtaButton";
import JsonLd from "../components/seo/JsonLd";
import { breadcrumbSchema, localBusinessSchema, organizationSchema } from "@/lib/schema";

export const metadata: Metadata = {
  title: "Contact Us — 24/7 Phone Reservations & Support",
  description: `Contact ${siteConfig.name} for car rental reservations and support. Call ${siteConfig.phoneDisplay} 24/7, request a callback, or email ${siteConfig.email}. Nationwide coverage across all 50 US states.`,
  alternates: { canonical: "/contact" },
  openGraph: {
    title: `Contact ${siteConfig.name}`,
    description: `Call ${siteConfig.phoneDisplay} 24/7 or request a callback for car rental reservations and support.`,
    url: "/contact",
    type: "website",
  },
};

export default function ContactPage() {
  const { phone, phoneVanity, phoneDisplay, callResponse, email, addressLine, addressCity, addressRegionCode, addressPostal, supportHours, business, name } = siteConfig;

  const methods = [
    {
      icon: "phone" as const,
      label: "Call us",
      value: phoneVanity,
      sub: `${phoneDisplay} · ${callResponse}`,
      href: `tel:${phone}`,
    },
    {
      icon: "headset" as const,
      label: "Email us",
      value: email,
      sub: "We reply within one business day",
      href: `mailto:${email}`,
    },
    {
      icon: "map" as const,
      label: "Mailing address",
      value: `${addressCity}, ${addressRegionCode} ${addressPostal}`,
      sub: addressLine,
      href: undefined,
    },
    {
      icon: "clock" as const,
      label: "Support hours",
      value: "Open 24/7",
      sub: "Including weekends & holidays",
      href: undefined,
    },
  ];

  return (
    <>
      <JsonLd
        data={[
          organizationSchema(),
          localBusinessSchema(),
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Contact Us", path: "/contact" },
          ]),
        ]}
      />

      <PageHero
        eyebrow="Contact us"
        title="We're here 24/7 — just call"
        subtitle={`Speak with a live US-based ${name} agent any time, day or night. Call for the best rate, request a callback, or send us a message.`}
        breadcrumbs={[
          { name: "Home", href: "/" },
          { name: "Contact Us", href: "/contact" },
        ]}
      />

      <Container className="py-14 sm:py-16">
        {/* Primary call CTA */}
        <div className="rounded-3xl border border-brand-100 bg-brand-50 p-6 sm:p-8">
          <div className="flex flex-col items-start gap-5 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-brand-700">
                Reservations &amp; support · 24/7
              </p>
              <a
                href={`tel:${phone}`}
                className="mt-1 block text-3xl font-extrabold tracking-tight text-slate-900 hover:text-brand-700 sm:text-4xl"
              >
                {phoneVanity}
              </a>
              <p className="mt-1 text-sm text-slate-600">{phoneDisplay} · {callResponse}</p>
            </div>
            <div className="flex w-full flex-col gap-2.5 sm:w-auto sm:flex-row">
              <a
                href={`tel:${phone}`}
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-brand-600 px-6 py-3.5 text-base font-bold text-white shadow-[0_10px_30px_-10px_rgba(37,99,235,0.55)] transition hover:bg-brand-700"
              >
                <Icon name="phone" className="h-5 w-5" />
                Call Now
              </a>
              <CtaButton source="contact-callback" variant="secondary" size="lg">
                <Icon name="headset" className="h-5 w-5 text-brand-600" />
                Request a Callback
              </CtaButton>
            </div>
          </div>
        </div>

        {/* Contact methods */}
        <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {methods.map((m) => {
            const inner = (
              <>
                <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand-50 text-brand-600">
                  <Icon name={m.icon} className="h-5 w-5" />
                </span>
                <p className="mt-4 text-xs font-semibold uppercase tracking-wider text-slate-400">{m.label}</p>
                <p className="mt-1 text-base font-bold text-slate-900">{m.value}</p>
                <p className="mt-0.5 text-sm text-slate-500">{m.sub}</p>
              </>
            );
            return m.href ? (
              <a key={m.label} href={m.href} className="rounded-2xl border border-slate-200 bg-white p-5 transition hover:border-brand-200 hover:shadow-[var(--shadow-card)]">
                {inner}
              </a>
            ) : (
              <div key={m.label} className="rounded-2xl border border-slate-200 bg-white p-5">
                {inner}
              </div>
            );
          })}
        </div>

        {/* Business transparency */}
        <div className="mt-8 rounded-2xl border border-slate-200 bg-slate-50 p-6 sm:p-7">
          <h2 className="flex items-center gap-2 text-lg font-bold text-slate-900">
            <Icon name="shield" className="h-5 w-5 text-brand-600" />
            About our business
          </h2>
          <p className="mt-3 max-w-3xl text-sm leading-relaxed text-slate-600">{business.description}</p>
          <p className="mt-3 text-sm text-slate-600">{supportHours}</p>
        </div>
      </Container>
    </>
  );
}
