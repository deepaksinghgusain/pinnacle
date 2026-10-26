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
import { saveHomePageSettings } from "@/lib/actions/settings-action";
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

const metricFallbacks: MetricItem[] = [
  { key: "Team Members", value: "48" },
  { key: "Happy Customers", value: "120" },
  { key: "Operational Support", value: "24" },
];

function parseCardList(
  value: string | null | undefined,
  fallback: CardItem[],
) {
  if (!value) return fallback;

  const trimmed = value.trim();
  if (!trimmed) return fallback;

  try {
    const parsed = JSON.parse(trimmed);
    if (Array.isArray(parsed)) {
      return parsed
        .map((item) => ({
          title: String(item?.title ?? "").trim(),
          summary: String(item?.summary ?? item?.content ?? "").trim(),
        }))
        .filter((item) => item.title || item.summary);
    }
  } catch {
    // fall through
  }

  return fallback;
}

function parseMetricList(
  value: string | null | undefined,
  fallback: MetricItem[],
) {
  if (!value) return fallback;

  const trimmed = value.trim();
  if (!trimmed) return fallback;

  try {
    const parsed = JSON.parse(trimmed);
    if (Array.isArray(parsed)) {
      return parsed
        .map((item) => ({
          key: String(item?.key ?? item?.title ?? item?.label ?? "").trim(),
          value: item?.value,
        }))
        .filter((item) => item.key && item.value);
    }
  } catch {
    // fall through
  }

  return fallback;
}

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

const videoExtensions = new Set(["mp4", "webm", "ogg", "mov", "avi", "mkv"]);

function isVideoSource(src: string, mimeType?: string | null) {
  if (mimeType) return mimeType.startsWith("video/");

  const extension = src.split("?")[0].split(".").pop()?.toLowerCase();
  return videoExtensions.has(extension ?? "");
}

export default function Home({ setting }: { setting?: SiteSettings }) {
  const [pending, startTransition] = useTransition();
  const [configuration, setConfiguration] = useState(setting);
  const [trustMetrics, setTrustMetrics] = useState<MetricItem[]>(
    () =>
      parseMetricList(configuration?.heroTrustTags, metricFallbacks),
  );
  const [aboutButtons, setAboutButtons] = useState<string[]>(
    () =>
      parseList(configuration?.aboutButtons, [
        "Transition",
        "Operations",
        "Training",
        "Scalability",
      ]),
  );
  const [deliveryModelItems, setDeliveryModelItems] = useState<string[]>(
    () =>
      parseList(configuration?.deliveryModelItems, [
        "Founded in 2024",
        "Supporting global clients",
        "Backoffice Operations with IT Consulting & Support",
        "Specialized Transition team",
        "Specialized operational support teams",
        "Specialized Training & Development team",
        "Trained agents available as factory model",
        "Focus on quality and scalability",
      ]),
  );
  const [whyCards, setWhyCards] = useState<CardItem[]>(
    () =>
      parseCardList(configuration?.whyClientsCards, [
        {
          title: "Scalable Teams",
          summary: "Flexible delivery capacity that grows with your needs.",
        },
        {
          title: "Cost Effective Delivery",
          summary: "Lean operations with a clear focus on value and efficiency.",
        },
        {
          title: "Structured Processes",
          summary: "Consistent execution built around repeatable workflows.",
        },
        {
          title: "Management Visibility & Reporting",
          summary: "Clear reporting and oversight across daily operations.",
        },
      ]),
  );
  const [globalDeliveryImagePreview, setGlobalDeliveryImagePreview] = useState<string | null>(
    getPreviewSrc(configuration?.globalDeliveryImagePath),
  );

  const [heroBackgroundImagePath, setHeroBackgroundImagePath] = useState<string | null>(
    getPreviewSrc(configuration?.heroBackgroundImagePath),
  );
  const [heroBackgroundMediaType, setHeroBackgroundMediaType] = useState<
    string | null
  >(null);

  useEffect(() => {
    return () => {
      if (globalDeliveryImagePreview?.startsWith("blob:")) {
        URL.revokeObjectURL(globalDeliveryImagePreview);
      }
    };
  }, [globalDeliveryImagePreview]);

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
        const globalDeliveryImage = formData.get("globalDeliveryImagePath");
        const heroBackgroundImage = formData.get("heroBackgroundImagePath");

        if (globalDeliveryImage instanceof File) {
          if (globalDeliveryImage.size > 0) {
            const uploadFormData = new FormData();
            uploadFormData.append("image", globalDeliveryImage);

            const fileUploadRes = await fetch("/api/upload", {
              method: "POST",
              body: uploadFormData,
            });

            const uploadData = await fileUploadRes.json();

            if (!fileUploadRes.ok) {
              throw new Error(uploadData?.message || "Image upload failed");
            }

            formData.set("globalDeliveryImagePath", uploadData.url);
          } else {
            formData.delete("globalDeliveryImagePath");
          }
        }

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

            formData.set("heroBackgroundImagePath", uploadData.url);
          } else {
            formData.delete("heroBackgroundImagePath");
          }
        }

        const res = await saveHomePageSettings(formData);

        if (!res?.success) {
          toast.error("Error", {
            description: res?.message,
          });
          return;
        }

        const nextSetting = res.data as SiteSettings | undefined;

        setConfiguration(nextSetting);
        setTrustMetrics(parseMetricList(nextSetting?.heroTrustTags, metricFallbacks));
        setAboutButtons(
          parseList(nextSetting?.aboutButtons, [
            "Transition",
            "Operations",
            "Training",
            "Scalability",
          ]),
        );
        setDeliveryModelItems(
          parseList(nextSetting?.deliveryModelItems, [
            "Founded in 2024",
            "Supporting global clients",
            "Backoffice Operations with IT Consulting & Support",
            "Specialized Transition team",
            "Specialized operational support teams",
            "Specialized Training & Development team",
            "Trained agents available as factory model",
            "Focus on quality and scalability",
          ]),
        );
        setWhyCards(
          parseCardList(nextSetting?.whyClientsCards, [
            {
              title: "Scalable Teams",
              summary: "Flexible delivery capacity that grows with your needs.",
            },
            {
              title: "Cost Effective Delivery",
              summary: "Lean operations with a clear focus on value and efficiency.",
            },
            {
              title: "Structured Processes",
              summary: "Consistent execution built around repeatable workflows.",
            },
            {
              title: "Management Visibility & Reporting",
              summary: "Clear reporting and oversight across daily operations.",
            },
          ]),
        );
        setGlobalDeliveryImagePreview(
          getPreviewSrc(nextSetting?.globalDeliveryImagePath),
        );

        setHeroBackgroundImagePath(
          getPreviewSrc(nextSetting?.heroBackgroundImagePath),
        );
        setHeroBackgroundMediaType(null);

        toast.success("Homepage content saved successfully");
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
            Homepage Hero Banner
          </CardTitle>
        </CardHeader>
        <CardContent className="p-5">
          <form action={onSubmit} className="space-y-5">

            <div className="grid gap-4 md:grid-cols-2">
              <Field
                label="Hero Tagline"
                id="heroTagline"
                defaultValue={configuration?.heroTagline}
                placeholder="Hero Tagline"
              />
              <Field
                label="Hero Title"
                id="heroTitle"
                defaultValue={configuration?.heroTitle}
                placeholder="A focused operating model built for scale, quality, and steady delivery."
              />

              <div className="space-y-3">
                <Label htmlFor="heroBackgroundImagePath">Hero Background Media</Label>
                <Input
                  id="heroBackgroundImagePath"
                  name="heroBackgroundImagePath"
                  type="file"
                  accept="image/*,video/mp4,video/webm,video/ogg,video/quicktime,video/x-msvideo,video/x-matroska"
                  onChange={(event) => {
                    const file = event.target.files?.[0];

                    if (!file) {
                      setHeroBackgroundImagePath(
                        getPreviewSrc(configuration?.heroBackgroundImagePath),
                      );
                      setHeroBackgroundMediaType(null);
                      return;
                    }

                    if (!file.type.startsWith("image/") && !file.type.startsWith("video/")) {
                      toast.error("Please select an image or video file");
                      event.currentTarget.value = "";
                      return;
                    }

                    const previewUrl = URL.createObjectURL(file);
                    setHeroBackgroundImagePath(previewUrl);
                    setHeroBackgroundMediaType(file.type);
                  }}
                  className="h-10 rounded-xl"
                />

                {(() => {
                  const src =
                    heroBackgroundImagePath ||
                    getPreviewSrc(configuration?.heroBackgroundImagePath) ||
                    "";

                  if (!src) return null;

                  const isVideo = isVideoSource(src, heroBackgroundMediaType);

                  return (
                    <div className="relative h-[220px] overflow-hidden rounded-2xl border border-slate-200 bg-slate-50">
                      {isVideo ? (
                        <video
                          src={src}
                          controls
                          playsInline
                          preload="metadata"
                          className="h-full w-full object-contain object-center p-3"
                        >
                          Your browser does not support the video tag.
                        </video>
                      ) : (
                        <Image
                          src={src}
                          alt="Hero Background Preview"
                          fill
                          className="object-contain object-center p-3"
                          sizes="(max-width: 768px) 100vw, 600px"
                          unoptimized={src.startsWith("blob:")}
                        />
                      )}
                    </div>
                  );
                })()}
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="heroDescription">Hero Description</Label>
              <Textarea
                id="heroDescription"
                name="heroDescription"
                className="min-h-[120px] rounded-xl"
                defaultValue={configuration?.heroDescription ?? ""}
                placeholder="We combine back-office operations, IT consulting, and support services..."
              />
            </div>

            <MetricEditor
              label="Trust Metrics"
              items={trustMetrics}
              onChange={setTrustMetrics}
            />

            <input
              type="hidden"
              name="trustMetrics"
              value={JSON.stringify(trustMetrics)}
            />

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
                Save Hero Banner
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>

      <Card className="border-slate-200/80 shadow-sm">
        <CardHeader className="border-b border-slate-200/70 py-4">
          <CardTitle className="text-base font-semibold">
            About Section
          </CardTitle>
        </CardHeader>
        <CardContent className="p-5">
          <form action={onSubmit} className="space-y-5">
            <input
              type="hidden"
              name="siteName"
              value={configuration?.siteName ?? "Pinnacle"}
            />
            <input type="hidden" name="legalName" value={configuration?.legalName ?? ""} />

            <div className="grid gap-4 md:grid-cols-2">
              <Field
                label="About Tagline"
                id="aboutTagline"
                defaultValue={configuration?.aboutTagline}
                placeholder="About Pinnacle"
              />
              <Field
                label="About Title"
                id="aboutTitle"
                defaultValue={configuration?.aboutTitle}
                placeholder="A focused operating model built for scale, quality, and steady delivery."
              />

            </div>

            <div className="space-y-2">
              <Label htmlFor="aboutDescription">About Description</Label>
              <Textarea
                id="aboutDescription"
                name="aboutDescription"
                className="min-h-[120px] rounded-xl"
                defaultValue={configuration?.aboutDescription ?? ""}
                placeholder="We combine back-office operations, IT consulting, and support services..."
              />
            </div>

            <ListEditor
              label="Transition / Operations Buttons"
              name="aboutButtons"
              items={aboutButtons}
              onChange={setAboutButtons}
              placeholder="Transition"
            />

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
                Save About Section
              </Button>
            </div>

          </form>
        </CardContent>
      </Card>

      <Card className="border-slate-200/80 shadow-sm">
        <CardHeader className="border-b border-slate-200/70 py-4">
          <CardTitle className="text-base font-semibold">
            Our Delivery Model
          </CardTitle>
        </CardHeader>
        <CardContent className="p-5">
          <form action={onSubmit} className="space-y-5">
            <input
              type="hidden"
              name="siteName"
              value={configuration?.siteName ?? "Pinnacle"}
            />
            <input type="hidden" name="legalName" value={configuration?.legalName ?? ""} />
            <input type="hidden" name="aboutTagline" value={configuration?.aboutTagline ?? ""} />
            <input type="hidden" name="aboutTitle" value={configuration?.aboutTitle ?? ""} />
            <input type="hidden" name="aboutDescription" value={configuration?.aboutDescription ?? ""} />
            {aboutButtons.map((item, index) => (
              <input key={`${item}-${index}`} type="hidden" name="aboutButtons" value={item} />
            ))}
            <input type="hidden" name="whyClientsTagline" value={configuration?.whyClientsTagline ?? ""} />
            <input type="hidden" name="whyClientsTitle" value={configuration?.whyClientsTitle ?? ""} />
            <input type="hidden" name="whyClientsDescription" value={configuration?.whyClientsDescription ?? ""} />
            <input type="hidden" name="whyClientsCards" value={configuration?.whyClientsCards ?? ""} />
            <input type="hidden" name="globalDeliveryTagline" value={configuration?.globalDeliveryTagline ?? ""} />
            <input type="hidden" name="globalDeliveryTitle" value={configuration?.globalDeliveryTitle ?? ""} />
            <input type="hidden" name="globalDeliveryDescription" value={configuration?.globalDeliveryDescription ?? ""} />

            <div className="grid gap-4 md:grid-cols-2">
              <Field
                label="Delivery Title"
                id="deliveryModelTitle"
                defaultValue={configuration?.deliveryModelTitle}
                placeholder="DELIVERY MODEL"
              />
            </div>

            <ListEditor
              label="Delivery Rows"
              name="deliveryModelItems"
              items={deliveryModelItems}
              onChange={setDeliveryModelItems}
              placeholder="Founded in 2024"
            />

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
                Save Delivery Model
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>

      <Card className="border-slate-200/80 shadow-sm">
        <CardHeader className="border-b border-slate-200/70 py-4">
          <CardTitle className="text-base font-semibold">
            Why Clients Choose Us
          </CardTitle>
        </CardHeader>
        <CardContent className="p-5">
          <form action={onSubmit} className="space-y-5">
            <input
              type="hidden"
              name="siteName"
              value={configuration?.siteName ?? "Pinnacle"}
            />
            <input type="hidden" name="legalName" value={configuration?.legalName ?? ""} />
            <input type="hidden" name="aboutTagline" value={configuration?.aboutTagline ?? ""} />
            <input type="hidden" name="aboutTitle" value={configuration?.aboutTitle ?? ""} />
            <input type="hidden" name="aboutDescription" value={configuration?.aboutDescription ?? ""} />
            {aboutButtons.map((item, index) => (
              <input key={`${item}-${index}`} type="hidden" name="aboutButtons" value={item} />
            ))}
            <input type="hidden" name="deliveryModelTitle" value={configuration?.deliveryModelTitle ?? ""} />
            {deliveryModelItems.map((item, index) => (
              <input key={`${item}-${index}`} type="hidden" name="deliveryModelItems" value={item} />
            ))}

            <div className="grid gap-4 md:grid-cols-2">
              <Field
                label="Section Tagline"
                id="whyClientsTagline"
                defaultValue={configuration?.whyClientsTagline}
                placeholder="Why Clients Choose Us"
              />
              <Field
                label="Section Title"
                id="whyClientsTitle"
                defaultValue={configuration?.whyClientsTitle}
                placeholder="Built to scale with clarity, control, and confidence."
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="whyClientsDescription">Section Description</Label>
              <Textarea
                id="whyClientsDescription"
                name="whyClientsDescription"
                className="min-h-[120px] rounded-xl"
                defaultValue={configuration?.whyClientsDescription ?? ""}
                placeholder="Our delivery model gives clients flexible teams..."
              />
            </div>

            <CardListEditor
              label="Cards"
              name="whyClientsCards"
              items={whyCards}
              onChange={setWhyCards}
            />

            <input
              type="hidden"
              name="whyClientsCards"
              value={JSON.stringify(whyCards)}
            />

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
                Save Why Clients
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>

      <Card className="border-slate-200/80 shadow-sm">
        <CardHeader className="border-b border-slate-200/70 py-4">
          <CardTitle className="text-base font-semibold">
            Our Global Delivery Model
          </CardTitle>
        </CardHeader>
        <CardContent className="p-5">
          <form action={onSubmit} className="space-y-5">
            <input
              type="hidden"
              name="siteName"
              value={configuration?.siteName ?? "Pinnacle"}
            />

            <div className="grid gap-4 md:grid-cols-2">
              <Field
                label="Model Tagline"
                id="globalDeliveryTagline"
                defaultValue={configuration?.globalDeliveryTagline}
                placeholder="OUR GLOBAL DELIVERY MODEL"
              />
              <Field
                label="Model Title"
                id="globalDeliveryTitle"
                defaultValue={configuration?.globalDeliveryTitle}
                placeholder="A simple, visual journey from intake to continuous improvement."
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="globalDeliveryDescription">Model Content</Label>
              <Textarea
                id="globalDeliveryDescription"
                name="globalDeliveryDescription"
                className="min-h-[120px] rounded-xl"
                defaultValue={configuration?.globalDeliveryDescription ?? ""}
                placeholder="This flowchart maps the exact delivery handoff..."
              />
            </div>

            <div className="space-y-3">
              <Label htmlFor="globalDeliveryImagePath">Model Image</Label>
              <Input
                id="globalDeliveryImagePath"
                name="globalDeliveryImagePath"
                type="file"
                accept="image/*"
                onChange={(event) => {
                  const file = event.target.files?.[0];

                  if (!file) {
                    setGlobalDeliveryImagePreview(
                      getPreviewSrc(configuration?.globalDeliveryImagePath),
                    );
                    return;
                  }

                  if (!file.type.startsWith("image/")) {
                    toast.error("Please select an image file");
                    return;
                  }

                  const previewUrl = URL.createObjectURL(file);
                  setGlobalDeliveryImagePreview(previewUrl);
                }}
                className="h-10 rounded-xl"
              />

              {(() => {
                const src =
                  globalDeliveryImagePreview ||
                  getPreviewSrc(configuration?.globalDeliveryImagePath) ||
                  "/uploads/12b66e57-bc7f-48bb-bbf8-25fd3e07e3ef.jpg";

                return (
                  <div className="relative h-[220px] overflow-hidden rounded-2xl border border-slate-200 bg-slate-50">
                    <Image
                      src={"/api" + src}
                      alt="Global delivery model preview"
                      fill
                      className="object-contain object-center p-3"
                      sizes="(max-width: 768px) 100vw, 600px"
                    />
                  </div>
                );
              })()}
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
                Save Global Delivery Model
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

function MetricEditor({
  label,
  items,
  onChange,
}: {
  label: string;
  items: MetricItem[];
  onChange: (items: MetricItem[]) => void;
}) {
  const updateItem = (index: number, key: keyof MetricItem, value: string) => {
    const next = [...items];
    next[index] = {
      ...next[index],
      [key]: key === "value" ? value || "" : value,
    };
    onChange(next);
  };

  const addItem = () => {
    onChange([...items, { key: "", value: "" }]);
  };

  const removeItem = (index: number) => {
    const next = items.filter((_, itemIndex) => itemIndex !== index);
    onChange(next.length ? next : [{ key: "", value: "" }]);
  };

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between gap-3">
        <Label className="text-sm font-semibold">{label}</Label>
        <Button type="button" variant="outline" className="rounded-full" onClick={addItem}>
          <Plus className="mr-2 size-4" />
          Add row
        </Button>
      </div>

      <div className="space-y-3">
        {items.map((item, index) => (
          <div key={`trust-metric-${index}`} className="grid gap-2 md:grid-cols-[1fr_180px_auto]">
            <Input
              value={item.key}
              placeholder="Metric label"
              onChange={(event) => updateItem(index, "key", event.target.value)}
              className="h-10 rounded-xl"
            />
            <Input
              value={item.value}
              placeholder="48"
              onChange={(event) => updateItem(index, "value", event.target.value)}
              className="h-10 rounded-xl"
            />
            <Button
              type="button"
              variant="ghost"
              className="shrink-0 rounded-full px-3 text-slate-500 hover:text-red-600"
              onClick={() => removeItem(index)}
              aria-label={`Remove ${label} row ${index + 1}`}
            >
              <Trash2 className="size-4" />
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
}

function ListEditor({
  label,
  name,
  items,
  onChange,
  placeholder,
}: {
  label: string;
  name: string;
  items: string[];
  onChange: (items: string[]) => void;
  placeholder?: string;
}) {
  const updateItem = (index: number, value: string) => {
    const next = [...items];
    next[index] = value;
    onChange(next);
  };

  const addItem = () => {
    onChange([...items, ""]);
  };

  const removeItem = (index: number) => {
    const next = items.filter((_, itemIndex) => itemIndex !== index);
    onChange(next.length ? next : [""]);
  };

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between gap-3">
        <Label className="text-sm font-semibold">{label}</Label>
        <Button type="button" variant="outline" className="rounded-full" onClick={addItem}>
          <Plus className="mr-2 size-4" />
          Add row
        </Button>
      </div>

      <div className="space-y-3">
        {items.map((item, index) => (
          <div key={`${name}-${index}`} className="flex items-center gap-2">
            <Input
              name={name}
              value={item}
              placeholder={placeholder}
              onChange={(event) => updateItem(index, event.target.value)}
              className="h-10 rounded-xl"
            />
            <Button
              type="button"
              variant="ghost"
              className="shrink-0 rounded-full px-3 text-slate-500 hover:text-red-600"
              onClick={() => removeItem(index)}
              aria-label={`Remove ${label} row ${index + 1}`}
            >
              <Trash2 className="size-4" />
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
}

function CardListEditor({
  label,
  name,
  items,
  onChange,
}: {
  label: string;
  name: string;
  items: CardItem[];
  onChange: (items: CardItem[]) => void;
}) {
  const updateItem = (index: number, key: keyof CardItem, value: string) => {
    const next = [...items];
    next[index] = { ...next[index], [key]: value };
    onChange(next);
  };

  const addItem = () => {
    onChange([...items, { title: "", summary: "" }]);
  };

  const removeItem = (index: number) => {
    const next = items.filter((_, itemIndex) => itemIndex !== index);
    onChange(next.length ? next : [{ title: "", summary: "" }]);
  };

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between gap-3">
        <Label className="text-sm font-semibold">{label}</Label>
        <Button type="button" variant="outline" className="rounded-full" onClick={addItem}>
          <Plus className="mr-2 size-4" />
          Add card
        </Button>
      </div>

      <div className="space-y-4">
        {items.map((item, index) => (
          <div key={`${name}-${index}`} className="rounded-2xl border border-slate-200 p-4">
            <div className="mb-3 flex items-center justify-between gap-3">
              <p className="text-sm font-semibold text-slate-700">Card {index + 1}</p>
              <Button
                type="button"
                variant="ghost"
                className="shrink-0 rounded-full px-3 text-slate-500 hover:text-red-600"
                onClick={() => removeItem(index)}
              >
                <Trash2 className="size-4" />
              </Button>
            </div>

            <div className="grid gap-3 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor={`${name}-${index}-title`}>Title</Label>
                <Input
                  id={`${name}-${index}-title`}
                  value={item.title}
                  placeholder="Scalable Teams"
                  onChange={(event) => updateItem(index, "title", event.target.value)}
                  className="h-10 rounded-xl"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor={`${name}-${index}-summary`}>Content</Label>
                <Textarea
                  id={`${name}-${index}-summary`}
                  value={item.summary}
                  placeholder="Flexible delivery capacity that grows with your needs."
                  onChange={(event) => updateItem(index, "summary", event.target.value)}
                  className="min-h-[110px] rounded-xl"
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}





