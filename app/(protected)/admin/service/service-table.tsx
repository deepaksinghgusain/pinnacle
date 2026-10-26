"use client";

import { useState } from "react";

import { DataTable } from "@/components/data-table";

import { getServiceColumns } from "./service-columns";
import { toast } from "sonner";
import { deleteService } from "@/lib/actions/service-action";

export default function ServiceTable({
  data,
  title,
  actions
}: any) {
  const [tableData, setTableData] = useState(data);

  const deleteHandler = async (id: string) => {
    const res = await deleteService(id);

    if (!res?.success) {
      toast.error("Error", { description: res?.message });
      return;
    }

    toast.success("Success", { description: res?.message });

    setTableData((prev: any[]) =>
      prev.filter((u) => u.id !== id)
    );
  };


  const columns = getServiceColumns({
    onDelete: deleteHandler,
  });

  return <DataTable data={tableData} columns={columns} title={title} actions={actions} />;
}
