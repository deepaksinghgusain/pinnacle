import Image from "next/image";
import Link from "next/link";
import { connection } from "next/server";
import { notFound } from "next/navigation";
import {
  ArrowRight,
  ArrowUpRight,
  BriefcaseBusiness,
  Check,
} from "lucide-react";

import { getServiceById, getServices } from "@/lib/actions/service-action";
import { Status } from "@/lib/types";

const fallbackImage =
  "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&w=1600&q=85";

export default async function ServiceDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  await connection();

  const result = await getServiceById(slug);

  if (!result.success || !result.data) {
    if (result.message === "Service not found") notFound();
    throw new Error(result.message);
  }

  const service = result.data;
  if (service.status !== Status.ACTIVE) notFound();

  const [allServices] = await Promise.all([getServices()]);
  const relatedServices = allServices
    .filter(
      (relatedService) =>
        relatedService.id !== service.id &&
        relatedService.status === Status.ACTIVE,
    )
    .slice(0, 3);

  const image = service.image?.trim() || fallbackImage;
  const category = service.serviceCategory.name;
  const benefits = service.serviceBenefits;
  const capabilities = service.capabilities;
  const deliveryProcess = service.deliveryProcess;
  const outcomes = service.outcomeFocuses;
  const contact = service.contactSection;

  return (
    <div className="w-full bg-white text-slate-900">
      <section className="relative isolate overflow-hidden bg-[#071323] px-6 pb-16 pt-36 text-white sm:px-10 sm:pb-20 sm:pt-40 lg:px-16">
        <Image
          src={image}
          alt={service.title}
          fill
          priority
          sizes="100vw"
          className="-z-20 object-cover object-center opacity-35"
        />
        <div className="absolute inset-0 -z-10 bg-gradient-to-r from-[#06101f] via-[#0b1b30]/95 to-[#102944]/70" />
        <div className="absolute inset-0 -z-10 bg-[linear-gradient(rgba(255,255,255,0.035)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.035)_1px,transparent_1px)] bg-[size:44px_44px]" />

        <div className="relative mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16">
          <div>
            <nav aria-label="Breadcrumb" className="mb-9 text-sm text-white/65">
              <Link href="/#service-back-office" className="transition hover:text-white">
                Services
              </Link>
              <span className="mx-2 text-white/35">/</span>
              <span className="text-orange-300">{service.title}</span>
            </nav>
            <div className="inline-flex items-center gap-2 border border-orange-300/25 bg-orange-400/10 px-3.5 py-2 text-[11px] font-semibold uppercase tracking-[0.16em] text-orange-200">
              <BriefcaseBusiness className="h-4 w-4" aria-hidden="true" />
              {category}
            </div>
            <h1 className="mt-6 max-w-3xl font-serif text-4xl font-semibold leading-[1.08] text-white sm:text-5xl lg:text-6xl">
              {service.title}
              <span className="mt-2 block font-normal italic text-[#f0a16d]">
                built around your priorities
              </span>
            </h1>
            <p className="mt-6 max-w-2xl text-base leading-7 text-white/75 sm:text-lg sm:leading-8">
              {service.shortDescription}
            </p>
            <Link
              href="/contact"
              className="group mt-8 inline-flex min-h-12 items-center gap-3 bg-[#e36a1e] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#cc5c15]"
            >
              Talk with our team
              <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>
          </div>

          <div className="relative min-h-[280px] overflow-hidden border border-white/15 sm:min-h-[390px]">
            <Image
              src={image}
              alt={service.title}
              fill
              priority
              sizes="(min-width: 1024px) 45vw, 100vw"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#06101f]/75 via-transparent to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-5 sm:p-7">
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-orange-300">
                Pinnacle Serve
              </p>
              <p className="mt-2 max-w-xs text-lg font-medium leading-snug text-white sm:text-xl">
                Practical technology. Progress you can put to work.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white px-6 py-20 sm:px-10 sm:py-24 lg:px-16">
        <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-orange-600">
              The opportunity
            </p>
            <h2 className="mt-4 font-serif text-3xl font-semibold leading-tight text-[#142b58] sm:text-4xl">
              {benefits?.title || "Make complex work feel manageable."}
            </h2>
          </div>
          <div>
            <p className="text-base leading-8 text-slate-600 sm:text-lg">
              {service.description}
            </p>
            {benefits?.description ? (
              <p className="mt-4 leading-7 text-slate-600">{benefits.description}</p>
            ) : null}
            {benefits?.items.length ? (
              <div className="mt-8 grid gap-4 border-t border-slate-200 pt-6 sm:grid-cols-2">
                {benefits.items.map((benefit) => (
                  <div key={benefit} className="flex items-start gap-3">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-orange-600" aria-hidden="true" />
                    <span className="text-sm font-medium leading-6 text-[#142b58]">{benefit}</span>
                  </div>
                ))}
              </div>
            ) : null}
            {outcomes?.items.length ? (
              <div className="mt-8 border-t border-slate-200 pt-6">
                <h3 className="font-semibold text-[#142b58]">
                  {outcomes.title}
                </h3>
                {outcomes.description ? (
                  <p className="mt-2 text-sm leading-6 text-slate-600">
                    {outcomes.description}
                  </p>
                ) : null}
                <div className="mt-4 grid gap-4 sm:grid-cols-3">
                {outcomes.items.map((outcome) => (
                  <div key={outcome} className="flex items-start gap-3">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-orange-600" aria-hidden="true" />
                    <span className="text-sm font-medium leading-6 text-[#142b58]">{outcome}</span>
                  </div>
                ))}
              </div>
              </div>
            ) : null}
          </div>
        </div>
      </section>

      {capabilities ? (
        <section className="bg-[#f4f6fb] px-6 py-20 sm:px-10 sm:py-24 lg:px-16">
          <div className="mx-auto max-w-7xl">
            <div className="max-w-2xl">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-orange-600">
                What we do
              </p>
              <h2 className="mt-4 font-serif text-3xl font-semibold text-[#142b58] sm:text-4xl">
                {capabilities.title}
              </h2>
              {capabilities.description ? (
                <p className="mt-4 text-base leading-7 text-slate-600">
                  {capabilities.description}
                </p>
              ) : null}
            </div>
            {capabilities.items.length ? (
              <div className="mt-10 grid gap-x-10 md:grid-cols-2">
                {capabilities.items.map((capability, index) => (
                  <div
                    key={`${capability}-${index}`}
                    className="flex items-start gap-5 border-t border-slate-200 py-6"
                  >
                    <span className="font-mono text-sm text-orange-600">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <h3 className="text-base font-semibold leading-6 text-[#142b58]">
                      {capability}
                    </h3>
                  </div>
                ))}
              </div>
            ) : null}
          </div>
        </section>
      ) : null}

      {deliveryProcess ? (
        <section className="bg-[#102447] px-6 py-20 text-white sm:px-10 sm:py-24 lg:px-16">
          <div className="mx-auto max-w-7xl">
            <div className="max-w-2xl">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-orange-300">
                How we work
              </p>
              <h2 className="mt-4 font-serif text-3xl font-semibold sm:text-4xl">
                {deliveryProcess.title}
              </h2>
              {deliveryProcess.description ? (
                <p className="mt-4 text-base leading-7 text-white/65">
                  {deliveryProcess.description}
                </p>
              ) : null}
            </div>
            {deliveryProcess.items.length ? (
              <div className="mt-10 grid gap-8 md:grid-cols-3 md:gap-10">
                {deliveryProcess.items.map((step, index) => (
                  <article key={`${step}-${index}`} className="border-t border-white/20 pt-5">
                    <p className="font-mono text-sm text-orange-300">
                      {String(index + 1).padStart(2, "0")}
                    </p>
                    <p className="mt-4 text-lg font-semibold leading-7 text-white">{step}</p>
                  </article>
                ))}
              </div>
            ) : null}
          </div>
        </section>
      ) : null}

      {contact ? (
        <section className="bg-white px-6 py-16 sm:px-10 lg:px-16">
          <div className="mx-auto flex max-w-7xl flex-col gap-6 border border-slate-200 p-6 sm:flex-row sm:items-center sm:justify-between sm:p-10">
            <div className="max-w-2xl">
              <h2 className="font-serif text-2xl font-semibold text-[#142b58] sm:text-3xl">
                {contact.title}
              </h2>
              {contact.description ? (
                <p className="mt-3 leading-7 text-slate-600">{contact.description}</p>
              ) : null}
            </div>
            <Link
              href="/contact"
              className="inline-flex min-h-12 shrink-0 items-center justify-center gap-2 bg-[#e36a1e] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#cc5c15]"
            >
              Contact us <ArrowUpRight className="h-4 w-4" />
            </Link>
          </div>
        </section>
      ) : null}

      {relatedServices.length ? (
        <section className="bg-white px-6 py-20 sm:px-10 sm:py-24 lg:px-16">
          <div className="mx-auto max-w-7xl">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-orange-600">
                  Explore more
                </p>
                <h2 className="mt-4 font-serif text-3xl font-semibold text-[#142b58] sm:text-4xl">
                  Connected capabilities
                </h2>
              </div>
              <Link
                href="/#service-back-office"
                className="inline-flex items-center gap-2 text-sm font-semibold text-[#142b58] transition hover:text-orange-700"
              >
                All services <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
            <div className="mt-8 grid gap-4 md:grid-cols-3">
              {relatedServices.map((relatedService, index) => (
                <Link
                  key={relatedService.id}
                  href={`/service/${relatedService.id}`}
                  className="group border border-slate-200 p-5 transition hover:border-orange-300 hover:bg-orange-50/40 sm:p-6"
                >
                  <p className="font-mono text-xs text-orange-600">
                    {String(index + 1).padStart(2, "0")}
                  </p>
                  <div className="mt-3 flex items-center justify-between gap-4">
                    <h3 className="text-base font-semibold text-[#142b58]">{relatedService.title}</h3>
                    <ArrowUpRight className="h-4 w-4 shrink-0 text-slate-400 transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-orange-600" />
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      ) : null}
    </div>
  );
}
