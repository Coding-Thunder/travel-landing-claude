import Link from "next/link";
import type { PostBlock } from "@/content/blog-types";
import { slugify } from "@/lib/blog";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import Icon from "../ui/Icon";
import type { IconName } from "@/config/siteConfig";

/**
 * Callout tones.
 *
 * All three sit on the same quiet surface and are told apart by their icon and
 * their label, not by a tinted panel each: the token layer has no amber or
 * emerald surface, and three differently-coloured boxes in a column of prose
 * shout over the article they are meant to annotate.
 */
const CALLOUT: Record<
  "tip" | "note" | "warning",
  { icon: IconName; iconColor: string; label: string }
> = {
  tip: { icon: "sparkles", iconColor: "text-success", label: "Tip" },
  note: { icon: "bolt", iconColor: "text-primary", label: "Note" },
  warning: { icon: "shield", iconColor: "text-destructive", label: "Heads up" },
};

/**
 * One reading size for every block, so paragraphs, list items and callout
 * bodies share a baseline instead of drifting apart.
 */
const BODY = "text-[15px] leading-7 text-muted-foreground";

/**
 * Inline links stay underlined rather than relying on blue alone. Colour is
 * not enough to mark a link inside a paragraph of body text.
 */
const LINK =
  "font-medium text-primary underline decoration-primary/40 underline-offset-4 transition-colors hover:decoration-primary";

const LINK_RE = /\[([^\]]+)\]\(([^)]+)\)/g;

/** Renders inline `[label](/path)` links inside body text. */
function renderInline(text: string): React.ReactNode {
  const nodes: React.ReactNode[] = [];
  let last = 0;
  let key = 0;
  for (const match of text.matchAll(LINK_RE)) {
    const index = match.index ?? 0;
    if (index > last) nodes.push(text.slice(last, index));
    const [, label, href] = match;
    const cls = LINK;
    if (href.startsWith("/")) {
      nodes.push(<Link key={key++} href={href} className={cls}>{label}</Link>);
    } else {
      nodes.push(<a key={key++} href={href} target="_blank" rel="noopener noreferrer" className={cls}>{label}</a>);
    }
    last = index + match[0].length;
  }
  if (last < text.length) nodes.push(text.slice(last));
  return nodes;
}

export default function PostBody({ blocks }: { blocks: PostBlock[] }) {
  return (
    <div className="space-y-5">
      {blocks.map((block, i) => {
        switch (block.type) {
          case "p":
            return <p key={i} className={BODY}>{renderInline(block.text)}</p>;
          case "h2":
            return (
              <h2 key={i} id={slugify(block.text)} className="scroll-mt-24 pt-5 text-xl font-semibold tracking-tight sm:text-2xl">
                {block.text}
              </h2>
            );
          case "h3":
            return (
              <h3 key={i} id={slugify(block.text)} className="scroll-mt-24 pt-2 text-[15px] font-medium">
                {block.text}
              </h3>
            );
          case "ul":
            return (
              <ul key={i} className="space-y-2.5">
                {block.items.map((item, j) => (
                  <li key={j} className={`flex gap-3 ${BODY}`}>
                    <span className="mt-[0.7rem] h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                    <span>{renderInline(item)}</span>
                  </li>
                ))}
              </ul>
            );
          case "ol":
            return (
              <ol key={i} className="space-y-2.5">
                {block.items.map((item, j) => (
                  <li key={j} className={`flex gap-3 ${BODY}`}>
                    <span className="w-5 shrink-0 text-right text-[13px] font-medium leading-7 tabular-nums text-primary">{j + 1}</span>
                    <span>{renderInline(item)}</span>
                  </li>
                ))}
              </ol>
            );
          case "callout": {
            const c = CALLOUT[block.variant];
            return (
              <Alert key={i} variant="muted" className="flex gap-3 border-border text-[15px]">
                <Icon name={c.icon} className={`mt-0.5 h-5 w-5 shrink-0 ${c.iconColor}`} />
                <div>
                  <AlertTitle>{block.title ?? c.label}</AlertTitle>
                  <AlertDescription className="leading-7">{renderInline(block.text)}</AlertDescription>
                </div>
              </Alert>
            );
          }
          case "quote":
            return (
              <blockquote key={i} className="border-l-2 pl-5 text-base font-medium italic leading-7">
                {renderInline(block.text)}
                {block.cite ? <cite className="mt-2 block text-sm not-italic text-muted-foreground">{block.cite}</cite> : null}
              </blockquote>
            );
        }
      })}
    </div>
  );
}
