import Header from "@/components/shared/Header";
import Footer from "@/components/shared/Footer";
import { getSettings } from "@/lib/actions/settings-action";
import { connection } from "next/server";

export default async function GuestLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  await connection();
  const settings = await getSettings();

  return (
    <div className="relative min-h-screen flex flex-col bg-slate-950 text-white overflow-x-clip">
      <Header
        logoPath={settings?.headerLogoPath || settings?.logoPath}
        siteName={settings?.siteName}
      />
      <main className="flex-1 flex flex-col">{children}</main>
      <Footer settings={settings} />
    </div>
  );
}
