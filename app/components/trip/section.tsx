import Container from "./container";
import Reveal from "./reveal";
import { cn } from "@/lib/cn";

export function Section({
  id,
  children,
  tone = "white",
  className,
}: {
  id?: string;
  children: React.ReactNode;
  tone?: "white" | "tint" | "navy";
  className?: string;
}) {
  const tones = {
    white: "bg-white",
    tint: "bg-navy-50",
    navy: "bg-navy-900 text-white",
  } as const;
  return (
    <section id={id} className={cn("scroll-mt-24 py-16 sm:py-20 lg:py-24", tones[tone], className)}>
      <Container>{children}</Container>
    </section>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  subtitle,
  align = "left",
  invert = false,
  className,
}: {
  eyebrow?: string;
  title: React.ReactNode;
  subtitle?: React.ReactNode;
  align?: "left" | "center";
  invert?: boolean;
  className?: string;
}) {
  return (
    <Reveal className={cn(align === "center" ? "mx-auto max-w-2xl text-center" : "max-w-2xl", className)}>
      {eyebrow ? (
        <p className={cn("text-xs font-semibold uppercase tracking-[0.16em]", invert ? "text-royal-300" : "text-royal-600")}>
          {eyebrow}
        </p>
      ) : null}
      <h2 className={cn("mt-3 text-3xl font-semibold tracking-tight sm:text-4xl", invert ? "text-white" : "text-navy-900")}>
        {title}
      </h2>
      {subtitle ? (
        <p className={cn("mt-4 text-base leading-relaxed sm:text-lg", invert ? "text-navy-100" : "text-navy-600")}>
          {subtitle}
        </p>
      ) : null}
    </Reveal>
  );
}
