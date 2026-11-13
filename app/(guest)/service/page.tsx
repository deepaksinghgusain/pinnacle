import type { Metadata } from "next";
import { connection } from "next/server";
import Link from "next/link";
import {
  ArrowRight,
  ArrowUpRight,
  BarChart3,
  Boxes,
  BriefcaseBusiness,
  RefreshCcw,
  Settings2,
  Wrench,
} from "lucide-react";

import { getServices } from "@/lib/actions/service-action";
import { Status } from "@/lib/types";

export const metadata: Metadata = {
  title: "Services | Pinnacle Serve",
  description:
    "Explore Pinnacle Serve's services and find practical support for your business.",
};

const serviceIcons = [
  BarChart3,
  Boxes,
  Wrench,
  RefreshCcw,
  Settings2,
  BriefcaseBusiness,
];

export default async function ServicesPage() {
  await connection();

  const allServices = await getServices();
  const services = allServices.filter(
    (service) => service.status === Status.ACTIVE,
  );

  return (
    <div className="w-full bg-[#050f21] text-white">
      <section className="relative isolate overflow-hidden border-b border-white/10 px-6 pb-16 pt-32 sm:px-10 sm:pb-20 sm:pt-36 lg:px-16">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_80%_10%,rgba(240,100,37,0.16),transparent_35%),radial-gradient(ellipse_at_10%_90%,rgba(37,99,235,0.12),transparent_40%)]" />
        <div className="absolute inset-0 -z-10 bg-[linear-gradient(rgba(255,255,255,0.025)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.025)_1px,transparent_1px)] bg-[size:48px_48px]" />

        <div className="mx-auto max-w-7xl">
          <nav aria-label="Breadcrumb" className="mb-10 text-sm text-white/55">
            <Link href="/" className="transition hover:text-white">
              Home
            </Link>
            <span className="mx-2 text-white/30">/</span>
            <span className="text-orange-300">Services</span>
          </nav>

          <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-3xl">
              <p className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-orange-300">
                <span className="h-1.5 w-1.5 rounded-full bg-orange-400" />
                What we do
              </p>
              <h1 className="mt-5 font-serif text-4xl font-semibold leading-[1.08] tracking-tight sm:text-5xl lg:text-6xl">
                Practical services.
                <span className="mt-2 block font-normal italic text-[#f06425]">
                  Progress that matters.
                </span>
              </h1>
              <p className="mt-6 max-w-2xl text-base leading-7 text-slate-300 sm:text-lg sm:leading-8">
                Explore our services and find the right expertise to help your
                team work smarter, respond faster, and move forward with
                confidence.
              </p>
            </div>

            <div className="flex shrink-0 flex-col items-start gap-4 lg:items-end">
              <p className="text-sm text-white/55">
                {services.length}{" "}
                {services.length === 1 ? "service" : "services"} to explore
              </p>
              <Link
                href="/contact"
                className="group inline-flex min-h-12 items-center gap-3 bg-[#e36a1e] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#cc5c15]"
              >
                Talk with our team
                <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section
        aria-labelledby="service-list-title"
        className="px-6 py-16 sm:px-10 sm:py-20 lg:px-16"
      >
        <div className="mx-auto max-w-7xl">
          <div className="mb-10 flex flex-col gap-4 border-b border-white/10 pb-7 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-orange-300">
                Built around your goals
              </p>
              <h2
                id="service-list-title"
                className="mt-3 font-serif text-3xl font-semibold tracking-tight sm:text-4xl"
              >
                Explore our services
              </h2>
            </div>
            <p className="max-w-lg text-sm leading-6 text-slate-400 sm:text-right">
              Thoughtful support for the challenges and opportunities shaping
              your day-to-day work.
            </p>
          </div>

          {services.length ? (
            <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
              {services.map((service, index) => {
                const Icon = serviceIcons[index % serviceIcons.length];

                return (
                  <Link
                    key={service.id}
                    href={`/service/${service.id}`}
                    className="group flex min-h-64 flex-col justify-between border border-white/10 bg-[#091526]/90 p-6 transition duration-300 hover:-translate-y-1 hover:border-orange-400/40 hover:bg-[#0c1d36] hover:shadow-xl hover:shadow-blue-950/30 sm:p-7"
                  >
                    <div>
                      <div className="mb-7 flex items-center justify-between">
                        <span className="flex h-12 w-12 items-center justify-center border border-orange-400/20 bg-orange-400/10 text-orange-300 transition group-hover:bg-orange-400/15">
                          <Icon className="h-5 w-5" aria-hidden="true" />
                        </span>
                        <span className="font-mono text-xs tracking-wider text-white/35">
                          {String(index + 1).padStart(2, "0")}
                        </span>
                      </div>
                      <h3 className="text-xl font-semibold tracking-tight text-white transition-colors group-hover:text-amber-300">
                        {service.title}
                      </h3>
                      <p className="mt-3 text-sm leading-6 text-slate-400">
                        {service.shortDescription}
                      </p>
                    </div>
                    <span className="mt-7 inline-flex items-center gap-2 text-sm font-medium text-slate-300 transition-colors group-hover:text-orange-300">
                      Explore service
                      <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </span>
                  </Link>
                );
              })}
            </div>
          ) : (
            <div className="border border-white/10 bg-[#091526]/90 px-6 py-12 text-center sm:px-10">
              <BriefcaseBusiness className="mx-auto h-8 w-8 text-orange-300" aria-hidden="true" />
              <h3 className="mt-4 text-lg font-semibold text-white">
                Services are coming soon
              </h3>
              <p className="mt-2 text-sm leading-6 text-slate-400">
                Please check back soon or get in touch with our team.
              </p>
              <Link
                href="/contact"
                className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-orange-300 transition hover:text-orange-200"
              >
                Contact us <ArrowUpRight className="h-4 w-4" />
              </Link>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
