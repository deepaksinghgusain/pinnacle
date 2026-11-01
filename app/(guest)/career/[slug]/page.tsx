import { notFound } from "next/navigation";
import EditorialPage from "@/components/shared/EditorialPage";

const pages = {
  culture: {
    title: "Our culture",
    introduction:
      "We bring people together around practical problem-solving, thoughtful collaboration, and work that helps clients make progress.",
    sections: [
      {
        heading: "Work together across disciplines",
        paragraphs: [
          "Our projects connect engineering, data, design, AI, and operational perspectives.",
          "Sharing context and learning from one another helps teams create solutions that fit real needs.",
        ],
      },
      {
        heading: "Make a meaningful contribution",
        paragraphs: [
          "We value people who take ownership, stay curious, and care about the quality and usefulness of their work.",
          "Explore our open positions to find opportunities to contribute.",
        ],
      },
    ],
    cta: { label: "View open positions", href: "/career#open-positions" },
  },
  "growth-and-learning": {
    title: "Growth and learning",
    introduction:
      "Working on varied technology and operations challenges creates opportunities to build skills, share knowledge, and take on new responsibilities.",
    sections: [
      {
        heading: "Learn through meaningful work",
        paragraphs: [
          "Our teams work across modern engineering, data, automation, AI, and client operations.",
          "Each role offers a chance to deepen expertise while collaborating with people across disciplines.",
        ],
      },
      {
        heading: "Bring your curiosity",
        paragraphs: [
          "We look for people who are ready to learn, ask good questions, and contribute to solving practical problems.",
          "Explore current roles and see where your experience could make a difference.",
        ],
      },
    ],
    cta: { label: "View open positions", href: "/career#open-positions" },
  },
} as const;

export function generateStaticParams() {
  return Object.keys(pages).map((slug) => ({ slug }));
}

export default async function CareerDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const page = pages[slug as keyof typeof pages];

  if (!page) notFound();

  return (
    <EditorialPage
      breadcrumb={{ label: "Careers", href: "/career" }}
      eyebrow="Careers"
      {...page}
    />
  );
}
