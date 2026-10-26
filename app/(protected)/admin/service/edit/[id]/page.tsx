import ServiceCategoryForm from "@/components/service/service-category-form";
import ServiceForm from "@/components/service/service-form";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { getServiceById } from "@/lib/actions/service-action";
import { getServiceCategory, getServiceCategoryById } from "@/lib/actions/service-category-action";
import { Service, ServiceCategory } from "@/lib/types";
import Link from "next/link";
import { redirect } from "next/navigation";


const ServiceCategoryEditPage = async ({ params }: { params: Promise<{ id: string }> }) => {

  const { id } = await params;

  const res = await getServiceById(id);
  const categories = await getServiceCategory();

  if (!res?.success || !res.data) {
    redirect("/404");
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-center">
          <h1>Edit Service</h1>

          <Button asChild className="bg-blue-500 hover:bg-blue-600">
            <Link href="/admin/service">Back</Link>
          </Button>
        </div>
      </CardHeader>

      <CardContent>
        <ServiceForm categories={categories} data={res.data as Service} update={true} />
      </CardContent>
    </Card>
  );
};

export default ServiceCategoryEditPage;




