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

export const getTestimonialColumns = ({
  onDelete,
}: Props): ColumnDef<any>[] => [
    {
      accessorKey: "image",
      header: "Image",
      cell: ({ row }) => {
        const user = row.original;

        return user.image ? (
          <img
            src={"/api" +user.image}
            alt={user.name}
            className="w-10 h-10 rounded-full object-cover"
          />
        ) : (
          <span className="text-gray-400 text-sm">No Image</span>
        );
      },
    },
    {
      accessorKey: "name",
      header: "Name",
    },
    {
      accessorKey: "designation",
      header: "Designation",
    },
    {
      accessorKey: "company",
      header: "Company",
    },
    {
      accessorKey: "tag",
      header: "Tag",
    },
    {
      accessorKey: "content",
      header: "Content",
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
              <Link href={`/admin/testimonial/edit/${user.id}`}>
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