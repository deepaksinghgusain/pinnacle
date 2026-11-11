"use client";

import Image from "next/image";
import { useEffect, useRef, useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { Plus, Save, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { createIndustry, updateIndustry } from "@/lib/actions/industry-action";
import {
  defaultIndustryContent,
  parseIndustryContent,
  type IndustryContent,
  type IndustryInput,
  type IndustryItem,
} from "@/lib/industry-content";
import type { Industry, Status } from "@/lib/generated/prisma";

type Props = {
  industry?: Industry;
};

function toSlug(value: string) {
  return value
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export default function IndustryForm({ industry }: Props) {
  const router = useRouter();
  const [pending, startTransition] = useTransition();
  const [imageUploading, setImageUploading] = useState(false);
  const [heroImagePreview, setHeroImagePreview] = useState<string | null>(() =>
    getImageSource(contentHeroPath(industry)),
  );
  const fileInputRef = useRef<HTMLInputElement>(null);
  const previewObjectUrlRef = useRef<string | null>(null);
  const initialName = industry?.name ?? "";
  const [name, setName] = useState(initialName);
  const [slug, setSlug] = useState(industry?.slug ?? "");
  const [slugWasEdited, setSlugWasEdited] = useState(Boolean(industry));
  const [status, setStatus] = useState<Status>(industry?.status ?? "ACTIVE");
  const [content, setContent] = useState<IndustryContent>(() => {
    return industry
      ? parseIndustryContent(industry.content)
      : defaultIndustryContent;
  });

  const updateContent = <K extends keyof IndustryContent>(
    key: K,
    value: IndustryContent[K],
  ) => setContent((current) => ({ ...current, [key]: value }));

  useEffect(() => {
    return () => {
      if (previewObjectUrlRef.current) {
        URL.revokeObjectURL(previewObjectUrlRef.current);
      }
    };
  }, []);

  const uploadHeroImage = async (file: File) => {
    const previewUrl = URL.createObjectURL(file);
    if (previewObjectUrlRef.current) {
      URL.revokeObjectURL(previewObjectUrlRef.current);
    }
    previewObjectUrlRef.current = previewUrl;
    setHeroImagePreview(previewUrl);
    setImageUploading(true);

    try {
      const formData = new FormData();
      formData.append("image", file);
      const response = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });
      const result: unknown = await response.json();

      if (
        !response.ok ||
        !result ||
        typeof result !== "object" ||
        !("url" in result) ||
        typeof result.url !== "string"
      ) {
        const message =
          result && typeof result === "object" && "message" in result &&
          typeof result.message === "string"
            ? result.message
            : "Image upload failed";
        throw new Error(message);
      }

      updateContent("heroImagePath", result.url);
      setHeroImagePreview(getImageSource(result.url));
      URL.revokeObjectURL(previewUrl);
      previewObjectUrlRef.current = null;
      toast.success("Hero image uploaded");
    } catch (error) {
      URL.revokeObjectURL(previewUrl);
      previewObjectUrlRef.current = null;
      setHeroImagePreview(getImageSource(content.heroImagePath));
      if (fileInputRef.current) fileInputRef.current.value = "";
      toast.error("Unable to upload hero image", {
        description:
          error instanceof Error ? error.message : "Please try again.",
      });
    } finally {
      setImageUploading(false);
    }
  };

  const submit = () => {
    if (imageUploading) {
      toast.error("Please wait for the hero image upload to finish");
      return;
    }
    const payload: IndustryInput = { name, slug, status, content };
    startTransition(async () => {
      const result = industry
        ? await updateIndustry(industry.id, payload)
        : await createIndustry(payload);

      if (!result.success) {
        toast.error(industry ? "Unable to update industry" : "Unable to create industry", {
          description: result.message,
        });
        return;
      }

      toast.success(result.message);
      router.push("/admin/industry");
      router.refresh();
    });
  };

  return (
    <form
      className="space-y-6"
      onSubmit={(event) => {
        event.preventDefault();
        submit();
      }}
    >
      <section className="space-y-4 rounded-xl border p-5">
        <h2 className="text-lg font-semibold">Industry details</h2>
        <div className="grid gap-4 md:grid-cols-3">
          <TextInput
            label="Industry name"
            value={name}
            onChange={(value) => {
              setName(value);
              if (!slugWasEdited) setSlug(toSlug(value));
            }}
            required
          />
          <TextInput
            label="URL slug"
            value={slug}
            onChange={(value) => {
              setSlugWasEdited(true);
              setSlug(toSlug(value));
            }}
            placeholder="e.g. healthcare"
            required
          />
          <div className="space-y-2">
            <Label htmlFor="industry-status">Status</Label>
            <select
              id="industry-status"
              value={status}
              onChange={(event) => setStatus(event.target.value === "INACTIVE" ? "INACTIVE" : "ACTIVE")}
              className="h-10 w-full rounded-md border border-input bg-background px-3 text-sm"
            >
              <option value="ACTIVE">Active</option>
              <option value="INACTIVE">Inactive</option>
            </select>
          </div>
        </div>
      </section>

      <section className="space-y-4 rounded-xl border p-5">
        <h2 className="text-lg font-semibold">01 · Hero banner</h2>
        <div className="grid gap-4 md:grid-cols-2">
          <TextInput label="Hero title" value={content.heroTitle} onChange={(value) => updateContent("heroTitle", value)} required />
          <div className="space-y-2">
            <Label htmlFor="industry-hero-image">Hero image</Label>
            <Input
              id="industry-hero-image"
              ref={fileInputRef}
              type="file"
              accept="image/*"
              disabled={imageUploading}
              onChange={(event) => {
                const file = event.target.files?.[0];
                if (file) void uploadHeroImage(file);
              }}
            />
            <p className="text-sm text-muted-foreground">
              {imageUploading ? "Uploading image…" : "Choose an image file to upload."}
            </p>
            {heroImagePreview ? (
              <Image
                src={heroImagePreview}
                alt="Industry hero image preview"
                width={640}
                height={360}
                unoptimized
                className="mt-3 aspect-video w-full max-w-md rounded-lg border object-cover"
              />
            ) : null}
          </div>
          <TextInput label="Button 1 label" value={content.heroPrimaryLabel} onChange={(value) => updateContent("heroPrimaryLabel", value)} required />
          <TextInput label="Button 1 link" value={content.heroPrimaryHref} onChange={(value) => updateContent("heroPrimaryHref", value)} />
          <TextInput label="Button 2 label" value={content.heroSecondaryLabel} onChange={(value) => updateContent("heroSecondaryLabel", value)} required />
          <TextInput label="Button 2 link" value={content.heroSecondaryHref} onChange={(value) => updateContent("heroSecondaryHref", value)} />
        </div>
        <TextArea label="Hero description" value={content.heroDescription} onChange={(value) => updateContent("heroDescription", value)} required />
      </section>

      <section className="space-y-4 rounded-xl border p-5">
        <h2 className="text-lg font-semibold">02 · Industry overview</h2>
        <TextInput label="Section heading" value={content.overviewTitle} onChange={(value) => updateContent("overviewTitle", value)} required />
        <TextArea label="Industry introduction and context" value={content.overviewDescription} onChange={(value) => updateContent("overviewDescription", value)} required />
      </section>

      <section className="space-y-4 rounded-xl border p-5">
        <h2 className="text-lg font-semibold">03 · Industry challenges</h2>
        <TextInput label="Section heading" value={content.challengesTitle} onChange={(value) => updateContent("challengesTitle", value)} required />
        <ItemEditor title="Challenges" items={content.challenges} onChange={(items) => updateContent("challenges", items)} />
      </section>

      <section className="space-y-4 rounded-xl border p-5">
        <h2 className="text-lg font-semibold">04 · Our solutions</h2>
        <TextInput label="Section heading" value={content.solutionsTitle} onChange={(value) => updateContent("solutionsTitle", value)} required />
        <TextArea label="Section description" value={content.solutionsDescription} onChange={(value) => updateContent("solutionsDescription", value)} />
        <ItemEditor title="Services and solutions" items={content.solutions} onChange={(items) => updateContent("solutions", items)} includeHref />
      </section>

      <section className="space-y-4 rounded-xl border p-5">
        <h2 className="text-lg font-semibold">05 · Capabilities</h2>
        <TextInput label="Section heading" value={content.capabilitiesTitle} onChange={(value) => updateContent("capabilitiesTitle", value)} required />
        <ItemEditor title="Capabilities" items={content.capabilities} onChange={(items) => updateContent("capabilities", items)} />
      </section>

      <section className="space-y-4 rounded-xl border p-5">
        <h2 className="text-lg font-semibold">06 · Business outcomes</h2>
        <TextInput label="Section heading" value={content.outcomesTitle} onChange={(value) => updateContent("outcomesTitle", value)} required />
        <ItemEditor title="Outcomes" items={content.outcomes} onChange={(items) => updateContent("outcomes", items)} />
      </section>

      <div className="flex flex-wrap gap-3">
        <Button type="submit" disabled={pending || imageUploading}>
          <Save className="mr-2 size-4" />
          {imageUploading ? "Uploading image…" : pending ? "Saving…" : industry ? "Save changes" : "Create industry"}
        </Button>
        <Button type="button" variant="outline" onClick={() => router.push("/admin/industry")}>
          Cancel
        </Button>
      </div>
    </form>
  );
}

function contentHeroPath(industry?: Industry) {
  if (!industry) return defaultIndustryContent.heroImagePath;
  return parseIndustryContent(industry.content).heroImagePath;
}

function getImageSource(value: string) {
  const source = value.trim();
  if (/^\/?uploads\//i.test(source)) {
    return `/api/uploads/${source.replace(/^\/?uploads\//i, "")}`;
  }
  if (/^(https?:\/\/|\/)/i.test(source)) return source;
  return "";
}

function TextInput({
  label,
  value,
  onChange,
  placeholder,
  required = false,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  required?: boolean;
}) {
  const id = label.toLowerCase().replace(/[^a-z0-9]+/g, "-");
  return (
    <div className="space-y-2">
      <Label htmlFor={id}>{label}</Label>
      <Input
        id={id}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        required={required}
      />
    </div>
  );
}

function TextArea({
  label,
  value,
  onChange,
  required = false,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  required?: boolean;
}) {
  const id = label.toLowerCase().replace(/[^a-z0-9]+/g, "-");
  return (
    <div className="space-y-2">
      <Label htmlFor={id}>{label}</Label>
      <Textarea
        id={id}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="min-h-24"
        required={required}
      />
    </div>
  );
}

function ItemEditor({
  title,
  items,
  onChange,
  includeHref = false,
}: {
  title: string;
  items: IndustryItem[];
  onChange: (items: IndustryItem[]) => void;
  includeHref?: boolean;
}) {
  const update = (index: number, patch: Partial<IndustryItem>) => {
    onChange(items.map((item, current) => current === index ? { ...item, ...patch } : item));
  };

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between gap-3">
        <Label>{title}</Label>
        <Button
          type="button"
          size="sm"
          variant="outline"
          onClick={() => onChange([...items, { title: "", description: "", ...(includeHref ? { href: "" } : {}) }])}
        >
          <Plus className="mr-2 size-4" />
          Add item
        </Button>
      </div>
      {items.map((item, index) => (
        <div key={`${title}-${index}`} className="space-y-3 rounded-lg border p-4">
          <div className="flex items-center justify-between">
            <p className="text-sm font-medium">{title} {index + 1}</p>
            <Button
              type="button"
              variant="ghost"
              size="icon"
              aria-label={`Remove ${title} ${index + 1}`}
              onClick={() => onChange(items.filter((_, current) => current !== index))}
            >
              <Trash2 className="size-4" />
            </Button>
          </div>
          <div className="grid gap-3 md:grid-cols-2">
            <TextInput label={`${title} ${index + 1} title`} value={item.title} onChange={(value) => update(index, { title: value })} required />
            {includeHref ? (
              <TextInput label={`${title} ${index + 1} service link`} value={item.href ?? ""} onChange={(value) => update(index, { href: value })} placeholder="/service/service-slug" />
            ) : null}
          </div>
          <TextArea label={`${title} ${index + 1} description`} value={item.description} onChange={(value) => update(index, { description: value })} />
        </div>
      ))}
    </div>
  );
}
