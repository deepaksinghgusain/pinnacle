import { Button } from "@/components/ui/button";
import Link from "next/link";

import EnquiryTable from "./enquiry-table";
import { getEnquiry } from "@/lib/actions/enquiry-action";

const EnquiryPage = async () => {
  const enquiries = await getEnquiry();

  return (
    <div className="mt-2">
      <EnquiryTable
        data={enquiries}
        title="Enquiry"
        actions={
          <Button className="bg-blue-500 hover:bg-blue-600">
            <Link href="/admin/enquiry/create">Add Enquiry</Link>
          </Button>
        }
      />
    </div>
  );
};

export default EnquiryPage;