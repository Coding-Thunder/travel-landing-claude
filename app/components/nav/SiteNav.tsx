"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { siteConfig } from "@/config/siteConfig";
import { cn } from "@/lib/cn";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Sheet, SheetContent, SheetTitle, SheetTrigger, SheetClose } from "@/components/ui/sheet";
import { Separator } from "@/components/ui/separator";
import Icon from "../ui/Icon";
import { Logo } from "../site/logo";
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

export default function SiteNav({ airports, vehicles, guides, categories }: Props) {
  const { phone, phoneDisplay, phoneVanity } = siteConfig;
  const { open } = useCall();
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 4);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const navLink = (active: boolean) =>
    cn(
      "rounded-md px-3 py-2 text-sm font-medium transition-colors",
      "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
      active ? "text-foreground" : "text-muted-foreground hover:text-foreground"
    );

  const isSection = (prefix: string) => pathname.startsWith(prefix);

  return (
    <header
      className={cn(
        "sticky top-0 z-40 bg-background transition-shadow",
        scrolled ? "border-b" : "border-b border-transparent"
      )}
    >
      <div className="mx-auto flex h-16 max-w-6xl items-center gap-3 px-5 sm:px-8">
        <Link href="/" aria-label={`${siteConfig.shortName}, home`} className="rounded-md">
          <Logo />
        </Link>

        <nav className="ml-4 hidden items-center lg:flex" aria-label="Primary">
          <DropdownMenu>
            <DropdownMenuTrigger
              className={cn(navLink(isSection("/airports")), "flex items-center gap-1 data-[state=open]:text-foreground")}
            >
              Airports
              <Icon name="chevronDown" className="h-3.5 w-3.5 opacity-70" />
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" className="w-72">
              {airports.map((a) => (
                <DropdownMenuItem key={a.slug} asChild>
                  <Link href={`/airports/${a.slug}`} className="flex items-center justify-between px-3 py-2 text-sm">
                    <span>{a.city}</span>
                    <span className="font-mono text-xs text-muted-foreground">{a.iata}</span>
                  </Link>
                </DropdownMenuItem>
              ))}
              <Separator className="my-1" />
              <DropdownMenuItem asChild>
                <Link href="/airports" className="block px-3 py-2 text-sm font-medium">
                  All airport locations
                </Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <DropdownMenu>
            <DropdownMenuTrigger
              className={cn(navLink(isSection("/vehicles")), "flex items-center gap-1 data-[state=open]:text-foreground")}
            >
              Vehicles
              <Icon name="chevronDown" className="h-3.5 w-3.5 opacity-70" />
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" className="w-72">
              {vehicles.map((v) => (
                <DropdownMenuItem key={v.slug} asChild>
                  <Link href={`/vehicles/${v.slug}`} className="flex items-center justify-between px-3 py-2 text-sm">
                    <span>{v.name}</span>
                    <span className="text-xs text-muted-foreground">from ${v.priceFrom}</span>
                  </Link>
                </DropdownMenuItem>
              ))}
              <Separator className="my-1" />
              <DropdownMenuItem asChild>
                <Link href="/vehicles" className="block px-3 py-2 text-sm font-medium">
                  Compare all vehicle types
                </Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <DropdownMenu>
            <DropdownMenuTrigger
              className={cn(navLink(isSection("/blog")), "flex items-center gap-1 data-[state=open]:text-foreground")}
            >
              Guides
              <Icon name="chevronDown" className="h-3.5 w-3.5 opacity-70" />
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" className="w-80">
              {guides.map((g) => (
                <DropdownMenuItem key={g.slug} asChild>
                  <Link href={`/blog/${g.slug}`} className="block px-3 py-2 text-sm leading-snug">
                    {g.title}
                  </Link>
                </DropdownMenuItem>
              ))}
              <Separator className="my-1" />
              {categories.map((c) => (
                <DropdownMenuItem key={c.slug} asChild>
                  <Link href={`/blog/category/${c.slug}`} className="block px-3 py-2 text-sm text-muted-foreground">
                    {c.label}
                  </Link>
                </DropdownMenuItem>
              ))}
              <Separator className="my-1" />
              <DropdownMenuItem asChild>
                <Link href="/blog" className="block px-3 py-2 text-sm font-medium">
                  All rental guides
                </Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <Link href="/about" aria-current={pathname === "/about" ? "page" : undefined} className={navLink(pathname === "/about")}>
            About
          </Link>
        </nav>

        <div className="ml-auto flex items-center gap-2">
          <Link
            href="/contact"
            aria-current={pathname === "/contact" ? "page" : undefined}
            className={cn(navLink(pathname === "/contact"), "hidden md:inline-flex")}
          >
            Contact
          </Link>

          {/* The phone number IS the conversion. It gets the primary button on
              every breakpoint, and stays a real tel: link on mobile rather than
              collapsing into the menu. */}
          <Button asChild size="sm" className="hidden sm:inline-flex" data-cta="header-call">
            <a href={`tel:${phone}`}>
              <Icon name="phone" />
              {phoneDisplay}
            </a>
          </Button>
          <Button asChild size="icon" className="sm:hidden" data-cta="header-call">
            <a href={`tel:${phone}`} aria-label={`Call ${siteConfig.shortName} on ${phoneVanity}`}>
              <Icon name="phone" />
            </a>
          </Button>

          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="lg:hidden" aria-label="Open menu">
                <Icon name="menu" />
              </Button>
            </SheetTrigger>
            <SheetContent className="bg-background p-0">
              <SheetTitle className="sr-only">Site menu</SheetTitle>
              <div className="border-b px-5 py-4">
                <Logo />
              </div>

              <nav className="flex-1 overflow-y-auto p-3" aria-label="Mobile">
                <p className="px-2 pb-1 pt-2 text-xs font-medium text-muted-foreground">Airport car rental</p>
                {airports.map((a) => (
                  <SheetClose asChild key={a.slug}>
                    <Link
                      href={`/airports/${a.slug}`}
                      className="flex items-center justify-between rounded-md px-2 py-2.5 text-[15px] font-medium transition-colors hover:bg-accent"
                    >
                      {a.city}
                      <span className="font-mono text-xs text-muted-foreground">{a.iata}</span>
                    </Link>
                  </SheetClose>
                ))}

                <Separator className="my-3" />

                <p className="px-2 pb-1 text-xs font-medium text-muted-foreground">Vehicle types</p>
                {vehicles.map((v) => (
                  <SheetClose asChild key={v.slug}>
                    <Link
                      href={`/vehicles/${v.slug}`}
                      className="block rounded-md px-2 py-2.5 text-[15px] font-medium transition-colors hover:bg-accent"
                    >
                      {v.name}
                    </Link>
                  </SheetClose>
                ))}

                <Separator className="my-3" />

                {[
                  { label: "All airport locations", href: "/airports" },
                  { label: "Compare all vehicles", href: "/vehicles" },
                  { label: "Rental guides", href: "/blog" },
                  { label: "About us", href: "/about" },
                  { label: "Contact", href: "/contact" },
                ].map((item) => (
                  <SheetClose asChild key={item.href}>
                    <Link
                      href={item.href}
                      className="block rounded-md px-2 py-2.5 text-[15px] font-medium transition-colors hover:bg-accent"
                    >
                      {item.label}
                    </Link>
                  </SheetClose>
                ))}
              </nav>

              <div className="space-y-2 border-t p-3">
                <Button asChild className="w-full" data-cta="mobile-menu-call">
                  <a href={`tel:${phone}`}>
                    <Icon name="phone" />
                    Call {phoneVanity}
                  </a>
                </Button>
                <SheetClose asChild>
                  <Button variant="outline" className="w-full" onClick={() => open({ source: "mobile-menu-callback" })}>
                    <Icon name="headset" />
                    Request a callback
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
