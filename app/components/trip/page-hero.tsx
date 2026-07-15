import Image from "next/image";
import Link from "next/link";
import Container from "./container";
import { cn } from "@/lib/cn";

export type Crumb = { name: string; href: string };

export default function PageHero({
  eyebrow,
  title,
  subtitle,
  breadcrumbs,
  image,
  imageAlt,
}: {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  breadcrumbs: Crumb[];
  image?: string;
  imageAlt?: string;
}) {
  const dark = Boolean(image);
  return (
    <section className={cn("relative isolate overflow-hidden", dark ? "bg-navy-900 text-white" : "border-b border-navy-100 bg-navy-50")}>
      {image ? (
        <>
          <Image src={image} alt={imageAlt ?? ""} fill priority sizes="100vw" className="object-cover object-center opacity-35" />
          <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-navy-950 via-navy-900/70 to-navy-900/40" />
        </>
      ) : null}
      <Container className={cn("relative", dark ? "py-16 sm:py-20" : "py-12 sm:py-16")}>
        <nav aria-label="Breadcrumb">
          <ol className={cn("flex flex-wrap items-center gap-1.5 text-xs", dark ? "text-white/70" : "text-navy-500")}>
            {breadcrumbs.map((c, i) => {
              const last = i === breadcrumbs.length - 1;
              return (
                <li key={c.href} className="flex items-center gap-1.5">
                  {i > 0 ? <span className={dark ? "text-white/40" : "text-navy-300"}>/</span> : null}
                  {last ? (
                    <span aria-current="page" className={dark ? "font-medium text-white" : "font-medium text-navy-700"}>{c.name}</span>
                  ) : (
                    <Link href={c.href} className={cn("transition", dark ? "hover:text-white" : "hover:text-royal-700")}>{c.name}</Link>
                  )}
                </li>
              );
            })}
          </ol>
        </nav>

        {eyebrow ? (
          <p className={cn("mt-5 text-xs font-semibold uppercase tracking-[0.16em]", dark ? "text-royal-300" : "text-royal-600")}>{eyebrow}</p>
        ) : null}
        <h1 className={cn("mt-2 max-w-3xl text-3xl font-semibold tracking-tight sm:text-4xl lg:text-[2.9rem] lg:leading-[1.08]", dark ? "text-white" : "text-navy-900")}>
          {title}
        </h1>
        {subtitle ? (
          <p className={cn("mt-4 max-w-2xl text-base leading-relaxed sm:text-lg", dark ? "text-navy-100" : "text-navy-600")}>{subtitle}</p>
        ) : null}
      </Container>
    </section>
  );
}
