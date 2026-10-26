"use client";
import { newsletterDefaultValues } from '@/lib/constants';
import { newsletterSchema } from '@/lib/validators';
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
import { createNewsletter, updateNewsletter } from '@/lib/actions/newsletter-action';

type UserFormProps = {
    data?: z.infer<typeof newsletterSchema>;
    update?: boolean;
};

const NewsletterForm = ({ data, update = false }: UserFormProps) => {
    const router = useRouter();
    const id = data?.id || "";

    const defaultFormValues: z.infer<typeof newsletterSchema> = data
        ? {
            email: data.email,
            status: data.status as z.infer<typeof newsletterSchema>["status"],
            id: data.id
        }
        : newsletterDefaultValues;

    const form = useForm<z.infer<typeof newsletterSchema>>({
        resolver: zodResolver(newsletterSchema),
        defaultValues: defaultFormValues,
    });

    const [isPending, startTransition] = React.useTransition();

    const onSubmit: SubmitHandler<z.infer<typeof newsletterSchema>> = async (
        values: any,
    ) => {
        startTransition(async () => {
            let res;

            if (update) {
                res = await updateNewsletter(values, id as string);
            } else {
                res = await createNewsletter(values);
            }

            if (!res?.success) {
                toast.error("Error", {
                    description: res?.message,
                });
            } else {
                router.push("/admin/newsletter");
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
                            name="email"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel htmlFor="email">Email</FormLabel>
                                    <FormControl>
                                        <Input id="email" placeholder="Enter email" {...field} />
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

export default NewsletterForm;
