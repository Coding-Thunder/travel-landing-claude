"use client";

import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { siteConfig } from "@/config/siteConfig";
import { Section, SectionHeading } from "./ui/Section";
import Icon from "./ui/Icon";
import CtaButton from "./call/CtaButton";

export default function FAQ() {
  const { faqs, phone, phoneVanity } = siteConfig;
  const [openIdx, setOpenIdx] = useState<number | null>(0);
  const reduce = useReducedMotion();

  return (
    <Section id="faq" tone="white">
      <SectionHeading
        eyebrow="FAQ"
        title="Questions? We've got answers"
        subtitle="Still unsure about something? Our agents are one quick call away, 24/7."
      />

      <div className="mx-auto mt-12 max-w-3xl">
        <dl className="divide-y divide-slate-200 overflow-hidden rounded-2xl border border-slate-200 bg-white">
          {faqs.map((item, i) => {
            const isOpen = openIdx === i;
            return (
              <div key={item.q} className="bg-white">
                <dt>
                  <button
                    type="button"
                    onClick={() => setOpenIdx(isOpen ? null : i)}
                    aria-expanded={isOpen}
                    className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left transition hover:bg-slate-50 sm:px-6"
                  >
                    <span className="text-[15px] font-bold text-slate-900 sm:text-base">{item.q}</span>
                    <span
                      className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full border transition ${
                        isOpen ? "border-brand-600 bg-brand-600 text-white" : "border-slate-300 text-slate-500"
                      }`}
                    >
                      <svg
                        className={`h-4 w-4 transition-transform duration-300 ${isOpen ? "rotate-45" : ""}`}
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.4"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 5v14M5 12h14" />
                      </svg>
                    </span>
                  </button>
                </dt>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.dd
                      initial={reduce ? undefined : { height: 0, opacity: 0 }}
                      animate={reduce ? undefined : { height: "auto", opacity: 1 }}
                      exit={reduce ? undefined : { height: 0, opacity: 0 }}
                      transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
                      className="overflow-hidden"
                    >
                      <p className="px-5 pb-5 text-sm leading-relaxed text-slate-600 sm:px-6">{item.a}</p>
                    </motion.dd>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </dl>

        <div className="mt-6 flex flex-col items-center justify-center gap-3 rounded-2xl bg-slate-50 p-5 text-center sm:flex-row sm:text-left">
          <p className="text-sm font-semibold text-slate-700">Can&apos;t find your answer?</p>
          <div className="flex flex-col gap-2 sm:flex-row">
            <a
              href={`tel:${phone}`}
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-brand-600 px-5 py-2.5 text-sm font-bold text-white transition hover:bg-brand-700"
            >
              <Icon name="phone" className="h-4 w-4" />
              Call {phoneVanity}
            </a>
            <CtaButton source="faq-callback" variant="secondary" size="sm">
              Request a callback
            </CtaButton>
          </div>
        </div>
      </div>
    </Section>
  );
}
