"use client";

import { motion, type Variants } from "framer-motion";
import { siteConfig } from "@/config/siteConfig";

const easeOut = [0.22, 1, 0.36, 1] as const;

const containerVariants: Variants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.08, delayChildren: 0.05 },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: easeOut },
  },
};

const icons = [
  // Shield
  <svg
    key="shield"
    className="h-5 w-5"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
    />
  </svg>,
  // Clock
  <svg
    key="clock"
    className="h-5 w-5"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
    />
  </svg>,
  // Sparkle
  <svg
    key="sparkle"
    className="h-5 w-5"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
  >
    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
  </svg>,
  // Bolt
  <svg
    key="bolt"
    className="h-5 w-5"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M13 10V3L4 14h7v7l9-11h-7z"
    />
  </svg>,
];

export default function WhyChooseUs() {
  const { whyChooseUs, city } = siteConfig;

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
            Why Choose Us
          </p>
          <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl lg:text-[2.75rem]">
            Thousands of {city} drivers trust us
          </h2>
          <p className="mt-4 text-base text-slate-600">
            No gimmicks. No surprises. Just a fast, honest rental experience.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "0px 0px -60px 0px" }}
          className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:gap-5"
        >
          {whyChooseUs.map((r, idx) => (
            <motion.div
              key={r.title}
              variants={itemVariants}
              whileHover={{ y: -4 }}
              transition={{ duration: 0.25, ease: easeOut }}
              className="group flex flex-col rounded-2xl border border-slate-200 bg-white p-6 transition-shadow duration-300 hover:border-slate-300 hover:shadow-[0_20px_40px_-20px_rgba(16,24,40,0.25)]"
            >
              <div className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-slate-900 text-white">
                {icons[idx % icons.length]}
              </div>
              <h3 className="mt-5 text-base font-bold text-slate-900 sm:text-lg">
                {r.title}
              </h3>
              <p className="mt-1.5 text-sm leading-relaxed text-slate-600">
                {r.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
