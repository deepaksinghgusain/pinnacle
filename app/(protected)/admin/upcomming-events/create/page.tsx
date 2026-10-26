import UpcommingEventForm from "@/components/upcomming-events/upcomming-event-form";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import Link from "next/link";

const UpcommingEventCreatePage = async () => {

  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-center">
          <h1>Add Upcomming Event</h1>

          <Button asChild className="bg-blue-500 hover:bg-blue-600">
            <Link href="/admin/upcomming-events">Back</Link>
          </Button>
        </div>
      </CardHeader>

      <CardContent>
        <UpcommingEventForm update={false} />
      </CardContent>
    </Card>
  );
};

export default UpcommingEventCreatePage;