import { Button } from "@/components/ui/button";
import Link from "next/link";
import { getJobs } from "@/lib/actions/job-action";
import JobTable from "./job-table";

const JobPage = async () => {

  const jobs = await getJobs();
  
  return (
    <div className="mt-2">
      <JobTable
        data={jobs}
        title="Jobs"
        actions={
          <Button className="bg-blue-500 hover:bg-blue-600">
            <Link href="/admin/job/create">Add Job</Link>
          </Button>
        }
      />
    </div>
  );
};

export default JobPage;
