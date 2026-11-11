import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import CaseStudyForm from "@/components/editorial/case-study-form";

export default function CreateCaseStudyPage() {
  return <Card><CardHeader className="flex flex-row items-center justify-between"><h1 className="text-xl font-semibold">Create case study</h1><Button asChild nativeButton={false} variant="outline"><Link href="/admin/case-studies">Back</Link></Button></CardHeader><CardContent><CaseStudyForm /></CardContent></Card>;
}
