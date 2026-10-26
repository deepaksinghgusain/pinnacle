import { ColumnDef } from "@tanstack/react-table";
import SingleEnquiry from "./enquiry";

export const getEnquiryColumns = (): ColumnDef<any>[] => [
  {
    accessorKey: "fullName",
    header: "Full Name",
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "phoneNumber",
    header: "Phone Number",
  },
  {
    accessorKey: "companyName",
    header: "Company Name",
  },
  {
    accessorKey: "subject",
    header: "Subject",
  },
  {
    accessorKey: "message",
    header: "Message",
  },
  {
    id: "actions",
    header: "Action",
    cell: ({ row }) => <SingleEnquiry id={row.original.id as string} />,
  },
];
