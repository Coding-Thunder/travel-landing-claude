/**
 * The one FAQ presentation on the site: home page, airport pages, vehicle
 * pages and blog posts all render this.
 *
 * Built on native `<details>` rather than a JS accordion, for one specific
 * reason: **a JS accordion does not render closed answers into the HTML at all.**
 * Every route here also emits FAQPage structured data listing those answers, so
 * the markup was asserting ten answers that were not on the page. Google's FAQ
 * guidelines require the content to be present.
 *
 * `<details>` keeps every answer in the DOM, collapses it with CSS, is keyboard
 * operable and screen-reader correct with no ARIA, and ships zero JavaScript.
 * It is also a server component, so it costs nothing in the client bundle.
 */
export default function FaqList({ items }: { items: { q: string; a: string }[] }) {
  return (
    <div className="border-t">
      {items.map((item) => (
        <details key={item.q} className="group border-b">
          <summary
            className={[
              "flex cursor-pointer list-none items-center justify-between gap-4 py-4",
              "text-left text-[15px] font-medium transition-colors hover:text-primary",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
              // Safari draws its own disclosure triangle without this.
              "[&::-webkit-details-marker]:hidden",
            ].join(" ")}
          >
            {item.q}
            <svg
              viewBox="0 0 24 24"
              className="h-4 w-4 shrink-0 text-muted-foreground transition-transform duration-200 group-open:rotate-180"
              fill="none"
              stroke="currentColor"
              strokeWidth={1.75}
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden
            >
              <path d="m6.2 9.4 5.8 5.8 5.8-5.8" />
            </svg>
          </summary>
          <div className="pb-4 pr-8 text-sm leading-relaxed text-muted-foreground">{item.a}</div>
        </details>
      ))}
    </div>
  );
}
