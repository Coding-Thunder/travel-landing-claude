"use client";

import { useEffect } from "react";
import { siteConfig } from "@/config/siteConfig";
import { Button } from "@/components/ui/button";
import Container from "./components/ui/Container";
import Icon from "./components/ui/Icon";

/**
 * Root error boundary.
 *
 * Same typographic register as the interior page header — a display h1 over a
 * quiet lead — so a failure still looks like part of the site rather than a
 * system dialog. Two actions only: retry, and the phone number, which is the
 * one route to a human when retrying will not help.
 */
export default function Error({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <Container className="flex min-h-[62vh] flex-col items-center justify-center py-14 text-center sm:py-16">
      <span className="flex h-12 w-12 items-center justify-center rounded-lg border border-destructive/40 bg-destructive/5 text-destructive">
        <Icon name="shield" className="h-6 w-6" />
      </span>
      <h1 className="mt-5 font-display text-3xl tracking-tight sm:text-4xl">
        Something went wrong
      </h1>
      <p className="mt-3 max-w-md text-[15px] leading-relaxed text-muted-foreground">
        We hit an unexpected error. You can try again, or call us and we&rsquo;ll help you right away.
      </p>

      <div className="mt-7 flex w-full flex-col gap-2 sm:w-auto sm:flex-row">
        <Button type="button" size="lg" onClick={reset}>
          Try again
        </Button>
        <Button asChild variant="outline" size="lg">
          <a href={`tel:${siteConfig.phone}`}>
            <Icon name="phone" />
            Call {siteConfig.phoneVanity}
          </a>
        </Button>
      </div>
    </Container>
  );
}
