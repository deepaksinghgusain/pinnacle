"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowRight, BriefcaseBusiness, ChevronDown, Menu, X } from "lucide-react";
import logo from "../images/AS-Services-Logo.jpg";
import { GuestEnquiryPopup } from "@/components/guest-enquiry-popup";
import { getServices } from "@/lib/actions/service-action"
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from "./ui/dropdown-menu";
import { Button } from "./ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetClose,
} from "@/components/ui/sheet";
import { Status } from "@/lib/types";


const navLinkBase =
  "relative pb-1 text-sm font-semibold transition-colors after:absolute after:inset-x-0 after:-bottom-0.5 after:h-0.5 after:origin-left after:scale-x-0 after:bg-orange-500 after:transition-transform after:duration-300 after:content-[''] hover:after:scale-x-100 hover:text-orange-500";

const ctaPrimaryBase =
  "inline-flex items-center rounded-full border border-orange-300/70 bg-gradient-to-r from-orange-500 to-orange-600 px-5 py-2.5 text-sm font-semibold text-white shadow-[0_12px_30px_rgba(249,115,22,0.22)] backdrop-blur-md transition-all duration-300 hover:-translate-y-0.5 hover:from-orange-500 hover:to-orange-500 hover:shadow-[0_16px_36px_rgba(249,115,22,0.28)]";

const ctaSecondaryBase =
  "inline-flex items-center gap-2 rounded-full cursor-pointer border border-[#185980] bg-[#185980] px-5 py-2.5 text-sm font-semibold text-white shadow-[0_12px_30px_rgba(59,130,246,0.22)] backdrop-blur-md transition-all duration-300 hover:-translate-y-0.5 hover:from-blue-500 hover:to-blue-500 hover:shadow-[0_16px_36px_rgba(59,130,246,0.28)]";

const dropdownLinkBase =
  "block rounded-2xl border border-slate-200/80 bg-white p-4 transition-all duration-200 hover:-translate-y-0.5 hover:border-cyan-200 hover:shadow-[0_14px_35px_rgba(15,23,42,0.08)]";

const mobileLinkBase =
  "rounded-2xl px-3 py-2.5 text-base font-medium text-slate-700 transition hover:bg-slate-100 hover:text-slate-950";

export function GuestNavbar({ settings }: { settings: any }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const isHomePage = pathname === "/";
  const isTransparentHeader = isHomePage && !scrolled;
  const isActiveLink = (href: string) => href === "/" ? pathname === href : pathname.startsWith(href);
  const [services, setServices] = useState([])
  const [open, setOpen] = useState(false);
  const [desktopDropdownOpen, setDesktopDropdownOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 24);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    getServices().then((res: any) => {
      setServices(res)
    })

    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={[
        "fixed inset-x-0 top-0 z-50 transition-all duration-300",
        isTransparentHeader
          ? "border-transparent bg-transparent text-white"
          : "border-slate-200/80 bg-white/92 text-slate-900 shadow-sm shadow-slate-900/5 backdrop-blur-xl",
      ].join(" ")}
    >
      <div className="mx-auto flex h-30 max-w-7xl items-center justify-between gap-4 px-5">
        <Link
          href="/"
          className="flex h-20 shrink-0 items-center rounded-xl"
          onClick={() => setMobileOpen(false)}
        >
          <Image
            src={
              settings?.headerLogoPath || settings?.logoPath
                ? "/api" + (settings.headerLogoPath || settings.logoPath)
                : logo
            }
            alt="Pinnacle logo"
            width={300}
            height={120}
            priority
            unoptimized
            className="h-30 w-auto object-contain"
          />
        </Link>

        <nav className="flex items-center gap-6">
          {/* Mobile menu trigger + Sheet */}
          <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
            <SheetTrigger asChild>
              <button
                type="button"
                className={[
                  "inline-flex h-8 w-8 items-center justify-center rounded-xl border transition md:hidden",
                  isTransparentHeader
                    ? "border-white/20 text-white hover:bg-white/10"
                    : "border-slate-200 text-slate-700 hover:bg-slate-100",
                ].join(" ")}
                aria-label={mobileOpen ? "Close menu" : "Open menu"}
              >
                <Menu className="size-5" />
              </button>
            </SheetTrigger>

            <SheetContent side="right" className="w-[300px] sm:w-[360px] p-0">
              <SheetHeader className="border-b border-slate-200 px-4 py-4">
                <SheetTitle asChild>
                  <Link
                    href="/"
                    className="flex items-center"
                    onClick={() => setMobileOpen(false)}
                  >
                    <Image
                      src={
                        settings?.headerLogoPath || settings?.logoPath
                          ? "/api" + (settings.headerLogoPath || settings.logoPath)
                          : logo
                      }
                      alt="Pinnacle logo"
                      width={160}
                      height={64}
                      unoptimized
                      className="h-12 w-auto object-contain"
                    />
                  </Link>
                </SheetTitle>
              </SheetHeader>

              <div className="flex flex-col gap-2 px-4 py-4">
                <SheetClose asChild>
                  <Link href="/" className={`${mobileLinkBase} ${isActiveLink("/") ? "border-b-2 border-orange-500 text-orange-500" : ""}`}>
                    Home
                  </Link>
                </SheetClose>

                <SheetClose asChild>
                  <Link href="/about" className={`${mobileLinkBase} ${isActiveLink("/about") ? "border-b-2 border-orange-500 text-orange-500" : ""}`}>
                    About us
                  </Link>
                </SheetClose>

                {/* Services with expandable list instead of dropdown */}
                <div className="rounded-2xl">
                  <button
                    type="button"
                    onClick={() => setOpen((prev) => !prev)}
                    className={[
                      mobileLinkBase,
                      "flex w-full items-center justify-between",
                      isActiveLink("/service") ? "border-b-2 border-orange-500 text-orange-500" : "",
                    ].join(" ")}
                  >
                    Services
                    <ChevronDown
                      className={[
                        "h-4 w-4 transition-transform duration-300",
                        open ? "rotate-180" : "",
                      ].join(" ")}
                    />
                  </button>

                  {open ? (
                    <div className="mt-1 grid gap-1 pl-3">
                      {services.length > 0 &&
                        services
                          .filter((service: any) => service.status === Status.ACTIVE)
                          .map((item: any) => (
                            <SheetClose asChild key={item.id}>
                              <Link
                                href={`/service/${item.id}`}
                                className="rounded-xl px-3 py-2 text-sm font-medium text-slate-600 transition hover:bg-slate-100 hover:text-slate-950"
                              >
                                {item.title}
                              </Link>
                            </SheetClose>
                          ))}
                    </div>
                  ) : null}
                </div>

                <SheetClose asChild>
                  <Link href="/career" className={`${mobileLinkBase} ${isActiveLink("/career") ? "border-b-2 border-orange-500 text-orange-500" : ""}`}>
                    Careers
                  </Link>
                </SheetClose>

                
                <SheetClose asChild>
                  <Link
                    href="/it-services"
                     className={`${mobileLinkBase} ${isActiveLink("/it-services") ? "border-b-2 border-orange-500 text-orange-500" : ""}`}
                  >
                   Digital Solutions
                  </Link>
                </SheetClose>

                <SheetClose asChild>
                  <Link href="/events" className={`${mobileLinkBase} ${isActiveLink("/events") ? "border-b-2 border-orange-500 text-orange-500" : ""}`}>
                    Events & Culture
                  </Link>
                </SheetClose>


                <SheetClose asChild>
                  <Link
                    href="/contact"
                    className={ctaPrimaryBase + " justify-center mt-2"}
                  >
                    Contact us
                  </Link>
                </SheetClose>

                <GuestEnquiryPopup
                  triggerClassName={ctaSecondaryBase + " w-full justify-center"}
                  triggerLabel="Enquire"
                />
              </div>
            </SheetContent>
          </Sheet>

          <div className="hidden items-center gap-4 md:flex">
            <NavigationMenu viewport={false}>
              <NavigationMenuList className="gap-5">
                <NavigationMenuItem>
                  <Link
                    href="/"
                    className={[
                      navLinkBase,
                      isActiveLink("/") ? "text-orange-500 after:scale-x-100" : isTransparentHeader ? "text-white" : "text-slate-700",
                    ].join(" ")}
                  >
                    Home
                  </Link>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <Link
                    href="/about"
                    className={[
                      navLinkBase,
                      isActiveLink("/about") ? "text-orange-500 after:scale-x-100" : isTransparentHeader ? "text-white" : "text-slate-700",
                    ].join(" ")}
                  >
                    About us
                  </Link>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <Link
                    href="/career"
                    className={[
                      navLinkBase,
                      isActiveLink("/career") ? "text-orange-500 after:scale-x-100" : isTransparentHeader ? "text-white" : "text-slate-700",
                    ].join(" ")}
                  >
                    Careers
                  </Link>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <Link
                    href="/it-services"
                    className={[
                      navLinkBase,
                      isActiveLink("/it-services") ? "text-orange-500 after:scale-x-100" : isTransparentHeader ? "text-white" : "text-slate-700",
                    ].join(" ")}
                  >
                   Digital Solutions
                  </Link>
                </NavigationMenuItem>

                <NavigationMenuItem>
                  <Link
                    href="/events"
                    className={[
                      navLinkBase,
                      isActiveLink("/events") ? "text-orange-500 after:scale-x-100" : isTransparentHeader ? "text-white" : "text-slate-700",
                    ].join(" ")}
                  >
                    Events & Culture
                  </Link>
                </NavigationMenuItem>

                <DropdownMenu
                  open={desktopDropdownOpen}
                  onOpenChange={setDesktopDropdownOpen}
                >
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="ghost"
                      className={[
                        "group bg-transparent border-0 shadow-none",
                        "hover:bg-transparent",
                        "active:bg-transparent",
                        "focus:bg-transparent",
                        "data-[state=open]:bg-transparent",
                        "focus-visible:bg-transparent",
                        "focus-visible:ring-0 focus-visible:ring-offset-0",
                        "data-[state=open]:text-orange-500",
                        "data-[state=open]:after:scale-x-100",
                        "data-[state=open]:after:bg-orange-500 mt-1",
                        navLinkBase,
                        isActiveLink("/service") ? "text-orange-500 after:scale-x-100" : isTransparentHeader ? "text-white" : "text-slate-700",
                      ].join(" ")}
                    >
                      Services
                      <ChevronDown className="ml-1 h-4 w-4 transition-transform duration-300 group-data-[state=open]:rotate-180" />
                    </Button>
                  </DropdownMenuTrigger>

                  <DropdownMenuContent
                    align="center"
                    sideOffset={16}
                    className="w-[420px] rounded-3xl border border-slate-200 bg-white p-5 shadow-2xl"
                  >
                    <div className="grid gap-3">
                      {services
                        .filter((service: any) => service.status === Status.ACTIVE)
                        .map((item: any) => (
                          <Link
                            key={item.id}
                            href={`/service/${item.id}`}
                            onClick={() => setDesktopDropdownOpen(false)}
                            className="group flex items-start gap-2 rounded-2xl border border-slate-200 px-4 py-2 transition-all duration-300 hover:border-[#185980] hover:bg-[#185980] hover:shadow-lg"
                          >
                            <div className="flex-1">
                              <h4 className="font-semibold text-slate-900 transition-colors duration-300 group-hover:text-white">
                                {item.title}
                              </h4>
                            </div>
                          </Link>
                        ))}
                    </div>
                  </DropdownMenuContent>
                </DropdownMenu>

                <NavigationMenuItem className="ml-2">
                  <Link href="/contact" className={ctaPrimaryBase}>
                    Get in Touch
                  </Link>
                </NavigationMenuItem>
                <NavigationMenuItem className="ml-2">
                  <GuestEnquiryPopup
                    triggerClassName={ctaSecondaryBase}
                    triggerLabel="Enquire"
                  />
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
          </div>
        </nav>
      </div>
    </header>
  );
}