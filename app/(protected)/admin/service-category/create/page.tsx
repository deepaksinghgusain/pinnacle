import ServiceCategoryForm from "@/components/service/service-category-form";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import Link from "next/link";

const ServiceCategoryCreatePage = async () => {

  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-center">
          <h1>Add Service Category</h1>

          <Button asChild className="bg-blue-500 hover:bg-blue-600">
            <Link href="/admin/service-category">Back</Link>
          </Button>
        </div>
      </CardHeader>

      <CardContent>
        <ServiceCategoryForm update={false} />
      </CardContent>
    </Card>
  );
};

export default ServiceCategoryCreatePage;