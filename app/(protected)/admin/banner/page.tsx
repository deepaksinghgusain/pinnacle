import { Button } from "@/components/ui/button";
import Link from "next/link";

import BannerTable from "./banner-table";
import { getBanner } from "@/lib/actions/banner-action";

const UserPage = async () => {

  const banners = await getBanner();

  return (
    <div className="mt-2">
      <BannerTable
        data={banners}
        title="Banner"
        actions={
          <Button className="bg-blue-500 hover:bg-blue-600">
            <Link href="/admin/banner/create">Add Banner</Link>
          </Button>
        }
      />
    </div>
  );
};

export default UserPage;
