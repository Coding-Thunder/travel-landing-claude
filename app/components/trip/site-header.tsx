"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, Phone } from "lucide-react";
import { site } from "@/config/site";
import { cn } from "@/lib/cn";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTitle, SheetTrigger, SheetClose } from "@/components/ui/sheet";
import { LogoMark } from "./logo";

const telHref = `tel:${site.company.phoneHref || site.company.phone}`;

export default function SiteHeader() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className={cn("sticky top-0 z-40 border-b transition-colors duration-300", scrolled ? "border-navy-100 bg-white/90 backdrop-blur-md" : "border-transparent bg-white")}>
      <div className="mx-auto flex h-[72px] max-w-6xl items-center gap-4 px-5 sm:px-8">
        <Link href="/" className="flex shrink-0 items-center gap-2.5" aria-label={`${site.name} home`}>
          <LogoMark className="h-9 w-9" />
          <span className="text-lg font-semibold tracking-tight text-navy-900">{site.name}</span>
        </Link>

        <nav className="ml-6 hidden items-center gap-1 lg:flex" aria-label="Primary">
          {site.nav.map((item) => {
            const active = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={active ? "page" : undefined}
                className={cn(
                  "rounded-md px-3 py-2 text-sm font-medium transition-colors",
                  active ? "text-royal-700" : "text-navy-600 hover:text-navy-900"
                )}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="ml-auto flex items-center gap-2 sm:gap-3">
          <Link href="/contact" className="hidden text-sm font-medium text-navy-600 transition-colors hover:text-navy-900 md:block">
            Request a quote
          </Link>

          {/* Phone-forward primary CTA */}
          <Button asChild variant="royal" size="sm" className="hidden whitespace-nowrap sm:inline-flex">
            <a href={telHref}>
              <Phone className="h-4 w-4" />
              {site.company.phone}
            </a>
          </Button>

          <a
            href={telHref}
            aria-label={`Call ${site.company.phone}`}
            className="flex h-10 w-10 items-center justify-center rounded-md bg-royal-600 text-white transition hover:bg-royal-700 sm:hidden"
          >
            <Phone className="h-[18px] w-[18px]" />
          </a>

          <Sheet>
            <SheetTrigger asChild>
              <button type="button" aria-label="Open menu" className="flex h-10 w-10 items-center justify-center rounded-md text-navy-800 transition hover:bg-navy-50 lg:hidden">
                <Menu className="h-5 w-5" />
              </button>
            </SheetTrigger>
            <SheetContent className="bg-white p-0">
              <SheetTitle className="sr-only">Site menu</SheetTitle>
              <div className="flex items-center gap-2.5 border-b border-navy-100 px-5 py-4">
                <LogoMark className="h-8 w-8" />
                <span className="text-base font-semibold tracking-tight text-navy-900">{site.name}</span>
              </div>
              <nav className="flex-1 overflow-y-auto p-4" aria-label="Mobile">
                <div className="grid gap-0.5">
                  {site.nav.map((item) => (
                    <SheetClose asChild key={item.href}>
                      <Link href={item.href} className="rounded-md px-3 py-2.5 text-[15px] font-medium text-navy-700 transition hover:bg-navy-50 hover:text-navy-900">
                        {item.label}
                      </Link>
                    </SheetClose>
                  ))}
                </div>
              </nav>
              <div className="border-t border-navy-100 p-4">
                <a href={telHref} className="flex h-12 w-full items-center justify-center gap-2 rounded-md bg-royal-600 text-sm font-semibold text-white">
                  <Phone className="h-4 w-4" /> {site.company.phone}
                </a>
                <SheetClose asChild>
                  <Button asChild variant="navyOutline" className="mt-2 w-full">
                    <Link href="/contact">Request a quote</Link>
                  </Button>
                </SheetClose>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
