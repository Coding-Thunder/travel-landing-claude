"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import * as Dialog from "@radix-ui/react-dialog";
import { Phone, PhoneOutgoing, Mail, X } from "lucide-react";
import { site, telHref } from "@/config/site";
import { useSupportStatus } from "@/lib/use-support-status";

const DISMISS_KEY = "fb:call-assist-dismissed";
/** Once dismissed, stay dismissed for 30 days. */
const DISMISS_DAYS = 30;
/** Dwell before offering help, in ms. Long enough not to interrupt a scan. */
const DWELL_MS = 45_000;

/** Pages that already are the support flow — never interrupt those. */
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
 * Behaviour-triggered assistance offer (§15).
 *
 * Opens at most once, after a long dwell or an exit-intent gesture, and never
 * again for 30 days once the visitor closes it. "Continue Online" is always
 * available — calling is an option, never a requirement — and outside support
 * hours it says so plainly rather than implying someone is waiting (§18).
 *
 * Other components can request it explicitly by dispatching
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
      /* storage unavailable — the once-per-session guard below still applies */
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

    // Exit intent — pointer leaving through the top of the viewport. Desktop
    // only: on touch devices the same gesture does not exist.
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
        <Dialog.Overlay className="fixed inset-0 z-50 bg-navy-950/50 backdrop-blur-[2px] data-[state=open]:animate-in data-[state=open]:fade-in-0" />
        <Dialog.Content className="fixed left-1/2 top-1/2 z-50 w-[calc(100vw-2rem)] max-w-md -translate-x-1/2 -translate-y-1/2 rounded-2xl border border-navy-100 bg-white p-6 shadow-2xl data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95 sm:p-8">
          <Dialog.Close
            className="absolute right-4 top-4 flex h-8 w-8 items-center justify-center rounded-full text-navy-400 transition hover:bg-navy-50 hover:text-navy-700"
            aria-label="Close"
          >
            <X className="h-4 w-4" />
          </Dialog.Close>

          <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-royal-50 text-royal-600 ring-1 ring-royal-100">
            <PhoneOutgoing className="h-6 w-6" />
          </span>

          <Dialog.Title className="mt-5 text-xl font-semibold text-navy-900">
            {closed ? "Our support team is currently unavailable" : "Need help with your trip?"}
          </Dialog.Title>

          <Dialog.Description className="mt-2 text-sm leading-relaxed text-navy-600">
            {closed ? (
              <>
                You have reached us outside our support hours
                {status?.nextOpen ? <> — we are back {status.nextOpen}</> : null}. Request a callback or send
                your details and a {site.name} travel specialist will pick it up when we reopen.
              </>
            ) : (
              <>
                Our {site.name} team can talk through your travel options, check what is available for your
                dates and explain the conditions before anything is booked.
              </>
            )}
          </Dialog.Description>

          <div className="mt-6 grid gap-2.5">
            {canCall ? (
              <a
                href={telHref}
                onClick={dismiss}
                className="flex h-12 items-center justify-center gap-2 rounded-lg bg-royal-600 px-5 text-sm font-semibold text-white transition hover:bg-royal-700"
              >
                <Phone className="h-4 w-4" />
                Call Now
              </a>
            ) : (
              <Link
                href="/callback"
                onClick={dismiss}
                className="flex h-12 items-center justify-center gap-2 rounded-lg bg-royal-600 px-5 text-sm font-semibold text-white transition hover:bg-royal-700"
              >
                <Phone className="h-4 w-4" />
                {site.cta.callback}
              </Link>
            )}

            {closed && site.contact.hasEmail ? (
              <Link
                href="/contact"
                onClick={dismiss}
                className="flex h-12 items-center justify-center gap-2 rounded-lg border border-navy-200 px-5 text-sm font-semibold text-navy-800 transition hover:border-royal-400 hover:text-royal-700"
              >
                <Mail className="h-4 w-4" />
                Send a Message
              </Link>
            ) : null}

            <button
              type="button"
              onClick={dismiss}
              className="h-12 rounded-lg px-5 text-sm font-semibold text-navy-600 transition hover:bg-navy-50 hover:text-navy-900"
            >
              Continue Online
            </button>
          </div>

          <p className="mt-4 text-center text-xs leading-relaxed text-navy-500">
            Support hours: {site.hours[0].day}, {site.hours[0].time} · {site.hoursLabel}
          </p>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
