"use client";

import { useEffect } from "react";
import { siteConfig } from "@/config/siteConfig";
import Container from "./components/ui/Container";
import Icon from "./components/ui/Icon";

export default function Error({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <Container className="flex min-h-[62vh] flex-col items-center justify-center py-20 text-center">
      <span className="flex h-16 w-16 items-center justify-center rounded-2xl bg-amber-50 text-amber-600">
        <Icon name="shield" className="h-8 w-8" />
      </span>
      <h1 className="mt-5 text-2xl font-extrabold tracking-tight text-slate-900 sm:text-3xl">
        Something went wrong
      </h1>
      <p className="mt-3 max-w-md text-slate-600">
        We hit an unexpected error. You can try again, or call us and we&rsquo;ll help you right away.
      </p>

      <div className="mt-7 flex w-full flex-col gap-2.5 sm:w-auto sm:flex-row">
        <button
          type="button"
          onClick={reset}
          className="inline-flex items-center justify-center gap-2 rounded-xl bg-brand-600 px-6 py-3.5 text-base font-bold text-white shadow-[0_10px_30px_-10px_rgba(37,99,235,0.55)] transition hover:bg-brand-700"
        >
          Try again
        </button>
        <a
          href={`tel:${siteConfig.phone}`}
          className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-6 py-3.5 text-base font-bold text-slate-900 transition hover:bg-slate-50"
        >
          <Icon name="phone" className="h-5 w-5 text-brand-600" />
          Call {siteConfig.phoneVanity}
        </a>
      </div>
    </Container>
  );
}
