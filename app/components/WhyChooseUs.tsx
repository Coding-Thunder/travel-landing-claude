import { siteConfig } from "@/config/siteConfig";
import { Section, SectionHeading } from "./ui/Section";
import Reveal from "./ui/Reveal";
import Icon from "./ui/Icon";

export default function WhyChooseUs() {
  return (
    <Section id="why" tone="white">
      <SectionHeading
        eyebrow="Why choose us"
        title="Everything you need, nothing you don't"
        subtitle="A premium rental experience built on transparency, coverage and round-the-clock human support."
      />

      <div className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:gap-5">
        {siteConfig.whyChooseUs.map((f, i) => (
          <Reveal key={f.title} delay={(i % 4) * 0.05}>
            <article className="group flex h-full flex-col rounded-2xl border border-slate-200 bg-white p-6 transition hover:-translate-y-1 hover:border-brand-200 hover:shadow-[var(--shadow-lift)]">
              <span className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-brand-600 text-white shadow-[0_8px_20px_-8px_rgba(37,99,235,0.7)] transition group-hover:scale-105">
                <Icon name={f.icon} className="h-6 w-6" />
              </span>
              <h3 className="mt-5 text-base font-bold text-slate-900 sm:text-lg">{f.title}</h3>
              <p className="mt-1.5 text-sm leading-relaxed text-slate-600">{f.description}</p>
            </article>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
