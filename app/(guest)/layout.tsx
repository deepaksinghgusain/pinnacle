import Header from "@/components/shared/Header";
import Footer from "@/components/shared/Footer";
import { getSettings } from "@/lib/actions/settings-action";
import { connection } from "next/server";
import { getIndustryNavigation } from "@/lib/industry-data";

export default async function GuestLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  await connection();
  const [settings, industries] = await Promise.all([
    getSettings(),
    getIndustryNavigation(),
  ]);
  const industryItems = industries?.map(({ name, slug }) => ({
    label: name,
    href: `/industries/${slug}`,
  })) ?? null;

  return (
    <div className="relative min-h-screen flex flex-col bg-slate-950 text-white overflow-x-clip">
      <Header
        logoPath={settings?.headerLogoPath || settings?.logoPath}
        siteName={settings?.siteName}
        industryItems={industryItems}
      />
      <main className="flex-1 flex flex-col">{children}</main>
      <Footer settings={settings} />
    </div>
  );
}
