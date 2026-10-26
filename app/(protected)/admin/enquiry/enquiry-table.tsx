"use client";

import { useState } from "react";

import { DataTable } from "@/components/data-table";

import { getEnquiryColumns } from "./enquiry-columns";

export default function EnquiryTable({
  data,
  title,
  actions
}: any) {
  const [tableData, setTableData] = useState(data);

  const columns = getEnquiryColumns();

  return <DataTable data={tableData} columns={columns} title={title} actions={actions} />;
}
