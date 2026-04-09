"use client";

import { motion, type Variants } from "framer-motion";
import { siteConfig } from "@/config/siteConfig";

const easeOut = [0.22, 1, 0.36, 1] as const;

const containerVariants: Variants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.09, delayChildren: 0.05 },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 22 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: easeOut },
  },
};

export default function HowItWorks() {
  const { howItWorks, phone, phoneDisplay } = siteConfig;

  return (
    <section
      id="how-it-works"
      aria-labelledby="how-it-works-heading"
      className="bg-white py-16 sm:py-24"
    >
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "0px 0px -80px 0px" }}
          transition={{ duration: 0.55, ease: easeOut }}
          className="mx-auto mb-12 max-w-2xl text-center sm:mb-14"
        >
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-red-600">
            How it works
          </p>
          <h2
            id="how-it-works-heading"
            className="mt-3 text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl lg:text-[2.75rem]"
          >
            Book in four simple steps
          </h2>
          <p className="mt-4 text-base text-slate-600">
            We take reservations by phone. Here&apos;s exactly what happens
            when you call.
          </p>
        </motion.div>

        <motion.ol
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "0px 0px -60px 0px" }}
          className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6"
        >
          {howItWorks.map((step) => (
            <motion.li
              key={step.step}
              variants={itemVariants}
              className="relative flex flex-col rounded-2xl border border-slate-200 bg-white p-6 shadow-[0_1px_2px_rgba(16,24,40,0.04)] transition-shadow duration-300 hover:shadow-[0_20px_40px_-20px_rgba(16,24,40,0.25)]"
            >
              <span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-red-600">
                Step {step.step}
              </span>
              <h3 className="mt-2 text-lg font-bold text-slate-900 sm:text-xl">
                {step.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-600">
                {step.description}
              </p>
            </motion.li>
          ))}
        </motion.ol>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "0px 0px -40px 0px" }}
          transition={{ duration: 0.5, ease: easeOut }}
          className="mt-10 flex flex-col items-center gap-3 text-center sm:mt-12"
        >
          <p className="text-sm text-slate-600">
            No payment or deposit is taken over the phone. Payment is collected
            in person at pickup.
          </p>
          <a
            href={`tel:${phone}`}
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-red-600 px-6 py-3.5 text-sm font-bold text-white shadow-[0_10px_30px_-10px_rgba(220,38,38,0.6)] transition hover:bg-red-700"
          >
            <svg
              className="h-4 w-4"
              viewBox="0 0 24 24"
              fill="currentColor"
              aria-hidden="true"
            >
              <path d="M20.01 15.38c-1.23 0-2.42-.2-3.53-.56a.977.977 0 00-1.01.24l-1.57 1.97c-2.83-1.35-5.48-3.9-6.89-6.83l1.95-1.66c.27-.28.35-.67.24-1.02-.37-1.11-.56-2.3-.56-3.53 0-.54-.45-.99-.99-.99H4.19C3.65 3 3 3.24 3 3.99 3 13.28 10.73 21 20.01 21c.71 0 .99-.63.99-1.18v-3.45c0-.54-.45-.99-.99-.99z" />
            </svg>
            Call {phoneDisplay}
          </a>
        </motion.div>
      </div>
    </section>
  );
}
