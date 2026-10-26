import { ColumnDef } from "@tanstack/react-table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { EditIcon, Trash } from "lucide-react";
import Link from "next/link";

type Props = {
  onDelete: (id: string) => void;
};

export const getBannerColumns = ({ onDelete }: Props): ColumnDef<any>[] => [
  {
    accessorKey: "image",
    header: "Image",
    cell: ({ row }) => {
      const banner = row.original;

      return banner.image ? (
        <img
          src={"/api" + banner.image}
          alt={banner.title}
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
    accessorKey: "tagline",
    header: "Tagline",
  },
  {
    accessorKey: "description",
    header: "Description",
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
    cell: ({ row }) => {
      const banner = row.original;

      return (
        <div className="flex gap-2">
          <Button
            asChild
            size="icon"
            className="bg-orange-500 hover:bg-orange-600"
          >
            <Link href={`/admin/banner/edit/${banner.id}`}>
              <EditIcon size={16} />
            </Link>
          </Button>

          <Button
            size="icon"
            variant="destructive"
            className="cursor-pointer"
            onClick={() => onDelete(banner.id)}
          >
            <Trash size={16} />
          </Button>
        </div>
      );
    },
  },
];
