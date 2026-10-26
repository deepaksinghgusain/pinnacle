"use client"

import React from "react";
import { Input } from "../ui/input";
import { Application, Job, ApplicationStatus } from "@/lib/types";
import { FileUp, Send, Loader } from "lucide-react";
import { Button } from "../ui/button";
import { Textarea } from "../ui/textarea";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import type { SubmitHandler } from "react-hook-form";
import { toast } from "sonner";
import {
    Form,
    FormField,
    FormItem,
    FormLabel,
    FormControl,
    FormMessage,
} from "@/components/ui/form";
import { applicationSchema } from "@/lib/validators";
import { createApplication } from "@/lib/actions/application-action";


const CareerForm = ({ jobs }: { jobs: Job[] }) => {
    const form = useForm<Application>({
        resolver: zodResolver(applicationSchema) as any,
        defaultValues: {
            fullName: "",
            email: "",
            phone: "",
            jobId: "",
            role: "",
            experience: "",
            location: "",
            resume: undefined,
            message: "",
            status: ApplicationStatus.PENDING,
        },
    });

    const [isPending, startTransition] = React.useTransition();

    const onSubmit: SubmitHandler<Application> = async (values) => {
        startTransition(async () => {
            try {
                let res;

                if (values.resume instanceof File) {
                    const formData = new FormData();
                    formData.append("image", values.resume);

                    const fileUploadRes = await fetch("/api/upload", {
                        method: "POST",
                        body: formData,
                    });

                    if (!fileUploadRes.ok) {
                        throw new Error("Image upload failed");
                    }

                    const data = await fileUploadRes.json();

                    values.resume = data.url;
                }

                res = await createApplication(values);

                if (!res?.success) {
                    toast.error("Error", {
                        description: res?.message,
                    });
                } else {
                    toast.success("Success", {
                        description: res?.message,
                    });
                    form.reset({
                        fullName: "",
                        email: "",
                        phone: "",
                        jobId: "",
                        role: "",
                        experience: "",
                        location: "",
                        resume: undefined,
                        message: "",
                        status: ApplicationStatus.PENDING,
                    });
                }
            } catch (error: any) {
                toast.error("Error submitting application", { description: error?.message });
            }
        });
    };

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="rounded-2xl border border-[#185980] bg-slate-50 p-5 shadow-[0_18px_55px_rgba(15,23,42,0.06)] sm:p-8">
                <div className="grid gap-5 sm:grid-cols-2">
                    <FormField
                        control={form.control}
                        name="fullName"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Full Name</FormLabel>
                                <FormControl>
                                    <Input placeholder="Enter your name" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Email Address</FormLabel>
                                <FormControl>
                                    <Input type="email" placeholder="you@example.com" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="phone"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Phone Number</FormLabel>
                                <FormControl>
                                    <Input placeholder="+91" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="jobId"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Preferred Role</FormLabel>
                                <FormControl>
                                    <select
                                        value={field.value}
                                        onChange={(e) => {
                                            const selectedJobId = e.target.value;
                                            field.onChange(selectedJobId);
                                            const selectedJob = jobs?.find((job) => job.id === selectedJobId);
                                            form.setValue("role", selectedJob?.title ?? "");
                                        }}
                                        className="h-12 w-full rounded-xl border border-input bg-white px-4 text-sm text-slate-700 outline-none transition focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50"
                                    >
                                        <option value="">Select a role</option>
                                        {jobs?.length > 0 && jobs.map((job) => (
                                            <option key={job.id} value={job.id}>{job.title}</option>
                                        ))}
                                    </select>
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <input type="hidden" {...form.register("role")} />

                    <FormField
                        control={form.control}
                        name="experience"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Experience</FormLabel>
                                <FormControl>
                                    <Input placeholder="Example: 2 years" {...field} />
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
                                <FormLabel>Current Location</FormLabel>
                                <FormControl>
                                    <Input placeholder="City, State" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>

                <div className="mt-5 grid gap-2">
                    <FormLabel>Upload Resume</FormLabel>
                    <div className="rounded-xl border border-dashed border-slate-300 bg-white p-4">
                        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                            <div className="flex items-center gap-3">
                                <FileUp className="size-5 text-slate-500" />
                                <p className="text-sm text-slate-600">PDF, DOC, or DOCX format preferred</p>
                            </div>

                            <FormField
                                control={form.control}
                                name="resume"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormControl>
                                            <Input
                                                type="file"
                                                accept=".pdf,.doc,.docx"
                                                onChange={(e) => field.onChange(e.target.files?.[0])}
                                                className="h-auto rounded-lg border-0 bg-transparent p-0 file:mr-3 file:h-9 file:rounded-full file:bg-slate-950 file:px-4 file:text-white"
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                    </div>
                </div>

                <FormField
                    control={form.control}
                    name="message"
                    render={({ field }) => (
                        <FormItem className="mt-5">
                            <FormLabel>Tell us about yourself</FormLabel>
                            <FormControl>
                                <Textarea placeholder="Share your skills, availability, and the kind of work you are looking for." className="min-h-32 rounded-xl bg-white px-4 py-3" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                    <p className="text-xs leading-5 text-slate-500">By applying, you confirm the information shared is accurate.</p>
                    <Button type="submit" size="lg" variant="default" className="h-12 rounded-full px-6 bg-[#185980] cursor-pointer" disabled={isPending as unknown as boolean}>
                        {isPending ? (
                            <Loader className="w-4 h-4 animate-spin mr-2" />
                        ) : (
                            <Send className="size-4 mr-2" />
                        )}
                        Submit Application
                    </Button>
                </div>
            </form>
        </Form>
    );
};

export default CareerForm;