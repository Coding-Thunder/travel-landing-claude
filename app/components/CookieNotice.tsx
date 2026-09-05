"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { siteConfig } from "@/config/siteConfig";
import { analyticsEnabled } from "@/lib/analytics";
import { Button } from "@/components/ui/button";
import Icon from "./ui/Icon";

const STORAGE_KEY = "mcr-cookie-ack-v1";

/**
 * Cookie notice.
 *
 * Renders nothing at all when the active brand has no measurement configured,
 * because a notice about analytics that are not running is noise.
 *
 * It sits above the mobile call bar rather than over it: the phone CTA is the
 * conversion and must never be covered.
 */
export default function CookieNotice() {
  const [visible, setVisible] = useState(false);
  const { cookieNotice } = siteConfig;

  useEffect(() => {
    if (!analyticsEnabled) return;
    let acknowledged: string | null = null;
    try {
      acknowledged = window.localStorage.getItem(STORAGE_KEY);
    } catch {
      /* storage unavailable: fall through and show the notice */
    }
    if (acknowledged) return;
    const t = window.setTimeout(() => setVisible(true), 800);
    return () => window.clearTimeout(t);
  }, []);

  const dismiss = () => {
    try {
      window.localStorage.setItem(STORAGE_KEY, "1");
    } catch {
      /* ignore */
    }
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div
      role="region"
      aria-label="Cookie notice"
      // On mobile this docks directly above the sticky call bar rather than
      // over the page: the call bar is the primary conversion and must never be
      // covered, and the previous position floated this card across the hero
      // search form.
      className="fixed inset-x-0 bottom-[var(--call-bar-h)] z-[45] border-y bg-card/98 backdrop-blur sm:inset-x-auto sm:bottom-6 sm:left-6 sm:max-w-md sm:rounded-lg sm:border sm:shadow-lg"
    >
      <div className="mx-auto flex max-w-6xl items-start gap-3 p-3 sm:p-4">
        <Icon name="lock" className="mt-0.5 h-4 w-4 shrink-0 text-muted-foreground" />
        <div className="min-w-0 flex-1">
          <p className="text-[13px] leading-relaxed text-muted-foreground sm:text-sm">
            {cookieNotice.message}{" "}
            <Link href="/privacy-policy" className="underline underline-offset-4 hover:text-foreground">
              {cookieNotice.learnMore}
            </Link>
          </p>
        </div>
        <Button size="sm" className="shrink-0" onClick={dismiss}>
          {cookieNotice.accept}
        </Button>
      </div>
    </div>
  );
}
