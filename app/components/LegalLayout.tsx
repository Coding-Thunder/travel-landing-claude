import { siteConfig } from "@/config/siteConfig";

type LegalLayoutProps = {
  title: string;
  updated: string;
  intro?: string;
  children: React.ReactNode;
};

export default function LegalLayout({
  title,
  updated,
  intro,
  children,
}: LegalLayoutProps) {
  return (
    <div className="bg-white">
      {/* Hero band */}
      <div className="border-b border-slate-200 bg-slate-50">
        <div className="mx-auto max-w-3xl px-5 py-12 sm:px-8 sm:py-16">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-red-600">
            Legal · {siteConfig.name}
          </p>
          <h1 className="mt-3 text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
            {title}
          </h1>
          <p className="mt-3 text-sm text-slate-500">Last updated: {updated}</p>
          {intro ? (
            <p className="mt-4 text-base leading-relaxed text-slate-700">
              {intro}
            </p>
          ) : null}
        </div>
      </div>

      {/* Body */}
      <article className="mx-auto max-w-3xl px-5 py-12 sm:px-8 sm:py-16">
        <div className="space-y-8 text-[15px] leading-relaxed text-slate-700 sm:text-base [&_h2]:mt-2 [&_h2]:text-xl [&_h2]:font-bold [&_h2]:text-slate-900 sm:[&_h2]:text-2xl [&_h3]:mt-2 [&_h3]:text-base [&_h3]:font-semibold [&_h3]:text-slate-900 [&_p]:mt-3 [&_ul]:mt-3 [&_ul]:list-disc [&_ul]:space-y-1.5 [&_ul]:pl-6">
          {children}
        </div>

        {/* CTA back to home */}
        <div className="mt-12 flex flex-col items-center gap-3 rounded-2xl border border-slate-200 bg-slate-50 p-6 text-center sm:p-8">
          <p className="text-sm font-semibold uppercase tracking-wider text-slate-500">
            Questions?
          </p>
          <p className="text-lg font-extrabold text-slate-900 sm:text-xl">
            Call our {siteConfig.city} team 24/7
          </p>
          <a
            href={`tel:${siteConfig.phone}`}
            className="mt-1 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-red-600 px-6 py-3.5 text-sm font-bold text-white transition hover:bg-red-700 sm:w-auto"
          >
            <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
              <path d="M20.01 15.38c-1.23 0-2.42-.2-3.53-.56a.977.977 0 00-1.01.24l-1.57 1.97c-2.83-1.35-5.48-3.9-6.89-6.83l1.95-1.66c.27-.28.35-.67.24-1.02-.37-1.11-.56-2.3-.56-3.53 0-.54-.45-.99-.99-.99H4.19C3.65 3 3 3.24 3 3.99 3 13.28 10.73 21 20.01 21c.71 0 .99-.63.99-1.18v-3.45c0-.54-.45-.99-.99-.99z" />
            </svg>
            {siteConfig.phoneDisplay}
          </a>
        </div>
      </article>
    </div>
  );
}
