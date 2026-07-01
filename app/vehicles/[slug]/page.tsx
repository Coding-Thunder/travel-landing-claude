import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { vehicleCategories, getVehicleCategory } from "@/config/vehicles";
import { siteConfig } from "@/config/siteConfig";
import Container from "../../components/ui/Container";
import PageHero from "../../components/PageHero";
import CallBand from "../../components/CallBand";
import FaqList from "../../components/ui/FaqList";
import VehicleCard from "../../components/VehicleCard";
import Icon from "../../components/ui/Icon";
import Reveal from "../../components/ui/Reveal";
import JsonLd from "../../components/seo/JsonLd";
import { breadcrumbSchema, faqSchemaFrom, localBusinessSchema, vehicleSchema } from "@/lib/schema";

type Params = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return vehicleCategories.map((v) => ({ slug: v.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const v = getVehicleCategory(slug);
  if (!v) return {};

  const title = `${v.name} Car Rental — Models, Pricing & Tips`;
  const description = `Rent a ${v.name.toLowerCase()} car from $${v.priceFrom}/day with ${siteConfig.name}. Popular models, indicative daily/weekly/monthly pricing, and rental tips. Call ${siteConfig.phoneDisplay} for your best rate.`;

  return {
    title,
    description,
    alternates: { canonical: `/vehicles/${v.slug}` },
    openGraph: {
      title: `${title} | ${siteConfig.name}`,
      description,
      url: `/vehicles/${v.slug}`,
      type: "website",
      images: [{ url: v.image, width: 1200, height: 630, alt: `${v.name} rental car` }],
    },
  };
}

export default async function VehiclePage({ params }: Params) {
  const { slug } = await params;
  const v = getVehicleCategory(slug);
  if (!v) notFound();

  const related = vehicleCategories.filter((c) => c.slug !== v.slug).slice(0, 4);

  return (
    <>
      <JsonLd
        data={[
          localBusinessSchema(),
          vehicleSchema(v),
          faqSchemaFrom(v.faqs),
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Vehicles", path: "/vehicles" },
            { name: v.name, path: `/vehicles/${v.slug}` },
          ]),
        ]}
      />

      <PageHero
        eyebrow="Vehicle category"
        title={`${v.name} Car Rental`}
        subtitle={v.blurb}
        breadcrumbs={[
          { name: "Home", href: "/" },
          { name: "Vehicles", href: "/vehicles" },
          { name: v.name, href: `/vehicles/${v.slug}` },
        ]}
      />

      <Container className="py-14 sm:py-16">
        <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-14">
          <Reveal>
            <h2 className="text-2xl font-extrabold tracking-tight text-slate-900 sm:text-3xl">
              About {v.name.toLowerCase()} rentals
            </h2>
            {v.intro.map((p, i) => (
              <p key={i} className={`${i === 0 ? "mt-4 text-lg text-slate-700" : "mt-3 text-[15px] text-slate-600"} leading-relaxed`}>
                {p}
              </p>
            ))}
            <dl className="mt-6 grid grid-cols-3 gap-3 text-center">
              <Stat icon="users" value={`${v.seats}`} label="Seats" />
              <Stat icon="car" value={`${v.bags}`} label="Bags" />
              <Stat icon="tag" value={`$${v.priceFrom}`} label="From /day" />
            </dl>
          </Reveal>
          <Reveal delay={0.1} className={`relative order-first overflow-hidden rounded-3xl bg-gradient-to-br ${v.gradient} shadow-[var(--shadow-lift)] lg:order-last`}>
            <div className="relative aspect-[4/3]">
              <Image src={v.image} alt={`${v.name} rental car`} fill sizes="(min-width: 1024px) 560px, 100vw" className="object-cover" />
            </div>
          </Reveal>
        </div>

        <div className="mt-12">
          <CallBand heading={`Best ${v.name.toLowerCase()} rate — by phone`} />
        </div>

        {/* Best for */}
        <section className="mt-14 grid gap-10 lg:grid-cols-2 lg:gap-14">
          <div>
            <h2 className="text-2xl font-extrabold tracking-tight text-slate-900 sm:text-3xl">Best for</h2>
            <ul className="mt-6 space-y-3">
              {v.bestFor.map((use) => (
                <li key={use} className="flex items-start gap-3 text-[15px] text-slate-700">
                  <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-brand-50 text-brand-600">
                    <Icon name="check" className="h-4 w-4" />
                  </span>
                  {use}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h2 className="text-2xl font-extrabold tracking-tight text-slate-900 sm:text-3xl">Popular models</h2>
            <ul className="mt-6 space-y-3">
              {v.models.map((m) => (
                <li key={m.name} className="rounded-2xl border border-slate-200 bg-white p-4 shadow-[var(--shadow-card)]">
                  <p className="flex items-center gap-2 text-base font-bold text-slate-900">
                    <Icon name="car" className="h-4 w-4 text-brand-600" />
                    {m.name}
                  </p>
                  <p className="mt-1 text-sm text-slate-600">{m.note}</p>
                </li>
              ))}
            </ul>
            <p className="mt-3 text-xs text-slate-500">Specific makes and models are examples and subject to availability.</p>
          </div>
        </section>

        {/* Pricing */}
        <section className="mt-14">
          <h2 className="text-2xl font-extrabold tracking-tight text-slate-900 sm:text-3xl">Indicative pricing</h2>
          <div className="mt-6 overflow-hidden rounded-2xl border border-slate-200">
            <table className="w-full text-left text-sm">
              <thead className="bg-slate-50 text-xs uppercase tracking-wider text-slate-500">
                <tr>
                  <th scope="col" className="px-5 py-3 font-semibold">Term</th>
                  <th scope="col" className="px-5 py-3 font-semibold">Rate</th>
                  <th scope="col" className="hidden px-5 py-3 font-semibold sm:table-cell">Notes</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {v.pricing.map((row) => (
                  <tr key={row.term} className="bg-white">
                    <th scope="row" className="px-5 py-3 font-bold text-slate-900">{row.term}</th>
                    <td className="px-5 py-3 font-semibold text-brand-700">{row.price}</td>
                    <td className="hidden px-5 py-3 text-slate-600 sm:table-cell">{row.note}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-3 text-xs text-slate-500">Rates are indicative, vary by location and date, and are confirmed by phone before you book.</p>
        </section>

        {/* Tips */}
        <section className="mt-14">
          <h2 className="text-2xl font-extrabold tracking-tight text-slate-900 sm:text-3xl">{v.name} rental tips</h2>
          <ul className="mt-6 grid gap-4 sm:grid-cols-2">
            {v.tips.map((tip) => (
              <li key={tip} className="flex gap-3 rounded-2xl border border-slate-200 bg-white p-5 shadow-[var(--shadow-card)]">
                <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-brand-50 text-brand-600">
                  <Icon name="sparkles" className="h-4 w-4" />
                </span>
                <span className="text-sm leading-relaxed text-slate-700">{tip}</span>
              </li>
            ))}
          </ul>
        </section>

        {/* FAQ */}
        <section className="mt-14">
          <h2 className="text-2xl font-extrabold tracking-tight text-slate-900 sm:text-3xl">{v.name} rental FAQs</h2>
          <div className="mt-6 max-w-3xl">
            <FaqList items={v.faqs} />
          </div>
        </section>

        {/* Related */}
        <section className="mt-14">
          <div className="flex items-end justify-between gap-4">
            <h2 className="text-2xl font-extrabold tracking-tight text-slate-900 sm:text-3xl">Other vehicle types</h2>
            <Link href="/vehicles" className="shrink-0 text-sm font-bold text-brand-700 hover:underline">View all</Link>
          </div>
          <div className="mt-6 grid grid-cols-2 gap-4 sm:gap-5 lg:grid-cols-4">
            {related.map((c) => (
              <VehicleCard key={c.slug} vehicle={c} />
            ))}
          </div>
        </section>
      </Container>
    </>
  );
}

function Stat({ icon, value, label }: { icon: Parameters<typeof Icon>[0]["name"]; value: string; label: string }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white py-4 shadow-[var(--shadow-card)]">
      <Icon name={icon} className="mx-auto h-5 w-5 text-brand-600" />
      <dd className="mt-1 text-xl font-extrabold text-slate-900">{value}</dd>
      <dt className="text-[11px] font-medium uppercase tracking-wider text-slate-500">{label}</dt>
    </div>
  );
}
