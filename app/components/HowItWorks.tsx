import { siteConfig } from "@/config/siteConfig";
import { Section, SectionHeading } from "./ui/Section";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import Icon from "./ui/Icon";

/**
 * Numbered steps on a rule. The step number is the ordering device, so the
 * cards, the medallions and the connector arrows all come out.
 */
export default function HowItWorks() {
  const { howItWorks, phone, phoneVanity } = siteConfig;

  return (
    <Section tone="gray" id="how-it-works">
      <SectionHeading
        eyebrow="How it works"
        title="From call to keys in four steps"
        subtitle="No complicated booking flow. One call to a live agent is all it takes to drive away."
      />

      <ol className="mt-6 grid gap-x-8 gap-y-6 sm:grid-cols-2 lg:grid-cols-4">
        {howItWorks.map((step) => (
          <li key={step.step} className="border-t pt-4">
            <span className="text-xs font-medium tabular-nums text-muted-foreground">{step.step}</span>
            <h3 className="mt-2 flex items-center gap-2 text-[15px] font-medium">
              <Icon name={step.icon} className="h-4 w-4 shrink-0 text-primary" />
              {step.title}
            </h3>
            <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{step.description}</p>
          </li>
        ))}
      </ol>

      <Separator className="my-10" />

      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm text-muted-foreground">
          No deposit taken over the phone · Free cancellation up to pickup
        </p>
        <Button asChild className="shrink-0" data-cta="how-it-works-call">
          <a href={`tel:${phone}`}>
            <Icon name="phone" />
            Call {phoneVanity}
          </a>
        </Button>
      </div>
    </Section>
  );
}
