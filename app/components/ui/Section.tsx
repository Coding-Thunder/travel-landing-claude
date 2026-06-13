import Container from "./Container";
import Reveal from "./Reveal";

type SectionProps = {
  id?: string;
  children: React.ReactNode;
  className?: string;
  /** Background tone: white (default) or light-gray. */
  tone?: "white" | "gray" | "dark";
  containerClassName?: string;
};

const TONES: Record<NonNullable<SectionProps["tone"]>, string> = {
  white: "bg-white",
  gray: "bg-slate-50",
  dark: "bg-slate-950 text-white",
};

/** Vertical-rhythm section wrapper with consistent spacing + optional tone. */
export function Section({
  id,
  children,
  className = "",
  tone = "white",
  containerClassName = "",
}: SectionProps) {
  return (
    <section
      id={id}
      className={`scroll-mt-20 py-16 sm:py-20 lg:py-24 ${TONES[tone]} ${className}`}
    >
      <Container className={containerClassName}>{children}</Container>
    </section>
  );
}

type HeadingProps = {
  eyebrow?: string;
  title: React.ReactNode;
  subtitle?: React.ReactNode;
  align?: "center" | "left";
  invert?: boolean;
  className?: string;
};

/** Reusable section heading: eyebrow + title + subtitle, with reveal animation. */
export function SectionHeading({
  eyebrow,
  title,
  subtitle,
  align = "center",
  invert = false,
  className = "",
}: HeadingProps) {
  const alignment =
    align === "center" ? "mx-auto max-w-2xl text-center" : "max-w-2xl text-left";
  return (
    <Reveal className={`${alignment} ${className}`}>
      {eyebrow ? (
        <p
          className={`text-xs font-semibold uppercase tracking-[0.18em] ${
            invert ? "text-brand-300" : "text-brand-600"
          }`}
        >
          {eyebrow}
        </p>
      ) : null}
      <h2
        className={`mt-3 text-3xl font-extrabold tracking-tight sm:text-4xl ${
          invert ? "text-white" : "text-slate-900"
        }`}
      >
        {title}
      </h2>
      {subtitle ? (
        <p
          className={`mt-4 text-base leading-relaxed sm:text-lg ${
            invert ? "text-slate-300" : "text-slate-600"
          }`}
        >
          {subtitle}
        </p>
      ) : null}
    </Reveal>
  );
}
