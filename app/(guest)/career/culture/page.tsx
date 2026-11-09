import { connection } from "next/server";
import CareerCulturePage from "@/components/shared/CareerCulturePage";
import { getSettings } from "@/lib/actions/settings-action";
import { parseCultureContent } from "@/lib/culture-content";

export default async function CulturePage() {
  await connection();
  const settings = await getSettings();

  return <CareerCulturePage content={parseCultureContent(settings?.cultureContent)} />;
}
