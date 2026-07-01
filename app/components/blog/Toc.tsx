import type { Heading } from "@/lib/blog";

export default function Toc({ items }: { items: Heading[] }) {
  if (items.length < 2) return null;
  return (
    <nav aria-label="Table of contents" className="rounded-2xl border border-slate-200 bg-white p-5">
      <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">On this page</p>
      <ul className="mt-3 space-y-2 text-sm">
        {items.map((h) => (
          <li key={h.id} className={h.level === 3 ? "pl-3" : ""}>
            <a href={`#${h.id}`} className="block text-slate-600 transition hover:text-brand-700">
              {h.text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
