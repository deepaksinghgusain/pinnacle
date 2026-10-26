"use client";

import { useState } from "react";
import { toast } from "sonner";

// import { DataTable } from "@/components/common/DataTable";
import { DataTable } from "@/components/data-table";
import { getTestimonialColumns } from "./testimonial-columns";

import { deleteUser } from "@/lib/actions/user-action";
import { deleteTestimonial } from "@/lib/actions/testimonial-action";

export default function TestimonialTable({
  data,
  canEdit,
  canDelete,
  title,
  actions
}: any) {
  const [tableData, setTableData] = useState(data);

  const deleteHandler = async (id: string) => {
    const res = await deleteTestimonial(id);

    if (!res?.success) {
      toast.error("Error", { description: res?.message });
      return;
    }

    toast.success("Success", { description: res?.message });

    setTableData((prev: any[]) =>
      prev.filter((u) => u.id !== id)
    );
  };

  const columns = getTestimonialColumns({
    canEdit,
    canDelete,
    onDelete: deleteHandler,
  });

  return <DataTable data={tableData} columns={columns} title={title} actions={actions} />;
}
