import { ColumnDef } from "@tanstack/react-table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { EditIcon, Trash } from "lucide-react";
import Link from "next/link";
import type { UpcommingEvent } from "@/lib/types";

type Props = {
  onDelete: (id: string) => void;
};

export const getUpcommingEventColumns = ({ onDelete }: Props): ColumnDef<any>[] => [
  {
    accessorKey: "imageUrl",
    header: "Image",
    cell: ({ row }) => {
      const upcommingEvent = row.original;

      const imageUrl = upcommingEvent.images?.[0]?.url ?? upcommingEvent.imageUrl;

      return imageUrl ? (
        <img
          src={"/api" + imageUrl}
          alt={upcommingEvent.title}
          className="w-10 h-10 rounded-full object-cover"
        />
      ) : (
        <span className="text-gray-400 text-sm">No Image</span>
      );
    },
  },
  {
    accessorKey: "title",
    header: "title",
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status = row.original.status;

      return status === "ACTIVE" ? (
        <Badge className="bg-green-500">ACTIVE</Badge>
      ) : status === "COMPLETED" ? (
        <Badge className="bg-blue-500">COMPLETED</Badge>
      ) : status === "NEW" ? (
        <Badge className="bg-orange-500">NEW</Badge>
      ) : (
        <Badge variant="destructive">INACTIVE</Badge>
      );
    },
  },

  {
    id: "actions",
    header: "Action",
    cell: ({ row }) => {
      const upcommingEvent = row.original;

      return (
        <div className="flex gap-2">
          <Button
            asChild
            size="icon"
            className="bg-orange-500 hover:bg-orange-600"
          >
            <Link href={`/admin/upcomming-events/edit/${upcommingEvent.id}`}>
              <EditIcon size={16} />
            </Link>
          </Button>

          <Button
            size="icon"
            variant="destructive"
            className="cursor-pointer"
            onClick={() => onDelete(upcommingEvent.id!)}
          >
            <Trash size={16} />
          </Button>
        </div>
      );
    },
  },
];
