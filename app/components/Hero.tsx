"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { siteConfig } from "@/config/siteConfig";

const easeOut = [0.22, 1, 0.36, 1] as const;

export default function Hero() {
  const { hero, phone, phoneDisplay, whatsappUrl, trust } = siteConfig;

  return (
    <section className="relative isolate overflow-hidden bg-slate-950 text-white">
      {/* Background image */}
      <div aria-hidden className="absolute inset-0">
        <Image
          src={hero.image}
          alt=""
          aria-hidden
          fill
          priority
          sizes="100vw"
          className="object-cover object-center opacity-60"
        />
      </div>

      {/* Layered gradients for readability and balance */}
      <div
        aria-hidden
        className="absolute inset-0 bg-gradient-to-br from-slate-950/95 via-slate-950/70 to-slate-900/40"
      />
      <div
        aria-hidden
        className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent"
      />

      {/* Subtle warm accent (used sparingly to avoid red overload) */}
      <motion.div
        aria-hidden
        className="pointer-events-none absolute -top-32 -right-24 h-[420px] w-[420px] rounded-full bg-[radial-gradient(circle_at_center,rgba(251,146,60,0.22),transparent_65%)] blur-3xl"
        animate={{ opacity: [0.45, 0.8, 0.45] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Content */}
      <div className="relative mx-auto grid max-w-6xl grid-cols-1 gap-10 px-5 pb-16 pt-14 sm:px-8 sm:pb-24 sm:pt-20 lg:grid-cols-12 lg:gap-8 lg:pb-32 lg:pt-24">
        <motion.div
          className="lg:col-span-7"
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: easeOut }}
        >
          {/* Status pill */}
          <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-3.5 py-1.5 text-[11px] font-semibold uppercase tracking-wider text-white backdrop-blur sm:text-xs">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
            </span>
            {hero.eyebrow}
          </div>

          {/* Headline */}
          <h1 className="mt-5 text-[2.5rem] font-extrabold leading-[1.05] tracking-tight sm:text-5xl lg:text-6xl xl:text-[4.25rem]">
            {hero.title}{" "}
            <span className="block sm:inline">{hero.titleCity}</span>
            <span className="mt-2 block bg-gradient-to-r from-red-400 to-orange-300 bg-clip-text text-transparent">
              {hero.titleHighlight}
            </span>
          </h1>

          <p className="mt-5 max-w-xl text-base text-white/80 sm:text-lg">
            {hero.subtitle}
          </p>

          {/* CTA buttons */}
          <div className="mt-8 flex w-full flex-col gap-3 sm:flex-row sm:items-center">
            {/* Pulsing Call CTA */}
            <motion.div
              className="relative w-full sm:w-auto"
              animate={{
                boxShadow: [
                  "0 0 0 0 rgba(220,38,38,0.55)",
                  "0 0 0 14px rgba(220,38,38,0)",
                  "0 0 0 0 rgba(220,38,38,0)",
                ],
              }}
              transition={{
                duration: 2.4,
                repeat: Infinity,
                ease: "easeOut",
                times: [0, 0.7, 1],
              }}
              style={{ borderRadius: 12, willChange: "box-shadow" }}
            >
              <a
                href={`tel:${phone}`}
                className="group inline-flex w-full items-center justify-center gap-3 rounded-xl bg-red-600 px-6 py-4 text-base font-bold text-white shadow-[0_10px_30px_-10px_rgba(220,38,38,0.7)] ring-1 ring-inset ring-white/10 transition hover:-translate-y-0.5 hover:bg-red-500 hover:shadow-[0_20px_40px_-12px_rgba(220,38,38,0.8)] active:translate-y-0 sm:w-auto sm:text-[15px] lg:text-base"
              >
                <svg
                  className="h-5 w-5 transition-transform group-hover:rotate-[-8deg]"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M20.01 15.38c-1.23 0-2.42-.2-3.53-.56a.977.977 0 00-1.01.24l-1.57 1.97c-2.83-1.35-5.48-3.9-6.89-6.83l1.95-1.66c.27-.28.35-.67.24-1.02-.37-1.11-.56-2.3-.56-3.53 0-.54-.45-.99-.99-.99H4.19C3.65 3 3 3.24 3 3.99 3 13.28 10.73 21 20.01 21c.71 0 .99-.63.99-1.18v-3.45c0-.54-.45-.99-.99-.99z" />
                </svg>
                <span className="whitespace-nowrap">
                  {hero.primaryCta} {phoneDisplay}
                </span>
              </a>
            </motion.div>

            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex w-full items-center justify-center gap-2.5 rounded-xl border border-white/15 bg-white/10 px-6 py-4 text-base font-semibold text-white backdrop-blur transition hover:-translate-y-0.5 hover:bg-white/15 active:translate-y-0 sm:w-auto sm:text-[15px] lg:text-base"
            >
              <svg
                className="h-5 w-5 text-emerald-400"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.296-.767.966-.94 1.164-.174.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 00-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347zM12.05 21.785h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884zm8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.881 11.881 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
              {hero.secondaryCta}
            </a>
          </div>

          <p className="mt-5 text-xs text-white/60">{hero.supportingText}</p>

          {/* Trust stats */}
          <dl className="mt-10 grid max-w-md grid-cols-3 gap-4 border-t border-white/10 pt-6 text-left">
            <div>
              <dt className="text-[11px] font-medium uppercase tracking-wide text-white/50">
                {trust.ratingLabel}
              </dt>
              <dd className="mt-1 flex items-baseline gap-1">
                <span className="text-2xl font-extrabold">{trust.rating}</span>
                <span className="text-sm text-yellow-400">★</span>
              </dd>
            </div>
            <div>
              <dt className="text-[11px] font-medium uppercase tracking-wide text-white/50">
                Based in
              </dt>
              <dd className="mt-1 text-2xl font-extrabold">
                {siteConfig.city}
              </dd>
            </div>
            <div>
              <dt className="text-[11px] font-medium uppercase tracking-wide text-white/50">
                Phone support
              </dt>
              <dd className="mt-1 text-2xl font-extrabold">Live</dd>
            </div>
          </dl>
        </motion.div>

        {/* Right-side glass card (desktop only) */}
        <motion.div
          className="hidden lg:col-span-5 lg:flex lg:items-end lg:justify-end"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: easeOut, delay: 0.15 }}
        >
          <div className="w-full rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-md">
            <p className="text-[11px] font-semibold uppercase tracking-wider text-white/60">
              Rates from
            </p>
            <div className="mt-1 flex items-baseline gap-2">
              <span className="text-5xl font-extrabold tracking-tight">
                ${hero.priceFrom}
              </span>
              <span className="text-sm font-medium text-white/70">/ day*</span>
            </div>
            <p className="mt-3 text-sm text-white/70">{hero.priceFromNote}</p>
            <p className="mt-2 text-[11px] text-white/50">
              *Based on availability. Final rate confirmed by phone.
            </p>

            <div className="mt-5 space-y-3 border-t border-white/10 pt-5 text-sm">
              {hero.pricePoints.map((point) => (
                <div key={point} className="flex items-center gap-3">
                  <CheckIcon />
                  <span className="text-white/85">{point}</span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function CheckIcon() {
  return (
    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-emerald-500/20 text-emerald-400">
      <svg
        className="h-3.5 w-3.5"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="3"
      >
        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
      </svg>
    </span>
  );
}
