import { z } from "zod";
import { Status } from "@/lib/generated/prisma";

const contentItemSchema = z.object({
  title: z.string().trim().min(1, "Enter a title"),
  description: z.string().trim(),
  source: z.string().trim().optional(),
});

export const caseStudyContentSchema = z.object({
  industryLabel: z.string().trim().min(1, "Enter an industry label"),
  heroTitle: z.string().trim().min(1, "Enter a case study title"),
  summary: z.string().trim().min(1, "Enter a summary"),
  heroImagePath: z.string().trim(),
  clientOverviewTitle: z.string().trim().min(1),
  clientOverview: z.string().trim().min(1, "Enter a client overview"),
  challengeTitle: z.string().trim().min(1),
  challenge: z.string().trim().min(1, "Describe the business challenge"),
  objectivesTitle: z.string().trim().min(1),
  objectives: z.string().trim().min(1, "Describe the objectives"),
  solutionTitle: z.string().trim().min(1),
  solution: z.string().trim().min(1, "Describe the solution"),
  resultsTitle: z.string().trim().min(1),
  results: z.array(contentItemSchema),
  takeawaysTitle: z.string().trim().min(1),
  takeaways: z.string().trim().min(1, "Enter key takeaways"),
  ctaTitle: z.string().trim().min(1),
  ctaDescription: z.string().trim().min(1),
  ctaButtonLabel: z.string().trim().min(1),
  ctaButtonHref: z.string().trim(),
});

export const insightContentSchema = z.object({
  category: z.string().trim().min(1, "Enter a topic category"),
  heroTitle: z.string().trim().min(1, "Enter an insight title"),
  summary: z.string().trim().min(1, "Enter a summary"),
  heroImagePath: z.string().trim(),
  executiveSummaryTitle: z.string().trim().min(1),
  executiveSummary: z.string().trim().min(1, "Enter an executive summary"),
  introductionTitle: z.string().trim().min(1),
  introduction: z.string().trim().min(1, "Enter an introduction"),
  trendsTitle: z.string().trim().min(1),
  trends: z.array(contentItemSchema),
  viewpointTitle: z.string().trim().min(1),
  viewpoint: z.string().trim().min(1, "Enter Pinnacle Serve's point of view"),
  ctaTitle: z.string().trim().min(1),
  ctaDescription: z.string().trim().min(1),
  ctaButtonLabel: z.string().trim().min(1),
  ctaButtonHref: z.string().trim(),
});

export const caseStudySchema = z.object({
  name: z.string().trim().min(1, "Enter a case study name").max(160),
  slug: z.string().trim().min(1).regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/),
  status: z.enum([Status.ACTIVE, Status.INACTIVE]),
  content: caseStudyContentSchema,
});

export const insightSchema = z.object({
  name: z.string().trim().min(1, "Enter an insight name").max(160),
  slug: z.string().trim().min(1).regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/),
  status: z.enum([Status.ACTIVE, Status.INACTIVE]),
  content: insightContentSchema,
});

export type EditorialItem = z.infer<typeof contentItemSchema>;
export type CaseStudyContent = z.infer<typeof caseStudyContentSchema>;
export type InsightContent = z.infer<typeof insightContentSchema>;
export type CaseStudyInput = z.infer<typeof caseStudySchema>;
export type InsightInput = z.infer<typeof insightSchema>;

export const defaultCaseStudyContent: CaseStudyContent = {
  industryLabel: "Healthcare | Operations Management",
  heroTitle: "Transforming Operational Efficiency Through Scalable Business Support",
  summary:
    "A representative engagement showing how reliable operational support can help teams improve consistency, service levels, and capacity.",
  heroImagePath: "/welcoming-moments.png",
  clientOverviewTitle: "About The Client",
  clientOverview:
    "The client is a healthcare organization managing high-volume administrative workflows across a complex operating environment. Client identity can be anonymized.",
  challengeTitle: "The Challenge",
  challenge:
    "Manual processing, fragmented handoffs, and uneven workload visibility created bottlenecks, operating costs, and service risks.",
  objectivesTitle: "What Needed to Change?",
  objectives:
    "Improve processing consistency, reduce turnaround time, strengthen service-level performance, and build a delivery model that could scale.",
  solutionTitle: "Our Approach",
  solution:
    "We aligned trained operational resources with documented workflows, quality checks, exception handling, and reporting to support continuous improvement.",
  resultsTitle: "Measurable Impact",
  results: [
    { title: "Improved efficiency", description: "Simplified workflows and clearer ownership." },
    { title: "Reduced processing time", description: "More predictable handling and fewer avoidable delays." },
    { title: "Better SLAs", description: "Improved visibility into commitments and exceptions." },
    { title: "Higher productivity", description: "Teams focused effort on higher-value work." },
    { title: "Cost optimization", description: "A flexible model aligned capacity to business demand." },
  ],
  takeawaysTitle: "What Made the Difference?",
  takeaways:
    "Clear process ownership, active collaboration with client teams, consistent quality checks, and useful performance visibility supported sustainable change.",
  ctaTitle: "Have a Similar Business Challenge?",
  ctaDescription:
    "Let's explore how Pinnacle Serve can help you achieve better operational outcomes.",
  ctaButtonLabel: "Talk to Our Team",
  ctaButtonHref: "/contact",
};

export const defaultInsightContent: InsightContent = {
  category: "AI and Automation",
  heroTitle: "How AI and Automation Are Transforming Business Operations",
  summary:
    "A practical perspective on applying AI and automation to improve workflows while keeping quality, accountability, and people in view.",
  heroImagePath: "/welcoming-moments.png",
  executiveSummaryTitle: "At a Glance",
  executiveSummary:
    "AI and automation can help organizations improve selected workflows when they are applied to well-understood tasks with appropriate controls. This insight explains why the topic matters, what is changing, and how to approach adoption responsibly.",
  introductionTitle: "Understanding the Context",
  introduction:
    "Organizations are responding to growing service expectations, rising operational complexity, and pressure to make better use of data. AI and automation offer new options, but effective adoption starts with understanding the work, users, and business environment.",
  trendsTitle: "What's Changing?",
  trends: [
    {
      title: "Emerging trends",
      description: "AI assistants and workflow automation are increasingly being combined to support knowledge-intensive processes.",
      source: "",
    },
    {
      title: "Developments",
      description: "Organizations are placing greater emphasis on governance, evaluation, monitoring, and human review.",
      source: "",
    },
    {
      title: "Business readiness",
      description: "Data quality, process clarity, and change management remain essential to achieving useful outcomes.",
      source: "",
    },
  ],
  viewpointTitle: "Our Point of View",
  viewpoint:
    "Start with a specific business need, not a technology demonstration. Map the workflow, identify where assistance can be safely introduced, define measurable outcomes, and keep accountable people involved in decisions that need judgment.",
  ctaTitle: "Let's Explore What's Possible",
  ctaDescription:
    "Interested in applying these ideas to your business? Connect with Pinnacle Serve.",
  ctaButtonLabel: "Talk to Our Team",
  ctaButtonHref: "/contact",
};

function parseWithFallback<T>(
  value: string,
  schema: z.ZodType<T>,
  fallback: T,
): T {
  try {
    const result = schema.safeParse(JSON.parse(value));
    return result.success ? result.data : fallback;
  } catch {
    return fallback;
  }
}

export const parseCaseStudyContent = (value: string) =>
  parseWithFallback(value, caseStudyContentSchema, defaultCaseStudyContent);

export const parseInsightContent = (value: string) =>
  parseWithFallback(value, insightContentSchema, defaultInsightContent);
