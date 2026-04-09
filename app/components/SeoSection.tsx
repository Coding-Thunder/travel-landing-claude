import { siteConfig } from "@/config/siteConfig";

export default function SeoSection() {
  const { seo, phone, phoneDisplay, city } = siteConfig;

  return (
    <section className="bg-white py-16 sm:py-24">
      <div className="mx-auto max-w-3xl px-5 sm:px-8">
        <div className="mb-10 text-center sm:mb-12">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-red-600">
            About our {city} rentals
          </p>
          <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
            {seo.heading}
          </h2>
          <p className="mt-4 text-base text-slate-600">{seo.subheading}</p>
        </div>

        <article className="space-y-5 text-[15px] leading-relaxed text-slate-700 sm:text-base">
          {seo.content.map((paragraph, idx) => (
            <p key={idx}>{paragraph}</p>
          ))}
        </article>

        <div className="mt-10 flex flex-col items-center gap-3 rounded-2xl border border-slate-200 bg-slate-50 p-6 text-center sm:mt-12 sm:p-8">
          <p className="text-sm font-semibold uppercase tracking-wider text-slate-500">
            Ready to drive?
          </p>
          <p className="text-xl font-extrabold text-slate-900 sm:text-2xl">
            Call {phoneDisplay} — available 24/7
          </p>
          <a
            href={`tel:${phone}`}
            className="mt-2 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-red-600 px-6 py-4 text-base font-bold text-white shadow-[0_10px_30px_-10px_rgba(220,38,38,0.6)] transition hover:bg-red-700 sm:w-auto"
          >
            <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
              <path d="M20.01 15.38c-1.23 0-2.42-.2-3.53-.56a.977.977 0 00-1.01.24l-1.57 1.97c-2.83-1.35-5.48-3.9-6.89-6.83l1.95-1.66c.27-.28.35-.67.24-1.02-.37-1.11-.56-2.3-.56-3.53 0-.54-.45-.99-.99-.99H4.19C3.65 3 3 3.24 3 3.99 3 13.28 10.73 21 20.01 21c.71 0 .99-.63.99-1.18v-3.45c0-.54-.45-.99-.99-.99z" />
            </svg>
            Call {phoneDisplay}
          </a>
        </div>
      </div>
    </section>
  );
}
