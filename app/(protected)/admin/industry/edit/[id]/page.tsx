import Link from "next/link";
import { connection } from "next/server";
import { notFound } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { getIndustryById } from "@/lib/industry-data";
import IndustryForm from "@/components/industry/industry-form";

export default async function EditIndustryPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  await connection();
  const { id } = await params;
  const result = await getIndustryById(id);
  if (!result.success) {
    return (
      <Card>
        <CardHeader>
          <h1 className="text-xl font-semibold text-red-900">Industry could not be loaded</h1>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm text-slate-700">{result.message}</p>
          <Button asChild nativeButton={false} variant="outline"><Link href="/admin/industry">Back to industries</Link></Button>
        </CardContent>
      </Card>
    );
  }
  const industry = result.data;
  if (!industry) notFound();

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <h1 className="text-xl font-semibold">Edit {industry.name}</h1>
        <Button asChild nativeButton={false} variant="outline"><Link href="/admin/industry">Back</Link></Button>
      </CardHeader>
      <CardContent>
        <IndustryForm industry={industry} />
      </CardContent>
    </Card>
  );
}
