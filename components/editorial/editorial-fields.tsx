"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { Plus, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import type { EditorialItem } from "@/lib/editorial-content";

export function EditorialTextInput({
  label,
  value,
  onChange,
  required = false,
  placeholder,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  required?: boolean;
  placeholder?: string;
}) {
  const id = label.toLowerCase().replace(/[^a-z0-9]+/g, "-");
  return (
    <div className="space-y-2">
      <Label htmlFor={id}>{label}</Label>
      <Input
        id={id}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        required={required}
        placeholder={placeholder}
      />
    </div>
  );
}

export function EditorialTextArea({
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
        required={required}
        className="min-h-28"
      />
    </div>
  );
}

function getImageSource(value: string) {
  const source = value.trim();
  if (/^\/?uploads\//i.test(source)) {
    return `/api/uploads/${source.replace(/^\/?uploads\//i, "")}`;
  }
  if (/^(https?:\/\/|\/)/i.test(source)) return source;
  return "";
}

export function EditorialImageUpload({
  value,
  onChange,
  onUploadingChange,
  label = "Hero image",
}: {
  value: string;
  onChange: (value: string) => void;
  onUploadingChange?: (uploading: boolean) => void;
  label?: string;
}) {
  const [uploading, setUploading] = useState(false);
  const [preview, setPreview] = useState(() => getImageSource(value));
  const inputRef = useRef<HTMLInputElement>(null);
  const objectUrlRef = useRef<string | null>(null);

  useEffect(() => {
    setPreview(getImageSource(value));
  }, [value]);

  useEffect(
    () => () => {
      if (objectUrlRef.current) URL.revokeObjectURL(objectUrlRef.current);
    },
    [],
  );

  const upload = async (file: File) => {
    const objectUrl = URL.createObjectURL(file);
    if (objectUrlRef.current) URL.revokeObjectURL(objectUrlRef.current);
    objectUrlRef.current = objectUrl;
    setPreview(objectUrl);
    setUploading(true);
    onUploadingChange?.(true);

    try {
      const body = new FormData();
      body.append("image", file);
      const response = await fetch("/api/upload", { method: "POST", body });
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

      onChange(result.url);
      setPreview(getImageSource(result.url));
      URL.revokeObjectURL(objectUrl);
      objectUrlRef.current = null;
      toast.success("Hero image uploaded");
    } catch (error) {
      URL.revokeObjectURL(objectUrl);
      objectUrlRef.current = null;
      setPreview(getImageSource(value));
      if (inputRef.current) inputRef.current.value = "";
      toast.error("Unable to upload hero image", {
        description: error instanceof Error ? error.message : "Please try again.",
      });
    } finally {
      setUploading(false);
      onUploadingChange?.(false);
    }
  };

  return (
    <div className="space-y-2">
      <Label htmlFor="editorial-hero-image">{label}</Label>
      <Input
        id="editorial-hero-image"
        ref={inputRef}
        type="file"
        accept="image/*"
        disabled={uploading}
        onChange={(event) => {
          const file = event.target.files?.[0];
          if (file) void upload(file);
        }}
      />
      <p className="text-sm text-muted-foreground">
        {uploading ? "Uploading image…" : "Choose an image file to upload."}
      </p>
      {preview ? (
        <Image
          src={preview}
          alt={`${label} preview`}
          width={640}
          height={360}
          unoptimized
          className="mt-3 aspect-video w-full max-w-md rounded-lg border object-cover"
        />
      ) : null}
    </div>
  );
}

export function EditorialItemEditor({
  title,
  items,
  onChange,
  withSource = false,
}: {
  title: string;
  items: EditorialItem[];
  onChange: (items: EditorialItem[]) => void;
  withSource?: boolean;
}) {
  const update = (index: number, patch: Partial<EditorialItem>) => {
    onChange(
      items.map((item, current) =>
        current === index ? { ...item, ...patch } : item,
      ),
    );
  };

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between gap-3">
        <Label>{title}</Label>
        <Button
          type="button"
          size="sm"
          variant="outline"
          onClick={() =>
            onChange([
              ...items,
              { title: "", description: "", ...(withSource ? { source: "" } : {}) },
            ])
          }
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
          <EditorialTextInput
            label={`${title} ${index + 1} title`}
            value={item.title}
            onChange={(value) => update(index, { title: value })}
            required
          />
          <EditorialTextArea
            label={`${title} ${index + 1} description`}
            value={item.description}
            onChange={(value) => update(index, { description: value })}
          />
          {withSource ? (
            <EditorialTextInput
              label={`${title} ${index + 1} source URL`}
              value={item.source ?? ""}
              onChange={(value) => update(index, { source: value })}
              placeholder="https://..."
            />
          ) : null}
        </div>
      ))}
    </div>
  );
}
