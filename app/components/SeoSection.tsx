import Image from "next/image";
import { siteConfig } from "@/config/siteConfig";

export default function SeoSection() {
  const { seo, phone, phoneDisplay, city } = siteConfig;

  return (
    <section className="bg-white py-16 sm:py-24">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
          {/* Text column */}
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-red-600">
              About our {city} rentals
            </p>
            <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
              {seo.heading}
            </h2>
            <p className="mt-5 text-lg font-medium leading-relaxed text-slate-700 sm:text-xl">
              {seo.about}
            </p>

            <ul className="mt-8 space-y-3">
              {seo.highlights.map((point) => (
                <li
                  key={point}
                  className="flex items-start gap-3 text-[15px] text-slate-700 sm:text-base"
                >
                  <svg
                    className="mt-0.5 h-5 w-5 flex-shrink-0 text-red-600"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.704 5.29a1 1 0 010 1.42l-8 8a1 1 0 01-1.42 0l-4-4a1 1 0 111.42-1.42L8 12.585l7.29-7.296a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span className="font-medium">{point}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Image column */}
          <div className="relative order-first overflow-hidden rounded-3xl shadow-[0_30px_60px_-20px_rgba(15,23,42,0.35)] lg:order-last">
            <Image
              src={seo.image}
              alt={seo.imageAlt}
              width={1600}
              height={1066}
              sizes="(min-width: 1024px) 560px, 100vw"
              className="h-full w-full object-cover"
            />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-slate-900/30 via-transparent to-transparent" />
          </div>
        </div>

        {/* CTA block */}
        <div className="mt-14 flex flex-col items-center gap-3 rounded-2xl border border-slate-200 bg-slate-50 p-6 text-center sm:mt-16 sm:p-8">
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
            <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M20.01 15.38c-1.23 0-2.42-.2-3.53-.56a.977.977 0 00-1.01.24l-1.57 1.97c-2.83-1.35-5.48-3.9-6.89-6.83l1.95-1.66c.27-.28.35-.67.24-1.02-.37-1.11-.56-2.3-.56-3.53 0-.54-.45-.99-.99-.99H4.19C3.65 3 3 3.24 3 3.99 3 13.28 10.73 21 20.01 21c.71 0 .99-.63.99-1.18v-3.45c0-.54-.45-.99-.99-.99z" />
            </svg>
            Call Now
          </a>
        </div>

        {/* Hidden/secondary SEO content — visually hidden but crawlable */}
        <div className="sr-only" aria-hidden="true">
          <h3>{seo.subheading}</h3>
          {seo.content.map((paragraph, idx) => (
            <p key={idx}>{paragraph}</p>
          ))}
        </div>
      </div>
    </section>
  );
}
