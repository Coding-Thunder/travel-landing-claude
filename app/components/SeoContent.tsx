import { siteConfig } from "@/config/siteConfig";
import { Section, SectionHeading } from "./ui/Section";
import Reveal from "./ui/Reveal";
import Icon from "./ui/Icon";
import CtaButton from "./call/CtaButton";

export default function SeoContent() {
  const { seoArticles, phone, phoneVanity } = siteConfig;

  return (
    <Section id="guides" tone="gray">
      <SectionHeading
        eyebrow="Rental guides"
        title="Everything you need to know about renting a car"
        subtitle="Straight answers on how renting works, what you need, and the rentals we specialize in — so you can call ready to drive."
      />

      <div className="mx-auto mt-12 grid max-w-5xl gap-5 md:grid-cols-2 lg:gap-6">
        {seoArticles.map((article, i) => (
          <Reveal as="div" key={article.id} delay={(i % 2) * 0.06}>
            <article className="flex h-full flex-col rounded-2xl border border-slate-200 bg-white p-6 shadow-[var(--shadow-card)] sm:p-7">
              <div className="flex items-center gap-3">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-brand-50 text-brand-600">
                  <Icon name={article.icon} className="h-5 w-5" />
                </span>
                <h3 className="text-lg font-bold text-slate-900">{article.title}</h3>
              </div>
              <div className="mt-4 space-y-3 text-[15px] leading-relaxed text-slate-600">
                {article.body.map((p, j) => (
                  <p key={j}>{p}</p>
                ))}
              </div>
            </article>
          </Reveal>
        ))}
      </div>

      <Reveal className="mx-auto mt-10 flex max-w-3xl flex-col items-center justify-center gap-3 rounded-2xl border border-slate-200 bg-white p-6 text-center sm:flex-row sm:text-left">
        <p className="flex-1 text-sm font-semibold text-slate-700">
          Have a question about your rental? A live US-based agent can answer it in under a minute.
        </p>
        <div className="flex flex-col gap-2 sm:flex-row">
          <a
            href={`tel:${phone}`}
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-brand-600 px-5 py-2.5 text-sm font-bold text-white transition hover:bg-brand-700"
          >
            <Icon name="phone" className="h-4 w-4" />
            Call {phoneVanity}
          </a>
          <CtaButton source="guides-quote" variant="secondary" size="sm">
            Get a Quote
          </CtaButton>
        </div>
      </Reveal>
    </Section>
  );
}
