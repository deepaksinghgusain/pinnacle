import { Button } from "@/components/ui/button";
import Link from "next/link";

import UserTable from "./user-table";
import { getUsers } from "@/lib/actions/user-action";

const UserPage = async () => {

  const users = await getUsers();
  
  return (
    <div className="mt-2">
      <UserTable
        data={users}
        title="User"
        actions={
          <Button className="bg-blue-500 hover:bg-blue-600">
            <Link href="/admin/user/create">Add User</Link>
          </Button>
        }
      />
    </div>
  );
};

export default UserPage;
