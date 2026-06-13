"use client";

import Image from "next/image";
import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { siteConfig } from "@/config/siteConfig";
import { useCall } from "./call/CallProvider";
import Icon from "./ui/Icon";

const easeOut = [0.22, 1, 0.36, 1] as const;

export default function Hero() {
  const { hero, quote, phone, phoneVanity, phoneDisplay, callResponse, seo, stats } = siteConfig;
  const { open } = useCall();
  const reduce = useReducedMotion();

  const [pickup, setPickup] = useState("");
  const [pickupDate, setPickupDate] = useState("");
  const [returnDate, setReturnDate] = useState("");
  const [age, setAge] = useState<string>(quote.driverAges[0]);

  const submitQuote = (e: React.FormEvent) => {
    e.preventDefault();
    open({ source: "hero-quick-quote", pickup });
  };

  const fade = (delay: number) =>
    reduce
      ? {}
      : {
          initial: { opacity: 0, y: 18 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.6, ease: easeOut, delay },
        };

  return (
    <section className="relative isolate overflow-hidden bg-slate-950 text-white">
      {/* Background image + gradients */}
      <div aria-hidden className="absolute inset-0">
        <Image
          src={seo.image}
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover object-center opacity-35"
        />
      </div>
      <div aria-hidden className="absolute inset-0 bg-gradient-to-br from-slate-950 via-slate-950/85 to-brand-900/50" />
      <div aria-hidden className="absolute -top-32 -left-24 h-[460px] w-[460px] rounded-full bg-[radial-gradient(circle_at_center,rgba(37,99,235,0.35),transparent_65%)] blur-3xl" />

      <div className="relative mx-auto grid max-w-6xl grid-cols-1 gap-10 px-5 pb-14 pt-12 sm:px-8 sm:pb-20 sm:pt-16 lg:grid-cols-12 lg:gap-10 lg:pb-24 lg:pt-20">
        {/* ---------------- Left: message + phone ---------------- */}
        <div className="lg:col-span-7">
          <motion.div {...fade(0)} className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-3.5 py-1.5 text-[11px] font-semibold uppercase tracking-wider backdrop-blur sm:text-xs">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
            </span>
            {hero.eyebrow}
          </motion.div>

          <motion.h1 {...fade(0.06)} className="mt-5 text-[2.5rem] font-extrabold leading-[1.04] tracking-tight sm:text-5xl lg:text-6xl">
            {hero.title}{" "}
            <span className="text-white/90">{hero.titleAccent}</span>
            <span className="mt-2 block bg-gradient-to-r from-brand-300 to-sky-200 bg-clip-text text-transparent">
              {hero.titleHighlight}
            </span>
          </motion.h1>

          <motion.p {...fade(0.12)} className="mt-5 max-w-xl text-base text-white/75 sm:text-lg">
            {hero.subtitle}
          </motion.p>

          {/* Giant tap-to-call — impossible to miss */}
          <motion.div {...fade(0.18)} className="mt-7 max-w-md">
            <a
              href={`tel:${phone}`}
              className="group relative flex items-center gap-4 rounded-2xl border border-white/15 bg-white/10 p-4 backdrop-blur transition hover:bg-white/15"
            >
              <span className="relative flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-brand-600 text-white shadow-[0_10px_30px_-8px_rgba(37,99,235,0.8)]">
                {!reduce && (
                  <motion.span
                    className="absolute inset-0 rounded-xl"
                    animate={{ boxShadow: ["0 0 0 0 rgba(37,99,235,0.6)", "0 0 0 14px rgba(37,99,235,0)"] }}
                    transition={{ duration: 2, repeat: Infinity, ease: "easeOut" }}
                  />
                )}
                <Icon name="phone" className="h-7 w-7" />
              </span>
              <span className="min-w-0">
                <span className="block text-[11px] font-semibold uppercase tracking-wider text-white/60">
                  {hero.callLabel}
                </span>
                <span className="block text-3xl font-extrabold leading-tight tracking-tight sm:text-[2.1rem]">
                  {phoneVanity}
                </span>
                <span className="block text-xs text-white/55">
                  {phoneDisplay} · {callResponse}
                </span>
              </span>
            </a>

            <div className="mt-3 flex flex-col gap-2.5 sm:flex-row">
              <a
                href={`tel:${phone}`}
                className="inline-flex flex-1 items-center justify-center gap-2 rounded-xl bg-brand-600 px-5 py-3.5 text-[15px] font-bold text-white shadow-[0_10px_30px_-10px_rgba(37,99,235,0.6)] transition hover:bg-brand-700 active:scale-[0.99]"
              >
                <Icon name="phone" className="h-5 w-5" />
                Call Now
              </a>
              <button
                type="button"
                onClick={() => open({ source: "hero-callback" })}
                className="inline-flex flex-1 items-center justify-center gap-2 rounded-xl border border-white/20 bg-white/10 px-5 py-3.5 text-[15px] font-semibold text-white backdrop-blur transition hover:bg-white/15"
              >
                <Icon name="headset" className="h-5 w-5" />
                Request a Callback
              </button>
            </div>
          </motion.div>

          {/* Trust badges */}
          <motion.ul {...fade(0.24)} className="mt-7 flex flex-wrap gap-x-5 gap-y-2">
            {hero.badges.map((badge) => (
              <li key={badge} className="flex items-center gap-1.5 text-sm font-medium text-white/80">
                <Icon name="check" className="h-4 w-4 text-emerald-400" />
                {badge}
              </li>
            ))}
          </motion.ul>
        </div>

        {/* ---------------- Right: quick-quote lead form ---------------- */}
        <motion.div {...fade(0.18)} className="lg:col-span-5">
          <div className="rounded-2xl border border-slate-200 bg-white p-5 text-slate-900 shadow-2xl sm:p-6">
            <div className="flex items-center gap-2">
              <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-brand-50 text-brand-600">
                <Icon name="bolt" className="h-5 w-5" />
              </span>
              <div>
                <h2 className="text-base font-bold leading-tight">{quote.title}</h2>
                <p className="text-xs text-slate-500">{quote.subtitle}</p>
              </div>
            </div>

            <form onSubmit={submitQuote} className="mt-4 space-y-3">
              <label className="block">
                <span className="mb-1 block text-xs font-semibold text-slate-600">Pickup location</span>
                <div className="relative">
                  <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
                    <Icon name="map" className="h-4 w-4" />
                  </span>
                  <input
                    type="text"
                    list="hero-cities"
                    value={pickup}
                    onChange={(e) => setPickup(e.target.value)}
                    placeholder="City or airport"
                    className="w-full rounded-xl border border-slate-200 bg-white py-3 pl-9 pr-3 text-[15px] placeholder:text-slate-400 focus:border-brand-500 focus:ring-2 focus:ring-brand-200"
                  />
                  <datalist id="hero-cities">
                    {siteConfig.destinations.map((d) => (
                      <option key={d.city} value={`${d.city}, ${d.state}`} />
                    ))}
                  </datalist>
                </div>
              </label>

              <div className="grid grid-cols-2 gap-3">
                <label className="block">
                  <span className="mb-1 block text-xs font-semibold text-slate-600">Pickup date</span>
                  <input
                    type="date"
                    value={pickupDate}
                    onChange={(e) => setPickupDate(e.target.value)}
                    className="w-full rounded-xl border border-slate-200 bg-white px-3 py-3 text-[15px] text-slate-900 focus:border-brand-500 focus:ring-2 focus:ring-brand-200"
                  />
                </label>
                <label className="block">
                  <span className="mb-1 block text-xs font-semibold text-slate-600">Return date</span>
                  <input
                    type="date"
                    min={pickupDate || undefined}
                    value={returnDate}
                    onChange={(e) => setReturnDate(e.target.value)}
                    className="w-full rounded-xl border border-slate-200 bg-white px-3 py-3 text-[15px] text-slate-900 focus:border-brand-500 focus:ring-2 focus:ring-brand-200"
                  />
                </label>
              </div>

              <label className="block">
                <span className="mb-1 block text-xs font-semibold text-slate-600">Driver age</span>
                <select
                  value={age}
                  onChange={(e) => setAge(e.target.value)}
                  className="w-full rounded-xl border border-slate-200 bg-white px-3 py-3 text-[15px] text-slate-900 focus:border-brand-500 focus:ring-2 focus:ring-brand-200"
                >
                  {quote.driverAges.map((a) => (
                    <option key={a} value={a}>
                      {a} years
                    </option>
                  ))}
                </select>
              </label>

              <button
                type="submit"
                className="mt-1 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-brand-600 px-6 py-3.5 text-base font-bold text-white shadow-[0_10px_30px_-10px_rgba(37,99,235,0.55)] transition hover:-translate-y-0.5 hover:bg-brand-700 active:translate-y-0"
              >
                {quote.cta}
                <Icon name="bolt" className="h-5 w-5" />
              </button>
            </form>

            <p className="mt-3 text-center text-xs text-slate-500">
              Prefer to talk?{" "}
              <a href={`tel:${phone}`} className="font-bold text-brand-700 hover:underline">
                Call {phoneVanity}
              </a>
            </p>
          </div>
        </motion.div>
      </div>

      {/* Stats strip */}
      <div className="relative border-t border-white/10">
        <div className="mx-auto grid max-w-6xl grid-cols-2 gap-y-6 px-5 py-7 sm:grid-cols-4 sm:px-8">
          {stats.map((s) => (
            <div key={s.label} className="text-center sm:text-left">
              <p className="text-2xl font-extrabold tracking-tight sm:text-3xl">{s.value}</p>
              <p className="mt-0.5 text-xs font-medium uppercase tracking-wider text-white/55">{s.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
