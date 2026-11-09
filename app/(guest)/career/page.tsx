import { connection } from "next/server";
import { getJobs } from "@/lib/actions/job-action";
import { getSettings } from "@/lib/actions/settings-action";
import { Status } from "@/lib/types";
import CareerContent, { type CareerPageSettings } from "./career-content";

function formatLabel(value: string) {
  return value
    .toLowerCase()
    .split("_")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

export default async function CareerPage() {
  await connection();
  const [settings, allJobs] = await Promise.all([getSettings(), getJobs()]);

  const careerSettings: CareerPageSettings | null = settings
    ? {
        careerHeroTagline: settings.careerHeroTagline,
        careerHeroTitle: settings.careerHeroTitle,
        careerHeroAccent: settings.careerHeroAccent,
        careerHeroDescription: settings.careerHeroDescription,
        careerHeroImagePath: settings.careerHeroImagePath,
        careerHeroButtonLabel: settings.careerHeroButtonLabel,
        careerHeroButtonHref: settings.careerHeroButtonHref,
        careerLifeTagline: settings.careerLifeTagline,
        careerLifeTitle: settings.careerLifeTitle,
        careerLifeAccent: settings.careerLifeAccent,
        careerLifeDescription: settings.careerLifeDescription,
        careerLifeImagePath: settings.careerLifeImagePath,
        careerLifeCalloutTitle: settings.careerLifeCalloutTitle,
        careerLifeCalloutDescription: settings.careerLifeCalloutDescription,
        careerMetrics: settings.careerMetrics,
        careerOpportunitiesTagline: settings.careerOpportunitiesTagline,
        careerOpportunitiesTitle: settings.careerOpportunitiesTitle,
        careerOpportunitiesAccent: settings.careerOpportunitiesAccent,
        careerOpportunitiesDescription: settings.careerOpportunitiesDescription,
        careerBenefitsTagline: settings.careerBenefitsTagline,
        careerBenefitsTitle: settings.careerBenefitsTitle,
        careerBenefitsAccent: settings.careerBenefitsAccent,
        careerBenefitsDescription: settings.careerBenefitsDescription,
        careerBenefits: settings.careerBenefits,
        careerBenefitStats: settings.careerBenefitStats,
        careerCtaTagline: settings.careerCtaTagline,
        careerCtaTitle: settings.careerCtaTitle,
        careerCtaDescription: settings.careerCtaDescription,
        careerCtaButtonLabel: settings.careerCtaButtonLabel,
        careerCtaButtonHref: settings.careerCtaButtonHref,
      }
    : null;

  const jobs = allJobs
    .filter((job) => job.status === Status.ACTIVE)
    .map((job) => ({
      id: job.id,
      title: job.title,
      description: job.shortDescription,
      team: job.location || "Pinnacle Serve",
      location: formatLabel(job.workMode),
      type: formatLabel(job.employmentType),
      experience: job.experience ?? "",
    }));

  return <CareerContent settings={careerSettings} jobs={jobs} />;
}
