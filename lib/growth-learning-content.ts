export type GrowthLearningPillar = {
  title: string;
  description: string;
};

export type GrowthLearningStep = {
  title: string;
  description: string;
};

export type GrowthLearningContent = {
  heroEyebrow: string;
  heroTitle: string;
  heroAccent: string;
  heroDescription: string;
  heroPrimaryLabel: string;
  heroPrimaryHref: string;
  heroSecondaryLabel: string;
  heroSecondaryHref: string;
  heroNote: string;
  heroImagePath: string;
  heroImageAlt: string;
  heroImageBadge: string;
  heroImageCardTitle: string;
  heroImageCardDescription: string;
  introEyebrow: string;
  introTitle: string;
  introDescription: string;
  pillars: GrowthLearningPillar[];
  stepsEyebrow: string;
  stepsTitle: string;
  stepsDescription: string;
  steps: GrowthLearningStep[];
  ctaEyebrow: string;
  ctaTitle: string;
  ctaDescription: string;
  ctaButtonLabel: string;
  ctaButtonHref: string;
};

export const defaultGrowthLearningContent: GrowthLearningContent = {
  heroEyebrow: "Careers at Pinnacle Serve",
  heroTitle: "Grow through the work.",
  heroAccent: "Keep learning together.",
  heroDescription:
    "Working on varied technology and operations challenges creates opportunities to build skills, share knowledge, and take on new responsibilities.",
  heroPrimaryLabel: "Explore open roles",
  heroPrimaryHref: "/career#open-positions",
  heroSecondaryLabel: "How learning happens",
  heroSecondaryHref: "#how-we-grow",
  heroNote:
    "We believe growth is built through meaningful work, shared knowledge, and the willingness to keep improving.",
  heroImagePath: "/welcoming-moments.png",
  heroImageAlt: "Colleagues welcoming a new team member in a bright workplace",
  heroImageBadge: "Curiosity in. Better work out.",
  heroImageCardTitle: "The way we grow",
  heroImageCardDescription:
    "Real challenges. Shared perspective. Progress that lasts.",
  introEyebrow: "A practical approach",
  introTitle: "Learning is part of how we do the work.",
  introDescription:
    "Our teams work across modern engineering, data, automation, AI, and client operations. Every project brings its own context. We make room to build expertise, learn from one another, and contribute with care—without treating development as a one-size-fits-all path.",
  pillars: [
    {
      title: "Learn by doing",
      description:
        "Build practical experience by contributing to real client and internal work, with opportunities to take on new challenges as your skills grow.",
    },
    {
      title: "Learn from each other",
      description:
        "Work across disciplines, share context, and learn from colleagues with different perspectives and areas of expertise.",
    },
    {
      title: "Keep asking better questions",
      description:
        "Bring curiosity to changing problems, explore new approaches, and turn useful ideas into thoughtful improvements.",
    },
  ],
  stepsEyebrow: "From experience to expertise",
  stepsTitle: "Make progress one challenge at a time.",
  stepsDescription:
    "Growth looks different for everyone. We value a thoughtful approach that connects learning to the work and the goals ahead.",
  steps: [
    {
      title: "Start with context",
      description:
        "Understand the people, goals, and constraints behind the work before choosing how to solve it.",
    },
    {
      title: "Build with a team",
      description:
        "Contribute your perspective, learn from teammates, and make progress through shared ownership.",
    },
    {
      title: "Reflect and grow",
      description:
        "Use feedback and experience to strengthen your craft and prepare for the next challenge.",
    },
  ],
  ctaEyebrow: "Your next chapter",
  ctaTitle: "Bring your curiosity. Build what’s next.",
  ctaDescription:
    "Explore current opportunities and find a role where your perspective and skills can make a difference.",
  ctaButtonLabel: "View open positions",
  ctaButtonHref: "/career#open-positions",
};

function isRecord(value: unknown): value is Record<string, unknown> {
  return Boolean(value && typeof value === "object" && !Array.isArray(value));
}

function parseItems(value: unknown): GrowthLearningPillar[] | null {
  if (!Array.isArray(value)) return null;
  const parsed: GrowthLearningPillar[] = [];

  for (const item of value) {
    if (
      !isRecord(item) ||
      typeof item.title !== "string" ||
      typeof item.description !== "string"
    ) {
      return null;
    }
    parsed.push({ title: item.title, description: item.description });
  }

  return parsed;
}

export function parseGrowthLearningContent(
  value: string | null | undefined,
): GrowthLearningContent {
  if (!value?.trim()) return defaultGrowthLearningContent;

  try {
    const parsed: unknown = JSON.parse(value);
    if (!isRecord(parsed)) return defaultGrowthLearningContent;

    const content = { ...defaultGrowthLearningContent };
    for (const key of Object.keys(content) as (keyof GrowthLearningContent)[]) {
      if (key === "pillars" || key === "steps") continue;
      const field = parsed[key];
      if (typeof field === "string") content[key] = field;
    }

    const pillars = parseItems(parsed.pillars);
    const steps = parseItems(parsed.steps);
    if (pillars) content.pillars = pillars;
    if (steps) content.steps = steps;
    return content;
  } catch {
    return defaultGrowthLearningContent;
  }
}

export function validateGrowthLearningContent(
  value: unknown,
): value is GrowthLearningContent {
  if (!isRecord(value)) return false;
  const stringKeys = Object.keys(defaultGrowthLearningContent).filter(
    (key) => key !== "pillars" && key !== "steps",
  );
  return (
    stringKeys.every((key) => typeof value[key] === "string") &&
    parseItems(value.pillars) !== null &&
    parseItems(value.steps) !== null
  );
}
