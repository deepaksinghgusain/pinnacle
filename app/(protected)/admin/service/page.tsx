import { Button } from "@/components/ui/button";
import Link from "next/link";

import { getServices } from "@/lib/actions/service-action";
import ServiceTable from "./service-table";

const ServicePage = async () => {
  const services = await getServices();

  return (
    <div className="mt-2">
      <ServiceTable
        data={services}
        title="Services"
        actions={
          <Button className="bg-blue-500 hover:bg-blue-600">
            <Link href="/admin/service/create">Add Service</Link>
          </Button>
        }
      />
    </div>
  );
};

export default ServicePage;