import { Plus } from "lucide-react";

/** Native <details> accordion — accessible, crawlable, zero client JS. */
export default function FaqAccordion({ items }: { items: { q: string; a: string }[] }) {
  return (
    <div className="divide-y divide-navy-100 overflow-hidden rounded-2xl border border-navy-100 bg-white">
      {items.map((item) => (
        <details key={item.q} className="group">
          <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-5 py-4 text-[15px] font-medium text-navy-900 transition hover:bg-navy-50 sm:px-6">
            {item.q}
            <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-navy-200 text-navy-500 transition group-open:border-royal-600 group-open:bg-royal-600 group-open:text-white">
              <Plus className="h-4 w-4 transition-transform duration-300 group-open:rotate-45" />
            </span>
          </summary>
          <p className="px-5 pb-5 text-sm leading-relaxed text-navy-600 sm:px-6">{item.a}</p>
        </details>
      ))}
    </div>
  );
}
