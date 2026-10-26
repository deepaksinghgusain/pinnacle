"use client";

import { useTransition } from "react";
import { ColumnDef } from "@tanstack/react-table";
import SingleApplication from "./career";
import type { ApplicationReviewStatus } from "@/lib/actions/application-action";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const statusLabels: Record<ApplicationReviewStatus, string> = {
  PENDING: "Pending",
  REVIEWING: "Reviewing",
  SHORTLISTED: "Selected",
  REJECTED: "Not selected",
  HIRED: "Hired",
};

export type CareerApplicationRow = Record<string, unknown> & {
  id?: string;
  status: ApplicationReviewStatus;
};

function ApplicationStatusSelect({
  id,
  status,
  onStatusChange,
}: {
  id: string;
  status: ApplicationReviewStatus;
  onStatusChange: (id: string, status: ApplicationReviewStatus) => Promise<void>;
}) {
  const [isPending, startTransition] = useTransition();

  return (
    <Select
      value={status}
      onValueChange={(value) => {
        startTransition(() => onStatusChange(id, value as ApplicationReviewStatus));
      }}
      disabled={isPending}
    >
      <SelectTrigger size="sm" className="min-w-32 capitalize">
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        {Object.entries(statusLabels).map(([value, label]) => (
          <SelectItem key={value} value={value}>
            {label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}

export const getCareerColumns = ({
  onStatusChange,
}: {
  onStatusChange: (id: string, status: ApplicationReviewStatus) => Promise<void>;
}): ColumnDef<CareerApplicationRow>[] => [
  {
    accessorKey: "fullName",
    header: "Full Name",
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "phone",
    header: "Phone",
  },
  {
    accessorKey: "role",
    header: "Role",
  },
  {
    accessorKey: "location",
    header: "Location",
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) =>
      row.original.id ? (
        <ApplicationStatusSelect
          id={row.original.id}
          status={row.original.status}
          onStatusChange={onStatusChange}
        />
      ) : null,
  },
  {
    id: "actions",
    header: "Action",
    cell: ({ row }) => <SingleApplication id={row.original.id ?? ""} />,
  },
];
