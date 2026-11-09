"use server"

import { updateTag } from "next/cache"
import { prisma } from "../db/prisma-helper"
import type { SiteSettings } from "../generated/prisma"
import { formatError } from "../utils"
import { validateGrowthLearningContent } from "../growth-learning-content"
import { validateCultureContent } from "../culture-content"
import {
  emailSettingsSchema,
  generalSettingsSchema,
  servicePageSettingsSchema,
  socialSettingsSchema,
} from "../validators"

type ActionResponse = {
  success: boolean
  message: string
  data: unknown
}

const settingsId = "site-settings"

type SiteSettingsPayload = {
  siteName?: string
  [key: string]: string | boolean | null | undefined
}

function getOptionalString(formData: FormData, key: string): string | undefined {
  const value = formData.get(key)

  if (value == null) {
    return undefined
  }

  const text = String(value).trim()
  return text === "" ? undefined : text
}

function getStringList(formData: FormData, key: string): string | undefined {
  const values = formData
    .getAll(key)
    .map((value) => String(value).trim())
    .filter(Boolean)

  return values.length > 0 ? JSON.stringify(values) : undefined
}

export async function getSettings(): Promise<SiteSettings | undefined> {
  try {
    const siteSetting = await prisma.siteSettings.findFirst({
      orderBy: { createdAt: "desc" },
    });

    return siteSetting ?? undefined;
  } catch {
    return undefined;
  }
}


async function upsertSiteSettings(data: SiteSettingsPayload): Promise<ActionResponse> {
  try {
    await prisma.siteSettings.upsert({
      where: {
        id: settingsId,
      },
      create: {
        id: settingsId,
        ...data,
        siteName: data.siteName ?? "",
      },
      update: data,
    });

    updateTag("site-settings");

    const setting = await getSettings();

    return {
      success: true,
      message: "Settings saved successfully",
      data: setting ?? {},
    };
  } catch (error) {
    return {
      success: false,
      message: formatError(error),
      data: "",
    };
  }
}

export async function saveGeneralSettings(formData: FormData): Promise<ActionResponse> {

  const payload = {
    siteName: String(formData.get("siteName") ?? "").trim(),
    legalName: getOptionalString(formData, "legalName"),
    primaryEmail: getOptionalString(formData, "primaryEmail"),
    primaryPhone: getOptionalString(formData, "primaryPhone"),
    websiteUrl: getOptionalString(formData, "websiteUrl"),
    timezone: getOptionalString(formData, "timezone"),
    officeAddress: getOptionalString(formData, "officeAddress"),
    officeHours: getOptionalString(formData, "officeHours"),
    logoPath: getOptionalString(formData, "logoPath"),
    headerLogoPath: getOptionalString(formData, "headerLogoPath"),
    footerLogoPath: getOptionalString(formData, "footerLogoPath"),
    faviconPath: getOptionalString(formData, "faviconPath"),
    mapUrl: getOptionalString(formData, "mapUrl"),
    showPhone: formData.get("showPhone") === "on",
    showEmail: formData.get("showEmail") === "on",
    metaTitle: getOptionalString(formData, "metaTitle"),
    metaDescription: getOptionalString(formData, "metaDescription"),
    metaKeywords: getOptionalString(formData, "metaKeywords"),
    gstNumber: getOptionalString(formData, "gstNumber"),
    cinNumber: getOptionalString(formData, "cinNumber"),
  }
  const parsed = generalSettingsSchema.parse(payload)
  return upsertSiteSettings(parsed)
}

export async function saveEmailSettings(formData: FormData): Promise<ActionResponse> {
  const payload = {
    smtpHost: getOptionalString(formData, "smtpHost"),
    smtpPort: getOptionalString(formData, "smtpPort"),
    smtpUsername: getOptionalString(formData, "smtpUsername"),
    smtpPassword: getOptionalString(formData, "smtpPassword"),
    fromName: getOptionalString(formData, "fromName"),
    fromEmail: getOptionalString(formData, "fromEmail"),
    replyToEmail: getOptionalString(formData, "replyToEmail"),
    supportInbox: getOptionalString(formData, "supportInbox"),
    emailSignature: getOptionalString(formData, "emailSignature"),
    enableNotifications: formData.get("enableNotifications") === "on",
    storeDrafts: formData.get("storeDrafts") === "on",
  }

  const parsed = emailSettingsSchema.parse(payload)
  return upsertSiteSettings(parsed)
}

export async function saveSocialSettings(formData: FormData): Promise<ActionResponse> {
  const payload = {
    facebookUrl: getOptionalString(formData, "facebookUrl"),
    instagramUrl: getOptionalString(formData, "instagramUrl"),
    linkedinUrl: getOptionalString(formData, "linkedinUrl"),
    youtubeUrl: getOptionalString(formData, "youtubeUrl"),
    whatsappUrl: getOptionalString(formData, "whatsappUrl"),
    messengerUrl: getOptionalString(formData, "messengerUrl"),
    socialBio: getOptionalString(formData, "socialBio"),
    showSocialIcons: formData.get("showSocialIcons") === "on",
    openLinksNewTab: formData.get("openLinksNewTab") === "on",
  }

  const parsed = socialSettingsSchema.parse(payload)
  return upsertSiteSettings(parsed)
}

export async function saveServicePageSettings(formData: FormData): Promise<ActionResponse> {
  const payload = {
    siteName: String(formData.get("siteName") ?? "").trim(),
    serviceHeroTitle: getOptionalString(formData, "serviceHeroTitle"),
    serviceHeroDescription: getOptionalString(formData, "serviceHeroDescription"),
    serviceDeliveryTagline: getOptionalString(formData, "serviceDeliveryTagline"),
    serviceDeliveryTitle: getOptionalString(formData, "serviceDeliveryTitle"),
    serviceDeliveryDescription: getOptionalString(formData, "serviceDeliveryDescription"),
    serviceDeliveryCards: getOptionalString(formData, "serviceDeliveryCards"),
  }

  const parsed = servicePageSettingsSchema.parse(payload)
  return upsertSiteSettings(parsed)
}

export async function saveHomePageSettings(formData: FormData): Promise<ActionResponse> {
  const payload = {
    heroTagline: getOptionalString(formData, "heroTagline"),
    heroBackgroundImagePath: getOptionalString(formData, "heroBackgroundImagePath"),
    heroTitle: getOptionalString(formData, "heroTitle"),
    heroTitleAccent: getOptionalString(formData, "heroTitleAccent"),
    heroTitleSuffix: getOptionalString(formData, "heroTitleSuffix"),
    heroDescription: getOptionalString(formData, "heroDescription"),
    heroButtonLabel: getOptionalString(formData, "heroButtonLabel"),
    heroButtonHref: getOptionalString(formData, "heroButtonHref"),
    siteName: "Pinnacle",
    legalName: getOptionalString(formData, "legalName"),
    teamMembers: getOptionalString(formData, "teamMembers"),
    happyCustomers: getOptionalString(formData, "happyCustomers"),
    operationalSupport: getOptionalString(formData, "operationalSupport"),
    aboutTagline: getOptionalString(formData, "aboutTagline"),
    aboutTitle: getOptionalString(formData, "aboutTitle"),
    aboutTitleAccent: getOptionalString(formData, "aboutTitleAccent"),
    aboutDescription: getOptionalString(formData, "aboutDescription"),
    aboutButtons: getStringList(formData, "aboutButtons"),
    aboutButtonLabel: getOptionalString(formData, "aboutButtonLabel"),
    aboutButtonHref: getOptionalString(formData, "aboutButtonHref"),
    aboutHighlights: getOptionalString(formData, "aboutHighlights"),
    aboutFeatureCards: getOptionalString(formData, "aboutFeatureCards"),
    heroTrustTags: getOptionalString(formData, "trustMetrics"),
    deliveryModelTitle: getOptionalString(formData, "deliveryModelTitle"),
    deliveryModelItems: getStringList(formData, "deliveryModelItems"),
    serviceSectionTagline: getOptionalString(formData, "serviceSectionTagline"),
    serviceSectionTitle: getOptionalString(formData, "serviceSectionTitle"),
    serviceSectionAccent: getOptionalString(formData, "serviceSectionAccent"),
    serviceSectionDescription: getOptionalString(formData, "serviceSectionDescription"),
    serviceSectionCtaLabel: getOptionalString(formData, "serviceSectionCtaLabel"),
    serviceSectionCtaHref: getOptionalString(formData, "serviceSectionCtaHref"),
    whyClientsTagline: getOptionalString(formData, "whyClientsTagline"),
    whyClientsTitle: getOptionalString(formData, "whyClientsTitle"),
    whyClientsDescription: getOptionalString(formData, "whyClientsDescription"),
    whyClientsCards: getOptionalString(formData, "whyClientsCards"),
    homeTestimonialsTagline: getOptionalString(formData, "homeTestimonialsTagline"),
    homeTestimonialsTitle: getOptionalString(formData, "homeTestimonialsTitle"),
    homeTestimonialsAccent: getOptionalString(formData, "homeTestimonialsAccent"),
    homeTestimonialsDescription: getOptionalString(formData, "homeTestimonialsDescription"),
    homeCtaTagline: getOptionalString(formData, "homeCtaTagline"),
    homeCtaTitle: getOptionalString(formData, "homeCtaTitle"),
    homeCtaAccent: getOptionalString(formData, "homeCtaAccent"),
    homeCtaDescription: getOptionalString(formData, "homeCtaDescription"),
    homeCtaButtonLabel: getOptionalString(formData, "homeCtaButtonLabel"),
    homeCtaButtonHref: getOptionalString(formData, "homeCtaButtonHref"),
    globalDeliveryTagline: getOptionalString(formData, "globalDeliveryTagline"),
    globalDeliveryTitle: getOptionalString(formData, "globalDeliveryTitle"),
    globalDeliveryDescription: getOptionalString(formData, "globalDeliveryDescription"),
    globalDeliveryImagePath: getOptionalString(formData, "globalDeliveryImagePath"),
  }

  if (!payload.siteName) {
    return {
      success: false,
      message: "Site name is required",
      data: "",
    }
  }

  return upsertSiteSettings(payload)
}

export async function saveEventPageSettings(formData: FormData): Promise<ActionResponse> {
  const payload = {
    eventHeroTagline: getOptionalString(formData, "eventHeroTagline"),
    eventHeroBackgroundImagePath: getOptionalString(formData, "eventHeroBackgroundImagePath"),
    eventHeroTitle: getOptionalString(formData, "eventHeroTitle"),
    eventHeroDescription: getOptionalString(formData, "eventHeroDescription"),
    eventContactTitle: getOptionalString(formData, "eventContactTitle"),
    eventContactDescription: getOptionalString(formData, "eventContactDescription"),
    eventUpcommingTagline: getOptionalString(formData, "eventUpcommingTagline"),
    eventUpcommingTitle: getOptionalString(formData, "eventUpcommingTitle"),
    eventUpcommingDescription: getOptionalString(formData, "eventUpcommingDescription"),
    eventGalleryTagline: getOptionalString(formData, "eventGalleryTagline"),
    eventGalleryTitle: getOptionalString(formData, "eventGalleryTitle"),
    eventGalleryDescription: getOptionalString(formData, "eventGalleryDescription"),
  }

  return upsertSiteSettings(payload)
}

export async function saveAboutPageSettings(formData: FormData): Promise<ActionResponse> {
  const jsonFields = [
    { name: "aboutStoryCards", label: "Story cards" },
    { name: "aboutApproachTabs", label: "Approach tabs" },
    { name: "aboutLeaders", label: "Leadership cards" },
  ]
  for (const field of jsonFields) {
    const value = getOptionalString(formData, field.name)
    if (!value) continue

    try {
      const parsed: unknown = JSON.parse(value)
      const isObject = (item: unknown): item is Record<string, unknown> =>
        Boolean(item && typeof item === "object" && !Array.isArray(item))
      const isStringArray = (item: unknown) =>
        Array.isArray(item) && item.every((paragraph) => typeof paragraph === "string")
      const isValid =
        Array.isArray(parsed) &&
        parsed.every((item) => {
          if (!isObject(item)) return false
          if (field.name === "aboutStoryCards") {
            return (
              typeof item.title === "string" &&
              (typeof item.description === "string" || typeof item.summary === "string")
            )
          }
          if (field.name === "aboutApproachTabs") {
            return (
              typeof item.label === "string" &&
              (item.id === undefined || typeof item.id === "string") &&
              isStringArray(item.paragraphs)
            )
          }
          return (
            typeof item.name === "string" &&
            (item.role === undefined || typeof item.role === "string") &&
            isStringArray(item.paragraphs) &&
            (item.imagePath === undefined || typeof item.imagePath === "string")
          )
        })
      if (!isValid) {
        throw new Error()
      }
    } catch {
      return {
        success: false,
        message: `${field.label} JSON has an invalid structure`,
        data: "",
      }
    }
  }

  const getAboutValue = (key: string) =>
    formData.has(key) ? String(formData.get(key) ?? "").trim() : undefined

  return upsertSiteSettings({
    aboutPageHeroTagline: getAboutValue("aboutPageHeroTagline"),
    aboutPageHeroTitle: getAboutValue("aboutPageHeroTitle"),
    aboutPageHeroAccent: getAboutValue("aboutPageHeroAccent"),
    aboutPageHeroDescription: getAboutValue("aboutPageHeroDescription"),
    aboutPageHeroImagePath: getAboutValue("aboutPageHeroImagePath"),
    aboutStoryTagline: getAboutValue("aboutStoryTagline"),
    aboutStoryTitle: getAboutValue("aboutStoryTitle"),
    aboutStoryDescription: getAboutValue("aboutStoryDescription"),
    aboutStoryCards: getAboutValue("aboutStoryCards"),
    aboutApproachTagline: getAboutValue("aboutApproachTagline"),
    aboutApproachTitle: getAboutValue("aboutApproachTitle"),
    aboutApproachDescription: getAboutValue("aboutApproachDescription"),
    aboutApproachTabs: getAboutValue("aboutApproachTabs"),
    aboutLeadershipTitle: getAboutValue("aboutLeadershipTitle"),
    aboutLeaders: getAboutValue("aboutLeaders"),
    aboutPageCtaTagline: getAboutValue("aboutPageCtaTagline"),
    aboutPageCtaTitle: getAboutValue("aboutPageCtaTitle"),
    aboutPageCtaDescription: getAboutValue("aboutPageCtaDescription"),
    aboutPageCtaButtonLabel: getAboutValue("aboutPageCtaButtonLabel"),
    aboutPageCtaButtonHref: getAboutValue("aboutPageCtaButtonHref"),
  })
}

export async function saveContactPageSettings(formData: FormData): Promise<ActionResponse> {
  const jsonFields = [
    { name: "contactMetrics", label: "Contact metrics" },
    { name: "contactProcessSteps", label: "Contact process steps" },
  ]

  for (const field of jsonFields) {
    const value = getOptionalString(formData, field.name)
    if (!value) continue

    try {
      const parsed: unknown = JSON.parse(value)
      const isObject = (item: unknown): item is Record<string, unknown> =>
        Boolean(item && typeof item === "object" && !Array.isArray(item))
      const isValid =
        Array.isArray(parsed) &&
        parsed.every((item) => {
          if (!isObject(item)) return false
          if (field.name === "contactMetrics") {
            return typeof item.value === "string" && typeof item.label === "string"
          }
          return (
            typeof item.number === "string" &&
            typeof item.title === "string" &&
            typeof item.copy === "string"
          )
        })

      if (!isValid) throw new Error()
    } catch {
      return {
        success: false,
        message: `${field.label} JSON has an invalid structure`,
        data: "",
      }
    }
  }

  const getContactValue = (key: string) =>
    formData.has(key) ? String(formData.get(key) ?? "").trim() : undefined

  return upsertSiteSettings({
    contactHeroTagline: getContactValue("contactHeroTagline"),
    contactHeroTitle: getContactValue("contactHeroTitle"),
    contactHeroAccent: getContactValue("contactHeroAccent"),
    contactHeroDescription: getContactValue("contactHeroDescription"),
    contactHeroPrimaryButtonLabel: getContactValue("contactHeroPrimaryButtonLabel"),
    contactHeroSecondaryButtonLabel: getContactValue("contactHeroSecondaryButtonLabel"),
    contactPageEmail: getContactValue("contactPageEmail"),
    contactPageAddress: getContactValue("contactPageAddress"),
    contactMetrics: getContactValue("contactMetrics"),
    contactStepsTagline: getContactValue("contactStepsTagline"),
    contactStepsTitle: getContactValue("contactStepsTitle"),
    contactStepsDescription: getContactValue("contactStepsDescription"),
    contactProcessSteps: getContactValue("contactProcessSteps"),
  })
}

export async function saveCareerPageSettings(formData: FormData): Promise<ActionResponse> {
  const jsonFields = [
    { name: "careerMetrics", label: "Career metrics", required: ["value", "label"] },
    { name: "careerBenefitStats", label: "Career benefit statistics", required: ["value", "label"] },
    { name: "careerBenefits", label: "Career benefits", required: ["title", "description"] },
  ]

  for (const field of jsonFields) {
    const value = getOptionalString(formData, field.name)
    if (!value) continue

    try {
      const parsed: unknown = JSON.parse(value)
      const isObject = (item: unknown): item is Record<string, unknown> =>
        Boolean(item && typeof item === "object" && !Array.isArray(item))
      const isValid =
        Array.isArray(parsed) &&
        parsed.every((item) =>
          isObject(item) && field.required.every((key) => typeof item[key] === "string"),
        )

      if (!isValid) throw new Error()
    } catch {
      return {
        success: false,
        message: `${field.label} have an invalid structure`,
        data: "",
      }
    }
  }

  const getCareerValue = (key: string) =>
    formData.has(key) ? String(formData.get(key) ?? "").trim() : undefined

  return upsertSiteSettings({
    careerHeroTagline: getCareerValue("careerHeroTagline"),
    careerHeroTitle: getCareerValue("careerHeroTitle"),
    careerHeroAccent: getCareerValue("careerHeroAccent"),
    careerHeroDescription: getCareerValue("careerHeroDescription"),
    careerHeroImagePath: getCareerValue("careerHeroImagePath"),
    careerHeroButtonLabel: getCareerValue("careerHeroButtonLabel"),
    careerHeroButtonHref: getCareerValue("careerHeroButtonHref"),
    careerLifeTagline: getCareerValue("careerLifeTagline"),
    careerLifeTitle: getCareerValue("careerLifeTitle"),
    careerLifeAccent: getCareerValue("careerLifeAccent"),
    careerLifeDescription: getCareerValue("careerLifeDescription"),
    careerLifeImagePath: getCareerValue("careerLifeImagePath"),
    careerLifeCalloutTitle: getCareerValue("careerLifeCalloutTitle"),
    careerLifeCalloutDescription: getCareerValue("careerLifeCalloutDescription"),
    careerMetrics: getCareerValue("careerMetrics"),
    careerOpportunitiesTagline: getCareerValue("careerOpportunitiesTagline"),
    careerOpportunitiesTitle: getCareerValue("careerOpportunitiesTitle"),
    careerOpportunitiesAccent: getCareerValue("careerOpportunitiesAccent"),
    careerOpportunitiesDescription: getCareerValue("careerOpportunitiesDescription"),
    careerBenefitsTagline: getCareerValue("careerBenefitsTagline"),
    careerBenefitsTitle: getCareerValue("careerBenefitsTitle"),
    careerBenefitsAccent: getCareerValue("careerBenefitsAccent"),
    careerBenefitsDescription: getCareerValue("careerBenefitsDescription"),
    careerBenefits: getCareerValue("careerBenefits"),
    careerBenefitStats: getCareerValue("careerBenefitStats"),
    careerCtaTagline: getCareerValue("careerCtaTagline"),
    careerCtaTitle: getCareerValue("careerCtaTitle"),
    careerCtaDescription: getCareerValue("careerCtaDescription"),
    careerCtaButtonLabel: getCareerValue("careerCtaButtonLabel"),
    careerCtaButtonHref: getCareerValue("careerCtaButtonHref"),
  })
}

export async function saveGrowthLearningPageSettings(
  formData: FormData,
): Promise<ActionResponse> {
  const content = getOptionalString(formData, "growthLearningContent")

  if (!content) {
    return {
      success: false,
      message: "Growth and Learning page content is required",
      data: "",
    }
  }

  try {
    const parsed: unknown = JSON.parse(content)
    if (!validateGrowthLearningContent(parsed)) {
      return {
        success: false,
        message: "Growth and Learning page content has an invalid structure",
        data: "",
      }
    }
  } catch {
    return {
      success: false,
      message: "Growth and Learning page content must be valid JSON",
      data: "",
    }
  }

  return upsertSiteSettings({ growthLearningContent: content })
}

export async function saveCulturePageSettings(
  formData: FormData,
): Promise<ActionResponse> {
  const content = getOptionalString(formData, "cultureContent")

  if (!content) {
    return {
      success: false,
      message: "Culture page content is required",
      data: "",
    }
  }

  try {
    const parsed: unknown = JSON.parse(content)
    if (!validateCultureContent(parsed)) {
      return {
        success: false,
        message: "Culture page content has an invalid structure",
        data: "",
      }
    }
  } catch {
    return {
      success: false,
      message: "Culture page content must be valid JSON",
      data: "",
    }
  }

  return upsertSiteSettings({ cultureContent: content })
}
