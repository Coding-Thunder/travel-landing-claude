import type { Metadata } from "next";
import { siteConfig } from "@/config/siteConfig";
import Container from "../components/ui/Container";
import Icon from "../components/ui/Icon";
import PageHero from "../components/PageHero";
import CtaButton from "../components/call/CtaButton";
import JsonLd from "../components/seo/JsonLd";
import { Button } from "@/components/ui/button";
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
      icon: "mail" as const,
      label: "Email us",
      value: email,
      sub: "We reply within one business day",
      href: `mailto:${email}`,
    },
    {
      icon: "pin" as const,
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
        {/* Primary call CTA — the number is the dominant action, the callback steps down. */}
        <div className="rounded-lg border bg-muted/50 p-6 sm:p-7">
          <div className="flex flex-col items-start gap-5 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                Reservations &amp; support · 24/7
              </p>
              <a
                href={`tel:${phone}`}
                className="mt-1 block text-2xl font-semibold tracking-tight transition-colors hover:text-primary sm:text-3xl"
              >
                {phoneVanity}
              </a>
              <p className="mt-1 text-sm text-muted-foreground">{phoneDisplay} · {callResponse}</p>
            </div>
            <div className="flex w-full flex-col gap-2 sm:w-auto sm:flex-row">
              <Button asChild size="lg">
                <a href={`tel:${phone}`}>
                  <Icon name="phone" />
                  Call Now
                </a>
              </Button>
              <CtaButton source="contact-callback" variant="outline" size="lg">
                <Icon name="headset" />
                Request a Callback
              </CtaButton>
            </div>
          </div>
        </div>

        {/* Contact methods — one hairline grid rather than four floating cards. */}
        <ul className="mt-8 grid gap-px overflow-hidden rounded-lg border bg-border sm:grid-cols-2 lg:grid-cols-4">
          {methods.map((m) => {
            const inner = (
              <>
                <span className="flex items-center gap-2 text-xs font-medium uppercase tracking-wider text-muted-foreground">
                  <Icon name={m.icon} className="h-4 w-4 shrink-0 text-primary" />
                  {m.label}
                </span>
                <span className="mt-2 block text-[15px] font-medium [overflow-wrap:anywhere]">{m.value}</span>
                <span className="mt-1 block text-sm leading-relaxed text-muted-foreground">{m.sub}</span>
              </>
            );
            return (
              <li key={m.label} className="flex">
                {m.href ? (
                  <a
                    href={m.href}
                    className="flex w-full flex-col bg-card p-5 transition-colors hover:bg-accent"
                  >
                    {inner}
                  </a>
                ) : (
                  <div className="flex w-full flex-col bg-card p-5">{inner}</div>
                )}
              </li>
            );
          })}
        </ul>

        {/* Business transparency */}
        <div className="mt-8 rounded-lg border bg-muted/40 p-6 sm:p-7">
          <h2 className="flex items-center gap-2 text-xl font-semibold tracking-tight sm:text-2xl">
            <Icon name="shield" className="h-5 w-5 shrink-0 text-primary" />
            About our business
          </h2>
          <p className="mt-3 max-w-3xl text-sm leading-relaxed text-muted-foreground">{business.description}</p>
          <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{supportHours}</p>
        </div>
      </Container>
    </>
  );
}
