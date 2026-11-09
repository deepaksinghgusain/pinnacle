import { connection } from "next/server";
import { getSettings } from "@/lib/actions/settings-action";
import AboutContent from "./about-content";

export default async function AboutPage() {
  await connection();
  const settings = await getSettings();

  const aboutSettings = settings
    ? {
        aboutPageHeroTagline: settings.aboutPageHeroTagline,
        aboutPageHeroTitle: settings.aboutPageHeroTitle,
        aboutPageHeroAccent: settings.aboutPageHeroAccent,
        aboutPageHeroDescription: settings.aboutPageHeroDescription,
        aboutPageHeroImagePath: settings.aboutPageHeroImagePath,
        aboutStoryTagline: settings.aboutStoryTagline,
        aboutStoryTitle: settings.aboutStoryTitle,
        aboutStoryDescription: settings.aboutStoryDescription,
        aboutStoryCards: settings.aboutStoryCards,
        aboutApproachTagline: settings.aboutApproachTagline,
        aboutApproachTitle: settings.aboutApproachTitle,
        aboutApproachDescription: settings.aboutApproachDescription,
        aboutApproachTabs: settings.aboutApproachTabs,
        aboutLeadershipTitle: settings.aboutLeadershipTitle,
        aboutLeaders: settings.aboutLeaders,
        aboutPageCtaTagline: settings.aboutPageCtaTagline,
        aboutPageCtaTitle: settings.aboutPageCtaTitle,
        aboutPageCtaDescription: settings.aboutPageCtaDescription,
        aboutPageCtaButtonLabel: settings.aboutPageCtaButtonLabel,
        aboutPageCtaButtonHref: settings.aboutPageCtaButtonHref,
      }
    : null;

  return <AboutContent settings={aboutSettings} />;
}
