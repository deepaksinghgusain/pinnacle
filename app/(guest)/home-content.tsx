"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import type { SiteSettings } from "@/lib/generated/prisma";
import {
  ArrowDown,
  Quote,
  ArrowUpRight,
  CheckCircle2,
  Globe,
  Building2,
  Users,
  GraduationCap,
  Sparkles,
  BarChart3,
  LineChart,
  Wrench,
  Cog,
  Car,
} from "lucide-react";

export type HomepageSettings = Pick<
  SiteSettings,
  | "heroTagline"
  | "heroTitle"
  | "heroTitleAccent"
  | "heroTitleSuffix"
  | "heroDescription"
  | "heroBackgroundImagePath"
  | "heroButtonLabel"
  | "heroButtonHref"
  | "heroTrustTags"
  | "aboutTagline"
  | "aboutTitle"
  | "aboutTitleAccent"
  | "aboutDescription"
  | "aboutButtonLabel"
  | "aboutButtonHref"
  | "aboutHighlights"
  | "aboutFeatureCards"
  | "serviceSectionTagline"
  | "serviceSectionTitle"
  | "serviceSectionAccent"
  | "serviceSectionDescription"
  | "serviceSectionCtaLabel"
  | "serviceSectionCtaHref"
  | "whyClientsTagline"
  | "whyClientsTitle"
  | "whyClientsDescription"
  | "whyClientsCards"
  | "homeTestimonialsTagline"
  | "homeTestimonialsTitle"
  | "homeTestimonialsAccent"
  | "homeTestimonialsDescription"
>;

export type HomeService = {
  id: string;
  title: string;
  shortDescription: string;
};

export type HomeTestimonial = {
  id: string;
  name: string;
  designation: string;
  company: string;
  content: string;
  tag: string;
};

type HomeProps = {
  settings: HomepageSettings | null;
  services: HomeService[];
  testimonials: HomeTestimonial[];
};

type HomepageMetric = {
  key: string;
  value: string;
};

type HomepageCard = {
  title: string;
  summary: string;
};

function parseMetrics(value: string | null): HomepageMetric[] {
  if (value?.trim()) {
    try {
      const parsed: unknown = JSON.parse(value);
      if (Array.isArray(parsed)) {
        const metrics = parsed
          .map((item) => {
            if (!item || typeof item !== "object") return null;
            const metric = item as Record<string, unknown>;
            const key = String(metric.key ?? metric.title ?? metric.label ?? "").trim();
            const text = String(metric.value ?? "").trim();
            return key && text ? { key, value: text } : null;
          })
          .filter((metric): metric is HomepageMetric => metric !== null);
        if (metrics.length) return metrics;
      }
    } catch {
      // Use the homepage defaults when saved metric data is malformed.
    }
  }

  return [
    { key: "Team Members", value: "100+" },
    { key: "Happy Customers", value: "20+" },
    { key: "Projects Delivered", value: "25+" },
    { key: "Certified Professionals", value: "50+" },
    { key: "Global Time Zone Coverage", value: "24X7" },
    { key: "C-SAT Index", value: "99.9%" },
  ];
}

function parseCards(value: string | null, fallback: HomepageCard[]): HomepageCard[] {
  if (!value?.trim()) return fallback;

  try {
    const parsed: unknown = JSON.parse(value);
    if (Array.isArray(parsed)) {
      const cards = parsed
        .map((item) => {
          if (!item || typeof item !== "object") return null;
          const card = item as Record<string, unknown>;
          const title = String(card.title ?? "").trim();
          const summary = String(card.summary ?? card.content ?? "").trim();
          return title || summary ? { title, summary } : null;
        })
        .filter((card): card is HomepageCard => card !== null);
      if (cards.length) return cards;
    }
  } catch {
    // Use the homepage defaults when saved card data is malformed.
  }

  return fallback;
}

function getMediaSource(value: string | null | undefined): string | null {
  const source = value?.trim();
  if (!source) return null;
  if (/^\/?uploads\//i.test(source)) {
    return `/api/uploads/${source.replace(/^\/?uploads\//i, "")}`;
  }
  if (/^(https?:\/\/|\/)/i.test(source)) return source;
  return `/${source}`;
}

function getInternalHref(value: string | null | undefined, fallback: string): string {
  const href = value?.trim();
  return href && (href.startsWith("/") || href.startsWith("#")) && !href.startsWith("//")
    ? href
    : fallback;
}

function formatMetric(value: string, progress: number): string {
  const match = value.match(/^(\D*?)(\d+(?:\.\d+)?)(.*)$/);
  if (!match) return value;
  const decimals = match[2].includes(".") ? match[2].split(".")[1].length : 0;
  return `${match[1]}${(Number(match[2]) * progress).toFixed(decimals)}${match[3]}`;
}

export default function Home({ settings, services, testimonials }: HomeProps) {
  const [metricProgress, setMetricProgress] = useState(0);
  const metricsRef = useRef<HTMLDivElement>(null);
  const metrics = parseMetrics(settings?.heroTrustTags ?? null);
  const aboutHighlights = parseCards(settings?.aboutHighlights ?? null, [
    { title: "2024", summary: "Founded" },
    { title: "Global", summary: "Global delivery" },
  ]);
  const aboutFeatureCards = parseCards(settings?.aboutFeatureCards ?? null, [
    {
      title: "Global Client Support",
      summary: "Reliable coverage for teams working across regions and time zones.",
    },
    {
      title: "Operations & IT Consulting",
      summary: "Connect back-office support with IT guidance and technology care.",
    },
    {
      title: "Smooth Transitions",
      summary: "Start engagements with clear knowledge transfer and careful handover.",
    },
    {
      title: "Dedicated Operations Teams",
      summary: "Skilled teams take ownership of daily work and service commitments.",
    },
    {
      title: "Training & Development",
      summary: "Ongoing learning and certification keep skills current.",
    },
    {
      title: "Flexible, Trained Teams",
      summary: "Add trained specialists as needs change, with quality built in.",
    },
  ]);
  const whyCards = parseCards(settings?.whyClientsCards ?? null, [
    {
      title: "Scalable Teams",
      summary: "Add trained capacity as your workload and business needs grow.",
    },
    {
      title: "Cost Effective Delivery",
      summary: "Reliable operational support designed to make resources go further.",
    },
    {
      title: "Structured Processes",
      summary: "Consistent workflows, clear ownership, and quality checkpoints.",
    },
    {
      title: "Management Visibility & Reporting",
      summary: "Actionable reporting that keeps performance and outcomes in view.",
    },
  ]);
  const heroMedia = getMediaSource(settings?.heroBackgroundImagePath);
  const heroMediaIsVideo = Boolean(heroMedia && /\.(mp4|webm|ogg|mov|avi|mkv)(?:\?.*)?$/i.test(heroMedia));
  const homepageServices = services.slice(0, 5);
  const useHeroTitleParts =
    !settings?.heroTitle ||
    Boolean(settings.heroTitleAccent || settings.heroTitleSuffix);
  const serviceIcons = [BarChart3, LineChart, Wrench, Cog, Car, Sparkles];
  const featureIcons = [Globe, Building2, CheckCircle2, Users, GraduationCap, Sparkles];
  const whyIcons = [Users, BarChart3, Cog, LineChart];

  useEffect(() => {
    const metricsElement = metricsRef.current;
    if (!metricsElement) return;

    let frameId: number | null = null;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;

        if (frameId !== null) cancelAnimationFrame(frameId);

        if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
          setMetricProgress(1);
          return;
        }

        setMetricProgress(0);
        const startTime = performance.now();
        const duration = 1600;

        const animate = (time: number) => {
          const progress = Math.min((time - startTime) / duration, 1);
          setMetricProgress(progress);

          if (progress < 1) {
            frameId = requestAnimationFrame(animate);
          } else {
            frameId = null;
          }
        };

        frameId = requestAnimationFrame(animate);
      },
      { threshold: 0 },
    );

    observer.observe(metricsElement);

    return () => {
      observer.disconnect();
      if (frameId !== null) cancelAnimationFrame(frameId);
    };
  }, []);

  const scrollToNextSection = () => {
    const section = document.getElementById("about-pinnacle");
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="relative w-full flex flex-col bg-slate-950 text-white">
      {/* ========================================================= */}
      {/* 1. HERO SECTION */}
      {/* ========================================================= */}
      <section className="relative min-h-screen w-full flex flex-col justify-between overflow-hidden">
        {/* Background with layered atmospheric lighting matching the image */}
        <div className="absolute inset-0 z-0">
          {heroMedia && !heroMediaIsVideo ? (
            <div
              aria-hidden="true"
              className="absolute inset-0 bg-cover bg-center brightness-[0.45] contrast-[1.1]"
              style={{ backgroundImage: `url("${heroMedia}")` }}
            />
          ) : (
            <video
              autoPlay
              muted
              loop
              playsInline
              preload="metadata"
              poster="/welcoming-moments.png"
              aria-hidden="true"
              className="absolute inset-0 h-full w-full object-cover object-center brightness-[0.45] contrast-[1.1]"
            >
              <source
                src={heroMediaIsVideo ? heroMedia ?? undefined : "/office.mp4"}
                type={heroMediaIsVideo ? undefined : "video/mp4"}
              />
            </video>
          )}

          {/* Left warm amber/cognac lighting overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#d97706]/25 via-slate-950/60 to-[#1e3a8a]/40 mix-blend-screen pointer-events-none" />

          {/* Right deep navy blue gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-l from-[#0f2854]/80 via-transparent to-transparent pointer-events-none" />

          {/* Global cinematic dark vignette and smoothing layer */}
          <div className="absolute inset-0 bg-slate-950/50 backdrop-blur-[1px] pointer-events-none" />
        </div>

        {/* Main Hero Content */}
        <div className="relative z-10 flex-1 flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8 text-center pt-32 pb-2">
          <div className="mx-auto flex flex-col items-center">
            {settings?.heroTagline ? (
              <p className="mb-4 text-xs font-semibold uppercase tracking-[0.22em] text-orange-300 sm:text-sm">
                {settings.heroTagline}
              </p>
            ) : null}
            {/* Main Headline */}
            <h1 className="max-w-6xl font-serif font-bold text-white tracking-tight leading-[1.08] text-3xl sm:text-5xl md:text-8xl drop-shadow-md">
              {useHeroTitleParts ? (
                <>
                  {settings?.heroTitle || "Make complex work"}
                  <span className="text-[#e36a1e] italic">
                    {" "}{settings?.heroTitleAccent || "simpler"}
                  </span>
                  {" "}{settings?.heroTitleSuffix || "and more effective"}
                </>
              ) : (
                settings.heroTitle
              )}
            </h1>

            {/* Subtitle Paragraph */}
            <p className="mt-2 sm:mt-5 text-slate-200/90 text-sm sm:text-base md:text-lg font-light leading-relaxed tracking-wide drop-shadow max-w-4xl">
              {settings?.heroDescription ||
                "Pinnacle Serve helps organizations improve how work gets done through practical operational and technology support. Our teams bring together people, processes, and technology to strengthen service, efficiency, and growth."}
            </p>
          </div>
        </div>

        <div className="relative z-10 w-full px-6 pb-8 sm:px-10 lg:px-16">
          <div className="mx-auto max-w-7xl">
            <div className="mb-6 flex justify-center">
              <Link
                href={getInternalHref(settings?.heroButtonHref, "#our-services")}
                className="group inline-flex items-center gap-2.5 rounded-full bg-[#e36a1e] px-7 py-3.5 text-sm font-semibold text-white shadow-lg shadow-orange-950/40 transition-all duration-200 hover:bg-[#cc5c15] hover:shadow-orange-500/30 sm:text-base"
              >
                <span>{settings?.heroButtonLabel || "Explore Services"}</span>
                <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </Link>
            </div>
            {metrics.length ? (
              <>
                <p className="mb-3 text-xs font-semibold uppercase tracking-[0.22em] text-slate-300/80">
                  Trust Metrics
                </p>
                <div
                  ref={metricsRef}
                  className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6"
                >
                  {metrics.map((metric) => (
                <div
                  key={metric.key}
                  className="min-h-32 rounded-[22px] border border-blue-500 bg-slate-900/80 p-4 sm:p-5"
                >
                  <p className="text-3xl font-semibold leading-tight text-white sm:text-4xl">
                    {formatMetric(metric.value, metricProgress)}
                  </p>
                  <p className="mt-2 text-sm font-medium leading-snug text-orange-500">
                    {metric.key}
                  </p>
                </div>
                  ))}
                </div>
              </>
            ) : null}
          </div>
        </div>

        {/* Hero Scroll Down Prompt */}
        <div className="relative z-20 pb-8 pr-6 sm:pr-10 lg:pr-14 flex flex-col items-end gap-2 self-end pointer-events-auto">
          <button
            onClick={scrollToNextSection}
            className="flex items-center gap-1.5 text-white/70 hover:text-white transition-colors cursor-pointer animate-bounce mr-6"
            aria-label="Explore how Pinnacle Serve works"
          >
            <ArrowDown className="w-5 h-5" strokeWidth={2.5} />
          </button>
        </div>
      </section>

      {/* ========================================================= */}
      {/* 2. ABOUT PINNACLE SERVE SECTION */}
      {/* ========================================================= */}
      <section
        id="about-pinnacle"
        className="relative w-full bg-[#030917] text-white py-24 sm:py-32 px-6 sm:px-10 lg:px-16 overflow-hidden border-t border-slate-900"
      >
        {/* Ambient lighting effects */}
        <div className="absolute top-1/4 left-10 w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[140px] pointer-events-none" />
        <div className="absolute bottom-10 right-10 w-[450px] h-[450px] bg-orange-600/10 rounded-full blur-[140px] pointer-events-none" />

        <div className="relative max-w-7xl mx-auto">
          {/* Top Row: Pill, Title, Story, and Features */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
            {/* Left Column: Story & CTA */}
            <div className="lg:col-span-5 flex flex-col items-start">
              <h2 className="font-sans text-3xl lg:text-5xl font-bold text-[#f06425] leading-tight">
                {settings?.aboutTagline || "About Pinnacle Serve"}
              </h2>
             
              <div className="relative mt-4 h-[5px] w-full overflow-hidden rounded-full bg-slate-200">
                <div className="absolute inset-0 animated-gradient-line" />
                <div className="absolute inset-y-0 shine-effect" />
              </div>

              <h3 className="mt-6 font-serif text-3xl sm:text-4xl font-bold text-white leading-[1.12]">
                {settings?.aboutTitle || "Better operations."}{" "}
                {settings?.aboutTitleAccent ? (
                  <span className="font-serif font-normal italic text-[#f06425]">
                    {settings.aboutTitleAccent}
                  </span>
                ) : settings?.aboutTitle ? null : (
                  <span className="font-serif font-normal italic text-[#f06425]">
                    Stronger outcomes.
                  </span>
                )}
              </h3>

              {/* Short Company Story */}
              <p className="mt-4 text-slate-300 text-base sm:text-lg leading-relaxed font-light">
                {settings?.aboutDescription ||
                  "Founded in 2024, Pinnacle Serve brings dependable operations and modern technology together, helping global clients make change practical, resilient, and ready to scale."}
              </p>

              {/* Story Highlights */}
              <div className="grid grid-cols-2 gap-4 my-8 w-full">
                {aboutHighlights.slice(0, 2).map((highlight, index) => (
                  <div
                    key={`${highlight.title}-${index}`}
                    className="rounded-xl border border-slate-800/80 bg-[#091526]/80 p-4"
                  >
                    <span
                      className={`font-serif text-lg font-bold ${
                        index === 0 ? "text-[#f06425]" : "text-white"
                      }`}
                    >
                      {highlight.title}
                    </span>
                    <p className="mt-1 text-xs font-medium text-slate-400">
                      {highlight.summary}
                    </p>
                  </div>
                ))}
              </div>

              {/* CTA Button */}
              <Link
                href={getInternalHref(settings?.aboutButtonHref, "/about")}
                className="group inline-flex items-center gap-2.5 bg-[#e36a1e] hover:bg-[#cc5c15] active:scale-[0.98] text-white font-semibold text-sm sm:text-base px-7 py-3.5 rounded-full shadow-lg shadow-orange-950/40 hover:shadow-orange-500/30 transition-all duration-200 cursor-pointer"
              >
                <span>{settings?.aboutButtonLabel || "Meet Pinnacle Serve"}</span>
                <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </Link>
            </div>

            {/* Right Column: Key Operational Pillars */}
            <div className="lg:col-span-7 flex flex-col justify-center">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {aboutFeatureCards.map((card, index) => {
                  const Icon = featureIcons[index % featureIcons.length];
                  return (
                    <div
                      key={`${card.title}-${index}`}
                      className="group rounded-2xl border border-slate-800/80 bg-[#091526]/85 p-5 transition-all hover:border-slate-700/80 sm:p-6"
                    >
                      <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl border border-orange-500/20 bg-orange-500/10 text-[#f06425] transition-transform group-hover:scale-105">
                        <Icon className="h-5 w-5" />
                      </div>
                      <h3 className="text-base font-semibold text-white transition-colors group-hover:text-amber-400">
                        {card.title}
                      </h3>
                      {card.summary ? (
                        <p className="mt-2 text-xs leading-relaxed text-slate-400 sm:text-sm">
                          {card.summary}
                        </p>
                      ) : null}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================= */}
      {/* 3. OUR SERVICES SECTION */}
      {/* ========================================================= */}
      <section
        id="our-services"
        className="relative w-full bg-[#050f21] text-white py-24 sm:py-32 px-6 sm:px-10 lg:px-16 overflow-hidden border-t border-slate-900"
      >
        {/* Ambient atmospheric gradients */}
        <div className="absolute top-1/3 -right-20 w-[550px] h-[550px] bg-blue-600/10 rounded-full blur-[160px] pointer-events-none" />
        <div className="absolute -bottom-10 -left-20 w-[450px] h-[450px] bg-orange-600/10 rounded-full blur-[140px] pointer-events-none" />

        <div className="relative max-w-7xl mx-auto">
          {/* Section Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16 pb-10 border-b border-slate-800/60">
            <div>
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#f06425]/40 bg-[#f06425]/10 text-[#f06425] text-xs font-semibold tracking-wider uppercase mb-5 shadow-sm">
                <span className="w-1.5 h-1.5 rounded-full bg-[#f06425]" />
                <span>{settings?.serviceSectionTagline || "How We Help"}</span>
              </div>
              <h2 className="font-serif text-3xl lg:text-5xl font-bold text-white tracking-tight leading-[1.12]">
                {settings?.serviceSectionTitle || "Support for"}{" "}
                <span className="font-serif font-normal italic text-[#f06425]">
                  {settings?.serviceSectionAccent || "Everyday Progress"}
                </span>
              </h2>
            </div>
            <p className="text-slate-300 text-sm sm:text-base max-w-md font-light leading-relaxed">
              {settings?.serviceSectionDescription ||
                "Practical services that help teams work accurately, respond faster, and grow with confidence."}
            </p>
          </div>

          {/* Service Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {homepageServices.map((service, index) => {
              const Icon = serviceIcons[index % serviceIcons.length];
              return (
                <Link
                  key={service.id}
                  id={index === 0 ? "service-back-office" : `service-${service.id}`}
                  href={`/service/${service.id}`}
                  className={`group relative flex flex-col justify-between rounded-2xl border border-slate-800/80 bg-[#091526]/85 p-7 shadow-sm transition-all duration-300 hover:border-slate-700/80 hover:bg-[#0c1d36] hover:shadow-xl hover:shadow-blue-950/30 sm:p-8 ${
                    homepageServices.length === 5 && index === 4
                      ? "md:col-span-2 lg:col-span-2"
                      : ""
                  }`}
                >
                  <div>
                    <div className="mb-6 flex items-center justify-between">
                      <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-orange-500/20 bg-orange-500/10 text-[#f06425] transition-transform group-hover:scale-105">
                        <Icon className="h-6 w-6" />
                      </div>
                      <span className="font-mono text-xs font-semibold tracking-wider text-slate-500 group-hover:text-slate-400">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                    </div>
                    <h3 className="mb-3 text-xl font-semibold tracking-tight text-white transition-colors group-hover:text-amber-400">
                      {service.title}
                    </h3>
                    <p className="text-sm font-light leading-relaxed text-slate-400 sm:text-[15px]">
                      {service.shortDescription}
                    </p>
                  </div>
                  <div className="flex items-center pt-8 text-xs font-medium text-slate-400 transition-colors group-hover:text-[#f06425]">
                    <span>Explore this service</span>
                    <ArrowUpRight className="ml-1.5 h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                  </div>
                </Link>
              );
            })}
          </div>

          {/* CTA Button */}
          <div className="mt-14 flex items-center justify-center">
            <Link
              href={getInternalHref(settings?.serviceSectionCtaHref, "/contact")}
              className="group inline-flex items-center gap-2.5 bg-[#e36a1e] hover:bg-[#cc5c15] active:scale-[0.98] text-white font-semibold text-sm sm:text-base px-8 py-3.5 rounded-full shadow-lg shadow-orange-950/40 hover:shadow-orange-500/30 transition-all duration-200 cursor-pointer"
            >
              <span>{settings?.serviceSectionCtaLabel || "See How We Can Help"}</span>
              <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </Link>
          </div>
        </div>
      </section>

      {/* ========================================================= */}
      {/* 4. WHY CHOOSE PINNACLE SERVE */}
      {/* ========================================================= */}
      <section
        id="why-choose-us"
        className="relative w-full bg-[#030917] text-white py-20 sm:py-24 px-6 sm:px-10 lg:px-16 border-t border-slate-800/70"
      >
        <div className="relative max-w-7xl mx-auto">
          <div className="mb-12 sm:mb-14">
            <p className="text-xs font-semibold tracking-[0.2em] text-[#f06425] uppercase mb-3">
              {settings?.whyClientsTagline || "Why Pinnacle Serve"}
            </p>
            <h2 className="font-serif text-3xl lg:text-5xl font-bold tracking-tight text-white">
              {settings?.whyClientsTitle || "Built Around Your Priorities"}
            </h2>
            {settings?.whyClientsDescription ? (
              <p className="mt-4 max-w-2xl text-sm leading-relaxed text-slate-400 sm:text-base">
                {settings.whyClientsDescription}
              </p>
            ) : null}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 divide-y sm:divide-y-0 sm:divide-x divide-slate-800/80">
            {whyCards.map((card, index) => {
              const Icon = whyIcons[index % whyIcons.length];
              return (
                <div
                  key={`${card.title}-${index}`}
                  className="py-6 sm:px-6 sm:py-2 first:pl-0 last:pr-0"
                >
                  <Icon
                    className="mb-5 h-6 w-6 text-orange-400"
                    aria-hidden="true"
                  />
                  <h3 className="text-lg font-semibold text-white">{card.title}</h3>
                  {card.summary ? (
                    <p className="mt-2 text-sm leading-relaxed text-slate-400">
                      {card.summary}
                    </p>
                  ) : null}
                </div>
              );
            })}
          </div>
        </div>
      </section>



      {/* ========================================================= */}
      {/* 5. CLIENT PRAISE / TESTIMONIALS SECTION */}
      {/* ========================================================= */}
      {testimonials.length ? (
      <section className="relative w-full bg-[#040d1a] text-white py-24 sm:py-32 px-6 sm:px-10 lg:px-16 overflow-hidden border-t border-slate-900">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-blue-900/10 rounded-full blur-[160px] pointer-events-none" />

        <div className="relative max-w-7xl mx-auto">
          {/* Section Heading */}
          <div className="flex flex-col items-center text-center mb-16 sm:mb-20">
            <div className="inline-flex items-center px-4 py-1.5 rounded-full border border-orange-500/30 bg-orange-500/10 text-[#f06425] text-xs font-semibold tracking-wider uppercase mb-5">
              {settings?.homeTestimonialsTagline || "Client Perspectives"}
            </div>
            <h2 className="font-serif text-3xl lg:text-5xl font-bold tracking-tight text-white">
              {settings?.homeTestimonialsTitle || "Partnerships That"}{" "}
              <span className="text-[#f06425] italic font-serif">
                {settings?.homeTestimonialsAccent || "Move Work Forward"}
              </span>
            </h2>
            <p className="mt-4 text-slate-400 text-sm sm:text-base max-w-xl font-light">
              {settings?.homeTestimonialsDescription ||
                "Hear from leaders working across financial services, healthcare, telecom, and retail."}
            </p>
          </div>

          {/* Testimonials Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
            {testimonials.map((t) => (
              <div
                key={t.id}
                className="group relative bg-[#091526]/80 hover:bg-[#0c1d36] border border-slate-800/80 hover:border-slate-700 rounded-2xl p-7 sm:p-9 transition-all duration-300 shadow-lg flex flex-col justify-between"
              >
                <div className="mb-6">
                  {t.tag ? (
                    <p className="mb-3 text-xs font-semibold uppercase tracking-[0.16em] text-orange-300">
                      {t.tag}
                    </p>
                  ) : null}
                  <Quote className="w-8 h-8 text-[#f06425]/40 mb-4" />
                  <p className="text-slate-200 text-base sm:text-lg leading-relaxed font-light">
                    &ldquo;{t.content}&rdquo;
                  </p>
                </div>

                <div className="flex items-center gap-4 pt-4 border-t border-slate-800/60">
                  <div aria-hidden="true" className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-full border border-orange-400/30 bg-gradient-to-br from-orange-400/25 to-blue-500/25 text-xs font-semibold tracking-wide text-orange-100">
                    {t.name
                      .split(/\s+/)
                      .slice(0, 2)
                      .map((part) => part[0])
                      .join("")
                      .toUpperCase()}
                  </div>
                  <div>
                    <h5 className="text-white font-semibold text-sm sm:text-base">
                      {t.name}
                    </h5>
                    <p className="text-slate-400 text-xs sm:text-sm font-light">
                      {[t.designation, t.company].filter(Boolean).join(" · ")}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      ) : null}
    </div>
  );
}
