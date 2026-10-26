import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { getNewsletterById } from "@/lib/actions/newsletter-action";
import NewsletterForm from "@/components/newsletter/newsletter-form";

import { Newsletter } from "@/lib/types";
import Link from "next/link";
import { redirect } from "next/navigation";


const NewsletterEditPage = async ({ params }: { params: Promise<{ id: string }> }) => {

  const { id } = await params;

  const res = await getNewsletterById(id);

  if (!res?.success || !res.data) {
    redirect("/404");
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-center">
          <h1>Edit Newsletter</h1>
          <Button asChild className="bg-blue-500 hover:bg-blue-600">
            <Link href="/admin/newsletter">Back</Link>
          </Button>
        </div>
      </CardHeader>

      <CardContent>
        <NewsletterForm data={res.data as Newsletter} update={true} />
      </CardContent>
    </Card>
  );
};

export default NewsletterEditPage;
  



