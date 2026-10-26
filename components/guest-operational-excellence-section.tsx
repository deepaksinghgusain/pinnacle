import Link from "next/link";
import { ArrowRight, CheckCircle2 } from "lucide-react";

import { Button } from "@/components/ui/button";

function parseList(value: string | null | undefined, fallback: string[]) {
  if (!value) return fallback;

  const trimmed = value.trim();
  if (!trimmed) return fallback;

  try {
    const parsed = JSON.parse(trimmed);
    if (Array.isArray(parsed)) {
      return parsed.map((item) => String(item).trim()).filter(Boolean);
    }
  } catch {
    // fall through
  }

  return trimmed.split(",").map((item) => item.trim()).filter(Boolean);
}

export function GuestOperationalExcellenceSection({ settings }: { settings?: any }) {
  const aboutTagline = settings?.aboutTagline ?? "About Pinnacle";
  const aboutTitle =
    settings?.aboutTitle ??
    "A focused operating model built for scale, quality, and steady delivery.";
  const aboutDescription =
    settings?.aboutDescription ??
    "We combine back-office operations, IT consulting, and support services into a lean delivery model designed to help global clients move faster without sacrificing quality.";
  const aboutButtons = parseList(settings?.aboutButtons, [
    "Transition",
    "Operations",
    "Training",
    "Scalability",
  ]);
  const deliveryModelTitle = settings?.deliveryModelTitle ?? "Delivery model";
  const deliveryModelItems = parseList(settings?.deliveryModelItems, [
    "Founded in 2024",
    "Supporting global clients",
    "Backoffice Operations with IT Consulting & Support",
    "Specialized Transition team",
    "Specialized operational support teams",
    "Specialized Training & Development team",
    "Trained agents available as factory model",
    "Focus on quality and scalability",
  ]);

  return (
    <section className="relative isolate overflow-hidden bg-white py-14 text-slate-900 sm:py-16">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(59,130,246,0.50),transparent_52%),radial-gradient(circle_at_80%_20%,rgba(168,85,247,0.50),transparent_58%),radial-gradient(circle_at_bottom_right,rgba(16,185,129,0.78),transparent_54%)]" />
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mt-5 grid gap-8 lg:grid-cols-[1.02fr_0.98fr] lg:items-start lg:gap-16 xl:gap-20">
          <div className="max-w-2xl">
            <div className="inline-block">
              <h2 className="text-3xl font-semibold tracking-tight text-orange-500 sm:text-4xl lg:text-5xl">
                {aboutTagline}
              </h2>

              <div className="relative mt-4 h-[5px] w-full overflow-hidden rounded-full bg-slate-200">
                <div className="absolute inset-0 animated-gradient-line" />
                <div className="absolute inset-y-0 shine-effect" />
              </div>
            </div>

            <h2 className="mt-8 text-2xl font-semibold tracking-tight text-balance text-[#185980] sm:text-3xl lg:text-4xl">
              {aboutTitle}
            </h2>
            <p className="mt-5 max-w-xl text-base leading-7 text-slate-600 sm:text-lg">
              {aboutDescription}
            </p>

            <div className="mt-8 flex flex-wrap gap-2">
              {aboutButtons.map((pill) => (
                <span
                  key={pill}
                  className="inline-flex items-center rounded-full border border-[#185980] px-4 py-2 text-sm font-medium text-[#185980] shadow-[0_8px_24px_rgba(15,23,42,0.04)] hover:bg-[#185980] hover:text-white"
                >
                  {pill}
                </span>
              ))}
            </div>

            <div className="mt-8">
              <Button
                render={
                  <Link href="/about" className="inline-flex items-center gap-2">
                    Learn More About Us
                    <ArrowRight className="size-4" />
                  </Link>
                }
                size="lg"
                variant="default"
                className="rounded-full bg-orange-500 px-6 shadow-sm hover:bg-orange-600"
              />
            </div>
          </div>

          <div className="relative">
            <div className="absolute -left-4 top-8 h-24 w-24 rounded-full bg-sky-200/40 blur-3xl" />
            <div className="absolute -right-8 bottom-4 h-28 w-28 rounded-full bg-violet-200/35 blur-3xl" />

            <div className="relative rounded-[1rem] border border-slate-200 bg-white p-4 shadow-[0_20px_70px_rgba(15,23,42,0.08)] backdrop-blur-xl sm:p-5">
              <p className="text-xl font-bold uppercase tracking-[0.34em] text-[#185980]">
                {deliveryModelTitle}
              </p>
              <div className="mt-4 grid gap-3">
                {deliveryModelItems.map((item) => (
                  <div
                    key={item}
                    className="flex items-start gap-3 rounded-2xl border border-[#185980] bg-white px-4 py-3"
                  >
                    <CheckCircle2 className="mt-0.5 size-5 shrink-0 text-emerald-500" />
                    <span className="text-sm leading-6 text-[#185980]">
                      {item}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
