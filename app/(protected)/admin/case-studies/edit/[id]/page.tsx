import Link from "next/link";
import { connection } from "next/server";
import { notFound } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import CaseStudyForm from "@/components/editorial/case-study-form";
import { getCaseStudyById } from "@/lib/editorial-data";

export default async function EditCaseStudyPage({ params }: { params: Promise<{ id: string }> }) {
  await connection();
  const { id } = await params;
  const result = await getCaseStudyById(id);
  if (!result.success) {
    return <Card><CardHeader><h1 className="text-xl font-semibold text-red-900">Case study could not be loaded</h1></CardHeader><CardContent className="space-y-4"><p>{result.message}</p><Button asChild nativeButton={false} variant="outline"><Link href="/admin/case-studies">Back to case studies</Link></Button></CardContent></Card>;
  }
  if (!result.data) notFound();
  return <Card><CardHeader className="flex flex-row items-center justify-between"><h1 className="text-xl font-semibold">Edit {result.data.name}</h1><Button asChild nativeButton={false} variant="outline"><Link href="/admin/case-studies">Back</Link></Button></CardHeader><CardContent><CaseStudyForm record={result.data} /></CardContent></Card>;
}
