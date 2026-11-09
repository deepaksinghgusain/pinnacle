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

type CardItem = {
  title: string;
  summary: string;
};

type MetricItem = {
  key: string;
  value: string;
};

const metricFallbacks: MetricItem[] = [
  { key: "Team Members", value: "100+" },
  { key: "Happy Customers", value: "20+" },
  { key: "Projects Delivered", value: "25+" },
  { key: "Certified Professionals", value: "50+" },
  { key: "Global Time Zone Coverage", value: "24X7" },
  { key: "C-SAT Index", value: "99.9%" },
];

const aboutHighlightFallbacks: CardItem[] = [
  { title: "2024", summary: "Founded" },
  { title: "Global", summary: "Global delivery" },
];

const aboutFeatureFallbacks: CardItem[] = [
  {
    title: "Global Client Support",
    summary: "Reliable coverage for teams working across regions and time zones.",
  },
  {
    title: "Operations & IT Consulting",
    summary: "Connect back-office support with IT guidance and technology care.",
  },
  {
    title: "Smooth Transitions",
    summary: "Start engagements with clear knowledge transfer and careful handover.",
  },
  {
    title: "Dedicated Operations Teams",
    summary: "Skilled teams take ownership of daily work and service commitments.",
  },
  {
    title: "Training & Development",
    summary: "Ongoing learning and certification keep skills current.",
  },
  {
    title: "Flexible, Trained Teams",
    summary: "Add trained specialists as needs change, with quality built in.",
  },
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
  const [aboutHighlights, setAboutHighlights] = useState<CardItem[]>(
    () => parseCardList(configuration?.aboutHighlights, aboutHighlightFallbacks),
  );
  const [aboutFeatureCards, setAboutFeatureCards] = useState<CardItem[]>(
    () => parseCardList(configuration?.aboutFeatureCards, aboutFeatureFallbacks),
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
  const [heroBackgroundImagePath, setHeroBackgroundImagePath] = useState<string | null>(
    getPreviewSrc(configuration?.heroBackgroundImagePath),
  );
  const [heroBackgroundMediaType, setHeroBackgroundMediaType] = useState<
    string | null
  >(null);

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
        const heroBackgroundImage = formData.get("heroBackgroundImagePath");

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
        setAboutHighlights(
          parseCardList(nextSetting?.aboutHighlights, aboutHighlightFallbacks),
        );
        setAboutFeatureCards(
          parseCardList(nextSetting?.aboutFeatureCards, aboutFeatureFallbacks),
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
                label="Hero Heading"
                id="heroTitle"
                defaultValue={configuration?.heroTitle}
                placeholder="Make complex work"
              />
              <Field
                label="Highlighted Hero Heading"
                id="heroTitleAccent"
                defaultValue={configuration?.heroTitleAccent}
                placeholder="simpler"
              />
              <Field
                label="Hero Heading Ending"
                id="heroTitleSuffix"
                defaultValue={configuration?.heroTitleSuffix}
                placeholder="and more effective"
              />
              <Field
                label="Hero Button Label"
                id="heroButtonLabel"
                defaultValue={configuration?.heroButtonLabel}
                placeholder="Explore Services"
              />
              <Field
                label="Hero Button Link"
                id="heroButtonHref"
                defaultValue={configuration?.heroButtonHref}
                placeholder="#our-services"
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
                label="About Heading"
                id="aboutTitle"
                defaultValue={configuration?.aboutTitle}
                placeholder="Better operations."
              />
              <Field
                label="Highlighted About Heading"
                id="aboutTitleAccent"
                defaultValue={configuration?.aboutTitleAccent}
                placeholder="Stronger outcomes."
              />
              <Field
                label="About Button Label"
                id="aboutButtonLabel"
                defaultValue={configuration?.aboutButtonLabel}
                placeholder="Meet Pinnacle Serve"
              />
              <Field
                label="About Button Link"
                id="aboutButtonHref"
                defaultValue={configuration?.aboutButtonHref}
                placeholder="/about"
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

            <CardListEditor
              label="About Highlights"
              name="aboutHighlights"
              items={aboutHighlights}
              onChange={setAboutHighlights}
            />
            <input
              type="hidden"
              name="aboutHighlights"
              value={JSON.stringify(aboutHighlights)}
            />

            <CardListEditor
              label="About Feature Cards"
              name="aboutFeatureCards"
              items={aboutFeatureCards}
              onChange={setAboutFeatureCards}
            />
            <input
              type="hidden"
              name="aboutFeatureCards"
              value={JSON.stringify(aboutFeatureCards)}
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
          <CardTitle className="text-base font-semibold">Homepage Services Section</CardTitle>
        </CardHeader>
        <CardContent className="p-5">
          <form action={onSubmit} className="space-y-5">
            <div className="grid gap-4 md:grid-cols-2">
              <Field
                label="Section Tagline"
                id="serviceSectionTagline"
                defaultValue={configuration?.serviceSectionTagline}
                placeholder="How We Help"
              />
              <Field
                label="Heading"
                id="serviceSectionTitle"
                defaultValue={configuration?.serviceSectionTitle}
                placeholder="Support for"
              />
              <Field
                label="Highlighted Heading"
                id="serviceSectionAccent"
                defaultValue={configuration?.serviceSectionAccent}
                placeholder="Everyday Progress"
              />
              <Field
                label="Button Label"
                id="serviceSectionCtaLabel"
                defaultValue={configuration?.serviceSectionCtaLabel}
                placeholder="See How We Can Help"
              />
              <Field
                label="Button Link"
                id="serviceSectionCtaHref"
                defaultValue={configuration?.serviceSectionCtaHref}
                placeholder="/contact"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="serviceSectionDescription">Section Description</Label>
              <Textarea
                id="serviceSectionDescription"
                name="serviceSectionDescription"
                className="min-h-[100px] rounded-xl"
                defaultValue={configuration?.serviceSectionDescription ?? ""}
                placeholder="Practical services that help teams work accurately, respond faster, and grow with confidence."
              />
            </div>
            <div className="flex justify-end">
              <Button type="submit" className="rounded-full px-5" disabled={pending}>
                {pending ? <Loader2 className="mr-2 size-4 animate-spin" /> : <Save className="mr-2 size-4" />}
                Save Services Section
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>

      <Card className="border-slate-200/80 shadow-sm">
        <CardHeader className="border-b border-slate-200/70 py-4">
          <CardTitle className="text-base font-semibold">Homepage Testimonials Section</CardTitle>
        </CardHeader>
        <CardContent className="p-5">
          <form action={onSubmit} className="space-y-5">
            <div className="grid gap-4 md:grid-cols-2">
              <Field
                label="Section Tagline"
                id="homeTestimonialsTagline"
                defaultValue={configuration?.homeTestimonialsTagline}
                placeholder="Client Perspectives"
              />
              <Field
                label="Heading"
                id="homeTestimonialsTitle"
                defaultValue={configuration?.homeTestimonialsTitle}
                placeholder="Partnerships That"
              />
              <Field
                label="Highlighted Heading"
                id="homeTestimonialsAccent"
                defaultValue={configuration?.homeTestimonialsAccent}
                placeholder="Move Work Forward"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="homeTestimonialsDescription">Section Description</Label>
              <Textarea
                id="homeTestimonialsDescription"
                name="homeTestimonialsDescription"
                className="min-h-[100px] rounded-xl"
                defaultValue={configuration?.homeTestimonialsDescription ?? ""}
                placeholder="Hear from leaders working across financial services, healthcare, telecom, and retail."
              />
            </div>
            <div className="flex justify-end">
              <Button type="submit" className="rounded-full px-5" disabled={pending}>
                {pending ? <Loader2 className="mr-2 size-4 animate-spin" /> : <Save className="mr-2 size-4" />}
                Save Testimonials Section
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>

      <Card className="border-slate-200/80 shadow-sm">
        <CardHeader className="border-b border-slate-200/70 py-4">
          <CardTitle className="text-base font-semibold">Footer Call to Action</CardTitle>
        </CardHeader>
        <CardContent className="p-5">
          <form action={onSubmit} className="space-y-5">
            <div className="grid gap-4 md:grid-cols-2">
              <Field
                label="Tagline"
                id="homeCtaTagline"
                defaultValue={configuration?.homeCtaTagline}
                placeholder="Make the next move"
              />
              <Field
                label="Heading"
                id="homeCtaTitle"
                defaultValue={configuration?.homeCtaTitle}
                placeholder="Ready to move your business"
              />
              <Field
                label="Highlighted Heading"
                id="homeCtaAccent"
                defaultValue={configuration?.homeCtaAccent}
                placeholder="forward? Let's get to work."
              />
              <Field
                label="Button Label"
                id="homeCtaButtonLabel"
                defaultValue={configuration?.homeCtaButtonLabel}
                placeholder="Talk with our team"
              />
              <Field
                label="Button Link"
                id="homeCtaButtonHref"
                defaultValue={configuration?.homeCtaButtonHref}
                placeholder="/contact"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="homeCtaDescription">Description</Label>
              <Textarea
                id="homeCtaDescription"
                name="homeCtaDescription"
                className="min-h-[100px] rounded-xl"
                defaultValue={configuration?.homeCtaDescription ?? ""}
                placeholder="Bring us a complex challenge. We'll help turn it into a clear, workable plan."
              />
            </div>
            <div className="flex justify-end">
              <Button type="submit" className="rounded-full px-5" disabled={pending}>
                {pending ? <Loader2 className="mr-2 size-4 animate-spin" /> : <Save className="mr-2 size-4" />}
                Save Footer CTA
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
