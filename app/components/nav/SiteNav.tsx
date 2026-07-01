"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import * as NavigationMenu from "@radix-ui/react-navigation-menu";
import { ChevronDown, Menu, Phone, Plane, Search } from "lucide-react";
import { siteConfig } from "@/config/siteConfig";
import { cn } from "@/lib/cn";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTitle, SheetTrigger, SheetClose } from "@/components/ui/sheet";
import { useCall } from "../call/CallProvider";

export type NavAirport = { iata: string; city: string; slug: string };
export type NavVehicle = { name: string; slug: string; priceFrom: number };
export type NavGuide = { title: string; slug: string };
export type NavCategory = { label: string; slug: string };

type Props = {
  airports: NavAirport[];
  vehicles: NavVehicle[];
  guides: NavGuide[];
  categories: NavCategory[];
};

const triggerCls =
  "group inline-flex h-9 items-center gap-1 rounded-md px-3 text-[13.5px] font-medium text-ink-soft transition-colors hover:text-ink data-[state=open]:text-ink";
const linkCls =
  "inline-flex h-9 items-center rounded-md px-3 text-[13.5px] font-medium text-ink-soft transition-colors hover:text-ink";
const panelCls =
  "absolute left-0 top-[calc(100%+10px)] z-50 origin-top rounded-xl border border-line bg-surface p-2 shadow-[0_24px_60px_-24px_rgba(23,21,15,0.28)] data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0";

export default function SiteNav({ airports, vehicles, guides, categories }: Props) {
  const { phone, phoneVanity, shortName } = siteConfig;
  const { open } = useCall();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "sticky top-0 z-40 border-b transition-colors duration-300",
        scrolled ? "border-line bg-paper/85 backdrop-blur-md" : "border-transparent bg-paper"
      )}
    >
      <div className="mx-auto flex h-[68px] max-w-[1240px] items-center gap-4 px-5 sm:px-8">
        {/* Wordmark */}
        <Link href="/" className="flex shrink-0 items-center gap-2.5" aria-label={`${shortName} home`}>
          <span className="flex h-9 w-9 items-center justify-center rounded-md bg-ink text-paper">
            <Plane className="h-[18px] w-[18px] -rotate-45" />
          </span>
          <span className="font-display text-[19px] font-semibold leading-none tracking-tight text-ink">
            {shortName}
          </span>
        </Link>

        {/* Desktop mega nav */}
        <NavigationMenu.Root className="relative ml-4 hidden lg:block" delayDuration={80}>
          <NavigationMenu.List className="flex items-center gap-0.5">
            <NavigationMenu.Item className="relative">
              <NavigationMenu.Trigger className={triggerCls}>
                Airports <ChevronDown className="h-3.5 w-3.5 transition-transform group-data-[state=open]:rotate-180" />
              </NavigationMenu.Trigger>
              <NavigationMenu.Content className={cn(panelCls, "w-[440px]")}>
                <div className="grid grid-cols-2 gap-1">
                  {airports.map((a) => (
                    <MegaItem key={a.slug} href={`/airports/${a.slug}`} title={`${a.city}`} note={a.iata} />
                  ))}
                </div>
                <FooterLink href="/airports" label="All airport locations" />
              </NavigationMenu.Content>
            </NavigationMenu.Item>

            <NavigationMenu.Item className="relative">
              <NavigationMenu.Trigger className={triggerCls}>
                Vehicles <ChevronDown className="h-3.5 w-3.5 transition-transform group-data-[state=open]:rotate-180" />
              </NavigationMenu.Trigger>
              <NavigationMenu.Content className={cn(panelCls, "w-[380px]")}>
                <div className="grid grid-cols-1 gap-1">
                  {vehicles.map((v) => (
                    <MegaItem key={v.slug} href={`/vehicles/${v.slug}`} title={v.name} note={`from $${v.priceFrom}`} />
                  ))}
                </div>
                <FooterLink href="/vehicles" label="Compare all vehicles" />
              </NavigationMenu.Content>
            </NavigationMenu.Item>

            <NavigationMenu.Item className="relative">
              <NavigationMenu.Trigger className={triggerCls}>
                Travel Guides <ChevronDown className="h-3.5 w-3.5 transition-transform group-data-[state=open]:rotate-180" />
              </NavigationMenu.Trigger>
              <NavigationMenu.Content className={cn(panelCls, "w-[460px]")}>
                <div className="grid grid-cols-[1fr_auto] gap-4 p-1">
                  <div>
                    <p className="overline px-2 pb-1.5">Latest</p>
                    <div className="grid gap-0.5">
                      {guides.map((g) => (
                        <Link
                          key={g.slug}
                          href={`/blog/${g.slug}`}
                          className="block rounded-md px-2 py-1.5 text-[13.5px] leading-snug text-ink-soft transition hover:bg-paper-deep hover:text-ink"
                        >
                          {g.title}
                        </Link>
                      ))}
                    </div>
                  </div>
                  <div className="border-l border-line pl-4">
                    <p className="overline px-2 pb-1.5">Topics</p>
                    <div className="grid gap-0.5">
                      {categories.map((c) => (
                        <Link
                          key={c.slug}
                          href={`/blog/category/${c.slug}`}
                          className="whitespace-nowrap rounded-md px-2 py-1.5 text-[13px] font-medium text-ink-soft transition hover:bg-paper-deep hover:text-ink"
                        >
                          {c.label}
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
                <FooterLink href="/blog" label="Read the journal" />
              </NavigationMenu.Content>
            </NavigationMenu.Item>

            <NavigationMenu.Item>
              <Link href="/about" className={linkCls}>Company</Link>
            </NavigationMenu.Item>
            <NavigationMenu.Item>
              <Link href="/contact" className={linkCls}>Support</Link>
            </NavigationMenu.Item>
          </NavigationMenu.List>
        </NavigationMenu.Root>

        {/* Right cluster */}
        <div className="ml-auto flex items-center gap-1.5 sm:gap-3">
          <Link
            href="/blog"
            aria-label="Search travel guides"
            className="hidden h-9 w-9 items-center justify-center rounded-md text-ink-soft transition hover:bg-paper-deep hover:text-ink sm:flex"
          >
            <Search className="h-[18px] w-[18px]" />
          </Link>

          <a href={`tel:${phone}`} className="hidden text-right leading-none xl:block">
            <span className="block text-[10px] font-medium uppercase tracking-[0.14em] text-ink-muted">Reservations · 24/7</span>
            <span className="block text-sm font-semibold tracking-tight text-ink">{phoneVanity}</span>
          </a>

          <a
            href={`tel:${phone}`}
            aria-label={`Call ${phoneVanity}`}
            className="flex h-10 w-10 items-center justify-center rounded-md border border-line-strong text-ink transition hover:bg-paper-deep sm:hidden"
          >
            <Phone className="h-[18px] w-[18px]" />
          </a>

          <Button variant="ink" size="sm" className="hidden sm:inline-flex" onClick={() => open({ source: "nav-reserve" })}>
            Reserve a car
          </Button>

          {/* Mobile menu */}
          <Sheet>
            <SheetTrigger asChild>
              <button
                type="button"
                aria-label="Open menu"
                className="flex h-10 w-10 items-center justify-center rounded-md text-ink transition hover:bg-paper-deep lg:hidden"
              >
                <Menu className="h-5 w-5" />
              </button>
            </SheetTrigger>
            <SheetContent className="p-0">
              <SheetTitle className="sr-only">Site menu</SheetTitle>
              <div className="flex items-center gap-2.5 border-b border-line px-5 py-4">
                <span className="flex h-8 w-8 items-center justify-center rounded-md bg-ink text-paper">
                  <Plane className="h-4 w-4 -rotate-45" />
                </span>
                <span className="font-display text-lg font-semibold tracking-tight text-ink">{shortName}</span>
              </div>

              <nav className="flex-1 overflow-y-auto px-5 py-5">
                <MobileGroup title="Airports" viewAll={{ href: "/airports", label: "All airports" }}>
                  {airports.slice(0, 6).map((a) => (
                    <MobileLink key={a.slug} href={`/airports/${a.slug}`} label={`${a.city} (${a.iata})`} />
                  ))}
                </MobileGroup>
                <MobileGroup title="Vehicles" viewAll={{ href: "/vehicles", label: "All vehicles" }}>
                  {vehicles.map((v) => (
                    <MobileLink key={v.slug} href={`/vehicles/${v.slug}`} label={v.name} />
                  ))}
                </MobileGroup>
                <MobileGroup title="Travel Guides" viewAll={{ href: "/blog", label: "The journal" }}>
                  {categories.map((c) => (
                    <MobileLink key={c.slug} href={`/blog/category/${c.slug}`} label={c.label} />
                  ))}
                </MobileGroup>
                <div className="mt-4 grid gap-0.5 border-t border-line pt-4">
                  <MobileLink href="/about" label="Company" />
                  <MobileLink href="/contact" label="Support" />
                </div>
              </nav>

              <div className="grid gap-2 border-t border-line px-5 py-4">
                <SheetClose asChild>
                  <Button variant="ink" className="w-full" onClick={() => open({ source: "mobile-nav-reserve" })}>
                    Reserve a car
                  </Button>
                </SheetClose>
                <a
                  href={`tel:${phone}`}
                  className="inline-flex h-11 w-full items-center justify-center gap-2 rounded-md border border-line-strong text-sm font-semibold text-ink transition hover:bg-paper-deep"
                >
                  <Phone className="h-4 w-4" />
                  Call {phoneVanity}
                </a>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}

function MegaItem({ href, title, note }: { href: string; title: string; note: string }) {
  return (
    <Link href={href} className="flex items-center justify-between rounded-md px-3 py-2 transition hover:bg-paper-deep">
      <span className="text-[13.5px] font-medium text-ink">{title}</span>
      <span className="text-[11px] font-medium text-ink-muted">{note}</span>
    </Link>
  );
}

function FooterLink({ href, label }: { href: string; label: string }) {
  return (
    <Link href={href} className="mt-1 flex items-center gap-1.5 rounded-md px-3 py-2 text-[13px] font-semibold text-accent transition hover:bg-accent-soft">
      {label}
      <span aria-hidden>→</span>
    </Link>
  );
}

function MobileGroup({ title, viewAll, children }: { title: string; viewAll: { href: string; label: string }; children: React.ReactNode }) {
  return (
    <div className="mb-5">
      <div className="mb-1.5 flex items-baseline justify-between">
        <p className="overline">{title}</p>
        <Link href={viewAll.href} className="text-[11px] font-semibold text-accent">{viewAll.label}</Link>
      </div>
      <div className="grid gap-0.5">{children}</div>
    </div>
  );
}

function MobileLink({ href, label }: { href: string; label: string }) {
  return (
    <SheetClose asChild>
      <Link href={href} className="rounded-md px-3 py-2 text-[15px] font-medium text-ink-soft transition hover:bg-paper-deep hover:text-ink">
        {label}
      </Link>
    </SheetClose>
  );
}
