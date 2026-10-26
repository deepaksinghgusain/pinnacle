"use client";

import { useState, useTransition } from "react";
import { Loader2, Plus, Save, Trash2 } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { saveServicePageSettings } from "@/lib/actions/settings-action";

type CardItem = {
  title: string;
  summary: string;
};

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
    // fall through to fallback values
  }

  return fallback;
}

type ServicePageSetting = {
  siteName?: string | null;
  serviceHeroTitle?: string | null;
  serviceHeroDescription?: string | null;
  serviceDeliveryTagline?: string | null;
  serviceDeliveryTitle?: string | null;
  serviceDeliveryDescription?: string | null;
  serviceDeliveryCards?: string | null;
};

export default function Services({ setting }: { setting?: ServicePageSetting }) {
  const [pending, startTransition] = useTransition();
  const [configuration, setConfiguration] = useState<ServicePageSetting | undefined>(setting);
  const [deliveryCards, setDeliveryCards] = useState<CardItem[]>(() =>
    parseCardList(setting?.serviceDeliveryCards, [
      {
        title: "Quality Controls",
        summary:
          "Defined checks, documented processes, and review loops for consistent delivery.",
      },
      {
        title: "Scalable Teams",
        summary:
          "Flexible delivery capacity that can expand with your workload and priorities.",
      },
      {
        title: "Process Discipline",
        summary:
          "Clear ownership, practical SOPs, and measurable operational routines.",
      },
      {
        title: "Visible Outcomes",
        summary:
          "Dashboards and reporting that make performance easier to monitor and improve.",
      },
    ]),
  );

  const onSubmit = async (formData: FormData) => {
    startTransition(async () => {
      try {
        formData.set("serviceDeliveryCards", JSON.stringify(deliveryCards));

        const res = await saveServicePageSettings(formData);

        if (!res?.success) {
          toast.error("Error", {
            description: res?.message,
          });
          return;
        }

        const nextConfiguration = res.data as ServicePageSetting | null | undefined;

        setConfiguration(nextConfiguration ?? undefined);
        setDeliveryCards(
          parseCardList(nextConfiguration?.serviceDeliveryCards, [
            {
              title: "Quality Controls",
              summary:
                "Defined checks, documented processes, and review loops for consistent delivery.",
            },
            {
              title: "Scalable Teams",
              summary:
                "Flexible delivery capacity that can expand with your workload and priorities.",
            },
            {
              title: "Process Discipline",
              summary:
                "Clear ownership, practical SOPs, and measurable operational routines.",
            },
            {
              title: "Visible Outcomes",
              summary:
                "Dashboards and reporting that make performance easier to monitor and improve.",
            },
          ]),
        );

        toast.success("Service page content saved successfully");
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
            Service Page Hero
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
                label="Hero Title"
                id="serviceHeroTitle"
                defaultValue={configuration?.serviceHeroTitle}
                placeholder="Services built for scale, support, and smarter delivery."
              />
              <Field
                label="Hero Content"
                id="serviceHeroDescription"
                defaultValue={configuration?.serviceHeroDescription}
                placeholder="Pinnacle combines operations, analytics, IT support, and consulting into one focused delivery model..."
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
                Save Hero Section
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>

      <Card className="border-slate-200/80 shadow-sm">
        <CardHeader className="border-b border-slate-200/70 py-4">
          <CardTitle className="text-base font-semibold">
            Delivery Method
          </CardTitle>
        </CardHeader>
        <CardContent className="p-5">
          <form action={onSubmit} className="space-y-5">
            <input
              type="hidden"
              name="siteName"
              value={configuration?.siteName ?? "Pinnacle"}
            />
            <input type="hidden" name="serviceHeroTitle" value={configuration?.serviceHeroTitle ?? ""} />
            <input type="hidden" name="serviceHeroDescription" value={configuration?.serviceHeroDescription ?? ""} />

            <div className="grid gap-4 md:grid-cols-2">
              <Field
                label="Section Tagline"
                id="serviceDeliveryTagline"
                defaultValue={configuration?.serviceDeliveryTagline}
                placeholder="DELIVERY METHOD"
              />
              <Field
                label="Section Title"
                id="serviceDeliveryTitle"
                defaultValue={configuration?.serviceDeliveryTitle}
                placeholder="Advanced support, grounded in operational discipline."
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="serviceDeliveryDescription">Section Content</Label>
              <Textarea
                id="serviceDeliveryDescription"
                name="serviceDeliveryDescription"
                className="min-h-[120px] rounded-xl"
                defaultValue={configuration?.serviceDeliveryDescription ?? ""}
                placeholder="We keep the model simple for your team..."
              />
            </div>

            <CardListEditor
              label="Delivery Cards"
              items={deliveryCards}
              onChange={setDeliveryCards}
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
                Save Delivery Method
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

function CardListEditor({
  label,
  items,
  onChange,
}: {
  label: string;
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
          <div key={`service-delivery-card-${index}`} className="rounded-2xl border border-slate-200 p-4">
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
                <Label htmlFor={`service-delivery-card-${index}-title`}>Title</Label>
                <Input
                  id={`service-delivery-card-${index}-title`}
                  value={item.title}
                  placeholder="Quality Controls"
                  onChange={(event) => updateItem(index, "title", event.target.value)}
                  className="h-10 rounded-xl"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor={`service-delivery-card-${index}-summary`}>Content</Label>
                <Textarea
                  id={`service-delivery-card-${index}-summary`}
                  value={item.summary}
                  placeholder="Defined checks, documented processes..."
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
