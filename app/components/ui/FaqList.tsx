type FaqItem = { q: string; a: string };

/**
 * Native <details> accordion — accessible, crawlable and zero client JS.
 * Used on content pages where SEO and performance matter more than motion.
 */
export default function FaqList({ items }: { items: FaqItem[] }) {
  return (
    <div className="divide-y divide-slate-200 overflow-hidden rounded-2xl border border-slate-200 bg-white">
      {items.map((item) => (
        <details key={item.q} className="group">
          <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-5 py-4 text-[15px] font-bold text-slate-900 transition hover:bg-slate-50 sm:px-6">
            {item.q}
            <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-slate-300 text-slate-500 transition group-open:border-brand-600 group-open:bg-brand-600 group-open:text-white">
              <svg className="h-4 w-4 transition-transform duration-300 group-open:rotate-45" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 5v14M5 12h14" />
              </svg>
            </span>
          </summary>
          <p className="px-5 pb-5 text-sm leading-relaxed text-slate-600 sm:px-6">{item.a}</p>
        </details>
      ))}
    </div>
  );
}
