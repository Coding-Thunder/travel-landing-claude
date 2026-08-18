"use client";

import { useEffect } from "react";
import Link from "next/link";
import { Phone } from "lucide-react";
import { site, telHref } from "@/config/site";
import Container from "./components/trip/container";
import { Button } from "@/components/ui/button";

export default function Error({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <Container className="py-20 sm:py-24">
      <div className="max-w-xl">
        <h1 className="font-display text-3xl tracking-tight sm:text-4xl">Something went wrong</h1>
        <p className="mt-3 text-[15px] leading-relaxed text-muted-foreground">
          An unexpected error occurred. Please try again, or contact the {site.name} support team and we will help.
        </p>
        <div className="mt-6 flex flex-wrap gap-2">
          <Button onClick={reset}>Try again</Button>
          {site.contact.hasPhone ? (
            <Button asChild variant="outline">
              <a href={telHref}>
                <Phone aria-hidden />
                {site.cta.secondary}
              </a>
            </Button>
          ) : (
            <Button asChild variant="outline">
              <Link href="/contact">Contact support</Link>
            </Button>
          )}
        </div>
      </div>
    </Container>
  );
}
