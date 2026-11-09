"use client";

import { useState, useTransition } from "react";
import { Loader2, Plus, Save, Trash2 } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { saveContactPageSettings } from "@/lib/actions/settings-action";
import type { SiteSettings } from "@/lib/generated/prisma";

type ContactMetric = { value: string; label: string };
type ProcessStep = { number: string; title: string; copy: string };

const defaultMetrics: ContactMetric[] = [
  { value: "< 24h", label: "Response time" },
  { value: "50+", label: "Specialists" },
  { value: "Global", label: "Delivery teams" },
  { value: "100%", label: "Secure engagement" },
];

const defaultSteps: ProcessStep[] = [
  {
    number: "01",
    title: "Tell Us What You Need",
    copy: "Share your goals, challenges, and the kind of support you are looking for.",
  },
  {
    number: "02",
    title: "Talk It Through",
    copy: "Our team reviews your note and arranges a focused conversation within 24 hours.",
  },
  {
    number: "03",
    title: "Agree on a Way Forward",
    copy: "We outline an approach, expected timeline, and the skills your project may need.",
  },
];

function parseList<T extends object>(
  value: string | null | undefined,
  fallback: T[],
  fields: (keyof T)[],
): T[] {
  if (!value?.trim()) return fallback;
  try {
    const parsed: unknown = JSON.parse(value);
    if (!Array.isArray(parsed)) return fallback;
    return parsed.flatMap((item): T[] => {
      if (!item || typeof item !== "object" || Array.isArray(item)) return [];
      const record = item as Record<string, unknown>;
      return fields.every((field) => typeof record[String(field)] === "string")
        ? [record as T]
        : [];
    });
  } catch {
    return fallback;
  }
}

export default function Contact({ setting }: { setting?: SiteSettings }) {
  const [pending, startTransition] = useTransition();
  const [metrics, setMetrics] = useState(() =>
    parseList<ContactMetric>(setting?.contactMetrics, defaultMetrics, ["value", "label"]),
  );
  const [steps, setSteps] = useState(() =>
    parseList<ProcessStep>(setting?.contactProcessSteps, defaultSteps, ["number", "title", "copy"]),
  );

  const onSubmit = (formData: FormData) => {
    startTransition(async () => {
      const result = await saveContactPageSettings(formData);
      if (!result.success) {
        toast.error("Unable to save Contact page", { description: result.message });
        return;
      }

      toast.success("Contact page content saved");
    });
  };

  return (
    <div className="space-y-5">
      <Card className="border-slate-200/80 shadow-sm">
        <CardHeader className="border-b border-slate-200/70 py-4">
          <CardTitle className="text-base font-semibold">Contact Page Intro</CardTitle>
        </CardHeader>
        <CardContent className="p-5">
          <form action={onSubmit} className="space-y-5">
            <div className="grid gap-4 md:grid-cols-2">
              <Field label="Eyebrow" id="contactHeroTagline" value={setting?.contactHeroTagline} placeholder="Start a conversation" />
              <Field label="Heading" id="contactHeroTitle" value={setting?.contactHeroTitle} placeholder="Let's Make Progress" />
              <Field label="Highlighted heading" id="contactHeroAccent" value={setting?.contactHeroAccent} placeholder="On What Matters" />
              <Field label="Primary button label" id="contactHeroPrimaryButtonLabel" value={setting?.contactHeroPrimaryButtonLabel} placeholder="Tell us about your project" />
              <Field label="Email button label" id="contactHeroSecondaryButtonLabel" value={setting?.contactHeroSecondaryButtonLabel} placeholder="Or email our team" />
            </div>
            <TextField
              label="Description"
              id="contactHeroDescription"
              value={setting?.contactHeroDescription}
              placeholder="Tell us where you want to go next..."
            />
            <MetricsEditor items={metrics} onChange={setMetrics} />
            <input type="hidden" name="contactMetrics" value={JSON.stringify(metrics)} />
            <SaveButton pending={pending} />
          </form>
        </CardContent>
      </Card>

      <Card className="border-slate-200/80 shadow-sm">
        <CardHeader className="border-b border-slate-200/70 py-4">
          <CardTitle className="text-base font-semibold">Contact Process and Details</CardTitle>
        </CardHeader>
        <CardContent className="p-5">
          <form action={onSubmit} className="space-y-5">
            <div className="grid gap-4 md:grid-cols-2">
              <Field label="Section eyebrow" id="contactStepsTagline" value={setting?.contactStepsTagline} placeholder="A thoughtful start" />
              <Field label="Section heading" id="contactStepsTitle" value={setting?.contactStepsTitle} placeholder="Clear Steps. Shared Purpose." />
              <Field label="Contact email" id="contactPageEmail" value={setting?.contactPageEmail ?? setting?.primaryEmail} placeholder="contact@example.com" />
            </div>
            <TextField
              label="Office address"
              id="contactPageAddress"
              value={setting?.contactPageAddress ?? setting?.officeAddress}
              placeholder={"5th Floor, Tower D, Logix Cyberpark,\nSector 62, Noida, UP 201309"}
            />
            <TextField
              label="Section description"
              id="contactStepsDescription"
              value={setting?.contactStepsDescription}
              placeholder="Good partnerships begin with understanding the work..."
            />
            <ProcessStepsEditor items={steps} onChange={setSteps} />
            <input type="hidden" name="contactProcessSteps" value={JSON.stringify(steps)} />
            <SaveButton pending={pending} />
          </form>
        </CardContent>
      </Card>
    </div>
  );
}

function Field({
  label,
  id,
  value,
  placeholder,
}: {
  label: string;
  id: string;
  value?: string | null;
  placeholder?: string;
}) {
  return (
    <div className="space-y-2">
      <Label htmlFor={id}>{label}</Label>
      <Input id={id} name={id} defaultValue={value ?? ""} placeholder={placeholder} className="h-10 rounded-xl" />
    </div>
  );
}

function TextField({
  label,
  id,
  value,
  placeholder,
}: {
  label: string;
  id: string;
  value?: string | null;
  placeholder?: string;
}) {
  return (
    <div className="space-y-2">
      <Label htmlFor={id}>{label}</Label>
      <Textarea id={id} name={id} defaultValue={value ?? ""} placeholder={placeholder} className="min-h-[100px] rounded-xl" />
    </div>
  );
}

function MetricsEditor({
  items,
  onChange,
}: {
  items: ContactMetric[];
  onChange: (items: ContactMetric[]) => void;
}) {
  const update = (index: number, key: keyof ContactMetric, value: string) => {
    onChange(items.map((item, itemIndex) => (
      index === itemIndex ? { ...item, [key]: value } : item
    )));
  };

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between gap-3">
        <Label className="text-sm font-semibold">Intro metrics</Label>
        <Button type="button" variant="outline" className="rounded-full" onClick={() => onChange([...items, { value: "", label: "" }])}>
          <Plus className="mr-2 size-4" />Add metric
        </Button>
      </div>
      {items.map((item, index) => (
        <div key={`metric-${index}`} className="grid gap-3 rounded-xl border border-slate-200 p-3 sm:grid-cols-[1fr_1fr_auto]">
          <div className="space-y-2">
            <Label htmlFor={`metric-${index}-value`}>Value</Label>
            <Input id={`metric-${index}-value`} value={item.value} onChange={(event) => update(index, "value", event.target.value)} placeholder="&lt; 24h" />
          </div>
          <div className="space-y-2">
            <Label htmlFor={`metric-${index}-label`}>Label</Label>
            <Input id={`metric-${index}-label`} value={item.label} onChange={(event) => update(index, "label", event.target.value)} placeholder="Response time" />
          </div>
          <Button type="button" variant="ghost" className="self-end text-slate-500 hover:text-red-600" aria-label={`Remove metric ${index + 1}`} onClick={() => onChange(items.filter((_, itemIndex) => itemIndex !== index))}>
            <Trash2 className="size-4" />
          </Button>
        </div>
      ))}
    </div>
  );
}

function ProcessStepsEditor({
  items,
  onChange,
}: {
  items: ProcessStep[];
  onChange: (items: ProcessStep[]) => void;
}) {
  const update = (index: number, key: keyof ProcessStep, value: string) => {
    onChange(items.map((item, itemIndex) => (
      index === itemIndex ? { ...item, [key]: value } : item
    )));
  };

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between gap-3">
        <Label className="text-sm font-semibold">Process steps</Label>
        <Button type="button" variant="outline" className="rounded-full" onClick={() => onChange([...items, { number: String(items.length + 1).padStart(2, "0"), title: "", copy: "" }])}>
          <Plus className="mr-2 size-4" />Add step
        </Button>
      </div>
      {items.map((item, index) => (
        <div key={`process-step-${index}`} className="space-y-3 rounded-xl border border-slate-200 p-4">
          <div className="flex items-center justify-between gap-3">
            <p className="text-sm font-semibold text-slate-700">Step {index + 1}</p>
            <Button type="button" variant="ghost" className="text-slate-500 hover:text-red-600" aria-label={`Remove step ${index + 1}`} onClick={() => onChange(items.filter((_, itemIndex) => itemIndex !== index))}>
              <Trash2 className="size-4" />
            </Button>
          </div>
          <div className="grid gap-3 sm:grid-cols-[120px_1fr]">
            <div className="space-y-2">
              <Label htmlFor={`process-step-${index}-number`}>Number</Label>
              <Input id={`process-step-${index}-number`} value={item.number} onChange={(event) => update(index, "number", event.target.value)} placeholder="01" />
            </div>
            <div className="space-y-2">
              <Label htmlFor={`process-step-${index}-title`}>Title</Label>
              <Input id={`process-step-${index}-title`} value={item.title} onChange={(event) => update(index, "title", event.target.value)} placeholder="Tell Us What You Need" />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor={`process-step-${index}-copy`}>Description</Label>
            <Textarea id={`process-step-${index}-copy`} value={item.copy} onChange={(event) => update(index, "copy", event.target.value)} placeholder="Describe this step" className="min-h-[90px] rounded-xl" />
          </div>
        </div>
      ))}
    </div>
  );
}

function SaveButton({ pending }: { pending: boolean }) {
  return (
    <div className="flex justify-end">
      <Button type="submit" className="rounded-full px-5" disabled={pending}>
        {pending ? <Loader2 className="mr-2 size-4 animate-spin" /> : <Save className="mr-2 size-4" />}
        Save Contact Page
      </Button>
    </div>
  );
}
