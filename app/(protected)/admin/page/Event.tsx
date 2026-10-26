"use client";

import { useEffect, useState, useTransition } from "react";
import { Loader2, Plus, Save, Trash2 } from "lucide-react";
import Image from "next/image";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { saveEventPageSettings, saveHomePageSettings } from "@/lib/actions/settings-action";
import type { SiteSettings } from "@/lib/generated/prisma";

function parseList(value: string | null | undefined, fallback: string[] = []) {
  if (!value) return fallback;

  const trimmed = value.trim();
  if (!trimmed) return fallback;

  try {
    const parsed = JSON.parse(trimmed);
    if (Array.isArray(parsed)) {
      return parsed.map((item) => String(item).trim()).filter(Boolean);
    }
  } catch {
    // fall through to comma-separated parsing
  }

  return trimmed.split(",").map((item) => item.trim()).filter(Boolean);
}

type CardItem = {
  title: string;
  summary: string;
};

type MetricItem = {
  key: string;
  value: string;
};


function getPreviewSrc(value: string | null | undefined) {
  if (!value) return null;

  const normalized = value.trim();
  if (!normalized) return null;

  if (
    normalized.startsWith("blob:") ||
    normalized.startsWith("/") ||
    normalized.startsWith("http://") ||
    normalized.startsWith("https://")
  ) {
    return normalized;
  }

  if (normalized.startsWith("uploads/")) {
    return `/${normalized}`;
  }

  return null;
}

export default function Event({ setting }: { setting?: SiteSettings }) {
  const [pending, startTransition] = useTransition();
  const [configuration, setConfiguration] = useState(setting);

  const [heroBackgroundImagePath, setHeroBackgroundImagePath] = useState<string | null>(
    "/api" + configuration?.eventHeroBackgroundImagePath as string
  );

  useEffect(() => {
    return () => {
      if (heroBackgroundImagePath?.startsWith("blob:")) {
        URL.revokeObjectURL(heroBackgroundImagePath);
      }
    };
  }, [heroBackgroundImagePath]);

  const onSubmit = async (formData: FormData) => {
    startTransition(async () => {
      try {
        const heroBackgroundImage = formData.get("eventHeroBackgroundImagePath");

        if (heroBackgroundImage instanceof File) {
          if (heroBackgroundImage.size > 0) {
            const uploadFormData = new FormData();
            uploadFormData.append("image", heroBackgroundImage);

            const fileUploadRes = await fetch("/api/upload", {
              method: "POST",
              body: uploadFormData,
            });

            const uploadData = await fileUploadRes.json();

            if (!fileUploadRes.ok) {
              throw new Error(uploadData?.message || "Hero media upload failed");
            }

            formData.set("eventHeroBackgroundImagePath", uploadData.url);
          } else {
            formData.delete("eventHeroBackgroundImagePath");
          }
        }

        const res = await saveEventPageSettings(formData);

        if (!res?.success) {
          toast.error("Error", {
            description: res?.message,
          });
          return;
        }

        const nextSetting = res.data as SiteSettings | undefined;

        setConfiguration(nextSetting);

        setHeroBackgroundImagePath(
          getPreviewSrc(nextSetting?.eventHeroBackgroundImagePath),
        );

        toast.success("Event page content saved successfully");
      } catch (error) {
        toast.error("Save failed", {
          description:
            error instanceof Error ? error.message : "Unexpected error",
        });
      }
    });
  };

  return (
    <div className="space-y-4">
      <Card className="border-slate-200/80 shadow-sm">
        <CardHeader className="border-b border-slate-200/70 py-4">
          <CardTitle className="text-base font-semibold">
            Event
          </CardTitle>
        </CardHeader>
        <CardContent className="p-5">
          <form action={onSubmit} className="space-y-5">

            <div className="grid gap-4 md:grid-cols-2">
              <Field
                label="Event Hero Tagline"
                id="eventHeroTagline"
                defaultValue={configuration?.eventHeroTagline}
                placeholder="Event Hero Tagline"
              />
              <Field
                label="Event Hero Title"
                id="eventHeroTitle"
                defaultValue={configuration?.eventHeroTitle}
                placeholder="A focused operating model built for scale, quality, and steady delivery."
              />

              <div className="space-y-3">
                <Label htmlFor="eventHeroBackgroundImagePath">Event Hero Background Media</Label>
                <Input
                  id="eventHeroBackgroundImagePath"
                  name="eventHeroBackgroundImagePath"
                  type="file"
                  accept="image/*"
                  onChange={(event) => {
                    const file = event.target.files?.[0];

                    if (!file) {
                      setHeroBackgroundImagePath(
                        getPreviewSrc(configuration?.eventHeroBackgroundImagePath),
                      );
                      return;
                    }

                    if (!file.type.startsWith("image/")) {
                      toast.error("Please select an image file");
                      event.currentTarget.value = "";
                      return;
                    }

                    const previewUrl = URL.createObjectURL(file);
                    setHeroBackgroundImagePath(previewUrl);
                  }}
                  className="h-10 rounded-xl"
                />

                {(() => {
                  const src =
                    heroBackgroundImagePath ||
                    getPreviewSrc(configuration?.eventHeroBackgroundImagePath) ||
                    "";

                  if (!src) return null;

                  return (
                    <div className="relative h-[220px] overflow-hidden rounded-2xl border border-slate-200 bg-slate-50">
                      <Image
                        src={src}
                        alt="Event Hero Background Preview"
                        fill
                        className="object-contain object-center p-3"
                        sizes="(max-width: 768px) 100vw, 600px"
                        unoptimized={src.startsWith("blob:")}
                      />
                    </div>
                  );
                })()}
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="eventHeroDescription">Event Hero Description</Label>
              <Textarea
                id="eventHeroDescription"
                name="eventHeroDescription"
                className="min-h-[120px] rounded-xl"
                defaultValue={configuration?.eventHeroDescription ?? ""}
                placeholder="We combine back-office operations, IT consulting, and support services..."
              />
            </div>

            <hr />

            <div className="grid gap-4 md:grid-cols-2">
              <Field
                label="Event Upcoming Tagline"
                id="eventUpcommingTagline"
                defaultValue={configuration?.eventUpcommingTagline}
                placeholder="Event Upcoming Tagline"
              />
              <Field
                label="Event Upcoming Title"
                id="eventUpcommingTitle"
                defaultValue={configuration?.eventUpcommingTitle}
                placeholder="A focused operating model built for scale, quality, and steady delivery."
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="eventUpcommingDescription">Event Upcoming Description</Label>
              <Textarea
                id="eventUpcommingDescription"
                name="eventUpcommingDescription"
                className="min-h-[120px] rounded-xl"
                defaultValue={configuration?.eventUpcommingDescription ?? ""}
                placeholder="We combine back-office operations, IT consulting, and support services..."
              />
            </div>

            <hr />
            <div className="grid gap-4 md:grid-cols-2">
              <Field
                label="Event Gallery Tagline"
                id="eventGalleryTagline"
                defaultValue={configuration?.eventGalleryTagline}
              />
              <Field
                label="Event Gallery Title"
                id="eventGalleryTitle"
                defaultValue={configuration?.eventGalleryTitle}
                placeholder="Event Gallery Title"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="eventGalleryDescription">Event Gallery Description</Label>
              <Textarea
                id="eventGalleryDescription"
                name="eventGalleryDescription"
                className="min-h-[120px] rounded-xl"
                defaultValue={configuration?.eventGalleryDescription ?? ""}
                placeholder="We combine back-office operations, IT consulting, and support services..."
              />
            </div>


            <hr />

            <Field
              label="Event Contact Title"
              id="eventContactTitle"
              defaultValue={configuration?.eventContactTitle}
              placeholder="A focused operating model built for scale, quality, and steady delivery."
            />

            <div className="space-y-2">
              <Label htmlFor="eventContactDescription">Event Contact Description</Label>
              <Textarea
                id="eventContactDescription"
                name="eventContactDescription"
                className="min-h-[120px] rounded-xl"
                defaultValue={configuration?.eventContactDescription ?? ""}
                placeholder="We combine back-office operations, IT consulting, and support services..."
              />
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
    </div>
  );
}

function Field({
  label,
  id,
  defaultValue,
  placeholder,
}: {
  label: string;
  id: string;
  defaultValue?: string | null;
  placeholder?: string;
}) {
  return (
    <div className="space-y-2">
      <Label htmlFor={id}>{label}</Label>
      <Input
        id={id}
        name={id}
        defaultValue={defaultValue ?? ""}
        placeholder={placeholder}
        className="h-10 rounded-xl"
      />
    </div>
  );
}







