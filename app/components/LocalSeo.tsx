import { siteConfig } from "@/config/siteConfig";
import { Section, SectionHeading } from "./ui/Section";
import Reveal from "./ui/Reveal";
import Icon from "./ui/Icon";
import CtaButton from "./call/CtaButton";

export default function LocalSeo() {
  return (
    <Section id="local-seo" tone="white">
      <SectionHeading
        eyebrow="Car rental by city"
        title="Local car rental, coast to coast"
        subtitle="Pickups at major airports and downtown locations in every metro we serve. Call for live availability and an all-in rate in your city."
      />

      <div className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-2 lg:gap-6">
        {siteConfig.localSeo.map((loc, i) => (
          <Reveal as="div" key={loc.city} delay={(i % 2) * 0.05}>
            <article className="flex h-full flex-col rounded-2xl border border-slate-200 bg-white p-6 shadow-[var(--shadow-card)] sm:p-7">
              <div className="flex items-center gap-2 text-brand-600">
                <Icon name="map" className="h-5 w-5" />
                <h3 className="text-lg font-bold text-slate-900">
                  {loc.city} Car Rental
                </h3>
              </div>
              <p className="mt-3 flex-1 text-[15px] leading-relaxed text-slate-600">{loc.body}</p>
              <CtaButton
                source={`local-${loc.city.toLowerCase().replace(/\s+/g, "-")}`}
                pickup={`${loc.city}, ${loc.state}`}
                variant="secondary"
                size="sm"
                className="mt-4 self-start"
                icon={<Icon name="phone" className="h-4 w-4 text-brand-600" />}
              >
                Get {loc.city} rates
              </CtaButton>
            </article>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
