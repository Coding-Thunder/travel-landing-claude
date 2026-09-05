import { Section, SectionHeading } from "./ui/Section";
import Counter from "./ui/Counter";
import Icon from "./ui/Icon";
import { Separator } from "@/components/ui/separator";
import type { Name as IconName } from "./ui/Icon";

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
  { label: "Airport convenience", icon: "airport" },
  { label: "Verified fleet", icon: "shield" },
  { label: "Customer satisfaction", icon: "star" },
];

/**
 * The inverted band. `tone="dark"` swaps the token scope, so nothing in here
 * needs a parallel set of colour classes.
 */
export default function TrustStats() {
  return (
    <Section tone="dark">
      <SectionHeading
        eyebrow="Why customers trust us"
        title="Numbers that back up the promise"
        subtitle="Hundreds of thousands of trips, a five-star reputation, and a live person on the phone every hour of every day."
      />

      <dl className="mt-8 grid grid-cols-2 gap-x-8 gap-y-6 lg:grid-cols-4">
        {STATS.map((s) => (
          // <dt> before <dd>: a description list is term-then-value, and the
          // reverse order announces each figure with no term attached.
          // `flex-col-reverse` keeps the number visually on top.
          <div key={s.label} className="flex flex-col-reverse border-t pt-4">
            <dt className="mt-1 text-sm text-muted-foreground">{s.label}</dt>
            <dd className="text-3xl font-semibold tracking-tight sm:text-4xl">
              <Counter value={s.value} decimals={s.decimals} prefix={s.prefix} suffix={s.suffix} />
            </dd>
          </div>
        ))}
      </dl>

      <Separator className="my-8" />

      <ul className="flex flex-wrap gap-x-6 gap-y-2">
        {BADGES.map((b) => (
          <li key={b.label} className="flex items-center gap-2 text-sm text-muted-foreground">
            <Icon name={b.icon} className="h-4 w-4 shrink-0 text-primary" />
            {b.label}
          </li>
        ))}
      </ul>
    </Section>
  );
}
