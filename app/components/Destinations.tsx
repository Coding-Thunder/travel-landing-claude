import { siteConfig } from "@/config/siteConfig";
import { Section, SectionHeading } from "./ui/Section";
import Reveal from "./ui/Reveal";
import CardImage from "./ui/CardImage";
import Icon from "./ui/Icon";
import CtaButton from "./call/CtaButton";

export default function Destinations() {
  return (
    <Section id="destinations" tone="gray">
      <SectionHeading
        eyebrow="Popular destinations"
        title="Pick up in 300+ cities nationwide"
        subtitle="Airport and downtown locations in every major US metro — with one-way rentals between cities."
      />

      <div className="mt-12 grid grid-cols-2 gap-4 sm:gap-5 lg:grid-cols-4">
        {siteConfig.destinations.map((d, i) => (
          <Reveal key={d.city} delay={(i % 4) * 0.05}>
            <article className="group relative aspect-[4/5] overflow-hidden rounded-2xl shadow-[var(--shadow-card)] transition hover:-translate-y-1 hover:shadow-[var(--shadow-lift)]">
              <CardImage
                src={d.image}
                alt={`Car rental in ${d.city}, ${d.state}`}
                gradient={d.gradient}
                sizes="(min-width: 1024px) 25vw, 50vw"
                overlay
                className="transition duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-x-0 bottom-0 p-4 text-white">
                <p className="text-[11px] font-semibold uppercase tracking-wider text-white/70">
                  {d.locations} pickup locations
                </p>
                <h3 className="text-lg font-extrabold leading-tight">
                  {d.city}, {d.state}
                </h3>
                <p className="mt-0.5 text-sm text-white/85">from ${d.priceFrom}/day</p>
                <CtaButton
                  source={`destination-${d.city.toLowerCase().replace(/\s+/g, "-")}`}
                  pickup={`${d.city}, ${d.state}`}
                  variant="light"
                  size="sm"
                  fullWidth
                  className="mt-3"
                  icon={<Icon name="phone" className="h-4 w-4" />}
                >
                  Get a Quote
                </CtaButton>
              </div>
            </article>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
