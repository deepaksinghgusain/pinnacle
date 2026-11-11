import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  ArrowUpRight,
  CheckCircle2,
  Target,
  UserRound,
} from "lucide-react";
import type { CaseStudyContent } from "@/lib/editorial-content";

type Props = {
  name: string;
  content: CaseStudyContent;
};

function getImageSource(value: string) {
  const source = value.trim();
  if (/^\/?uploads\//i.test(source)) return `/api/uploads/${source.replace(/^\/?uploads\//i, "")}`;
  if (/^(https?:\/\/|\/)/i.test(source)) return source;
  return "/welcoming-moments.png";
}

function getHref(value: string) {
  const href = value.trim();
  return (href.startsWith("/") || href.startsWith("#")) && !href.startsWith("//")
    ? href
    : "/contact";
}

const storySections = [
  { key: "clientOverview", icon: UserRound },
  { key: "challenge", icon: Target },
  { key: "objectives", icon: CheckCircle2 },
  { key: "solution", icon: ArrowUpRight },
] as const;

export default function CaseStudyTemplate({ name, content }: Props) {
  const values = {
    clientOverview: { heading: content.clientOverviewTitle, body: content.clientOverview },
    challenge: { heading: content.challengeTitle, body: content.challenge },
    objectives: { heading: content.objectivesTitle, body: content.objectives },
    solution: { heading: content.solutionTitle, body: content.solution },
  };

  return (
    <main className="w-full overflow-hidden bg-white text-slate-900">
      <section className="relative isolate bg-[#101a2d] px-6 pb-16 pt-32 text-white sm:px-10 sm:pb-20 sm:pt-36 lg:px-16 lg:pb-24">
        <div aria-hidden="true" className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_78%_22%,rgba(232,121,36,0.2),transparent_35%),linear-gradient(115deg,#101a2d_12%,#172f53_100%)]" />
        <div className="mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16">
          <div className="max-w-2xl">
            <nav aria-label="Breadcrumb" className="mb-9 text-sm text-white/65">
              <Link href="/case-studies" className="hover:text-white">Case Studies</Link>
              <span className="mx-2 text-white/35">/</span>
              <span className="text-orange-300">{name}</span>
            </nav>
            <p className="text-xs font-semibold tracking-[0.18em] text-orange-300 uppercase">{content.industryLabel}</p>
            <h1 className="mt-5 font-serif text-4xl leading-tight font-semibold tracking-tight sm:text-5xl lg:text-6xl">{content.heroTitle}</h1>
            <p className="mt-6 max-w-2xl text-base leading-7 text-white/75 sm:text-lg sm:leading-8">{content.summary}</p>
          </div>
          <div className="relative mx-auto w-full max-w-[560px] lg:ml-auto">
            <div className="absolute -inset-4 rounded-[2rem] border border-white/10" aria-hidden="true" />
            <div className="relative aspect-[1.25] overflow-hidden rounded-[1.5rem] bg-slate-800 shadow-2xl shadow-black/30">
              <Image src={getImageSource(content.heroImagePath)} alt={`${name} case study`} fill priority unoptimized sizes="(min-width: 1024px) 46vw, 100vw" className="object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#101a2d]/45 via-transparent to-transparent" />
            </div>
          </div>
        </div>
      </section>

      <section className="px-6 py-16 sm:px-10 sm:py-20 lg:px-16">
        <div className="mx-auto max-w-7xl">
          <p className="text-xs font-semibold tracking-[0.18em] text-orange-700 uppercase">The engagement</p>
          <div className="mt-8 grid gap-5 md:grid-cols-2">
            {storySections.map(({ key, icon: Icon }) => {
              const section = values[key];
              return (
                <article key={key} className="rounded-2xl border border-slate-200 bg-[#f8f9fc] p-6 sm:p-8">
                  <Icon className="size-6 text-orange-600" aria-hidden="true" />
                  <h2 className="mt-5 font-serif text-2xl font-semibold text-[#142b58]">{section.heading}</h2>
                  <p className="mt-4 whitespace-pre-line text-sm leading-7 text-slate-600 sm:text-base">{section.body}</p>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="bg-[#f7f8fb] px-6 py-16 sm:px-10 sm:py-20 lg:px-16">
        <div className="mx-auto max-w-7xl">
          <p className="text-xs font-semibold tracking-[0.18em] text-orange-700 uppercase">Business results</p>
          <h2 className="mt-4 font-serif text-3xl font-semibold text-[#142b58] sm:text-4xl">{content.resultsTitle}</h2>
          <div className="mt-9 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {content.results.map((item, index) => (
              <article key={`${item.title}-${index}`} className="rounded-xl border border-slate-200 bg-white p-6">
                <p className="font-mono text-xs font-semibold text-orange-700">{String(index + 1).padStart(2, "0")}</p>
                <h3 className="mt-4 text-lg font-semibold text-[#142b58]">{item.title}</h3>
                {item.description ? <p className="mt-2 text-sm leading-6 text-slate-600">{item.description}</p> : null}
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="px-6 py-16 sm:px-10 sm:py-20 lg:px-16">
        <div className="mx-auto grid max-w-7xl gap-5 rounded-2xl border border-slate-200 p-7 sm:p-10 md:grid-cols-[0.7fr_1.3fr]">
          <div>
            <p className="text-xs font-semibold tracking-[0.18em] text-orange-700 uppercase">Key takeaways</p>
            <h2 className="mt-4 font-serif text-3xl font-semibold text-[#142b58]">{content.takeawaysTitle}</h2>
          </div>
          <p className="whitespace-pre-line text-base leading-8 text-slate-600">{content.takeaways}</p>
        </div>
      </section>

      <section className="bg-[#101a2d] px-6 py-16 text-white sm:px-10 sm:py-20 lg:px-16">
        <div className="mx-auto flex max-w-7xl flex-col gap-7 md:flex-row md:items-center md:justify-between">
          <div className="max-w-2xl">
            <p className="text-xs font-semibold tracking-[0.18em] text-orange-300 uppercase">Pinnacle Serve</p>
            <h2 className="mt-4 font-serif text-3xl font-semibold sm:text-4xl">{content.ctaTitle}</h2>
            <p className="mt-4 text-base leading-7 text-white/70">{content.ctaDescription}</p>
          </div>
          <Link href={getHref(content.ctaButtonHref)} className="inline-flex min-h-12 shrink-0 items-center justify-center gap-2 self-start rounded-full bg-[#e87924] px-6 text-sm font-semibold text-white transition hover:bg-[#d66d1e] md:self-center">
            {content.ctaButtonLabel}<ArrowRight className="size-4" aria-hidden="true" />
          </Link>
        </div>
      </section>
    </main>
  );
}
