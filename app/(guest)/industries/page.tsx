import type { Metadata } from "next";
import { connection } from "next/server";
import Link from "next/link";
import {
  ArrowRight,
  ArrowUpRight,
  BarChart3,
  Boxes,
  BriefcaseBusiness,
  Network,
  UsersRound,
} from "lucide-react";
import { getIndustryNavigation } from "@/lib/industry-data";

export const metadata: Metadata = {
  title: "Industries | Pinnacle Serve",
  description:
    "Explore the industries Pinnacle Serve supports with practical operations and technology services.",
};

const legacyIndustries = [
  { name: "Healthcare", slug: "healthcare" },
  { name: "Banking", slug: "banking" },
  { name: "Telecom", slug: "telecom" },
  { name: "Retail", slug: "retail" },
  { name: "Manufacturing", slug: "manufacturing" },
];

const industryIcons = [BriefcaseBusiness, BarChart3, Network, Boxes, UsersRound];

export default async function IndustriesPage() {
  await connection();
  const industries = (await getIndustryNavigation()) ?? legacyIndustries;

  return (
    <div className="w-full bg-white text-slate-900">
      <section className="relative isolate overflow-hidden border-b border-white/10 bg-[#101a2d] px-6 pb-16 pt-32 text-white sm:px-10 sm:pb-20 sm:pt-36 lg:px-16 lg:pb-24">
        <div
          aria-hidden="true"
          className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_78%_22%,rgba(232,121,36,0.2),transparent_35%),linear-gradient(115deg,#101a2d_12%,#172f53_100%)]"
        />
        <div className="mx-auto max-w-7xl">
          <nav aria-label="Breadcrumb" className="mb-9 text-sm text-white/65">
            <Link href="/" className="transition hover:text-white">
              Home
            </Link>
            <span className="mx-2 text-white/35">/</span>
            <span aria-current="page" className="text-orange-300">
              Industries
            </span>
          </nav>

          <div className="flex flex-col gap-8 sm:flex-row sm:items-end sm:justify-between">
            <div className="max-w-3xl">
              <p className="text-xs font-semibold tracking-[0.18em] text-orange-300 uppercase">
                Industry experience
              </p>
              <h1 className="mt-5 font-serif text-4xl leading-tight font-semibold tracking-tight sm:text-5xl lg:text-6xl">
                Expertise shaped around
                <span className="mt-2 block font-normal italic text-orange-300">
                  your industry.
                </span>
              </h1>
              <p className="mt-6 max-w-2xl text-base leading-7 text-white/75 sm:text-lg sm:leading-8">
                Explore how our industry-aware teams combine operational
                expertise, technology, and thoughtful delivery to support
                meaningful progress.
              </p>
            </div>
            <div className="flex shrink-0 flex-col items-start gap-4 sm:items-end">
              <p className="text-sm text-white/60">
                {industries.length}{" "}
                {industries.length === 1 ? "industry" : "industries"} to explore
              </p>
              <Link
                href="/contact"
                className="group inline-flex min-h-12 items-center gap-3 rounded-full bg-[#e87924] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#d66d1e]"
              >
                Talk to our team
                <ArrowUpRight className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden="true" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section
        aria-labelledby="industry-list-title"
        className="bg-[#f7f8fb] px-6 py-16 sm:px-10 sm:py-20 lg:px-16"
      >
        <div className="mx-auto max-w-7xl">
          <div className="mb-10 flex flex-col gap-4 border-b border-slate-200 pb-7 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-xs font-semibold tracking-[0.18em] text-orange-700 uppercase">
                Where we work
              </p>
              <h2
                id="industry-list-title"
                className="mt-3 font-serif text-3xl font-semibold text-[#142b58] sm:text-4xl"
              >
                Industries we support
              </h2>
            </div>
            <p className="max-w-lg text-sm leading-6 text-slate-600 sm:text-right">
              Discover the challenges, solutions, and capabilities relevant to
              your business.
            </p>
          </div>

          {industries.length ? (
            <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
              {industries.map((industry, index) => {
                const Icon = industryIcons[index % industryIcons.length];

                return (
                  <Link
                    key={industry.slug}
                    href={`/industries/${industry.slug}`}
                    className="group flex min-h-64 flex-col justify-between rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition duration-300 hover:-translate-y-1 hover:border-orange-200 hover:shadow-lg sm:p-7"
                  >
                    <div>
                      <div className="mb-7 flex items-center justify-between">
                        <span className="flex size-12 items-center justify-center rounded-xl border border-orange-200 bg-orange-50 text-orange-700 transition group-hover:bg-orange-100">
                          <Icon className="size-5" aria-hidden="true" />
                        </span>
                        <span className="font-mono text-xs font-semibold tracking-wider text-slate-400">
                          {String(index + 1).padStart(2, "0")}
                        </span>
                      </div>
                      <h3 className="text-xl font-semibold tracking-tight text-[#142b58] transition-colors group-hover:text-orange-700">
                        {industry.name}
                      </h3>
                      <p className="mt-3 text-sm leading-6 text-slate-600">
                        Explore the challenges, solutions, and capabilities
                        behind our work in {industry.name.toLowerCase()}.
                      </p>
                    </div>
                    <span className="mt-7 inline-flex items-center gap-2 text-sm font-semibold text-orange-700">
                      Explore industry
                      <ArrowRight
                        className="size-4 transition-transform group-hover:translate-x-1"
                        aria-hidden="true"
                      />
                    </span>
                  </Link>
                );
              })}
            </div>
          ) : (
            <div className="rounded-2xl border border-slate-200 bg-white px-6 py-12 text-center sm:px-10">
              <BriefcaseBusiness className="mx-auto size-8 text-orange-600" aria-hidden="true" />
              <h3 className="mt-4 text-lg font-semibold text-[#142b58]">
                Industry pages are coming soon
              </h3>
              <p className="mt-2 text-sm leading-6 text-slate-600">
                Please check back soon or get in touch with our team.
              </p>
              <Link
                href="/contact"
                className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-orange-700 transition hover:text-orange-800"
              >
                Contact us <ArrowUpRight className="size-4" aria-hidden="true" />
              </Link>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
