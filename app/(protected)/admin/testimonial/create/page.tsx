import TestimonialForm from "@/components/testimonial/testimonial-form";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import Link from "next/link";

const TestimonialCreatePage = async () => {

  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-center">
          <h1>Add Testimonial</h1>

          <Button asChild className="bg-blue-500 hover:bg-blue-600">
            <Link href="/admin/testimonial">Back</Link>
          </Button>
        </div>
      </CardHeader>

      <CardContent>
        <TestimonialForm update={false} />
      </CardContent>
    </Card>
  );
};

export default TestimonialCreatePage;