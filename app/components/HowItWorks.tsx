import { siteConfig } from "@/config/siteConfig";
import { Section, SectionHeading } from "./ui/Section";
import Reveal from "./ui/Reveal";
import Icon from "./ui/Icon";

export default function HowItWorks() {
  const { howItWorks, phone, phoneVanity } = siteConfig;

  return (
    <Section id="how-it-works" tone="white">
      <SectionHeading
        eyebrow="How it works"
        title="From call to keys in four steps"
        subtitle="No complicated booking flow. One call to a live agent is all it takes to drive away."
      />

      <ol className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
        {howItWorks.map((step, i) => (
          <Reveal as="li" key={step.step} delay={i * 0.07}>
            <div className="relative flex h-full flex-col rounded-2xl border border-slate-200 bg-white p-6 shadow-[var(--shadow-card)]">
              {/* Connector arrow on desktop */}
              {i < howItWorks.length - 1 ? (
                <span aria-hidden className="absolute -right-3.5 top-1/2 z-10 hidden h-7 w-7 -translate-y-1/2 items-center justify-center rounded-full border border-slate-200 bg-white text-brand-500 lg:flex">
                  <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 6l6 6-6 6" />
                  </svg>
                </span>
              ) : null}
              <div className="flex items-center justify-between">
                <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand-50 text-brand-600">
                  <Icon name={step.icon} className="h-6 w-6" />
                </span>
                <span className="text-3xl font-extrabold text-slate-100">{step.step}</span>
              </div>
              <h3 className="mt-4 text-lg font-bold text-slate-900">{step.title}</h3>
              <p className="mt-1.5 text-sm leading-relaxed text-slate-600">{step.description}</p>
            </div>
          </Reveal>
        ))}
      </ol>

      <Reveal className="mt-10 flex flex-col items-center justify-center gap-3 text-center sm:flex-row">
        <p className="text-sm text-slate-600">No deposit taken over the phone · Free cancellation up to pickup</p>
        <a
          href={`tel:${phone}`}
          className="inline-flex items-center justify-center gap-2 rounded-xl bg-brand-600 px-6 py-3.5 text-sm font-bold text-white shadow-[0_10px_30px_-10px_rgba(37,99,235,0.55)] transition hover:bg-brand-700"
        >
          <Icon name="phone" className="h-4 w-4" />
          Call {phoneVanity}
        </a>
      </Reveal>
    </Section>
  );
}
