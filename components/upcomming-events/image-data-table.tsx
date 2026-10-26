"use client";

import { addImagesUpcommingEvent, deleteImagesUpcommingEvent } from '@/lib/actions/upcomming-events';
import React, { useRef, useState } from 'react'
import { toast } from 'sonner';
import { getImageUpcommingEventColumns } from './image-events-columns';
import { DataTable } from '../data-table';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from '../ui/alert-dialog';

type EventImage = {
    id: string;
    url: string;
};

type UpcomingImageDataTableProps = {
    images?: EventImage[];
    eventId?: string;
};

const UpcommingImageDataTable = ({ images = [], eventId }: UpcomingImageDataTableProps) => {

    const [tableData, setTableData] = useState<EventImage[]>(images);
    const [pendingImageId, setPendingImageId] = useState<string | null>(null);
    const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
    const [isUploading, setIsUploading] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const uploadHandler = async () => {
        if (!eventId || selectedFiles.length === 0) return;

        setIsUploading(true);
        try {
            const uploadedUrls = await Promise.all(selectedFiles.map(async (file) => {
                const formData = new FormData();
                formData.append("file", file);
                const response = await fetch("/api/upload", { method: "POST", body: formData });
                const result = await response.json();
                if (!response.ok) throw new Error(result.message || "Media upload failed");
                return result.url.replace(/^\/api/, "");
            }));

            const result = await addImagesUpcommingEvent(eventId, uploadedUrls);
            if (!result.success || !result.images) {
                throw new Error(result.message);
            }

            setTableData(result.images);
            setSelectedFiles([]);
            if (fileInputRef.current) fileInputRef.current.value = "";
            toast.success("Success", { description: result.message });
        } catch (error) {
            toast.error("Error", {
                description: error instanceof Error ? error.message : "Something went wrong",
            });
        } finally {
            setIsUploading(false);
        }
    };

    const deleteHandler = async () => {
        if (!eventId) return;
        if (!pendingImageId) return;

        const imageId = pendingImageId;
        const res = await deleteImagesUpcommingEvent(imageId, eventId);

        if (!res?.success) {
            toast.error("Error", { description: res?.message });
            return;
        }

        toast.success("Success", { description: res?.message });

        setTableData((prev) =>
            prev.filter((u) => u.id !== imageId)
        );
        setPendingImageId(null);
    };

    const columns = getImageUpcommingEventColumns({
        onDelete: setPendingImageId,
    });

    return (
        <>
            <div className="mb-4 flex flex-col gap-3 rounded-lg border p-4 sm:flex-row sm:items-start">
                <div className="flex-1 space-y-2">
                    <div className="">
                        <label htmlFor="event-media" className="text-sm font-medium mb-4">
                            Add images or videos
                        </label>
                        <Input
                            id="event-media"
                            ref={fileInputRef}
                            type="file"
                            multiple
                            accept="image/*,video/*"
                            disabled={isUploading}
                            onChange={(event) => setSelectedFiles(Array.from(event.target.files ?? []))}
                        />
                        {selectedFiles.length > 0 && (
                            <p className="text-sm text-muted-foreground">
                                {selectedFiles.length} file{selectedFiles.length === 1 ? "" : "s"} selected
                            </p>
                        )}
                    </div>
                    <div>
                        <Button type="button" onClick={() => void uploadHandler()} disabled={isUploading || selectedFiles.length === 0}>
                            {isUploading ? "Uploading..." : "Upload media"}
                        </Button>
                    </div>
                </div>
                
            </div>
            <DataTable data={tableData} columns={columns} title="Image Events" />
            <AlertDialog open={pendingImageId !== null} onOpenChange={(open) => !open && setPendingImageId(null)}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Delete image?</AlertDialogTitle>
                        <AlertDialogDescription>
                            This image will be permanently removed from the event.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction onClick={() => void deleteHandler()}>Delete</AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </>
    );

}

export default UpcommingImageDataTable