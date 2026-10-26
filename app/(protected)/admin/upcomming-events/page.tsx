import { Button } from "@/components/ui/button";
import Link from "next/link";
import { getUpcommingEvents } from "@/lib/actions/upcomming-events";
import UpcommingEventsTable from "./upcomming-events-table";

const UpcommingEventsPage = async () => {

  const upcommingEvents = await getUpcommingEvents();

  return (
    <div className="mt-2">
      <UpcommingEventsTable
        data={upcommingEvents}
        title="Upcomming Events"
        actions={
          <Button className="bg-blue-500 hover:bg-blue-600">
            <Link href="/admin/upcomming-events/create">Add Upcomming Event</Link>
          </Button>
        }
      />
    </div>
  );
};

export default UpcommingEventsPage;
