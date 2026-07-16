"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import * as NavigationMenu from "@radix-ui/react-navigation-menu";
import { ChevronDown, Menu, Phone } from "lucide-react";
import { site } from "@/config/site";
import { cn } from "@/lib/cn";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTitle, SheetTrigger, SheetClose } from "@/components/ui/sheet";
import Icon from "./lucide-icon";
import { LogoMark } from "./logo";

const hasPhone = !site.company.phone.startsWith("[");

const SERVICES = [
  { name: "Flights", href: "/flights", desc: "Domestic & international flight assistance", icon: "plane" },
  { name: "Hotels", href: "/hotels", desc: "Accommodation for every kind of trip", icon: "building" },
  { name: "Car Rentals", href: "/car-rentals", desc: "Vehicles for business & leisure travel", icon: "car" },
  { name: "Business Travel", href: "/business-travel", desc: "Reservation support for companies", icon: "briefcase" },
  { name: "Group Travel", href: "/group-travel", desc: "Coordinated group reservations", icon: "users" },
];

const LINKS = [
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

const linkCls = "inline-flex h-9 items-center rounded-md px-3 text-sm font-medium text-navy-600 transition-colors hover:text-navy-900";

export default function SiteHeader() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const servicesActive = SERVICES.some((s) => pathname === s.href);

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

        {/* Desktop nav */}
        <NavigationMenu.Root className="relative ml-6 hidden lg:block" delayDuration={80}>
          <NavigationMenu.List className="flex items-center gap-1">
            <NavigationMenu.Item className="relative">
              <NavigationMenu.Trigger
                className={cn(
                  "group inline-flex h-9 items-center gap-1 rounded-md px-3 text-sm font-medium transition-colors data-[state=open]:text-navy-900",
                  servicesActive ? "text-royal-700" : "text-navy-600 hover:text-navy-900"
                )}
              >
                Services
                <ChevronDown className="h-4 w-4 transition-transform group-data-[state=open]:rotate-180" />
              </NavigationMenu.Trigger>
              <NavigationMenu.Content className="absolute left-0 top-[calc(100%+10px)] z-50 w-[560px] origin-top rounded-xl border border-navy-100 bg-white p-3 shadow-[0_24px_60px_-24px_rgba(13,23,41,0.28)] data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0">
                <ul className="grid grid-cols-2 gap-1">
                  {SERVICES.map((s) => (
                    <li key={s.href}>
                      <NavigationMenu.Link asChild>
                        <Link href={s.href} className="flex gap-3 rounded-lg p-3 transition hover:bg-navy-50">
                          <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-royal-50 text-royal-600 ring-1 ring-royal-100">
                            <Icon name={s.icon} className="h-[18px] w-[18px]" />
                          </span>
                          <span className="min-w-0">
                            <span className="block text-sm font-semibold text-navy-900">{s.name}</span>
                            <span className="block text-xs leading-snug text-navy-500">{s.desc}</span>
                          </span>
                        </Link>
                      </NavigationMenu.Link>
                    </li>
                  ))}
                </ul>
                <div className="mt-1 border-t border-navy-100 pt-1">
                  <NavigationMenu.Link asChild>
                    <Link href="/contact" className="flex items-center gap-1.5 rounded-lg px-3 py-2.5 text-sm font-semibold text-royal-700 transition hover:bg-royal-50">
                      Request a personalised quote
                      <span aria-hidden>→</span>
                    </Link>
                  </NavigationMenu.Link>
                </div>
              </NavigationMenu.Content>
            </NavigationMenu.Item>

            {LINKS.map((l) => (
              <NavigationMenu.Item key={l.href}>
                <Link href={l.href} aria-current={pathname === l.href ? "page" : undefined} className={cn(linkCls, pathname === l.href && "text-royal-700")}>
                  {l.label}
                </Link>
              </NavigationMenu.Item>
            ))}
          </NavigationMenu.List>
        </NavigationMenu.Root>

        {/* Right cluster */}
        <div className="ml-auto flex items-center gap-2 sm:gap-3">
          {hasPhone ? (
            <a href={`tel:${site.company.phoneHref || site.company.phone}`} className="hidden items-center gap-2 whitespace-nowrap text-sm font-semibold text-navy-800 hover:text-royal-700 xl:flex">
              <Phone className="h-4 w-4 text-royal-600" />
              {site.company.phone}
            </a>
          ) : null}

          <Button asChild variant="royal" size="sm" className="hidden sm:inline-flex">
            <Link href="/contact">Request a quote</Link>
          </Button>

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
              <nav className="flex-1 overflow-y-auto px-5 py-5" aria-label="Mobile">
                <p className="px-1 pb-1 text-[11px] font-semibold uppercase tracking-[0.14em] text-navy-400">Services</p>
                <div className="grid gap-0.5">
                  {SERVICES.map((s) => (
                    <SheetClose asChild key={s.href}>
                      <Link href={s.href} className="flex items-center gap-3 rounded-md px-3 py-2.5 text-[15px] font-medium text-navy-700 transition hover:bg-navy-50 hover:text-navy-900">
                        <Icon name={s.icon} className="h-4 w-4 text-royal-600" />
                        {s.name}
                      </Link>
                    </SheetClose>
                  ))}
                </div>
                <div className="mt-4 grid gap-0.5 border-t border-navy-100 pt-4">
                  {LINKS.map((l) => (
                    <SheetClose asChild key={l.href}>
                      <Link href={l.href} className="rounded-md px-3 py-2.5 text-[15px] font-medium text-navy-700 transition hover:bg-navy-50 hover:text-navy-900">
                        {l.label}
                      </Link>
                    </SheetClose>
                  ))}
                </div>
              </nav>
              <div className="border-t border-navy-100 p-4">
                <SheetClose asChild>
                  <Button asChild variant="royal" className="w-full">
                    <Link href="/contact">Request a quote</Link>
                  </Button>
                </SheetClose>
                {hasPhone ? (
                  <a href={`tel:${site.company.phoneHref || site.company.phone}`} className="mt-2 flex h-11 w-full items-center justify-center gap-2 rounded-md border border-navy-200 text-sm font-semibold text-navy-800">
                    <Phone className="h-4 w-4 text-royal-600" /> {site.company.phone}
                  </a>
                ) : null}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
