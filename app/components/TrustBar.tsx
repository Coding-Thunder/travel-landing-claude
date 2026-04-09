import { siteConfig } from "@/config/siteConfig";

export default function TrustBar() {
  const { trust } = siteConfig;

  return (
    <section className="border-b border-slate-200 bg-white">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-center gap-x-8 gap-y-3 px-5 py-5 text-center text-sm sm:px-8 sm:py-6">
        <div className="flex items-center gap-2 text-slate-800">
          <div className="flex items-center gap-0.5 text-yellow-500">
            <StarIcon />
            <StarIcon />
            <StarIcon />
            <StarIcon />
            <StarIcon />
          </div>
          <span className="font-semibold">{trust.rating}</span>
          <span className="text-slate-500">{trust.ratingLabel}</span>
        </div>

        <span className="hidden h-5 w-px bg-slate-200 sm:block" />

        <div className="flex items-center gap-2 text-slate-800">
          <svg
            className="h-4 w-4 text-slate-400"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 21s-7-4.35-7-11a7 7 0 1114 0c0 6.65-7 11-7 11z"
            />
            <circle cx="12" cy="10" r="2.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <span className="font-semibold">{trust.customers}</span>
          <span className="text-slate-500">{trust.customersLabel}</span>
        </div>

        {trust.highlights.map((highlight) => (
          <div key={highlight} className="flex items-center gap-2 text-slate-800">
            <span className="hidden h-5 w-px bg-slate-200 sm:block" />
            <svg
              className="h-4 w-4 text-emerald-600"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
            <span className="font-semibold">{highlight}</span>
          </div>
        ))}
      </div>
    </section>
  );
}

function StarIcon() {
  return (
    <svg className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.957a1 1 0 00.95.69h4.162c.969 0 1.371 1.24.588 1.81l-3.37 2.447a1 1 0 00-.364 1.118l1.287 3.957c.3.921-.755 1.688-1.54 1.118l-3.37-2.447a1 1 0 00-1.175 0l-3.37 2.447c-.784.57-1.838-.197-1.539-1.118l1.287-3.957a1 1 0 00-.364-1.118L2.05 9.384c-.783-.57-.38-1.81.588-1.81h4.163a1 1 0 00.95-.69l1.287-3.957z" />
    </svg>
  );
}
