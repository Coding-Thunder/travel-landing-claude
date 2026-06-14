import Image from "next/image";
import { siteConfig } from "@/config/siteConfig";
import Container from "./ui/Container";
import Reveal from "./ui/Reveal";
import Icon from "./ui/Icon";

export default function SeoSection() {
  const { seo, business, phone, phoneVanity, shortName } = siteConfig;

  return (
    <section id="about" className="scroll-mt-20 bg-white py-16 sm:py-20 lg:py-24">
      <Container>
        <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
          <Reveal>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-brand-600">
              About {shortName}
            </p>
            <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
              {seo.heading}
            </h2>
            {seo.content.map((p, i) => (
              <p
                key={i}
                className={`${i === 0 ? "mt-5 text-lg font-medium text-slate-700" : "mt-4 text-[15px] text-slate-600"} leading-relaxed`}
              >
                {p}
              </p>
            ))}

            <div className="mt-7 rounded-2xl border border-slate-200 bg-slate-50 p-5">
              <p className="flex items-center gap-2 text-sm font-bold text-slate-900">
                <Icon name="shield" className="h-5 w-5 text-brand-600" />
                {business.serviceType}
              </p>
              <p className="mt-2 text-sm leading-relaxed text-slate-600">{business.description}</p>
            </div>

            <a
              href={`tel:${phone}`}
              className="mt-6 inline-flex items-center gap-2 rounded-xl bg-brand-600 px-6 py-3.5 text-sm font-bold text-white shadow-[0_10px_30px_-10px_rgba(37,99,235,0.55)] transition hover:bg-brand-700"
            >
              <Icon name="phone" className="h-4 w-4" />
              Call {phoneVanity} — 24/7
            </a>
          </Reveal>

          <Reveal delay={0.1} className="relative order-first overflow-hidden rounded-3xl bg-gradient-to-br from-brand-600 to-slate-900 shadow-[0_30px_60px_-20px_rgba(15,23,42,0.35)] lg:order-last">
            <div className="relative aspect-[4/3]">
              <Image
                src={seo.aboutImage}
                alt={seo.aboutImageAlt}
                fill
                sizes="(min-width: 1024px) 560px, 100vw"
                className="object-cover"
              />
            </div>
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-slate-900/40 via-transparent to-transparent" />
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
