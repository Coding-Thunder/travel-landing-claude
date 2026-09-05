import { siteConfig } from "@/config/siteConfig";
import { Section, SectionHeading } from "./ui/Section";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import Icon from "./ui/Icon";
import CtaButton from "./call/CtaButton";

export default function SeoContent() {
  const { seoArticles, phone, phoneVanity } = siteConfig;

  return (
    <Section tone="gray" id="guides">
      <SectionHeading
        eyebrow="Rental guides"
        title="Everything you need to know about renting a car"
        subtitle="Straight answers on how renting works, what you need, and the rentals we specialize in — so you can call ready to drive."
      />

      <div className="mt-6 grid gap-px overflow-hidden rounded-lg border bg-border md:grid-cols-2">
        {seoArticles.map((article) => (
          <article key={article.id} id={article.id} className="scroll-mt-20 bg-card p-5 sm:p-6">
            <h3 className="flex items-center gap-2 text-[15px] font-medium">
              <Icon name={article.icon} className="h-4 w-4 shrink-0 text-primary" />
              {article.title}
            </h3>
            <div className="mt-2.5 space-y-3 text-sm leading-relaxed text-muted-foreground">
              {article.body.map((p, j) => (
                <p key={j}>{p}</p>
              ))}
            </div>
          </article>
        ))}
      </div>

      <Separator className="my-10" />

      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm text-muted-foreground">
          Have a question about your rental? A live US-based agent can answer it in under a minute.
        </p>
        <div className="flex shrink-0 flex-wrap gap-2">
          <Button asChild data-cta="guides-call">
            <a href={`tel:${phone}`}>
              <Icon name="phone" />
              Call {phoneVanity}
            </a>
          </Button>
          <CtaButton source="guides-quote" variant="outline">
            Get a Quote
          </CtaButton>
        </div>
      </div>
    </Section>
  );
}
