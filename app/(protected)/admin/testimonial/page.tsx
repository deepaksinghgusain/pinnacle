import { Button } from "@/components/ui/button";
import Link from "next/link";
import { getUsers } from "@/lib/actions/user-action";
import TestimonialTable from "./testimonial-table";
import { getTestimonials } from "@/lib/actions/testimonial-action";

const TestimonialPage = async () => {

  const testimonials = await getTestimonials();
  
  return (
    <div className="mt-2">
      <TestimonialTable
        data={testimonials}
        title="Testimonial"
        actions={
          <Button className="bg-blue-500 hover:bg-blue-600">
            <Link href="/admin/testimonial/create">Add Testimonial</Link>
          </Button>
        }
      />
    </div>
  );
};

export default TestimonialPage;
