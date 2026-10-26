import { ColumnDef } from "@tanstack/react-table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { EditIcon, Trash } from "lucide-react";
import Link from "next/link";
import { format } from "date-fns";

type Props = {
  canEdit: boolean;
  canDelete: boolean;
  onDelete: (id: string) => void;
};

export const getJobColumns = ({
  onDelete,
}: Props): ColumnDef<any>[] => [
    {
      accessorKey: "title",
      header: "Title",
    },
    {
      accessorKey: "shortDescription",
      header: "Short Description",
      cell: ({ row }) => {
        const v = row.original.shortDescription;
        return v ? <span className="text-sm text-slate-700">{v}</span> : <span className="text-gray-400">-</span>;
      },
    },
    {
      accessorKey: "employmentType",
      header: "Employment",
    },
    {
      accessorKey: "workMode",
      header: "Work Mode",
    },
    {
      accessorKey: "vacancies",
      header: "Vacancies",
    },
    {
      accessorKey: "location",
      header: "Location",
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }) => {
        const status = row.original.status;

        return status === "ACTIVE" ? (
          <Badge className="bg-green-500">ACTIVE</Badge>
        ) : (
          <Badge variant="destructive">INACTIVE</Badge>
        );
      },
    },
    {
      accessorKey: "createdAt",
      header: "Created",
      cell: ({ row }) => {
        const value = row.original.createdAt;
        return value ? format(new Date(value), "PPP") : "-";
      },
    },
    {
      id: "actions",
      header: "Action",
      cell: ({ row }) => {
        const user = row.original;

        return (
          <div className="flex gap-2">
            <Button
              asChild
              size="icon"
              className="bg-orange-500 hover:bg-orange-600"
            >
              <Link href={`/admin/job/edit/${user.id}`}>
                <EditIcon size={16} />
              </Link>
            </Button>

            <Button
              size="icon"
              variant="destructive"
              className="cursor-pointer"
              onClick={() => onDelete(user.id)}
            >
              <Trash size={16} />
            </Button>
          </div>
        );
      },
    },
  ];