"use client";

import { createElement } from "react";
import { motion, useReducedMotion } from "framer-motion";

const easeOut = [0.22, 1, 0.36, 1] as const;

type RevealProps = {
  children: React.ReactNode;
  className?: string;
  /** Stagger delay in seconds. */
  delay?: number;
  /** Translate distance in px (vertical). */
  y?: number;
  as?: "div" | "li" | "span";
};

/**
 * Subtle scroll-into-view reveal. Animates once, respects reduced-motion,
 * and degrades to a plain element when motion is disabled.
 */
export default function Reveal({
  children,
  className = "",
  delay = 0,
  y = 16,
  as = "div",
}: RevealProps) {
  const reduce = useReducedMotion();

  if (reduce) {
    return createElement(as, { className }, children);
  }

  const MotionTag = motion[as] as typeof motion.div;

  return (
    <MotionTag
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.55, ease: easeOut, delay }}
    >
      {children}
    </MotionTag>
  );
}
