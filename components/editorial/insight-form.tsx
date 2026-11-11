"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { Save } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  EditorialImageUpload,
  EditorialItemEditor,
  EditorialTextArea,
  EditorialTextInput,
} from "@/components/editorial/editorial-fields";
import { createInsight, updateInsight } from "@/lib/actions/editorial-action";
import {
  insightContentSchema,
  parseInsightContent,
  type InsightContent,
  type InsightInput,
} from "@/lib/editorial-content";
import type { Insight, Status } from "@/lib/generated/prisma";

const emptyInsightContent: InsightContent = {
  category: "",
  heroTitle: "",
  summary: "",
  heroImagePath: "",
  executiveSummaryTitle: "",
  executiveSummary: "",
  introductionTitle: "",
  introduction: "",
  trendsTitle: "",
  trends: [],
  viewpointTitle: "",
  viewpoint: "",
  ctaTitle: "",
  ctaDescription: "",
  ctaButtonLabel: "",
  ctaButtonHref: "",
};

function toSlug(value: string) {
  return value.normalize("NFKD").replace(/[\u0300-\u036f]/g, "")
    .toLowerCase().trim().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");
}

export default function InsightForm({ record }: { record?: Insight }) {
  const router = useRouter();
  const [pending, startTransition] = useTransition();
  const [uploading, setUploading] = useState(false);
  const [name, setName] = useState(record?.name ?? "");
  const [slug, setSlug] = useState(record?.slug ?? "");
  const [slugEdited, setSlugEdited] = useState(Boolean(record));
  const [status, setStatus] = useState<Status>(record?.status ?? "ACTIVE");
  const [content, setContent] = useState(() =>
    record ? parseInsightContent(record.content) : emptyInsightContent,
  );
  const update = <K extends keyof InsightContent>(key: K, value: InsightContent[K]) =>
    setContent((current) => ({ ...current, [key]: value }));

  const submit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (uploading) return;
    const parsedContent = insightContentSchema.safeParse(content);
    if (!parsedContent.success) {
      toast.error("Please check the insight content", {
        description: parsedContent.error.issues[0]?.message,
      });
      return;
    }
    const payload: InsightInput = { name, slug, status, content: parsedContent.data };
    startTransition(async () => {
      const result = record
        ? await updateInsight(record.id, payload)
        : await createInsight(payload);
      if (!result.success) {
        toast.error("Unable to save insight", { description: result.message });
        return;
      }
      toast.success(result.message);
      router.push("/admin/insights");
      router.refresh();
    });
  };

  return (
    <form onSubmit={submit} className="space-y-6">
      <section className="space-y-4 rounded-xl border p-5">
        <h2 className="text-lg font-semibold">Insight details</h2>
        <div className="grid gap-4 md:grid-cols-3">
          <EditorialTextInput label="Admin name" value={name} onChange={(value) => {
            setName(value);
            if (!slugEdited) setSlug(toSlug(value));
          }} required />
          <EditorialTextInput label="URL slug" value={slug} onChange={(value) => {
            setSlugEdited(true);
            setSlug(toSlug(value));
          }} required placeholder="ai-and-automation" />
          <div className="space-y-2">
            <Label htmlFor="insight-status">Status</Label>
            <select id="insight-status" value={status}
              onChange={(event) => setStatus(event.target.value === "INACTIVE" ? "INACTIVE" : "ACTIVE")}
              className="h-10 w-full rounded-md border border-input bg-background px-3 text-sm">
              <option value="ACTIVE">Active</option>
              <option value="INACTIVE">Inactive</option>
            </select>
          </div>
        </div>
      </section>

      <section className="space-y-4 rounded-xl border p-5">
        <h2 className="text-lg font-semibold">01 · Hero section</h2>
        <div className="grid gap-4 md:grid-cols-2">
          <EditorialTextInput label="Topic category" value={content.category} onChange={(value) => update("category", value)} required />
          <EditorialTextInput label="Insight title" value={content.heroTitle} onChange={(value) => update("heroTitle", value)} required />
        </div>
        <EditorialTextArea label="Summary paragraph" value={content.summary} onChange={(value) => update("summary", value)} required />
        <EditorialImageUpload value={content.heroImagePath} onChange={(value) => update("heroImagePath", value)} onUploadingChange={setUploading} />
      </section>

      <section className="space-y-4 rounded-xl border p-5">
        <h2 className="text-lg font-semibold">02 · Executive summary</h2>
        <EditorialTextInput label="Section heading" value={content.executiveSummaryTitle} onChange={(value) => update("executiveSummaryTitle", value)} required />
        <EditorialTextArea label="At a glance" value={content.executiveSummary} onChange={(value) => update("executiveSummary", value)} required />
      </section>

      <section className="space-y-4 rounded-xl border p-5">
        <h2 className="text-lg font-semibold">03 · Introduction</h2>
        <EditorialTextInput label="Section heading" value={content.introductionTitle} onChange={(value) => update("introductionTitle", value)} required />
        <EditorialTextArea label="Context and relevance" value={content.introduction} onChange={(value) => update("introduction", value)} required />
      </section>

      <section className="space-y-4 rounded-xl border p-5">
        <h2 className="text-lg font-semibold">04 · Key trends and developments</h2>
        <EditorialTextInput label="Section heading" value={content.trendsTitle} onChange={(value) => update("trendsTitle", value)} required />
        <EditorialItemEditor title="Trend or development" items={content.trends} onChange={(items) => update("trends", items)} withSource />
      </section>

      <section className="space-y-4 rounded-xl border p-5">
        <h2 className="text-lg font-semibold">05 · Our point of view</h2>
        <EditorialTextInput label="Section heading" value={content.viewpointTitle} onChange={(value) => update("viewpointTitle", value)} required />
        <EditorialTextArea label="Pinnacle Serve's perspective" value={content.viewpoint} onChange={(value) => update("viewpoint", value)} required />
      </section>

      <section className="space-y-4 rounded-xl border p-5">
        <h2 className="text-lg font-semibold">06 · Final call to action</h2>
        <div className="grid gap-4 md:grid-cols-2">
          <EditorialTextInput label="CTA heading" value={content.ctaTitle} onChange={(value) => update("ctaTitle", value)} required />
          <EditorialTextInput label="Button label" value={content.ctaButtonLabel} onChange={(value) => update("ctaButtonLabel", value)} required />
          <EditorialTextInput label="Button link" value={content.ctaButtonHref} onChange={(value) => update("ctaButtonHref", value)} required />
        </div>
        <EditorialTextArea label="CTA description" value={content.ctaDescription} onChange={(value) => update("ctaDescription", value)} required />
      </section>

      <div className="flex flex-wrap gap-3">
        <Button type="submit" disabled={pending || uploading}>
          <Save className="mr-2 size-4" />
          {uploading ? "Uploading image…" : pending ? "Saving…" : record ? "Save changes" : "Create insight"}
        </Button>
        <Button type="button" variant="outline" onClick={() => router.push("/admin/insights")}>Cancel</Button>
      </div>
    </form>
  );
}
