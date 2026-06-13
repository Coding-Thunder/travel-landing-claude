"use client";

import { createContext, useCallback, useContext, useEffect, useRef, useState } from "react";
import CallModal from "./CallModal";

type OpenOptions = { source?: string; pickup?: string };

type CallContextValue = {
  /** Open the call/callback popup. `source` is for analytics; `pickup` pre-fills the form. */
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

const AUTO_KEY = "bt-auto-popup-shown";
const LEAD_KEY = "bt-lead-submitted";

export default function CallProvider({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [source, setSource] = useState<string>("manual");
  const [pickup, setPickup] = useState<string>("");
  const autoShownRef = useRef(false);

  const open = useCallback((opts?: OpenOptions) => {
    setSource(opts?.source ?? "manual");
    if (opts?.pickup) setPickup(opts.pickup);
    setIsOpen(true);
    // Any explicit open also satisfies the once-per-session auto gate.
    autoShownRef.current = true;
    try {
      sessionStorage.setItem(AUTO_KEY, "1");
    } catch {
      /* ignore */
    }
  }, []);

  const close = useCallback(() => setIsOpen(false), []);

  // Auto-triggers: exit-intent + 50% scroll depth — once per session, and never
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
    };

    const onScroll = () => {
      const scrolled = window.scrollY + window.innerHeight;
      const half = document.documentElement.scrollHeight * 0.5;
      if (scrolled >= half) autoOpen("scroll-50");
    };

    const onMouseOut = (e: MouseEvent) => {
      if (e.clientY <= 0 && !e.relatedTarget) autoOpen("exit-intent");
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    document.addEventListener("mouseout", onMouseOut);
    return () => {
      window.removeEventListener("scroll", onScroll);
      document.removeEventListener("mouseout", onMouseOut);
    };
  }, []);

  return (
    <CallContext.Provider value={{ open, close }}>
      {children}
      <CallModal open={isOpen} onClose={close} pickup={pickup} source={source} />
    </CallContext.Provider>
  );
}
