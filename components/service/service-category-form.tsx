"use client";
import { serviceCategoryDefaultValues } from '@/lib/constants';
import { serviceCategorySchema } from '@/lib/validators';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form';
import { toast } from 'sonner';
import z from 'zod';
import { Button } from '../ui/button';
import { ArrowRight, Loader } from 'lucide-react';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '../ui/form';
import { Textarea } from '../ui/textarea';
import { Input } from '../ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Status } from "@/lib/types";
import { createServiceCategory, updateServiceCategory } from '@/lib/actions/service-category-action';

type UserFormProps = {
    data?: z.infer<typeof serviceCategorySchema>;
    update?: boolean;
};

const ServiceCategoryForm = ({ data, update = false }: UserFormProps) => {
    const router = useRouter();
    const id = data?.id;

    const defaultFormValues: z.infer<typeof serviceCategorySchema> = data
        ? {
              name: data.name,
              status: data.status as z.infer<typeof serviceCategorySchema>["status"],
              id: data.id,
              createdAt: data.createdAt,
              updatedAt: data.updatedAt,
          }
        : serviceCategoryDefaultValues;

    const form = useForm<z.infer<typeof serviceCategorySchema>>({
        resolver: zodResolver(serviceCategorySchema),
        defaultValues: defaultFormValues,
    });

    const [isPending, startTransition] = React.useTransition();
    const [preview, setPreview] = useState<string | null>(null);

    const onSubmit: SubmitHandler<z.infer<typeof serviceCategorySchema>> = async (
        values: any,
    ) => {
        startTransition(async () => {
            let res;

            if (update) {
                res = await updateServiceCategory(id as string, values);
            } else {
                res = await createServiceCategory(values);
            }

            if (!res?.success) {
                toast.error("Error", {
                    description: res?.message,
                });
            } else {
                router.push("/admin/service-category");
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
                            name="name"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel htmlFor="name">Full Name</FormLabel>
                                    <FormControl>
                                        <Input id="name" placeholder="Enter Full name" {...field} />
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

export default ServiceCategoryForm;
