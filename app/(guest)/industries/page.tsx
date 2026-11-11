import { connection } from "next/server";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { getIndustryNavigation } from "@/lib/industry-data";

const legacyIndustries = [
  { name: "Healthcare", slug: "healthcare" },
  { name: "Banking", slug: "banking" },
  { name: "Telecom", slug: "telecom" },
  { name: "Retail", slug: "retail" },
  { name: "Manufacturing", slug: "manufacturing" },
];

export default async function IndustriesPage() {
  await connection();
  const industries = (await getIndustryNavigation()) ?? legacyIndustries;

  return (
    <main className="min-h-full bg-[#030917] text-white">
      <section className="relative overflow-hidden border-b border-slate-800 bg-[#050f21] px-6 pb-16 pt-32 sm:px-10 sm:pb-20 sm:pt-36 lg:px-16">
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-[radial-gradient(ellipse_at_78%_22%,rgba(240,100,37,0.16),transparent_35%),linear-gradient(115deg,#030917_12%,#102347_100%)]"
        />
        <div className="relative mx-auto max-w-7xl">
          <p className="text-xs font-semibold tracking-[0.18em] text-[#f06425] uppercase">Industry experience</p>
          <h1 className="mt-5 max-w-4xl font-serif text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
            Solutions shaped around your industry.
          </h1>
          <p className="mt-6 max-w-2xl text-base leading-7 text-slate-300 sm:text-lg">
            Explore how operational expertise, technology, and dependable delivery support the work that matters in your sector.
          </p>
        </div>
      </section>

      <section className="px-6 py-16 sm:px-10 sm:py-20 lg:px-16">
        <div className="mx-auto grid max-w-7xl gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {industries.map((industry, index) => (
            <Link
              key={industry.slug}
              href={`/industries/${industry.slug}`}
              className="group rounded-2xl border border-slate-800/80 bg-[#091526]/85 p-7 transition-all duration-300 hover:-translate-y-1 hover:border-slate-700 hover:bg-[#0c1d36] hover:shadow-xl hover:shadow-blue-950/30"
            >
              <span className="font-mono text-xs font-semibold tracking-wider text-[#f06425]">
                {String(index + 1).padStart(2, "0")}
              </span>
              <h2 className="mt-5 font-serif text-2xl font-semibold text-white">{industry.name}</h2>
              <span className="mt-8 inline-flex items-center gap-2 text-sm font-medium text-slate-400 transition group-hover:text-[#f06425]">
                Explore industry <ArrowUpRight className="size-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden="true" />
              </span>
            </Link>
          ))}
          {industries.length === 0 ? (
            <p className="text-slate-400">Industry pages are coming soon.</p>
          ) : null}
        </div>
      </section>
    </main>
  );
}
