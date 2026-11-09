export type CultureItem = {
  title: string;
  description: string;
};

export type CultureContent = {
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
  pillars: CultureItem[];
  practiceEyebrow: string;
  practiceTitle: string;
  practiceDescription: string;
  practices: CultureItem[];
  ctaEyebrow: string;
  ctaTitle: string;
  ctaDescription: string;
  ctaButtonLabel: string;
  ctaButtonHref: string;
};

export const defaultCultureContent: CultureContent = {
  heroEyebrow: "Careers at Pinnacle Serve",
  heroTitle: "A workplace built on",
  heroAccent: "people and shared purpose.",
  heroDescription:
    "Our office culture is shaped by how we treat one another every day: with respect, open communication, and a willingness to work together.",
  heroPrimaryLabel: "Explore open roles",
  heroPrimaryHref: "/career#open-positions",
  heroSecondaryLabel: "What matters to us",
  heroSecondaryHref: "#culture-in-practice",
  heroNote:
    "A positive workplace is something we create together, one conversation and commitment at a time.",
  heroImagePath: "/welcoming-moments.png",
  heroImageAlt:
    "Colleagues greeting one another in a bright, collaborative office",
  heroImageBadge: "Respect. Trust. Teamwork.",
  heroImageCardTitle: "Better together",
  heroImageCardDescription:
    "A culture takes shape in the way we work with each other.",
  introEyebrow: "The way we work",
  introTitle: "Culture is built in the everyday.",
  introDescription:
    "It shows up in how we welcome ideas, communicate through challenges, recognize our shared responsibilities, and make space for people to do their best work. We keep working to create an environment where teammates feel respected and included.",
  pillars: [
    {
      title: "Work as one team",
      description:
        "We bring people together across roles and perspectives, sharing context so everyone can contribute to the work.",
    },
    {
      title: "Communicate with respect",
      description:
        "Thoughtful conversations, clear expectations, and listening to one another help make collaboration more effective.",
    },
    {
      title: "Take shared ownership",
      description:
        "We support one another, follow through on commitments, and care about the quality of what we deliver together.",
    },
  ],
  practiceEyebrow: "Culture in practice",
  practiceTitle: "The small things shape the experience.",
  practiceDescription:
    "A healthy team environment grows through consistent actions and consideration for the people we work with.",
  practices: [
    {
      title: "Make room for every perspective",
      description:
        "Different experiences can reveal better questions and stronger ways forward. We value the contribution each person brings.",
    },
    {
      title: "Help one another succeed",
      description:
        "Sharing information and offering support makes it easier for teammates to do good work and move through challenges.",
    },
    {
      title: "Keep the work human",
      description:
        "Behind every task is a person. We aim to work with empathy, professionalism, and consideration for the people around us.",
    },
  ],
  ctaEyebrow: "Find your place",
  ctaTitle: "Bring your perspective to the team.",
  ctaDescription:
    "Explore current opportunities and see where you could contribute to our workplace and shared work.",
  ctaButtonLabel: "View open positions",
  ctaButtonHref: "/career#open-positions",
};

function isRecord(value: unknown): value is Record<string, unknown> {
  return Boolean(value && typeof value === "object" && !Array.isArray(value));
}

function parseItems(value: unknown): CultureItem[] | null {
  if (!Array.isArray(value)) return null;
  const parsed: CultureItem[] = [];

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

export function parseCultureContent(
  value: string | null | undefined,
): CultureContent {
  if (!value?.trim()) return defaultCultureContent;

  try {
    const parsed: unknown = JSON.parse(value);
    if (!isRecord(parsed)) return defaultCultureContent;

    const content = { ...defaultCultureContent };
    for (const key of Object.keys(content) as (keyof CultureContent)[]) {
      if (key === "pillars" || key === "practices") continue;
      const field = parsed[key];
      if (typeof field === "string") content[key] = field;
    }

    const pillars = parseItems(parsed.pillars);
    const practices = parseItems(parsed.practices);
    if (pillars) content.pillars = pillars;
    if (practices) content.practices = practices;
    return content;
  } catch {
    return defaultCultureContent;
  }
}

export function validateCultureContent(
  value: unknown,
): value is CultureContent {
  if (!isRecord(value)) return false;
  const stringKeys = Object.keys(defaultCultureContent).filter(
    (key) => key !== "pillars" && key !== "practices",
  );
  return (
    stringKeys.every((key) => typeof value[key] === "string") &&
    parseItems(value.pillars) !== null &&
    parseItems(value.practices) !== null
  );
}
