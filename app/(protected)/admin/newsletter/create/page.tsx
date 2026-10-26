import NewsletterForm from "@/components/newsletter/newsletter-form";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import Link from "next/link";

const NewsletterCreatePage = async () => {

  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-center">
          <h1>Add Newsletter</h1>

          <Button asChild className="bg-blue-500 hover:bg-blue-600">
            <Link href="/admin/newsletter">Back</Link>
          </Button>
        </div>
      </CardHeader>

      <CardContent>
        <NewsletterForm update={false} />
      </CardContent>
    </Card>
  );
};

export default NewsletterCreatePage;