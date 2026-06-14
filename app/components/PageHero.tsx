import Link from "next/link";
import Container from "./ui/Container";

export type Crumb = { name: string; href: string };

export default function PageHero({
  eyebrow,
  title,
  subtitle,
  breadcrumbs,
}: {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  breadcrumbs: Crumb[];
}) {
  return (
    <section className="border-b border-slate-200 bg-slate-50">
      <Container className="py-12 sm:py-16">
        <nav aria-label="Breadcrumb">
          <ol className="flex flex-wrap items-center gap-1.5 text-xs text-slate-500">
            {breadcrumbs.map((c, i) => {
              const last = i === breadcrumbs.length - 1;
              return (
                <li key={c.href} className="flex items-center gap-1.5">
                  {i > 0 ? <span className="text-slate-300">/</span> : null}
                  {last ? (
                    <span className="font-semibold text-slate-700" aria-current="page">
                      {c.name}
                    </span>
                  ) : (
                    <Link href={c.href} className="transition hover:text-brand-700">
                      {c.name}
                    </Link>
                  )}
                </li>
              );
            })}
          </ol>
        </nav>

        {eyebrow ? (
          <p className="mt-4 text-xs font-semibold uppercase tracking-[0.18em] text-brand-600">{eyebrow}</p>
        ) : null}
        <h1 className="mt-2 text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl lg:text-5xl">
          {title}
        </h1>
        {subtitle ? (
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-slate-600 sm:text-lg">{subtitle}</p>
        ) : null}
      </Container>
    </section>
  );
}
