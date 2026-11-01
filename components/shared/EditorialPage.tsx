import Link from "next/link";
import { ArrowRight } from "lucide-react";

type EditorialPageProps = {
  breadcrumb: { label: string; href: string };
  eyebrow: string;
  title: string;
  introduction: string;
  note?: string;
  sections: readonly {
    heading: string;
    paragraphs: readonly string[];
  }[];
  cta: { label: string; href: string };
};

export default function EditorialPage({
  breadcrumb,
  eyebrow,
  title,
  introduction,
  note,
  sections,
  cta,
}: EditorialPageProps) {
  return (
    <main className="w-full bg-white text-slate-900">
      <section className="relative overflow-hidden bg-[#101a2d] px-6 pb-16 pt-36 text-white sm:px-10 sm:pb-20 sm:pt-40 lg:px-16">
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-[radial-gradient(at_80%_20%,rgba(232,121,36,0.2),transparent_45%),linear-gradient(120deg,#101a2d,#172f53)]"
        />
        <div className="relative mx-auto max-w-7xl">
          <nav aria-label="Breadcrumb" className="mb-10 text-sm text-white/65">
            <Link href={breadcrumb.href} className="transition hover:text-white">
              {breadcrumb.label}
            </Link>
            <span className="mx-2 text-white/35">/</span>
            <span className="text-orange-300">{title}</span>
          </nav>
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-orange-300">
            {eyebrow}
          </p>
          <h1 className="mt-5 max-w-4xl font-serif text-4xl font-semibold leading-tight sm:text-5xl lg:text-6xl">
            {title}
          </h1>
          <p className="mt-6 max-w-3xl text-base leading-7 text-white/75 sm:text-lg sm:leading-8">
            {introduction}
          </p>
          {note && (
            <p className="mt-5 max-w-3xl border-l-2 border-orange-300 pl-4 text-sm leading-6 text-white/65">
              {note}
            </p>
          )}
        </div>
      </section>

      <section className="px-6 py-16 sm:px-10 sm:py-20 lg:px-16">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-8 md:grid-cols-2">
            {sections.map((section) => (
              <article
                key={section.heading}
                className="border-t-2 border-orange-400 bg-[#f8f9fc] p-6 sm:p-8"
              >
                <h2 className="font-serif text-2xl font-semibold text-[#142b58]">
                  {section.heading}
                </h2>
                <div className="mt-4 space-y-4 text-sm leading-7 text-slate-600 sm:text-base">
                  {section.paragraphs.map((paragraph) => (
                    <p key={paragraph}>{paragraph}</p>
                  ))}
                </div>
              </article>
            ))}
          </div>

          <Link
            href={cta.href}
            className="mt-10 inline-flex items-center gap-2 rounded-full bg-[#e87924] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#d66d1e]"
          >
            {cta.label}
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </div>
      </section>
    </main>
  );
}
