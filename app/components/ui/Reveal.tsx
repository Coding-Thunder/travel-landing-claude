import { createElement } from "react";
import { cn } from "@/lib/cn";

type RevealProps = {
  children: React.ReactNode;
  className?: string;
  /** Stagger, in seconds. Kept from the previous API so call sites are unchanged. */
  delay?: number;
  as?: "div" | "li" | "section" | "article";
};

/**
 * Scroll-entrance wrapper.
 *
 * This was a framer-motion client component, which pulled an animation runtime
 * into every route that showed a list. It is now a server component using a CSS
 * scroll-driven animation (see `.rise-in` in globals.css), so it costs nothing
 * at runtime, and in browsers without scroll-driven animation support the
 * content is simply visible, which is the correct failure mode for content
 * that must be crawlable.
 */
export default function Reveal({ children, className, delay = 0, as = "div" }: RevealProps) {
  return createElement(
    as,
    {
      className: cn("rise-in", className),
      style: delay ? { animationDelay: `${delay}s` } : undefined,
    },
    children
  );
}
