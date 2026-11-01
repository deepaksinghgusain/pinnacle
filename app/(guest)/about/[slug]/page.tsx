import { notFound } from "next/navigation";
import EditorialPage from "@/components/shared/EditorialPage";

const pages = {
  beliefs: {
    title: "What we believe in",
    introduction:
      "Technology should make important work better. We focus on practical progress that helps people, strengthens operations, and creates outcomes organizations can see.",
    sections: [
      {
        heading: "Start with people and purpose",
        paragraphs: [
          "Useful solutions begin with understanding the people doing the work and the people they serve.",
          "We shape technology around real needs rather than adding complexity for its own sake.",
        ],
      },
      {
        heading: "Make progress practical",
        paragraphs: [
          "Good ideas need a clear path from discovery to delivery and ongoing improvement.",
          "We bring operations and technology together so teams can move forward with clarity.",
        ],
      },
    ],
    cta: { label: "Explore our approach", href: "/about#pinnacle-approach" },
  },
  "future-vision": {
    title: "Future vision",
    introduction:
      "We see a future where thoughtful technology helps teams spend less time navigating complexity and more time delivering meaningful service.",
    sections: [
      {
        heading: "Technology that works together",
        paragraphs: [
          "Connected platforms, trusted data, automation, and AI can help organizations improve how work flows across teams.",
          "Progress depends on solutions that fit existing operations and can adapt as needs change.",
        ],
      },
      {
        heading: "Progress with people in the loop",
        paragraphs: [
          "The strongest outcomes combine technology with human judgment, clear ownership, and responsible oversight.",
          "Our aim is to help clients take deliberate steps toward more capable and resilient operations.",
        ],
      },
    ],
    cta: { label: "See what we do", href: "/#our-services" },
  },
  team: {
    title: "Meet our team",
    introduction:
      "Our work brings together people across engineering, data, design, automation, and business operations to solve practical client challenges.",
    sections: [
      {
        heading: "Different disciplines, shared goals",
        paragraphs: [
          "Product and engineering teams work alongside operations specialists to understand the full context of a challenge.",
          "That mix helps connect a sound technical solution with the way people use and support it.",
        ],
      },
      {
        heading: "Build your future with us",
        paragraphs: [
          "We value curiosity, thoughtful collaboration, and a commitment to making work better.",
          "Explore current opportunities and learn more about working at Pinnacle Serve.",
        ],
      },
    ],
    cta: { label: "Explore careers", href: "/career" },
  },
  "responsible-technology": {
    title: "Responsible technology",
    introduction:
      "Responsible technology starts with clear purpose, careful design, and appropriate human oversight throughout the life of a solution.",
    sections: [
      {
        heading: "Designed with accountability",
        paragraphs: [
          "We consider how systems use data, how decisions are made, and who is accountable for outcomes.",
          "For AI-enabled workflows, governance and human review should be matched to the risks and context of the work.",
        ],
      },
      {
        heading: "Built to be understood and improved",
        paragraphs: [
          "Clear processes, monitoring, and feedback help teams identify issues and improve systems over time.",
          "The right safeguards depend on each client's environment, obligations, and use case.",
        ],
      },
    ],
    cta: { label: "Talk to our team", href: "/contact" },
  },
  "privacy-security": {
    title: "Privacy & security",
    introduction:
      "Privacy and security are important considerations when designing and operating technology. The right controls depend on the data, systems, and obligations involved.",
    sections: [
      {
        heading: "Consider privacy from the start",
        paragraphs: [
          "Understanding what information a workflow uses helps teams make informed choices about access, handling, and retention.",
          "We encourage clients to involve the appropriate privacy and compliance stakeholders as solutions are planned.",
        ],
      },
      {
        heading: "Plan for secure operations",
        paragraphs: [
          "Security needs to be considered across architecture, implementation, access, and ongoing operations.",
          "For questions about a specific engagement or policy, contact our team so we can direct your enquiry appropriately.",
        ],
      },
    ],
    cta: { label: "Contact us", href: "/contact" },
  },
} as const;

export function generateStaticParams() {
  return Object.keys(pages).map((slug) => ({ slug }));
}

export default async function AboutDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const page = pages[slug as keyof typeof pages];

  if (!page) notFound();

  return (
    <EditorialPage
      breadcrumb={{ label: "Who we are", href: "/about" }}
      eyebrow="Who we are"
      {...page}
    />
  );
}
