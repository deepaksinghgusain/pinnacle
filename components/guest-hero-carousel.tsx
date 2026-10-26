"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, CheckCircle2 } from "lucide-react";

import { Button } from "@/components/ui/button";

const heroVideoSrc = new URL("../images/hero1.mp4", import.meta.url).toString();
const videoExtensions = new Set(["mp4", "webm", "ogg", "mov", "avi", "mkv"]);

function isVideoSource(src: string) {
  const extension = src.split("?")[0].split(".").pop()?.toLowerCase();
  return videoExtensions.has(extension ?? "");
}

type MetricItem = {
  key: string;
  value: string;
};

const metricFallbacks: MetricItem[] = [
  { key: "Team Members", value: "48" },
  { key: "Happy Customers", value: "120" },
  { key: "Operational Support", value: "24" },
];

function parseMetricList(
  value: string | null | undefined,
  fallback: MetricItem[],
) {
  if (!value) return fallback;

  const trimmed = value.trim();
  if (!trimmed) return fallback;

  try {
    const parsed = JSON.parse(trimmed);
    if (Array.isArray(parsed)) {
      return parsed
        .map((item) => ({
          key: String(item?.key ?? item?.title ?? item?.label ?? "").trim(),
          value: item?.value,
        }))
        .filter((item) => item.key && item.value);
    }
  } catch {
    // fall through
  }

  return fallback;
}

function AnimatedCounter({
  value,
  suffix,
  active,
}: {
  value: number | string;
  suffix: string;
  active: boolean;
}) {
  const [displayValue, setDisplayValue] = React.useState(0);

  const numericValue = typeof value === "number" ? value : Number(value);

  React.useEffect(() => {
    if (!active || Number.isNaN(numericValue)) return;

    let frame = 0;
    const duration = 1400;
    const start = performance.now();

    const tick = (now: number) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);

      setDisplayValue(numericValue * eased);

      if (progress < 1) {
        frame = requestAnimationFrame(tick);
      }
    };

    frame = requestAnimationFrame(tick);

    return () => cancelAnimationFrame(frame);
  }, [active, numericValue]);

  const formatted =
    numericValue % 1 === 0
      ? Math.round(displayValue).toString()
      : displayValue.toFixed(2);

  return (
    <span className="tabular-nums">
      {Number.isNaN(numericValue) ? value : formatted}
      {suffix}
    </span>
  );
}

type HeroSettings = {
  heroTagline?: string | null;
  heroBackgroundImagePath?: string | null;
  heroTitle?: string | null;
  heroDescription?: string | null;
  heroTrustTags?: string | null;
};

type BannerItem = {
  id: string;
  image: string;
  tagline: string;
  description: string;
  status: string;
};

export function GuestHeroSection({
  settings,
  banners,
}: {
  settings?: HeroSettings;
  banners: BannerItem[];
}) {
  const [metricsVisible, setMetricsVisible] = React.useState(false);
  const [activeSlide, setActiveSlide] = React.useState(0);
  const metricsRef = React.useRef<HTMLDivElement | null>(null);
  const heroTagline = settings?.heroTagline ?? "Global delivery from India";
  const heroTitle =
    settings?.heroTitle ?? "Global Business Support Services Delivered from India";
  const heroDescription =
    settings?.heroDescription ??
    "Helping organizations scale through offshore back-office operations, recovery support services, reporting, analytics, IT Services and operational excellence.";
  const heroBackgroundSrc = settings?.heroBackgroundImagePath?.trim() || heroVideoSrc;
  const heroBackgroundIsVideo = isVideoSource(heroBackgroundSrc);
  const trustMetrics = parseMetricList(settings?.heroTrustTags, metricFallbacks);
  const trustTags = [
    "US Client Delivery Experience",
    "Process-Driven Operations",
  ];

  React.useEffect(() => {
    const node = metricsRef.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => setMetricsVisible(entry.isIntersecting),
      { threshold: 0.3 },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  React.useEffect(() => {

    const timer = window.setInterval(() => {
      setActiveSlide((current) => (current + 1) % banners.length);
    }, 4500);

    return () => window.clearInterval(timer);
  }, []);

  return (
    <section className="relative isolate overflow-hidden text-white w-full">
      <div className="relative min-h-[100svh] overflow-hidden bg-slate-950">
        {heroBackgroundIsVideo ? (
          <video
            className="absolute inset-0 h-full w-full object-cover"
            src={"/api" + heroBackgroundSrc}
            autoPlay
            muted
            loop
            playsInline
            aria-hidden="true"
          />
        ) : (
          <Image
            src={"/api" + heroBackgroundSrc}
            alt=""
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
        )}

        <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/60 to-transparent " />
        <div className="absolute inset-0 bg-gradient-to-b from-slate-950/60 via-slate-950/60 to-slate-950/60" />

        <div className="relative mx-auto flex flex-col min-h-[100svh] w-full max-w-7xl items-start px-4 py-28 sm:px-6 lg:px-8 mt-8">
          <div className="grid w-full items-start gap-10 lg:grid-cols-2 grid-cols-1">
            <div className="">
              <p className="text-sm font-semibold uppercase tracking-[0.32em] text-white/65">
                {heroTagline}
              </p>

              <h1 className="mt-5 font-[family-name:var(--font-hero)] text-4xl font-bold leading-[1.08] tracking-tight text-orange-500 text-balance sm:text-4xl lg:text-6xl">
                {heroTitle}
              </h1>

              <p className="mt-5 max-w-2xl text-base leading-7 text-white/78 sm:text-xl">
                {heroDescription}
              </p>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
                <Button
                  asChild
                  size="lg"
                  className="rounded-full bg-orange-500 text-white px-6 shadow-none hover:bg-orange-600"
                >
                  <Link
                    href="/service"
                    className="inline-flex items-center gap-2"
                  >
                    Explore Services
                    <ArrowRight className="size-4" />
                  </Link>
                </Button>

                <Button
                  asChild
                  size="lg"
                  variant="outline"
                  className="rounded-full border-[#185980] px-6 bg-[#185980] text-white hover:bg-[#185980] hover:text-white"
                >
                  <Link
                    href="/career"
                    className="inline-flex items-center gap-2"
                  >
                    Join Our Team
                    <ArrowRight className="size-4" />
                  </Link>
                </Button>
              </div>
            </div>
            <div className="relative hidden lg:block">
              <div className="absolute -left-8 top-8 h-20 w-28 rounded-full bg-cyan-400/15 blur-3xl" />
              <div className="absolute -right-10 bottom-8 h-20 w-36 rounded-full bg-orange-500/10 blur-3xl" />

              <div className="relative overflow-hidden rounded-[2.25rem] ">
                <div className="relative aspect-[4/4.35] max-h-[24rem] w-full">
                  {banners
                    .filter((banner: BannerItem) => banner.status.toLowerCase() === "active")
                    .map((banner: BannerItem, index: number) => (
                      <div
                        key={banner.id}
                        className={[
                          "absolute inset-0 transition-all duration-700",
                          index === activeSlide
                            ? "translate-x-0 opacity-100"
                            : index < activeSlide
                              ? "-translate-x-full opacity-0"
                              : "translate-x-full opacity-0",
                        ].join(" ")}
                      >
                        <Image
                          src={"/api" + banner.image}
                          alt={banner.tagline}
                          fill
                          sizes="100vw"
                          priority={index === 0}
                          className="object-cover"
                        />
                        <div className="absolute inset-0 " />

                        {/* <div className="absolute inset-x-0 bottom-0 p-6">
                          <div className="rounded-[1.4rem] border border-white/12 bg-black/35 p-5 backdrop-blur-md">
                            <p className="text-xs font-semibold uppercase tracking-[0.32em] text-white/55">
                              Featured service view
                            </p>
                            <h2 className="mt-3 text-2xl font-semibold leading-tight text-white">
                              {banner.tagline}
                            </h2>
                            <p className="mt-3 text-sm leading-6 text-white/78">
                              {banner.description}
                            </p>
                          </div>
                        </div> */}
                      </div>
                    ))}
                </div>

                <div className="absolute inset-x-0 bottom-1 flex justify-center gap-2 px-4">
                  {banners.filter((banner: BannerItem) => banner.status.toLowerCase() === "active").map((banner: BannerItem, index: number) => (
                    <button
                      key={banner.id}
                      type="button"
                      aria-label={`Show slide ${index + 1}: ${banner.tagline}`}
                      className={[
                        "h-2.5 rounded-full transition-all duration-300",
                        index === activeSlide
                          ? "w-8 bg-white"
                          : "w-2.5 bg-white/45 hover:bg-white/70",
                      ].join(" ")}
                      onClick={() => setActiveSlide(index)}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
          <div ref={metricsRef} className="col-span-2 mt-4 w-full">
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.3em] text-white/55">
              Trust Metrics
            </p>
            <div className="grid gap-3 md:grid-cols-6 grid-cols-1">
              {trustMetrics.map((metric) => {

                const value = typeof metric.value === "string" ? metric.value.split(" ") : [metric.value];

                const first = Number(value[0])

                return (
                  <div
                    key={metric.key}
                    className="rounded-2xl border border-blue-500 bg-white/8 px-4 py-4 backdrop-blur w-full"
                  >
                    <div className="text-3xl font-semibold tracking-tight text-white sm:text-[2rem]">
                      {
                        isFinite(first) ? <AnimatedCounter
                          value={value[0]}
                          suffix={value[1]}
                          active={metricsVisible}
                        /> : value.join(" ")
                      }
                    </div>
                    <p className="mt-1 text-sm font-medium text-orange-500">
                      {metric.key}
                    </p>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}






