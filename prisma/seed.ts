const fs = require("node:fs");
const path = require("node:path");

const bcrypt = require("bcrypt");
const { PrismaPg } = require("@prisma/adapter-pg");
const {
  PrismaClient,
  Status,
  EmploymentType,
  WorkMode,
} = require("../lib/generated/prisma/client");

function parseEnvFile(content: string) {
  const values: Record<string, string> = {};

  for (const line of content.split(/\r?\n/)) {
    const trimmed = line.trim();

    if (!trimmed || trimmed.startsWith("#")) continue;

    const equalsIndex = trimmed.indexOf("=");
    if (equalsIndex === -1) continue;

    const key = trimmed.slice(0, equalsIndex).trim();
    let value = trimmed.slice(equalsIndex + 1).trim();

    if (
      (value.startsWith('"') && value.endsWith('"')) ||
      (value.startsWith("'") && value.endsWith("'"))
    ) {
      value = value.slice(1, -1);
    }

    values[key] = value;
  }

  return values;
}

function loadEnvFile(filePath: string) {
  if (!fs.existsSync(filePath)) return;

  const parsed = parseEnvFile(fs.readFileSync(filePath, "utf8"));

  for (const [key, value] of Object.entries(parsed)) {
    if (process.env[key] === undefined) {
      process.env[key] = value;
    }
  }
}

loadEnvFile(path.join(__dirname, "..", ".env"));
loadEnvFile(path.join(__dirname, ".env"));
loadEnvFile(path.join(__dirname, "..", "prisma", ".env"));

const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
  throw new Error(
    "DATABASE_URL is not set. Add it to .env or prisma/.env before seeding.",
  );
}

const prisma = new PrismaClient({
  adapter: new PrismaPg({ connectionString }),
});

const active = Status.ACTIVE;

const seedBanners = [
  {
    tagline: "Operational consistency",
    title: "Reliable back-office delivery",
    description:
      "Structured support for documentation, process execution, and business operations that need to stay accurate and on time.",
    image: "/hero-support.svg",
  },
  {
    tagline: "Reporting with clarity",
    title: "Decision-ready analytics",
    description:
      "Practical reporting and analysis that turns day-to-day work into useful visibility for teams and leadership.",
    image: "/hero-analytics.svg",
  },
  {
    tagline: "Responsive support",
    title: "Recovery support that keeps work moving",
    description:
      "Flexible delivery designed to help teams handle change, close gaps quickly, and stay steady under pressure.",
    image: "/hero-consulting.svg",
  },
];

const seedCategories = [
  {
    name: "Business Operations",
    description:
      "Day-to-day back-office support, documentation, and structured execution.",
  },
  {
    name: "Reporting & Analytics",
    description:
      "Dashboards, reporting workflows, and insight-driven support for decision-making.",
  },
  {
    name: "Technical Support",
    description:
      "Practical support for tools, systems, implementation, and managed services.",
  },
  {
    name: "Process Excellence",
    description:
      "Repeatable delivery models focused on quality, consistency, and governance.",
  },
  {
    name: "Recovery Support",
    description:
      "Specialized support for recovery, follow-up, and time-sensitive workflows.",
  },
];

const seedServices = [
  {
    key: "back-office-operations",
    categoryName: "Business Operations",
    title: "Back Office Operations",
    shortDescription:
      "Administrative processing, documentation management, and reliable workflow support.",
    description:
      "We help teams handle recurring operational tasks with a process-first delivery model that keeps records tidy, handoffs clear, and day-to-day execution moving.",
    image: "/service-bpo.svg",
    benefits: {
      title: "What you get",
      description: "A stable operating rhythm with fewer bottlenecks.",
      items: [
        "Structured task ownership",
        "Faster turnaround on routine work",
        "Cleaner documentation and audit trails",
      ],
    },
    capabilities: {
      title: "Capabilities",
      description: "Coverage for the work that keeps the business running.",
      items: [
        "Data entry and validation",
        "Document processing",
        "Queue management and follow-up",
      ],
    },
    deliveryProcess: {
      title: "Delivery process",
      description: "A straightforward operating cadence that scales.",
      items: [
        "Review requirements and workflow rules",
        "Set up clear queues and ownership",
        "Track execution and report exceptions",
      ],
    },
    outcomeFocuses: {
      title: "Outcomes",
      description: "Less friction, better traceability, and consistent delivery.",
      items: [
        "Reduced manual overhead",
        "More predictable throughput",
        "Improved process visibility",
      ],
    },
    contactSection: {
      title: "Need back-office support?",
      description:
        "Tell us what needs to be handled and we will shape the workflow around your team.",
    },
  },
  {
    key: "reporting-analytics",
    categoryName: "Reporting & Analytics",
    title: "Reporting & Analytics",
    shortDescription:
      "Operational dashboards, weekly reporting, and insight-friendly analysis.",
    description:
      "We turn scattered operational data into useful reporting so leaders can see what is working, where the gaps are, and what should happen next.",
    image: "/service-analytics.svg",
    benefits: {
      title: "What you get",
      description: "Clear reporting with less manual assembly.",
      items: [
        "Reliable recurring reports",
        "Decision-friendly dashboards",
        "Faster visibility into trends",
      ],
    },
    capabilities: {
      title: "Capabilities",
      description: "Reporting that is simple to use and easy to trust.",
      items: [
        "KPI reporting",
        "Trend analysis",
        "Operational scorecards",
      ],
    },
    deliveryProcess: {
      title: "Delivery process",
      description: "Built to fit the cadence your team already follows.",
      items: [
        "Map source data and reporting needs",
        "Define layout, frequency, and owners",
        "Review reports and refine insights",
      ],
    },
    outcomeFocuses: {
      title: "Outcomes",
      description: "Better visibility without the usual reporting overhead.",
      items: [
        "Faster reporting cycles",
        "More consistent metrics",
        "Sharper operational decisions",
      ],
    },
    contactSection: {
      title: "Need reporting support?",
      description:
        "We can help you create reporting that your team will actually use.",
    },
  },
  {
    key: "technical-support",
    categoryName: "Technical Support",
    title: "Technical Support & Managed Services",
    shortDescription:
      "Implementation support, troubleshooting, and steady managed service coverage.",
    description:
      "We support systems and workflows with practical technical help, whether that means implementing tools, maintaining operations, or resolving issues quickly.",
    image: "/hero-consulting.svg",
    benefits: {
      title: "What you get",
      description: "Dependable support when systems need attention.",
      items: [
        "Clear issue triage",
        "Stable support coverage",
        "Implementation follow-through",
      ],
    },
    capabilities: {
      title: "Capabilities",
      description: "Support for the tools and processes your team depends on.",
      items: [
        "Application support",
        "Implementation coordination",
        "Managed service assistance",
      ],
    },
    deliveryProcess: {
      title: "Delivery process",
      description: "Simple support loops that keep momentum intact.",
      items: [
        "Capture the issue or request",
        "Prioritize by impact and urgency",
        "Resolve, verify, and document",
      ],
    },
    outcomeFocuses: {
      title: "Outcomes",
      description: "Less downtime and more confidence in day-to-day support.",
      items: [
        "Faster resolution times",
        "Better support continuity",
        "Improved user confidence",
      ],
    },
    contactSection: {
      title: "Need technical support?",
      description:
        "We can step in with practical support that fits your systems and process flow.",
    },
  },
  {
    key: "process-management",
    categoryName: "Process Excellence",
    title: "Process Management",
    shortDescription:
      "Repeatable workflows, quality checks, and operational governance.",
    description:
      "We help teams document, standardize, and improve processes so daily execution becomes easier to manage and easier to scale.",
    image: "/hero-bg.svg",
    benefits: {
      title: "What you get",
      description: "More structure without adding unnecessary overhead.",
      items: [
        "Clear SOP-style delivery",
        "Better quality control",
        "Lower process variability",
      ],
    },
    capabilities: {
      title: "Capabilities",
      description: "Support for designing and running consistent workflows.",
      items: [
        "Process mapping",
        "Quality review checkpoints",
        "Governance and escalation paths",
      ],
    },
    deliveryProcess: {
      title: "Delivery process",
      description: "Designed to make the work repeatable and measurable.",
      items: [
        "Document the current workflow",
        "Identify bottlenecks and control points",
        "Implement and monitor the new process",
      ],
    },
    outcomeFocuses: {
      title: "Outcomes",
      description: "Cleaner handoffs and more reliable delivery.",
      items: [
        "Reduced process drift",
        "Better team accountability",
        "Stronger operational control",
      ],
    },
    contactSection: {
      title: "Looking to tighten process flow?",
      description:
        "We can help make the workflow easier to understand and simpler to run.",
    },
  },
  {
    key: "recovery-support",
    categoryName: "Recovery Support",
    title: "Recovery Support Services",
    shortDescription:
      "Responsive support for follow-up, recovery workflows, and urgent operational tasks.",
    description:
      "When work is time-sensitive and needs careful follow-through, we provide support that helps teams stay organized and move forward with confidence.",
    image: "/hero-support.svg",
    benefits: {
      title: "What you get",
      description: "Fast response with careful execution.",
      items: [
        "Prioritized follow-up handling",
        "Better issue visibility",
        "Reliable case progression",
      ],
    },
    capabilities: {
      title: "Capabilities",
      description: "Coverage for recovery-focused operational work.",
      items: [
        "Case follow-up",
        "Exception handling",
        "Operational escalation support",
      ],
    },
    deliveryProcess: {
      title: "Delivery process",
      description: "Focused on speed, clarity, and traceability.",
      items: [
        "Review current case status",
        "Plan the next action and owner",
        "Track closure until completion",
      ],
    },
    outcomeFocuses: {
      title: "Outcomes",
      description: "A steadier process when timelines are tight.",
      items: [
        "Fewer missed follow-ups",
        "Improved closure rates",
        "Less operational ambiguity",
      ],
    },
    contactSection: {
      title: "Need recovery support?",
      description:
        "We can take on the operational follow-through and keep things moving.",
    },
  },
  {
    key: "it-consulting-automation",
    categoryName: "Technical Support",
    title: "IT Consulting & Automation",
    shortDescription:
      "Practical implementation support, lightweight automation, and workflow improvement.",
    description:
      "We help teams simplify recurring tasks, connect the right tools, and make technical work easier to maintain over time.",
    image: "/hero-analytics.svg",
    benefits: {
      title: "What you get",
      description: "A more efficient way to run repetitive work.",
      items: [
        "Lower manual effort",
        "Cleaner handoffs between tools",
        "More consistent task execution",
      ],
    },
    capabilities: {
      title: "Capabilities",
      description: "Small, useful improvements that add up over time.",
      items: [
        "Workflow automation",
        "Tool integration support",
        "Implementation guidance",
      ],
    },
    deliveryProcess: {
      title: "Delivery process",
      description: "Start small, prove value, and expand carefully.",
      items: [
        "Find repetitive work worth automating",
        "Design the simplest workable solution",
        "Test, document, and hand over",
      ],
    },
    outcomeFocuses: {
      title: "Outcomes",
      description: "Less repetitive effort and better operational consistency.",
      items: [
        "Time saved on repetitive tasks",
        "Cleaner process handoffs",
        "Better delivery reliability",
      ],
    },
    contactSection: {
      title: "Thinking about automation?",
      description:
        "We can help identify the first practical step and keep the scope grounded.",
    },
  },
];

const seedTestimonials = [
  {
    name: "Aman Verma",
    designation: "Operations Lead",
    company: "Northstar Logistics",
    tag: "Back office support",
    content:
      "The team brought structure to a messy workflow and made daily handoffs far easier to manage.",
    image: "/uploads/user/04318dce-0dde-45f7-8fa9-6e15b7f4add6.jpg",
  },
  {
    name: "Priya Nair",
    designation: "Reporting Manager",
    company: "Helix Retail",
    tag: "Analytics and reporting",
    content:
      "We finally had reporting that leadership could trust without spending hours cleaning it up first.",
    image: "/uploads/user/3d8e6f51-db16-4fa9-8fee-2399379af2ec.jpg",
  },
  {
    name: "Rahul Mehta",
    designation: "Service Delivery Manager",
    company: "Bridgeway Tech",
    tag: "Technical support",
    content:
      "Support requests were handled with real follow-through, which kept our team moving during busy periods.",
    image: "/uploads/user/51582f2d-a18f-410b-8813-a9bf517fc3af.png",
  },
];

const seedJobs = [
  {
    title: "Operations Associate",
    shortDescription:
      "Support daily business operations, track work queues, and help keep documentation current.",
    description:
      "This role is a good fit for someone who likes process, accuracy, and keeping teams organized. You will work with recurring operations and help ensure nothing falls through the cracks.",
    employmentType: EmploymentType.FULL_TIME,
    workMode: WorkMode.HYBRID,
    experience: "1-3 years",
    location: "Kolkata, India",
    vacancies: 2,
  },
  {
    title: "Reporting Analyst",
    shortDescription:
      "Build recurring reports, analyze trends, and help transform operational data into insight.",
    description:
      "You will own reporting routines, improve data visibility, and work with internal teams to make metrics easier to understand and act on.",
    employmentType: EmploymentType.FULL_TIME,
    workMode: WorkMode.REMOTE,
    experience: "2-4 years",
    location: "Remote",
    vacancies: 1,
  },
  {
    title: "Technical Support Specialist",
    shortDescription:
      "Handle support requests, coordinate implementations, and keep service delivery moving.",
    description:
      "This position is ideal for someone who can troubleshoot calmly, document clearly, and work with teams to resolve issues quickly and professionally.",
    employmentType: EmploymentType.CONTRACT,
    workMode: WorkMode.ONSITE,
    experience: "2+ years",
    location: "India",
    vacancies: 1,
  },
];

const seedNewsletter = [
  { email: "hello@northstarlogistics.example", status: active },
  { email: "updates@helixretail.example", status: active },
  { email: "ops@bridgewaytech.example", status: active },
];

async function seedSettings() {
  await prisma.siteSettings.upsert({
    where: { id: "site-settings" },
    create: {
      id: "site-settings",
      siteName: "Pinnacle",
      legalName: "Global Business Support Services Delivered from India",
      aboutTagline: "About Pinnacle",
      aboutTitle:
        "A focused operating model built for scale, quality, and steady delivery.",
      aboutDescription:
        "We combine back-office operations, IT consulting, and support services into a lean delivery model designed to help global clients move faster without sacrificing quality.",
      aboutButtons: JSON.stringify([
        "Transition",
        "Operations",
        "Training",
        "Scalability",
      ]),
      deliveryModelTitle: "DELIVERY MODEL",
      deliveryModelItems: JSON.stringify([
        "Founded in 2024",
        "Supporting global clients",
        "Backoffice Operations with IT Consulting & Support",
        "Specialized Transition team",
        "Specialized operational support teams",
        "Specialized Training & Development team",
        "Trained agents available as factory model",
        "Focus on quality and scalability",
      ]),
      whyClientsTagline: "Why Clients Choose Us",
      whyClientsTitle: "Built to scale with clarity, control, and confidence.",
      whyClientsDescription:
        "Our delivery model gives clients flexible teams, disciplined process, and visibility that makes operations easier to manage.",
      whyClientsCards: JSON.stringify([
        {
          title: "Scalable Teams",
          summary: "Flexible delivery capacity that grows with your needs.",
        },
        {
          title: "Cost Effective Delivery",
          summary: "Lean operations with a clear focus on value and efficiency.",
        },
        {
          title: "Structured Processes",
          summary: "Consistent execution built around repeatable workflows.",
        },
        {
          title: "Management Visibility & Reporting",
          summary: "Clear reporting and oversight across daily operations.",
        },
      ]),
      globalDeliveryTagline: "OUR GLOBAL DELIVERY MODEL",
      globalDeliveryTitle:
        "A simple, visual journey from intake to continuous improvement.",
      globalDeliveryDescription:
        "This flowchart maps the exact delivery handoff we use to move from client requirements through transition, training, delivery, governance, and ongoing service improvement.",
      globalDeliveryImagePath: "/uploads/12b66e57-bc7f-48bb-bbf8-25fd3e07e3ef.jpg",
      primaryEmail: "info@asservices.com",
      primaryPhone: "+91 98765 43210",
      websiteUrl: "https://asservices.com",
      timezone: "Asia/Kolkata",
      officeAddress: "Pinnacle, India",
      officeHours: "Mon-Fri, 9:00 AM - 6:00 PM IST",
      logoPath: "/file.svg",
      faviconPath: "/favicon.ico",
      teamMembers: "48",
      happyCustomers: "120",
      operationalSupport: "24/7",
      heroTrustTags: JSON.stringify([
        "US Client Delivery Experience",
        "Process-Driven Operations",
      ]),
      showPhone: true,
      showEmail: true,
      fromName: "Pinnacle",
      fromEmail: "info@pinnacle.com",
      replyToEmail: "support@pinnacle.com",
      supportInbox: "support@pinnacle.com",
      emailSignature: "Thanks,\nPinnacle Team",
      enableNotifications: true,
      storeDrafts: false,
      facebookUrl: "https://facebook.com",
      instagramUrl: "https://instagram.com",
      linkedinUrl: "https://linkedin.com",
      youtubeUrl: "https://youtube.com",
      whatsappUrl: "https://wa.me/919876543210",
      messengerUrl: "https://m.me",
      socialBio: "Operational support, analytics, and technical services.",
      showSocialIcons: true,
      openLinksNewTab: true,
    },
    update: {
      siteName: "Pinnacle",
      legalName: "Global Business Support Services Delivered from India",
      aboutTagline: "About Pinnacle",
      aboutTitle:
        "A focused operating model built for scale, quality, and steady delivery.",
      aboutDescription:
        "We combine back-office operations, IT consulting, and support services into a lean delivery model designed to help global clients move faster without sacrificing quality.",
      aboutButtons: JSON.stringify([
        "Transition",
        "Operations",
        "Training",
        "Scalability",
      ]),
      deliveryModelTitle: "DELIVERY MODEL",
      deliveryModelItems: JSON.stringify([
        "Founded in 2024",
        "Supporting global clients",
        "Backoffice Operations with IT Consulting & Support",
        "Specialized Transition team",
        "Specialized operational support teams",
        "Specialized Training & Development team",
        "Trained agents available as factory model",
        "Focus on quality and scalability",
      ]),
      whyClientsTagline: "Why Clients Choose Us",
      whyClientsTitle: "Built to scale with clarity, control, and confidence.",
      whyClientsDescription:
        "Our delivery model gives clients flexible teams, disciplined process, and visibility that makes operations easier to manage.",
      whyClientsCards: JSON.stringify([
        {
          title: "Scalable Teams",
          summary: "Flexible delivery capacity that grows with your needs.",
        },
        {
          title: "Cost Effective Delivery",
          summary: "Lean operations with a clear focus on value and efficiency.",
        },
        {
          title: "Structured Processes",
          summary: "Consistent execution built around repeatable workflows.",
        },
        {
          title: "Management Visibility & Reporting",
          summary: "Clear reporting and oversight across daily operations.",
        },
      ]),
      globalDeliveryTagline: "OUR GLOBAL DELIVERY MODEL",
      globalDeliveryTitle:
        "A simple, visual journey from intake to continuous improvement.",
      globalDeliveryDescription:
        "This flowchart maps the exact delivery handoff we use to move from client requirements through transition, training, delivery, governance, and ongoing service improvement.",
      globalDeliveryImagePath: "/uploads/12b66e57-bc7f-48bb-bbf8-25fd3e07e3ef.jpg",
      primaryEmail: "info@asservices.com",
      primaryPhone: "+91 98765 43210",
      websiteUrl: "https://asservices.com",
      timezone: "Asia/Kolkata",
      officeAddress: "Pinnacle, India",
      officeHours: "Mon-Fri, 9:00 AM - 6:00 PM IST",
      logoPath: "/file.svg",
      faviconPath: "/favicon.ico",
      teamMembers: "48",
      happyCustomers: "120",
      operationalSupport: "24/7",
      heroTrustTags: JSON.stringify([
        "US Client Delivery Experience",
        "Process-Driven Operations",
      ]),
      showPhone: true,
      showEmail: true,
      fromName: "Pinnacle",
      fromEmail: "info@pinnacle.com",
      replyToEmail: "support@pinnacle.com",
      supportInbox: "support@pinnacle.com",
      emailSignature: "Thanks,\nPinnacle Team",
      enableNotifications: true,
      storeDrafts: false,
      facebookUrl: "https://facebook.com",
      instagramUrl: "https://instagram.com",
      linkedinUrl: "https://linkedin.com",
      youtubeUrl: "https://youtube.com",
      whatsappUrl: "https://wa.me/919876543210",
      messengerUrl: "https://m.me",
      socialBio: "Operational support, analytics, and technical services.",
      showSocialIcons: true,
      openLinksNewTab: true,
    },
  });
}

async function seedUsers() {
  const hashedPassword = await bcrypt.hash("Admin@123", 10);

  await prisma.user.upsert({
    where: { email: "admin@pinncle.in" },
    create: {
      name: "Admin",
      email: "admin@pinncle.in",
      image: "/uploads/user/04318dce-0dde-45f7-8fa9-6e15b7f4add6.jpg",
      password: hashedPassword,
      status: active,
    },
    update: {
      name: "Admin",
      image: "/uploads/user/04318dce-0dde-45f7-8fa9-6e15b7f4add6.jpg",
      password: hashedPassword,
      status: active,
    },
  });
}

async function seedContent() {
  await prisma.careerApplication.deleteMany();
  await prisma.contactSection.deleteMany();
  await prisma.outcomeFocus.deleteMany();
  await prisma.deliveryProcess.deleteMany();
  await prisma.capabilities.deleteMany();
  await prisma.serviceBenefits.deleteMany();
  await prisma.services.deleteMany();
  await prisma.serviceCategory.deleteMany();
  await prisma.banner.deleteMany();
  await prisma.testimonial.deleteMany();
  await prisma.job.deleteMany();
  await prisma.newsletterSubscription.deleteMany();

  await seedSettings();
  await seedUsers();

  for (const banner of seedBanners) {
    await prisma.banner.create({
      data: {
        tagline: banner.tagline,
        title: banner.title,
        description: banner.description,
        image: banner.image,
        status: active,
      },
    });
  }

  const categoryByName = new Map();
  for (const category of seedCategories) {
    const created = await prisma.serviceCategory.create({
      data: {
        name: category.name,
        status: active,
      },
    });

    categoryByName.set(category.name, created);
  }

  for (const service of seedServices) {
    const category = categoryByName.get(service.categoryName);
    if (!category) {
      throw new Error(`Missing category for service: ${service.title}`);
    }

    const createdService = await prisma.services.create({
      data: {
        title: service.title,
        shortDescription: service.shortDescription,
        description: service.description,
        image: service.image,
        status: active,
        categoryId: category.id,
      },
    });

    await prisma.serviceBenefits.create({
      data: {
        serviceId: createdService.id,
        title: service.benefits.title,
        description: service.benefits.description,
        items: service.benefits.items,
      },
    });

    await prisma.capabilities.create({
      data: {
        serviceId: createdService.id,
        title: service.capabilities.title,
        description: service.capabilities.description,
        items: service.capabilities.items,
      },
    });

    await prisma.deliveryProcess.create({
      data: {
        serviceId: createdService.id,
        title: service.deliveryProcess.title,
        description: service.deliveryProcess.description,
        items: service.deliveryProcess.items,
      },
    });

    await prisma.outcomeFocus.create({
      data: {
        serviceId: createdService.id,
        title: service.outcomeFocuses.title,
        description: service.outcomeFocuses.description,
        items: service.outcomeFocuses.items,
      },
    });

    await prisma.contactSection.create({
      data: {
        serviceId: createdService.id,
        title: service.contactSection.title,
        description: service.contactSection.description,
        status: active,
      },
    });
  }

  for (const testimonial of seedTestimonials) {
    await prisma.testimonial.create({
      data: {
        name: testimonial.name,
        designation: testimonial.designation,
        company: testimonial.company,
        tag: testimonial.tag,
        content: testimonial.content,
        image: testimonial.image,
        status: active,
      },
    });
  }

  for (const job of seedJobs) {
    await prisma.job.create({
      data: {
        title: job.title,
        shortDescription: job.shortDescription,
        description: job.description,
        employmentType: job.employmentType,
        workMode: job.workMode,
        experience: job.experience,
        location: job.location,
        vacancies: job.vacancies,
        status: active,
      },
    });
  }

  for (const item of seedNewsletter) {
    await prisma.newsletterSubscription.create({
      data: {
        email: item.email,
        status: item.status,
      },
    });
  }
}

async function main() {
  console.log("Seeding started...");
  await seedContent();
  console.log("Seeding finished");
}

main()
  .catch((error) => {
    console.error(error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
