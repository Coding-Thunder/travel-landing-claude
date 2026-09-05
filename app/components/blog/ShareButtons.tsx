"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import Icon from "../ui/Icon";

/**
 * Article share row.
 *
 * Secondary chrome, so every control is an `outline` button at the system's own
 * sizes. The row sits beside the byline and must never out-shout the page's one
 * primary action. The share targets are links (they open a real URL), the copy
 * control is a button, and both are the same 40px so the row reads as one strip.
 */
export default function ShareButtons({ url, title }: { url: string; title: string }) {
  const [copied, setCopied] = useState(false);
  const enc = encodeURIComponent;

  const links = [
    { label: "Share on X", href: `https://twitter.com/intent/tweet?url=${enc(url)}&text=${enc(title)}`, icon: "x" as const },
    { label: "Share on Facebook", href: `https://www.facebook.com/sharer/sharer.php?u=${enc(url)}`, icon: "facebook" as const },
    { label: "Share on LinkedIn", href: `https://www.linkedin.com/sharing/share-offsite/?url=${enc(url)}`, icon: "linkedin" as const },
  ];

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1500);
    } catch {
      /* clipboard unavailable */
    }
  };

  return (
    <div className="flex flex-wrap items-center gap-2">
      <span className="mr-1 text-xs font-medium uppercase tracking-wider text-muted-foreground">Share</span>
      {links.map((l) => (
        <Button key={l.label} asChild variant="outline" size="icon">
          <a href={l.href} target="_blank" rel="noopener noreferrer" aria-label={l.label}>
            <Icon name={l.icon} />
          </a>
        </Button>
      ))}
      <Button type="button" variant="outline" onClick={copy} aria-label="Copy link">
        {copied ? (
          <>
            <Icon name="check" className="text-success" />
            Copied
          </>
        ) : (
          "Copy link"
        )}
      </Button>
    </div>
  );
}
