"use client";

import { useRouter } from "next/navigation";
import React from "react";
import { Path, PathValue, SubmitHandler, UseFormReturn, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { serviceSchema } from "@/lib/validators";
import { serviceDefaultValues } from "@/lib/constants";
import { Status } from "@/lib/types";
import { Button } from "../ui/button";
import { ArrowRight, Loader, Trash } from "lucide-react";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import Image from "next/image";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { toast } from "sonner";
import z from "zod";
import { Service } from "@/lib/types";
import { createService } from "@/lib/actions/service-action";
import { updateService } from "@/lib/actions/service-action";

type CreateServiceValues = z.infer<typeof serviceSchema>;

type ServiceCategory = {
    id: string;
    name: string;
};

type ServiceFormProps = {
    categories: ServiceCategory[];
    data?: Service;
    update?: boolean;
};

function SectionItemList({
    form,
    name,
    label,
}: {
    form: UseFormReturn<CreateServiceValues>;
    name: Path<CreateServiceValues>;
    label: string;
}) {
    const items = (form.watch(name) as string[]) || [];

    const addItem = () => {
        const currentItems = (form.getValues(name) as string[]) || [];
        form.setValue(name, [...currentItems, ""] as PathValue<CreateServiceValues, Path<CreateServiceValues>>);
    };

    const removeItem = (index: number) => {
        const currentItems = (form.getValues(name) as string[]) || [];
        form.setValue(
            name,
            currentItems.filter((_, i) => i !== index) as PathValue<CreateServiceValues, Path<CreateServiceValues>>,
        );
    };

    return (
        <div className="space-y-4">
            <div className="flex items-center justify-between gap-2">
                <h3 className="text-base font-semibold">{label}</h3>
                <Button
                    size="sm"
                    type="button"
                    onClick={addItem}
                    className="bg-blue-500 hover:bg-blue-600"
                >
                    Add item
                </Button>
            </div>
            {items.map((_, itemIndex) => (
                <div key={itemIndex} className="grid gap-2 rounded-md border p-4">
                    <div className="flex items-center justify-between gap-2">
                        <p className="font-medium">{label} #{itemIndex + 1}</p>
                        <Button
                            type="button"
                            variant="destructive"
                            size="icon"
                            className="h-9 w-9"
                            onClick={() => removeItem(itemIndex)}
                        >
                            <Trash className="h-4 w-4" />
                        </Button>
                    </div>
                    <FormControl>
                        <Input
                            placeholder="Item"
                            {...form.register(`${name}.${itemIndex}` as Path<CreateServiceValues>)}
                        />
                    </FormControl>
                </div>
            ))}
        </div>
    );
}

const ServiceForm = ({ categories, data, update }: ServiceFormProps) => {
    const router = useRouter();
    const id = data?.id;

    const form = useForm<CreateServiceValues>({
        resolver: zodResolver(serviceSchema),
        defaultValues: data || serviceDefaultValues,
    });

    const [isPending, setIsPending] = React.useState(false);
    const [preview, setPreview] = React.useState<string | null>(null);

    const onSubmit: SubmitHandler<CreateServiceValues> = async (values) => {
        setIsPending(true);

        let res;
        let imageUrl: string | undefined;

        if (values.image instanceof File) {
            const formData = new FormData();
            formData.append("image", values.image);

            const fileUploadRes = await fetch("/api/upload", {
                method: "POST",
                body: formData,
            });

            if (!fileUploadRes.ok) {
                throw new Error("Image upload failed");
            }

            const uploadData = await fileUploadRes.json();
            imageUrl = uploadData.url;
        } else if (typeof values.image === "string") {
            imageUrl = values.image;
        }

        const payload: CreateServiceValues = {
            ...values,
            image: imageUrl,
        };

        if (update && id) {
            res = await updateService(id, payload);
        } else {
            res = await createService(payload);
        }

        if (!res?.success) {
            toast.error("Error", {
                description: res?.message,
            });
        } else {
            router.push("/admin/service");
        }
    };

    return (
        <Form {...form}>
            <form
                className="space-y-6"
                onSubmit={form.handleSubmit(onSubmit)}
            >
                <div className="grid gap-4 md:grid-cols-2">
                    <FormField
                        control={form.control}
                        name="title"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel htmlFor="title">Service Title</FormLabel>
                                <FormControl>
                                    <Input id="title" placeholder="Enter service title" {...field} />
                                </FormControl>
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
                                    <Select
                                        defaultValue={field.value}
                                        onValueChange={(value) => field.onChange(value as Status)}
                                    >
                                        <SelectTrigger className="w-full">
                                            <SelectValue placeholder="Select status" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value={Status.ACTIVE}>Active</SelectItem>
                                            <SelectItem value={Status.INACTIVE}>Inactive</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="shortDescription"
                        render={({ field }) => (
                            <FormItem className="md:col-span-2">
                                <FormLabel htmlFor="shortDescription">Short Description</FormLabel>
                                <FormControl>
                                    <Textarea id="shortDescription" placeholder="Enter short description" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="categoryId"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel htmlFor="categoryId">Category</FormLabel>
                                <FormControl>
                                    <Select
                                        defaultValue={field.value}
                                        onValueChange={(value) => field.onChange(value)}
                                    >
                                        <SelectTrigger className="w-full">
                                            <SelectValue placeholder="Select category" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {categories.map((category) => (
                                                <SelectItem key={category.id} value={category.id}>
                                                    {category.name}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="image"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Image</FormLabel>
                                <FormControl>
                                    <div className="space-y-4">
                                        <Input
                                            type="file"
                                            accept="image/*"
                                            onChange={(event) => {
                                                const file = event.target.files?.[0];
                                                field.onChange(file ?? undefined);

                                                if (file) {
                                                    setPreview(URL.createObjectURL(file));
                                                }
                                            }}
                                        />
                                        {preview ? (
                                            <Image
                                                src={preview}
                                                alt="Preview"
                                                width={800}
                                                height={256}
                                                className="h-32 w-full rounded-md object-cover"
                                            />
                                        ): data?.image && (
                                            <Image
                                                src={data.image as string}
                                                alt="Preview"
                                                width={800}
                                                height={256}
                                                className="h-32 w-full rounded-md object-cover"
                                            />
                                        )} 
                                    </div>
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>

                <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel htmlFor="description">Description</FormLabel>
                            <FormControl>
                                <Textarea id="description" placeholder="Enter full service description" className="min-h-[180px]" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <div className="space-y-6">
                    <div className="rounded-lg border p-4">
                        <h2 className="text-lg font-semibold mb-4">Service Benefits</h2>
                        <br />
                        <FormField
                            control={form.control}
                            name="serviceBenefits.title"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Benefit Title</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Benefit title" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />


                        <br />
                        <FormField
                            control={form.control}
                            name="serviceBenefits.description"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Benefit Description</FormLabel>
                                    <FormControl>
                                        <Textarea placeholder="Benefit description" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <br />
                        <SectionItemList form={form} name="serviceBenefits.items" label="Benefit item" />
                    </div>

                    <div className="rounded-lg border p-4">
                        <h2 className="text-lg font-semibold mb-4">Capabilities</h2>
                        <br />
                        <FormField
                            control={form.control}
                            name="capabilities.title"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Capability Title</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Capability title" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <br />
                        <FormField
                            control={form.control}
                            name="capabilities.description"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Capability Description</FormLabel>
                                    <FormControl>
                                        <Textarea placeholder="Capability description" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <br />
                        <SectionItemList form={form} name="capabilities.items" label="Capability item" />
                    </div>

                    <div className="rounded-lg border p-4">
                        <h2 className="text-lg font-semibold mb-4">Delivery Process</h2>
                        <br />
                        <FormField
                            control={form.control}
                            name="deliveryProcess.title"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Step Title</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Step title" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <br />
                        <SectionItemList form={form} name="deliveryProcess.items" label="Step item" />
                    </div>

                    <div className="rounded-lg border p-4">
                        <h2 className="text-lg font-semibold mb-4">Outcome Focus</h2>
                        <br />
                        <FormField
                            control={form.control}
                            name="outcomeFocuses.title"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Outcome Title</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Outcome title" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <br />
                        <FormField
                            control={form.control}
                            name="outcomeFocuses.description"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Outcome Description</FormLabel>
                                    <FormControl>
                                        <Textarea placeholder="Outcome description" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <br />
                        <SectionItemList form={form} name="outcomeFocuses.items" label="Outcome item" />
                    </div>

                    <div className="rounded-lg border p-4">
                        <h2 className="text-lg font-semibold mb-4">Contact Section</h2>
                        <br />
                        <FormField
                            control={form.control}
                            name="contactSection.title"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Contact Title</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Contact title" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <br />
                        <FormField
                            control={form.control}
                            name="contactSection.description"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Contact Description</FormLabel>
                                    <FormControl>
                                        <Textarea placeholder="Contact description" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <br />
                    </div>
                </div>

                <div className="flex">
                    <Button type="submit" disabled={isPending}>
                        {isPending ? (
                            <Loader className="mr-2 h-4 w-4 animate-spin" />
                        ) : (
                            <ArrowRight className="mr-2 h-4 w-4" />
                        )}
                        Save Service
                    </Button>
                </div>
            </form>
        </Form>
    );
};

export default ServiceForm;







