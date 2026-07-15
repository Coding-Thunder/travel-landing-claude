"use client";

import { useEffect } from "react";
import Link from "next/link";
import Container from "./components/trip/container";
import { Button } from "@/components/ui/button";

export default function Error({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <section className="bg-white py-24 sm:py-28">
      <Container className="max-w-2xl text-center">
        <h1 className="text-2xl font-semibold tracking-tight text-navy-900 sm:text-3xl">Something went wrong</h1>
        <p className="mx-auto mt-4 max-w-md text-base leading-relaxed text-navy-600">
          An unexpected error occurred. Please try again, or contact our support team and we&rsquo;ll be glad to help.
        </p>
        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Button variant="royal" size="lg" onClick={reset}>Try again</Button>
          <Button asChild variant="navyOutline" size="lg">
            <Link href="/contact">Contact support</Link>
          </Button>
        </div>
      </Container>
    </section>
  );
}
