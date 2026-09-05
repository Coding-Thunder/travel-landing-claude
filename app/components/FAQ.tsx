import { siteConfig } from "@/config/siteConfig";
import { Section, SectionHeading } from "./ui/Section";
import { Button } from "@/components/ui/button";
import FaqList from "./ui/FaqList";
import Icon from "./ui/Icon";
import CtaButton from "./call/CtaButton";

/**
 * The home page FAQ.
 *
 * Now a server component: the accordion behaviour lives in the shared FaqList,
 * which is the same one the airport and vehicle pages use, so all three answer
 * to one interaction model instead of three.
 */
export default function FAQ() {
  const { faqs, phone, phoneVanity } = siteConfig;

  return (
    <Section tone="gray" id="faq">
      <SectionHeading
        eyebrow="FAQ"
        title="Questions? We've got answers"
        subtitle="Still unsure about something? Our agents are one quick call away, 24/7."
      />

      <div className="mt-6 max-w-3xl">
        <FaqList items={faqs} />

        <div className="mt-8 flex flex-col gap-4 rounded-lg border bg-muted/50 p-5 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm font-medium">Can&apos;t find your answer?</p>
          <div className="flex shrink-0 flex-wrap gap-2">
            <Button asChild data-cta="faq-call">
              <a href={`tel:${phone}`}>
                <Icon name="phone" />
                Call {phoneVanity}
              </a>
            </Button>
            <CtaButton source="faq-callback" variant="outline">
              Request a callback
            </CtaButton>
          </div>
        </div>
      </div>
    </Section>
  );
}
