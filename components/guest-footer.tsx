"use client";

import Image from "next/image";
import Link from "next/link";
import { BadgePercent, Mail, MapPin, Phone, Send, Settings } from "lucide-react";
import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaXTwitter,
} from "react-icons/fa6";

import logo from "../images/AS-Services-Logo.jpg";
import { useState } from "react";
import { createNewsletter } from "@/lib/actions/newsletter-action";
import { Status } from "@/lib/types";
import { toast } from "sonner";

const serviceLinks = [
  { label: "Business Process Outsourcing", href: "#services" },
  { label: "Data Analytics & Dashboards", href: "#services" },
  { label: "Technical Support & Services", href: "#services" },
];

const pagesLinks = [
  { label: "Home", href: "/" },
  { label: "About us", href: "/about" },
  { label: "Contact us", href: "/contact" },
  { label: "Career", href: "/career" },
  { label: "Services", href: "/service" },
  { label: "Events & Culture", href: "/events" },
];

const socialLinks = [
  {
    label: "LinkedIn",
    key: "linkedinUrl",
    href: "https://www.linkedin.com",
    icon: FaLinkedinIn,
  },
  {
    label: "Instagram",
    key: "instagramUrl",
    href: "https://www.instagram.com",
    icon: FaInstagram,
  },
  {
    label: "Facebook",
    key: "facebookUrl",
    href: "https://www.facebook.com",
    icon: FaFacebookF,
  },
  { label: "X", key: "youtubeUrl", href: "https://x.com", icon: FaXTwitter },
];

export function GuestFooter({
  settings,
  services,
}: {
  settings: any;
  services: any;
}) {
  const [newsletter, setNewsletter] = useState("");
  const activeServices = Array.isArray(services)
    ? services.filter(
        (service: any) =>
          String(service?.status ?? "").toLowerCase() === "active",
      )
    : [];

  const handleNewsletterSubmit = async (e: any) => {
    e.preventDefault();

    try {
      let response = await createNewsletter({
        email: newsletter,
        status: Status.ACTIVE,
      });

      toast.success("Success", {
        description: response?.message,
      });

      setNewsletter("");
    } catch (error: any) {
      toast.error("Error", {
        description: error?.message,
      });
    }
  };

  return (
    <footer className="bg-white text-slate-100 border-t-[1px] border-orange-300 shadow-[0_18px_50px_rgba(15,23,42,0.06)] ">
      <div className="mx-auto w-full px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-[1.1fr_0.8fr_0.8fr_1fr]">
          <div className="max-w-sm">
            <Link href="/" className="inline-flex items-center">
              <Image
                src={settings?.logoPath ? "/api" + settings.logoPath : logo}
                alt={settings?.siteName ?? "Pinnacle Logo"}
                width={220}
                height={100}
                className=" object-contain"
              />
            </Link>
            <p className="mt-5 text-sm leading-7 text-slate-800">
              {settings?.description ??
                "Pinnacle is a leading provider of business solutions, offering a wide range of services to help businesses streamline their operations and achieve their goals."}
            </p>
            <a
              href={`tel:${settings?.phone ?? "+91-9212174507"}`}
              className="mt-6 inline-flex text-xl font-medium tracking-tight text-white transition hover:text-cyan-200"
            >
              {settings?.phone ?? "+91-9212174507"}
            </a>

            <div className="mt-6 flex flex-wrap gap-3">
              {socialLinks.map((social) => {
                const Icon = social.icon;

                return (
                  <a
                    key={social.label}
                    href={settings?.[social.key] || social.href}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={social.label}
                    className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/15 bg-white/5 text-slate-800 transition hover:border-orange-400 hover:bg-orange-500 hover:text-white"
                  >
                    <Icon className="size-4" />
                  </a>
                );
              })}
            </div>
          </div>

          <div>
            <p className="text-xl font-semibold text-orange-500 pb-3 border-b-[2px] border-[#185980]">Services</p>
            <div className="mt-5 grid gap-4 text-sm text-slate-300">
              {activeServices.map((service: any, index: number) => (
                <Link
                  key={index}
                  href={service?.id ? `/service/${service.id}` : "/service"}
                  className="inline-flex items-center gap-2 transition text-slate-800"
                >
                  <span className="h-1.5 w-1.5 rounded-full bg-orange-300" />
                  {service?.title ?? service?.name ?? "Service"}
                </Link>
              ))}
            </div>
          </div>

          <div>
            <p className="text-xl font-semibold text-orange-500 pb-3 border-b-[2px] border-[#185980]">Pages</p>
            <div className="mt-5 grid gap-4 text-sm text-slate-300">
              {pagesLinks.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  className="inline-flex items-center gap-2 transition text-slate-800"
                >
                  <span className="h-1.5 w-1.5 rounded-full bg-orange-300" />
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          <div>
            <p className="text-xl font-semibold text-orange-500 pb-3 border-b-[2px] border-[#185980]">Newsletter</p>
            <p className="mt-5 text-sm leading-7 text-slate-800">
              Get occasional updates on service improvements, analytics
              insights, and practical business tips.
            </p>
            <form className="mt-5 grid gap-3" onSubmit={handleNewsletterSubmit}>
              <label className="sr-only" htmlFor="footer-newsletter-email">
                Email address
              </label>
              <input
                id="footer-newsletter-email"
                type="email"
                value={newsletter}
                onChange={(e) => setNewsletter(e.target.value)}
                placeholder="Enter your email"
                className="h-12 rounded-full border border-blue-500 bg-white/5 px-4 text-sm text-slate-600 outline-none transition placeholder:text-black focus:border-blue-500"
              />
              <button
                type="submit"
                className="inline-flex h-12 items-center cursor-pointer justify-center gap-2 rounded-full bg-orange-500 px-5 text-sm font-semibold text-white transition hover:bg-orange-600"
              >
                Subscribe
                <Send className="size-4" />
              </button>
            </form>
          </div>
        </div>

        <div className="mt-12 grid gap-6 border-t border-white/10 pt-6 sm:grid-cols-4">
          <a
            href={`mailto:${settings?.primaryEmail ?? ""}`}
            className="inline-flex items-center gap-3 text-sm text-slate-800 transition"
          >
            <Mail className="size-4 text-cyan-800" />
            {settings?.primaryEmail ?? ""}
          </a>
          <a
            href={`tel:${settings?.phone ?? "+91-9212174507"}`}
            className="inline-flex items-center gap-3 text-sm text-slate-800 transition"
          >
            <Phone className="size-4 text-cyan-800" />
            {settings?.phone ?? "+91-9212174507"}
          </a>
        
          <a
            href="#"
            className="inline-flex items-center gap-3 text-sm text-slate-800 transition"
          >
            <BadgePercent className="size-4 text-cyan-800" />
            {settings?.gstNumber ?? ""}
          </a>
          
          <a
            href="#"
            className="inline-flex items-center gap-3 text-sm text-slate-800 transition"
          >
            <Settings className="size-4 text-cyan-800" />
            {settings?.cinNumber ?? ""}
          </a>
          
        </div>

        <div className="mt-10 flex flex-col gap-4 border-t border-white/10 pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm text-slate-800">
            © {new Date().getFullYear()} {settings?.siteName}. All rights reserved.
          </p>
          <div className="flex flex-wrap gap-4 text-sm">
            {socialLinks.map((social) => {
              const Icon = social.icon;

              return (
                <a
                  key={social.label}
                   href={settings?.[social.key] || social.href}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 text-slate-800 transition"
                >
                  <Icon className="size-4" />
                  <span>{social.label}</span>
                </a>
              );
            })}
          </div>
        </div>
      </div>
    </footer>
  );
}
