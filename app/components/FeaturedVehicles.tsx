import { siteConfig } from "@/config/siteConfig";
import { Section, SectionHeading } from "./ui/Section";
import Reveal from "./ui/Reveal";
import CardImage from "./ui/CardImage";
import Icon from "./ui/Icon";
import CtaButton from "./call/CtaButton";

export default function FeaturedVehicles() {
  return (
    <Section id="fleet" tone="white">
      <SectionHeading
        eyebrow="Featured fleet"
        title="Hand-picked vehicles, ready to drive"
        subtitle="Late-model cars with unlimited miles on most rates. Call to check live availability in your city."
      />

      <div className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6">
        {siteConfig.featuredVehicles.map((v, i) => (
          <Reveal key={v.name} delay={(i % 3) * 0.06}>
            <article className="group flex h-full flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-[var(--shadow-card)] transition hover:-translate-y-1 hover:shadow-[var(--shadow-lift)]">
              <div className="relative aspect-[16/10] overflow-hidden">
                <CardImage
                  src={v.image}
                  alt={`${v.name} — ${v.type} rental`}
                  gradient={v.gradient}
                  sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                  className="transition duration-500 group-hover:scale-105"
                />
                {v.tag ? (
                  <span className="absolute left-3 top-3 rounded-full bg-brand-600 px-2.5 py-1 text-[11px] font-bold text-white shadow-sm">
                    {v.tag}
                  </span>
                ) : null}
                <span className="absolute right-3 top-3 flex items-center gap-1 rounded-full bg-white/95 px-2.5 py-1 text-[11px] font-bold text-slate-900 shadow-sm">
                  <Icon name="star" className="h-3.5 w-3.5 text-amber-400" />
                  {v.rating}
                </span>
              </div>

              <div className="flex flex-1 flex-col p-5">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="text-[11px] font-semibold uppercase tracking-wider text-brand-600">{v.type}</p>
                    <h3 className="text-lg font-bold text-slate-900">{v.name}</h3>
                  </div>
                  <div className="text-right">
                    <p className="text-xl font-extrabold tracking-tight text-slate-900">
                      ${v.dailyRate}
                      <span className="text-xs font-medium text-slate-400">/day</span>
                    </p>
                  </div>
                </div>

                {/* Specs */}
                <dl className="mt-4 grid grid-cols-2 gap-x-4 gap-y-2 text-xs text-slate-600">
                  <Spec icon="users" label={`${v.specs.seats} seats`} />
                  <Spec icon="car" label={`${v.specs.bags} bags`} />
                  <Spec icon="bolt" label={v.specs.transmission} />
                  <Spec icon="check" label={v.specs.efficiency} />
                </dl>

                {/* Features */}
                <ul className="mt-4 flex flex-1 flex-wrap content-start gap-1.5">
                  {v.features.map((f) => (
                    <li key={f} className="rounded-full bg-slate-100 px-2.5 py-1 text-[11px] font-medium text-slate-600">
                      {f}
                    </li>
                  ))}
                </ul>

                <CtaButton
                  source={`featured-${v.name.toLowerCase().replace(/\s+/g, "-")}`}
                  variant="primary"
                  size="md"
                  fullWidth
                  className="mt-5"
                  icon={<Icon name="phone" className="h-5 w-5" />}
                >
                  Check Availability
                </CtaButton>
              </div>
            </article>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}

function Spec({ icon, label }: { icon: Parameters<typeof Icon>[0]["name"]; label: string }) {
  return (
    <div className="flex items-center gap-1.5">
      <Icon name={icon} className="h-4 w-4 text-slate-400" />
      <span>{label}</span>
    </div>
  );
}
