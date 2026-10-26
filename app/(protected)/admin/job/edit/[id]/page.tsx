import JobForm from "@/components/career/job-form";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { getJobById } from "@/lib/actions/job-action";
import { Job } from "@/lib/types";
import Link from "next/link";
import { redirect } from "next/navigation";

const JobEditPage = async ({ params }: { params: Promise<{ id: string }> }) => {

  const { id } = await params;

  const res = await getJobById(id);

  if (!res?.success || !res.data) {
    redirect("/404");
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-center">
          <h1>Edit Job</h1>

          <Button asChild className="bg-blue-500 hover:bg-blue-600">
            <Link href="/admin/job">Back</Link>
          </Button>
        </div>
      </CardHeader>

      <CardContent>
        <JobForm data={res.data as Job} update={true} />
      </CardContent>
    </Card>
  );
};

export default JobEditPage;
  



