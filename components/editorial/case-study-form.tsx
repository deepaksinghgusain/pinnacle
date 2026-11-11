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
import { createCaseStudy, updateCaseStudy } from "@/lib/actions/editorial-action";
import {
  caseStudyContentSchema,
  parseCaseStudyContent,
  type CaseStudyContent,
  type CaseStudyInput,
} from "@/lib/editorial-content";
import type { CaseStudy, Status } from "@/lib/generated/prisma";

const emptyCaseStudyContent: CaseStudyContent = {
  industryLabel: "",
  heroTitle: "",
  summary: "",
  heroImagePath: "",
  clientOverviewTitle: "",
  clientOverview: "",
  challengeTitle: "",
  challenge: "",
  objectivesTitle: "",
  objectives: "",
  solutionTitle: "",
  solution: "",
  resultsTitle: "",
  results: [],
  takeawaysTitle: "",
  takeaways: "",
  ctaTitle: "",
  ctaDescription: "",
  ctaButtonLabel: "",
  ctaButtonHref: "",
};

function toSlug(value: string) {
  return value.normalize("NFKD").replace(/[\u0300-\u036f]/g, "")
    .toLowerCase().trim().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");
}

export default function CaseStudyForm({ record }: { record?: CaseStudy }) {
  const router = useRouter();
  const [pending, startTransition] = useTransition();
  const [uploading, setUploading] = useState(false);
  const [name, setName] = useState(record?.name ?? "");
  const [slug, setSlug] = useState(record?.slug ?? "");
  const [slugEdited, setSlugEdited] = useState(Boolean(record));
  const [status, setStatus] = useState<Status>(record?.status ?? "ACTIVE");
  const [content, setContent] = useState(() =>
    record ? parseCaseStudyContent(record.content) : emptyCaseStudyContent,
  );
  const update = <K extends keyof CaseStudyContent>(key: K, value: CaseStudyContent[K]) =>
    setContent((current) => ({ ...current, [key]: value }));

  const submit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (uploading) return;
    const parsedContent = caseStudyContentSchema.safeParse(content);
    if (!parsedContent.success) {
      toast.error("Please check the case study content", {
        description: parsedContent.error.issues[0]?.message,
      });
      return;
    }
    const payload: CaseStudyInput = { name, slug, status, content: parsedContent.data };
    startTransition(async () => {
      const result = record
        ? await updateCaseStudy(record.id, payload)
        : await createCaseStudy(payload);
      if (!result.success) {
        toast.error("Unable to save case study", { description: result.message });
        return;
      }
      toast.success(result.message);
      router.push("/admin/case-studies");
      router.refresh();
    });
  };

  return (
    <form onSubmit={submit} className="space-y-6">
      <section className="space-y-4 rounded-xl border p-5">
        <h2 className="text-lg font-semibold">Case study details</h2>
        <div className="grid gap-4 md:grid-cols-3">
          <EditorialTextInput label="Admin name" value={name} onChange={(value) => {
            setName(value);
            if (!slugEdited) setSlug(toSlug(value));
          }} required />
          <EditorialTextInput label="URL slug" value={slug} onChange={(value) => {
            setSlugEdited(true);
            setSlug(toSlug(value));
          }} required placeholder="healthcare-operations" />
          <div className="space-y-2">
            <Label htmlFor="case-study-status">Status</Label>
            <select id="case-study-status" value={status}
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
          <EditorialTextInput label="Industry | service label" value={content.industryLabel} onChange={(value) => update("industryLabel", value)} required />
          <EditorialTextInput label="Case study title" value={content.heroTitle} onChange={(value) => update("heroTitle", value)} required />
        </div>
        <EditorialTextArea label="Summary paragraph" value={content.summary} onChange={(value) => update("summary", value)} required />
        <EditorialImageUpload value={content.heroImagePath} onChange={(value) => update("heroImagePath", value)} onUploadingChange={setUploading} />
      </section>

      <section className="space-y-4 rounded-xl border p-5">
        <h2 className="text-lg font-semibold">02 · Client overview</h2>
        <EditorialTextInput label="Section heading" value={content.clientOverviewTitle} onChange={(value) => update("clientOverviewTitle", value)} required />
        <EditorialTextArea label="About the client" value={content.clientOverview} onChange={(value) => update("clientOverview", value)} required />
      </section>

      <section className="space-y-4 rounded-xl border p-5">
        <h2 className="text-lg font-semibold">03 · Business challenge</h2>
        <EditorialTextInput label="Section heading" value={content.challengeTitle} onChange={(value) => update("challengeTitle", value)} required />
        <EditorialTextArea label="Challenge" value={content.challenge} onChange={(value) => update("challenge", value)} required />
      </section>

      <section className="space-y-4 rounded-xl border p-5">
        <h2 className="text-lg font-semibold">04 · Objectives</h2>
        <EditorialTextInput label="Section heading" value={content.objectivesTitle} onChange={(value) => update("objectivesTitle", value)} required />
        <EditorialTextArea label="Objectives and success criteria" value={content.objectives} onChange={(value) => update("objectives", value)} required />
      </section>

      <section className="space-y-4 rounded-xl border p-5">
        <h2 className="text-lg font-semibold">05 · Solution</h2>
        <EditorialTextInput label="Section heading" value={content.solutionTitle} onChange={(value) => update("solutionTitle", value)} required />
        <EditorialTextArea label="Our approach" value={content.solution} onChange={(value) => update("solution", value)} required />
      </section>

      <section className="space-y-4 rounded-xl border p-5">
        <h2 className="text-lg font-semibold">06 · Business results</h2>
        <EditorialTextInput label="Section heading" value={content.resultsTitle} onChange={(value) => update("resultsTitle", value)} required />
        <EditorialItemEditor title="Result" items={content.results} onChange={(items) => update("results", items)} />
      </section>

      <section className="space-y-4 rounded-xl border p-5">
        <h2 className="text-lg font-semibold">07 · Key takeaways</h2>
        <EditorialTextInput label="Section heading" value={content.takeawaysTitle} onChange={(value) => update("takeawaysTitle", value)} required />
        <EditorialTextArea label="Takeaways" value={content.takeaways} onChange={(value) => update("takeaways", value)} required />
      </section>

      <section className="space-y-4 rounded-xl border p-5">
        <h2 className="text-lg font-semibold">08 · Final call to action</h2>
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
          {uploading ? "Uploading image…" : pending ? "Saving…" : record ? "Save changes" : "Create case study"}
        </Button>
        <Button type="button" variant="outline" onClick={() => router.push("/admin/case-studies")}>Cancel</Button>
      </div>
    </form>
  );
}
