"use client";

import { motion, useReducedMotion } from "framer-motion";
import { siteConfig } from "@/config/siteConfig";
import { useCall } from "./CallProvider";
import Icon from "../ui/Icon";

export default function StickyCallBar() {
  const { phone, phoneVanity, phoneDisplay, callResponse } = siteConfig;
  const { open } = useCall();
  const reduce = useReducedMotion();

  const enter = reduce
    ? {}
    : {
        initial: { opacity: 0, y: 30 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] as const, delay: 0.8 },
      };

  return (
    <>
      {/* ---------------- Mobile: sticky bottom bar ---------------- */}
      <motion.div
        {...enter}
        className="fixed inset-x-0 bottom-0 z-40 border-t border-slate-200 bg-white/95 px-3 py-2.5 shadow-[0_-8px_30px_rgba(15,23,42,0.12)] backdrop-blur-md sm:hidden"
        style={{ paddingBottom: "max(0.625rem, env(safe-area-inset-bottom))" }}
      >
        <div className="flex items-center gap-2.5">
          <a
            href={`tel:${phone}`}
            className="flex flex-[1.3] items-center justify-center gap-2 rounded-xl bg-brand-600 px-4 py-3 text-[15px] font-extrabold text-white shadow-[0_8px_24px_-8px_rgba(37,99,235,0.6)] active:scale-[0.98]"
            aria-label={`Call ${phoneVanity}`}
          >
            <Icon name="phone" className="h-5 w-5" />
            Call Now
          </a>
          <button
            type="button"
            onClick={() => open({ source: "sticky-mobile-quote" })}
            className="flex flex-1 items-center justify-center gap-1.5 rounded-xl bg-slate-900 px-4 py-3 text-[15px] font-bold text-white active:scale-[0.98]"
          >
            <Icon name="bolt" className="h-4 w-4" />
            Instant Quote
          </button>
        </div>
      </motion.div>

      {/* ---------------- Desktop: floating call widget ---------------- */}
      <motion.div
        {...enter}
        className="fixed bottom-6 right-6 z-40 hidden w-72 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-[0_20px_50px_-20px_rgba(15,23,42,0.4)] sm:block"
      >
        <div className="flex items-center gap-2 bg-gradient-to-r from-brand-700 to-brand-600 px-4 py-2.5 text-white">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-300 opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-300" />
          </span>
          <span className="text-[11px] font-semibold uppercase tracking-wider">Lines open · 24/7</span>
        </div>
        <div className="p-4">
          <p className="text-[11px] font-semibold uppercase tracking-wider text-slate-500">
            24/7 reservations
          </p>
          <a
            href={`tel:${phone}`}
            className="mt-0.5 block text-2xl font-extrabold tracking-tight text-slate-900 hover:text-brand-700"
          >
            {phoneVanity}
          </a>
          <p className="text-xs text-slate-500">
            {phoneDisplay} · {callResponse}
          </p>
          <a
            href={`tel:${phone}`}
            className="mt-3 flex w-full items-center justify-center gap-2 rounded-xl bg-brand-600 px-4 py-2.5 text-sm font-bold text-white transition hover:bg-brand-700"
          >
            <Icon name="phone" className="h-4 w-4" />
            Call Now
          </a>
          <button
            type="button"
            onClick={() => open({ source: "floating-quote" })}
            className="mt-2 flex w-full items-center justify-center gap-1.5 rounded-xl border border-slate-200 px-4 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
          >
            <Icon name="bolt" className="h-4 w-4 text-brand-600" />
            Get Instant Quote
          </button>
        </div>
      </motion.div>
    </>
  );
}
