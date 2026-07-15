"use client";

import { createElement } from "react";
import { motion, useReducedMotion } from "framer-motion";

const easeOut = [0.22, 1, 0.36, 1] as const;

export default function Reveal({
  children,
  className,
  delay = 0,
  as = "div",
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  as?: "div" | "li" | "section";
}) {
  const reduce = useReducedMotion();
  if (reduce) return createElement(as, { className }, children);
  const Tag = motion[as] as typeof motion.div;
  return (
    <Tag
      className={className}
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.55, ease: easeOut, delay }}
    >
      {children}
    </Tag>
  );
}
