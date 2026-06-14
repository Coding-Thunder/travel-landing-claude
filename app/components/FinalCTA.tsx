import { siteConfig } from "@/config/siteConfig";
import Container from "./ui/Container";
import Reveal from "./ui/Reveal";
import Icon from "./ui/Icon";
import CtaButton from "./call/CtaButton";

export default function FinalCTA() {
  const { finalCta, phone, phoneVanity, phoneDisplay, callResponse } = siteConfig;

  return (
    <section className="relative isolate overflow-hidden bg-slate-950 text-white">
      <div aria-hidden className="absolute inset-0 bg-gradient-to-br from-brand-700 via-brand-800 to-slate-950" />
      <div aria-hidden className="absolute -top-24 right-0 h-[420px] w-[420px] rounded-full bg-[radial-gradient(circle_at_center,rgba(96,165,250,0.4),transparent_65%)] blur-3xl" />

      <Container className="relative py-16 sm:py-20 lg:py-24">
        <div className="mx-auto max-w-3xl text-center">
          <Reveal>
            <p className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-3.5 py-1.5 text-[11px] font-semibold uppercase tracking-wider backdrop-blur">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-300 opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-300" />
              </span>
              {finalCta.eyebrow}
            </p>
            <h2 className="mt-5 text-3xl font-extrabold tracking-tight sm:text-4xl lg:text-5xl">
              {finalCta.title}
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-base text-white/80 sm:text-lg">{finalCta.subtitle}</p>
          </Reveal>

          {/* Giant toll-free */}
          <Reveal delay={0.08} className="mt-8">
            <a
              href={`tel:${phone}`}
              className="inline-flex flex-col items-center rounded-2xl border border-white/15 bg-white/10 px-8 py-5 backdrop-blur transition hover:bg-white/15"
            >
              <span className="text-[11px] font-semibold uppercase tracking-wider text-white/60">
                24/7 reservations · {callResponse}
              </span>
              <span className="mt-1 flex items-center gap-2 text-4xl font-extrabold tracking-tight sm:text-5xl">
                <Icon name="phone" className="h-8 w-8 text-brand-300" />
                {phoneVanity}
              </span>
              <span className="mt-1 text-sm text-white/55">{phoneDisplay}</span>
            </a>
          </Reveal>

          <Reveal delay={0.14} className="mt-6 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <a
              href={`tel:${phone}`}
              className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-white px-7 py-4 text-base font-bold text-brand-700 shadow-lg transition hover:bg-slate-100 sm:w-auto"
            >
              <Icon name="phone" className="h-5 w-5" />
              Call Now
            </a>
            <CtaButton source="final-cta-callback" variant="light" size="lg" className="w-full sm:w-auto">
              <Icon name="headset" className="h-5 w-5" />
              Request a Callback
            </CtaButton>
          </Reveal>

          <Reveal delay={0.2}>
            <ul className="mt-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
              {finalCta.points.map((p) => (
                <li key={p} className="flex items-center gap-1.5 text-sm font-medium text-white/80">
                  <Icon name="check" className="h-4 w-4 text-emerald-300" />
                  {p}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
