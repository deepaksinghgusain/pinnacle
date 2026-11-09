"use client";

import { useState, useTransition } from "react";
import { Loader2, Plus, Save, Trash2 } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { saveCareerPageSettings } from "@/lib/actions/settings-action";
import type { SiteSettings } from "@/lib/generated/prisma";

type Metric = { value: string; label: string };
type Benefit = { title: string; description: string };

const defaultMetrics: Metric[] = [
  { value: "50+", label: "AI specialists" },
  { value: "12+", label: "Countries reached" },
  { value: "100+", label: "Organizations served" },
  { value: "4.8★", label: "Glassdoor rating" },
];

const defaultBenefitStats: Metric[] = [
  { value: "6", label: "Benefits" },
  { value: "100%", label: "Remote eligibility" },
];

const defaultBenefits: Benefit[] = [
  {
    title: "Work from anywhere",
    description: "Our distributed teams collaborate asynchronously and make room for focused work across locations.",
  },
  {
    title: "Growth and ownership",
    description: "Competitive pay, equity participation, and a defined path to develop your career and leadership skills.",
  },
  {
    title: "Health and wellbeing",
    description: "Health, dental, and vision coverage, plus a monthly allowance for fitness or therapy.",
  },
  {
    title: "Flexible schedules",
    description: "Plan your workday around your needs while staying accountable for the results you deliver.",
  },
  {
    title: "An inclusive workplace",
    description: "We value different perspectives and work to create an environment where people can contribute with confidence.",
  },
  {
    title: "Learning & Development",
    description: "Keep growing through meaningful challenges, knowledge sharing, and opportunities to expand your expertise.",
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

export default function Career({ setting }: { setting?: SiteSettings }) {
  const [pending, startTransition] = useTransition();
  const [metrics, setMetrics] = useState(() =>
    parseList<Metric>(setting?.careerMetrics, defaultMetrics, ["value", "label"]),
  );
  const [benefitStats, setBenefitStats] = useState(() =>
    parseList<Metric>(setting?.careerBenefitStats, defaultBenefitStats, ["value", "label"]),
  );
  const [benefits, setBenefits] = useState(() =>
    parseList<Benefit>(setting?.careerBenefits, defaultBenefits, ["title", "description"]),
  );

  const onSubmit = (formData: FormData) => {
    startTransition(async () => {
      const result = await saveCareerPageSettings(formData);
      if (!result.success) {
        toast.error("Unable to save Career page", { description: result.message });
        return;
      }

      toast.success("Career page content saved");
    });
  };

  return (
    <form action={onSubmit} className="space-y-5">
      <Card className="border-slate-200/80 shadow-sm">
        <CardHeader className="border-b border-slate-200/70 py-4">
          <CardTitle className="text-base font-semibold">Career Hero</CardTitle>
        </CardHeader>
        <CardContent className="space-y-5 p-5">
          <div className="grid gap-4 md:grid-cols-2">
            <Field label="Eyebrow" id="careerHeroTagline" value={setting?.careerHeroTagline} placeholder="Work with us" />
            <Field label="Hero background image path or URL" id="careerHeroImagePath" value={setting?.careerHeroImagePath} placeholder="/api/uploads/career-team.jpg" />
            <Field label="Heading" id="careerHeroTitle" value={setting?.careerHeroTitle} placeholder="Help shape the future of" />
            <Field label="Highlighted heading" id="careerHeroAccent" value={setting?.careerHeroAccent} placeholder="enterprise technology" />
            <Field label="Button label" id="careerHeroButtonLabel" value={setting?.careerHeroButtonLabel} placeholder="Meet the team" />
            <Field label="Button link" id="careerHeroButtonHref" value={setting?.careerHeroButtonHref} placeholder="/contact" />
          </div>
          <TextField label="Description" id="careerHeroDescription" value={setting?.careerHeroDescription} placeholder="Join engineers, researchers, and technology leaders..." />
        </CardContent>
      </Card>

      <Card className="border-slate-200/80 shadow-sm">
        <CardHeader className="border-b border-slate-200/70 py-4">
          <CardTitle className="text-base font-semibold">Life at Pinnacle Serve</CardTitle>
        </CardHeader>
        <CardContent className="space-y-5 p-5">
          <div className="grid gap-4 md:grid-cols-2">
            <Field label="Eyebrow" id="careerLifeTagline" value={setting?.careerLifeTagline} placeholder="Life at Pinnacle Serve" />
            <Field label="Image path or URL" id="careerLifeImagePath" value={setting?.careerLifeImagePath} placeholder="/api/uploads/career-life.jpg" />
            <Field label="Heading" id="careerLifeTitle" value={setting?.careerLifeTitle} placeholder="Put your skills to work on" />
            <Field label="Highlighted heading" id="careerLifeAccent" value={setting?.careerLifeAccent} placeholder="meaningful challenges" />
            <Field label="Image callout title" id="careerLifeCalloutTitle" value={setting?.careerLifeCalloutTitle} placeholder="Room to grow" />
            <Field label="Image callout description" id="careerLifeCalloutDescription" value={setting?.careerLifeCalloutDescription} placeholder="Build skills through real work" />
          </div>
          <TextField label="Description" id="careerLifeDescription" value={setting?.careerLifeDescription} placeholder="Help clients improve how they work..." />
          <MetricEditor title="Life at Pinnacle metrics" items={metrics} onChange={setMetrics} />
          <input type="hidden" name="careerMetrics" value={JSON.stringify(metrics)} />
        </CardContent>
      </Card>

      <Card className="border-slate-200/80 shadow-sm">
        <CardHeader className="border-b border-slate-200/70 py-4">
          <CardTitle className="text-base font-semibold">Open Positions Section</CardTitle>
        </CardHeader>
        <CardContent className="space-y-5 p-5">
          <div className="grid gap-4 md:grid-cols-2">
            <Field label="Eyebrow" id="careerOpportunitiesTagline" value={setting?.careerOpportunitiesTagline} placeholder="Opportunities" />
            <Field label="Heading" id="careerOpportunitiesTitle" value={setting?.careerOpportunitiesTitle} placeholder="Find your" />
            <Field label="Highlighted heading" id="careerOpportunitiesAccent" value={setting?.careerOpportunitiesAccent} placeholder="next role" />
          </div>
          <TextField label="Description" id="careerOpportunitiesDescription" value={setting?.careerOpportunitiesDescription} placeholder="Explore our current roles..." />
          <p className="text-sm text-slate-600">
            Job cards are populated from active Jobs. Manage openings in the admin Jobs section.
          </p>
        </CardContent>
      </Card>

      <Card className="border-slate-200/80 shadow-sm">
        <CardHeader className="border-b border-slate-200/70 py-4">
          <CardTitle className="text-base font-semibold">Benefits Section</CardTitle>
        </CardHeader>
        <CardContent className="space-y-5 p-5">
          <div className="grid gap-4 md:grid-cols-2">
            <Field label="Eyebrow" id="careerBenefitsTagline" value={setting?.careerBenefitsTagline} placeholder="What we offer" />
            <Field label="Heading" id="careerBenefitsTitle" value={setting?.careerBenefitsTitle} placeholder="Make space to" />
            <Field label="Highlighted heading" id="careerBenefitsAccent" value={setting?.careerBenefitsAccent} placeholder="do your best work" />
          </div>
          <TextField label="Description" id="careerBenefitsDescription" value={setting?.careerBenefitsDescription} placeholder="We support our people with benefits..." />
          <MetricEditor title="Benefit summary metrics" items={benefitStats} onChange={setBenefitStats} />
          <input type="hidden" name="careerBenefitStats" value={JSON.stringify(benefitStats)} />
          <BenefitEditor items={benefits} onChange={setBenefits} />
          <input type="hidden" name="careerBenefits" value={JSON.stringify(benefits)} />
        </CardContent>
      </Card>

      <Card className="border-slate-200/80 shadow-sm">
        <CardHeader className="border-b border-slate-200/70 py-4">
          <CardTitle className="text-base font-semibold">Career Closing CTA</CardTitle>
        </CardHeader>
        <CardContent className="space-y-5 p-5">
          <div className="grid gap-4 md:grid-cols-2">
            <Field label="Eyebrow" id="careerCtaTagline" value={setting?.careerCtaTagline} placeholder="Stay connected" />
            <Field label="Heading" id="careerCtaTitle" value={setting?.careerCtaTitle} placeholder="Not seeing the right opening?" />
            <Field label="Button label" id="careerCtaButtonLabel" value={setting?.careerCtaButtonLabel} placeholder="Contact us" />
            <Field label="Button link" id="careerCtaButtonHref" value={setting?.careerCtaButtonHref} placeholder="/contact" />
          </div>
          <TextField label="Description" id="careerCtaDescription" value={setting?.careerCtaDescription} placeholder="We welcome conversations with people..." />
        </CardContent>
      </Card>

      <div className="flex justify-end">
        <Button type="submit" className="rounded-full px-5" disabled={pending}>
          {pending ? <Loader2 className="mr-2 size-4 animate-spin" /> : <Save className="mr-2 size-4" />}
          Save Career Page
        </Button>
      </div>
    </form>
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

function MetricEditor({
  title,
  items,
  onChange,
}: {
  title: string;
  items: Metric[];
  onChange: (items: Metric[]) => void;
}) {
  const update = (index: number, key: keyof Metric, value: string) => {
    onChange(items.map((item, itemIndex) => (
      index === itemIndex ? { ...item, [key]: value } : item
    )));
  };

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between gap-3">
        <Label className="text-sm font-semibold">{title}</Label>
        <Button type="button" variant="outline" className="rounded-full" onClick={() => onChange([...items, { value: "", label: "" }])}>
          <Plus className="mr-2 size-4" />Add metric
        </Button>
      </div>
      {items.map((item, index) => (
        <div key={`${title}-${index}`} className="grid gap-3 rounded-xl border border-slate-200 p-3 sm:grid-cols-[1fr_1fr_auto]">
          <div className="space-y-2">
            <Label htmlFor={`${title}-${index}-value`}>Value</Label>
            <Input id={`${title}-${index}-value`} value={item.value} onChange={(event) => update(index, "value", event.target.value)} />
          </div>
          <div className="space-y-2">
            <Label htmlFor={`${title}-${index}-label`}>Label</Label>
            <Input id={`${title}-${index}-label`} value={item.label} onChange={(event) => update(index, "label", event.target.value)} />
          </div>
          <Button type="button" variant="ghost" className="self-end text-slate-500 hover:text-red-600" aria-label={`Remove ${title} ${index + 1}`} onClick={() => onChange(items.filter((_, itemIndex) => itemIndex !== index))}>
            <Trash2 className="size-4" />
          </Button>
        </div>
      ))}
    </div>
  );
}

function BenefitEditor({
  items,
  onChange,
}: {
  items: Benefit[];
  onChange: (items: Benefit[]) => void;
}) {
  const update = (index: number, key: keyof Benefit, value: string) => {
    onChange(items.map((item, itemIndex) => (
      index === itemIndex ? { ...item, [key]: value } : item
    )));
  };

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between gap-3">
        <Label className="text-sm font-semibold">Benefits</Label>
        <Button type="button" variant="outline" className="rounded-full" onClick={() => onChange([...items, { title: "", description: "" }])}>
          <Plus className="mr-2 size-4" />Add benefit
        </Button>
      </div>
      {items.map((item, index) => (
        <div key={`benefit-${index}`} className="space-y-3 rounded-xl border border-slate-200 p-4">
          <div className="flex items-center justify-between gap-3">
            <p className="text-sm font-semibold text-slate-700">Benefit {index + 1}</p>
            <Button type="button" variant="ghost" className="text-slate-500 hover:text-red-600" aria-label={`Remove benefit ${index + 1}`} onClick={() => onChange(items.filter((_, itemIndex) => itemIndex !== index))}>
              <Trash2 className="size-4" />
            </Button>
          </div>
          <div className="grid gap-3 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor={`benefit-${index}-title`}>Title</Label>
              <Input id={`benefit-${index}-title`} value={item.title} onChange={(event) => update(index, "title", event.target.value)} placeholder="Work from anywhere" />
            </div>
            <div className="space-y-2">
              <Label htmlFor={`benefit-${index}-description`}>Description</Label>
              <Textarea id={`benefit-${index}-description`} value={item.description} onChange={(event) => update(index, "description", event.target.value)} className="min-h-[90px] rounded-xl" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
