import { Section, SectionHeading } from "./ui/Section";
import Reveal from "./ui/Reveal";
import Counter from "./ui/Counter";
import Icon from "./ui/Icon";
import type { IconName } from "@/config/siteConfig";

const STATS: { value: number; decimals?: number; prefix?: string; suffix?: string; label: string }[] = [
  { value: 250000, suffix: "+", label: "Drivers served" },
  { value: 4.9, decimals: 1, suffix: "/5", label: "Average rating" },
  { value: 300, suffix: "+", label: "Airport & city locations" },
  { value: 50, label: "States covered" },
];

const BADGES: { label: string; icon: IconName }[] = [
  { label: "Transparent pricing", icon: "tag" },
  { label: "No hidden fees", icon: "check" },
  { label: "24/7 phone support", icon: "headset" },
  { label: "Secure booking", icon: "lock" },
  { label: "Airport convenience", icon: "plane" },
  { label: "Verified fleet", icon: "shield" },
  { label: "Customer satisfaction", icon: "star" },
];

export default function TrustStats() {
  return (
    <Section tone="dark">
      <SectionHeading
        invert
        eyebrow="Why customers trust us"
        title="Numbers that back up the promise"
        subtitle="Hundreds of thousands of trips, a five-star reputation, and a live person on the phone every hour of every day."
      />

      <dl className="mt-12 grid grid-cols-2 gap-6 lg:grid-cols-4">
        {STATS.map((s, i) => (
          <Reveal key={s.label} delay={i * 0.06} className="text-center">
            <dd className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl">
              <Counter value={s.value} decimals={s.decimals} prefix={s.prefix} suffix={s.suffix} />
            </dd>
            <dt className="mt-2 text-xs font-medium uppercase tracking-wider text-slate-400 sm:text-sm">{s.label}</dt>
          </Reveal>
        ))}
      </dl>

      <Reveal className="mt-12 flex flex-wrap justify-center gap-2.5">
        {BADGES.map((b) => (
          <span
            key={b.label}
            className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm font-medium text-slate-200 backdrop-blur"
          >
            <Icon name={b.icon} className="h-4 w-4 text-brand-300" />
            {b.label}
          </span>
        ))}
      </Reveal>
    </Section>
  );
}
