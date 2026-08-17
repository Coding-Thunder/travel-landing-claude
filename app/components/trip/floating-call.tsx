"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Phone, PhoneOff } from "lucide-react";
import { site, telHref } from "@/config/site";
import { useSupportStatus } from "@/lib/use-support-status";
import { cn } from "@/lib/cn";

/**
 * Persistent support affordance (§16).
 *
 * Desktop shows the full "Need Help? Call Us" pill, mobile a compact call
 * button that opens the device dialer. It retracts once the footer scrolls into
 * view so it never sits on top of the footer's links, and when no support
 * number is configured — or the desk is closed — it routes to the callback
 * request instead of dialling a number that will not be answered.
 */
export default function FloatingCall() {
  const [visible, setVisible] = useState(false);
  const status = useSupportStatus();

  useEffect(() => {
    const footer = document.querySelector("footer");
    const onScroll = () => {
      const scrolledEnough = window.scrollY > 320;
      const footerTop = footer?.getBoundingClientRect().top ?? Infinity;
      setVisible(scrolledEnough && footerTop > window.innerHeight);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  // Until the client has resolved the support hours, assume the phone route so
  // the control never flickers between two different destinations.
  const canCall = site.contact.hasPhone && status?.open !== false;

  const shared =
    "pointer-events-auto flex items-center gap-2.5 rounded-full px-5 py-3.5 text-sm font-semibold shadow-lg shadow-navy-900/25 transition hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-royal-300 focus-visible:ring-offset-2";

  return (
    <div
      className={cn(
        "pointer-events-none fixed bottom-5 right-4 z-40 transition-all duration-300 sm:bottom-7 sm:right-7",
        visible ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-4 opacity-0"
      )}
      style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
    >
      {canCall ? (
        <a
          href={telHref}
          className={cn(shared, "bg-royal-600 text-white hover:bg-royal-700")}
          aria-label={`${site.cta.help} — ${site.company.phone}`}
        >
          <Phone className="h-[18px] w-[18px]" />
          <span className="sm:hidden">{site.cta.mobileCall}</span>
          <span className="hidden sm:inline">{site.cta.help}</span>
        </a>
      ) : (
        <Link
          href="/callback"
          className={cn(shared, "bg-navy-900 text-white hover:bg-navy-800")}
          aria-label={site.cta.callback}
        >
          <PhoneOff className="h-[18px] w-[18px]" />
          <span className="sm:hidden">Callback</span>
          <span className="hidden sm:inline">{site.cta.callback}</span>
        </Link>
      )}
    </div>
  );
}
