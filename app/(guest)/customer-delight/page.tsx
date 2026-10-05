import Link from "next/link";
import {
    ArrowUpRight,
    Factory,
    HeartPulse,
    Landmark,
    Radio,
    ShoppingBag,
} from "lucide-react";

const industries = [
    {
        number: "01",
        segment: "Provider · Payer",
        name: "Healthcare",
        headline: "Faster care, cleaner revenue cycles.",
        description:
            "Agentic AI orchestrating claims, coding, prior auth, and human-in-the-loop review, with the governance clinicians and payers demand.",
        metric: "3.4×",
        metricLabel: "faster claims turnaround",
        href: "#",
        icon: HeartPulse,
        accent: "from-rose-500 to-blue-800",
        iconColor: "text-rose-600 bg-rose-50",
    },
    {
        number: "02",
        segment: "Risk · Compliance",
        name: "Banking",
        headline: "Confident decisions at enterprise scale.",
        description:
            "Unified underwriting, fraud, and compliance workflows across core banking systems, with explainable, audit-ready AI decisioning.",
        metric: "62%",
        metricLabel: "lower manual review effort",
        href: "#",
        icon: Landmark,
        accent: "from-blue-700 to-blue-900",
        iconColor: "text-blue-700 bg-blue-50",
    },
    {
        number: "03",
        segment: "Network · CX",
        name: "Telecom",
        headline: "Networks that anticipate, not just react.",
        description:
            "From field service to customer care, Agentic AI keeps networks resilient, service SLAs green, and every subscriber interaction personalised.",
        metric: "48%",
        metricLabel: "faster ticket resolution",
        href: "",
        icon: Radio,
        accent: "from-sky-500 to-blue-800",
        iconColor: "text-sky-700 bg-sky-50",
    },
    {
        number: "04",
        segment: "Commerce · Loyalty",
        name: "Retail",
        headline: "Effortless journeys, joyful shoppers.",
        description:
            "Intelligent orchestration across inventory, storefronts, and support, turning every touchpoint into a moment of measurable delight.",
        metric: "2.1×",
        metricLabel: "lift in repeat purchases",
        href: "#",
        icon: ShoppingBag,
        accent: "from-orange-500 to-blue-800",
        iconColor: "text-orange-600 bg-orange-50",
    },
    {
        number: "05",
        segment: "Operations · Quality",
        name: "Manufacturing",
        headline: "Smarter plants, uncompromising quality.",
        description:
            "Agentic AI keeps production lines humming with predictive maintenance, quality assurance, and planning that adapts in real time.",
        metric: "31%",
        metricLabel: "reduction in downtime",
        href: "#",
        icon: Factory,
        accent: "from-emerald-600 to-blue-800",
        iconColor: "text-emerald-700 bg-emerald-50",
    },
];

export default function CustomerDelightPage() {
    return (
        <main className="w-full bg-white text-slate-900">
            <section
                aria-label="Customer Delight"
                className="relative isolate flex min-h-[calc(100svh-64px)] items-center justify-center overflow-hidden bg-[#10152a] px-6 py-24 text-center text-white sm:px-10 lg:px-16"
            >
                <div aria-hidden="true" className="absolute inset-0 -z-30 overflow-hidden">
                    <video
                        autoPlay
                        muted
                        loop
                        playsInline
                        preload="metadata"
                        poster="/welcoming-moments.png"
                        className="h-full w-full object-cover object-center"
                    >
                        <source
                            src="/office.mp4"
                            type="video/mp4"
                        />
                    </video>
                </div>
                <div
                    aria-hidden="true"
                    className="absolute inset-0 -z-20 bg-[radial-gradient(at_20%_30%,rgba(232,119,34,0.28),transparent_55%),radial-gradient(at_80%_70%,rgba(27,58,143,0.45),transparent_55%),linear-gradient(rgba(16,21,42,0.35),rgba(16,21,42,0.85))]"
                />
                <div
                    aria-hidden="true"
                    className="absolute inset-0 -z-10 opacity-40 [background-image:linear-gradient(rgba(255,255,255,0.06)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.06)_1px,transparent_1px)] [background-size:64px_64px]"
                />

                <div className="mx-auto max-w-4xl pt-8">
                    <div className="inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/10 px-4 py-2 text-[11px] font-semibold tracking-[0.15em] text-white uppercase backdrop-blur-sm">
                        <span className="h-2 w-2 rounded-full bg-orange-400 shadow-[0_0_12px_rgba(251,146,60,0.9)]" />
                        Customer Delight
                    </div>
                    <h1 className="mt-7 font-serif text-4xl leading-[1.06] font-semibold text-white sm:text-5xl lg:text-6xl">
                        Real outcomes for the
                        <span className="mt-1 block font-normal italic text-[#f2a276]">
                            enterprises we serve
                        </span>
                    </h1>
                    <p className="mx-auto mt-6 max-w-2xl text-sm leading-7 text-white/85 sm:text-base">
                        From healthcare to manufacturing, our partners rely on Pinnacle Serve to turn complex operations into intelligent, resilient, and more efficient experiences, measured in real business impact.
                    </p>
                </div>
            </section>

            <section className="relative overflow-hidden bg-[#f7f8fb] px-6 py-20 sm:px-10 sm:py-24 lg:px-16">
                <div
                    aria-hidden="true"
                    className="pointer-events-none absolute -right-40 -top-48 h-[560px] w-[560px] rounded-full bg-orange-100/60 blur-[120px]"
                />
                <div className="relative mx-auto max-w-7xl">
                    <div className="mb-10 max-w-2xl sm:mb-12">
                        <span className="inline-flex rounded-full border border-orange-200 bg-orange-50 px-3.5 py-1.5 text-[11px] font-semibold tracking-[0.14em] text-orange-700 uppercase">
                            By Industry
                        </span>
                        <h2 className="mt-5 font-serif text-4xl leading-tight font-semibold text-[#142b58] sm:text-5xl">
                            Where our clients find <em className="font-normal text-[#e87924]">delight</em>
                        </h2>
                        <p className="mt-4 max-w-xl text-sm leading-7 text-slate-600 sm:text-base">
                            Every industry has its own definition of success. Explore how we create measurable customer delight across the sectors we serve.
                        </p>
                    </div>

                    <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
                        {industries.map((industry) => {
                            const Icon = industry.icon;
                            return (
                                <Link
                                    key={industry.number}
                                    href={industry.href}
                                    className="group relative flex min-h-[390px] flex-col overflow-hidden rounded-[18px] border border-slate-200 bg-gradient-to-b from-white to-[#fafbff] p-6 shadow-[0_14px_42px_rgba(20,43,88,0.06)] transition duration-300 hover:-translate-y-1 hover:border-slate-300 hover:shadow-[0_22px_54px_rgba(20,43,88,0.12)] sm:p-7"
                                >
                                    <span className={`absolute inset-x-0 top-0 h-1 bg-gradient-to-r ${industry.accent}`} />
                                    <div className="flex items-start justify-between gap-4">
                                        <span className={`flex h-12 w-12 items-center justify-center rounded-xl ${industry.iconColor}`}>
                                            <Icon className="h-5 w-5" strokeWidth={1.8} />
                                        </span>
                                        <span className={`rounded-full bg-gradient-to-br ${industry.accent} px-3 py-1.5 font-mono text-xs font-semibold text-white shadow-sm`}>
                                            {industry.number}
                                        </span>
                                    </div>

                                    <p className="mt-6 text-[10px] font-semibold tracking-[0.14em] text-slate-500 uppercase">
                                        {industry.segment}
                                    </p>
                                    <h3 className="mt-2 font-serif text-2xl font-semibold text-[#142b58] sm:text-[28px]">
                                        {industry.name}
                                    </h3>
                                    <p className="mt-3 text-sm font-semibold leading-6 text-slate-800">
                                        {industry.headline}
                                    </p>
                                    <p className="mt-2 text-sm leading-6 text-slate-600">
                                        {industry.description}
                                    </p>

                                    <div className="mt-auto flex items-end justify-between gap-4 pt-6">
                                        <div className="rounded-lg border border-orange-100 bg-gradient-to-br from-orange-50/90 to-blue-50/70 px-4 py-3">
                                            <p className={`bg-gradient-to-r ${industry.accent} bg-clip-text font-serif text-2xl font-semibold text-transparent`}>
                                                {industry.metric}
                                            </p>
                                            <p className="mt-0.5 text-[11px] leading-4 text-slate-600">
                                                {industry.metricLabel}
                                            </p>
                                        </div>
                                        <span className="inline-flex items-center gap-1.5 pb-1 text-xs font-semibold text-[#142b58] transition group-hover:text-orange-700">
                                            Read the story
                                            <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                                        </span>
                                    </div>
                                </Link>
                            );
                        })}
                    </div>
                </div>
            </section>

            <section className="px-6 py-16 sm:px-10 sm:py-20 lg:px-16">
                <div className="relative mx-auto max-w-7xl overflow-hidden rounded-2xl bg-gradient-to-br from-[#142d6b] to-[#1b3a8f] px-7 py-12 text-white shadow-[0_24px_60px_rgba(20,43,88,0.2)] sm:px-12 sm:py-14">
                    <div
                        aria-hidden="true"
                        className="pointer-events-none absolute -right-16 -top-32 h-[400px] w-[400px] rounded-full bg-orange-500/25 blur-[90px]"
                    />
                    <div className="relative flex flex-col items-start justify-between gap-8 md:flex-row md:items-center">
                        <div className="max-w-2xl">
                            <p className="text-xs font-semibold tracking-[0.16em] text-orange-200 uppercase">
                                Let&apos;s create impact
                            </p>
                            <h2 className="mt-4 font-serif text-3xl leading-tight font-semibold sm:text-4xl">
                                Ready to become our next delight story?
                            </h2>
                            <p className="mt-4 text-sm leading-6 text-white/80 sm:text-base">
                                Let&apos;s design outcomes worth talking about, measurable, scalable, and engineered for your industry.
                            </p>
                        </div>
                        <Link
                            href="/contact"
                            className="inline-flex h-12 shrink-0 items-center gap-2 rounded-full bg-gradient-to-r from-[#e87924] to-[#f2a276] px-6 text-sm font-semibold text-white shadow-lg shadow-orange-950/20 transition hover:brightness-105"
                        >
                            Talk to an expert
                            <ArrowUpRight className="h-4 w-4" />
                        </Link>
                    </div>
                </div>
            </section>
        </main>
    );
}
