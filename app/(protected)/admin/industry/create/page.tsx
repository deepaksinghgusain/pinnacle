import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import IndustryForm from "@/components/industry/industry-form";

export default function CreateIndustryPage() {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <h1 className="text-xl font-semibold">Create industry page</h1>
        <Button asChild nativeButton={false} variant="outline"><Link href="/admin/industry">Back</Link></Button>
      </CardHeader>
      <CardContent>
        <IndustryForm />
      </CardContent>
    </Card>
  );
}
