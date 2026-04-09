"use client";

import { motion } from "framer-motion";
import { siteConfig } from "@/config/siteConfig";

export default function StickyCTA() {
  const { phone, phoneDisplay, whatsappUrl } = siteConfig;

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1], delay: 1.2 }}
      className="fixed inset-x-0 bottom-0 z-40 border-t border-slate-200 bg-white/95 px-4 py-3 shadow-[0_-8px_30px_rgba(16,24,40,0.12)] backdrop-blur-md sm:px-6"
      style={{ paddingBottom: "max(0.75rem, env(safe-area-inset-bottom))" }}
    >
      <div className="mx-auto flex max-w-6xl items-center gap-3 sm:gap-5">
        <div className="hidden min-w-0 flex-1 sm:block">
          <p className="text-[11px] font-semibold uppercase tracking-wider text-slate-500">
            Talk to a {siteConfig.city} rental expert
          </p>
          <p className="truncate text-base font-bold text-slate-900">
            Call {phoneDisplay}
            <span className="ml-2 font-medium text-slate-500">
              · instant availability
            </span>
          </p>
        </div>

        <a
          href={`tel:${phone}`}
          className="group flex flex-1 items-center justify-center gap-2 rounded-xl bg-red-600 px-5 py-3.5 text-[15px] font-extrabold text-white shadow-[0_8px_24px_-8px_rgba(220,38,38,0.6)] ring-1 ring-inset ring-white/10 transition hover:bg-red-500 active:scale-[0.98] sm:flex-none sm:px-7"
        >
          <svg
            className="h-5 w-5 transition-transform group-hover:rotate-[-8deg]"
            viewBox="0 0 24 24"
            fill="currentColor"
          >
            <path d="M20.01 15.38c-1.23 0-2.42-.2-3.53-.56a.977.977 0 00-1.01.24l-1.57 1.97c-2.83-1.35-5.48-3.9-6.89-6.83l1.95-1.66c.27-.28.35-.67.24-1.02-.37-1.11-.56-2.3-.56-3.53 0-.54-.45-.99-.99-.99H4.19C3.65 3 3 3.24 3 3.99 3 13.28 10.73 21 20.01 21c.71 0 .99-.63.99-1.18v-3.45c0-.54-.45-.99-.99-.99z" />
          </svg>
          Call Now
        </a>

        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="WhatsApp us"
          className="flex h-[50px] w-[50px] shrink-0 items-center justify-center rounded-xl bg-emerald-500 text-white shadow-[0_8px_24px_-8px_rgba(34,197,94,0.6)] transition hover:bg-emerald-600 active:scale-[0.98] sm:h-[52px] sm:w-[52px]"
        >
          <svg className="h-6 w-6" viewBox="0 0 24 24" fill="currentColor">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.296-.767.966-.94 1.164-.174.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 00-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347zM12.05 21.785h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884zm8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.881 11.881 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
          </svg>
        </a>
      </div>
    </motion.div>
  );
}
