import BannerForm from "@/components/banner/banner-form";
import EnquiryForm from "@/components/enquiry/enquiry-form";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import Link from "next/link";

const EnquiryCreatePage = async () => {

  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-center">
          <h1>Add Enquiry</h1>

          <Button asChild className="bg-blue-500 hover:bg-blue-600">
            <Link href="/admin/enquiry">Back</Link>
          </Button>
        </div>
      </CardHeader>

      <CardContent>
        <EnquiryForm />
      </CardContent>
    </Card>
  );
};

export default EnquiryCreatePage;