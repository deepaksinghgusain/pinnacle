import Header from "@/components/shared/Header";
import Footer from "@/components/shared/Footer";
import { getSettings } from "@/lib/actions/settings-action";
import { connection } from "next/server";
import { getIndustryNavigation } from "@/lib/industry-data";
import { getEditorialNavigation } from "@/lib/editorial-data";
import { getServiceNavigation } from "@/lib/service-data";

export default async function GuestLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  await connection();
  const [settings, industries, editorial, services] = await Promise.all([
    getSettings(),
    getIndustryNavigation(),
    getEditorialNavigation(),
    getServiceNavigation(),
  ]);
  const industryItems = industries?.map(({ name, slug }) => ({
    label: name,
    href: `/industries/${slug}`,
  })) ?? null;
  const serviceItems = services?.map(({ id, title }) => ({
    label: title,
    href: `/service/${id}`,
  })) ?? null;
  const caseStudyItems = editorial?.caseStudies.map(({ name, slug }) => ({
    label: name,
    href: `/case-studies/${slug}`,
  })) ?? null;
  const insightItems = editorial?.insights.map(({ name, slug }) => ({
    label: name,
    href: `/insights/${slug}`,
  })) ?? null;

  return (
    <div className="relative min-h-screen flex flex-col bg-slate-950 text-white overflow-x-clip">
      <Header
        logoPath={settings?.headerLogoPath || settings?.logoPath}
        siteName={settings?.siteName}
        serviceItems={serviceItems}
        industryItems={industryItems}
        caseStudyItems={caseStudyItems}
        insightItems={insightItems}
      />
      <main className="flex-1 flex flex-col">{children}</main>
      <Footer settings={settings} serviceItems={serviceItems} />
    </div>
  );
}
