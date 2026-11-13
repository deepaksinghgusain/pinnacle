"use client";

import { useState } from "react";
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
import type { SiteSettings } from "@/lib/generated/prisma";

type AboutPageSettings = Pick<
  SiteSettings,
  | "aboutPageHeroTagline"
  | "aboutPageHeroTitle"
  | "aboutPageHeroAccent"
  | "aboutPageHeroDescription"
  | "aboutPageHeroImagePath"
  | "aboutStoryTagline"
  | "aboutStoryTitle"
  | "aboutStoryDescription"
  | "aboutStoryCards"
  | "aboutApproachTagline"
  | "aboutApproachTitle"
  | "aboutApproachDescription"
  | "aboutApproachTabs"
  | "aboutLeadershipTitle"
  | "aboutLeaders"
  | "aboutPageCtaTagline"
  | "aboutPageCtaTitle"
  | "aboutPageCtaDescription"
  | "aboutPageCtaButtonLabel"
  | "aboutPageCtaButtonHref"
>;

type StoryCard = {
  title: string;
  description: string;
};

type ApproachTab = {
  id: string;
  label: string;
  paragraphs: string[];
};

type Leader = {
  name: string;
  role: string;
  paragraphs: string[];
  imagePath?: string;
};

const storyFallbacks: StoryCard[] = [
  {
    title: "Technology with a purpose",
    description:
      "We connect technology to the work that matters: better service, less manual effort, stronger controls, and more efficient operations.",
  },
  {
    title: "Built for real teams",
    description:
      "Good change is ambitious and usable. We build reliable, secure systems that teams can adopt, manage, and keep improving.",
  },
  {
    title: "Focused on results",
    description:
      "We shape each engagement around the needs of its industry and the results that matter most to the organization.",
  },
];

const tabFallbacks: ApproachTab[] = [
  { id: "founder", label: "Founder", paragraphs: [] },
  {
    id: "what-we-do",
    label: "Our Services",
    paragraphs: [
      "From discovery and design through implementation and operations, we help clients spot opportunities, build platforms, automate processes, and apply AI where it can make a difference.",
      "Our capabilities span digital product and cloud engineering, managed services, automation, data, AI, and agentic AI for industry workflows.",
      "We start with the business need, then bring together the right mix of people and technology to deliver a practical solution that can scale.",
    ],
  },
  {
    id: "our-approach",
    label: "How We Work",
    paragraphs: [
      "We begin by learning how the business works today: its goals, processes, users, and systems. Then we build a plan that addresses immediate needs and supports long-term progress.",
      "Clear roadmaps, modern architecture, secure delivery, and ongoing support help turn a sound idea into a dependable solution. We include governance and human oversight where they matter.",
      "Our approach brings clarity to complex environments and helps teams move from disconnected tasks to coordinated operations.",
    ],
  },
  {
    id: "our-strengths",
    label: "Industry Experience",
    paragraphs: [
      "Our work supports industries with complex, high-volume operations, including healthcare, banking, telecom, property, retail, and manufacturing.",
      "We support healthcare revenue cycle operations and governed AI; banking fraud, service, and compliance workflows; telecom network and field operations; and service, inventory, maintenance, and quality processes across other sectors.",
      "Every organization has its own workflows, risks, and priorities. We tailor our services to each industry and the results each client needs.",
    ],
  },
  {
    id: "why-clients",
    label: "Why Pinnacle Serve",
    paragraphs: [
      "Clients choose us to connect their plans to practical delivery and build solutions that fit the way their business works.",
      "Product, cloud, data, automation, AI, and ongoing support often need to work as one. Our teams coordinate those disciplines around shared goals.",
      "We focus on improvements teams can see: faster turnaround, less overhead, better service, stronger controls, and more resilient operations.",
    ],
  },
  {
    id: "our-commitment",
    label: "Our Promise",
    paragraphs: [
      "We design for reliability, security, scale, and maintainability from the start, then stay involved to support ongoing improvement.",
      "As business needs and customer expectations change, we help organizations adapt with services that connect strong engineering to day-to-day operations.",
      "Our goal is to make work better with digital services that are useful now and ready for what comes next.",
    ],
  },
];

const leaderFallbacks: Leader[] = [
  {
    name: "Jhon Doe",
    role: "Chairman",
    paragraphs: [
      "Our leadership brings a practical understanding of the people, processes, and technology that make organizations work. We partner with teams to make change clear, useful, and sustainable.",
    ],
  },
  {
    name: "Jhon",
    role: "CEO",
    paragraphs: [
      "We bring operational support and modern technology together to help organizations improve service, simplify work, and grow with confidence.",
    ],
  },
];

const tabIcons = [Users, Layers, Sparkles, Globe2, Briefcase, Info];
const storyIcons = [Layers, Sparkles, CheckCircle2];

function parseArray(value: string | null, fallback: unknown[]): unknown[] {
  if (!value?.trim()) return fallback;
  try {
    const parsed: unknown = JSON.parse(value);
    return Array.isArray(parsed) ? parsed : fallback;
  } catch {
    return fallback;
  }
}

function asRecord(value: unknown): Record<string, unknown> | null {
  return value && typeof value === "object" && !Array.isArray(value)
    ? (value as Record<string, unknown>)
    : null;
}

function stringValue(value: unknown): string {
  return typeof value === "string" ? value.trim() : "";
}

function parseParagraphs(value: unknown): string[] {
  if (!Array.isArray(value)) return [];
  return value.filter((item): item is string => typeof item === "string" && Boolean(item.trim()));
}

function parseStoryCards(value: string | null): StoryCard[] {
  return parseArray(value, storyFallbacks)
    .map((item) => {
      const card = asRecord(item);
      return card
        ? {
            title: stringValue(card.title),
            description: stringValue(card.description ?? card.summary),
          }
        : null;
    })
    .filter((card): card is StoryCard => Boolean(card && (card.title || card.description)));
}

function parseApproachTabs(value: string | null): ApproachTab[] {
  return parseArray(value, tabFallbacks)
    .map((item) => {
      const tab = asRecord(item);
      if (!tab) return null;
      const label = stringValue(tab.label);
      return label
        ? {
            id: stringValue(tab.id) || label.toLowerCase().replace(/[^a-z0-9]+/g, "-"),
            label,
            paragraphs: parseParagraphs(tab.paragraphs),
          }
        : null;
    })
    .filter((tab): tab is ApproachTab => Boolean(tab));
}

function parseLeaders(value: string | null): Leader[] {
  return parseArray(value, leaderFallbacks)
    .map((item): Leader | null => {
      const leader = asRecord(item);
      if (!leader) return null;
      const name = stringValue(leader.name);
      return name
        ? {
            name,
            role: stringValue(leader.role),
            paragraphs: parseParagraphs(leader.paragraphs),
            imagePath: stringValue(leader.imagePath) || undefined,
          }
        : null;
    })
    .filter((leader): leader is Leader => leader !== null);
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

function getInternalHref(value: string | null | undefined): string {
  const href = value?.trim();
  return href && (href.startsWith("/") || href.startsWith("#")) && !href.startsWith("//")
    ? href
    : "/contact";
}

export default function AboutContent({ settings }: { settings: AboutPageSettings | null }) {
  const storyCards = parseStoryCards(settings?.aboutStoryCards ?? null);
  const approachTabs = parseApproachTabs(settings?.aboutApproachTabs ?? null);
  const leaders = parseLeaders(settings?.aboutLeaders ?? null);
  const [activeTab, setActiveTab] = useState(approachTabs[0]?.id ?? "founder");
  const selectedTab = approachTabs.find((tab) => tab.id === activeTab) ?? approachTabs[0];
  const heroImage =
    getMediaSource(settings?.aboutPageHeroImagePath) ??
    "https://images.unsplash.com/photo-1521737711867-e3b97375f902?auto=format&fit=crop&w=2400&q=85";

  return (
    <main className="w-full bg-white text-slate-900">
      <section className="relative isolate flex min-h-[560px] items-center justify-center overflow-hidden px-6 py-28 text-center text-white sm:min-h-[620px] sm:px-10 lg:px-16">
        <div
          aria-hidden="true"
          className="absolute inset-0 -z-20 bg-cover bg-center"
          style={{ backgroundImage: `url("${heroImage}")` }}
        />
        <div className="absolute inset-0 -z-10 bg-gradient-to-r from-[#302725]/80 via-[#14264a]/65 to-[#112758]/85" />
        <div className="absolute inset-0 -z-10 bg-[linear-gradient(rgba(255,255,255,0.035)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.035)_1px,transparent_1px)] bg-[size:42px_42px]" />

        <div className="relative mx-auto max-w-4xl pt-8">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-[11px] font-semibold tracking-[0.16em] text-white/90 uppercase backdrop-blur-sm">
            <span className="h-1.5 w-1.5 rounded-full bg-orange-400" />
            {settings?.aboutPageHeroTagline || "About Pinnacle Serve"}
          </div>
          <h1 className="mt-7 font-serif text-4xl leading-[1.08] font-semibold text-white sm:text-5xl lg:text-6xl">
            {settings?.aboutPageHeroTitle || "Practical change for"}
            <span className="mt-1 block font-normal text-[#f0a16d] italic">
              {settings?.aboutPageHeroAccent || "complex operations"}
            </span>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-sm leading-7 text-white/85 sm:text-base">
            {settings?.aboutPageHeroDescription ||
              "We bring operational support and modern technology together to help organizations improve service, simplify work, and grow with confidence."}
          </p>
        </div>
      </section>

      <section className="relative overflow-hidden bg-[#f8f9fc] px-6 py-20 sm:px-10 sm:py-24 lg:px-16">
        <div className="pointer-events-none absolute -right-28 -top-40 h-[560px] w-[560px] rounded-full bg-orange-100/60 blur-[120px]" />
        <div className="relative mx-auto max-w-7xl">
          <div className="max-w-3xl">
            <p className="text-xs font-semibold tracking-[0.18em] text-orange-600 uppercase">
              {settings?.aboutStoryTagline || "Our Story"}
            </p>
            <h2 className="mt-4 font-serif text-4xl leading-tight font-semibold text-[#142b58] sm:text-5xl">
              {settings?.aboutStoryTitle || "A partner for meaningful progress"}
            </h2>
            <p className="mt-6 text-base leading-7 text-slate-600">
              {settings?.aboutStoryDescription ||
                "Founded in 2024, Pinnacle Serve helps global clients connect reliable operations with practical technology delivery."}
            </p>
          </div>

          <div className="mt-12 grid gap-5 md:grid-cols-3">
            {storyCards.map((card, index) => {
              const Icon = storyIcons[index % storyIcons.length];
              return (
                <article
                  key={`${card.title}-${index}`}
                  className="group border-t-2 border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:border-orange-400 hover:shadow-lg sm:p-7"
                >
                  <span
                    className={`flex h-11 w-11 items-center justify-center rounded-xl ${
                      index % 3 === 0
                        ? "bg-blue-50 text-blue-700"
                        : index % 3 === 1
                          ? "bg-orange-50 text-orange-700"
                          : "bg-teal-50 text-teal-700"
                    }`}
                  >
                    <Icon className="h-5 w-5" />
                  </span>
                  <h3 className="mt-5 text-lg font-semibold text-[#142b58]">{card.title}</h3>
                  <p className="mt-3 text-sm leading-6 text-slate-600">{card.description}</p>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section id="pinnacle-approach" className="px-6 py-20 sm:px-10 sm:py-24 lg:px-16">
        <div className="mx-auto max-w-7xl">
          <div className="mb-10 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-xs font-semibold tracking-[0.18em] text-orange-600 uppercase">
                {settings?.aboutApproachTagline || "How We Work"}
              </p>
              <h2 className="mt-4 font-serif text-4xl font-semibold text-[#142b58] sm:text-5xl">
                {settings?.aboutApproachTitle || "The Pinnacle Serve approach"}
              </h2>
            </div>
            <p className="max-w-md text-sm leading-6 text-slate-600">
              {settings?.aboutApproachDescription ||
                "Get to know our leadership, services, and the principles behind each engagement."}
            </p>
          </div>

          {selectedTab ? (
            <>
              <div role="tablist" aria-label="About Pinnacle Serve" className="flex gap-2 overflow-x-auto border-b border-slate-200 pb-3">
                {approachTabs.map((tab, index) => {
                  const Icon = tabIcons[index % tabIcons.length];
                  return (
                    <button
                      key={tab.id}
                      id={`about-tab-${tab.id}`}
                      type="button"
                      role="tab"
                      aria-selected={activeTab === tab.id}
                      aria-controls={`about-panel-${tab.id}`}
                      tabIndex={activeTab === tab.id ? 0 : -1}
                      onClick={() => setActiveTab(tab.id)}
                      className={`inline-flex shrink-0 items-center gap-2 rounded-full px-4 py-2.5 text-sm font-medium transition ${
                        activeTab === tab.id
                          ? "bg-[#142b58] text-white"
                          : "bg-[#f4f6fb] text-slate-600 hover:bg-orange-50 hover:text-orange-700"
                      }`}
                    >
                      <Icon className="h-4 w-4" />
                      {tab.label}
                    </button>
                  );
                })}
              </div>

              <div
                id={`about-panel-${selectedTab.id}`}
                role="tabpanel"
                aria-labelledby={`about-tab-${selectedTab.id}`}
                className="pt-8"
              >
                {selectedTab.id === "founder" ? (
                  <div>
                    <h3 className="font-serif text-2xl font-semibold text-[#142b58]">
                      {settings?.aboutLeadershipTitle || "Leadership"}
                    </h3>
                    <div className="mt-6 grid gap-5 lg:grid-cols-2">
                      {leaders.map((leader, index) => {
                        const image = getMediaSource(leader.imagePath);
                        return (
                          <article
                            key={`${leader.name}-${index}`}
                            className="overflow-hidden border border-slate-200 bg-white shadow-sm sm:flex"
                          >
                            <div
                              aria-hidden="true"
                              className="flex h-40 shrink-0 items-center justify-center bg-gradient-to-br from-[#142b58] via-[#1d477d] to-[#e87924] bg-cover bg-center text-5xl font-semibold tracking-wide text-white sm:h-auto sm:min-h-[300px] sm:w-44 lg:w-52"
                              style={image ? { backgroundImage: `url("${image}")` } : undefined}
                            >
                              {!image
                                ? leader.name
                                    .split(/\s+/)
                                    .map((part) => part[0])
                                    .join("")
                                    .slice(0, 2)
                                    .toUpperCase()
                                : null}
                            </div>
                            <div className="p-5 sm:p-6">
                              <p className="text-[10px] font-semibold tracking-[0.15em] text-orange-600 uppercase">
                                {leader.role}
                              </p>
                              <h4 className="mt-1 font-serif text-2xl font-semibold text-[#142b58]">
                                {leader.name}
                              </h4>
                              <div className="mt-4 space-y-3 text-sm leading-6 text-slate-600">
                                {leader.paragraphs.map((paragraph, paragraphIndex) => (
                                  <p key={`${leader.name}-paragraph-${paragraphIndex}`}>{paragraph}</p>
                                ))}
                              </div>
                            </div>
                          </article>
                        );
                      })}
                    </div>
                  </div>
                ) : (
                  <article className="grid gap-8 rounded-2xl border border-slate-200 bg-[#f8f9fc] p-6 sm:p-8 lg:grid-cols-[0.5fr_1.5fr] lg:gap-14 lg:p-10">
                    <div>
                      {(() => {
                        const Icon =
                          tabIcons[approachTabs.findIndex((tab) => tab.id === selectedTab.id) % tabIcons.length];
                        return (
                          <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-orange-50 text-orange-700">
                            <Icon className="h-6 w-6" />
                          </span>
                        );
                      })()}
                      <h3 className="mt-5 font-serif text-3xl font-semibold text-[#142b58]">
                        {selectedTab.label}
                      </h3>
                    </div>
                    <div className="space-y-5 text-sm leading-7 text-slate-600 sm:text-base">
                      {selectedTab.paragraphs.map((paragraph, index) => (
                        <p key={`${selectedTab.id}-paragraph-${index}`}>{paragraph}</p>
                      ))}
                    </div>
                  </article>
                )}
              </div>
            </>
          ) : null}
        </div>
      </section>

      <section className="px-6 pb-20 sm:px-10 sm:pb-24 lg:px-16">
        <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-8 rounded-2xl bg-[#142b58] px-7 py-10 text-white sm:px-10 sm:py-12 lg:flex-row lg:items-center">
          <div>
            <p className="text-xs font-semibold tracking-[0.16em] text-orange-300 uppercase">
              {settings?.aboutPageCtaTagline || "Take the next step"}
            </p>
            <h2 className="mt-3 font-serif text-3xl font-semibold sm:text-4xl">
              {settings?.aboutPageCtaTitle || "Let's make progress together."}
            </h2>
            <p className="mt-3 max-w-2xl text-sm leading-6 text-white/75">
              {settings?.aboutPageCtaDescription ||
                "Tell us what you're working toward. We'll help you find a practical way forward."}
            </p>
          </div>
          <Link
            href={getInternalHref(settings?.aboutPageCtaButtonHref)}
            className="group inline-flex shrink-0 items-center gap-2 rounded-full bg-[#e36a1e] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#cc5c15]"
          >
            {settings?.aboutPageCtaButtonLabel || "Start a conversation"}
            <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Link>
        </div>
      </section>
    </main>
  );
}
