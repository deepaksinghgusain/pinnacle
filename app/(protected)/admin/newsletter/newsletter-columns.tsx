import { Button } from "@/components/ui/button";
import { ColumnDef } from "@tanstack/react-table";
import { EditIcon, Trash } from "lucide-react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";

type Props = {
  onDelete: (id: string) => void;
};

export const getNewsletterColumns = ({
  onDelete,
}: Props): ColumnDef<any>[] => [
    {
      accessorKey: "email",
      header: "Email",
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
      id: "actions",
      header: "Action",
      cell: ({ row }) => <div className="flex gap-2">
        <Button
          asChild
          size="icon"
          className="bg-orange-500 hover:bg-orange-600"
        >
          <Link href={`/admin/newsletter/edit/${row.original.id}`}>
            <EditIcon size={16} />
          </Link>
        </Button>

        <Button
          size="icon"
          variant="destructive"
          className="cursor-pointer"
          onClick={() => onDelete(row.original.id)}
        >
          <Trash size={16} />
        </Button>
      </div>,
    },
  ];
