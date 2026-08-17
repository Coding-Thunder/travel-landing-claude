"use client";

import { useSyncExternalStore } from "react";
import { getSupportStatus, type SupportStatus } from "./support-hours";

/** Re-evaluate the open/closed state once a minute. */
const REFRESH_MS = 60_000;

let cached: SupportStatus | null = null;
let cachedAt = 0;

/**
 * Snapshot must be referentially stable between renders or `useSyncExternalStore`
 * loops forever, so a fresh status object is only adopted when the value it
 * carries actually changed.
 */
function getSnapshot(): SupportStatus | null {
  const now = Date.now();
  if (!cached || now - cachedAt >= REFRESH_MS) {
    const next = getSupportStatus();
    if (!cached || cached.open !== next.open || cached.nextOpen !== next.nextOpen) cached = next;
    cachedAt = now;
  }
  return cached;
}

/** The server has no visitor clock, so it renders the neutral "unknown" state. */
function getServerSnapshot(): SupportStatus | null {
  return null;
}

function subscribe(onChange: () => void): () => void {
  const id = setInterval(onChange, REFRESH_MS);
  return () => clearInterval(id);
}

/**
 * Support-desk open/closed state, resolved on the client only.
 *
 * Returns `null` during SSR and the first hydration pass — callers must treat
 * that as "not yet known" rather than "closed", so the UI never flickers
 * between two destinations or wrongly tells a visitor we are shut.
 */
export function useSupportStatus(): SupportStatus | null {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}
