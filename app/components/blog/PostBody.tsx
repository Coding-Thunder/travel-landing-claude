import Link from "next/link";
import type { PostBlock } from "@/content/blog-types";
import { slugify } from "@/lib/blog";
import Icon from "../ui/Icon";
import type { IconName } from "@/config/siteConfig";

const CALLOUT: Record<
  "tip" | "note" | "warning",
  { wrap: string; icon: IconName; iconColor: string; label: string }
> = {
  tip: { wrap: "border-emerald-200 bg-emerald-50", icon: "sparkles", iconColor: "text-emerald-600", label: "Tip" },
  note: { wrap: "border-brand-200 bg-brand-50", icon: "bolt", iconColor: "text-brand-600", label: "Note" },
  warning: { wrap: "border-amber-200 bg-amber-50", icon: "shield", iconColor: "text-amber-600", label: "Heads up" },
};

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
    const cls = "font-semibold text-brand-700 underline-offset-2 hover:underline";
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
            return <p key={i} className="text-[17px] leading-8 text-slate-700">{renderInline(block.text)}</p>;
          case "h2":
            return (
              <h2 key={i} id={slugify(block.text)} className="scroll-mt-24 pt-5 text-2xl font-extrabold tracking-tight text-slate-900 sm:text-[1.7rem]">
                {block.text}
              </h2>
            );
          case "h3":
            return (
              <h3 key={i} id={slugify(block.text)} className="scroll-mt-24 pt-2 text-xl font-bold tracking-tight text-slate-900">
                {block.text}
              </h3>
            );
          case "ul":
            return (
              <ul key={i} className="space-y-2.5">
                {block.items.map((item, j) => (
                  <li key={j} className="flex gap-3 text-[17px] leading-7 text-slate-700">
                    <span className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-500" />
                    <span>{renderInline(item)}</span>
                  </li>
                ))}
              </ul>
            );
          case "ol":
            return (
              <ol key={i} className="space-y-2.5">
                {block.items.map((item, j) => (
                  <li key={j} className="flex gap-3 text-[17px] leading-7 text-slate-700">
                    <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-brand-600 text-xs font-bold text-white">{j + 1}</span>
                    <span>{renderInline(item)}</span>
                  </li>
                ))}
              </ol>
            );
          case "callout": {
            const c = CALLOUT[block.variant];
            return (
              <aside key={i} className={`flex gap-3 rounded-2xl border p-5 ${c.wrap}`}>
                <span className={`mt-0.5 shrink-0 ${c.iconColor}`}>
                  <Icon name={c.icon} className="h-5 w-5" />
                </span>
                <div>
                  <p className="text-sm font-bold text-slate-900">{block.title ?? c.label}</p>
                  <p className="mt-1 text-[15px] leading-7 text-slate-700">{renderInline(block.text)}</p>
                </div>
              </aside>
            );
          }
          case "quote":
            return (
              <blockquote key={i} className="border-l-4 border-brand-500 pl-5 text-lg font-medium italic leading-8 text-slate-800">
                {renderInline(block.text)}
                {block.cite ? <cite className="mt-2 block text-sm not-italic text-slate-500">— {block.cite}</cite> : null}
              </blockquote>
            );
        }
      })}
    </div>
  );
}
