"use client";

import { useEffect, useRef, useState } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { siteConfig } from "@/config/siteConfig";
import { trackEvent } from "@/lib/analytics";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import Icon from "../ui/Icon";
import StarRating from "../ui/StarRating";

const LEAD_KEY = "mbc-lead-submitted";

type CallModalProps = {
  open: boolean;
  onClose: () => void;
  pickup?: string;
  /** The rest of a search brief (dates, times, driver age), carried from a CTA. */
  notes?: string;
  source?: string;
};

/**
 * The callback popup.
 *
 * Built on Radix Dialog rather than a hand-rolled overlay: that gives a real
 * focus trap, focus restore on close, Escape handling, scroll lock and correct
 * `aria-modal` semantics for free — all of which the previous implementation
 * only partially had.
 */
export default function CallModal({ open, onClose, pickup = "", notes = "", source = "manual" }: CallModalProps) {
  const { phone, phoneVanity, callResponse, callModal, trust, destinations } = siteConfig;
  const [name, setName] = useState("");
  const [phoneVal, setPhoneVal] = useState("");
  const [submitted, setSubmitted] = useState(false);
  // Pickup is uncontrolled: `key={pickup}` remounts it with the CTA-provided
  // default while leaving the visitor free to edit it.
  const pickupRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (open) trackEvent("callback_open", { cta_source: source });
  }, [open, source]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !phoneVal.trim()) return;
    try {
      sessionStorage.setItem(LEAD_KEY, "1");
    } catch {
      /* storage unavailable — the once-per-session gate still applies */
    }
    // NOTE: there is no lead backend wired up. See docs/CONVERSION-TRACKING.md.
    trackEvent("callback_submit", {
      cta_source: source,
      pickup_location: pickupRef.current?.value ?? "",
      trip_details: notes,
    });
    setSubmitted(true);
  };

  return (
    <Dialog.Root
      open={open}
      onOpenChange={(next) => {
        if (!next) {
          onClose();
          // Reset only after the close transition, so the success state does
          // not flash back to the form on the way out.
          window.setTimeout(() => setSubmitted(false), 200);
        }
      }}
    >
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-50 bg-foreground/50 data-[state=open]:animate-in data-[state=open]:fade-in-0" />
        <Dialog.Content className="fixed left-1/2 top-1/2 z-50 flex max-h-[calc(100dvh-2rem)] w-[calc(100vw-2rem)] max-w-md -translate-x-1/2 -translate-y-1/2 flex-col overflow-y-auto overscroll-contain rounded-lg border bg-card shadow-lg data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95">
          <Dialog.Close
            className="absolute right-3 top-3 rounded-md p-1.5 text-muted-foreground transition-colors hover:bg-accent hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            aria-label="Close"
          >
            <Icon name="close" className="h-4 w-4" />
          </Dialog.Close>

          <div className="p-6">
            <Dialog.Title className="pr-8 text-lg font-semibold tracking-tight">
              {callModal.headline}
            </Dialog.Title>
            <Dialog.Description className="mt-2 text-sm leading-relaxed text-muted-foreground">
              {callModal.subtitle}
            </Dialog.Description>

            {submitted ? (
              <div className="mt-6 text-center">
                <span className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-secondary text-success">
                  <Icon name="check" className="h-6 w-6" />
                </span>
                <h3 className="mt-4 text-base font-semibold">Request received</h3>
                <p className="mt-1.5 text-sm text-muted-foreground">{callModal.success}</p>
                <p className="mt-1 text-xs font-medium text-success">{callModal.response}</p>
                <Button asChild className="mt-5 w-full" data-cta="modal-success-call">
                  <a href={`tel:${phone}`}>
                    <Icon name="phone" />
                    Or call now · {phoneVanity}
                  </a>
                </Button>
              </div>
            ) : (
              <>
                {/* Primary: tap to call. */}
                <a
                  href={`tel:${phone}`}
                  data-cta="modal-call"
                  className="mt-5 flex items-center justify-between gap-3 rounded-lg border bg-muted/60 p-4 transition-colors hover:bg-accent"
                >
                  <span className="flex items-center gap-3">
                    <span className="flex h-11 w-11 items-center justify-center rounded-md bg-primary text-primary-foreground">
                      <Icon name="phone" className="h-5 w-5" />
                    </span>
                    <span className="text-left">
                      <span className="block text-xs font-medium text-muted-foreground">
                        {callModal.callCta} · {siteConfig.hours}
                      </span>
                      <span className="block text-lg font-semibold tracking-tight">{phoneVanity}</span>
                      <span className="block text-xs text-muted-foreground">{callResponse}</span>
                    </span>
                  </span>
                  <Icon name="chevronRight" className="h-4 w-4 shrink-0 text-muted-foreground" />
                </a>

                <div className="my-5 flex items-center gap-3">
                  <Separator className="flex-1" />
                  <span className="text-xs font-medium text-muted-foreground">{callModal.callbackTitle}</span>
                  <Separator className="flex-1" />
                </div>

                <form onSubmit={handleSubmit} className="space-y-3" noValidate>
                  <div className="space-y-1.5">
                    <Label htmlFor="cb-name">{callModal.fields.name}</Label>
                    <Input
                      id="cb-name"
                      required
                      autoComplete="name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Jane Doe"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <Label htmlFor="cb-phone">{callModal.fields.phone}</Label>
                    <Input
                      id="cb-phone"
                      type="tel"
                      required
                      autoComplete="tel"
                      value={phoneVal}
                      onChange={(e) => setPhoneVal(e.target.value)}
                      placeholder="(555) 123-4567"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <Label htmlFor="cb-loc">{callModal.fields.location}</Label>
                    <Input
                      key={pickup}
                      ref={pickupRef}
                      id="cb-loc"
                      list="cb-cities"
                      defaultValue={pickup}
                      placeholder="City or airport"
                    />
                    <datalist id="cb-cities">
                      {destinations.map((d) => (
                        <option key={d.city} value={`${d.city}, ${d.state}`} />
                      ))}
                    </datalist>
                  </div>

                  {notes ? (
                    <p className="rounded-md bg-muted px-3 py-2 text-xs leading-relaxed text-muted-foreground">
                      <span className="font-medium text-foreground">We&apos;ll bring this to the call:</span> {notes}
                    </p>
                  ) : null}

                  <Button type="submit" className="w-full">
                    {callModal.callbackCta}
                  </Button>
                </form>
              </>
            )}

            <div className="mt-5 flex flex-wrap items-center justify-center gap-x-2 gap-y-1 border-t pt-4 text-xs text-muted-foreground">
              <StarRating rating={Number(trust.rating)} starClassName="h-3.5 w-3.5" />
              <span className="font-medium text-foreground">{trust.rating}</span>
              <span aria-hidden>·</span>
              <span>{trust.highlights.join(" · ")}</span>
            </div>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
