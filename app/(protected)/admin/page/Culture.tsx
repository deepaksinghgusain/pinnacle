"use client";

import { useId, useState, useTransition } from "react";
import { Loader2, Plus, Save, Trash2 } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { saveCulturePageSettings } from "@/lib/actions/settings-action";
import {
  defaultCultureContent,
  parseCultureContent,
  type CultureContent,
  type CultureItem,
} from "@/lib/culture-content";
import type { SiteSettings } from "@/lib/generated/prisma";

export default function Culture({
  setting,
}: {
  setting?: Pick<SiteSettings, "cultureContent">;
}) {
  const [pending, startTransition] = useTransition();
  const [content, setContent] = useState(() =>
    parseCultureContent(setting?.cultureContent),
  );

  const update = <K extends keyof CultureContent>(
    key: K,
    value: CultureContent[K],
  ) => setContent((current) => ({ ...current, [key]: value }));

  const onSubmit = (formData: FormData) => {
    formData.set("cultureContent", JSON.stringify(content));
    startTransition(async () => {
      const result = await saveCulturePageSettings(formData);
      if (!result.success) {
        toast.error("Unable to save Culture page", {
          description: result.message,
        });
        return;
      }
      toast.success("Culture page content saved");
    });
  };

  return (
    <form action={onSubmit} className="space-y-5">
      <Card className="border-slate-200/80 shadow-sm">
        <CardHeader className="border-b border-slate-200/70 py-4">
          <CardTitle className="text-base font-semibold">Hero section</CardTitle>
        </CardHeader>
        <CardContent className="space-y-5 p-5">
          <div className="grid gap-4 md:grid-cols-2">
            <Field label="Eyebrow" value={content.heroEyebrow} onChange={(value) => update("heroEyebrow", value)} />
            <Field label="Hero title" value={content.heroTitle} onChange={(value) => update("heroTitle", value)} />
            <Field label="Highlighted title" value={content.heroAccent} onChange={(value) => update("heroAccent", value)} />
            <Field label="Primary button label" value={content.heroPrimaryLabel} onChange={(value) => update("heroPrimaryLabel", value)} />
            <Field label="Primary button link" value={content.heroPrimaryHref} onChange={(value) => update("heroPrimaryHref", value)} />
            <Field label="Secondary button label" value={content.heroSecondaryLabel} onChange={(value) => update("heroSecondaryLabel", value)} />
            <Field label="Secondary button link / section ID" value={content.heroSecondaryHref} onChange={(value) => update("heroSecondaryHref", value)} />
            <Field label="Hero image path or URL" value={content.heroImagePath} onChange={(value) => update("heroImagePath", value)} placeholder="/uploads/team.jpg" />
            <Field label="Hero image alt text" value={content.heroImageAlt} onChange={(value) => update("heroImageAlt", value)} />
            <Field label="Image badge" value={content.heroImageBadge} onChange={(value) => update("heroImageBadge", value)} />
            <Field label="Image card title" value={content.heroImageCardTitle} onChange={(value) => update("heroImageCardTitle", value)} />
          </div>
          <TextField label="Hero description" value={content.heroDescription} onChange={(value) => update("heroDescription", value)} />
          <TextField label="Hero note" value={content.heroNote} onChange={(value) => update("heroNote", value)} />
          <TextField label="Image card description" value={content.heroImageCardDescription} onChange={(value) => update("heroImageCardDescription", value)} />
        </CardContent>
      </Card>

      <Card className="border-slate-200/80 shadow-sm">
        <CardHeader className="border-b border-slate-200/70 py-4">
          <CardTitle className="text-base font-semibold">How we work</CardTitle>
        </CardHeader>
        <CardContent className="space-y-5 p-5">
          <div className="grid gap-4 md:grid-cols-2">
            <Field label="Eyebrow" value={content.introEyebrow} onChange={(value) => update("introEyebrow", value)} />
            <Field label="Heading" value={content.introTitle} onChange={(value) => update("introTitle", value)} />
          </div>
          <TextField label="Description" value={content.introDescription} onChange={(value) => update("introDescription", value)} />
          <RepeatableEditor
            title="Culture pillars"
            items={content.pillars}
            onChange={(items) => update("pillars", items)}
          />
        </CardContent>
      </Card>

      <Card className="border-slate-200/80 shadow-sm">
        <CardHeader className="border-b border-slate-200/70 py-4">
          <CardTitle className="text-base font-semibold">Culture in practice</CardTitle>
        </CardHeader>
        <CardContent className="space-y-5 p-5">
          <div className="grid gap-4 md:grid-cols-2">
            <Field label="Eyebrow" value={content.practiceEyebrow} onChange={(value) => update("practiceEyebrow", value)} />
            <Field label="Heading" value={content.practiceTitle} onChange={(value) => update("practiceTitle", value)} />
          </div>
          <TextField label="Description" value={content.practiceDescription} onChange={(value) => update("practiceDescription", value)} />
          <RepeatableEditor
            title="Culture practices"
            items={content.practices}
            onChange={(items) => update("practices", items)}
          />
        </CardContent>
      </Card>

      <Card className="border-slate-200/80 shadow-sm">
        <CardHeader className="border-b border-slate-200/70 py-4">
          <CardTitle className="text-base font-semibold">Call to action</CardTitle>
        </CardHeader>
        <CardContent className="space-y-5 p-5">
          <div className="grid gap-4 md:grid-cols-2">
            <Field label="Eyebrow" value={content.ctaEyebrow} onChange={(value) => update("ctaEyebrow", value)} />
            <Field label="Heading" value={content.ctaTitle} onChange={(value) => update("ctaTitle", value)} />
            <Field label="Button label" value={content.ctaButtonLabel} onChange={(value) => update("ctaButtonLabel", value)} />
            <Field label="Button link" value={content.ctaButtonHref} onChange={(value) => update("ctaButtonHref", value)} />
          </div>
          <TextField label="Description" value={content.ctaDescription} onChange={(value) => update("ctaDescription", value)} />
        </CardContent>
      </Card>

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <Button
          type="button"
          variant="outline"
          className="rounded-full"
          onClick={() => setContent(defaultCultureContent)}
        >
          Restore default content
        </Button>
        <Button type="submit" className="rounded-full px-5" disabled={pending}>
          {pending ? <Loader2 className="mr-2 size-4 animate-spin" /> : <Save className="mr-2 size-4" />}
          Save Culture Page
        </Button>
      </div>
    </form>
  );
}

function Field({
  label,
  value,
  onChange,
  placeholder,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}) {
  const id = useId();
  return (
    <div className="space-y-2">
      <Label htmlFor={id}>{label}</Label>
      <Input
        id={id}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        className="h-10 rounded-xl"
      />
    </div>
  );
}

function TextField({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
}) {
  const id = useId();
  return (
    <div className="space-y-2">
      <Label htmlFor={id}>{label}</Label>
      <Textarea
        id={id}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="min-h-24 rounded-xl"
      />
    </div>
  );
}

function RepeatableEditor({
  title,
  items,
  onChange,
}: {
  title: string;
  items: CultureItem[];
  onChange: (items: CultureItem[]) => void;
}) {
  const updateItem = (
    index: number,
    field: keyof CultureItem,
    value: string,
  ) => {
    onChange(
      items.map((item, current) =>
        current === index ? { ...item, [field]: value } : item,
      ),
    );
  };

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between gap-3">
        <Label className="text-sm font-semibold">{title}</Label>
        <Button
          type="button"
          variant="outline"
          className="rounded-full"
          onClick={() => onChange([...items, { title: "", description: "" }])}
        >
          <Plus className="mr-2 size-4" />
          Add item
        </Button>
      </div>
      {items.map((item, index) => (
        <div key={`${title}-${index}`} className="space-y-3 rounded-xl border border-slate-200 p-4">
          <div className="flex items-center justify-between">
            <p className="text-sm font-medium text-slate-700">
              {title} {index + 1}
            </p>
            <Button
              type="button"
              variant="ghost"
              className="text-slate-500 hover:text-red-600"
              aria-label={`Remove ${title} ${index + 1}`}
              onClick={() => onChange(items.filter((_, current) => current !== index))}
            >
              <Trash2 className="size-4" />
            </Button>
          </div>
          <div className="grid gap-3 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor={`${title}-${index}-title`}>Title</Label>
              <Input
                id={`${title}-${index}-title`}
                value={item.title}
                onChange={(event) => updateItem(index, "title", event.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor={`${title}-${index}-description`}>Description</Label>
              <Textarea
                id={`${title}-${index}-description`}
                value={item.description}
                onChange={(event) => updateItem(index, "description", event.target.value)}
                className="min-h-24 rounded-xl"
              />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}