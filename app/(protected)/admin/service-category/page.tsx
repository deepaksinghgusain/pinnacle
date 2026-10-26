import { Button } from "@/components/ui/button";
import Link from "next/link";

import ServiceCategoryTable from "./service-category-table";
import { getServiceCategory } from "@/lib/actions/service-category-action";

const ServiceCategoryPage = async () => {
  const serviceCategories = await getServiceCategory();

  return (
    <div className="mt-2">
      <ServiceCategoryTable
        data={serviceCategories}
        title="Service Category"
        actions={
          <Button className="bg-blue-500 hover:bg-blue-600">
            <Link href="/admin/service-category/create">Add Service Category</Link>
          </Button>
        }
      />
    </div>
  );
};

export default ServiceCategoryPage;