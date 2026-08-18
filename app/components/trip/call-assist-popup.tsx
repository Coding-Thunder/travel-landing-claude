"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import * as Dialog from "@radix-ui/react-dialog";
import { Phone, X } from "lucide-react";
import { site, telHref } from "@/config/site";
import { useSupportStatus } from "@/lib/use-support-status";
import { Button } from "@/components/ui/button";

const DISMISS_KEY = "fb:call-assist-dismissed";
/** Once dismissed, stay dismissed for 30 days. */
const DISMISS_DAYS = 30;
/** Dwell before offering help. Long enough not to interrupt a scan. */
const DWELL_MS = 45_000;

/** Pages that already are the support flow. Never interrupt those. */
const EXCLUDED = ["/contact", "/callback", "/thank-you"];

function alreadyDismissed(): boolean {
  try {
    const raw = window.localStorage.getItem(DISMISS_KEY);
    if (!raw) return false;
    return Date.now() - Number(raw) < DISMISS_DAYS * 24 * 60 * 60 * 1000;
  } catch {
    return false;
  }
}

/**
 * Behaviour triggered assistance offer.
 *
 * Opens at most once, after a long dwell or an exit intent gesture, and never
 * again for 30 days once dismissed. Continue online is always available, and
 * outside support hours it says so plainly rather than implying someone is
 * waiting.
 *
 * Other components can request it with
 * `window.dispatchEvent(new Event("flightbizz:need-help"))`.
 */
export default function CallAssistPopup() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const status = useSupportStatus();

  const dismiss = useCallback(() => {
    setOpen(false);
    try {
      window.localStorage.setItem(DISMISS_KEY, String(Date.now()));
    } catch {
      /* storage unavailable, the once per session guard still applies */
    }
  }, []);

  useEffect(() => {
    if (EXCLUDED.includes(pathname)) return;
    if (alreadyDismissed()) return;

    let fired = false;
    const show = () => {
      if (fired) return;
      fired = true;
      setOpen(true);
    };

    const dwell = window.setTimeout(show, DWELL_MS);

    // Exit intent: pointer leaving through the top of the viewport. Desktop
    // only, since the gesture does not exist on touch devices.
    const onMouseOut = (e: MouseEvent) => {
      if (!e.relatedTarget && e.clientY <= 0) show();
    };
    const fine = window.matchMedia("(pointer: fine)").matches;
    if (fine) document.addEventListener("mouseout", onMouseOut);
    window.addEventListener("flightbizz:need-help", show);

    return () => {
      window.clearTimeout(dwell);
      document.removeEventListener("mouseout", onMouseOut);
      window.removeEventListener("flightbizz:need-help", show);
    };
  }, [pathname]);

  const closed = status?.open === false;
  const canCall = site.contact.hasPhone && !closed;

  return (
    <Dialog.Root open={open} onOpenChange={(next) => (next ? setOpen(true) : dismiss())}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-50 bg-foreground/40 data-[state=open]:animate-in data-[state=open]:fade-in-0" />
        <Dialog.Content className="fixed left-1/2 top-1/2 z-50 w-[calc(100vw-2rem)] max-w-sm -translate-x-1/2 -translate-y-1/2 rounded-lg border bg-card p-6 shadow-lg data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95">
          <Dialog.Close
            className="absolute right-3 top-3 rounded-md p-1.5 text-muted-foreground transition-colors hover:bg-accent hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            aria-label="Close"
          >
            <X className="h-4 w-4" aria-hidden />
          </Dialog.Close>

          <Dialog.Title className="pr-8 text-base font-semibold">
            {closed ? "Our support team is currently unavailable" : "Need help with your trip?"}
          </Dialog.Title>

          <Dialog.Description className="mt-2 text-sm leading-relaxed text-muted-foreground">
            {closed ? (
              <>
                You have reached us outside our support hours
                {status?.nextOpen ? `. We are back ${status.nextOpen}` : ""}. Request a callback and a {site.name}{" "}
                travel specialist will pick it up when we reopen.
              </>
            ) : (
              <>
                Our team can talk through your options, check what is available for your dates and explain the
                conditions before anything is booked.
              </>
            )}
          </Dialog.Description>

          <div className="mt-5 flex flex-col gap-2">
            {canCall ? (
              <Button asChild onClick={dismiss}>
                <a href={telHref}>
                  <Phone aria-hidden />
                  Call now
                </a>
              </Button>
            ) : (
              <Button asChild onClick={dismiss}>
                <Link href="/callback">{site.cta.callback}</Link>
              </Button>
            )}
            <Button variant="ghost" onClick={dismiss}>
              Continue online
            </Button>
          </div>

          <p className="mt-4 text-xs leading-relaxed text-muted-foreground">
            {`Support hours, ${site.hoursLabel}: `}
            {site.hours.map((h) => `${h.day} ${h.time}`).join(". ")}
          </p>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
