"use client";

import { useState } from "react";

import { DataTable } from "@/components/data-table";

import { getNewsletterColumns } from "./newsletter-columns";
import { toast } from "sonner";
import { deleteNewsletter } from "@/lib/actions/newsletter-action";

export default function NewsletterTable({
  data,
  title,
  actions
}: any) {
  const [tableData, setTableData] = useState(data);

  const deleteHandler = async (id: string) => {
    const res = await deleteNewsletter(id);

    if (!res?.success) {
      toast.error("Error", { description: res?.message });
      return;
    }

    toast.success("Success", { description: res?.message });

    setTableData((prev: any[]) =>
      prev.filter((u) => u.id !== id)
    );
  };


  const columns = getNewsletterColumns({
    onDelete: deleteHandler,
  });

  return <DataTable data={tableData} columns={columns} title={title} actions={actions} />;
}
