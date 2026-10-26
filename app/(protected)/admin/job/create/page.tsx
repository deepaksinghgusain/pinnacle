import JobForm from "@/components/career/job-form";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import Link from "next/link";

const JobCreatePage = async () => {

  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-center">
          <h1>Add Job</h1>

          <Button asChild className="bg-blue-500 hover:bg-blue-600">
            <Link href="/admin/job">Back</Link>
          </Button>
        </div>
      </CardHeader>

      <CardContent>
        <JobForm update={false} />
      </CardContent>
    </Card>
  );
};

export default JobCreatePage;