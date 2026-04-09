"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { siteConfig } from "@/config/siteConfig";

const easeOut = [0.22, 1, 0.36, 1] as const;

export default function CallPopup() {
  const { phone, phoneDisplay, whatsappUrl, trust, city } = siteConfig;
  const [open, setOpen] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    if (dismissed) return;

    const timer = window.setTimeout(() => {
      setOpen(true);
    }, 6000);

    const onMouseOut = (e: MouseEvent) => {
      // Exit-intent: cursor leaving viewport from the top
      if (e.clientY <= 0 && !e.relatedTarget) {
        setOpen(true);
      }
    };

    document.addEventListener("mouseout", onMouseOut);

    return () => {
      window.clearTimeout(timer);
      document.removeEventListener("mouseout", onMouseOut);
    };
  }, [dismissed]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  const close = () => {
    setOpen(false);
    setDismissed(true);
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          role="dialog"
          aria-modal="true"
          aria-labelledby="callpopup-title"
          className="fixed inset-0 z-50 flex items-end justify-center bg-slate-950/70 px-4 pb-24 pt-8 backdrop-blur-md sm:items-center sm:pb-4"
          onClick={close}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          <motion.div
            onClick={(e) => e.stopPropagation()}
            className="relative isolate w-full max-w-md overflow-hidden rounded-3xl border border-white/10 bg-slate-950 p-6 text-white shadow-[0_40px_80px_-20px_rgba(0,0,0,0.6)] sm:p-8"
            initial={{ opacity: 0, y: 24, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.97 }}
            transition={{ duration: 0.35, ease: easeOut }}
          >
            {/* Warm accent glow (matches hero) */}
            <div
              aria-hidden
              className="pointer-events-none absolute -top-24 -right-16 h-72 w-72 rounded-full bg-[radial-gradient(circle_at_center,rgba(251,146,60,0.22),transparent_65%)] blur-3xl"
            />
            {/* Dark gradient base */}
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950"
            />

            {/* Close button */}
            <button
              type="button"
              onClick={close}
              aria-label="Close"
              className="absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white/60 backdrop-blur transition hover:bg-white/10 hover:text-white"
            >
              <svg
                className="h-4 w-4"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>

            {/* Status pill */}
            <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-3 py-1.5 text-[11px] font-semibold uppercase tracking-wider text-white backdrop-blur">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
              </span>
              Phone lines open · Live agents
            </div>

            {/* Headline */}
            <h3
              id="callpopup-title"
              className="mt-4 text-[1.65rem] font-extrabold leading-[1.1] tracking-tight sm:text-3xl"
            >
              Talk to a {city}{" "}
              <span className="bg-gradient-to-r from-red-400 to-orange-300 bg-clip-text text-transparent">
                rental expert
              </span>{" "}
              now
            </h3>
            <p className="mt-3 text-sm text-white/70 sm:text-[15px]">
              Speak with a US-based rental agent to check availability and
              receive a clear, all-in quote.
            </p>

            {/* CTA buttons */}
            <div className="mt-6 flex flex-col gap-3">
              <motion.div
                className="relative"
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
                  onClick={close}
                  className="group inline-flex w-full items-center justify-center gap-3 rounded-xl bg-red-600 px-5 py-4 text-base font-bold text-white shadow-[0_10px_30px_-10px_rgba(220,38,38,0.7)] ring-1 ring-inset ring-white/10 transition hover:-translate-y-0.5 hover:bg-red-500 hover:shadow-[0_20px_40px_-12px_rgba(220,38,38,0.8)] active:translate-y-0"
                >
                  <svg
                    className="h-5 w-5 transition-transform group-hover:rotate-[-8deg]"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path d="M20.01 15.38c-1.23 0-2.42-.2-3.53-.56a.977.977 0 00-1.01.24l-1.57 1.97c-2.83-1.35-5.48-3.9-6.89-6.83l1.95-1.66c.27-.28.35-.67.24-1.02-.37-1.11-.56-2.3-.56-3.53 0-.54-.45-.99-.99-.99H4.19C3.65 3 3 3.24 3 3.99 3 13.28 10.73 21 20.01 21c.71 0 .99-.63.99-1.18v-3.45c0-.54-.45-.99-.99-.99z" />
                  </svg>
                  <span className="whitespace-nowrap">
                    Call {phoneDisplay}
                  </span>
                </a>
              </motion.div>

              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={close}
                className="inline-flex w-full items-center justify-center gap-2.5 rounded-xl border border-white/15 bg-white/10 px-5 py-4 text-base font-semibold text-white backdrop-blur transition hover:-translate-y-0.5 hover:bg-white/15 active:translate-y-0"
              >
                <svg
                  className="h-5 w-5 text-emerald-400"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.296-.767.966-.94 1.164-.174.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 00-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347zM12.05 21.785h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884zm8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.881 11.881 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
                WhatsApp Us
              </a>
            </div>

            {/* Trust footer */}
            <div className="mt-5 flex items-center justify-center gap-2 border-t border-white/10 pt-4 text-[11px] font-medium text-white/60">
              <span className="text-yellow-400">★ {trust.rating}</span>
              <span className="text-white/25">·</span>
              <span>{trust.highlights.join(" · ")}</span>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
