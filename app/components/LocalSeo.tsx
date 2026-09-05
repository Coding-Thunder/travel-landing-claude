import { siteConfig } from "@/config/siteConfig";
import { Section, SectionHeading } from "./ui/Section";
import Icon from "./ui/Icon";
import CtaButton from "./call/CtaButton";

export default function LocalSeo() {
  return (
    <Section id="local-seo">
      <SectionHeading
        eyebrow="Car rental by city"
        title="Local car rental, coast to coast"
        subtitle="Pickups at major airports and downtown locations in every metro we serve. Call for live availability and an all-in rate in your city."
      />

      <div className="mt-6 grid gap-px overflow-hidden rounded-lg border bg-border md:grid-cols-2">
        {siteConfig.localSeo.map((loc) => (
          <article key={loc.city} className="flex flex-col bg-card p-5 sm:p-6">
            <h3 className="flex items-center gap-2 text-[15px] font-medium">
              <Icon name="pin" className="h-4 w-4 shrink-0 text-primary" />
              {loc.city} Car Rental
            </h3>
            <p className="mt-2.5 flex-1 text-sm leading-relaxed text-muted-foreground">{loc.body}</p>
            <CtaButton
              source={`local-${loc.city.toLowerCase().replace(/\s+/g, "-")}`}
              pickup={`${loc.city}, ${loc.state}`}
              variant="outline"
              size="sm"
              className="mt-4 self-start"
              icon={<Icon name="phone" />}
            >
              Get {loc.city} rates
            </CtaButton>
          </article>
        ))}
      </div>
    </Section>
  );
}
