"use client";

import Image from "next/image";
import { useId, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { siteConfig } from "@/config/siteConfig";
import { airports } from "@/config/airports";
import { useCall } from "./call/CallProvider";
import Icon from "./ui/Icon";

const easeOut = [0.22, 1, 0.36, 1] as const;
const HERO_IMAGE =
  "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&w=2000&q=80";

export default function Hero() {
  const { hero, quote, phone, phoneVanity, phoneDisplay, callResponse, stats } = siteConfig;
  const { open } = useCall();
  const reduce = useReducedMotion();
  const listId = useId();

  const [pickupAirport, setPickupAirport] = useState("");
  const [differentDropoff, setDifferentDropoff] = useState(false);
  const [dropoffAirport, setDropoffAirport] = useState("");
  const [pickupDate, setPickupDate] = useState("");
  const [pickupTime, setPickupTime] = useState("10:00");
  const [returnDate, setReturnDate] = useState("");
  const [returnTime, setReturnTime] = useState("10:00");
  const [age, setAge] = useState<string>(quote.driverAges[0]);
  const [touched, setTouched] = useState(false);

  const pickupMissing = touched && !pickupAirport.trim();

  const submitSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setTouched(true);
    if (!pickupAirport.trim()) return;
    open({ source: "hero-airport-search", pickup: pickupAirport });
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
      <div aria-hidden className="absolute inset-0">
        <Image src={HERO_IMAGE} alt="" fill priority sizes="100vw" className="object-cover object-center opacity-40" />
      </div>
      <div aria-hidden className="absolute inset-0 bg-gradient-to-br from-slate-950 via-slate-950/85 to-brand-900/55" />
      <div aria-hidden className="absolute -top-32 -left-24 h-[460px] w-[460px] rounded-full bg-[radial-gradient(circle_at_center,rgba(37,99,235,0.35),transparent_65%)] blur-3xl" />

      <div className="relative mx-auto grid max-w-6xl grid-cols-1 gap-10 px-5 pb-14 pt-12 sm:px-8 sm:pb-20 sm:pt-16 lg:grid-cols-12 lg:gap-10 lg:pb-24 lg:pt-20">
        {/* Left: message + phone */}
        <div className="lg:col-span-6">
          <motion.div {...fade(0)} className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-3.5 py-1.5 text-[11px] font-semibold uppercase tracking-wider backdrop-blur sm:text-xs">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
            </span>
            {hero.eyebrow}
          </motion.div>

          <motion.h1 {...fade(0.06)} className="mt-5 text-[2.5rem] font-extrabold leading-[1.03] tracking-tight sm:text-5xl lg:text-[3.5rem]">
            {hero.title}{" "}
            <span className="text-white/90">{hero.titleAccent}</span>
            <span className="mt-2 block bg-gradient-to-r from-brand-300 to-sky-200 bg-clip-text text-transparent">
              {hero.titleHighlight}
            </span>
          </motion.h1>

          <motion.p {...fade(0.12)} className="mt-5 max-w-xl text-base text-white/75 sm:text-lg">
            {hero.subtitle}
          </motion.p>

          <motion.div {...fade(0.18)} className="mt-7 max-w-md">
            <a href={`tel:${phone}`} className="group relative flex items-center gap-4 rounded-2xl border border-white/15 bg-white/10 p-4 backdrop-blur transition hover:bg-white/15">
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
                <span className="block text-[11px] font-semibold uppercase tracking-wider text-white/60">{hero.callLabel}</span>
                <span className="block text-3xl font-extrabold leading-tight tracking-tight sm:text-[2.1rem]">{phoneVanity}</span>
                <span className="block text-xs text-white/55">{phoneDisplay} · {callResponse}</span>
              </span>
            </a>

            <div className="mt-3 flex flex-col gap-2.5 sm:flex-row">
              <a href={`tel:${phone}`} className="inline-flex flex-1 items-center justify-center gap-2 rounded-xl bg-brand-600 px-5 py-3.5 text-[15px] font-bold text-white shadow-[0_10px_30px_-10px_rgba(37,99,235,0.6)] transition hover:bg-brand-700 active:scale-[0.99]">
                <Icon name="phone" className="h-5 w-5" />
                Call Now
              </a>
              <a href="#airports" className="inline-flex flex-1 items-center justify-center gap-2 rounded-xl border border-white/20 bg-white/10 px-5 py-3.5 text-[15px] font-semibold text-white backdrop-blur transition hover:bg-white/15">
                <Icon name="map" className="h-5 w-5" />
                View Airports
              </a>
            </div>
          </motion.div>

          <motion.ul {...fade(0.24)} className="mt-7 flex flex-wrap gap-x-5 gap-y-2">
            {hero.badges.map((badge) => (
              <li key={badge} className="flex items-center gap-1.5 text-sm font-medium text-white/80">
                <Icon name="check" className="h-4 w-4 text-emerald-400" />
                {badge}
              </li>
            ))}
          </motion.ul>
        </div>

        {/* Right: airport search form */}
        <motion.div {...fade(0.18)} className="lg:col-span-6">
          <div className="rounded-2xl border border-slate-200 bg-white p-5 text-slate-900 shadow-2xl sm:p-6">
            <div className="flex items-center gap-2.5">
              <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-brand-50 text-brand-600">
                <Icon name="plane" className="h-5 w-5" />
              </span>
              <div>
                <h2 className="text-base font-bold leading-tight">Find your airport rate</h2>
                <p className="text-xs text-slate-500">We confirm your best all-in price by phone.</p>
              </div>
            </div>

            <form onSubmit={submitSearch} className="mt-4 space-y-3" noValidate>
              <Field label="Pickup airport" icon="plane" error={pickupMissing ? "Enter your pickup airport" : undefined}>
                <input
                  type="text"
                  list={listId}
                  value={pickupAirport}
                  onChange={(e) => setPickupAirport(e.target.value)}
                  placeholder="Airport or city (e.g. LAX)"
                  aria-invalid={pickupMissing}
                  className={`w-full rounded-xl border bg-white py-3 pl-9 pr-3 text-[15px] placeholder:text-slate-400 focus:ring-2 ${
                    pickupMissing ? "border-red-400 focus:border-red-500 focus:ring-red-200" : "border-slate-200 focus:border-brand-500 focus:ring-brand-200"
                  }`}
                />
              </Field>

              {differentDropoff ? (
                <Field label="Drop-off airport" icon="map">
                  <input
                    type="text"
                    list={listId}
                    value={dropoffAirport}
                    onChange={(e) => setDropoffAirport(e.target.value)}
                    placeholder="Drop-off airport or city"
                    className="w-full rounded-xl border border-slate-200 bg-white py-3 pl-9 pr-3 text-[15px] placeholder:text-slate-400 focus:border-brand-500 focus:ring-2 focus:ring-brand-200"
                  />
                </Field>
              ) : (
                <label className="flex cursor-pointer items-center gap-2 text-xs font-medium text-slate-600">
                  <input
                    type="checkbox"
                    checked={differentDropoff}
                    onChange={(e) => setDifferentDropoff(e.target.checked)}
                    className="h-4 w-4 rounded border-slate-300 text-brand-600 focus:ring-brand-200"
                  />
                  Return to a different airport
                </label>
              )}

              <datalist id={listId}>
                {airports.map((a) => (
                  <option key={a.iata} value={`${a.iata} — ${a.city}`} />
                ))}
              </datalist>

              <div className="grid grid-cols-2 gap-3">
                <Field label="Pickup date">
                  <input type="date" value={pickupDate} onChange={(e) => setPickupDate(e.target.value)} className={inputCls} />
                </Field>
                <Field label="Pickup time">
                  <input type="time" value={pickupTime} onChange={(e) => setPickupTime(e.target.value)} className={inputCls} />
                </Field>
                <Field label="Return date">
                  <input type="date" min={pickupDate || undefined} value={returnDate} onChange={(e) => setReturnDate(e.target.value)} className={inputCls} />
                </Field>
                <Field label="Return time">
                  <input type="time" value={returnTime} onChange={(e) => setReturnTime(e.target.value)} className={inputCls} />
                </Field>
              </div>

              <Field label="Driver age">
                <select value={age} onChange={(e) => setAge(e.target.value)} className={inputCls}>
                  {quote.driverAges.map((a) => (
                    <option key={a} value={a}>{a} years</option>
                  ))}
                </select>
              </Field>

              <button
                type="submit"
                className="mt-1 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-brand-600 px-6 py-3.5 text-base font-bold text-white shadow-[0_10px_30px_-10px_rgba(37,99,235,0.55)] transition hover:-translate-y-0.5 hover:bg-brand-700 active:translate-y-0"
              >
                <Icon name="phone" className="h-5 w-5" />
                Search &amp; Get My Rate
              </button>
            </form>

            <p className="mt-3 text-center text-xs text-slate-500">
              Prefer to talk now?{" "}
              <a href={`tel:${phone}`} className="font-bold text-brand-700 hover:underline">Call {phoneVanity}</a>
            </p>
          </div>
        </motion.div>
      </div>

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

const inputCls =
  "w-full rounded-xl border border-slate-200 bg-white px-3 py-3 text-[15px] text-slate-900 focus:border-brand-500 focus:ring-2 focus:ring-brand-200";

function Field({
  label,
  icon,
  error,
  children,
}: {
  label: string;
  icon?: Parameters<typeof Icon>[0]["name"];
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="mb-1 block text-xs font-semibold text-slate-600">{label}</span>
      <div className="relative">
        {icon ? (
          <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
            <Icon name={icon} className="h-4 w-4" />
          </span>
        ) : null}
        {children}
      </div>
      {error ? <span className="mt-1 block text-xs font-medium text-red-500">{error}</span> : null}
    </label>
  );
}
