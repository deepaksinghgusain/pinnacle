"use client";

import { useState } from "react";

import { DataTable } from "@/components/data-table";

import { getServiceCategoryColumns } from "./service-category-columns";
import { deleteServiceCategory } from "@/lib/actions/service-category-action";
import { toast } from "sonner";

export default function ServiceCategoryTable({
  data,
  title,
  actions
}: any) {
  const [tableData, setTableData] = useState(data);

  const deleteHandler = async (id: string) => {
    const res = await deleteServiceCategory(id);

    if (!res?.success) {
      toast.error("Error", { description: res?.message });
      return;
    }

    toast.success("Success", { description: res?.message });

    setTableData((prev: any[]) =>
      prev.filter((u) => u.id !== id)
    );
  };


  const columns = getServiceCategoryColumns({
    onDelete: deleteHandler,
  });

  return <DataTable data={tableData} columns={columns} title={title} actions={actions} />;
}
