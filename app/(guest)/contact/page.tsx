import { connection } from "next/server";
import { getServices } from "@/lib/actions/service-action";
import { getSettings } from "@/lib/actions/settings-action";
import { Status } from "@/lib/types";
import ContactContent, { type ContactPageSettings } from "./contact-content";

export default async function ContactPage() {
  await connection();
  const [settings, allServices] = await Promise.all([
    getSettings(),
    getServices(),
  ]);
  const services = allServices
    .filter((service) => service.status === Status.ACTIVE)
    .map(({ id, title }) => ({ id, title }));

  const contactSettings: ContactPageSettings | null = settings
    ? {
        contactHeroTagline: settings.contactHeroTagline,
        contactHeroTitle: settings.contactHeroTitle,
        contactHeroAccent: settings.contactHeroAccent,
        contactHeroDescription: settings.contactHeroDescription,
        contactHeroPrimaryButtonLabel: settings.contactHeroPrimaryButtonLabel,
        contactHeroSecondaryButtonLabel: settings.contactHeroSecondaryButtonLabel,
        contactPageEmail: settings.contactPageEmail,
        contactPageAddress: settings.contactPageAddress,
        contactMetrics: settings.contactMetrics,
        contactStepsTagline: settings.contactStepsTagline,
        contactStepsTitle: settings.contactStepsTitle,
        contactStepsDescription: settings.contactStepsDescription,
        contactProcessSteps: settings.contactProcessSteps,
      }
    : null;

  return <ContactContent settings={contactSettings} services={services} />;
}
