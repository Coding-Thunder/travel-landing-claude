"use client";

import { useEffect, useState } from "react";
import { siteConfig } from "@/config/siteConfig";
import { cn } from "@/lib/cn";
import { Button } from "@/components/ui/button";
import Icon from "../ui/Icon";
import { useCall } from "./CallProvider";

/**
 * The persistent call surface.
 *
 * Mobile gets a fixed bottom bar, because a thumb-reachable tel: link is the
 * single highest-value control on a phone-first site. Desktop gets a compact
 * floating control instead of a panel, so it never competes with the page.
 *
 * Both retract once the footer is in view so they cannot cover footer links,
 * and `invisible` is load-bearing: opacity alone would leave them clickable and
 * in the tab order while hidden.
 *
 * The entrance is a CSS animation. This used to be a framer-motion component,
 * which put an animation runtime in the critical path of every route for two
 * transitions.
 */
export default function StickyCallBar() {
  const { phone, phoneVanity, phoneDisplay, callResponse } = siteConfig;
  const { open } = useCall();
  const [visible, setVisible] = useState(true);

  // The desktop control waits for real engagement before appearing, so it does
  // not cover page content from the moment the page loads. The mobile bar is
  // the primary conversion surface and shows immediately.
  const [engaged, setEngaged] = useState(false);

  useEffect(() => {
    const onScroll = () => setEngaged(window.scrollY > 320);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const footer = document.querySelector("footer");
    if (!footer) return;
    const io = new IntersectionObserver(
      ([entry]) => setVisible(!entry.isIntersecting),
      { rootMargin: "0px 0px -40px 0px" }
    );
    io.observe(footer);
    return () => io.disconnect();
  }, []);

  return (
    <>
      {/* Mobile: fixed bottom bar. */}
      <div
        aria-hidden={!visible}
        className={cn(
          "fixed inset-x-0 bottom-0 z-40 border-t bg-background/95 px-3 py-2.5 backdrop-blur transition-all duration-200 sm:hidden",
          visible ? "translate-y-0 opacity-100" : "invisible translate-y-full opacity-0"
        )}
        style={{ paddingBottom: "max(0.625rem, env(safe-area-inset-bottom))" }}
      >
        <div className="flex items-center gap-2.5">
          <Button asChild size="lg" className="flex-[1.4]" data-cta="sticky-mobile-call">
            <a href={`tel:${phone}`} aria-label={`Call ${phoneVanity}`}>
              <Icon name="phone" />
              Call Now
            </a>
          </Button>
          <Button
            variant="outline"
            size="lg"
            className="flex-1"
            onClick={() => open({ source: "sticky-mobile-quote" })}
          >
            <Icon name="headset" />
            Callback
          </Button>
        </div>
      </div>

      {/* Desktop: compact floating control. */}
      <div
        aria-hidden={!(visible && engaged)}
        className={cn(
          "fixed bottom-6 right-6 z-40 hidden w-64 overflow-hidden rounded-lg border bg-card shadow-lg transition-all duration-200 sm:block",
          visible && engaged ? "translate-y-0 opacity-100" : "invisible translate-y-2 opacity-0"
        )}
      >
        <div className="p-4">
          <p className="text-xs font-medium text-muted-foreground">Reservations · {siteConfig.hours}</p>
          <a
            href={`tel:${phone}`}
            data-cta="floating-call-number"
            className="mt-0.5 block text-xl font-semibold tracking-tight transition-colors hover:text-primary"
          >
            {phoneVanity}
          </a>
          <p className="mt-0.5 text-xs text-muted-foreground">
            {phoneDisplay} · {callResponse}
          </p>
          <Button asChild className="mt-3 w-full" data-cta="floating-call">
            <a href={`tel:${phone}`}>
              <Icon name="phone" />
              Call Now
            </a>
          </Button>
          <Button
            variant="ghost"
            className="mt-1.5 w-full"
            onClick={() => open({ source: "floating-quote" })}
          >
            Request a callback
          </Button>
        </div>
      </div>
    </>
  );
}
