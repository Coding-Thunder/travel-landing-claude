import { siteConfig } from "@/config/siteConfig";
import { Section, SectionHeading } from "./ui/Section";
import Icon from "./ui/Icon";

/**
 * The bordered-grid list. One hairline grid rather than six floating cards, so
 * the six reasons read as one set instead of six competing panels.
 */
export default function WhyChooseUs() {
  return (
    <Section tone="gray" id="why">
      <SectionHeading
        eyebrow="Why choose us"
        title="Everything you need, nothing you don't"
        subtitle="A premium rental experience built on transparency, coverage and round-the-clock human support."
      />

      <ul className="mt-6 grid gap-px overflow-hidden rounded-lg border bg-border sm:grid-cols-2 lg:grid-cols-3">
        {siteConfig.whyChooseUs.map((f) => (
          <li key={f.title} className="flex flex-col bg-card p-5">
            <span className="flex items-center gap-2 text-[15px] font-medium">
              <Icon name={f.icon} className="h-4 w-4 shrink-0 text-primary" />
              {f.title}
            </span>
            <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{f.description}</p>
          </li>
        ))}
      </ul>
    </Section>
  );
}
