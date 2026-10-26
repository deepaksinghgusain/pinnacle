import { Button } from "@/components/ui/button";
import { ColumnDef } from "@tanstack/react-table";
import { EditIcon, Trash } from "lucide-react";
import Link from "next/link";

type Props = {
  onDelete: (id: string) => void;
};

export const getServiceCategoryColumns = ({
  onDelete,
}: Props): ColumnDef<any>[] => [
    {
      accessorKey: "name",
      header: "Name",
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
          <Link href={`/admin/service-category/edit/${row.original.id}`}>
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
