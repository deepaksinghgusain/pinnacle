import TestimonialForm from "@/components/testimonial/testimonial-form";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import UserForm from "@/components/user/user-form";
import { getTestimonialById } from "@/lib/actions/testimonial-action";
import { Testimonial, User } from "@/lib/types";
import Link from "next/link";
import { redirect } from "next/navigation";


const TestimonialEditPage = async ({ params }: { params: Promise<{ id: string }> }) => {

  const { id } = await params;

  const res = await getTestimonialById(id);

  if (!res?.success || !res.data) {
    redirect("/404");
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-center">
          <h1>Edit Testimonial</h1>

          <Button asChild className="bg-blue-500 hover:bg-blue-600">
            <Link href="/admin/testimonial">Back</Link>
          </Button>
        </div>
      </CardHeader>

      <CardContent>
        <TestimonialForm data={res.data as Testimonial} update={true} />
      </CardContent>
    </Card>
  );
};

export default TestimonialEditPage;
  



