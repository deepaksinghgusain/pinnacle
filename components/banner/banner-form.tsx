"use client";

import { bannerSchema } from "@/lib/validators";
import { Banner, User } from "@/lib/types";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useState } from "react";
import { ControllerRenderProps, SubmitHandler, useForm } from "react-hook-form";
import { toast } from "sonner";
import z from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "../ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Button } from "../ui/button";
import { ArrowRight, Loader } from "lucide-react";
import { useRouter } from "next/navigation";
import { Status } from "@/lib/types";
import { bannerDefaultValues,  } from "@/lib/constants";
import { createBanner, updateBanner } from "@/lib/actions/banner-action";
import { Textarea } from "../ui/textarea";

type UserFormProps = {
  data?: Banner;
  update?: boolean;
};

const BannerForm = ({ data, update = false }: UserFormProps) => {
  const router = useRouter();
  const id = data?.id;

  const form = useForm<z.infer<typeof bannerSchema>>({
    resolver: zodResolver(bannerSchema),
    defaultValues: data || bannerDefaultValues,
  });

  const [isPending, startTransition] = React.useTransition();
  const [preview, setPreview] = useState<string | null>(null);

  const onSubmit: SubmitHandler<z.infer<typeof bannerSchema>> = async (
    values: any,
  ) => {
    startTransition(async () => {
      let res;

      const formData = new FormData();
      formData.append("image", values.image);

      const fileUploadRes = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      const data = await fileUploadRes.json();

      values.image = data.url;

      if (update && id) {
        res = await updateBanner(values, id);
      } else {
        res = await createBanner(values);
      }

      if (!res?.success) {
        toast.error("Error", {
          description: res?.message,
        });
      } else {
        router.push("/admin/banner");
      }
    });
  };
  return (
    <Form {...form}>
      <form
        className="space-y-4"
        onSubmit={form.handleSubmit(onSubmit, (errors) => console.log(errors))}
      >
        <div className="grid grid-cols-2 gap-4">
          <div className="flex flex-col gap-5">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor="name">Title</FormLabel>
                  <FormControl>
                    <Input id="name" placeholder="Enter title" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="flex flex-col gap-5">
            <FormField
              control={form.control}
              name="tagline"
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor="tagline">Tagline</FormLabel>
                  <FormControl>
                    <Input id="name" placeholder="Enter title" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="flex flex-col gap-5">
            <FormField
              control={form.control}
              name="status"
              render={({
                field,
              }: {
                field: ControllerRenderProps<
                  z.infer<typeof bannerSchema>,
                  "status"
                >;
              }) => (
                <FormItem>
                  <FormLabel>Status</FormLabel>
                  <FormControl>
                    <Select
                      defaultValue={field.value}
                      onValueChange={(v) => field.onChange(v as Status)}
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value={Status.ACTIVE}>Active</SelectItem>
                        <SelectItem value={Status.INACTIVE}>
                          Inactive
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="flex flex-col gap-5">
            <FormField
              control={form.control}
              name="image"
              render={({
                field,
              }: {
                field: ControllerRenderProps<
                  z.infer<typeof bannerSchema>,
                  "image"
                >;
              }) => (
                <FormItem>
                  <FormLabel>Image</FormLabel>
                  <FormControl>
                    <div className="space-y-4">
                      <Input
                        type="file"
                        accept="image/*"
                        onChange={(e) => {
                          const file = e.target.files?.[0];

                          if (file) {
                            setPreview(URL.createObjectURL(file));
                          }

                          field.onChange(file);
                        }}
                      />

                      <p>
                        The image has a resolution of:
                        Image Width: 680 px
                        Image Height: 720 px
                      </p>

                      {preview ? (
                        <img
                          src={preview}
                          alt="Preview"
                          className="h-10 w-10 border object-cover"
                        />
                      ) : (data && data.image && (
                        <img
                          src={"/api" + data?.image}
                          alt="Preview"
                          className="h-10 w-10 border object-cover"
                        />
                      ))}
                    </div>

                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="flex flex-col gap-5 col-span-full">
            <FormField
              control={form.control}
              name="description"
              render={({
                field,
              }: {
                field: ControllerRenderProps<
                  z.infer<typeof bannerSchema>,
                  "description"
                >;
              }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Enter Description"  className="min-h-[200px]"  {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

        </div>
        <div className="flex gap-2">
          <Button type="submit" className="cursor-pointer" disabled={isPending}>
            {isPending ? (
              <Loader className="w-4 h-4 animate-spin cursor-pointer" />
            ) : (
              <ArrowRight className="w-4 h-4" />
            )}{" "}
            Save
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default BannerForm;
