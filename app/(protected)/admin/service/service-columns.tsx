import { Button } from "@/components/ui/button";
import { ColumnDef } from "@tanstack/react-table";
import { EditIcon, Trash } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import type { Service } from "@/lib/types";

type Props = {
  onDelete: (id: string) => void;
};

export const getServiceColumns = ({
  onDelete,
}: Props): ColumnDef<Service>[] => [
    {
      accessorKey: "image",
      header: "Image",
      cell: ({ row }) => {
        const service = row.original;
        const imageSrc = resolveImageSrc(service.image as string);

        return imageSrc ? (
          <Image
            src={imageSrc}
            alt={service.title}
            width={40}
            height={40}
            className="h-10 w-10 rounded-full object-cover"
          />
        ) : (
          <span className="text-gray-400 text-sm">No Image</span>
        );
      },
    },
    {
      accessorKey: "title",
      header: "Title",
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
          <Link href={`/admin/service/edit/${row.original.id}`}>
            <EditIcon size={16} />
          </Link>
        </Button>

        <Button
          size="icon"
          variant="destructive"
          className="cursor-pointer"
          onClick={() => onDelete(row.original.id as string)}
        >
          <Trash size={16} />
        </Button>
      </div>,
    },
  ];

function resolveImageSrc(value?: string | null) {
  if (!value) return null;

  const normalized = value.trim();
  if (!normalized) return null;

  if (
    normalized.startsWith("http://") ||
    normalized.startsWith("https://") ||
    normalized.startsWith("blob:")
  ) {
    return normalized;
  }

  if (normalized.startsWith("/api/")) {
    return normalized;
  }

  if (normalized.startsWith("/uploads/")) {
    return `/api${normalized}`;
  }

  if (normalized.startsWith("uploads/")) {
    return `/api/${normalized}`;
  }

  return `/api/uploads/${normalized.replace(/^\/+/, "")}`;
}
