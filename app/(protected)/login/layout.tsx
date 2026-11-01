import type { Metadata } from "next"
import { getSiteSettings } from "@/lib/site-settings"

export async function generateMetadata(): Promise<Metadata> {
  const settings = await getSiteSettings();

  return {
    title: settings?.siteName || "Pinnacle",

    description:
      settings?.metaDescription ||
      "Welcome to Pinnacle. Explore our services and solutions.",

    keywords: settings?.metaKeywords
      ? settings.metaKeywords.split(",").map((keyword) => keyword.trim())
      : [
        "Services",
        "Solutions",
        "Technology",
        "Business",
      ],

    icons: {
      icon: settings?.faviconPath
        ? `/api${settings.faviconPath}`
        : "/favicon.ico",
    },
  };
}

export default async function GuestLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {

  return (
    <>
      {children}
    </>
  )
}
