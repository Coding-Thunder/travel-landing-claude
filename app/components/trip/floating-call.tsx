"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Phone } from "lucide-react";
import { site, telHref } from "@/config/site";
import { useSupportStatus } from "@/lib/use-support-status";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/cn";

/**
 * Persistent support control.
 *
 * Retracts once the footer scrolls into view so it never covers footer links,
 * and routes to the callback request when no number is configured or the desk
 * is closed, rather than dialling a number nobody will answer.
 *
 * `invisible` is load-bearing: opacity alone would leave the control clickable
 * and in the tab order while hidden.
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

  const canCall = site.contact.hasPhone && status?.open !== false;

  return (
    <div
      aria-hidden={!visible}
      className={cn(
        "pointer-events-none fixed bottom-4 right-4 z-40 transition-all duration-200 sm:bottom-6 sm:right-6",
        visible ? "translate-y-0 opacity-100" : "invisible translate-y-2 opacity-0"
      )}
      style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
    >
      <Button asChild size="sm" className="pointer-events-auto shadow-lg">
        {canCall ? (
          <a href={telHref} aria-label={`${site.cta.help}, ${site.company.phone}`}>
            <Phone aria-hidden />
            <span className="sm:hidden">{site.cta.mobileCall}</span>
            <span className="hidden sm:inline">{site.cta.help}</span>
          </a>
        ) : (
          <Link href="/callback" aria-label={site.cta.callback}>
            <Phone aria-hidden />
            <span className="sm:hidden">Callback</span>
            <span className="hidden sm:inline">{site.cta.callback}</span>
          </Link>
        )}
      </Button>
    </div>
  );
}
