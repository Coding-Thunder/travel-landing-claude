import Link from "next/link";
import { ArrowRight, Check, Phone } from "lucide-react";
import { site, telHref, type Service } from "@/config/site";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Section, SectionHeading } from "./section";
import Container from "./container";
import PageHeader from "./page-hero";
import EnquiryForm from "./EnquiryForm";
import SearchModule from "./search-module";
import SupplierDisclosure from "./supplier-disclosure";
import FaqAccordion from "./faq-accordion";

export type ServicePoint = { title: string; body: string };

/**
 * Shared layout for the six travel categories, so they read as one product
 * rather than six separately designed pages.
 *
 * `confirmedBeforeBooking` states what a specialist puts in front of the
 * customer before booking. It is phrased as what will be confirmed rather than
 * shown as populated values, because this site holds no live supplier inventory
 * and must never display prices or availability it cannot stand behind.
 */
export default function ServicePage({
  service,
  title,
  description,
  tags,
  arrange,
  categories,
  confirmedBeforeBooking,
  faqs,
  enquiryHeading,
}: {
  service: Service;
  title: string;
  description: string;
  /** Genuine category or option information, rendered as badges. */
  tags?: string[];
  arrange: ServicePoint[];
  categories?: { name: string; description: string }[];
  confirmedBeforeBooking: string[];
  faqs?: { q: string; a: string }[];
  enquiryHeading: string;
}) {
  const related = site.services.filter((s) => s.key !== service.key);

  return (
    <>
      <PageHeader
        title={title}
        description={description}
        breadcrumbs={[
          { name: "Home", href: "/" },
          { name: service.shortName, href: service.href },
        ]}
        actions={
          site.contact.hasPhone ? (
            <Button asChild variant="outline">
              <a href={telHref}>
                <Phone aria-hidden />
                {site.cta.secondary}
              </a>
            </Button>
          ) : (
            <Button asChild variant="outline">
              <Link href="/callback">{site.cta.callback}</Link>
            </Button>
          )
        }
      />

      {tags?.length ? (
        <Container className="pt-6">
          <ul className="flex flex-wrap gap-1.5">
            {tags.map((t) => (
              <li key={t}>
                <Badge variant="outline">{t}</Badge>
              </li>
            ))}
          </ul>
        </Container>
      ) : null}

      <Container className="scroll-mt-20 pb-2 pt-6" id="search">
        <SearchModule defaultTab={service.key} />
      </Container>

      <Section>
        <div className="grid gap-8 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-4">
            <h2 className="text-xl font-semibold tracking-tight sm:text-2xl">
              How we handle {service.shortName.toLowerCase()}
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{service.intro}</p>
          </div>

          <dl className="grid gap-x-8 gap-y-6 sm:grid-cols-2 lg:col-span-8">
            {arrange.map((point) => (
              <div key={point.title} className="border-t pt-4">
                <dt className="text-[15px] font-medium">{point.title}</dt>
                <dd className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{point.body}</dd>
              </div>
            ))}
          </dl>
        </div>
      </Section>

      {categories?.length ? (
        <Section tone="muted">
          <SectionHeading
            title={`${service.shortName} we can arrange`}
            description="Pick the closest fit, or describe something different. Either way it reaches the same specialist."
          />
          <ul className="mt-6 grid gap-px overflow-hidden rounded-lg border bg-border sm:grid-cols-2 lg:grid-cols-3">
            {categories.map((cat) => (
              <li key={cat.name} className="bg-card p-5">
                <h3 className="text-[15px] font-medium">{cat.name}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{cat.description}</p>
              </li>
            ))}
          </ul>
        </Section>
      ) : null}

      <Section>
        <div className="grid gap-8 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-4">
            <h2 className="text-xl font-semibold tracking-tight sm:text-2xl">Confirmed before you book</h2>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
              Nothing is booked until you have seen all of this and told us to go ahead. {site.pricingNotice}
            </p>
          </div>
          <ul className="grid gap-x-8 gap-y-2.5 sm:grid-cols-2 lg:col-span-8">
            {confirmedBeforeBooking.map((item) => (
              <li key={item} className="flex items-start gap-2.5 text-sm leading-relaxed">
                <Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" aria-hidden />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </Section>

      <Section tone="muted" id="enquiry">
        <div className="grid gap-8 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-5">
            <h2 className="text-xl font-semibold tracking-tight sm:text-2xl">Send us the details</h2>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
              A {site.name} travel specialist will come back with real options during support hours.
            </p>
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground">{site.bookingNotice}</p>

            <div className="mt-5 flex flex-wrap gap-2">
              {site.contact.hasPhone ? (
                <Button asChild variant="outline">
                  <a href={telHref}>
                    <Phone aria-hidden />
                    {site.company.phone}
                  </a>
                </Button>
              ) : null}
              <Button asChild variant="ghost">
                <Link href="/callback">{site.cta.callback}</Link>
              </Button>
            </div>
          </div>

          <div className="lg:col-span-7">
            <EnquiryForm heading={enquiryHeading} defaultService={service.name} />
          </div>
        </div>
      </Section>

      {faqs?.length ? (
        <Section>
          <SectionHeading title={`${service.shortName} questions`} />
          <div className="mt-6 max-w-3xl">
            <FaqAccordion items={faqs} />
          </div>
        </Section>
      ) : null}

      <Section tone="muted">
        <SectionHeading title="Add the rest of the trip" description="Arranged by the same team, so it can be planned together." />
        <ul className="mt-5 flex flex-wrap gap-2">
          {related.map((s) => (
            <li key={s.key}>
              <Button asChild variant="outline" size="sm">
                <Link href={s.href}>
                  {s.shortName}
                  <ArrowRight aria-hidden />
                </Link>
              </Button>
            </li>
          ))}
        </ul>
        <Separator className="my-8" />
        <TrustBarInline />
      </Section>

      <SupplierDisclosure />
    </>
  );
}

/** Trust points without the surrounding band, since the section already has one. */
function TrustBarInline() {
  return (
    <dl className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
      {site.trust.map((t) => (
        <div key={t.title}>
          <dt className="text-sm font-medium">{t.title}</dt>
          <dd className="mt-1 text-sm leading-relaxed text-muted-foreground">{t.detail}</dd>
        </div>
      ))}
    </dl>
  );
}

