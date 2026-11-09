"use client";

import { useState, useTransition } from "react";
import { Loader2, Plus, Save, Trash2 } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { saveAboutPageSettings } from "@/lib/actions/settings-action";
import type { SiteSettings } from "@/lib/generated/prisma";

const storyCards = [
  {
    title: "Technology with a purpose",
    description:
      "We connect technology to the work that matters: better service, less manual effort, stronger controls, and more efficient operations.",
  },
  {
    title: "Built for real teams",
    description:
      "Good change is ambitious and usable. We build reliable, secure systems that teams can adopt, manage, and keep improving.",
  },
  {
    title: "Focused on results",
    description:
      "We shape each engagement around the needs of its industry and the results that matter most to the organization.",
  },
];

const approachTabs = [
  { id: "founder", label: "Founder", paragraphs: [] },
  {
    id: "what-we-do",
    label: "Our Services",
    paragraphs: [
      "From discovery and design through implementation and operations, we help clients spot opportunities, build platforms, automate processes, and apply AI where it can make a difference.",
      "Our capabilities span digital product and cloud engineering, managed services, automation, data, AI, and agentic AI for industry workflows.",
      "We start with the business need, then bring together the right mix of people and technology to deliver a practical solution that can scale.",
    ],
  },
  {
    id: "our-approach",
    label: "How We Work",
    paragraphs: [
      "We begin by learning how the business works today: its goals, processes, users, and systems. Then we build a plan that addresses immediate needs and supports long-term progress.",
      "Clear roadmaps, modern architecture, secure delivery, and ongoing support help turn a sound idea into a dependable solution. We include governance and human oversight where they matter.",
      "Our approach brings clarity to complex environments and helps teams move from disconnected tasks to coordinated operations.",
    ],
  },
  {
    id: "our-strengths",
    label: "Industry Experience",
    paragraphs: [
      "Our work supports industries with complex, high-volume operations, including healthcare, banking, telecom, property, retail, and manufacturing.",
      "We support healthcare revenue cycle operations and governed AI; banking fraud, service, and compliance workflows; telecom network and field operations; and service, inventory, maintenance, and quality processes across other sectors.",
      "Every organization has its own workflows, risks, and priorities. We tailor our services to each industry and the results each client needs.",
    ],
  },
  {
    id: "why-clients",
    label: "Why Pinnacle Serve",
    paragraphs: [
      "Clients choose us to connect their plans to practical delivery and build solutions that fit the way their business works.",
      "Product, cloud, data, automation, AI, and ongoing support often need to work as one. Our teams coordinate those disciplines around shared goals.",
      "We focus on improvements teams can see: faster turnaround, less overhead, better service, stronger controls, and more resilient operations.",
    ],
  },
  {
    id: "our-commitment",
    label: "Our Promise",
    paragraphs: [
      "We design for reliability, security, scale, and maintainability from the start, then stay involved to support ongoing improvement.",
      "As business needs and customer expectations change, we help organizations adapt with services that connect strong engineering to day-to-day operations.",
      "Our goal is to make work better with digital services that are useful now and ready for what comes next.",
    ],
  },
];

type ApproachTab = {
  id: string;
  label: string;
  paragraphs: string[];
};

type StoryCard = {
  title: string;
  description: string;
};

type Leader = {
  name: string;
  role: string;
  paragraphs: string[];
  imagePath: string;
};

function getStoryCards(value?: string | null): StoryCard[] {
  if (!value?.trim()) return storyCards;

  try {
    const parsed: unknown = JSON.parse(value);
    if (!Array.isArray(parsed)) return storyCards;

    return parsed.flatMap((item): StoryCard[] => {
      if (!item || typeof item !== "object" || Array.isArray(item)) return [];
      const card = item as Record<string, unknown>;
      if (typeof card.title !== "string" || typeof card.description !== "string") return [];

      return [{ title: card.title, description: card.description }];
    });
  } catch {
    return storyCards;
  }
}

function getApproachTabs(value?: string | null): ApproachTab[] {
  if (!value?.trim()) return approachTabs;

  try {
    const parsed: unknown = JSON.parse(value);
    if (!Array.isArray(parsed)) return approachTabs;

    return parsed.flatMap((item): ApproachTab[] => {
      if (!item || typeof item !== "object" || Array.isArray(item)) return [];
      const tab = item as Record<string, unknown>;
      if (typeof tab.label !== "string") return [];

      return [{
        id: typeof tab.id === "string" ? tab.id : "",
        label: tab.label,
        paragraphs: Array.isArray(tab.paragraphs)
          ? tab.paragraphs.filter((paragraph): paragraph is string => typeof paragraph === "string")
          : [],
      }];
    });
  } catch {
    return approachTabs;
  }
}

const leaders = [
  {
    name: "Jhon Doe",
    role: "Chairman",
    paragraphs: [
      "Our leadership brings a practical understanding of the people, processes, and technology that make organizations work. We partner with teams to make change clear, useful, and sustainable.",
    ],
  },
  {
    name: "Jhon",
    role: "CEO",
    paragraphs: [
      "We bring operational support and modern technology together to help organizations improve service, simplify work, and grow with confidence.",
    ],
  },
];

function getLeaders(value?: string | null): Leader[] {
  if (!value?.trim()) {
    return leaders.map((leader) => ({ ...leader, imagePath: "" }));
  }

  try {
    const parsed: unknown = JSON.parse(value);
    if (!Array.isArray(parsed)) {
      return leaders.map((leader) => ({ ...leader, imagePath: "" }));
    }

    return parsed.flatMap((item): Leader[] => {
      if (!item || typeof item !== "object" || Array.isArray(item)) return [];
      const leader = item as Record<string, unknown>;
      if (typeof leader.name !== "string") return [];

      return [{
        name: leader.name,
        role: typeof leader.role === "string" ? leader.role : "",
        paragraphs: Array.isArray(leader.paragraphs)
          ? leader.paragraphs.filter((paragraph): paragraph is string => typeof paragraph === "string")
          : [],
        imagePath: typeof leader.imagePath === "string" ? leader.imagePath : "",
      }];
    });
  } catch {
    return leaders.map((leader) => ({ ...leader, imagePath: "" }));
  }
}

export default function About({ setting }: { setting?: SiteSettings }) {
  const [pending, startTransition] = useTransition();
  const [storyCardItems, setStoryCardItems] = useState<StoryCard[]>(() =>
    getStoryCards(setting?.aboutStoryCards),
  );
  const [approachTabItems, setApproachTabItems] = useState<ApproachTab[]>(() =>
    getApproachTabs(setting?.aboutApproachTabs),
  );
  const [leaderItems, setLeaderItems] = useState<Leader[]>(() =>
    getLeaders(setting?.aboutLeaders),
  );

  const onSubmit = (formData: FormData) => {
    startTransition(async () => {
      const result = await saveAboutPageSettings(formData);
      if (!result.success) {
        toast.error("Unable to save About page", { description: result.message });
        return;
      }

      toast.success("About page content saved");
    });
  };

  return (
    <div className="space-y-5">
      <Card className="border-slate-200/80 shadow-sm">
        <CardHeader className="border-b border-slate-200/70 py-4">
          <CardTitle className="text-base font-semibold">About Page Hero</CardTitle>
        </CardHeader>
        <CardContent className="p-5">
          <form action={onSubmit} className="space-y-5">
            <div className="grid gap-4 md:grid-cols-2">
              <Field label="Eyebrow" id="aboutPageHeroTagline" value={setting?.aboutPageHeroTagline} placeholder="About Pinnacle Serve" />
              <Field label="Background image path or URL" id="aboutPageHeroImagePath" value={setting?.aboutPageHeroImagePath} placeholder="/api/uploads/about-team.jpg" />
              <Field label="Heading" id="aboutPageHeroTitle" value={setting?.aboutPageHeroTitle} placeholder="Practical change for" />
              <Field label="Highlighted heading" id="aboutPageHeroAccent" value={setting?.aboutPageHeroAccent} placeholder="complex operations" />
            </div>
            <TextField
              label="Description"
              id="aboutPageHeroDescription"
              value={setting?.aboutPageHeroDescription}
              placeholder="We bring operational support and modern technology together..."
            />
            <SaveButton pending={pending} />
          </form>
        </CardContent>
      </Card>

      <Card className="border-slate-200/80 shadow-sm">
        <CardHeader className="border-b border-slate-200/70 py-4">
          <CardTitle className="text-base font-semibold">Our Story</CardTitle>
        </CardHeader>
        <CardContent className="p-5">
          <form action={onSubmit} className="space-y-5">
            <div className="grid gap-4 md:grid-cols-2">
              <Field label="Eyebrow" id="aboutStoryTagline" value={setting?.aboutStoryTagline} placeholder="Our Story" />
              <Field label="Heading" id="aboutStoryTitle" value={setting?.aboutStoryTitle} placeholder="A partner for meaningful progress" />
            </div>
            <TextField
              label="Description"
              id="aboutStoryDescription"
              value={setting?.aboutStoryDescription}
              placeholder="Founded in 2024, Pinnacle Serve helps global clients..."
            />
            <StoryCardsEditor items={storyCardItems} onChange={setStoryCardItems} />
            <input
              type="hidden"
              name="aboutStoryCards"
              value={JSON.stringify(
                storyCardItems.map((card) => ({
                  title: card.title.trim(),
                  description: card.description.trim(),
                })),
              )}
            />
            <SaveButton pending={pending} />
          </form>
        </CardContent>
      </Card>

      <Card className="border-slate-200/80 shadow-sm">
        <CardHeader className="border-b border-slate-200/70 py-4">
          <CardTitle className="text-base font-semibold">Approach and Leadership</CardTitle>
        </CardHeader>
        <CardContent className="p-5">
          <form action={onSubmit} className="space-y-5">
            <div className="grid gap-4 md:grid-cols-2">
              <Field label="Eyebrow" id="aboutApproachTagline" value={setting?.aboutApproachTagline} placeholder="How We Work" />
              <Field label="Heading" id="aboutApproachTitle" value={setting?.aboutApproachTitle} placeholder="The Pinnacle Serve approach" />
              <Field label="Leadership heading" id="aboutLeadershipTitle" value={setting?.aboutLeadershipTitle} placeholder="Leadership" />
            </div>
            <TextField
              label="Section description"
              id="aboutApproachDescription"
              value={setting?.aboutApproachDescription}
              placeholder="Get to know our leadership, services, and the principles behind each engagement."
            />
            <ApproachTabsEditor items={approachTabItems} onChange={setApproachTabItems} />
            <input
              type="hidden"
              name="aboutApproachTabs"
              value={JSON.stringify(
                approachTabItems.map((tab) => ({
                  ...tab,
                  paragraphs: tab.paragraphs.map((paragraph) => paragraph.trim()).filter(Boolean),
                })),
              )}
            />
            <LeadershipEditor items={leaderItems} onChange={setLeaderItems} />
            <input
              type="hidden"
              name="aboutLeaders"
              value={JSON.stringify(
                leaderItems.map((leader) => ({
                  name: leader.name.trim(),
                  role: leader.role.trim(),
                  paragraphs: leader.paragraphs.map((paragraph) => paragraph.trim()).filter(Boolean),
                  ...(leader.imagePath.trim() ? { imagePath: leader.imagePath.trim() } : {}),
                })),
              )}
            />
            <SaveButton pending={pending} />
          </form>
        </CardContent>
      </Card>

      <Card className="border-slate-200/80 shadow-sm">
        <CardHeader className="border-b border-slate-200/70 py-4">
          <CardTitle className="text-base font-semibold">About Page Call to Action</CardTitle>
        </CardHeader>
        <CardContent className="p-5">
          <form action={onSubmit} className="space-y-5">
            <div className="grid gap-4 md:grid-cols-2">
              <Field label="Eyebrow" id="aboutPageCtaTagline" value={setting?.aboutPageCtaTagline} placeholder="Take the next step" />
              <Field label="Heading" id="aboutPageCtaTitle" value={setting?.aboutPageCtaTitle} placeholder="Let's make progress together." />
              <Field label="Button label" id="aboutPageCtaButtonLabel" value={setting?.aboutPageCtaButtonLabel} placeholder="Start a conversation" />
              <Field label="Button link" id="aboutPageCtaButtonHref" value={setting?.aboutPageCtaButtonHref} placeholder="/contact" />
            </div>
            <TextField
              label="Description"
              id="aboutPageCtaDescription"
              value={setting?.aboutPageCtaDescription}
              placeholder="Tell us what you're working toward..."
            />
            <SaveButton pending={pending} />
          </form>
        </CardContent>
      </Card>
    </div>
  );
}

function Field({
  label,
  id,
  value,
  placeholder,
}: {
  label: string;
  id: string;
  value?: string | null;
  placeholder?: string;
}) {
  return (
    <div className="space-y-2">
      <Label htmlFor={id}>{label}</Label>
      <Input
        id={id}
        name={id}
        defaultValue={value ?? ""}
        placeholder={placeholder}
        className="h-10 rounded-xl"
      />
    </div>
  );
}

function TextField({
  label,
  id,
  value,
  placeholder,
}: {
  label: string;
  id: string;
  value?: string | null;
  placeholder?: string;
}) {
  return (
    <div className="space-y-2">
      <Label htmlFor={id}>{label}</Label>
      <Textarea
        id={id}
        name={id}
        defaultValue={value ?? ""}
        placeholder={placeholder}
        className="min-h-[100px] rounded-xl"
      />
    </div>
  );
}

function ApproachTabsEditor({
  items,
  onChange,
}: {
  items: ApproachTab[];
  onChange: (items: ApproachTab[]) => void;
}) {
  const updateTab = (index: number, key: "id" | "label", value: string) => {
    onChange(items.map((tab, tabIndex) => (
      tabIndex === index ? { ...tab, [key]: value } : tab
    )));
  };

  const updateParagraph = (tabIndex: number, paragraphIndex: number, value: string) => {
    onChange(items.map((tab, index) => (
      index === tabIndex
        ? {
            ...tab,
            paragraphs: tab.paragraphs.map((paragraph, index) =>
              index === paragraphIndex ? value : paragraph,
            ),
          }
        : tab
    )));
  };

  const addTab = () => {
    onChange([...items, { id: "", label: "", paragraphs: [] }]);
  };

  const removeTab = (index: number) => {
    onChange(items.filter((_, tabIndex) => tabIndex !== index));
  };

  const addParagraph = (tabIndex: number) => {
    onChange(items.map((tab, index) => (
      index === tabIndex ? { ...tab, paragraphs: [...tab.paragraphs, ""] } : tab
    )));
  };

  const removeParagraph = (tabIndex: number, paragraphIndex: number) => {
    onChange(items.map((tab, index) => (
      index === tabIndex
        ? { ...tab, paragraphs: tab.paragraphs.filter((_, index) => index !== paragraphIndex) }
        : tab
    )));
  };

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between gap-3">
        <Label className="text-sm font-semibold">Approach tabs</Label>
        <Button type="button" variant="outline" className="rounded-full" onClick={addTab}>
          <Plus className="mr-2 size-4" />
          Add tab
        </Button>
      </div>

      <div className="space-y-4">
        {items.map((tab, tabIndex) => (
          <div key={`approach-tab-${tabIndex}`} className="space-y-4 rounded-2xl border border-slate-200 p-4">
            <div className="flex items-center justify-between gap-3">
              <p className="text-sm font-semibold text-slate-700">Tab {tabIndex + 1}</p>
              <Button
                type="button"
                variant="ghost"
                className="rounded-full px-3 text-slate-500 hover:text-red-600"
                aria-label={`Remove tab ${tabIndex + 1}`}
                onClick={() => removeTab(tabIndex)}
              >
                <Trash2 className="size-4" />
              </Button>
            </div>

            <div className="grid gap-3 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor={`approach-tab-${tabIndex}-id`}>ID</Label>
                <Input
                  id={`approach-tab-${tabIndex}-id`}
                  value={tab.id}
                  onChange={(event) => updateTab(tabIndex, "id", event.target.value)}
                  placeholder="what-we-do"
                  className="h-10 rounded-xl"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor={`approach-tab-${tabIndex}-label`}>Label</Label>
                <Input
                  id={`approach-tab-${tabIndex}-label`}
                  value={tab.label}
                  onChange={(event) => updateTab(tabIndex, "label", event.target.value)}
                  placeholder="Our Services"
                  className="h-10 rounded-xl"
                />
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex items-center justify-between gap-3">
                <p className="text-sm font-medium text-slate-700">Paragraphs</p>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  className="rounded-full"
                  onClick={() => addParagraph(tabIndex)}
                >
                  <Plus className="mr-2 size-4" />
                  Add paragraph
                </Button>
              </div>

              {tab.paragraphs.length ? tab.paragraphs.map((paragraph, paragraphIndex) => (
                <div key={`approach-tab-${tabIndex}-paragraph-${paragraphIndex}`} className="flex items-start gap-2">
                  <Textarea
                    aria-label={`Tab ${tabIndex + 1} paragraph ${paragraphIndex + 1}`}
                    value={paragraph}
                    onChange={(event) => updateParagraph(tabIndex, paragraphIndex, event.target.value)}
                    placeholder="Enter paragraph content"
                    className="min-h-[90px] rounded-xl"
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    className="shrink-0 rounded-full px-3 text-slate-500 hover:text-red-600"
                    aria-label={`Remove paragraph ${paragraphIndex + 1} from tab ${tabIndex + 1}`}
                    onClick={() => removeParagraph(tabIndex, paragraphIndex)}
                  >
                    <Trash2 className="size-4" />
                  </Button>
                </div>
              )) : (
                <p className="text-xs text-slate-500">No paragraphs. This tab will show leadership cards when its ID is &quot;founder&quot;.</p>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function LeadershipEditor({
  items,
  onChange,
}: {
  items: Leader[];
  onChange: (items: Leader[]) => void;
}) {
  const updateLeader = (index: number, key: "name" | "role" | "imagePath", value: string) => {
    onChange(items.map((leader, leaderIndex) => (
      leaderIndex === index ? { ...leader, [key]: value } : leader
    )));
  };

  const updateParagraph = (leaderIndex: number, paragraphIndex: number, value: string) => {
    onChange(items.map((leader, index) => (
      index === leaderIndex
        ? {
            ...leader,
            paragraphs: leader.paragraphs.map((paragraph, index) =>
              index === paragraphIndex ? value : paragraph,
            ),
          }
        : leader
    )));
  };

  const addLeader = () => {
    onChange([...items, { name: "", role: "", paragraphs: [""], imagePath: "" }]);
  };

  const removeLeader = (index: number) => {
    onChange(items.filter((_, leaderIndex) => leaderIndex !== index));
  };

  const addParagraph = (leaderIndex: number) => {
    onChange(items.map((leader, index) => (
      index === leaderIndex
        ? { ...leader, paragraphs: [...leader.paragraphs, ""] }
        : leader
    )));
  };

  const removeParagraph = (leaderIndex: number, paragraphIndex: number) => {
    onChange(items.map((leader, index) => (
      index === leaderIndex
        ? {
            ...leader,
            paragraphs: leader.paragraphs.filter((_, index) => index !== paragraphIndex),
          }
        : leader
    )));
  };

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between gap-3">
        <Label className="text-sm font-semibold">Leadership cards</Label>
        <Button type="button" variant="outline" className="rounded-full" onClick={addLeader}>
          <Plus className="mr-2 size-4" />
          Add leader
        </Button>
      </div>

      <div className="space-y-4">
        {items.map((leader, leaderIndex) => (
          <div key={`leader-${leaderIndex}`} className="space-y-4 rounded-2xl border border-slate-200 p-4">
            <div className="flex items-center justify-between gap-3">
              <p className="text-sm font-semibold text-slate-700">Leader {leaderIndex + 1}</p>
              <Button
                type="button"
                variant="ghost"
                className="rounded-full px-3 text-slate-500 hover:text-red-600"
                aria-label={`Remove leader ${leaderIndex + 1}`}
                onClick={() => removeLeader(leaderIndex)}
              >
                <Trash2 className="size-4" />
              </Button>
            </div>

            <div className="grid gap-3 md:grid-cols-3">
              <div className="space-y-2">
                <Label htmlFor={`leader-${leaderIndex}-name`}>Name</Label>
                <Input
                  id={`leader-${leaderIndex}-name`}
                  value={leader.name}
                  onChange={(event) => updateLeader(leaderIndex, "name", event.target.value)}
                  placeholder="Jhon Doe"
                  className="h-10 rounded-xl"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor={`leader-${leaderIndex}-role`}>Role</Label>
                <Input
                  id={`leader-${leaderIndex}-role`}
                  value={leader.role}
                  onChange={(event) => updateLeader(leaderIndex, "role", event.target.value)}
                  placeholder="Chairman"
                  className="h-10 rounded-xl"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor={`leader-${leaderIndex}-imagePath`}>Image path or URL</Label>
                <Input
                  id={`leader-${leaderIndex}-imagePath`}
                  value={leader.imagePath}
                  onChange={(event) => updateLeader(leaderIndex, "imagePath", event.target.value)}
                  placeholder="/api/uploads/leader.jpg"
                  className="h-10 rounded-xl"
                />
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex items-center justify-between gap-3">
                <p className="text-sm font-medium text-slate-700">Biography paragraphs</p>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  className="rounded-full"
                  onClick={() => addParagraph(leaderIndex)}
                >
                  <Plus className="mr-2 size-4" />
                  Add paragraph
                </Button>
              </div>

              {leader.paragraphs.map((paragraph, paragraphIndex) => (
                <div
                  key={`leader-${leaderIndex}-paragraph-${paragraphIndex}`}
                  className="flex items-start gap-2"
                >
                  <Textarea
                    aria-label={`Leader ${leaderIndex + 1} paragraph ${paragraphIndex + 1}`}
                    value={paragraph}
                    onChange={(event) =>
                      updateParagraph(leaderIndex, paragraphIndex, event.target.value)
                    }
                    placeholder="Enter biography paragraph"
                    className="min-h-[90px] rounded-xl"
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    className="shrink-0 rounded-full px-3 text-slate-500 hover:text-red-600"
                    aria-label={`Remove paragraph ${paragraphIndex + 1} from leader ${leaderIndex + 1}`}
                    onClick={() => removeParagraph(leaderIndex, paragraphIndex)}
                  >
                    <Trash2 className="size-4" />
                  </Button>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function StoryCardsEditor({
  items,
  onChange,
}: {
  items: StoryCard[];
  onChange: (items: StoryCard[]) => void;
}) {
  const updateCard = (index: number, key: keyof StoryCard, value: string) => {
    onChange(items.map((card, cardIndex) => (
      cardIndex === index ? { ...card, [key]: value } : card
    )));
  };

  const addCard = () => {
    onChange([...items, { title: "", description: "" }]);
  };

  const removeCard = (index: number) => {
    onChange(items.filter((_, cardIndex) => cardIndex !== index));
  };

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between gap-3">
        <Label className="text-sm font-semibold">Story cards</Label>
        <Button type="button" variant="outline" className="rounded-full" onClick={addCard}>
          <Plus className="mr-2 size-4" />
          Add card
        </Button>
      </div>

      <div className="space-y-4">
        {items.map((card, index) => (
          <div key={`story-card-${index}`} className="space-y-3 rounded-2xl border border-slate-200 p-4">
            <div className="flex items-center justify-between gap-3">
              <p className="text-sm font-semibold text-slate-700">Card {index + 1}</p>
              <Button
                type="button"
                variant="ghost"
                className="rounded-full px-3 text-slate-500 hover:text-red-600"
                aria-label={`Remove story card ${index + 1}`}
                onClick={() => removeCard(index)}
              >
                <Trash2 className="size-4" />
              </Button>
            </div>

            <div className="grid gap-3 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor={`story-card-${index}-title`}>Title</Label>
                <Input
                  id={`story-card-${index}-title`}
                  value={card.title}
                  onChange={(event) => updateCard(index, "title", event.target.value)}
                  placeholder="Technology with a purpose"
                  className="h-10 rounded-xl"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor={`story-card-${index}-description`}>Description</Label>
                <Textarea
                  id={`story-card-${index}-description`}
                  value={card.description}
                  onChange={(event) => updateCard(index, "description", event.target.value)}
                  placeholder="Describe this story point"
                  className="min-h-[100px] rounded-xl"
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function SaveButton({ pending }: { pending: boolean }) {
  return (
    <div className="flex justify-end">
      <Button type="submit" className="rounded-full px-5" disabled={pending}>
        {pending ? <Loader2 className="mr-2 size-4 animate-spin" /> : <Save className="mr-2 size-4" />}
        Save About Page
      </Button>
    </div>
  );
}
