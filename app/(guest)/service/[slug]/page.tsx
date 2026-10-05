import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowRight,
  ArrowUpRight,
  BarChart3,
  BrainCircuit,
  BriefcaseBusiness,
  Building2,
  Check,
  CloudCog,
  Cog,
  Database,
  LineChart,
  Layers3,
  Wrench,
  Workflow,
} from "lucide-react";

const services = {
  "ai-services": {
    number: "01",
    title: "AI Services",
    category: "Artificial Intelligence",
    summary:
      "Build secure, scalable, enterprise-ready AI capabilities that accelerate innovation and deliver measurable business value.",
    overview:
      "Move from promising experiments to AI that people can trust and use every day. We help identify the right opportunities, design responsible solutions, and integrate them into the systems and workflows your teams already rely on.",
    image:
      "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&w=1600&q=85",
    imageAlt: "Abstract view of artificial intelligence and connected data",
    Icon: BrainCircuit,
    capabilities: [
      "AI strategy and opportunity discovery",
      "Generative AI and intelligent assistants",
      "Machine learning and predictive models",
      "Responsible AI, governance, and monitoring",
    ],
    outcomes: ["Useful, governed AI", "Faster decisions", "Less repetitive work"],
  },
  "digital-product-engineering": {
    number: "02",
    title: "Digital Product Engineering",
    category: "Product Engineering",
    summary:
      "End-to-end product engineering, from strategy and design to build and continuous delivery for market-defining digital products.",
    overview:
      "Turn a clear product vision into a dependable digital experience. Our teams bring product thinking, thoughtful design, and modern engineering together to build platforms that solve real user needs and keep improving after launch.",
    image:
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1600&q=85",
    imageAlt: "Product analytics displayed across a digital workspace",
    Icon: Layers3,
    capabilities: [
      "Product strategy and roadmap definition",
      "User research and experience design",
      "Web and mobile application development",
      "Quality engineering and continuous delivery",
    ],
    outcomes: ["Better user experiences", "Faster delivery", "Products built to evolve"],
  },
  "cloud-engineering": {
    number: "03",
    title: "Cloud Engineering",
    category: "Cloud Infrastructure",
    summary:
      "Enterprise-grade cloud architecture, migration, platform engineering, and DevSecOps for resilient, scalable ecosystems.",
    overview:
      "Make your cloud foundation work harder. We plan and deliver secure migrations, modern platform architectures, and automated operations that help teams scale confidently while keeping reliability and cost in view.",
    image:
      "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1600&q=85",
    imageAlt: "Connected global cloud infrastructure at night",
    Icon: CloudCog,
    capabilities: [
      "Cloud readiness and architecture",
      "Migration and application modernization",
      "Platform engineering and infrastructure as code",
      "DevSecOps, reliability, and cost optimization",
    ],
    outcomes: ["Resilient platforms", "Secure delivery", "More efficient operations"],
  },
  "data-services": {
    number: "04",
    title: "Data Services",
    category: "Data & Analytics",
    summary:
      "Build trusted, governed, and scalable enterprise data ecosystems that power analytics, AI, and confident decision-making.",
    overview:
      "Bring disconnected data into a reliable foundation for action. We help organizations improve data quality, establish clear governance, and make useful information available to the teams and systems that need it.",
    image:
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1600&q=85",
    imageAlt: "Business intelligence charts and analytics on a screen",
    Icon: Database,
    capabilities: [
      "Data strategy and governance",
      "Modern data platforms and pipelines",
      "Business intelligence and reporting",
      "Data quality, integration, and management",
    ],
    outcomes: ["Trusted information", "Clearer reporting", "AI-ready data"],
  },
  rcm: {
    number: "05",
    title: "RCM as a Service",
    category: "Revenue Cycle Management",
    summary:
      "Optimize reimbursement, reduce denials, and improve cash flow with intelligent, scalable healthcare-focused RCM operations.",
    overview:
      "Support a healthier revenue cycle with dependable people, processes, and technology. We help healthcare organizations strengthen workflows across the patient financial journey while maintaining accuracy, visibility, and compliance.",
    image:
      "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&w=1600&q=85",
    imageAlt: "Healthcare administration team reviewing operational documents",
    Icon: Building2,
    capabilities: [
      "Patient access and eligibility workflows",
      "Claims, billing, and payment operations",
      "Denial prevention and resolution",
      "Performance reporting and process improvement",
    ],
    outcomes: ["More consistent workflows", "Better visibility", "Fewer avoidable delays"],
  },
  "automation-services": {
    number: "06",
    title: "Automation Services",
    category: "Intelligent Automation",
    summary:
      "Automate complex business processes at scale with RPA, intelligent document processing, and AI-driven workflow orchestration.",
    overview:
      "Free teams from repetitive work without losing control of the process. We find the right tasks to automate, connect the systems involved, and put governance and human oversight in place from the start.",
    image:
      "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=1600&q=85",
    imageAlt: "Engineer working with automation technology in a modern workspace",
    Icon: Workflow,
    capabilities: [
      "Process discovery and automation roadmaps",
      "Robotic process automation",
      "Intelligent document processing",
      "Workflow orchestration and monitoring",
    ],
    outcomes: ["Less manual effort", "Consistent execution", "Auditable operations"],
  },
  "managed-services": {
    number: "07",
    title: "Managed Services",
    category: "Managed IT Operations",
    summary:
      "Keep your technology estate secure, resilient, and continuously optimized with monitoring, incident response, and operational support.",
    overview:
      "Give your technology environment the consistent attention it needs. Our teams support day-to-day operations, respond to issues, and work alongside your people to improve service health over time.",
    image:
      "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1600&q=85",
    imageAlt: "Connected circuit board representing managed technology operations",
    Icon: CloudCog,
    capabilities: [
      "Service desk and technical support",
      "Infrastructure and cloud operations",
      "Monitoring and incident response",
      "Security operations and continual improvement",
    ],
    outcomes: ["Reliable day-to-day support", "Faster issue response", "Clear service visibility"],
  },
  "utilities-management": {
    number: "08",
    title: "Property Operations",
    category: "Property & Utilities",
    summary:
      "Transform property operations, service delivery, and resident support with intelligent workflows that connect people and systems.",
    overview:
      "Coordinate the work behind better property and resident experiences. We help teams connect requests, maintenance, communications, and operational data so that work moves clearly from intake to resolution.",
    image:
      "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1600&q=85",
    imageAlt: "Modern commercial buildings in a city business district",
    Icon: Building2,
    capabilities: [
      "Resident and customer service workflows",
      "Maintenance coordination and work orders",
      "Property operations process improvement",
      "Connected systems and performance reporting",
    ],
    outcomes: ["Coordinated service", "Clearer ownership", "Improved operational visibility"],
  },
  "intelligent-backoffice-operations": {
    number: "09",
    title: "Intelligent Backoffice Operations",
    category: "Business Operations",
    summary:
      "Dependable processing, organized records, and hands-on workflow support for essential business tasks.",
    overview:
      "Keep essential business work moving with accurate, well-managed operational support. We help teams organize repeatable tasks, maintain clear records, and improve the workflows behind everyday service delivery.",
    image:
      "https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=1600&q=85",
    imageAlt: "Organized, modern office workspace for business operations",
    Icon: BarChart3,
    capabilities: [
      "Back-office task and queue management",
      "Data entry and records administration",
      "Document and workflow coordination",
      "Quality checks and operational reporting",
    ],
    outcomes: ["Accurate processing", "Organized records", "More consistent workflows"],
  },
  "reporting-analytics": {
    number: "10",
    title: "Reporting & Analytics",
    category: "Business Intelligence",
    summary:
      "Clear dashboards and useful analysis give teams a better view of performance and next steps.",
    overview:
      "Make performance easier to understand and act on. We bring together relevant information, shape it into clear reporting, and help teams use those insights to focus attention and improve operations.",
    image:
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1600&q=85",
    imageAlt: "Business analytics dashboard with performance charts",
    Icon: LineChart,
    capabilities: [
      "Management dashboards and KPI reporting",
      "Operational and trend analysis",
      "Data consolidation and report automation",
      "Performance reviews and actionable insights",
    ],
    outcomes: ["Clearer performance visibility", "Timely insights", "Confident next steps"],
  },
  "technical-support": {
    number: "11",
    title: "Technical Support",
    category: "Technology Operations",
    summary:
      "Guidance, implementation, managed support, and automation to keep technology useful and dependable.",
    overview:
      "Help people and technology work well together. From day-to-day troubleshooting to implementation and ongoing support, we provide practical assistance that keeps systems dependable and users moving.",
    image:
      "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1600&q=85",
    imageAlt: "Technical team collaborating around digital support tools",
    Icon: Wrench,
    capabilities: [
      "User and application support",
      "Issue triage and resolution coordination",
      "Technology implementation assistance",
      "Managed support and workflow automation",
    ],
    outcomes: ["Dependable systems", "Responsive support", "Better user experience"],
  },
  "process-management": {
    number: "12",
    title: "Process Management",
    category: "Process Excellence",
    summary:
      "Documented processes and quality checks make work easier to repeat, review, and improve.",
    overview:
      "Give important work a clear and consistent way forward. We help document how work gets done, make ownership visible, and build practical quality checks that make processes easier to review and improve.",
    image:
      "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=1600&q=85",
    imageAlt: "Team reviewing documented business processes and plans",
    Icon: Cog,
    capabilities: [
      "Process mapping and documentation",
      "Workflow ownership and handoff design",
      "Quality assurance checkpoints",
      "Continuous improvement and governance",
    ],
    outcomes: ["Repeatable ways of working", "Clear accountability", "Consistent quality"],
  },
  "banking-finance-support": {
    number: "13",
    title: "Banking Finance Support",
    category: "Financial Operations",
    summary:
      "Dedicated operational support for organizations working in recovery and repossession.",
    overview:
      "Support the detail-heavy work involved in finance recovery operations. We help coordinate case administration, documentation, and follow-up workflows with clear records and consistent process controls.",
    image:
      "https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&w=1600&q=85",
    imageAlt: "Financial documents and tools arranged on a desk",
    Icon: BriefcaseBusiness,
    capabilities: [
      "Case and account administration",
      "Recovery and repossession workflow coordination",
      "Document tracking and records management",
      "Status reporting and quality checks",
    ],
    outcomes: ["Organized casework", "Consistent follow-up", "Clear operational status"],
  },
} as const;

const deliverySteps = [
  {
    number: "01",
    title: "Understand the work",
    description:
      "We learn your goals, users, operating context, and the systems already in place.",
  },
  {
    number: "02",
    title: "Design a practical path",
    description:
      "Together we set priorities, define the right solution, and agree how progress will be measured.",
  },
  {
    number: "03",
    title: "Deliver and improve",
    description:
      "We implement with your team, support adoption, and use feedback to keep making the service better.",
  },
];

export default async function ServiceDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const service = services[slug as keyof typeof services];

  if (!service) notFound();

  const ServiceIcon = service.Icon;
  const relatedServices = Object.entries(services)
    .filter(([serviceSlug]) => serviceSlug !== slug)
    .slice(0, 3);

  return (
    <div className="w-full bg-white text-slate-900">
      <section className="relative isolate overflow-hidden bg-[#071323] px-6 pb-16 pt-36 text-white sm:px-10 sm:pb-20 sm:pt-40 lg:px-16">
        <Image
          src={service.image}
          alt={service.imageAlt}
          fill
          priority
          sizes="100vw"
          className="-z-20 object-cover object-center opacity-35"
        />
        <div className="absolute inset-0 -z-10 bg-gradient-to-r from-[#06101f] via-[#0b1b30]/95 to-[#102944]/70" />
        <div className="absolute inset-0 -z-10 bg-[linear-gradient(rgba(255,255,255,0.035)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.035)_1px,transparent_1px)] bg-[size:44px_44px]" />

        <div className="relative mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16">
          <div>
            <nav aria-label="Breadcrumb" className="mb-9 text-sm text-white/65">
              <Link href="/#service-back-office" className="transition hover:text-white">
                Services
              </Link>
              <span className="mx-2 text-white/35">/</span>
              <span className="text-orange-300">{service.title}</span>
            </nav>
            <div className="inline-flex items-center gap-2 border border-orange-300/25 bg-orange-400/10 px-3.5 py-2 text-[11px] font-semibold uppercase tracking-[0.16em] text-orange-200">
              <ServiceIcon className="h-4 w-4" aria-hidden="true" />
              {service.category}
            </div>
            <h1 className="mt-6 max-w-3xl font-serif text-4xl font-semibold leading-[1.08] text-white sm:text-5xl lg:text-6xl">
              {service.title}
              <span className="mt-2 block font-normal italic text-[#f0a16d]">
                built around your priorities
              </span>
            </h1>
            <p className="mt-6 max-w-2xl text-base leading-7 text-white/75 sm:text-lg sm:leading-8">
              {service.summary}
            </p>
            <Link
              href="/contact"
              className="group mt-8 inline-flex min-h-12 items-center gap-3 bg-[#e36a1e] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#cc5c15]"
            >
              Talk with our team
              <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>
          </div>

          <div className="relative min-h-[280px] overflow-hidden border border-white/15 sm:min-h-[390px]">
            <Image
              src={service.image}
              alt={service.imageAlt}
              fill
              priority
              sizes="(min-width: 1024px) 45vw, 100vw"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#06101f]/75 via-transparent to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 flex items-end justify-between gap-4 p-5 sm:p-7">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-orange-300">
                  Pinnacle Serve
                </p>
                <p className="mt-2 max-w-xs text-lg font-medium leading-snug text-white sm:text-xl">
                  Practical technology. Progress you can put to work.
                </p>
              </div>
              <span className="font-mono text-4xl font-light text-white/75" aria-hidden="true">
                {service.number}
              </span>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white px-6 py-20 sm:px-10 sm:py-24 lg:px-16">
        <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-orange-600">
              The opportunity
            </p>
            <h2 className="mt-4 font-serif text-3xl font-semibold leading-tight text-[#142b58] sm:text-4xl">
              Make complex work feel manageable.
            </h2>
          </div>
          <div>
            <p className="text-base leading-8 text-slate-600 sm:text-lg">
              {service.overview}
            </p>
            <div className="mt-9 grid gap-4 border-t border-slate-200 pt-6 sm:grid-cols-3">
              {service.outcomes.map((outcome) => (
                <div key={outcome} className="flex items-start gap-3">
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-orange-600" aria-hidden="true" />
                  <span className="text-sm font-medium leading-6 text-[#142b58]">{outcome}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[#f4f6fb] px-6 py-20 sm:px-10 sm:py-24 lg:px-16">
        <div className="mx-auto max-w-7xl">
          <div className="max-w-2xl">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-orange-600">
              What we do
            </p>
            <h2 className="mt-4 font-serif text-3xl font-semibold text-[#142b58] sm:text-4xl">
              The right capabilities, brought together.
            </h2>
            <p className="mt-4 text-base leading-7 text-slate-600">
              A focused set of services, shaped to fit your organization and the work ahead.
            </p>
          </div>
          <div className="mt-10 grid gap-x-10 md:grid-cols-2">
            {service.capabilities.map((capability, index) => (
              <div
                key={capability}
                className="flex items-start gap-5 border-t border-slate-200 py-6"
              >
                <span className="font-mono text-sm text-orange-600">0{index + 1}</span>
                <h3 className="text-base font-semibold leading-6 text-[#142b58]">
                  {capability}
                </h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#102447] px-6 py-20 text-white sm:px-10 sm:py-24 lg:px-16">
        <div className="mx-auto max-w-7xl">
          <div className="max-w-2xl">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-orange-300">
              How we work
            </p>
            <h2 className="mt-4 font-serif text-3xl font-semibold sm:text-4xl">
              Clear steps. Shared ownership.
            </h2>
          </div>
          <div className="mt-10 grid gap-8 md:grid-cols-3 md:gap-10">
            {deliverySteps.map((step) => (
              <article key={step.number} className="border-t border-white/20 pt-5">
                <p className="font-mono text-sm text-orange-300">{step.number}</p>
                <h3 className="mt-4 text-lg font-semibold text-white">{step.title}</h3>
                <p className="mt-3 text-sm leading-6 text-white/65">{step.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white px-6 py-20 sm:px-10 sm:py-24 lg:px-16">
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-orange-600">
                Explore more
              </p>
              <h2 className="mt-4 font-serif text-3xl font-semibold text-[#142b58] sm:text-4xl">
                Connected capabilities
              </h2>
            </div>
            <Link
              href="/#service-back-office"
              className="inline-flex items-center gap-2 text-sm font-semibold text-[#142b58] transition hover:text-orange-700"
            >
              All services <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {relatedServices.map(([relatedSlug, relatedService]) => (
              <Link
                key={relatedSlug}
                href={`/service/${relatedSlug}`}
                className="group border border-slate-200 p-5 transition hover:border-orange-300 hover:bg-orange-50/40 sm:p-6"
              >
                <p className="font-mono text-xs text-orange-600">{relatedService.number}</p>
                <div className="mt-3 flex items-center justify-between gap-4">
                  <h3 className="text-base font-semibold text-[#142b58]">{relatedService.title}</h3>
                  <ArrowUpRight className="h-4 w-4 shrink-0 text-slate-400 transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-orange-600" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}