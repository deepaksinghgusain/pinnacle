import ServiceCategoryForm from "@/components/service/service-category-form";
import ServiceForm from "@/components/service/service-form";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { getServiceCategory } from "@/lib/actions/service-category-action";
import Link from "next/link";

const ServiceCategoryCreatePage = async () => {
  const categories = await getServiceCategory();

  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-center">
          <h1>Add Service</h1>

          <Button asChild className="bg-blue-500 hover:bg-blue-600">
            <Link href="/admin/service">Back</Link>
          </Button>
        </div>
      </CardHeader>

      <CardContent>
        <ServiceForm categories={categories} update={false} />
      </CardContent>
    </Card>
  );
};

export default ServiceCategoryCreatePage;