import { siteConfig } from "@/config/siteConfig";
import { Section, SectionHeading } from "./ui/Section";
import CardImage from "./ui/CardImage";
import Icon from "./ui/Icon";
import CtaButton from "./call/CtaButton";
import { Badge } from "@/components/ui/badge";

export default function FeaturedVehicles() {
  return (
    <Section id="fleet">
      <SectionHeading
        eyebrow="Featured fleet"
        title="Hand-picked vehicles, ready to drive"
        subtitle="Late-model cars with unlimited miles on most rates. Call to check live availability in your city."
      />

      <ul className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {siteConfig.featuredVehicles.map((v) => (
          <li key={v.name} className="flex">
            <article className="flex w-full flex-col overflow-hidden rounded-lg border bg-card">
              <div className="relative aspect-[16/10] overflow-hidden">
                <CardImage
                  src={v.image}
                  alt={`${v.name}, ${v.type} rental car`}
                  gradient={v.gradient}
                  sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                />
                {v.tag ? (
                  <Badge variant="default" className="absolute left-2.5 top-2.5">
                    {v.tag}
                  </Badge>
                ) : null}
              </div>

              <div className="flex flex-1 flex-col p-5">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="text-xs font-medium text-muted-foreground">{v.type}</p>
                    <h3 className="text-[15px] font-medium">{v.name}</h3>
                  </div>
                  <p className="shrink-0 text-right text-lg font-semibold tabular-nums tracking-tight">
                    ${v.dailyRate}
                    <span className="text-xs font-normal text-muted-foreground">/day</span>
                  </p>
                </div>

                <dl className="mt-4 grid grid-cols-2 gap-x-4 gap-y-2 border-t pt-4 text-sm text-muted-foreground">
                  <Spec icon="users" label={`${v.specs.seats} seats`} />
                  <Spec icon="luggage" label={`${v.specs.bags} bags`} />
                  <Spec icon="car" label={v.specs.transmission} />
                  <Spec icon="mileage" label={v.specs.efficiency} />
                </dl>

                <ul className="mt-4 flex flex-1 flex-wrap content-start gap-1.5">
                  {v.features.map((f) => (
                    <li key={f}>
                      <Badge variant="muted">{f}</Badge>
                    </li>
                  ))}
                </ul>

                <CtaButton
                  source={`featured-${v.name.toLowerCase().replace(/\s+/g, "-")}`}
                  fullWidth
                  className="mt-5"
                  icon={<Icon name="phone" />}
                >
                  Check Availability
                </CtaButton>
              </div>
            </article>
          </li>
        ))}
      </ul>
    </Section>
  );
}

function Spec({ icon, label }: { icon: Parameters<typeof Icon>[0]["name"]; label: string }) {
  return (
    <div className="flex items-center gap-1.5">
      <Icon name={icon} className="h-4 w-4 shrink-0" />
      <span className="truncate">{label}</span>
    </div>
  );
}
