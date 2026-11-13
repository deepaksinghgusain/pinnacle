"use client";

import Image from "next/image";
import { useEffect, useId, useRef, useState } from "react";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

function getImageSource(value: string) {
  const source = value.trim();
  if (/^\/?uploads\//i.test(source)) {
    return `/api/uploads/${source.replace(/^\/?uploads\//i, "")}`;
  }
  if (/^(https?:\/\/|\/)/i.test(source)) return source;
  return "";
}

type ImageUploadFieldProps = {
  label?: string;
  value?: string | null;
  name?: string;
  onChange?: (value: string) => void;
  onUploadingChange?: (uploading: boolean) => void;
};

export default function ImageUploadField({
  label = "Hero image",
  value = "",
  name,
  onChange,
  onUploadingChange,
}: ImageUploadFieldProps) {
  const generatedId = useId();
  const resolvedValue = value ?? "";
  const [uploadedPath, setUploadedPath] = useState(resolvedValue);
  const imagePath = onChange ? resolvedValue : uploadedPath;
  const [previewOverride, setPreviewOverride] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const objectUrlRef = useRef<string | null>(null);
  const preview = previewOverride ?? getImageSource(imagePath);

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
    setPreviewOverride(objectUrl);
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

      setUploadedPath(result.url);
      onChange?.(result.url);
      setPreviewOverride(null);
      URL.revokeObjectURL(objectUrl);
      objectUrlRef.current = null;
      toast.success("Image uploaded");
    } catch (error) {
      URL.revokeObjectURL(objectUrl);
      objectUrlRef.current = null;
      setPreviewOverride(null);
      if (inputRef.current) inputRef.current.value = "";
      toast.error("Unable to upload image", {
        description: error instanceof Error ? error.message : "Please try again.",
      });
    } finally {
      setUploading(false);
      onUploadingChange?.(false);
    }
  };

  return (
    <div className="space-y-2">
      <Label htmlFor={generatedId}>{label}</Label>
      <Input
        id={generatedId}
        ref={inputRef}
        type="file"
        accept="image/*"
        disabled={uploading}
        onChange={(event) => {
          const file = event.target.files?.[0];
          if (file) void upload(file);
        }}
      />
      {name ? <input type="hidden" name={name} value={imagePath} /> : null}
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
