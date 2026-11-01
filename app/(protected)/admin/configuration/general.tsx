"use client";

import { useEffect, useState, useTransition, type ChangeEvent } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { Loader2, Save } from "lucide-react";
import { saveGeneralSettings } from "@/lib/actions/settings-action";
import { toast } from "sonner";
import Image from "next/image";
import type { SiteSettings } from "@/lib/generated/prisma";

function getPreviewSrc(value: string | null | undefined) {
  if (!value) {
    return null;
  }

  const normalized = value.trim();

  if (!normalized) {
    return null;
  }

  if (
    normalized.startsWith("blob:") ||
    normalized.startsWith("http://") ||
    normalized.startsWith("https://") ||
    normalized.startsWith("/api/")
  ) {
    return normalized;
  }

  if (normalized.startsWith("/uploads/")) {
    return `/api${normalized}`;
  }

  if (normalized.startsWith("uploads/")) {
    return `/api/${normalized}`;
  }

  if (normalized.startsWith("/")) {
    return normalized;
  }

  return null;
}

export default function GeneralComponent({
  setting,
}: {
  setting?: Partial<SiteSettings>;
}) {
  const [pending, startTransition] = useTransition();
  const [configuration, setConfiguration] = useState(setting);
  const [headerLogoPreview, setHeaderLogoPreview] = useState<string | null>(
    getPreviewSrc(
      typeof setting?.headerLogoPath === "string"
        ? setting.headerLogoPath
        : typeof setting?.logoPath === "string"
          ? setting.logoPath
          : null,
    ),
  );
  const [footerLogoPreview, setFooterLogoPreview] = useState<string | null>(
    getPreviewSrc(
      typeof setting?.footerLogoPath === "string"
        ? setting.footerLogoPath
        : typeof setting?.logoPath === "string"
          ? setting.logoPath
          : null,
    ),
  );
  const [faviconPreview, setFaviconPreview] = useState<string | null>(
    getPreviewSrc(typeof setting?.faviconPath === "string" ? setting.faviconPath : null),
  );

  useEffect(() => {
    return () => {
      if (headerLogoPreview?.startsWith("blob:")) {
        URL.revokeObjectURL(headerLogoPreview);
      }
      if (footerLogoPreview?.startsWith("blob:")) {
        URL.revokeObjectURL(footerLogoPreview);
      }
      if (faviconPreview?.startsWith("blob:")) {
        URL.revokeObjectURL(faviconPreview);
      }
    };
  }, [headerLogoPreview, footerLogoPreview, faviconPreview]);

  const handleFilePreview = (
    event: ChangeEvent<HTMLInputElement>,
    type: "headerLogo" | "footerLogo" | "favicon",
  ) => {
    const file = event.target.files?.[0];

    if (!file) {
      if (type === "headerLogo") {
        setHeaderLogoPreview(
          getPreviewSrc(
            typeof configuration?.headerLogoPath === "string"
              ? configuration.headerLogoPath
              : typeof configuration?.logoPath === "string"
                ? configuration.logoPath
                : null,
          ),
        );
      } else if (type === "footerLogo") {
        setFooterLogoPreview(
          getPreviewSrc(
            typeof configuration?.footerLogoPath === "string"
              ? configuration.footerLogoPath
              : typeof configuration?.logoPath === "string"
                ? configuration.logoPath
                : null,
          ),
        );
      } else {
        setFaviconPreview(
          getPreviewSrc(typeof configuration?.faviconPath === "string" ? configuration.faviconPath : null),
        );
      }
      return;
    }

    if (!file.type.startsWith("image/")) {
      toast.error("Please select an image file");
      return;
    }

    const previewUrl = URL.createObjectURL(file);
    if (type === "headerLogo") {
      setHeaderLogoPreview(previewUrl);
    } else if (type === "footerLogo") {
      setFooterLogoPreview(previewUrl);
    } else {
      setFaviconPreview(previewUrl);
    }
  };

  const onSubmit = async (formData: FormData) => {
    startTransition(async () => {
      try {
        const headerLogoFile = formData.get("headerLogoPath");
        const footerLogoFile = formData.get("footerLogoPath");
        const faviconFile = formData.get("faviconPath");

        const uploadImage = async (file: File, field: string) => {
          const uploadFormData = new FormData();
          uploadFormData.append("image", file);

          const fileUploadRes = await fetch("/api/upload", {
            method: "POST",
            body: uploadFormData,
          });

          const uploadData = await fileUploadRes.json();

          if (!fileUploadRes.ok) {
            throw new Error(uploadData?.message || "Image upload failed");
          }

          formData.set(field, uploadData.url);
        };

        if (headerLogoFile instanceof File && headerLogoFile.size > 0 && headerLogoFile.name !== "") {
          await uploadImage(headerLogoFile, "headerLogoPath");
        } else {
          formData.set(
            "headerLogoPath",
            configuration?.headerLogoPath || configuration?.logoPath || "",
          );
        }

        if (footerLogoFile instanceof File && footerLogoFile.size > 0 && footerLogoFile.name !== "") {
          await uploadImage(footerLogoFile, "footerLogoPath");
        } else {
          formData.set(
            "footerLogoPath",
            configuration?.footerLogoPath || configuration?.logoPath || "",
          );
        }

        if (faviconFile instanceof File && faviconFile.size > 0 && faviconFile.name !== "") {
          await uploadImage(faviconFile, "faviconPath");
        }else {
          formData.set("faviconPath", configuration?.faviconPath || "");
        }

        const res = await saveGeneralSettings(formData);

        if (!res?.success) {
          toast.error("Error", {
            description: res?.message,
          });
          return;
        }

        toast.success("Settings saved successfully");

        const savedSettings = res.data as Partial<SiteSettings>;
        setConfiguration(savedSettings);
        setHeaderLogoPreview(
          getPreviewSrc(savedSettings.headerLogoPath || savedSettings.logoPath),
        );
        setFooterLogoPreview(
          getPreviewSrc(savedSettings.footerLogoPath || savedSettings.logoPath),
        );
        setFaviconPreview(getPreviewSrc(savedSettings.faviconPath));
      } catch (error) {
        toast.error("Upload failed", {
          description:
            error instanceof Error ? error.message : "Unexpected error",
        });
      }
    });
  };

  return (
    <Card className="border-slate-200/80 shadow-sm">
      <CardHeader className="border-b border-slate-200/70 py-4">
        <CardTitle className="text-base font-semibold">
          General settings
        </CardTitle>
      </CardHeader>
      <CardContent className="p-5">
        <form action={onSubmit} className="space-y-5">
          <div className="grid gap-4 md:grid-cols-2">
            <Field
              label="Site name"
              id="siteName"
              defaultValue={configuration?.siteName}
            />
            <Field
              label="Primary email"
              id="primaryEmail"
              type="email"
              defaultValue={configuration?.primaryEmail}
            />
            <Field
              label="Primary phone"
              id="primaryPhone"
              type="tel"
              defaultValue={configuration?.primaryPhone}
            />
            <Field
              label="Website URL"
              id="websiteUrl"
              defaultValue={configuration?.websiteUrl}
            />
            <Field
              label="Meta title"
              id="metaTitle"
              defaultValue={configuration?.metaTitle}
            />
            <TextAreaField
              label="Meta description"
              id="metaDescription"
              defaultValue={configuration?.metaDescription}
            />
            <TextAreaField
              label="Meta keywords"
              id="metaKeywords"
              defaultValue={configuration?.metaKeywords}
            />
          </div>

          <Separator />

          <div className="grid gap-4 md:grid-cols-2">
            <Field
              label="Office address"
              id="officeAddress"
              defaultValue={configuration?.officeAddress}
            />
            <Field
              label="Office hours"
              id="officeHours"
              defaultValue={configuration?.officeHours}
            />
            <Field
              label="Gst Number"
              id="gstNumber"
              defaultValue={configuration?.gstNumber}
            />
            <Field
              label="Cin Number"
              id="cinNumber"
              defaultValue={configuration?.cinNumber}
            />
            <div className="space-y-3">
              <Field
                label="Header logo"
                id="headerLogoPath"
                type="file"
                onChange={(event) => handleFilePreview(event, "headerLogo")}
              />
              {(() => {
                const src = getPreviewSrc(
                  headerLogoPreview ||
                    (typeof configuration?.headerLogoPath === "string"
                      ? configuration.headerLogoPath
                      : typeof configuration?.logoPath === "string"
                        ? configuration.logoPath
                        : null),
                );

                return src ? (
                  <Image
                    src={src}
                    alt="Header logo preview"
                    width={160}
                    height={64}
                    className="h-16 w-auto max-w-48 rounded-lg border border-slate-200 object-contain"
                  />
                ) : null;
              })()}
            </div>
            <div className="space-y-3">
              <Field
                label="Footer logo"
                id="footerLogoPath"
                type="file"
                onChange={(event) => handleFilePreview(event, "footerLogo")}
              />
              {(() => {
                const src = getPreviewSrc(
                  footerLogoPreview ||
                    (typeof configuration?.footerLogoPath === "string"
                      ? configuration.footerLogoPath
                      : typeof configuration?.logoPath === "string"
                        ? configuration.logoPath
                        : null),
                );

                return src ? (
                  <Image
                    src={src}
                    alt="Footer logo preview"
                    width={160}
                    height={64}
                    className="h-16 w-auto max-w-48 rounded-lg border border-slate-200 object-contain"
                  />
                ) : null;
              })()}
            </div>
            <div className="space-y-3">
              <Field
                label="Favicon path"
                id="faviconPath"
                type="file"
                onChange={(event) => handleFilePreview(event, "favicon")}
              />
              {(() => {
                const src = getPreviewSrc(
                  faviconPreview || (typeof configuration?.faviconPath === "string" ? configuration.faviconPath : null),
                );

                return src ? (
                  <Image
                    src={src}
                    alt="Favicon preview"
                    width={64}
                    height={64}
                    className="h-16 w-16 rounded-lg border border-slate-200 object-cover"
                  />
                ) : null;
              })()}
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <label className="flex items-center gap-3 rounded-xl border border-slate-200 px-4 py-3">
              <Checkbox
                id="showPhone"
                name="showPhone"
                defaultChecked={configuration?.showPhone}
              />
              <span className="text-sm text-slate-700">
                Show phone in header
              </span>
            </label>
            <label className="flex items-center gap-3 rounded-xl border border-slate-200 px-4 py-3">
              <Checkbox
                id="showEmail"
                name="showEmail"
                defaultChecked={configuration?.showEmail}
              />
              <span className="text-sm text-slate-700">
                Show email in footer
              </span>
            </label>
          </div>

          <div className="flex justify-end">
            <Button
              type="submit"
              className="rounded-full px-5"
              disabled={pending}
            >
              {pending ? (
                <Loader2 className="mr-2 size-4 animate-spin" />
              ) : (
                <Save className="mr-2 size-4" />
              )}
              Save
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}

function Field({
  label,
  id,
  type = "text",
  defaultValue,
  onChange,
}: {
  label: string;
  id: string;
  type?: string;
  defaultValue?: string | null;
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
}) {
  return (
    <div className="space-y-2">
      <Label htmlFor={id}>{label}</Label>
      <Input
        id={id}
        name={id}
        type={type}
        defaultValue={defaultValue ?? ""}
        onChange={onChange}
        className="h-10 rounded-xl"
      />
    </div>
  );
}

function TextAreaField({
  label,
  id,
  defaultValue,
  onChange,
  rows = 5,
}: {
  label: string;
  id: string;
  defaultValue?: string | null;
  onChange?: (event: ChangeEvent<HTMLTextAreaElement>) => void;
  rows?: number;
}) {
  return (
    <div className="space-y-2  col-span-2">
      <Label htmlFor={id}>{label}</Label>
      <Textarea
        id={id}
        name={id}
        defaultValue={defaultValue ?? ""}
        onChange={onChange}
        rows={rows}
        className="rounded-xl h-[100px]"
      />
    </div>
  );
}
