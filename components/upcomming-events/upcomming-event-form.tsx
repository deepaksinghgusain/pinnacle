"use client";

import { createUpcommingEvent, updateUpcommingEvents } from "@/lib/actions/upcomming-events";
import { UpcomingEventStatus } from "@/lib/types";
import { UpcommingEvent } from "@/lib/types";
import { upcommingEventSchema } from "@/lib/validators";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowRight, Loader } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { ControllerRenderProps, SubmitHandler, useForm } from "react-hook-form";
import { toast } from "sonner";
import z from "zod";
import { Button } from "../ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import { Input } from "../ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { Textarea } from "../ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import UpcommingImageDataTable from "./image-data-table";

const defaultValues: z.input<typeof upcommingEventSchema> = {
  title: "",
  description: "",
  category: "",
  eventDate: new Date("2000-01-01T00:00:00.000Z"),
  startTime: "",
  endTime: "",
  location: "",
  showSaveTheDate: true,
  saveTheDateText: "SAVE THE DATE",
  status: UpcomingEventStatus.NEW,
};

type UpcomingEventFormProps = {
  data?: any;
  update?: boolean;
};

type PersistedEventImage = {
  id: string;
  url: string;
};

const UpcommingEventForm = ({ data, update = false }: UpcomingEventFormProps) => {
  const router = useRouter();
  const id = data?.id;
  const persistedImages = (data?.images ?? []) as unknown as Array<string | PersistedEventImage>;
  const imageRows = persistedImages.filter((image): image is PersistedEventImage => typeof image !== "string");
  const existingImages = (persistedImages.length > 0
    ? persistedImages
    : typeof data?.imageUrl === "string" ? [data.imageUrl] : [])
    .map((image : any) => typeof image === "string" ? image : image.url)
    .filter(Boolean)
    .map((image) =>
      image.startsWith("/api/") || image.startsWith("http")
        ? image
        : `/api${image.startsWith("/") ? image : `/${image}`}`
    );
  const [previews, setPreviews] = useState<string[]>(existingImages);
  const [isPending, setIsPending] = useState(false);
  const [mounted, setIsMounted] = useState(false);

  const form = useForm<z.input<typeof upcommingEventSchema>>({
    resolver: zodResolver(upcommingEventSchema),
    defaultValues: data || defaultValues,
  });

  useEffect(() => {
    setIsMounted(true);
    if (!data) form.setValue("eventDate", new Date());
  }, [data, form]);

  const onSubmit: SubmitHandler<z.input<typeof upcommingEventSchema>> = async (values) => {
    setIsPending(true);

    try {
     
      const payload: z.infer<typeof upcommingEventSchema> = {
        ...values,
        showSaveTheDate: values.showSaveTheDate ?? true,
        saveTheDateText: values.saveTheDateText ?? "SAVE THE DATE",
        status: values.status ?? UpcomingEventStatus.NEW,
      };
      const response = update && id
        ? await updateUpcommingEvents(payload, id)
        : await createUpcommingEvent(payload);

      if (!response.success) {
        toast.error("Error", { description: response.message });
        return;
      }

      router.push("/admin/upcomming-events");
    } catch (error) {
      toast.error("Error", {
        description: error instanceof Error ? error.message : "Something went wrong",
      });
    } finally {
      setIsPending(false);
    }
  };

  if (!mounted) return null;

  return (
    <Tabs defaultValue="general" className="w-full">
      <TabsList variant="line" className="w-full mb-4">
        <TabsTrigger value="general">General</TabsTrigger>
        {
          update && <TabsTrigger value="images">Images</TabsTrigger>
        }
      </TabsList>
      <TabsContent value="general">
        <Form {...form}>
          <form className="space-y-6" onSubmit={form.handleSubmit(onSubmit, (errors) => {
            console.log("Form errors:", errors);
          })}>
            <div className="grid gap-4 md:grid-cols-2">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Title</FormLabel>
                    <FormControl><Input placeholder="Enter event title" {...field} /></FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="category"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Category</FormLabel>
                    <FormControl><Input placeholder="Enter event category" {...field} /></FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="eventDate"
                render={({ field }: { field: ControllerRenderProps<z.input<typeof upcommingEventSchema>, "eventDate"> }) => (
                  <FormItem>
                    <FormLabel>Event date</FormLabel>
                    <FormControl>
                      <Input
                        type="date"
                        value={field.value instanceof Date ? field.value.toISOString().slice(0, 10) : ""}
                        onChange={(event) => field.onChange(new Date(`${event.target.value}T00:00:00`))}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="location"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Location</FormLabel>
                    <FormControl><Input placeholder="Enter event location" {...field} /></FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="startTime"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Start time</FormLabel>
                    <FormControl><Input type="time" {...field} /></FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="endTime"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>End time</FormLabel>
                    <FormControl><Input type="time" {...field} /></FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="status"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Status</FormLabel>
                    <FormControl>
                      <Select value={field.value} onValueChange={(value) => field.onChange(value as UpcomingEventStatus)}>
                        <SelectTrigger className="w-full"><SelectValue placeholder="Select status" /></SelectTrigger>
                        <SelectContent>
                          <SelectItem value={UpcomingEventStatus.NEW}>New</SelectItem>
                          <SelectItem value={UpcomingEventStatus.ACTIVE}>Active</SelectItem>
                          <SelectItem value={UpcomingEventStatus.COMPLETED}>Completed</SelectItem>
                          <SelectItem value={UpcomingEventStatus.INACTIVE}>Inactive</SelectItem>
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="saveTheDateText"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Save the date text</FormLabel>
                    <FormControl><Input placeholder="SAVE THE DATE" {...field} /></FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="showSaveTheDate"
                render={({ field }) => (
                  <FormItem className="flex items-center gap-2 space-y-0 pt-8">
                    <FormControl><Input type="checkbox" className="h-4 w-4" checked={field.value} onChange={field.onChange} /></FormControl>
                    <FormLabel>Show save the date</FormLabel>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem className="md:col-span-2">
                    <FormLabel>Description</FormLabel>
                    <FormControl><Textarea className="min-h-[180px]" placeholder="Enter event description" {...field} /></FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <Button type="submit" disabled={isPending}>
              {isPending ? <Loader className="h-4 w-4 animate-spin" /> : <ArrowRight className="h-4 w-4" />}
              Save
            </Button>
          </form>
        </Form>
      </TabsContent>
      <TabsContent value="images">

        <UpcommingImageDataTable images={imageRows} eventId={data?.id} />
      </TabsContent>
    </Tabs>

  );
};

export default UpcommingEventForm;
