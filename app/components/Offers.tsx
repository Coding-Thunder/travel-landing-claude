"use client";

import { motion, type Variants } from "framer-motion";
import { siteConfig } from "@/config/siteConfig";

const easeOut = [0.22, 1, 0.36, 1] as const;

const containerVariants: Variants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.1, delayChildren: 0.05 },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: easeOut },
  },
};

export default function Offers() {
  const { offers, phone, phoneDisplay, city } = siteConfig;

  return (
    <section className="bg-slate-50 py-16 sm:py-24">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "0px 0px -80px 0px" }}
          transition={{ duration: 0.55, ease: easeOut }}
          className="mx-auto mb-12 max-w-2xl text-center sm:mb-14"
        >
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-red-600">
            Today&apos;s {city} Deals
          </p>
          <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl lg:text-[2.75rem]">
            Limited-time offers, phone only
          </h2>
          <p className="mt-4 text-base text-slate-600">
            These rates aren&apos;t listed online. Call{" "}
            <a
              href={`tel:${phone}`}
              className="font-semibold text-slate-900 underline-offset-4 hover:underline"
            >
              {phoneDisplay}
            </a>{" "}
            to lock them in before they&apos;re gone.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "0px 0px -60px 0px" }}
          className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6"
        >
          {offers.map((offer, idx) => (
            <motion.div
              key={offer.title}
              variants={itemVariants}
              whileHover={{ y: -4 }}
              transition={{ duration: 0.25, ease: easeOut }}
              className="group relative flex flex-col rounded-2xl border border-slate-200 bg-white p-6 shadow-[0_1px_2px_rgba(16,24,40,0.04)] transition-shadow duration-300 hover:border-slate-300 hover:shadow-[0_20px_40px_-20px_rgba(16,24,40,0.25)] sm:p-7"
            >
              <span
                className={`absolute -top-3 left-6 rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-wider shadow-sm ${
                  idx === 0
                    ? "bg-red-600 text-white"
                    : "bg-slate-900 text-white"
                }`}
              >
                {offer.tag}
              </span>

              <div className="mb-5 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-slate-900 text-white">
                <svg
                  className="h-6 w-6"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>

              <h3 className="text-lg font-bold text-slate-900 sm:text-xl">
                {offer.title}
              </h3>
              <p className="mt-2 flex-1 text-sm leading-relaxed text-slate-600">
                {offer.description}
              </p>

              <a
                href={`tel:${phone}`}
                className="mt-6 inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-bold text-slate-900 transition hover:border-red-600 hover:bg-red-600 hover:text-white"
              >
                Call to Claim
                <svg
                  className="h-4 w-4"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </a>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
