import ServiceCategoryForm from "@/components/service/service-category-form";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { getServiceCategoryById } from "@/lib/actions/service-category-action";
import { ServiceCategory } from "@/lib/types";
import Link from "next/link";
import { redirect } from "next/navigation";


const ServiceCategoryEditPage = async ({ params }: { params: Promise<{ id: string }> }) => {

  const { id } = await params;

  const res = await getServiceCategoryById(id);

  if (!res?.success || !res.data) {
    redirect("/404");
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-center">
          <h1>Edit Service Category</h1>

          <Button asChild className="bg-blue-500 hover:bg-blue-600">
            <Link href="/admin/service-category">Back</Link>
          </Button>
        </div>
      </CardHeader>

      <CardContent>
        <ServiceCategoryForm data={res.data as ServiceCategory} update={true} />
      </CardContent>
    </Card>
  );
};

export default ServiceCategoryEditPage;
  



