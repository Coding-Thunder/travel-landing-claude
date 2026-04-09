"use client";

import Image from "next/image";
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

export default function CarPreview() {
  const { cars, phone } = siteConfig;

  return (
    <section className="bg-white py-16 sm:py-24">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "0px 0px -80px 0px" }}
          transition={{ duration: 0.55, ease: easeOut }}
          className="mb-12 flex flex-col gap-3 sm:mb-14 sm:flex-row sm:items-end sm:justify-between"
        >
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-red-600">
              Available Today
            </p>
            <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl lg:text-[2.75rem]">
              Ready to drive off
            </h2>
          </div>
          <p className="text-sm text-slate-600 sm:max-w-xs sm:text-right">
            Inventory moves fast in {siteConfig.city}. Call to confirm availability
            and lock in your rate.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "0px 0px -60px 0px" }}
          className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6"
        >
          {cars.map((car) => (
            <motion.div
              key={car.name}
              variants={itemVariants}
              whileHover={{ y: -4 }}
              transition={{ duration: 0.25, ease: easeOut }}
              className="group flex flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-[0_1px_2px_rgba(16,24,40,0.04)] transition-shadow duration-300 hover:border-slate-300 hover:shadow-[0_24px_50px_-20px_rgba(16,24,40,0.3)]"
            >
              <div className="relative aspect-[16/10] w-full overflow-hidden bg-slate-100">
                <Image
                  src={car.image}
                  alt={`${car.type} rental car — ${car.name}`}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover transition duration-500 group-hover:scale-105"
                />
                <span className="absolute left-4 top-4 rounded-full bg-white/95 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-slate-900 shadow-sm backdrop-blur">
                  {car.tag}
                </span>
              </div>

              <div className="flex flex-1 flex-col p-5 sm:p-6">
                <p className="text-[11px] font-semibold uppercase tracking-wider text-slate-500">
                  {car.type}
                </p>
                <h3 className="mt-1 text-xl font-bold text-slate-900">
                  {car.name}
                </h3>
                <p className="mt-1 text-sm text-slate-500">{car.specs}</p>

                <div className="mt-5 flex items-end justify-between">
                  <div className="flex items-baseline gap-1">
                    <span className="text-3xl font-extrabold tracking-tight text-slate-900">
                      ${car.price}
                    </span>
                    <span className="text-sm font-medium text-slate-500">
                      /day
                    </span>
                  </div>
                </div>

                <a
                  href={`tel:${phone}`}
                  className="mt-5 inline-flex items-center justify-center gap-2 rounded-xl bg-slate-900 px-4 py-3.5 text-sm font-bold text-white transition hover:bg-red-600"
                >
                  <svg
                    className="h-4 w-4"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M20.01 15.38c-1.23 0-2.42-.2-3.53-.56a.977.977 0 00-1.01.24l-1.57 1.97c-2.83-1.35-5.48-3.9-6.89-6.83l1.95-1.66c.27-.28.35-.67.24-1.02-.37-1.11-.56-2.3-.56-3.53 0-.54-.45-.99-.99-.99H4.19C3.65 3 3 3.24 3 3.99 3 13.28 10.73 21 20.01 21c.71 0 .99-.63.99-1.18v-3.45c0-.54-.45-.99-.99-.99z" />
                  </svg>
                  Call to Reserve
                </a>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
