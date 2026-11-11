import { z } from "zod";
import { Status } from "@/lib/generated/prisma";

export const industryItemSchema = z.object({
  title: z.string().trim().min(1, "Enter a title"),
  description: z.string().trim(),
  href: z.string().trim().optional(),
});

export const industryContentSchema = z.object({
  heroTitle: z.string().trim().min(1, "Enter a hero title"),
  heroDescription: z.string().trim().min(1, "Enter a hero description"),
  heroImagePath: z.string().trim(),
  heroPrimaryLabel: z.string().trim().min(1, "Enter a primary button label"),
  heroPrimaryHref: z.string().trim(),
  heroSecondaryLabel: z.string().trim().min(1, "Enter a secondary button label"),
  heroSecondaryHref: z.string().trim(),
  overviewTitle: z.string().trim().min(1, "Enter an overview title"),
  overviewDescription: z.string().trim().min(1, "Enter an overview"),
  challengesTitle: z.string().trim().min(1, "Enter a challenges title"),
  challenges: z.array(industryItemSchema),
  solutionsTitle: z.string().trim().min(1, "Enter a solutions title"),
  solutionsDescription: z.string().trim(),
  solutions: z.array(industryItemSchema),
  capabilitiesTitle: z.string().trim().min(1, "Enter a capabilities title"),
  capabilities: z.array(industryItemSchema),
  outcomesTitle: z.string().trim().min(1, "Enter an outcomes title"),
  outcomes: z.array(industryItemSchema),
});

export const industrySchema = z.object({
  name: z.string().trim().min(1, "Enter an industry name").max(100),
  slug: z
    .string()
    .trim()
    .min(1, "Enter a URL slug")
    .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, "Use lowercase letters, numbers, and hyphens"),
  status: z.enum([Status.ACTIVE, Status.INACTIVE]),
  content: industryContentSchema,
});

export type IndustryItem = z.infer<typeof industryItemSchema>;
export type IndustryContent = z.infer<typeof industryContentSchema>;
export type IndustryInput = z.infer<typeof industrySchema>;

export const defaultIndustryContent: IndustryContent = {
  heroTitle: "Transforming Healthcare Operations",
  heroDescription:
    "Driving operational excellence through intelligent, scalable and reliable business support solutions.",
  heroImagePath: "/welcoming-moments.png",
  heroPrimaryLabel: "Explore our Solutions",
  heroPrimaryHref: "#our-solutions",
  heroSecondaryLabel: "Talk to our Team",
  heroSecondaryHref: "/contact",
  overviewTitle: "Understanding the Industry",
  overviewDescription:
    "Healthcare organizations operate in a complex business environment shaped by changing regulations, rising service expectations, and rapid market developments. Coordinating people, processes, and technology is essential to reliable patient and business operations.",
  challengesTitle: "Challenges Businesses Face",
  challenges: [
    { title: "Operational complexity", description: "" },
    { title: "Rising costs", description: "" },
    { title: "Skills constraints", description: "" },
    { title: "Technology integrations", description: "" },
    { title: "Changing requirements", description: "" },
    { title: "Limited operational visibility", description: "" },
  ],
  solutionsTitle: "How We Help",
  solutionsDescription:
    "Services and capabilities that address the specific challenges of this industry.",
  solutions: [
    {
      title: "Operational support",
      description:
        "Reliable teams and structured workflows for recurring, high-volume work.",
      href: "/service/managed-services",
    },
    {
      title: "Technology and automation",
      description:
        "Practical digital solutions that connect systems and reduce manual handoffs.",
      href: "/service/automation-services",
    },
    {
      title: "Data and reporting",
      description:
        "Clearer operational insight to support informed decisions and continuous improvement.",
      href: "/service/reporting-analytics",
    },
  ],
  capabilitiesTitle: "Our Industry Capabilities",
  capabilities: [
    {
      title: "Operational expertise",
      description: "Industry-aware teams for complex day-to-day operations.",
    },
    {
      title: "Technology",
      description: "Engineering, data, cloud, and automation capabilities.",
    },
    {
      title: "People and processes",
      description: "Skilled teams supported by clear ownership and repeatable workflows.",
    },
    {
      title: "Delivery capabilities",
      description: "Flexible delivery designed to support quality and scale.",
    },
  ],
  outcomesTitle: "Creating Measurable Business Impact",
  outcomes: [
    {
      title: "Zero-error operations",
      description: "Quality controls that help reduce avoidable errors.",
    },
    {
      title: "Operational efficiencies",
      description: "Streamlined workflows that make better use of time and resources.",
    },
    {
      title: "Better service levels",
      description: "Clear accountability and useful visibility into service commitments.",
    },
    {
      title: "Scalable delivery",
      description: "Delivery models that can adapt as business needs change.",
    },
  ],
};

export function parseIndustryContent(value: string): IndustryContent {
  try {
    const parsed: unknown = JSON.parse(value);
    const result = industryContentSchema.safeParse(parsed);
    return result.success ? result.data : defaultIndustryContent;
  } catch {
    return defaultIndustryContent;
  }
}
