import { notFound } from "next/navigation";
import EditorialPage from "@/components/shared/EditorialPage";

const caseStudies = {
  healthcare: {
    title: "Healthcare workflow outcomes",
    introduction:
      "A representative look at how connected revenue-cycle workflows can help healthcare teams coordinate claims, coding, and review.",
    sections: [
      {
        heading: "The opportunity",
        paragraphs: [
          "Claims and related administrative work can involve multiple systems, repeated information gathering, and exceptions that need specialist attention.",
          "A coordinated workflow can make work status clearer and route complex cases to the right reviewers.",
        ],
      },
      {
        heading: "A practical approach",
        paragraphs: [
          "Map the existing process, identify suitable automation opportunities, and connect them to the systems teams already use.",
          "Keep human review, governance, and operational reporting in place for sensitive or exception-driven decisions.",
        ],
      },
    ],
    cta: { label: "Explore healthcare", href: "/industries/healthcare" },
  },
  banking: {
    title: "Banking operations outcomes",
    introduction:
      "A representative look at how structured case workflows can support banking operations that depend on accurate review and clear controls.",
    sections: [
      {
        heading: "The opportunity",
        paragraphs: [
          "Teams handling onboarding, service requests, and operational reviews need reliable case information and clear next steps.",
          "Consistent workflows can help make handoffs easier to follow without replacing policy-led judgment.",
        ],
      },
      {
        heading: "A practical approach",
        paragraphs: [
          "Bring process mapping, workflow automation, and useful operational reporting together around existing systems.",
          "Design permissions, escalations, and human review to reflect the organization’s risk and compliance requirements.",
        ],
      },
    ],
    cta: { label: "Explore banking", href: "/industries/banking" },
  },
  telecom: {
    title: "Telecom service outcomes",
    introduction:
      "A representative look at how coordinated service workflows can help telecom teams manage requests across network, field, and customer operations.",
    sections: [
      {
        heading: "The opportunity",
        paragraphs: [
          "A service issue may pass between customer support, network operations, and field teams before it is resolved.",
          "Shared context and visible ownership can help teams coordinate the next action and keep customers informed.",
        ],
      },
      {
        heading: "A practical approach",
        paragraphs: [
          "Connect intake, triage, assignment, and status updates into workflows that reflect operational responsibilities.",
          "Use reporting to identify recurring bottlenecks and guide continual improvement.",
        ],
      },
    ],
    cta: { label: "Explore telecom", href: "/industries/telecom" },
  },
  retail: {
    title: "Retail experience outcomes",
    introduction:
      "A representative look at how connected commerce and support workflows can help retail teams coordinate customer and operational needs.",
    sections: [
      {
        heading: "The opportunity",
        paragraphs: [
          "Customer questions, order updates, inventory information, and fulfillment activities often span several platforms.",
          "Bringing relevant context together can help teams respond consistently across channels.",
        ],
      },
      {
        heading: "A practical approach",
        paragraphs: [
          "Identify the information and handoffs needed for common customer journeys, then connect them through suitable integrations and automation.",
          "Use feedback and operational signals to refine the experience over time.",
        ],
      },
    ],
    cta: { label: "Explore retail", href: "/industries/retail" },
  },
  manufacturing: {
    title: "Manufacturing operations outcomes",
    introduction:
      "A representative look at how connected operational information can help manufacturing teams coordinate quality, maintenance, and production work.",
    sections: [
      {
        heading: "The opportunity",
        paragraphs: [
          "Production, maintenance, and quality teams rely on current information to coordinate activity and respond to exceptions.",
          "Clearer workflows can help make ownership and status easier to understand across shifts and functions.",
        ],
      },
      {
        heading: "A practical approach",
        paragraphs: [
          "Review existing systems and processes, then prioritize useful integrations, reporting, and workflow improvements.",
          "Keep operational teams involved in design so solutions fit the realities of the plant floor.",
        ],
      },
    ],
    cta: { label: "Explore manufacturing", href: "/industries/manufacturing" },
  },
} as const;

export function generateStaticParams() {
  return Object.keys(caseStudies).map((slug) => ({ slug }));
}

export default async function CaseStudyPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const caseStudy = caseStudies[slug as keyof typeof caseStudies];

  if (!caseStudy) notFound();

  return (
    <EditorialPage
      breadcrumb={{ label: "Case Studies", href: "/customer-delight#case-studies" }}
      eyebrow="Illustrative engagement"
      note="These examples describe representative workflows and possible approaches. They are not claims about a named client engagement or measured customer results."
      {...caseStudy}
    />
  );
}
