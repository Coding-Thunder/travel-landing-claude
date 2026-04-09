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

function Stars({ count }: { count: number }) {
  return (
    <div className="flex items-center gap-0.5 text-yellow-500" aria-label={`${count} out of 5 stars`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <svg
          key={i}
          className={`h-4 w-4 ${i < count ? "text-yellow-500" : "text-slate-200"}`}
          viewBox="0 0 20 20"
          fill="currentColor"
          aria-hidden="true"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.957a1 1 0 00.95.69h4.162c.969 0 1.371 1.24.588 1.81l-3.37 2.447a1 1 0 00-.364 1.118l1.287 3.957c.3.921-.755 1.688-1.54 1.118l-3.37-2.447a1 1 0 00-1.175 0l-3.37 2.447c-.784.57-1.838-.197-1.539-1.118l1.287-3.957a1 1 0 00-.364-1.118L2.05 9.384c-.783-.57-.38-1.81.588-1.81h4.163a1 1 0 00.95-.69l1.287-3.957z" />
        </svg>
      ))}
    </div>
  );
}

export default function Testimonials() {
  const { testimonials, trust } = siteConfig;

  return (
    <section
      id="testimonials"
      aria-labelledby="testimonials-heading"
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
            Customer feedback
          </p>
          <h2
            id="testimonials-heading"
            className="mt-3 text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl lg:text-[2.75rem]"
          >
            What recent customers are saying
          </h2>
          <p className="mt-4 text-base text-slate-600">
            Feedback collected from recent phone bookings. Names shortened for
            privacy.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "0px 0px -60px 0px" }}
          className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6"
        >
          {testimonials.map((t) => (
            <motion.figure
              key={t.name}
              variants={itemVariants}
              className="flex flex-col rounded-2xl border border-slate-200 bg-white p-6 shadow-[0_1px_2px_rgba(16,24,40,0.04)] sm:p-7"
            >
              <Stars count={t.rating} />
              <blockquote className="mt-4 flex-1 text-[15px] leading-relaxed text-slate-700">
                &ldquo;{t.text}&rdquo;
              </blockquote>
              <figcaption className="mt-5 border-t border-slate-100 pt-4 text-sm">
                <span className="font-semibold text-slate-900">{t.name}</span>
                <span className="text-slate-500"> · {t.location}</span>
              </figcaption>
            </motion.figure>
          ))}
        </motion.div>

        <p className="mt-8 text-center text-xs text-slate-500">
          Current overall customer rating: {trust.rating} / 5. {trust.ratingNote}
        </p>
      </div>
    </section>
  );
}
