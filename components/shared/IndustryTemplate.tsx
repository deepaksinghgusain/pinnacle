import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  ArrowUpRight,
  BarChart3,
  Boxes,
  BriefcaseBusiness,
  CircleCheck,
  Network,
  UsersRound,
} from "lucide-react";
import type { IndustryContent } from "@/lib/industry-content";

type Props = {
  name: string;
  content: IndustryContent;
};

const challengeIcons = [Boxes, BarChart3, UsersRound, Network, BriefcaseBusiness];
const capabilityIcons = [BriefcaseBusiness, Network, UsersRound, Boxes, CircleCheck];

function getImageSource(value: string) {
  const source = value.trim();
  if (/^\/?uploads\//i.test(source)) {
    return `/api/uploads/${source.replace(/^\/?uploads\//i, "")}`;
  }
  if (/^(https?:\/\/|\/)/i.test(source)) return source;
  return "/welcoming-moments.png";
}

function getInternalHref(value: string, fallback: string) {
  const href = value.trim();
  return (href.startsWith("/") || href.startsWith("#")) && !href.startsWith("//")
    ? href
    : fallback;
}

export default function IndustryTemplate({ name, content }: Props) {
  return (
    <main className="w-full overflow-hidden bg-white text-slate-900">
      <section className="relative isolate bg-[#101a2d] px-6 pb-16 pt-32 text-white sm:px-10 sm:pb-20 sm:pt-36 lg:px-16 lg:pb-24">
        <div
          aria-hidden="true"
          className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_78%_22%,rgba(232,121,36,0.2),transparent_35%),linear-gradient(115deg,#101a2d_12%,#172f53_100%)]"
        />
        <div className="mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16">
          <div className="max-w-2xl">
            <nav aria-label="Breadcrumb" className="mb-9 text-sm text-white/65">
              <Link href="/industries" className="transition hover:text-white">
                Industries
              </Link>
              <span className="mx-2 text-white/35">/</span>
              <span aria-current="page" className="text-orange-300">{name}</span>
            </nav>
            <p className="text-xs font-semibold tracking-[0.18em] text-orange-300 uppercase">
              Industry experience
            </p>
            <h1 className="mt-5 font-serif text-4xl leading-tight font-semibold tracking-tight sm:text-5xl lg:text-6xl">
              {content.heroTitle}
            </h1>
            <p className="mt-6 max-w-2xl text-base leading-7 text-white/75 sm:text-lg sm:leading-8">
              {content.heroDescription}
            </p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <Link
                href={getInternalHref(content.heroPrimaryHref, "#our-solutions")}
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-[#e87924] px-6 text-sm font-semibold text-white shadow-lg shadow-orange-950/25 transition hover:bg-[#d66d1e] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-300"
              >
                {content.heroPrimaryLabel}
                <ArrowUpRight className="size-4" aria-hidden="true" />
              </Link>
              <Link
                href={getInternalHref(content.heroSecondaryHref, "/contact")}
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-white/25 px-6 text-sm font-semibold text-white transition hover:border-white/50 hover:bg-white/5 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
              >
                {content.heroSecondaryLabel}
                <ArrowRight className="size-4" aria-hidden="true" />
              </Link>
            </div>
          </div>

          <div className="relative mx-auto w-full max-w-[560px] lg:ml-auto">
            <div className="absolute -inset-4 rounded-[2rem] border border-white/10" aria-hidden="true" />
            <div className="relative aspect-[1.25] overflow-hidden rounded-[1.5rem] bg-slate-800 shadow-2xl shadow-black/30">
              <Image
                src={getImageSource(content.heroImagePath)}
                alt={`${name} industry operations`}
                fill
                priority
                unoptimized
                sizes="(min-width: 1024px) 46vw, 100vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#101a2d]/55 via-transparent to-transparent" />
            </div>
          </div>
        </div>
      </section>

      <section className="px-6 py-20 sm:px-10 sm:py-24 lg:px-16">
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[0.75fr_1.25fr] lg:gap-16">
          <div>
            <p className="text-xs font-semibold tracking-[0.18em] text-orange-700 uppercase">
              Industry overview
            </p>
            <h2 className="mt-4 max-w-md font-serif text-3xl leading-tight font-semibold text-[#142b58] sm:text-4xl">
              {content.overviewTitle}
            </h2>
          </div>
          <p className="max-w-3xl whitespace-pre-line text-base leading-8 text-slate-600">
            {content.overviewDescription}
          </p>
        </div>
      </section>

      <section className="bg-[#f7f8fb] px-6 py-20 sm:px-10 sm:py-24 lg:px-16">
        <div className="mx-auto max-w-7xl">
          <p className="text-xs font-semibold tracking-[0.18em] text-orange-700 uppercase">
            Industry challenges
          </p>
          <h2 className="mt-4 font-serif text-3xl font-semibold text-[#142b58] sm:text-4xl">
            {content.challengesTitle}
          </h2>
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {content.challenges.map((item, index) => {
              const Icon = challengeIcons[index % challengeIcons.length];
              return (
                <article key={`${item.title}-${index}`} className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                  <Icon className="size-6 text-orange-600" aria-hidden="true" />
                  <h3 className="mt-5 text-lg font-semibold text-[#142b58]">{item.title}</h3>
                  {item.description ? <p className="mt-2 text-sm leading-6 text-slate-600">{item.description}</p> : null}
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section id="our-solutions" className="scroll-mt-24 bg-white px-6 py-20 sm:px-10 sm:py-24 lg:px-16">
        <div className="mx-auto max-w-7xl">
          <p className="text-xs font-semibold tracking-[0.18em] text-orange-700 uppercase">Our solutions</p>
          <h2 className="mt-4 font-serif text-3xl font-semibold text-[#142b58] sm:text-4xl">
            {content.solutionsTitle}
          </h2>
          {content.solutionsDescription ? (
            <p className="mt-4 max-w-3xl text-base leading-7 text-slate-600">{content.solutionsDescription}</p>
          ) : null}
          <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {content.solutions.map((item, index) => {
              const card = (
                <>
                  <p className="font-mono text-xs font-semibold tracking-wider text-orange-700">
                    {String(index + 1).padStart(2, "0")}
                  </p>
                  <h3 className="mt-4 text-xl font-semibold text-[#142b58]">{item.title}</h3>
                  {item.description ? <p className="mt-3 text-sm leading-6 text-slate-600">{item.description}</p> : null}
                  {item.href ? (
                    <span className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-orange-700">
                      Explore service <ArrowRight className="size-4" aria-hidden="true" />
                    </span>
                  ) : null}
                </>
              );

              return item.href ? (
                <Link
                  key={`${item.title}-${index}`}
                  href={getInternalHref(item.href, "/contact")}
                  className="rounded-2xl border border-slate-200 bg-white p-6 transition hover:-translate-y-1 hover:border-orange-200 hover:shadow-lg sm:p-7"
                >
                  {card}
                </Link>
              ) : (
                <article key={`${item.title}-${index}`} className="rounded-2xl border border-slate-200 bg-white p-6 sm:p-7">
                  {card}
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="bg-[#101a2d] px-6 py-20 text-white sm:px-10 sm:py-24 lg:px-16">
        <div className="mx-auto max-w-7xl">
          <p className="text-xs font-semibold tracking-[0.18em] text-orange-300 uppercase">Capabilities</p>
          <h2 className="mt-4 font-serif text-3xl font-semibold sm:text-4xl">{content.capabilitiesTitle}</h2>
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {content.capabilities.map((item, index) => {
              const Icon = capabilityIcons[index % capabilityIcons.length];
              return (
                <article key={`${item.title}-${index}`} className="rounded-2xl border border-white/10 bg-white/[0.04] p-6">
                  <Icon className="size-6 text-orange-300" aria-hidden="true" />
                  <h3 className="mt-5 text-lg font-semibold">{item.title}</h3>
                  {item.description ? <p className="mt-2 text-sm leading-6 text-white/65">{item.description}</p> : null}
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="px-6 py-20 sm:px-10 sm:py-24 lg:px-16">
        <div className="mx-auto max-w-7xl">
          <p className="text-xs font-semibold tracking-[0.18em] text-orange-700 uppercase">Business outcomes</p>
          <h2 className="mt-4 font-serif text-3xl font-semibold text-[#142b58] sm:text-4xl">{content.outcomesTitle}</h2>
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {content.outcomes.map((item, index) => (
              <article key={`${item.title}-${index}`} className="border-t-2 border-orange-400 bg-[#f8f9fc] p-6">
                <p className="font-mono text-xs font-semibold text-orange-700">{String(index + 1).padStart(2, "0")}</p>
                <h3 className="mt-4 text-lg font-semibold text-[#142b58]">{item.title}</h3>
                {item.description ? <p className="mt-2 text-sm leading-6 text-slate-600">{item.description}</p> : null}
              </article>
            ))}
          </div>
          <Link
            href="/contact"
            className="mt-10 inline-flex items-center gap-2 rounded-full bg-[#e87924] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#d66d1e]"
          >
            Talk to our team <ArrowRight className="size-4" aria-hidden="true" />
          </Link>
        </div>
      </section>
    </main>
  );
}
