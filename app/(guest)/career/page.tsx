"use client";

import { useEffect, useState, type ChangeEvent, type FormEvent } from "react";
import Image from "next/image";
import Link from "next/link";
import {
    ArrowLeft,
    ArrowRight,
    ArrowUpRight,
    Briefcase,
    Clock3,
    Globe2,
    GraduationCap,
    HeartPulse,
    Laptop,
    Mail,
    MapPin,
    Send,
    TrendingUp,
    Users,
    X,
    Upload,
} from "lucide-react";

const roles = [
    {
        title: "Senior AI / ML Engineer",
        description:
            "Design ML pipelines, fine-tune foundation models, and build production-grade AI agents for enterprise banking and healthcare clients.",
        team: "AI Engineering",
        location: "Remote",
        type: "Full-time",
    },
    {
        title: "Agentic AI Solutions Architect",
        description:
            "Lead multi-agent system design and orchestration frameworks integrating with ERP, CRM, and core banking platforms.",
        team: "Solutions Engineering",
        location: "Hybrid",
        type: "Full-time",
    },
    {
        title: "Senior Data Scientist",
        description:
            "Build predictive models for fraud detection, demand forecasting, and patient risk stratification using deep learning and advanced statistics.",
        team: "Data & Analytics",
        location: "Remote",
        type: "Full-time",
    },
    {
        title: "UI / UX Designer",
        description:
            "Design intuitive interfaces, user journeys, and interactive prototypes for Pinnacle Serve's AI-powered products and enterprise client solutions.",
        team: "Design",
        location: "Hybrid",
        type: "Full-time",
    },
    {
        title: "MLOps / AI Platform Engineer",
        description:
            "Build scalable ML infrastructure, model registries, and automated retraining pipelines to support continuous production AI deployment.",
        team: "Platform Engineering",
        location: "Remote",
        type: "Full-time",
    },
    {
        title: "NLP / Conversational AI Engineer",
        description:
            "Develop LLM applications, RAG pipelines, and conversational agents powering intelligent customer interactions and document processing.",
        team: "AI Research",
        location: "Remote",
        type: "Full-time",
    },
    {
        title: "AI Product Manager",
        description:
            "Define strategy and roadmaps for Pinnacle Serve's AI agent portfolio, translating complex AI capabilities into measurable business outcomes.",
        team: "Product",
        location: "Hybrid",
        type: "Full-time",
    },
    {
        title: "AI Governance & Ethics Specialist",
        description:
            "Develop responsible AI frameworks, bias evaluation protocols, and compliance strategies for enterprise AI deployments across regulated industries.",
        team: "Risk & Governance",
        location: "Remote",
        type: "Full-time",
    },
];

const benefits = [
    {
        title: "Remote-First",
        description:
            "Work from anywhere. We're a globally distributed team built around async collaboration and deep work.",
        Icon: Globe2,
        color: "text-blue-600 bg-blue-50",
    },
    {
        title: "Equity & Growth",
        description:
            "Competitive salary, equity participation, and a clear progression framework to grow into leadership.",
        Icon: TrendingUp,
        color: "text-orange-600 bg-orange-50",
    },
    {
        title: "Health & Wellbeing",
        description:
            "Full health, dental & vision coverage plus a monthly wellbeing allowance for fitness or therapy.",
        Icon: HeartPulse,
        color: "text-rose-600 bg-rose-50",
    },
    {
        title: "Flexible Hours",
        description:
            "No rigid 9-to-5. Own your schedule and deliver results at the times that work best for you.",
        Icon: Clock3,
        color: "text-teal-700 bg-teal-50",
    },
    {
        title: "Inclusive Culture",
        description:
            "We celebrate diversity and build a psychologically safe environment where everyone does their best work.",
        Icon: Users,
        color: "text-indigo-600 bg-indigo-50",
    },
    {
        title: "Learning & Development",
        description:
            "Keep growing through meaningful challenges, knowledge sharing, and opportunities to expand your expertise.",
        Icon: GraduationCap,
        color: "text-amber-700 bg-amber-50",
    },
];

type CareerRole = (typeof roles)[number];

type ApplicantDetails = {
  fullName: string;
  email: string;
  phone: string;
  portfolio: string;
  fit: string;
};

const emptyApplicantDetails: ApplicantDetails = {
  fullName: "",
  email: "",
  phone: "",
  portfolio: "",
  fit: "",
};

export default function CareerPage() {
    const [currentPage, setCurrentPage] = useState(1);
    const [selectedRole, setSelectedRole] = useState<CareerRole | null>(null);
    const [applicant, setApplicant] = useState(emptyApplicantDetails);
    const [resumeName, setResumeName] = useState("");
    const pageSize = 6;
    const visibleRoles = roles.slice((currentPage - 1) * pageSize, currentPage * pageSize);

    useEffect(() => {
        if (!selectedRole) return;

        const previousOverflow = document.body.style.overflow;
        const closeOnEscape = (event: KeyboardEvent) => {
            if (event.key === "Escape") setSelectedRole(null);
        };

        document.body.style.overflow = "hidden";
        window.addEventListener("keydown", closeOnEscape);

        return () => {
            document.body.style.overflow = previousOverflow;
            window.removeEventListener("keydown", closeOnEscape);
        };
    }, [selectedRole]);

    const openApplication = (role: CareerRole) => {
        setApplicant(emptyApplicantDetails);
        setResumeName("");
        setSelectedRole(role);
    };

    const updateApplicant = (
        event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    ) => {
        const { name, value } = event.currentTarget;
        setApplicant((current) => ({ ...current, [name]: value }));
    };

    const handleApplicationSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (!selectedRole) return;

        const subject = encodeURIComponent(`Application: ${selectedRole.title}`);
        const body = encodeURIComponent(
            [
                `Role: ${selectedRole.title}`,
                `Team: ${selectedRole.team}`,
                `Name: ${applicant.fullName}`,
                `Email: ${applicant.email}`,
                `Phone: ${applicant.phone || "Not provided"}`,
                `LinkedIn / Portfolio: ${applicant.portfolio || "Not provided"}`,
                `Resume: ${resumeName} (please attach the file before sending)`,
                "",
                "Why I am a great fit:",
                applicant.fit,
            ].join("\n"),
        );

        window.location.href = `mailto:contact@pinnacleserve.com?subject=${subject}&body=${body}`;
    };

    return (
        <div className="w-full bg-white text-slate-900">
            <div className="bg-[#142b58] px-6 py-2.5 text-xs text-white/75 sm:px-10 lg:px-16">
                <div className="mx-auto max-w-7xl">
                    <Link href="/" className="transition hover:text-white">Home</Link>
                    <span className="mx-2 text-white/35">›</span>
                    <span className="text-orange-300">Careers</span>
                </div>
            </div>

            <main>
                <section className="relative isolate flex min-h-[520px] items-center justify-center overflow-hidden px-6 py-24 text-center text-white sm:min-h-[570px] sm:px-10 lg:px-16">
                    <Image
                        src="https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=2400&q=85"
                        alt="Colleagues celebrating a successful collaboration"
                        fill
                        priority
                        sizes="100vw"
                        className="-z-20 object-cover object-center"
                    />
                    <div className="absolute inset-0 -z-10 bg-gradient-to-r from-[#111d3b]/85 via-[#1d3158]/75 to-[#1e3a6c]/70" />
                    <div className="absolute inset-0 -z-10 bg-gradient-to-t from-[#111d3b]/45 via-transparent to-[#111d3b]/25" />

                    <div className="relative mx-auto max-w-3xl pt-8">
                        <div className="inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/10 px-4 py-2 text-[11px] font-semibold tracking-[0.15em] text-white uppercase backdrop-blur-sm">
                            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 shadow-[0_0_10px_rgba(52,211,153,0.9)]" />
                            We&apos;re Hiring
                        </div>
                        <h1 className="mt-7 font-serif text-4xl leading-[1.06] font-semibold text-white sm:text-5xl lg:text-6xl">
                            Build the Future of
                            <span className="block mt-1">
                                <em className="font-normal text-[#f28b32]">Agentic AI</em> with Us
                            </span>
                        </h1>
                        <p className="mx-auto mt-6 max-w-2xl text-sm leading-7 text-white/85 sm:text-base">
                            Join a team of AI engineers, data scientists, and technologists shaping how enterprises reason, automate, and scale through intelligent AI agents.
                        </p>
                        <Link
                            href="/contact"
                            className="mt-8 inline-flex h-12 items-center gap-2 rounded-full bg-[#e87924] px-7 text-sm font-semibold text-white shadow-lg shadow-orange-950/25 transition hover:bg-[#d66d1e]"
                        >
                            Get in Touch
                            <ArrowUpRight className="h-4 w-4" />
                        </Link>
                    </div>
                </section>

                <section className="relative overflow-hidden bg-[#f8f9fc] px-6 py-20 sm:px-10 sm:py-24 lg:px-16">
                    <div className="pointer-events-none absolute right-0 top-0 h-[500px] w-[500px] rounded-full bg-orange-100/50 blur-[120px]" />
                    <div className="relative mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-[1fr_0.95fr] lg:gap-16">
                        <div>
                            <p className="text-xs font-semibold tracking-[0.18em] text-orange-600 uppercase">Why Pinnacle Serve</p>
                            <h2 className="mt-4 font-serif text-4xl leading-tight font-semibold text-[#142b58] sm:text-5xl">
                                Where <em className="font-normal text-[#e87924]">innovation</em> meets purpose
                            </h2>
                            <p className="mt-6 max-w-xl text-sm leading-7 text-slate-600 sm:text-base">
                                At Pinnacle Serve, we build AI systems that transform how enterprises operate. Work on agentic reasoning, multi-system orchestration, and responsible AI, and create measurable impact for clients across banking, healthcare, and retail.
                            </p>

                            <div className="mt-9 grid grid-cols-2 gap-x-7 gap-y-6 sm:grid-cols-4">
                                <div>
                                    <p className="font-serif text-3xl font-semibold text-[#142b58]">50+</p>
                                    <p className="mt-1 text-[10px] font-semibold tracking-[0.12em] text-slate-500 uppercase">AI engineers</p>
                                </div>
                                <div>
                                    <p className="font-serif text-3xl font-semibold text-[#142b58]">12+</p>
                                    <p className="mt-1 text-[10px] font-semibold tracking-[0.12em] text-slate-500 uppercase">Countries</p>
                                </div>
                                <div>
                                    <p className="font-serif text-3xl font-semibold text-[#142b58]">100+</p>
                                    <p className="mt-1 text-[10px] font-semibold tracking-[0.12em] text-slate-500 uppercase">Enterprise clients</p>
                                </div>
                                <div>
                                    <p className="font-serif text-3xl font-semibold text-[#142b58]">4.8★</p>
                                    <p className="mt-1 text-[10px] font-semibold tracking-[0.12em] text-slate-500 uppercase">Glassdoor rating</p>
                                </div>
                            </div>
                        </div>

                        <div className="relative min-h-[330px] overflow-hidden rounded-2xl bg-slate-200 shadow-[0_24px_70px_rgba(20,43,88,0.13)] sm:min-h-[400px]">
                            <Image
                                src="https://images.unsplash.com/photo-1521737711867-e3b97375f902?auto=format&fit=crop&w=1400&q=85"
                                alt="Pinnacle Serve team collaborating around a table"
                                fill
                                sizes="(max-width: 1024px) 100vw, 45vw"
                                className="object-cover"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-[#142b58]/30 to-transparent" />
                            <div className="absolute bottom-5 left-5 inline-flex items-center gap-3 rounded-xl border border-white/70 bg-white/95 px-4 py-3 shadow-xl">
                                <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-orange-50 text-orange-600">
                                    <TrendingUp className="h-5 w-5" />
                                </span>
                                <span>
                                    <strong className="block text-sm text-[#142b58]">Fast Growth</strong>
                                    <span className="mt-0.5 block text-xs text-slate-500">Hypergrowth AI company</span>
                                </span>
                            </div>
                        </div>
                    </div>
                </section>

                <section id="open-positions" className="px-6 py-20 sm:px-10 sm:py-24 lg:px-16">
                    <div className="mx-auto max-w-7xl">
                        <div className="mb-10 flex flex-col justify-between gap-6 border-b border-slate-200 pb-8 sm:flex-row sm:items-end">
                            <div>
                                <p className="text-xs font-semibold tracking-[0.18em] text-orange-600 uppercase">Open Positions</p>
                                <h2 className="mt-4 font-serif text-4xl font-semibold text-[#142b58] sm:text-5xl">
                                    Current <em className="font-normal text-[#e87924]">job openings</em>
                                </h2>
                            </div>
                            <p className="max-w-lg text-sm leading-6 text-slate-600">
                                We&apos;re looking for exceptional people to join our growing team. All roles are open to remote candidates unless stated otherwise.
                            </p>
                        </div>

                        <div className="grid gap-4 lg:grid-cols-2">
                            {visibleRoles.map((role, index) => (
                                <article key={role.title} className="group rounded-xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:border-orange-200 hover:shadow-lg sm:p-6">
                                    <div className="flex items-start gap-4">
                                        <div className="hidden h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-[#f4f6fb] text-[#234375] sm:flex">
                                            {index % 2 === 0 ? <Briefcase className="h-5 w-5" /> : <Laptop className="h-5 w-5" />}
                                        </div>
                                        <div className="min-w-0 flex-1">
                                            <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                                                <div>
                                                    <h3 className="text-lg font-semibold leading-snug text-[#142b58]">{role.title}</h3>
                                                    <p className="mt-2 text-sm leading-6 text-slate-600">{role.description}</p>
                                                </div>
                                                <button
                                                    type="button"
                                                    onClick={() => openApplication(role)}
                                                    aria-haspopup="dialog"
                                                    className="inline-flex h-9 shrink-0 items-center justify-center gap-1.5 self-start rounded-full border border-orange-200 px-4 text-xs font-semibold text-orange-700 transition hover:border-orange-500 hover:bg-orange-50"
                                                >
                                                    Apply <ArrowUpRight className="h-3.5 w-3.5" />
                                                </button>
                                            </div>
                                            <div className="mt-5 flex flex-wrap gap-2">
                                                <span className="rounded-full bg-[#f4f6fb] px-3 py-1 text-[11px] font-medium text-slate-600">{role.team}</span>
                                                <span className="inline-flex items-center gap-1 rounded-full bg-[#f4f6fb] px-3 py-1 text-[11px] font-medium text-slate-600"><MapPin className="h-3 w-3" />{role.location}</span>
                                                <span className="rounded-full bg-[#f4f6fb] px-3 py-1 text-[11px] font-medium text-slate-600">{role.type}</span>
                                            </div>
                                        </div>
                                    </div>
                                </article>
                            ))}
                        </div>

                        <div className="mt-8 flex flex-col items-center justify-between gap-4 border-t border-slate-200 pt-6 sm:flex-row">
                            <p className="text-sm text-slate-500">
                                {currentPage === 1 ? "1 – 6" : "7 – 8"} of 8 openings
                            </p>
                            <nav aria-label="Job opening pages" className="flex items-center gap-2">
                                <button
                                    type="button"
                                    onClick={() => setCurrentPage(1)}
                                    disabled={currentPage === 1}
                                    aria-label="Previous page of job openings"
                                    className="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 text-slate-600 transition hover:border-orange-300 hover:text-orange-700 disabled:cursor-not-allowed disabled:opacity-40"
                                >
                                    <ArrowLeft className="h-4 w-4" />
                                </button>
                                {[1, 2].map((pageNumber) => (
                                    <button
                                        key={pageNumber}
                                        type="button"
                                        aria-current={currentPage === pageNumber ? "page" : undefined}
                                        onClick={() => setCurrentPage(pageNumber)}
                                        className={`h-9 w-9 rounded-lg border text-sm font-semibold transition ${currentPage === pageNumber ? "border-[#142b58] bg-[#142b58] text-white" : "border-slate-200 text-slate-600 hover:border-orange-300 hover:text-orange-700"}`}
                                    >
                                        {pageNumber}
                                    </button>
                                ))}
                                <button
                                    type="button"
                                    onClick={() => setCurrentPage(2)}
                                    disabled={currentPage === 2}
                                    aria-label="Next page of job openings"
                                    className="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 text-slate-600 transition hover:border-orange-300 hover:text-orange-700 disabled:cursor-not-allowed disabled:opacity-40"
                                >
                                    <ArrowRight className="h-4 w-4" />
                                </button>
                            </nav>
                        </div>
                    </div>
                </section>

                <section className="bg-[#f7f8fb] px-6 py-20 sm:px-10 sm:py-24 lg:px-16">
                    <div className="mx-auto max-w-7xl">
                        <div className="grid gap-10 lg:grid-cols-[0.7fr_1.3fr] lg:items-end">
                            <div>
                                <p className="text-xs font-semibold tracking-[0.18em] text-orange-600 uppercase">Perks &amp; Benefits</p>
                                <h2 className="mt-4 font-serif text-4xl font-semibold text-[#142b58] sm:text-5xl">
                                    Why you&apos;ll <em className="font-normal text-[#e87924]">love it here</em>
                                </h2>
                                <p className="mt-5 max-w-md text-sm leading-7 text-slate-600">
                                    We invest in the people who build the future. Here&apos;s what working at Pinnacle Serve looks like.
                                </p>
                                <div className="mt-7 flex gap-8">
                                    <div><strong className="block font-serif text-3xl text-[#142b58]">6</strong><span className="text-[10px] font-semibold tracking-[0.12em] text-slate-500 uppercase">Core perks</span></div>
                                    <div><strong className="block font-serif text-3xl text-[#142b58]">100%</strong><span className="text-[10px] font-semibold tracking-[0.12em] text-slate-500 uppercase">Remote options</span></div>
                                </div>
                            </div>
                            <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
                                {benefits.map(({ title, description, Icon, color }) => (
                                    <article key={title} className="rounded-xl border border-slate-200/80 bg-white p-5 shadow-sm">
                                        <span className={`flex h-10 w-10 items-center justify-center rounded-lg ${color}`}><Icon className="h-5 w-5" /></span>
                                        <h3 className="mt-4 text-sm font-semibold text-[#142b58]">{title}</h3>
                                        <p className="mt-2 text-xs leading-5 text-slate-500">{description}</p>
                                    </article>
                                ))}
                            </div>
                        </div>
                    </div>
                </section>

                <section className="px-6 py-20 sm:px-10 lg:px-16">
                    <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-8 rounded-2xl bg-[#142b58] px-7 py-10 text-white sm:px-10 sm:py-12 lg:flex-row lg:items-center">
                        <div>
                            <p className="text-xs font-semibold tracking-[0.16em] text-orange-300 uppercase">Your next chapter</p>
                            <h2 className="mt-3 font-serif text-3xl font-semibold sm:text-4xl">Don&apos;t see a role that fits?</h2>
                            <p className="mt-3 max-w-2xl text-sm leading-6 text-white/75">
                                We&apos;re always interested in hearing from exceptional people. Send us your CV and tell us how you&apos;d like to contribute.
                            </p>
                        </div>
                        <Link href="/contact" className="inline-flex h-12 shrink-0 items-center gap-2 rounded-full bg-[#e87924] px-6 text-sm font-semibold text-white transition hover:bg-[#d66d1e]">
                            Get in Touch <ArrowUpRight className="h-4 w-4" />
                        </Link>
                    </div>
                </section>

                <div className="fixed bottom-6 right-6 z-40 sm:bottom-8 sm:right-8">
                    <Link href="/contact" className="inline-flex h-12 items-center gap-2 rounded-full bg-[#e87924] px-5 text-sm font-semibold text-white shadow-xl shadow-orange-950/25 transition hover:bg-[#d66d1e]">
                        <Mail className="h-4 w-4" />Talk To Us
                    </Link>
                </div>
            </main>

            {selectedRole && (
                <div
                    className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-950/55 p-3 backdrop-blur-[2px] sm:p-6"
                    onMouseDown={(event) => {
                        if (event.target === event.currentTarget) setSelectedRole(null);
                    }}
                >
                    <section
                        role="dialog"
                        aria-modal="true"
                        aria-labelledby="application-title"
                        className="flex max-h-[min(94dvh,820px)] w-full max-w-[770px] flex-col overflow-hidden rounded-[22px] bg-white shadow-[0_30px_100px_rgba(2,6,23,0.35)]"
                    >
                        <header className="flex shrink-0 items-start justify-between border-b border-slate-200 px-6 py-5 sm:px-9 sm:py-7">
                            <div className="min-w-0 pr-4">
                                <p className="text-xs font-semibold tracking-[0.16em] text-orange-600 uppercase">Apply for</p>
                                <h2 id="application-title" className="mt-1 font-serif text-2xl leading-tight font-semibold text-[#142b58] sm:text-[28px]">
                                    {selectedRole.title}
                                </h2>
                                <p className="mt-2 text-sm text-slate-500">{selectedRole.team}</p>
                            </div>
                            <button
                                type="button"
                                onClick={() => setSelectedRole(null)}
                                aria-label="Close application form"
                                className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-slate-200 bg-[#f8f9fc] text-slate-600 transition hover:border-slate-300 hover:bg-slate-100"
                            >
                                <X className="h-5 w-5" />
                            </button>
                        </header>

                        <form onSubmit={handleApplicationSubmit} className="flex min-h-0 flex-1 flex-col">
                            <div className="flex-1 space-y-6 overflow-y-auto px-6 py-6 sm:px-9 sm:py-7">
                                <div className="grid gap-5 sm:grid-cols-2">
                                    <label className="text-sm font-medium text-[#14213d]">
                                        Full Name <span className="text-rose-600">*</span>
                                        <input
                                            autoFocus
                                            className="mt-2 h-14 w-full rounded-xl border border-[#d6ddec] bg-[#f8f9fd] px-4 text-sm text-slate-800 outline-none transition placeholder:text-slate-500 focus:border-[#1d3d91] focus:ring-4 focus:ring-blue-900/10"
                                            name="fullName"
                                            autoComplete="name"
                                            placeholder="Your full name"
                                            value={applicant.fullName}
                                            onChange={updateApplicant}
                                            required
                                        />
                                    </label>
                                    <label className="text-sm font-medium text-[#14213d]">
                                        Email Address <span className="text-rose-600">*</span>
                                        <input
                                            className="mt-2 h-14 w-full rounded-xl border border-[#d6ddec] bg-[#f8f9fd] px-4 text-sm text-slate-800 outline-none transition placeholder:text-slate-500 focus:border-[#1d3d91] focus:ring-4 focus:ring-blue-900/10"
                                            name="email"
                                            type="email"
                                            autoComplete="email"
                                            placeholder="you@example.com"
                                            value={applicant.email}
                                            onChange={updateApplicant}
                                            required
                                        />
                                    </label>
                                    <label className="text-sm font-medium text-[#14213d]">
                                        Phone Number
                                        <input
                                            className="mt-2 h-14 w-full rounded-xl border border-[#d6ddec] bg-[#f8f9fd] px-4 text-sm text-slate-800 outline-none transition placeholder:text-slate-500 focus:border-[#1d3d91] focus:ring-4 focus:ring-blue-900/10"
                                            name="phone"
                                            type="tel"
                                            autoComplete="tel"
                                            placeholder="+1 (000) 000-0000"
                                            value={applicant.phone}
                                            onChange={updateApplicant}
                                        />
                                    </label>
                                    <label className="text-sm font-medium text-[#14213d]">
                                        LinkedIn / Portfolio URL
                                        <input
                                            className="mt-2 h-14 w-full rounded-xl border border-[#d6ddec] bg-[#f8f9fd] px-4 text-sm text-slate-800 outline-none transition placeholder:text-slate-500 focus:border-[#1d3d91] focus:ring-4 focus:ring-blue-900/10"
                                            name="portfolio"
                                            type="url"
                                            placeholder="https://linkedin.com/in/..."
                                            value={applicant.portfolio}
                                            onChange={updateApplicant}
                                        />
                                    </label>
                                </div>

                                <label className="block text-sm font-medium text-[#14213d]">
                                    Why are you a great fit? <span className="text-rose-600">*</span>
                                    <textarea
                                        className="mt-2 min-h-32 w-full resize-y rounded-xl border border-[#d6ddec] bg-[#f8f9fd] px-4 py-4 text-sm text-slate-800 outline-none transition placeholder:text-slate-500 focus:border-[#1d3d91] focus:ring-4 focus:ring-blue-900/10"
                                        name="fit"
                                        placeholder="Tell us about your experience and why you&apos;d like to join Pinnacle Serve..."
                                        value={applicant.fit}
                                        onChange={updateApplicant}
                                        required
                                    />
                                </label>

                                <label htmlFor="application-resume" className="block text-sm font-medium text-[#14213d]">
                                    Resume / CV <span className="text-rose-600">*</span>
                                    <span className="mt-2 flex min-h-32 cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed border-[#d6ddec] bg-[#f8f9fd] px-5 py-5 text-center transition hover:border-[#1d3d91] hover:bg-blue-50/40">
                                        <Upload className="h-7 w-7 text-[#1d3d91]" />
                                        <span className="mt-3 max-w-full truncate text-sm font-medium text-[#142b58]">
                                            {resumeName || "Choose a file or drag it here"}
                                        </span>
                                        <span className="mt-1 text-xs font-normal text-slate-500">PDF, DOC or DOCX · up to 10 MB</span>
                                    </span>
                                    <input
                                        id="application-resume"
                                        className="sr-only"
                                        type="file"
                                        name="resume"
                                        accept=".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                                        required
                                        onChange={(event) => {
                                            const file = event.currentTarget.files?.[0];
                                            if (file && file.size > 10 * 1024 * 1024) {
                                                event.currentTarget.value = "";
                                                setResumeName("");
                                                return;
                                            }
                                            setResumeName(file?.name ?? "");
                                        }}
                                    />
                                </label>
                            </div>

                            <footer className="shrink-0 border-t border-slate-200 bg-white px-6 py-4 sm:px-9 sm:py-5">
                                <p className="mb-3 text-center text-xs text-slate-500">
                                    Submitting opens your email app. Please attach your CV before sending.
                                </p>
                                <button
                                    type="submit"
                                    className="inline-flex h-[60px] w-full items-center justify-center gap-2 rounded-full bg-[#1e3d91] px-6 text-base font-semibold text-white transition hover:bg-[#18347d] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1e3d91]"
                                >
                                    Submit Application
                                    <Send className="h-4 w-4" />
                                </button>
                            </footer>
                        </form>
                    </section>
                </div>
            )}
        </div>
    );
}
