import { connection } from "next/server";

import { getServices } from "@/lib/actions/service-action";
import { getSettings } from "@/lib/actions/settings-action";
import { getTestimonials } from "@/lib/actions/testimonial-action";
import { Status } from "@/lib/types";

import HomeContent, { type HomepageSettings } from "./home-content";

export default async function HomePage() {
  await connection();

  const [settings, allServices, allTestimonials] = await Promise.all([
    getSettings(),
    getServices(),
    getTestimonials(),
  ]);

  const homepageSettings: HomepageSettings | null = settings
    ? {
        heroTagline: settings.heroTagline,
        heroTitle: settings.heroTitle,
        heroTitleAccent: settings.heroTitleAccent,
        heroTitleSuffix: settings.heroTitleSuffix,
        heroDescription: settings.heroDescription,
        heroBackgroundImagePath: settings.heroBackgroundImagePath,
        heroButtonLabel: settings.heroButtonLabel,
        heroButtonHref: settings.heroButtonHref,
        heroTrustTags: settings.heroTrustTags,
        aboutTagline: settings.aboutTagline,
        aboutTitle: settings.aboutTitle,
        aboutTitleAccent: settings.aboutTitleAccent,
        aboutDescription: settings.aboutDescription,
        aboutButtonLabel: settings.aboutButtonLabel,
        aboutButtonHref: settings.aboutButtonHref,
        aboutHighlights: settings.aboutHighlights,
        aboutFeatureCards: settings.aboutFeatureCards,
        serviceSectionTagline: settings.serviceSectionTagline,
        serviceSectionTitle: settings.serviceSectionTitle,
        serviceSectionAccent: settings.serviceSectionAccent,
        serviceSectionDescription: settings.serviceSectionDescription,
        serviceSectionCtaLabel: settings.serviceSectionCtaLabel,
        serviceSectionCtaHref: settings.serviceSectionCtaHref,
        whyClientsTagline: settings.whyClientsTagline,
        whyClientsTitle: settings.whyClientsTitle,
        whyClientsDescription: settings.whyClientsDescription,
        whyClientsCards: settings.whyClientsCards,
        homeTestimonialsTagline: settings.homeTestimonialsTagline,
        homeTestimonialsTitle: settings.homeTestimonialsTitle,
        homeTestimonialsAccent: settings.homeTestimonialsAccent,
        homeTestimonialsDescription: settings.homeTestimonialsDescription,
      }
    : null;

  const services = allServices
    .filter((service) => service.status === Status.ACTIVE)
    .map(({ id, title, shortDescription }) => ({
      id,
      title,
      shortDescription,
    }));

  const testimonials = allTestimonials
    .filter((testimonial) => testimonial.status === Status.ACTIVE)
    .map(({ id, name, designation, company, content, tag }) => ({
      id: id ?? `${name}-${company}`,
      name,
      designation,
      company,
      content,
      tag,
    }));

  return (
    <HomeContent
      settings={homepageSettings}
      services={services}
      testimonials={testimonials}
    />
  );
}
