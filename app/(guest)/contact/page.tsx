import { connection } from "next/server";
import { getSettings } from "@/lib/actions/settings-action";
import ContactContent, { type ContactPageSettings } from "./contact-content";

export default async function ContactPage() {
  await connection();
  const settings = await getSettings();

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

  return <ContactContent settings={contactSettings} />;
}
