import UpcommingEventForm from "@/components/upcomming-events/upcomming-event-form";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { getUpcommingEventById } from "@/lib/actions/upcomming-events";
import Link from "next/link";
import { redirect } from "next/navigation";


const UpcommingEventEditPage = async ({ params }: { params: Promise<{ id: string }> }) => {

  const { id } = await params;

  const res = await getUpcommingEventById(id);

  if (!res?.success || !res.data) {
    redirect("/404");
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-center">
          <h1>Edit Upcomming Event</h1>

          <Button asChild className="bg-blue-500 hover:bg-blue-600">
            <Link href="/admin/upcomming-events">Back</Link>
          </Button>
        </div>
      </CardHeader>

      <CardContent>
        <UpcommingEventForm data={res.data} update={true} />
      </CardContent>
    </Card>
  );
};

export default UpcommingEventEditPage;
  



