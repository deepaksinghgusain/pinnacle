"use client";

import { jobSchema } from "@/lib/validators";
import { Job } from "@/lib/types";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";
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
import { Button } from "../ui/button";
import { ArrowRight, Loader } from "lucide-react";
import { useRouter } from "next/navigation";

import { Textarea } from "../ui/textarea";
import { createJob, updateJob } from "@/lib/actions/job-action";
import { jobsDefaultValues } from "@/lib/constants";
import { EmploymentType, Status, WorkMode } from "@/lib/generated/prisma";

type JobFormProps = {
  data?: Job;
  update?: boolean;
};

const JobForm = ({ data, update = false }: JobFormProps) => {
    const router = useRouter();
    const id = data?.id;

    const form = useForm<z.infer<typeof jobSchema>>({
        resolver: zodResolver(jobSchema) as any,
        defaultValues: (data as any) || jobsDefaultValues,
    });

    const [isPending, startTransition] = React.useTransition();

    const onSubmit: SubmitHandler<z.infer<typeof jobSchema>> = async (
        values: any,
    ) => {
        startTransition(async () => {
            let res;

            if (update && id) {
                res = await updateJob(values, id);
            } else {
                res = await createJob(values);
            }
            if (!res?.success) {
                toast.error("Error", {
                    description: res?.message,
                });
            } else {
                router.push("/admin/job");
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
                    <div className="flex flex-col gap-5 col-span-2">
                        <FormField
                            control={form.control}
                            name="title"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Job Title</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Enter job title" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>

                    <div className="flex flex-col gap-5">
                        <FormField
                            control={form.control}
                            name="shortDescription"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Short Description</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Short description" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>

                    <div className="flex flex-col gap-5">
                        <FormField
                            control={form.control}
                            name="vacancies"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Vacancies</FormLabel>
                                    <FormControl>
                                        <Input type="number" placeholder="Number of vacancies" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>

                    <div className="flex flex-col gap-5">
                        <FormField
                            control={form.control}
                            name="location"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Location</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Location" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>

                    <div className="flex flex-col gap-5">
                        <FormField
                            control={form.control}
                            name="employmentType"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Employment Type</FormLabel>
                                    <FormControl>
                                        <select
                                            className="w-full rounded-md border bg-white/5 px-3 py-2"
                                            value={field.value || ""}
                                            onChange={(e) => field.onChange(e.target.value)}
                                        >
                                            <option value="">Select</option>
                                            <option value={EmploymentType.FULL_TIME}>Full Time</option>
                                            <option value={EmploymentType.PART_TIME}>Part Time</option>
                                            <option value={EmploymentType.CONTRACT}>Contract</option>
                                            <option value={EmploymentType.FREELANCE}>Freelance</option>
                                            <option value={EmploymentType.INTERNSHIP}>Internship</option>
                                        </select>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>

                    <div className="flex flex-col gap-5">
                        <FormField
                            control={form.control}
                            name="workMode"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Work Mode</FormLabel>
                                    <FormControl>
                                        <select
                                            className="w-full rounded-md border bg-white/5 px-3 py-2"
                                            value={field.value || ""}
                                            onChange={(e) => field.onChange(e.target.value)}
                                        >
                                            <option value="">Select</option>
                                            <option value={WorkMode.REMOTE}>Remote</option>
                                            <option value={WorkMode.HYBRID}>Hybrid</option>
                                            <option value={WorkMode.ONSITE}>Onsite</option>
                                        </select>
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
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Description</FormLabel>
                                    <FormControl>
                                        <Textarea placeholder="Full description" className="min-h-[200px]" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>

                    <div className="flex flex-col gap-5">
                        <FormField
                            control={form.control}
                            name="experience"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Experience</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Experience (e.g., 2-4 years)" {...field} />
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
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Status</FormLabel>
                                    <FormControl>
                                        <select
                                            className="w-full rounded-md border bg-white/5 px-3 py-2"
                                            value={field.value}
                                            onChange={(e) => field.onChange(e.target.value)}
                                        >
                                            <option value={Status.ACTIVE}>Active</option>
                                            <option value={Status.INACTIVE}>Inactive</option>
                                        </select>
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

export default JobForm;
