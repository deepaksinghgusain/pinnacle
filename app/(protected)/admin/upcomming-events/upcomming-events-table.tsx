"use client";

import { useState } from "react";
import { toast } from "sonner";
import { DataTable } from "@/components/data-table";
import { deleteUpcommingEvent } from "@/lib/actions/upcomming-events";
import { getUpcommingEventColumns } from "./upcomming-events-columns";

export default function UpcommingEventsTable({
  data,
  title,
  actions
}: any) {
  const [tableData, setTableData] = useState(data);

  const deleteHandler = async (id: string) => {
    const res = await deleteUpcommingEvent(id);

    if (!res?.success) {
      toast.error("Error", { description: res?.message });
      return;
    }

    toast.success("Success", { description: res?.message });

    setTableData((prev: any[]) =>
      prev.filter((u) => u.id !== id)
    );
  };

  const columns = getUpcommingEventColumns({
    onDelete: deleteHandler,
  });

  return <DataTable data={tableData} columns={columns} title={title} actions={actions} />;
}
