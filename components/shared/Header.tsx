"use client";

import React, { useState, useEffect } from "react";
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
          {/* Spiral Galaxy / Vortex Logo Icon matching image */}
          <div className="relative w-10 h-10 md:w-11 md:h-11 flex-shrink-0 flex items-center justify-center">
            <svg
              viewBox="0 0 100 100"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="w-full h-full group-hover:rotate-45 transition-transform duration-700 ease-out"
            >
              <defs>
                <linearGradient id="spiralOrange" x1="0%" y1="100%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#ea580c" />
                  <stop offset="100%" stopColor="#f97316" />
                </linearGradient>
                <linearGradient id="spiralBlue" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#1e3a8a" />
                  <stop offset="100%" stopColor="#3b82f6" />
                </linearGradient>
              </defs>

              {/* Outer spiral dots and curved rays */}
              <g strokeLinecap="round">
                {Array.from({ length: 24 }).map((_, i) => {
                  const angle = (i * 15 * Math.PI) / 180;
                  const cos = Math.cos(angle);
                  const sin = Math.sin(angle);
                  const r1 = 10;
                  const r2 = 38;
                  const x1 = (50 + r1 * cos).toFixed(2);
                  const y1 = (50 + r1 * sin).toFixed(2);
                  const cx = (50 + 26 * Math.cos(angle + 0.6)).toFixed(2);
                  const cy = (50 + 26 * Math.sin(angle + 0.6)).toFixed(2);
                  const x2 = (50 + r2 * Math.cos(angle + 1.15)).toFixed(2);
                  const y2 = (50 + r2 * Math.sin(angle + 1.15)).toFixed(2);

                  const isWarm = i < 12;
                  const strokeColor = isScrolled
                    ? isWarm
                      ? "url(#spiralOrange)"
                      : "url(#spiralBlue)"
                    : isWarm
                    ? "#f97316"
                    : "#ffffff";

                  return (
                    <path
                      key={i}
                      d={`M ${x1} ${y1} Q ${cx} ${cy} ${x2} ${y2}`}
                      stroke={strokeColor}
                      strokeDasharray={`${(i % 3) + 1.5} ${(i % 2) + 2.5}`}
                      strokeWidth={1.6 + (i % 3) * 0.6}
                      opacity={Number((0.75 + (i / 24) * 0.25).toFixed(2))}
                    />
                  );
                })}
              </g>
              <circle
                cx="50"
                cy="50"
                r="3.5"
                fill={isScrolled ? "#1e3a8a" : "#ffffff"}
                opacity="0.9"
              />
            </svg>
          </div>

          {/* Brand Name & Subtitle */}
          <div className="flex flex-col">
            <span
              className={`text-xl md:text-2xl font-bold tracking-tight font-sans transition-colors ${
                isScrolled ? "text-slate-900" : "text-white"
              }`}
            >
              LOGO{" "}
              <span
                className={`font-light tracking-normal ${
                  isScrolled ? "text-slate-600" : "text-white/90"
                }`}
              >
                LOGO
              </span>
            </span>
            <div
              className={`flex items-center gap-1.5 text-[9px] tracking-[0.28em] font-medium uppercase transition-colors ${
                isScrolled ? "text-slate-500" : "text-white/75"
              }`}
            >
              <span
                className={`w-3.5 h-[1px] ${
                  isScrolled ? "bg-slate-300" : "bg-white/50"
                }`}
              />
              <span>LOGO</span>
              <span
                className={`w-3.5 h-[1px] ${
                  isScrolled ? "bg-slate-300" : "bg-white/50"
                }`}
              />
            </div>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-6 xl:gap-8">

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
            <span>Customer Delight</span>
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
            <span>Career</span>
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
            <span>About Us</span>
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
            <span>Contact Us</span>
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
            <span>Customer Delight</span>
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
            <span>Career</span>
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
            <span>About Us</span>
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
            <span>Contact Us</span>
          </Link>
        </div>
      )}
    </header>
  );
}