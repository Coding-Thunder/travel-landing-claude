"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronDown, Menu, Phone } from "lucide-react";
import { site, telHref } from "@/config/site";
import { cn } from "@/lib/cn";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Sheet, SheetContent, SheetTitle, SheetTrigger, SheetClose } from "@/components/ui/sheet";
import { Logo } from "./logo";
import Icon from "./lucide-icon";

export default function SiteHeader() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const serviceActive = site.services.some((s) => pathname === s.href);

  return (
    <header
      className={cn(
        "sticky top-0 z-40 border-b transition-colors duration-300",
        scrolled ? "border-navy-100 bg-white/92 backdrop-blur-md" : "border-transparent bg-white"
      )}
    >
      <div className="mx-auto flex h-[72px] max-w-6xl items-center gap-4 px-5 sm:px-8">
        <Link href="/" aria-label={`${site.name} — home`}>
          <Logo />
        </Link>

        <nav className="ml-5 hidden items-center gap-0.5 lg:flex" aria-label="Primary">
          <DropdownMenu>
            <DropdownMenuTrigger
              className={cn(
                "flex items-center gap-1 rounded-md px-3 py-2 text-sm font-medium transition-colors outline-none data-[state=open]:text-royal-700",
                serviceActive ? "text-royal-700" : "text-navy-600 hover:text-navy-900"
              )}
            >
              Travel Services
              <ChevronDown className="h-3.5 w-3.5 transition-transform duration-200 group-data-[state=open]:rotate-180" />
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" className="w-[19rem] p-1.5">
              {site.services.map((s) => (
                <DropdownMenuItem key={s.key} asChild>
                  <Link href={s.href} className="flex items-start gap-3 rounded-lg px-3 py-2.5">
                    <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-royal-50 text-royal-600 ring-1 ring-royal-100">
                      <Icon name={s.icon} className="h-4 w-4" />
                    </span>
                    <span className="min-w-0">
                      <span className="block text-sm font-semibold text-navy-900">{s.name}</span>
                      <span className="mt-0.5 block text-xs leading-relaxed text-navy-500">{s.description}</span>
                    </span>
                  </Link>
                </DropdownMenuItem>
              ))}
              <DropdownMenuItem asChild>
                <Link
                  href="/trip-planner"
                  className="mt-1 flex items-center gap-2 rounded-lg border-t border-navy-100 px-3 py-2.5 text-sm font-semibold text-royal-700"
                >
                  Build Your Trip
                  <span aria-hidden>→</span>
                </Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {site.nav
            .filter((item) => item.href !== "/contact")
            .map((item) => {
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
          <Link
            href="/contact"
            className="hidden text-sm font-medium text-navy-600 transition-colors hover:text-navy-900 md:block"
          >
            Contact
          </Link>

          {site.contact.hasPhone ? (
            <>
              <Button asChild variant="royal" size="sm" className="hidden whitespace-nowrap sm:inline-flex">
                <a href={telHref}>
                  <Phone className="h-4 w-4" />
                  {site.company.phone}
                </a>
              </Button>
              <a
                href={telHref}
                aria-label={`Call ${site.name} — ${site.company.phone}`}
                className="flex h-10 w-10 items-center justify-center rounded-full bg-royal-600 text-white transition hover:bg-royal-700 sm:hidden"
              >
                <Phone className="h-[18px] w-[18px]" />
              </a>
            </>
          ) : (
            <Button asChild variant="royal" size="sm" className="whitespace-nowrap">
              <Link href="/callback">{site.cta.callback}</Link>
            </Button>
          )}

          <Sheet>
            <SheetTrigger asChild>
              <button
                type="button"
                aria-label="Open menu"
                className="flex h-10 w-10 items-center justify-center rounded-md text-navy-800 transition hover:bg-navy-50 lg:hidden"
              >
                <Menu className="h-5 w-5" />
              </button>
            </SheetTrigger>
            <SheetContent className="bg-white p-0">
              <SheetTitle className="sr-only">Site menu</SheetTitle>
              <div className="border-b border-navy-100 px-5 py-4">
                <Logo markClassName="h-8 w-8" />
              </div>

              <nav className="flex-1 overflow-y-auto p-4" aria-label="Mobile">
                <p className="px-3 pb-2 text-[11px] font-semibold uppercase tracking-[0.16em] text-navy-400">
                  Travel Services
                </p>
                <div className="grid gap-0.5">
                  {site.services.map((s) => (
                    <SheetClose asChild key={s.key}>
                      <Link
                        href={s.href}
                        className="flex items-center gap-3 rounded-md px-3 py-2.5 text-[15px] font-medium text-navy-700 transition hover:bg-navy-50 hover:text-navy-900"
                      >
                        <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-royal-50 text-royal-600">
                          <Icon name={s.icon} className="h-4 w-4" />
                        </span>
                        {s.name}
                      </Link>
                    </SheetClose>
                  ))}
                </div>

                <p className="mt-5 px-3 pb-2 text-[11px] font-semibold uppercase tracking-[0.16em] text-navy-400">
                  Flight Bizz
                </p>
                <div className="grid gap-0.5">
                  {[{ label: "Build Your Trip", href: "/trip-planner" }, ...site.nav].map((item) => (
                    <SheetClose asChild key={item.href}>
                      <Link
                        href={item.href}
                        className="rounded-md px-3 py-2.5 text-[15px] font-medium text-navy-700 transition hover:bg-navy-50 hover:text-navy-900"
                      >
                        {item.label}
                      </Link>
                    </SheetClose>
                  ))}
                </div>
              </nav>

              <div className="border-t border-navy-100 p-4">
                {site.contact.hasPhone ? (
                  <a
                    href={telHref}
                    className="flex h-12 w-full items-center justify-center gap-2 rounded-lg bg-royal-600 text-sm font-semibold text-white"
                  >
                    <Phone className="h-4 w-4" /> {site.company.phone}
                  </a>
                ) : null}
                <SheetClose asChild>
                  <Button asChild variant="navyOutline" className="mt-2 w-full">
                    <Link href="/callback">{site.cta.callback}</Link>
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
