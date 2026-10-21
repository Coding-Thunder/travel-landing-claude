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
import { Separator } from "@/components/ui/separator";
import { Logo } from "./logo";

/** Promoted to top level; the rest live under the Services menu. */
const PRIMARY = ["flights", "hotels"] as const;

export default function SiteHeader() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 4);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const primary = site.services.filter((s) => PRIMARY.includes(s.key as (typeof PRIMARY)[number]));
  const inMenu = site.services.filter((s) => !PRIMARY.includes(s.key as (typeof PRIMARY)[number]));
  const menuActive = inMenu.some((s) => pathname === s.href) || pathname === "/trip-planner";

  const navLink = (active: boolean) =>
    cn(
      "rounded-md px-3 py-2 text-sm font-medium transition-colors",
      "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
      active ? "text-foreground" : "text-muted-foreground hover:text-foreground"
    );

  return (
    <header
      className={cn(
        "sticky top-0 z-40 bg-background transition-shadow",
        scrolled ? "border-b" : "border-b border-transparent"
      )}
    >
      <div className="mx-auto flex h-16 max-w-6xl items-center gap-3 px-5 sm:px-8">
        <Link href="/" aria-label={`${site.name}, home`} className="rounded-md">
          <Logo />
        </Link>

        <nav className="ml-4 hidden items-center lg:flex" aria-label="Primary">
          {primary.map((s) => (
            <Link
              key={s.key}
              href={s.href}
              aria-current={pathname === s.href ? "page" : undefined}
              className={navLink(pathname === s.href)}
            >
              {s.shortName}
            </Link>
          ))}

          <DropdownMenu>
            <DropdownMenuTrigger
              className={cn(navLink(menuActive), "flex items-center gap-1 data-[state=open]:text-foreground")}
            >
              Services
              <ChevronDown className="h-3.5 w-3.5 opacity-70" aria-hidden />
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" className="w-64">
              {inMenu.map((s) => (
                <DropdownMenuItem key={s.key} asChild>
                  <Link href={s.href} className="block px-3 py-2 text-sm">
                    {s.name}
                  </Link>
                </DropdownMenuItem>
              ))}
              <Separator className="my-1" />
              <DropdownMenuItem asChild>
                <Link href="/trip-planner" className="block px-3 py-2 text-sm">
                  Build your trip
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/business-travel" className="block px-3 py-2 text-sm">
                  Business travel
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/group-travel" className="block px-3 py-2 text-sm">
                  Group travel
                </Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <Link href="/faq" aria-current={pathname === "/faq" ? "page" : undefined} className={navLink(pathname === "/faq")}>
            Help
          </Link>
        </nav>

        <div className="ml-auto flex items-center gap-2">
          <Link
            href="/contact"
            className={cn(navLink(pathname === "/contact"), "hidden md:inline-flex")}
          >
            Contact
          </Link>

          {site.contact.hasPhone ? (
            <>
              <Button asChild variant="outline" size="sm" className="hidden sm:inline-flex">
                <a href={telHref}>
                  <Phone aria-hidden />
                  {site.company.phone}
                </a>
              </Button>
              <Button asChild variant="outline" size="icon" className="sm:hidden">
                <a href={telHref} aria-label={`Call ${site.name} on ${site.company.phone}`}>
                  <Phone aria-hidden />
                </a>
              </Button>
            </>
          ) : (
            <Button asChild size="sm">
              <Link href="/callback">{site.cta.callback}</Link>
            </Button>
          )}

          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="lg:hidden" aria-label="Open menu">
                <Menu aria-hidden />
              </Button>
            </SheetTrigger>
            <SheetContent className="bg-background p-0">
              <SheetTitle className="sr-only">Site menu</SheetTitle>
              <div className="border-b px-5 py-4">
                <Logo />
              </div>

              <nav className="flex-1 overflow-y-auto p-3" aria-label="Mobile">
                <p className="px-2 pb-1 pt-2 text-xs font-medium text-muted-foreground">Travel services</p>
                {site.services.map((s) => (
                  <SheetClose asChild key={s.key}>
                    <Link
                      href={s.href}
                      className="block rounded-md px-2 py-2.5 text-[15px] font-medium transition-colors hover:bg-accent"
                    >
                      {s.name}
                    </Link>
                  </SheetClose>
                ))}

                <Separator className="my-3" />

                <p className="px-2 pb-1 text-xs font-medium text-muted-foreground">Plan and support</p>
                {[
                  { label: "Build your trip", href: "/trip-planner" },
                  { label: "Business travel", href: "/business-travel" },
                  { label: "Group travel", href: "/group-travel" },
                  { label: "Help and FAQ", href: "/faq" },
                  { label: "Contact", href: "/contact" },
                  { label: site.cta.callback, href: "/callback" },
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

              {site.contact.hasPhone ? (
                <div className="border-t p-3">
                  <Button asChild className="w-full">
                    <a href={telHref}>
                      <Phone aria-hidden />
                      {site.company.phone}
                    </a>
                  </Button>
                </div>
              ) : null}
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
