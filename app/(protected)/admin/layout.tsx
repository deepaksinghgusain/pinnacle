import { Suspense } from "react";
import type { Metadata } from "next"
import { getServerSession } from "next-auth";
import { authOptions } from "@/auth";
import { getCachedSettings } from "@/lib/cached-settings";
import { AppSidebar } from "@/components/app-sidebar"
import { SiteHeader } from "@/components/site-header"
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar"
import { TooltipProvider } from "@/components/ui/tooltip"
import { redirect } from "next/navigation";

export async function generateMetadata(): Promise<Metadata> {
    const settings = await getCachedSettings();

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

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <Suspense
            fallback={
                <div
                    className="flex min-h-screen"
                    role="status"
                    aria-label="Loading admin"
                >
                    <div className="hidden w-72 animate-pulse bg-muted lg:block" />
                    <div className="flex-1 p-6">
                        <div className="h-8 w-48 animate-pulse rounded bg-muted" />
                    </div>
                </div>
            }
        >
            <AuthenticatedAdminLayout>{children}</AuthenticatedAdminLayout>
        </Suspense>
    );
}

async function AuthenticatedAdminLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const session = await getServerSession(authOptions);

    if (!session?.user) {
        redirect("/login");
    }

    return (
        <TooltipProvider>
            <SidebarProvider
                style={
                    {
                        "--sidebar-width": "calc(var(--spacing) * 72)",
                        "--header-height": "calc(var(--spacing) * 12)",
                    } as React.CSSProperties
                }
            >
                <AppSidebar variant="inset" user={session.user} />
                <SidebarInset>
                    <SiteHeader />
                    <div className="flex flex-1 flex-col">
                        <div className="@container/main flex flex-1 flex-col gap-2 p-4">
                            {children}
                        </div>
                    </div>
                </SidebarInset>
            </SidebarProvider>
        </TooltipProvider>
    );
}
