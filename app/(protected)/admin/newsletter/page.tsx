import { Button } from "@/components/ui/button";
import Link from "next/link";

import { getNewsletter } from "@/lib/actions/newsletter-action";
import NewsletterTable from "./newsletter-table";

const NewsletterPage = async () => {
  const newsletters = await getNewsletter();

  return (
    <div className="mt-2">
      <NewsletterTable
        data={newsletters}
        title="Newsletters"
        actions={
          <Button className="bg-blue-500 hover:bg-blue-600">
            <Link href="/admin/newsletter/create">Add Newsletter</Link>
          </Button>
        }
      />
    </div>
  );
};

export default NewsletterPage;