import { siteConfig } from "@/config/siteConfig";
import { Section, SectionHeading } from "./ui/Section";
import Reveal from "./ui/Reveal";
import Avatar from "./ui/Avatar";
import StarRating from "./ui/StarRating";
import Icon from "./ui/Icon";

export default function Testimonials() {
  const { testimonials, trust } = siteConfig;

  return (
    <Section id="reviews" tone="gray">
      <SectionHeading
        eyebrow="Customer reviews"
        title="Loved by drivers across the country"
        subtitle={
          <>
            Rated <span className="font-bold text-slate-900">{trust.rating} / 5</span> from{" "}
            {trust.ratingCount} verified rentals.
          </>
        }
      />

      <div className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6">
        {testimonials.map((t, i) => (
          <Reveal key={t.name} delay={(i % 3) * 0.06}>
            <figure className="flex h-full flex-col rounded-2xl border border-slate-200 bg-white p-6 shadow-[var(--shadow-card)]">
              <div className="flex items-center justify-between">
                <StarRating rating={t.rating} />
                <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2 py-0.5 text-[11px] font-semibold text-emerald-700">
                  <Icon name="check" className="h-3.5 w-3.5" />
                  Verified
                </span>
              </div>
              <blockquote className="mt-4 flex-1 text-[15px] leading-relaxed text-slate-700">
                &ldquo;{t.text}&rdquo;
              </blockquote>
              <figcaption className="mt-5 flex items-center gap-3 border-t border-slate-100 pt-4">
                <Avatar src={t.avatar} name={t.name} size={44} />
                <div className="min-w-0">
                  <p className="text-sm font-bold text-slate-900">{t.name}</p>
                  <p className="text-xs text-slate-500">
                    {t.location} · {t.tripType}
                  </p>
                </div>
                <span className="ml-auto whitespace-nowrap text-[11px] text-slate-400">{t.date}</span>
              </figcaption>
            </figure>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
