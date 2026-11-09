import Image from "next/image";
import Link from "next/link";
import {
  ArrowDown,
  ArrowRight,
  ArrowUpRight,
  BookOpen,
  BriefcaseBusiness,
  Lightbulb,
  MessageCircle,
  UsersRound,
} from "lucide-react";
import {
  defaultGrowthLearningContent,
  type GrowthLearningContent,
} from "@/lib/growth-learning-content";

type Props = {
  content: GrowthLearningContent;
  breadcrumbTitle?: string;
};

function getImageSource(value: string) {
  const source = value.trim() || defaultGrowthLearningContent.heroImagePath;
  if (/^\/?uploads\//i.test(source)) {
    return `/api/uploads/${source.replace(/^\/?uploads\//i, "")}`;
  }
  if (/^(https?:\/\/|\/)/i.test(source)) return source;
  return defaultGrowthLearningContent.heroImagePath;
}

function getInternalHref(value: string, fallback: string) {
  const href = value.trim();
  return (href.startsWith("/") || href.startsWith("#")) && !href.startsWith("//")
    ? href
    : fallback;
}

export default function CareerGrowthLearningPage({
  content,
  breadcrumbTitle = content.heroTitle,
}: Props) {
  const pillarIcons = [BriefcaseBusiness, UsersRound, Lightbulb];
  const heroImage = getImageSource(content.heroImagePath);

  return (
    <main className="w-full overflow-hidden bg-white text-slate-900">
      <section className="relative isolate bg-[#101a2d] px-6 pb-16 pt-28 text-white sm:px-10 sm:pb-20 sm:pt-32 lg:px-16 lg:pb-24 lg:pt-36">
        <div
          aria-hidden="true"
          className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_78%_22%,rgba(232,121,36,0.2),transparent_35%),linear-gradient(115deg,#101a2d_12%,#172f53_100%)]"
        />
        <div className="mx-auto max-w-7xl">
          <nav aria-label="Breadcrumb" className="mb-10 text-sm text-white/65">
            <Link href="/career" className="transition hover:text-white">
              Careers
            </Link>
            <span className="mx-2 text-white/35">/</span>
            <span aria-current="page" className="text-orange-300">
              {breadcrumbTitle}
            </span>
          </nav>

          <div className="grid items-center gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16">
            <div className="max-w-2xl">
              <p className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.06] px-4 py-2 text-xs font-semibold tracking-[0.14em] text-orange-200 uppercase">
                <BookOpen className="size-4" aria-hidden="true" />
                {content.heroEyebrow}
              </p>
              <h1 className="mt-7 font-serif text-4xl leading-[1.08] font-semibold tracking-tight sm:text-5xl lg:text-6xl">
                {content.heroTitle}
                <span className="mt-2 block font-normal italic text-[#f28b32]">
                  {content.heroAccent}
                </span>
              </h1>
              <p className="mt-6 max-w-xl text-base leading-7 text-white/75 sm:text-lg sm:leading-8">
                {content.heroDescription}
              </p>
              <div className="mt-9 flex flex-col gap-3 sm:flex-row">
                <Link
                  href={getInternalHref(content.heroPrimaryHref, "/career#open-positions")}
                  className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-[#e87924] px-6 text-sm font-semibold text-white shadow-lg shadow-orange-950/25 transition hover:bg-[#d66d1e] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-300"
                >
                  {content.heroPrimaryLabel}
                  <ArrowUpRight className="size-4" aria-hidden="true" />
                </Link>
                <a
                  href={getInternalHref(content.heroSecondaryHref, "#how-we-grow")}
                  className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-white/25 px-6 text-sm font-semibold text-white transition hover:border-white/50 hover:bg-white/5 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                >
                  {content.heroSecondaryLabel}
                  <ArrowDown className="size-4" aria-hidden="true" />
                </a>
              </div>
              <p className="mt-7 flex items-start gap-2 text-xs leading-5 text-white/55">
                <MessageCircle
                  className="mt-0.5 size-4 shrink-0 text-orange-300"
                  aria-hidden="true"
                />
                {content.heroNote}
              </p>
            </div>

            <div className="relative mx-auto w-full max-w-[560px] lg:ml-auto">
              <div
                className="absolute -inset-4 rounded-[2rem] border border-white/10"
                aria-hidden="true"
              />
              <div className="relative aspect-[1.13] overflow-hidden rounded-[1.5rem] bg-slate-800 shadow-2xl shadow-black/30 sm:aspect-[1.22]">
                <Image
                  src={heroImage}
                  alt={content.heroImageAlt}
                  fill
                  priority
                  unoptimized
                  sizes="(min-width: 1024px) 46vw, 100vw"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#101a2d]/65 via-transparent to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-6 sm:p-8">
                  <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-[#101a2d]/65 px-3 py-1.5 text-xs font-medium text-white backdrop-blur">
                    <span className="size-2 rounded-full bg-emerald-400" />
                    {content.heroImageBadge}
                  </span>
                </div>
              </div>
              <div className="absolute -bottom-5 -left-3 hidden max-w-[225px] rounded-2xl border border-slate-100 bg-white p-4 text-slate-900 shadow-xl sm:block lg:-left-7">
                <p className="text-xs font-semibold tracking-wide text-orange-700 uppercase">
                  {content.heroImageCardTitle}
                </p>
                <p className="mt-1 text-sm leading-5 text-slate-600">
                  {content.heroImageCardDescription}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="px-6 py-20 sm:px-10 sm:py-24 lg:px-16">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
            <div>
              <p className="text-xs font-semibold tracking-[0.18em] text-orange-700 uppercase">
                {content.introEyebrow}
              </p>
              <h2 className="mt-4 max-w-md font-serif text-3xl leading-tight font-semibold text-[#142b58] sm:text-4xl">
                {content.introTitle}
              </h2>
            </div>
            <p className="max-w-2xl text-base leading-7 text-slate-600">
              {content.introDescription}
            </p>
          </div>

          <div className="mt-12 grid gap-4 md:grid-cols-3">
            {content.pillars.map(({ title, description }, index) => {
              const Icon = pillarIcons[index % pillarIcons.length];
              return (
                <article
                  key={`${title}-${index}`}
                  className="group rounded-2xl border border-slate-200 bg-white p-6 transition hover:-translate-y-1 hover:border-orange-200 hover:shadow-xl hover:shadow-slate-900/5 sm:p-7"
                >
                  <div className="flex items-center justify-between">
                    <span className="flex size-12 items-center justify-center rounded-xl bg-orange-50 text-orange-700 transition group-hover:bg-orange-100">
                      <Icon className="size-5" aria-hidden="true" />
                    </span>
                    <span className="font-mono text-xs font-medium text-slate-400">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                  </div>
                  <h3 className="mt-7 text-lg font-semibold text-[#142b58]">
                    {title}
                  </h3>
                  <p className="mt-3 text-sm leading-6 text-slate-600">
                    {description}
                  </p>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section
        id="how-we-grow"
        className="scroll-mt-24 bg-[#f7f8fb] px-6 py-20 sm:px-10 sm:py-24 lg:px-16"
      >
        <div className="mx-auto max-w-7xl">
          <div className="max-w-2xl">
            <p className="text-xs font-semibold tracking-[0.18em] text-orange-700 uppercase">
              {content.stepsEyebrow}
            </p>
            <h2 className="mt-4 font-serif text-3xl leading-tight font-semibold text-[#142b58] sm:text-4xl">
              {content.stepsTitle}
            </h2>
            <p className="mt-4 text-base leading-7 text-slate-600">
              {content.stepsDescription}
            </p>
          </div>

          <ol className="mt-12 grid gap-0 border-y border-slate-200 md:grid-cols-3 md:border-y-0">
            {content.steps.map((step, index) => (
              <li
                key={`${step.title}-${index}`}
                className="relative border-b border-slate-200 py-7 first:pt-7 last:border-b-0 md:border-b-0 md:border-l md:px-8 md:py-2 md:first:border-l-0 md:first:pl-0 md:last:pr-0"
              >
                <span className="font-mono text-xs font-semibold tracking-wider text-orange-700">
                  STEP {String(index + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-4 text-lg font-semibold text-[#142b58]">
                  {step.title}
                </h3>
                <p className="mt-3 text-sm leading-6 text-slate-600">
                  {step.description}
                </p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="px-6 py-16 sm:px-10 sm:py-20 lg:px-16">
        <div className="relative mx-auto max-w-7xl overflow-hidden rounded-[1.5rem] bg-[#142b58] px-7 py-10 text-white sm:px-10 sm:py-12 lg:px-14">
          <div
            aria-hidden="true"
            className="absolute -right-20 -top-32 size-80 rounded-full bg-orange-500/15 blur-3xl"
          />
          <div className="relative flex flex-col gap-7 md:flex-row md:items-center md:justify-between">
            <div className="max-w-2xl">
              <p className="text-xs font-semibold tracking-[0.16em] text-orange-300 uppercase">
                {content.ctaEyebrow}
              </p>
              <h2 className="mt-3 font-serif text-3xl font-semibold sm:text-4xl">
                {content.ctaTitle}
              </h2>
              <p className="mt-4 text-sm leading-6 text-white/75 sm:text-base">
                {content.ctaDescription}
              </p>
            </div>
            <Link
              href={getInternalHref(content.ctaButtonHref, "/career#open-positions")}
              className="inline-flex min-h-12 shrink-0 items-center justify-center gap-2 self-start rounded-full bg-[#e87924] px-6 text-sm font-semibold text-white transition hover:bg-[#d66d1e] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-300 md:self-center"
            >
              {content.ctaButtonLabel}
              <ArrowRight className="size-4" aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
