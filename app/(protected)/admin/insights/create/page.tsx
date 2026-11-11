import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import InsightForm from "@/components/editorial/insight-form";

export default function CreateInsightPage() {
  return <Card><CardHeader className="flex flex-row items-center justify-between"><h1 className="text-xl font-semibold">Create insight</h1><Button asChild nativeButton={false} variant="outline"><Link href="/admin/insights">Back</Link></Button></CardHeader><CardContent><InsightForm /></CardContent></Card>;
}
