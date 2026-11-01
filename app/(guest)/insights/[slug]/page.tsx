import { notFound } from "next/navigation";
import EditorialPage from "@/components/shared/EditorialPage";

const pages = {
  "latest-updates": {
    title: "Latest updates",
    introduction:
      "Updates from Pinnacle Serve will appear here. In the meantime, explore our work and capabilities or contact us with a specific enquiry.",
    sections: [
      {
        heading: "What we are focused on",
        paragraphs: [
          "We work across AI, digital product engineering, cloud, data, automation, and operational services.",
          "Our focus is on applying these capabilities to real workflows and measurable business needs.",
        ],
      },
      {
        heading: "Stay in touch",
        paragraphs: [
          "For company, service, or partnership enquiries, our team can help you find the right information.",
          "We will share announcements here as updates become available.",
        ],
      },
    ],
    cta: { label: "Contact Pinnacle Serve", href: "/contact" },
  },
  "ai-and-automation": {
    title: "AI and automation",
    introduction:
      "AI and automation can help teams improve complex workflows when they are applied to the right tasks with clear controls and human oversight.",
    sections: [
      {
        heading: "Choose the right work",
        paragraphs: [
          "Start by understanding the process, its users, exceptions, and the decisions that require human judgment.",
          "This helps distinguish opportunities for conventional automation from those where AI may add value.",
        ],
      },
      {
        heading: "Design for responsible operation",
        paragraphs: [
          "Reliable solutions need monitoring, clear ownership, and a way to review and improve outcomes.",
          "Explore our AI and automation capabilities to see how we help organizations plan and deliver these solutions.",
        ],
      },
    ],
    cta: { label: "Explore AI services", href: "/service/ai-services" },
  },
  "digital-transformation": {
    title: "Digital transformation",
    introduction:
      "Digital transformation is most effective when technology changes are connected to the needs of users and the everyday work of the organization.",
    sections: [
      {
        heading: "Begin with the outcome",
        paragraphs: [
          "A clear understanding of goals, existing systems, and user needs gives transformation work a practical direction.",
          "Teams can then prioritize the platforms, experiences, and process changes that matter most.",
        ],
      },
      {
        heading: "Deliver and keep improving",
        paragraphs: [
          "Modern engineering practices support dependable delivery, adoption, and iteration after launch.",
          "Our product engineering teams work with clients from strategy and design through implementation.",
        ],
      },
    ],
    cta: {
      label: "Explore digital product engineering",
      href: "/service/digital-product-engineering",
    },
  },
  "cloud-and-data": {
    title: "Cloud and data",
    introduction:
      "Cloud platforms and trusted data foundations help organizations build resilient services, improve visibility, and make better-informed decisions.",
    sections: [
      {
        heading: "Build a resilient cloud foundation",
        paragraphs: [
          "Architecture, migration, security, and operations should work together to support reliability and growth.",
          "A clear cloud strategy also considers how platforms are managed and optimized over time.",
        ],
      },
      {
        heading: "Make data useful and trusted",
        paragraphs: [
          "Well-managed data and clear governance help teams build reporting and analytics they can use with confidence.",
          "Explore our cloud engineering and data services to learn about these capabilities.",
        ],
      },
    ],
    cta: { label: "Explore cloud engineering", href: "/service/cloud-engineering" },
  },
} as const;

export function generateStaticParams() {
  return Object.keys(pages).map((slug) => ({ slug }));
}

export default async function InsightPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const page = pages[slug as keyof typeof pages];

  if (!page) notFound();

  return (
    <EditorialPage
      breadcrumb={{ label: "Our Thinking", href: "/customer-delight" }}
      eyebrow="Our Thinking"
      {...page}
    />
  );
}
