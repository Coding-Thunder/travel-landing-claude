"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { siteConfig } from "@/config/siteConfig";

const STORAGE_KEY = "mcr-cookie-ack-v1";

export default function CookieNotice() {
  const [visible, setVisible] = useState(false);
  const { cookieNotice } = siteConfig;

  useEffect(() => {
    try {
      const acknowledged = window.localStorage.getItem(STORAGE_KEY);
      if (!acknowledged) {
        // Small delay so it doesn't collide with the hero entrance animation
        const t = window.setTimeout(() => setVisible(true), 800);
        return () => window.clearTimeout(t);
      }
    } catch {
      setVisible(true);
    }
  }, []);

  const dismiss = () => {
    try {
      window.localStorage.setItem(STORAGE_KEY, "1");
    } catch {
      // ignore
    }
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div
      role="region"
      aria-label="Cookie notice"
      className="fixed inset-x-3 bottom-[108px] z-[45] mx-auto max-w-xl rounded-2xl border border-slate-200 bg-white/98 p-4 shadow-[0_20px_50px_-20px_rgba(15,23,42,0.35)] backdrop-blur sm:inset-x-auto sm:left-5 sm:right-auto sm:bottom-[112px] sm:p-5"
      style={{
        paddingBottom: "max(1rem, env(safe-area-inset-bottom))",
      }}
    >
      <div className="flex items-start gap-3">
        <div className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-lg bg-slate-900 text-white">
          <svg
            className="h-4 w-4"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 2a10 10 0 10 10 10 4 4 0 01-5-5 4 4 0 01-5-5zM8 14h.01M14 16h.01M16 11h.01"
            />
          </svg>
        </div>
        <div className="flex-1 text-[13px] leading-relaxed text-slate-700">
          <p>
            {cookieNotice.message.replace(" See our Privacy Policy for details.", "")}{" "}
            See our{" "}
            <Link
              href="/privacy-policy"
              className="font-semibold text-red-600 underline-offset-4 hover:underline"
            >
              {cookieNotice.learnMore}
            </Link>{" "}
            for details.
          </p>
          <div className="mt-3 flex flex-wrap gap-2">
            <button
              type="button"
              onClick={dismiss}
              className="inline-flex items-center justify-center rounded-lg bg-slate-900 px-4 py-2 text-xs font-bold text-white transition hover:bg-slate-800"
            >
              {cookieNotice.accept}
            </button>
            <Link
              href="/privacy-policy"
              className="inline-flex items-center justify-center rounded-lg border border-slate-200 bg-white px-4 py-2 text-xs font-semibold text-slate-700 transition hover:bg-slate-50"
            >
              {cookieNotice.learnMore}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
