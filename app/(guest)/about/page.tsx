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
        name: "Sartaj Rekhi",
        role: "Chairman",
        paragraphs: [
            "A young, dynamic, and visionary serial entrepreneur, Sartaj Rekhi brings a proven track record of building, scaling, and transforming technology businesses. Combining entrepreneurial drive with strategic discipline and a deep understanding of evolving markets, he has consistently delivered sustainable growth and long-term value.",
            "As a Founder and business leader, Sartaj successfully guided a technology company through its public listing and IPO, and subsequently led its expansion to more than USD 200 million in revenue, significantly strengthening its market position.",
            "His leadership style combines empathy and inclusiveness with a strong focus on execution and measurable outcomes. As the Founder of Pinnacle Serve, Sartaj brings together entrepreneurial experience, public-market insight, technology expertise, and a strong commitment to responsible innovation.",
            "Sartaj is a graduate from American River College and San Jose State University and has also completed advanced management programs from UC Berkeley. In his free time, he loves traveling and watching boxing.",
        ],
    },
    {
        name: "Sidhartha Dubey",
        role: "CEO",
        paragraphs: [
            "A seasoned technology and transformation leader, Sidhartha brings over two decades of experience managing global engagements and leading complex, multi-location transformation initiatives across industries, geographies, and diverse technology stacks. He has worked closely with clients to develop technology strategies that optimize IT spend, modernize legacy environments, and build scalable, future-ready technology foundations.",
            "A strong believer in people-centric transformation, Sidhartha recognizes that sustainable change is ultimately driven by engaged and empowered people. He focuses on creating environments that encourage participation, collaboration, innovation, and employee satisfaction.",
            "Known for combining strategic vision with execution discipline, Sidhartha brings a pragmatic and collaborative approach to transformation, helping organizations simplify complexity, embrace AI and automation, optimize technology investments, and build high-performing, future-ready enterprises.",
            "Sidhartha completed his graduation from Delhi University and the AMP program from IIM Bangalore. He is an avid reader, equally fascinated by Darśana Śāstra and western philosophy.",
        ],
    },
    {
        name: "Sanjeev Sethi",
        role: "CFO",
        paragraphs: [
            "Sanjeev is a senior finance leader and Chartered Accountant with around 40 years of extensive experience across industry and consulting organizations. Over the course of his distinguished career, he has advised and led organizations across corporate finance, fund raising, IPOs, investor relations, financial management, accounting, audit, and direct and indirect taxation.",
            "With deep expertise in financial strategy, corporate governance, regulatory compliance, and stakeholder management, Sanjeev brings a strong commercial perspective to business leadership.",
            "As CFO, Sanjeev plays a key role in strengthening the company's financial foundation, supporting strategic growth initiatives, and ensuring sound financial governance.",
        ],
    },
    {
        name: "Vikram Jolly",
        role: "Vice President, Tech Infra",
        paragraphs: [
            "Vikram Jolly is a seasoned technology leader with 25+ years of experience driving enterprise technology strategy, transformation, and operations across IT Infrastructure, Cybersecurity, Networks, Data Centers, Service Delivery, and Digital Transformation.",
            "He brings a strong business-oriented approach to technology leadership, with a focus on building secure, resilient, scalable, and high-performing technology environments that enable business growth and operational excellence.",
            "An alumnus of the University of Delhi and IIM Lucknow, Vikram combines deep technology expertise with strong business and management acumen. He is particularly passionate about Cybersecurity, AI-led transformation, Digital Infrastructure, and Enterprise Technology.",
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
        label: "What We Do",
        Icon: Layers,
        paragraphs: [
            "Our service portfolio is designed to support the full lifecycle of digital transformation. We help clients discover opportunities, design solutions, build platforms, automate processes, manage operations, and apply AI where it can create real advantage.",
            "Our capabilities include digital product engineering, cloud engineering, managed services, automation as a service, data services, and AI services. We also support agentic AI solutions across specific industry workflows, helping organizations move beyond task automation toward intelligent orchestration and decision support.",
            "For each engagement, we focus on solving the right problem first. Then we apply the right mix of engineering, data, cloud, and AI to deliver a solution that is scalable, efficient, and aligned with business goals.",
        ],
    },
    {
        id: "our-approach",
        label: "Our Approach",
        Icon: Sparkles,
        paragraphs: [
            "We take a structured but flexible approach to every project. We start by understanding the business context, operational challenges, user needs, and technology environment. From there, we shape a solution that balances short-term impact with long-term sustainability.",
            "We believe strong solutions come from combining thoughtful design with disciplined execution. That includes clear roadmaps, modern architecture, secure delivery, and ongoing support after launch. It also means keeping governance, monitoring, and human oversight in place where it matters most.",
            "Our clients value us because we help reduce complexity without reducing ambition. We bring clarity to complicated environments and help organizations move from fragmented processes to coordinated, intelligent operations.",
        ],
    },
    {
        id: "our-strengths",
        label: "Our Strengths",
        Icon: Globe2,
        paragraphs: [
            "We are experienced in building solutions that work across industries with demanding operational needs. Our offerings are especially relevant for sectors such as healthcare, banking, telecom, property operations, retail, and manufacturing, where scale, compliance, responsiveness, and reliability are essential.",
            "In healthcare, we support revenue cycle management, human-in-the-loop controls, and governance-focused AI. In banking, we help with fraud detection, case triage, customer service, and compliance workflows. In telecom, we enable network operations, customer support, and field service coordination. We also support property operations, retail, and manufacturing with service request, inventory, maintenance, quality, and workflow automation.",
            "This industry perspective matters because every organization faces different workflows, risks, and priorities. We adapt our services to the realities of the domain, the maturity of the client, and the outcomes that matter most.",
        ],
    },
    {
        id: "why-clients",
        label: "Why Clients Work With Us",
        Icon: Briefcase,
        paragraphs: [
            "Clients come to us when they need a partner who can connect strategy to execution. They want solutions that are not only technically strong, but also operationally useful and business-aligned.",
            "They also value our ability to work across disciplines. A strong digital solution often requires product thinking, cloud infrastructure, data readiness, automation logic, AI capability, and support services all working together. We bring those pieces together in a coordinated way.",
            "Most importantly, we focus on outcomes that can be felt in the business: faster turnaround times, lower operational overhead, better customer service, stronger control, and improved resilience.",
        ],
    },
    {
        id: "our-commitment",
        label: "Our Commitment",
        Icon: Info,
        paragraphs: [
            "We are committed to building solutions that create lasting value. That means designing for reliability, scalability, security, and maintainability from the start. It also means staying engaged after launch to support optimization and continuous improvement.",
            "As businesses face rising complexity, changing customer expectations, and growing pressure to do more with less, they need partners who can help them adapt. We help organizations do exactly that through services that combine engineering excellence with operational intelligence.",
            "Our mission is simple: help clients transform the way they work with digital services that are practical, powerful, and built for the future.",
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
