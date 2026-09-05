"use client";

import { createContext, useCallback, useContext, useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";

/**
 * The modal is code-split.
 *
 * CallProvider wraps every route, so a statically imported CallModal put Radix
 * Dialog, the form controls and the callback form into the shared bundle on all
 * 79 pages, for a component that renders nothing until someone asks for a
 * callback. Loading it on first open costs a fetch at a moment the user is
 * already waiting for a panel; loading it eagerly costs every visitor on every
 * route.
 */
const CallModal = dynamic(() => import("./CallModal"), { ssr: false });

type OpenOptions = { source?: string; pickup?: string; notes?: string };

type CallContextValue = {
  /**
   * Open the call/callback popup. `source` is for analytics, `pickup` pre-fills
   * the location field, and `notes` carries the rest of a search brief through
   * so the agent sees dates, times and driver age instead of the visitor having
   * to repeat them on the call.
   */
  open: (opts?: OpenOptions) => void;
  close: () => void;
};

const CallContext = createContext<CallContextValue | null>(null);

/** Access the global call/callback popup from any client component. */
export function useCall(): CallContextValue {
  const ctx = useContext(CallContext);
  if (!ctx) throw new Error("useCall must be used within <CallProvider>");
  return ctx;
}

const AUTO_KEY = "mbc-auto-popup-shown";
const LEAD_KEY = "mbc-lead-submitted";

export default function CallProvider({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  /** Latches on first open so the closing animation is not cut short. */
  const [everOpened, setEverOpened] = useState(false);
  const [source, setSource] = useState<string>("manual");
  const [pickup, setPickup] = useState<string>("");
  const [notes, setNotes] = useState<string>("");
  const autoShownRef = useRef(false);

  const open = useCallback((opts?: OpenOptions) => {
    setSource(opts?.source ?? "manual");
    // Always assign, including to "", so a value from one CTA does not leak
    // into the next open from a different CTA.
    setPickup(opts?.pickup ?? "");
    setNotes(opts?.notes ?? "");
    setIsOpen(true);
    setEverOpened(true);
    // Any explicit open also satisfies the once-per-session auto gate.
    autoShownRef.current = true;
    try {
      sessionStorage.setItem(AUTO_KEY, "1");
    } catch {
      /* ignore */
    }
  }, []);

  const close = useCallback(() => setIsOpen(false), []);

  // Auto-triggers: exit-intent + 50% scroll depth, once per session, and never
  // if the visitor has already submitted a callback request.
  useEffect(() => {
    try {
      if (sessionStorage.getItem(AUTO_KEY) || sessionStorage.getItem(LEAD_KEY)) {
        autoShownRef.current = true;
      }
    } catch {
      /* ignore */
    }

    const autoOpen = (autoSource: string) => {
      if (autoShownRef.current) return;
      autoShownRef.current = true;
      try {
        sessionStorage.setItem(AUTO_KEY, "1");
      } catch {
        /* ignore */
      }
      setSource(autoSource);
      setIsOpen(true);
      setEverOpened(true);
    };

    // Fire on genuine scroll depth, not on arrival. Comparing the viewport
    // bottom against half the document height opens the popup immediately on
    // any page shorter than two viewports, which is most interior routes.
    const onScroll = () => {
      const scrollable = document.documentElement.scrollHeight - window.innerHeight;
      if (scrollable < 400) return;
      if (window.scrollY / scrollable >= 0.5) autoOpen("scroll-50");
    };

    const onMouseOut = (e: MouseEvent) => {
      if (e.clientY <= 0 && !e.relatedTarget) autoOpen("exit-intent");
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    const fine = window.matchMedia("(pointer: fine)").matches;
    if (fine) document.addEventListener("mouseout", onMouseOut);
    return () => {
      window.removeEventListener("scroll", onScroll);
      document.removeEventListener("mouseout", onMouseOut);
    };
  }, []);

  return (
    <CallContext.Provider value={{ open, close }}>
      {children}
      {everOpened ? (
        <CallModal open={isOpen} onClose={close} pickup={pickup} notes={notes} source={source} />
      ) : null}
    </CallContext.Provider>
  );
}
