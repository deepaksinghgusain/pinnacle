"use client";

import { useState } from "react";

import { DataTable } from "@/components/data-table";

import { getCareerColumns, type CareerApplicationRow } from "./career-columns";
import {
  updateApplicationStatus,
  type ApplicationReviewStatus,
} from "@/lib/actions/application-action";
import { toast } from "sonner";

export default function CareerTable({
  data,
  title,
  actions,
}: {
  data: CareerApplicationRow[];
  title?: string;
  actions?: React.ReactNode;
}) {
  const [tableData, setTableData] = useState<CareerApplicationRow[]>(data);

  const handleStatusChange = async (
    id: string,
    status: ApplicationReviewStatus,
  ) => {
    const result = await updateApplicationStatus(id, status);

    if (!result.success) {
      toast.error("Could not update application status", {
        description: result.message,
      });
      return;
    }

    setTableData((current) =>
      current.map((application) =>
        application.id === id ? { ...application, status } : application,
      ),
    );
    toast.success("Application status updated");
  };

  const columns = getCareerColumns({ onStatusChange: handleStatusChange });

  return <DataTable data={tableData} columns={columns} title={title} actions={actions} />;
}
