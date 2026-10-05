"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Layers,
  Users,
  Sparkles,
  Briefcase,
  Info,
  Mail,
  ChevronDown,
  Menu,
  X,
} from "lucide-react";

const serviceLinks = [
  { label: "Back Office Operations", href: "/#service-back-office" },
  { label: "Reporting & Analytics", href: "/#service-reporting" },
  { label: "Technical Support", href: "/#service-technical-support" },
  { label: "Process Management", href: "/#service-process-management" },
  { label: "Banking Finance Support", href: "/#service-banking-finance" },
];

export default function Header() {
  const pathname = usePathname();
  const isLightHeaderPage =
    pathname === "/contact" ||
    pathname === "/contact-us" ||
    pathname === "/career" ||
    pathname === "/customer-delight" ||
    pathname === "/about" ||
    pathname === "/about-us";
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [isScrolled, setIsScrolled] = useState(isLightHeaderPage);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 40 || isLightHeaderPage) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isLightHeaderPage]);

  const toggleDropdown = (name: string) => {
    setActiveDropdown((prev) => (prev === name ? null : name));
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 w-full transition-all duration-300 ${
        isScrolled
          ? "bg-white/95 backdrop-blur-md shadow-sm border-b border-slate-100 py-3.5 px-6 md:px-10 lg:px-12"
          : "bg-transparent py-6 px-6 md:px-10 lg:px-12"
      }`}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo Section */}
        <Link href="/" className="group flex items-center gap-3 select-none">
        

          <Image
            src="/pinnacle-logo.jpeg"
            alt="Pinnacle Serve"
            width={875}
            height={980}
            priority
            className="h-16 w-16 object-contain mix-blend-multiply"
          />
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-6 xl:gap-8">

          <div
            className="relative"
            onMouseEnter={() => setActiveDropdown("services")}
            onMouseLeave={() => setActiveDropdown(null)}
          >
            <button
              type="button"
              aria-haspopup="true"
              aria-expanded={activeDropdown === "services"}
              onClick={() => toggleDropdown("services")}
              onKeyDown={(event) => {
                if (event.key === "Escape") setActiveDropdown(null);
              }}
              className={`flex items-center gap-2 py-2 text-sm font-medium transition-colors ${
                isScrolled
                  ? "text-slate-700 hover:text-slate-950"
                  : "text-white/90 hover:text-white"
              }`}
            >
              <Layers className={`h-4 w-4 ${isScrolled ? "text-slate-600" : "text-white/80"}`} />
              <span>Services</span>
              <ChevronDown className={`h-4 w-4 transition-transform ${activeDropdown === "services" ? "rotate-180" : ""}`} />
            </button>
            {activeDropdown === "services" && (
              <div className="absolute left-0 top-full z-50 w-64 rounded-xl border border-slate-200 bg-white p-2 text-slate-800 shadow-xl">
                {serviceLinks.map((service) => (
                  <Link
                    key={service.href}
                    href={service.href}
                    onClick={() => setActiveDropdown(null)}
                    className="block rounded-lg px-3 py-2.5 text-sm transition hover:bg-orange-50 hover:text-orange-700"
                  >
                    {service.label}
                  </Link>
                ))}
              </div>
            )}
          </div>

          {/* Customer Delight */}
          <Link
            href="/customer-delight"
            className={`flex items-center gap-2 text-sm font-medium transition-colors py-2 ${
              isScrolled
                ? "text-slate-700 hover:text-slate-950"
                : "text-white/90 hover:text-white"
            }`}
          >
            <Sparkles
              className={`w-4 h-4 transition-colors ${
                isScrolled ? "text-slate-600" : "text-white/80"
              }`}
              strokeWidth={2}
            />
            <span>Client Outcomes</span>
          </Link>

          {/* Career */}
          <Link
            href="/career"
            className={`flex items-center gap-2 text-sm font-medium transition-colors py-2 ${
              isScrolled
                ? "text-slate-700 hover:text-slate-950"
                : "text-white/90 hover:text-white"
            }`}
          >
            <Briefcase
              className={`w-4 h-4 transition-colors ${
                isScrolled ? "text-slate-600" : "text-white/80"
              }`}
              strokeWidth={2}
            />
            <span>Careers</span>
          </Link>

          {/* About Us */}
          <Link
            href="/about"
            className={`flex items-center gap-2 text-sm font-medium transition-colors py-2 ${
              isScrolled
                ? "text-slate-700 hover:text-slate-950"
                : "text-white/90 hover:text-white"
            }`}
          >
            <Info
              className={`w-4 h-4 transition-colors ${
                isScrolled ? "text-slate-600" : "text-white/80"
              }`}
              strokeWidth={2}
            />
            <span>Our Company</span>
          </Link>

          {/* Contact Us */}
          <Link
            href="/contact"
            className={`flex items-center gap-2 text-sm font-medium transition-colors py-2 ${
              isScrolled
                ? "text-slate-700 hover:text-slate-950"
                : "text-white/90 hover:text-white"
            }`}
          >
            <Mail
              className={`w-4 h-4 transition-colors ${
                isScrolled ? "text-slate-600" : "text-white/80"
              }`}
              strokeWidth={2}
            />
            <span>Contact</span>
          </Link>
        </nav>

        {/* Mobile Menu Toggle Button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className={`lg:hidden p-2 rounded-lg transition ${
            isScrolled
              ? "text-slate-800 hover:bg-slate-100"
              : "text-white hover:bg-white/10"
          }`}
          aria-label="Toggle navigation menu"
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <div
          className={`lg:hidden mt-4 rounded-2xl border p-5 shadow-2xl flex flex-col gap-3 ${
            isScrolled
              ? "bg-white border-slate-200 text-slate-800 shadow-slate-300/50"
              : "bg-slate-950/95 backdrop-blur-2xl border-white/10 text-white shadow-2xl"
          }`}
        >

          <div>
            <button
              type="button"
              aria-expanded={activeDropdown === "mobile-services"}
              onClick={() => toggleDropdown("mobile-services")}
              className={`flex w-full items-center justify-between gap-2 py-2 text-sm font-medium transition ${
                isScrolled
                  ? "text-slate-800 hover:text-orange-600"
                  : "text-white hover:text-amber-400"
              }`}
            >
              <span className="flex items-center gap-2.5">
                <Layers className={`w-4 h-4 ${isScrolled ? "text-slate-600" : "text-white/70"}`} />
                Services
              </span>
              <ChevronDown className={`h-4 w-4 transition-transform ${activeDropdown === "mobile-services" ? "rotate-180" : ""}`} />
            </button>
            {activeDropdown === "mobile-services" && (
              <div className="ml-7 flex flex-col border-l border-current/15 pl-3">
                {serviceLinks.map((service) => (
                  <Link
                    key={service.href}
                    href={service.href}
                    onClick={() => {
                      setMobileMenuOpen(false);
                      setActiveDropdown(null);
                    }}
                    className={`py-2 text-sm transition ${
                      isScrolled
                        ? "text-slate-600 hover:text-orange-600"
                        : "text-white/75 hover:text-amber-400"
                    }`}
                  >
                    {service.label}
                  </Link>
                ))}
              </div>
            )}
          </div>

          <Link
            href="/customer-delight"
            onClick={() => setMobileMenuOpen(false)}
            className={`flex items-center gap-2.5 py-2 text-sm font-medium transition ${
              isScrolled
                ? "text-slate-800 hover:text-orange-600"
                : "text-white hover:text-amber-400"
            }`}
          >
            <Sparkles
              className={`w-4 h-4 ${
                isScrolled ? "text-slate-600" : "text-white/70"
              }`}
            />
            <span>Client Outcomes</span>
          </Link>

          <Link
            href="/career"
            onClick={() => setMobileMenuOpen(false)}
            className={`flex items-center gap-2.5 py-2 text-sm font-medium transition ${
              isScrolled
                ? "text-slate-800 hover:text-orange-600"
                : "text-white hover:text-amber-400"
            }`}
          >
            <Briefcase
              className={`w-4 h-4 ${
                isScrolled ? "text-slate-600" : "text-white/70"
              }`}
            />
            <span>Careers</span>
          </Link>

          <Link
            href="/about"
            onClick={() => setMobileMenuOpen(false)}
            className={`flex items-center gap-2.5 py-2 text-sm font-medium transition ${
              isScrolled
                ? "text-slate-800 hover:text-orange-600"
                : "text-white hover:text-amber-400"
            }`}
          >
            <Info
              className={`w-4 h-4 ${
                isScrolled ? "text-slate-600" : "text-white/70"
              }`}
            />
            <span>Our Company</span>
          </Link>

          <Link
            href="/contact"
            onClick={() => setMobileMenuOpen(false)}
            className={`flex items-center gap-2.5 py-2 text-sm font-medium transition ${
              isScrolled
                ? "text-slate-800 hover:text-orange-600"
                : "text-white hover:text-amber-400"
            }`}
          >
            <Mail
              className={`w-4 h-4 ${
                isScrolled ? "text-slate-600" : "text-white/70"
              }`}
            />
            <span>Contact</span>
          </Link>
        </div>
      )}
    </header>
  );
}
