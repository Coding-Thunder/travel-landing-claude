import type { Heading } from "@/lib/blog";

/**
 * In-article table of contents.
 *
 * A quiet panel rather than a card: one hairline border, the label as an
 * overline, and the links carried by `text-muted-foreground` so the reading
 * column stays the loudest thing on the page. Level-3 headings are indented
 * against a rule instead of a second type size.
 */
export default function Toc({ items }: { items: Heading[] }) {
  if (items.length < 2) return null;
  return (
    <nav aria-label="Table of contents" className="rounded-lg border bg-card p-5">
      <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">On this page</p>
      <ul className="mt-3 space-y-1 text-sm">
        {items.map((h) => (
          <li key={h.id} className={h.level === 3 ? "ml-2 border-l pl-3" : ""}>
            <a
              href={`#${h.id}`}
              className="block rounded-sm py-1 leading-relaxed text-muted-foreground transition-colors hover:text-foreground"
            >
              {h.text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
