import { siteConfig } from "@/config/siteConfig";
import { Section, SectionHeading } from "./ui/Section";
import Reveal from "./ui/Reveal";
import CardImage from "./ui/CardImage";
import Icon from "./ui/Icon";
import CtaButton from "./call/CtaButton";

export default function VehicleTypes() {
  return (
    <Section id="vehicles" tone="gray">
      <SectionHeading
        eyebrow="Our fleet"
        title="Find the right vehicle for every trip"
        subtitle="From fuel-sippers to seven-seaters and luxury EVs — call for the best rate on any class, nationwide."
      />

      <div className="mt-12 grid grid-cols-2 gap-4 sm:gap-5 lg:grid-cols-4">
        {siteConfig.vehicleTypes.map((v, i) => (
          <Reveal key={v.name} delay={(i % 4) * 0.05}>
            <article className="group flex h-full flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-[var(--shadow-card)] transition hover:-translate-y-1 hover:shadow-[var(--shadow-lift)]">
              <div className="relative aspect-[5/3] overflow-hidden">
                <CardImage
                  src={v.image}
                  alt={`${v.name} rental car`}
                  gradient={v.gradient}
                  sizes="(min-width: 1024px) 25vw, 50vw"
                  className="transition duration-500 group-hover:scale-105"
                />
                <span className="absolute left-3 top-3 rounded-full bg-white/95 px-2.5 py-1 text-[11px] font-bold text-slate-900 shadow-sm">
                  from ${v.priceFrom}/day
                </span>
              </div>
              <div className="flex flex-1 flex-col p-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-base font-bold text-slate-900">{v.name}</h3>
                  <span className="flex items-center gap-1 text-xs font-medium text-slate-500">
                    <Icon name="users" className="h-4 w-4" />
                    {v.seats}
                  </span>
                </div>
                <p className="mt-1 flex-1 text-xs leading-relaxed text-slate-500">{v.blurb}</p>
                <CtaButton
                  source={`vehicle-type-${v.name.toLowerCase()}`}
                  pickup=""
                  variant="secondary"
                  size="sm"
                  fullWidth
                  className="mt-3"
                >
                  Get Quote
                </CtaButton>
              </div>
            </article>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
