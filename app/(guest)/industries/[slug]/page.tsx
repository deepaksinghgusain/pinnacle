import { notFound } from "next/navigation";
import EditorialPage from "@/components/shared/EditorialPage";

const industries = {
  healthcare: {
    title: "Healthcare",
    introduction:
      "Improve patient and payer operations with connected workflows that support timely service, accurate information, and appropriate human review.",
    sections: [
      {
        heading: "Where teams need support",
        paragraphs: [
          "Healthcare workflows span patient access, claims, coding, prior authorization, and follow-up. Disconnected tools and manual handoffs can make work harder to coordinate.",
          "Teams need processes that protect sensitive information and keep clinical or financial decisions with the right people.",
        ],
      },
      {
        heading: "How we can help",
        paragraphs: [
          "Combine revenue cycle operations, data services, workflow automation, and AI-assisted review to help reduce avoidable friction.",
          "Design clear exception paths, governance, and performance visibility around the way each organization works.",
        ],
      },
    ],
    cta: { label: "Explore RCM as a Service", href: "/service/rcm" },
  },
  banking: {
    title: "Banking",
    introduction:
      "Support financial operations with reliable workflows that connect customer service, risk processes, and operational data.",
    sections: [
      {
        heading: "Where teams need support",
        paragraphs: [
          "Customer onboarding, account servicing, fraud review, and compliance activities depend on accurate information and well-managed casework.",
          "High-volume operations need consistent processing while preserving appropriate controls and human decision-making.",
        ],
      },
      {
        heading: "How we can help",
        paragraphs: [
          "Use automation, data services, and operational support to coordinate work across existing systems.",
          "Improve visibility into queues and handoffs, with review and escalation designed around your policies.",
        ],
      },
    ],
    cta: { label: "Explore banking finance support", href: "/service/banking-finance-support" },
  },
  telecom: {
    title: "Telecom",
    introduction:
      "Help telecom teams coordinate network operations, field service, and customer care across complex, always-on environments.",
    sections: [
      {
        heading: "Where teams need support",
        paragraphs: [
          "Network incidents and service requests can cross teams, tools, and locations before reaching resolution.",
          "Clear ownership, current information, and consistent customer communication are essential to dependable service.",
        ],
      },
      {
        heading: "How we can help",
        paragraphs: [
          "Connect service workflows with automation, analytics, and managed operational support.",
          "Give teams useful visibility into requests and handoffs while keeping people involved in important decisions.",
        ],
      },
    ],
    cta: { label: "Explore managed services", href: "/service/managed-services" },
  },
  retail: {
    title: "Retail",
    introduction:
      "Connect commerce, inventory, and customer support workflows to help retail teams respond to changing customer and operational needs.",
    sections: [
      {
        heading: "Where teams need support",
        paragraphs: [
          "Retail operations coordinate information across stores, digital channels, fulfillment, and customer service.",
          "Fragmented processes can make it difficult for teams to maintain consistent service and useful inventory visibility.",
        ],
      },
      {
        heading: "How we can help",
        paragraphs: [
          "Use digital product engineering, data, and automation to improve how information moves across retail workflows.",
          "Shape the solution around existing platforms and the experiences teams want to create for customers.",
        ],
      },
    ],
    cta: { label: "Explore digital product engineering", href: "/service/digital-product-engineering" },
  },
  manufacturing: {
    title: "Manufacturing",
    introduction:
      "Support manufacturing operations with connected processes that help teams coordinate production, quality, maintenance, and supply-chain work.",
    sections: [
      {
        heading: "Where teams need support",
        paragraphs: [
          "Production and maintenance rely on timely operational information and clear coordination between teams and systems.",
          "Manual reporting and disconnected workflows can make it harder to spot exceptions and follow work through.",
        ],
      },
      {
        heading: "How we can help",
        paragraphs: [
          "Connect cloud, data, analytics, and workflow services to improve operational visibility and process consistency.",
          "Build practical solutions that complement existing systems and support continuous improvement.",
        ],
      },
    ],
    cta: { label: "Explore reporting & analytics", href: "/service/reporting-analytics" },
  },
} as const;

export function generateStaticParams() {
  return Object.keys(industries).map((slug) => ({ slug }));
}

export default async function IndustryPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const industry = industries[slug as keyof typeof industries];

  if (!industry) notFound();

  return (
    <EditorialPage
      breadcrumb={{ label: "Industry", href: "/customer-delight#case-studies" }}
      eyebrow="Industry experience"
      {...industry}
    />
  );
}
