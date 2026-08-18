import { site } from "@/config/site";
import Container from "./container";

/**
 * Four factual assurances. Plain text on a rule, no icon medallions and no
 * card wrappers, because none of the three would add information.
 */
export default function TrustBar() {
  return (
    <section aria-label="What to expect" className="border-y bg-muted/40">
      <Container className="py-8">
        <dl className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {site.trust.map((t) => (
            <div key={t.title}>
              <dt className="text-sm font-medium">{t.title}</dt>
              <dd className="mt-1 text-sm leading-relaxed text-muted-foreground">{t.detail}</dd>
            </div>
          ))}
        </dl>
      </Container>
    </section>
  );
}
