"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
    ArrowUpRight,
    Briefcase,
    CheckCircle2,
    Globe2,
    Info,
    Layers,
    Sparkles,
    Users,
} from "lucide-react";

const storyPoints = [
    {
        title: "Technology with a purpose",
        description:
            "We connect technology to the work that matters: better service, less manual effort, stronger controls, and more efficient operations.",
        Icon: Layers,
    },
    {
        title: "Built for real teams",
        description:
            "Good change is ambitious and usable. We build reliable, secure systems that teams can adopt, manage, and keep improving.",
        Icon: Sparkles,
    },
    {
        title: "Focused on results",
        description:
            "We shape each engagement around the needs of its industry and the results that matter most to the organization.",
        Icon: CheckCircle2,
    },
];

const leaders = [
    {
        name: "Jhon Doe",
        role: "Chairman",
        paragraphs: [
            "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since 1966, when designers at Letraset and James Mosley, the librarian at St Bride Printing Library in London, took a 1914 Cicero translation and scrambled it to make dummy text for Letraset's Body Type sheets. It has survived not only many decades, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised thanks to these sheets and more recently with desktop publishing software like Aldus PageMaker and Microsoft Word including versions of Lorem Ipsum."
        ],
    },
    {
        name: "Jhon",
        role: "CEO",
        paragraphs: [
         "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since 1966, when designers at Letraset and James Mosley, the librarian at St Bride Printing Library in London, took a 1914 Cicero translation and scrambled it to make dummy text for Letraset's Body Type sheets. It has survived not only many decades, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised thanks to these sheets and more recently with desktop publishing software like Aldus PageMaker and Microsoft Word including versions of Lorem Ipsum."
        ],
    },
];

const approachTabs = [
    {
        id: "founder",
        label: "Founder",
        Icon: Users,
        paragraphs: [],
    },
    {
        id: "what-we-do",
        label: "Our Services",
        Icon: Layers,
        paragraphs: [
            "From discovery and design through implementation and operations, we help clients spot opportunities, build platforms, automate processes, and apply AI where it can make a difference.",
            "Our capabilities span digital product and cloud engineering, managed services, automation, data, AI, and agentic AI for industry workflows.",
            "We start with the business need, then bring together the right mix of people and technology to deliver a practical solution that can scale.",
        ],
    },
    {
        id: "our-approach",
            label: "How We Work",
        Icon: Sparkles,
        paragraphs: [
            "We begin by learning how the business works today: its goals, processes, users, and systems. Then we build a plan that addresses immediate needs and supports long-term progress.",
            "Clear roadmaps, modern architecture, secure delivery, and ongoing support help turn a sound idea into a dependable solution. We include governance and human oversight where they matter.",
            "Our approach brings clarity to complex environments and helps teams move from disconnected tasks to coordinated operations.",
        ],
    },
    {
        id: "our-strengths",
        label: "Industry Experience",
        Icon: Globe2,
        paragraphs: [
            "Our work supports industries with complex, high-volume operations, including healthcare, banking, telecom, property, retail, and manufacturing.",
            "We support healthcare revenue cycle operations and governed AI; banking fraud, service, and compliance workflows; telecom network and field operations; and service, inventory, maintenance, and quality processes across other sectors.",
            "Every organization has its own workflows, risks, and priorities. We tailor our services to each industry and the results each client needs.",
        ],
    },
    {
        id: "why-clients",
        label: "Why Pinnacle Serve",
        Icon: Briefcase,
        paragraphs: [
            "Clients choose us to connect their plans to practical delivery and build solutions that fit the way their business works.",
            "Product, cloud, data, automation, AI, and ongoing support often need to work as one. Our teams coordinate those disciplines around shared goals.",
            "We focus on improvements teams can see: faster turnaround, less overhead, better service, stronger controls, and more resilient operations.",
        ],
    },
    {
        id: "our-commitment",
        label: "Our Promise",
        Icon: Info,
        paragraphs: [
            "We design for reliability, security, scale, and maintainability from the start, then stay involved to support ongoing improvement.",
            "As business needs and customer expectations change, we help organizations adapt with services that connect strong engineering to day-to-day operations.",
            "Our goal is to make work better with digital services that are useful now and ready for what comes next.",
        ],
    },
];

export default function AboutPage() {
    const [activeTab, setActiveTab] = useState("founder");
    const selectedTab = approachTabs.find((tab) => tab.id === activeTab) ?? approachTabs[0];

    return (
        <main className="w-full bg-white text-slate-900">
            <section className="relative isolate flex min-h-[560px] items-center justify-center overflow-hidden px-6 py-28 text-center text-white sm:min-h-[620px] sm:px-10 lg:px-16">
                <Image
                    src="https://images.unsplash.com/photo-1521737711867-e3b97375f902?auto=format&fit=crop&w=2400&q=85"
                    alt="A team collaborating on digital transformation"
                    fill
                    priority
                    sizes="100vw"
                    className="-z-20 object-cover object-center"
                />
                <div className="absolute inset-0 -z-10 bg-gradient-to-r from-[#302725]/80 via-[#14264a]/65 to-[#112758]/85" />
                <div className="absolute inset-0 -z-10 bg-[linear-gradient(rgba(255,255,255,0.035)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.035)_1px,transparent_1px)] bg-[size:42px_42px]" />

                <div className="relative mx-auto max-w-4xl pt-8">
                    <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-[11px] font-semibold tracking-[0.16em] text-white/90 uppercase backdrop-blur-sm">
                        <span className="h-1.5 w-1.5 rounded-full bg-orange-400" />
                        About Pinnacle Serve
                    </div>
                    <h1 className="mt-7 font-serif text-4xl leading-[1.08] font-semibold text-white sm:text-5xl lg:text-6xl">
                        Practical change for
                        <span className="mt-1 block font-normal text-[#f0a16d] italic">complex operations</span>
                    </h1>
                    <p className="mx-auto mt-6 max-w-2xl text-sm leading-7 text-white/85 sm:text-base">
                        We bring operational support and modern technology together to help organizations improve service, simplify work, and grow with confidence.
                    </p>
                </div>
            </section>

            <section className="relative overflow-hidden bg-[#f8f9fc] px-6 py-20 sm:px-10 sm:py-24 lg:px-16">
                <div className="pointer-events-none absolute -right-28 -top-40 h-[560px] w-[560px] rounded-full bg-orange-100/60 blur-[120px]" />
                <div className="relative mx-auto max-w-7xl">
                    <div className="max-w-3xl">
                        <p className="text-xs font-semibold tracking-[0.18em] text-orange-600 uppercase">Our Story</p>
                        <h2 className="mt-4 font-serif text-4xl leading-tight font-semibold text-[#142b58] sm:text-5xl">
                            A partner for meaningful progress
                        </h2>
                        <p className="mt-6 text-base leading-7 text-slate-600">
                            Founded in 2024, Pinnacle Serve helps global clients connect reliable operations with practical technology delivery.
                        </p>
                    </div>

                    <div className="mt-12 grid gap-5 md:grid-cols-3">
                        {storyPoints.map(({ title, description, Icon }, index) => (
                            <article key={title} className="group border-t-2 border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:border-orange-400 hover:shadow-lg sm:p-7">
                                <span className={`flex h-11 w-11 items-center justify-center rounded-xl ${index === 0 ? "bg-blue-50 text-blue-700" : index === 1 ? "bg-orange-50 text-orange-700" : "bg-teal-50 text-teal-700"}`}>
                                    <Icon className="h-5 w-5" />
                                </span>
                                <h3 className="mt-5 text-lg font-semibold text-[#142b58]">{title}</h3>
                                <p className="mt-3 text-sm leading-6 text-slate-600">{description}</p>
                            </article>
                        ))}
                    </div>
                </div>
            </section>

            <section id="pinnacle-approach" className="px-6 py-20 sm:px-10 sm:py-24 lg:px-16">
                <div className="mx-auto max-w-7xl">
                    <div className="mb-10 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
                        <div>
                            <p className="text-xs font-semibold tracking-[0.18em] text-orange-600 uppercase">How We Work</p>
                            <h2 className="mt-4 font-serif text-4xl font-semibold text-[#142b58] sm:text-5xl">The Pinnacle Serve approach</h2>
                        </div>
                        <p className="max-w-md text-sm leading-6 text-slate-600">
                            Get to know our leadership, services, and the principles behind each engagement.
                        </p>
                    </div>

                    <div role="tablist" aria-label="About Pinnacle Serve" className="flex gap-2 overflow-x-auto border-b border-slate-200 pb-3">
                        {approachTabs.map(({ id, label, Icon }) => (
                            <button
                                key={id}
                                id={`about-tab-${id}`}
                                type="button"
                                role="tab"
                                aria-selected={activeTab === id}
                                aria-controls={`about-panel-${id}`}
                                tabIndex={activeTab === id ? 0 : -1}
                                onClick={() => setActiveTab(id)}
                                className={`inline-flex shrink-0 items-center gap-2 rounded-full px-4 py-2.5 text-sm font-medium transition ${activeTab === id ? "bg-[#142b58] text-white" : "bg-[#f4f6fb] text-slate-600 hover:bg-orange-50 hover:text-orange-700"}`}
                            >
                                <Icon className="h-4 w-4" />
                                {label}
                            </button>
                        ))}
                    </div>

                    <div id={`about-panel-${selectedTab.id}`} role="tabpanel" aria-labelledby={`about-tab-${selectedTab.id}`} className="pt-8">
                        {selectedTab.id === "founder" ? (
                            <div>
                                <h3 className="font-serif text-2xl font-semibold text-[#142b58]">Leadership</h3>
                                <div className="mt-6 grid gap-5 lg:grid-cols-2">
                                    {leaders.map((leader) => (
                                        <article key={leader.name} className="overflow-hidden border border-slate-200 bg-white shadow-sm sm:flex">
                                            <div aria-hidden="true" className="flex h-40 shrink-0 items-center justify-center bg-gradient-to-br from-[#142b58] via-[#1d477d] to-[#e87924] text-5xl font-semibold tracking-wide text-white sm:h-auto sm:min-h-[300px] sm:w-44 lg:w-52">
                                                {leader.name.split(" ").map((part) => part[0]).join("")}
                                            </div>
                                            <div className="p-5 sm:p-6">
                                                <p className="text-[10px] font-semibold tracking-[0.15em] text-orange-600 uppercase">{leader.role}</p>
                                                <h4 className="mt-1 font-serif text-2xl font-semibold text-[#142b58]">{leader.name}</h4>
                                                <div className="mt-4 space-y-3 text-sm leading-6 text-slate-600">
                                                    {leader.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
                                                </div>
                                            </div>
                                        </article>
                                    ))}
                                </div>
                            </div>
                        ) : (
                            <article className="grid gap-8 rounded-2xl border border-slate-200 bg-[#f8f9fc] p-6 sm:p-8 lg:grid-cols-[0.5fr_1.5fr] lg:gap-14 lg:p-10">
                                <div>
                                    <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-orange-50 text-orange-700">
                                        <selectedTab.Icon className="h-6 w-6" />
                                    </span>
                                    <h3 className="mt-5 font-serif text-3xl font-semibold text-[#142b58]">{selectedTab.label}</h3>
                                </div>
                                <div className="space-y-5 text-sm leading-7 text-slate-600 sm:text-base">
                                    {selectedTab.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
                                </div>
                            </article>
                        )}
                    </div>
                </div>
            </section>

            <section className="px-6 pb-20 sm:px-10 sm:pb-24 lg:px-16">
                <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-8 rounded-2xl bg-[#142b58] px-7 py-10 text-white sm:px-10 sm:py-12 lg:flex-row lg:items-center">
                    <div>
                        <p className="text-xs font-semibold tracking-[0.16em] text-orange-300 uppercase">Take the next step</p>
                        <h2 className="mt-3 font-serif text-3xl font-semibold sm:text-4xl">Let&apos;s make progress together.</h2>
                        <p className="mt-3 max-w-2xl text-sm leading-6 text-white/75">
                            Tell us what you&apos;re working toward. We&apos;ll help you find a practical way forward.
                        </p>
                    </div>
                    <Link href="/contact" className="inline-flex h-12 shrink-0 items-center gap-2 rounded-full bg-[#e87924] px-6 text-sm font-semibold text-white transition hover:bg-[#d66d1e]">
                        Start a conversation <ArrowUpRight className="h-4 w-4" />
                    </Link>
                </div>
            </section>
        </main>
    );
}
