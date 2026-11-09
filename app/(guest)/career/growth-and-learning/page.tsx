import { connection } from "next/server";
import CareerGrowthLearningPage from "@/components/shared/CareerGrowthLearningPage";
import { getSettings } from "@/lib/actions/settings-action";
import { parseGrowthLearningContent } from "@/lib/growth-learning-content";

export default async function GrowthAndLearningPage() {
  await connection();
  const settings = await getSettings();

  return (
    <CareerGrowthLearningPage
      content={parseGrowthLearningContent(settings?.growthLearningContent)}
    />
  );
}
