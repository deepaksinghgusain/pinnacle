import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  ArrowUpRight,
  Handshake,
  Heart,
  MessageSquareText,
  UsersRound,
} from "lucide-react";
import {
  defaultCultureContent,
  type CultureContent,
} from "@/lib/culture-content";

type Props = {
  content: CultureContent;
};

function getImageSource(value: string) {
  const source = value.trim() || defaultCultureContent.heroImagePath;
  if (/^\/?uploads\//i.test(source)) {
    return `/api/uploads/${source.replace(/^\/?uploads\//i, "")}`;
  }
  if (/^(https?:\/\/|\/)/i.test(source)) return source;
  return defaultCultureContent.heroImagePath;
}

function getInternalHref(value: string, fallback: string) {
  const href = value.trim();
  return (href.startsWith("/") || href.startsWith("#")) && !href.startsWith("//")
    ? href
    : fallback;
}

export default function CareerCulturePage({ content }: Props) {
  const heroImage = getImageSource(content.heroImagePath);
  const pillarIcons = [UsersRound, MessageSquareText, Handshake];

  return (
    <main className="w-full overflow-hidden bg-[#030917] text-white">
      <section className="relative isolate bg-[#050f21] px-6 pb-16 pt-28 text-white sm:px-10 sm:pb-20 sm:pt-32 lg:px-16 lg:pb-24 lg:pt-36">
        <div
          aria-hidden="true"
          className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_78%_22%,rgba(240,100,37,0.18),transparent_35%),linear-gradient(115deg,#030917_12%,#102347_100%)]"
        />
        <div className="mx-auto max-w-7xl">
          <nav aria-label="Breadcrumb" className="mb-10 text-sm text-slate-400">
            <Link href="/career" className="transition hover:text-white">
              Careers
            </Link>
            <span className="mx-2 text-white/35">/</span>
            <span aria-current="page" className="text-[#f06425]">
              Our culture
            </span>
          </nav>

          <div className="grid items-center gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16">
            <div className="max-w-2xl">
              <p className="inline-flex items-center gap-2 rounded-full border border-[#f06425]/40 bg-[#f06425]/10 px-4 py-1.5 text-xs font-semibold tracking-wider text-[#f06425] uppercase">
                <Heart className="size-4" aria-hidden="true" />
                {content.heroEyebrow}
              </p>
              <h1 className="mt-7 font-serif text-4xl leading-[1.08] font-bold tracking-tight text-white sm:text-5xl lg:text-6xl">
                {content.heroTitle}
                <span className="mt-2 block font-normal italic text-[#f06425]">
                  {content.heroAccent}
                </span>
              </h1>
              <p className="mt-6 max-w-xl text-base leading-7 text-slate-300 sm:text-lg sm:leading-8">
                {content.heroDescription}
              </p>
              <div className="mt-9 flex flex-col gap-3 sm:flex-row">
                <Link
                  href={getInternalHref(content.heroPrimaryHref, "/career#open-positions")}
                  className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-[#e36a1e] px-6 text-sm font-semibold text-white shadow-lg shadow-orange-950/40 transition hover:bg-[#cc5c15] hover:shadow-orange-500/30 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-300"
                >
                  {content.heroPrimaryLabel}
                  <ArrowUpRight className="size-4" aria-hidden="true" />
                </Link>
                <a
                  href={getInternalHref(content.heroSecondaryHref, "#culture-in-practice")}
                  className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-slate-700 px-6 text-sm font-semibold text-white transition hover:border-slate-500 hover:bg-white/5 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                >
                  {content.heroSecondaryLabel}
                  <ArrowRight className="size-4" aria-hidden="true" />
                </a>
              </div>
              <p className="mt-7 flex items-start gap-2 text-xs leading-5 text-slate-400">
                <Heart
                  className="mt-0.5 size-4 shrink-0 text-[#f06425]"
                  aria-hidden="true"
                />
                {content.heroNote}
              </p>
            </div>

            <div className="relative mx-auto w-full max-w-[560px] lg:ml-auto">
              <div
                className="absolute -inset-4 rounded-[2rem] border border-slate-700/70"
                aria-hidden="true"
              />
              <div className="relative aspect-[1.13] overflow-hidden rounded-2xl border border-slate-700/70 bg-[#091526] shadow-2xl shadow-black/50 sm:aspect-[1.22]">
                <Image
                  src={heroImage}
                  alt={content.heroImageAlt}
                  fill
                  priority
                  unoptimized
                  sizes="(min-width: 1024px) 46vw, 100vw"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#030917]/75 via-transparent to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-6 sm:p-8">
                  <span className="inline-flex items-center gap-2 rounded-full border border-slate-600/70 bg-[#030917]/75 px-3 py-1.5 text-xs font-medium text-white backdrop-blur">
                    <span className="size-2 rounded-full bg-[#f06425]" />
                    {content.heroImageBadge}
                  </span>
                </div>
              </div>
              <div className="absolute -bottom-5 -left-3 hidden max-w-[225px] rounded-2xl border border-slate-700 bg-[#091526] p-4 text-white shadow-xl sm:block lg:-left-7">
                <p className="text-xs font-semibold tracking-wide text-[#f06425] uppercase">
                  {content.heroImageCardTitle}
                </p>
                <p className="mt-1 text-sm leading-5 text-slate-300">
                  {content.heroImageCardDescription}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="border-t border-slate-800/70 bg-[#030917] px-6 py-20 sm:px-10 sm:py-24 lg:px-16">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
            <div>
              <p className="text-xs font-semibold tracking-[0.18em] text-[#f06425] uppercase">
                {content.introEyebrow}
              </p>
              <h2 className="mt-4 max-w-md font-serif text-3xl leading-tight font-bold text-white sm:text-4xl">
                {content.introTitle}
              </h2>
            </div>
            <p className="max-w-2xl text-base leading-7 text-slate-400">
              {content.introDescription}
            </p>
          </div>

          <div className="mt-12 grid gap-4 md:grid-cols-3">
            {content.pillars.map(({ title, description }, index) => {
              const Icon = pillarIcons[index % pillarIcons.length];
              return (
              <article
                key={`${title}-${index}`}
                className="group rounded-2xl border border-slate-800/80 bg-[#091526]/85 p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-slate-700 hover:bg-[#0c1d36] hover:shadow-xl hover:shadow-blue-950/30 sm:p-7"
              >
                <div className="flex items-center justify-between">
                  <span className="flex size-12 items-center justify-center rounded-xl border border-orange-500/20 bg-orange-500/10 text-[#f06425] transition group-hover:bg-orange-500/20">
                    <Icon className="size-5" aria-hidden="true" />
                  </span>
                  <span className="font-mono text-xs font-semibold tracking-wider text-slate-500">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                </div>
                <h3 className="mt-7 text-lg font-semibold text-white">
                  {title}
                </h3>
                <p className="mt-3 text-sm leading-6 text-slate-400">
                  {description}
                </p>
              </article>
              );
            })}
          </div>
        </div>
      </section>

      <section
        id="culture-in-practice"
        className="relative scroll-mt-24 overflow-hidden border-t border-slate-800/70 bg-[#050f21] px-6 py-20 sm:px-10 sm:py-24 lg:px-16"
      >
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-20 top-1/3 size-[450px] rounded-full bg-blue-600/10 blur-[140px]"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -bottom-20 -left-20 size-[400px] rounded-full bg-orange-600/10 blur-[140px]"
        />
        <div className="relative mx-auto max-w-7xl">
          <div className="max-w-2xl">
            <p className="text-xs font-semibold tracking-[0.18em] text-[#f06425] uppercase">
              {content.practiceEyebrow}
            </p>
            <h2 className="mt-4 font-serif text-3xl leading-tight font-bold text-white sm:text-4xl">
              {content.practiceTitle}
            </h2>
            <p className="mt-4 text-base leading-7 text-slate-400">
              {content.practiceDescription}
            </p>
          </div>

          <ol className="mt-12 grid gap-0 border-y border-slate-800 md:grid-cols-3 md:border-y-0">
            {content.practices.map((item, index) => (
              <li
                key={item.title}
                className="relative border-b border-slate-800 py-7 first:pt-7 last:border-b-0 md:border-b-0 md:border-l md:px-8 md:py-2 md:first:border-l-0 md:first:pl-0 md:last:pr-0"
              >
                <span className="font-mono text-xs font-semibold tracking-wider text-[#f06425]">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-4 text-lg font-semibold text-white">
                  {item.title}
                </h3>
                <p className="mt-3 text-sm leading-6 text-slate-400">
                  {item.description}
                </p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="border-t border-slate-800/70 bg-[#030917] px-6 py-16 sm:px-10 sm:py-20 lg:px-16">
        <div className="relative mx-auto max-w-7xl overflow-hidden rounded-2xl border border-slate-800/80 bg-[#091526] px-7 py-10 text-white shadow-xl shadow-blue-950/20 sm:px-10 sm:py-12 lg:px-14">
          <div
            aria-hidden="true"
            className="absolute -right-20 -top-32 size-80 rounded-full bg-orange-600/15 blur-3xl"
          />
          <div className="relative flex flex-col gap-7 md:flex-row md:items-center md:justify-between">
            <div className="max-w-2xl">
              <p className="text-xs font-semibold tracking-[0.16em] text-[#f06425] uppercase">
                {content.ctaEyebrow}
              </p>
              <h2 className="mt-3 font-serif text-3xl font-bold sm:text-4xl">
                {content.ctaTitle}
              </h2>
              <p className="mt-4 text-sm leading-6 text-slate-400 sm:text-base">
                {content.ctaDescription}
              </p>
            </div>
            <Link
              href={getInternalHref(content.ctaButtonHref, "/career#open-positions")}
              className="inline-flex min-h-12 shrink-0 items-center justify-center gap-2 self-start rounded-full bg-[#e36a1e] px-6 text-sm font-semibold text-white shadow-lg shadow-orange-950/40 transition hover:bg-[#cc5c15] hover:shadow-orange-500/30 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-300 md:self-center"
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
