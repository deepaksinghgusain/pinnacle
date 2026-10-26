import { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { Trash } from "lucide-react";

type EventImage = {
  id: string;
  url: string;
};

type Props = {
  onDelete: (id: string) => void;
};

export const getImageUpcommingEventColumns = ({ onDelete }: Props): ColumnDef<EventImage>[] => [
  {
    accessorKey: "imageUrl",
    header: () => <div className="w-[400px]">Image</div>,
    cell: ({ row }) => {
      const upcommingEvent = row.original;

      const imageUrl = upcommingEvent.url;
      const isVideo = /\.(mp4|webm|ogg|mov|avi|mkv)(\?.*)?$/i.test(imageUrl);

      return imageUrl ? (
        isVideo ? (
          <video src={"/api" + imageUrl} controls className="h-40 w-40 object-cover" />
        ) : (
          <img src={"/api" + imageUrl} alt="Upcoming event" className="h-40 w-40 object-cover" />
        )
      ) : (
        <span className="text-gray-400 text-sm">No Image</span>
      );
    },
  },

  {
    id: "actions",
    header: () => <div className="text-right pr-10">Action</div>,
    cell: ({ row }) => {
      const upcommingEvent = row.original;

      return (
        <div className="flex justify-end gap-2 pr-10">

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
