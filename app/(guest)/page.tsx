"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  MessageSquare,
  ArrowDown,
  FileText,
  ChevronLeft,
  ChevronRight,
  Quote,
  ArrowUpRight,
  CheckCircle2,
  Globe,
  Building2,
  Users,
  GraduationCap,
  Sparkles,
  BarChart3,
  LineChart,
  Wrench,
  Cog,
  Car,
} from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from "@/components/ui/carousel";

// Industry examples for Pinnacle Serve
const industries = [
  {
    title: "Healthcare",
    subtitle: "Agentic AI",
    subtitleColor: "text-[#2dd4bf]",
    lineColor: "bg-[#2dd4bf]",
    description:
      "Autonomous AI workflows that streamline patient engagement, optimise operations, and deliver measurable outcomes across the care continuum.",
    tag: "PATIENT CARE",
    image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=1400&q=85",
    alt: "Healthcare professionals analyzing clinical patient data",
  },
  {
    title: "Banking",
    subtitle: "Agentic AI",
    subtitleColor: "text-[#60a5fa]",
    lineColor: "bg-[#3b82f6]",
    description:
      "Autonomous AI workflows that streamline customer engagement, optimize operations, and deliver measurable outcomes across the financial services lifecycle.",
    tag: "FINANCIAL SERVICES",
    image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&w=1400&q=85",
    alt: "Financial documents, tax forms and banking tools",
  },
  {
    title: "Telecom",
    subtitle: "Networks",
    subtitleColor: "text-[#c084fc]",
    lineColor: "bg-[#a855f7]",
    description:
      "Modernize complex, always-on telecom networks with 5G, network operations, and customer experience — engineering, automation, and AI built for scale.",
    tag: "NETWORK OPS",
    image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1400&q=85",
    alt: "High performance telecom terminal code and data streams",
  },
  {
    title: "Retail",
    subtitle: "Commerce",
    subtitleColor: "text-[#fb923c]",
    lineColor: "bg-[#f97316]",
    description:
      "Intelligent AI agents that orchestrate customer engagement, merchandising, inventory, and omnichannel fulfilment to transform retail operations.",
    tag: "COMMERCE",
    image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=1400&q=85",
    alt: "Modern retail and commerce merchandising store",
  },
  {
    title: "Manufacturing",
    subtitle: "Operations",
    subtitleColor: "text-[#60a5fa]",
    lineColor: "bg-[#38bdf8]",
    description:
      "AI agents for production, supply chain, quality management, and maintenance — driving operational excellence across the plant floor.",
    tag: "OPERATIONS",
    image: "https://images.unsplash.com/photo-1567789884554-0b844b597180?auto=format&fit=crop&w=1400&q=85",
    alt: "Advanced precision manufacturing assembly and robotics",
  },
];

// Pinnacle Serve capability areas
const capabilities = [
  {
    num: "01",
    tabTitle: "AI Services",
    kicker: "Artificial Intelligence",
    titleLine1: "AI",
    titleLine2: "Services",
    description:
      "Build secure, scalable, and enterprise-ready AI capabilities that accelerate innovation and deliver measurable business value.",
    bg: "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&w=1400&q=85",
    link: "/what-we-offer/ai-services",
  },
  {
    num: "02",
    tabTitle: "Product Eng.",
    kicker: "Product Engineering",
    titleLine1: "Digital Product",
    titleLine2: "Engineering",
    description:
      "End-to-end product engineering — strategy, design, build, and continuous delivery for market-defining digital products and platforms.",
    bg: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1400&q=85",
    link: "/what-we-offer/digital-product-engineering",
  },
  {
    num: "03",
    tabTitle: "Cloud",
    kicker: "Cloud Infrastructure",
    titleLine1: "Cloud",
    titleLine2: "Engineering",
    description:
      "Enterprise-grade cloud architecture, migration, platform engineering, and DevSecOps to build resilient, scalable, and intelligent cloud ecosystems.",
    bg: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1400&q=85",
    link: "/what-we-offer/cloud-engineering",
  },
  {
    num: "04",
    tabTitle: "Data",
    kicker: "Data & Analytics",
    titleLine1: "Data",
    titleLine2: "Services",
    description:
      "Build trusted, governed, and scalable enterprise data ecosystems that power analytics, AI, and confident decision-making.",
    bg: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1400&q=85",
    link: "/what-we-offer/data-services",
  },
  {
    num: "05",
    tabTitle: "RCM",
    kicker: "Revenue Cycle",
    titleLine1: "RCM as a",
    titleLine2: "Service",
    description:
      "Optimise reimbursement, reduce denials, and improve cash flow with intelligent, scalable, healthcare-focused RCM operations.",
    bg: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&w=1400&q=85",
    link: "/what-we-offer/rcm",
  },
  {
    num: "06",
    tabTitle: "Automation",
    kicker: "Automation",
    titleLine1: "Automation",
    titleLine2: "Services",
    description:
      "From RPA and intelligent document processing to AI-driven workflow orchestration — automate complex business processes at scale with governance and resilience.",
    bg: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=1400&q=85",
    link: "/what-we-offer/automation-services",
  },
  {
    num: "07",
    tabTitle: "Managed",
    kicker: "Managed IT",
    titleLine1: "Managed",
    titleLine2: "Services",
    description:
      "From 24/7 monitoring and incident response to cloud and cybersecurity operations — keep your technology estate secure, resilient, and continuously optimised.",
    bg: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1400&q=85",
    link: "/what-we-offer/managed-services",
  },
  {
    num: "08",
    tabTitle: "Property",
    kicker: "Property",
    titleLine1: "Property",
    titleLine2: "Operations",
    description:
      "Transform property operations, service delivery, and resident support with intelligent AI agents that orchestrate work across systems.",
    bg: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1400&q=85",
    link: "/what-we-offer/utilities-management",
  },
];

// Client testimonials
const testimonials = [
  {
    quote:
      "Pinnacle Serve's AI solution reduced our manual processing time by 80%. Their team truly understands enterprise needs.",
    role: "VP of Technology",
    company: "Global Healthcare Network",
    initials: "VP",
  },
  {
    quote:
      "Our cloud migration was seamless. Zero downtime, 40% cost reduction, and incredible ongoing support.",
    role: "Head of Infrastructure",
    company: "Fintech Enterprise",
    initials: "HI",
  },
  {
    quote:
      "Working with Pinnacle Serve for 3 years now. They're not just a vendor — they're a true technology partner committed to our growth.",
    role: "Chief Digital Officer",
    company: "Retail Group",
    initials: "CD",
  },
  {
    quote:
      "Their DevOps team transformed our deployment pipeline. We ship 10x faster with complete confidence now.",
    role: "Director of Engineering",
    company: "Telecom Innovations",
    initials: "DE",
  },
];

export default function Home() {
  const [carouselApi, setCarouselApi] = useState<CarouselApi>();
  const [currentSlide, setCurrentSlide] = useState(5);
  const [totalSlides, setTotalSlides] = useState(5);

  // Active capability state: default to 2 (03 Cloud Engineering as in user screenshot)
  const [activeCapabilityIndex, setActiveCapabilityIndex] = useState(2);

  useEffect(() => {
    if (!carouselApi) return;

    setTotalSlides(carouselApi.scrollSnapList().length);
    setCurrentSlide(carouselApi.selectedScrollSnap() + 1);

    const onSelect = () => {
      setCurrentSlide(carouselApi.selectedScrollSnap() + 1);
    };

    carouselApi.on("select", onSelect);
    carouselApi.on("reInit", onSelect);

    return () => {
      carouselApi.off("select", onSelect);
    };
  }, [carouselApi]);
  const scrollToNextSection = () => {
    const section = document.getElementById("about-pinnacle");
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="relative w-full flex flex-col bg-slate-950 text-white">
      {/* ========================================================= */}
      {/* 1. HERO SECTION */}
      {/* ========================================================= */}
      <section className="relative min-h-screen w-full flex flex-col justify-between overflow-hidden">
        {/* Background with layered atmospheric lighting matching the image */}
        <div className="absolute inset-0 z-0">
          {/* Office collaboration photo with warm/cool lighting */}
          <Image
            src="https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=2850&q=85"
            alt="A collaborative team working in a modern office"
            fill
            priority
            sizes="100vw"
            className="object-cover object-center filter brightness-[0.45] contrast-[1.1] scale-105"
          />

          {/* Left warm amber/cognac lighting overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#d97706]/25 via-slate-950/60 to-[#1e3a8a]/40 mix-blend-screen pointer-events-none" />

          {/* Right deep navy blue gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-l from-[#0f2854]/80 via-transparent to-transparent pointer-events-none" />

          {/* Global cinematic dark vignette and smoothing layer */}
          <div className="absolute inset-0 bg-slate-950/50 backdrop-blur-[1px] pointer-events-none" />
        </div>

        {/* Main Hero Content */}
        <div className="relative z-10 flex-1 flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8 text-center pt-32 pb-20">
          <div className="mx-auto flex flex-col items-center">
            {/* Main Headline */}
            <h1 className="font-serif font-bold text-white tracking-tight leading-[1.08] text-4xl sm:text-6xl md:text-7xl lg:text-[5.4rem] xl:text-[6.2rem] drop-shadow-md">
              Make complex work
              <span className="block mt-1 sm:mt-2">
                <span className="text-[#e36a1e] italic font-serif font-bold inline-block mr-3 md:mr-5 drop-shadow-[0_2px_10px_rgba(227,106,30,0.35)]">
                  simpler
                </span>
                and more effective
              </span>
            </h1>

            {/* Subtitle Paragraph */}
            <p className="mt-8 sm:mt-10 text-slate-200/90 text-sm sm:text-base md:text-lg font-light leading-relaxed tracking-wide drop-shadow max-w-4xl">
              Pinnacle Serve helps organizations improve how work gets done through
              practical operational and technology support.
              <span className="block sm:mt-1">
                Our teams bring together people, processes, and technology
              </span>
              <span className="block sm:mt-1">
                to strengthen service, efficiency, and growth.
              </span>
            </p>
          </div>
        </div>

        {/* Hero Scroll Down Prompt */}
        <div className="relative z-20 pb-8 pr-6 sm:pr-10 lg:pr-14 flex flex-col items-end gap-2 self-end pointer-events-auto">
          <button
            onClick={scrollToNextSection}
            className="flex items-center gap-1.5 text-white/70 hover:text-white transition-colors cursor-pointer animate-bounce mr-6"
            aria-label="Explore how Pinnacle Serve works"
          >
            <ArrowDown className="w-5 h-5" strokeWidth={2.5} />
          </button>
        </div>
      </section>

      {/* ========================================================= */}
      {/* 2. ABOUT PINNACLE SERVE SECTION */}
      {/* ========================================================= */}
      <section
        id="about-pinnacle"
        className="relative w-full bg-[#030917] text-white py-24 sm:py-32 px-6 sm:px-10 lg:px-16 overflow-hidden border-t border-slate-900"
      >
        {/* Ambient lighting effects */}
        <div className="absolute top-1/4 left-10 w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[140px] pointer-events-none" />
        <div className="absolute bottom-10 right-10 w-[450px] h-[450px] bg-orange-600/10 rounded-full blur-[140px] pointer-events-none" />

        <div className="relative max-w-7xl mx-auto">
          {/* Top Row: Pill, Title, Story, and Features */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
            {/* Left Column: Story & CTA */}
            <div className="lg:col-span-5 flex flex-col items-start">
              {/* Badge */}
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#f06425]/40 bg-[#f06425]/10 text-[#f06425] text-xs font-semibold tracking-wider uppercase mb-6 shadow-sm">
                <span className="w-1.5 h-1.5 rounded-full bg-[#f06425]" />
                <span>About Pinnacle Serve</span>
              </div>

              {/* Heading */}
              <h2 className="font-serif text-4xl sm:text-5xl lg:text-[3.5rem] font-bold text-white tracking-tight leading-[1.12]">
                Better operations. <span className="text-[#f06425] italic font-serif font-normal">Stronger outcomes.</span>
              </h2>

              {/* Short Company Story */}
              <p className="mt-6 text-slate-300 text-base sm:text-lg leading-relaxed font-light">
                Founded in 2024, Pinnacle Serve brings dependable operations and modern technology together, helping global clients make change practical, resilient, and ready to scale.
              </p>

              {/* Story Highlights */}
              <div className="grid grid-cols-2 gap-4 my-8 w-full">
                <div className="p-4 rounded-xl bg-[#091526]/80 border border-slate-800/80">
                  <span className="text-2xl font-bold font-serif text-[#f06425]">2024</span>
                  <p className="text-xs text-slate-400 mt-1 font-medium">Founded</p>
                </div>
                <div className="p-4 rounded-xl bg-[#091526]/80 border border-slate-800/80">
                  <span className="text-2xl font-bold font-serif text-white">Global</span>
                  <p className="text-xs text-slate-400 mt-1 font-medium">Global delivery</p>
                </div>
              </div>

              {/* CTA Button */}
              <Link
                href="/about"
                className="group inline-flex items-center gap-2.5 bg-[#e36a1e] hover:bg-[#cc5c15] active:scale-[0.98] text-white font-semibold text-sm sm:text-base px-7 py-3.5 rounded-full shadow-lg shadow-orange-950/40 hover:shadow-orange-500/30 transition-all duration-200 cursor-pointer"
              >
                <span>Meet Pinnacle Serve</span>
                <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </Link>
            </div>

            {/* Right Column: Key Operational Pillars */}
            <div className="lg:col-span-7 flex flex-col justify-center">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* 1. Supporting Global Clients */}
                <div className="p-5 sm:p-6 rounded-2xl bg-[#091526]/85 border border-slate-800/80 hover:border-slate-700/80 transition-all group">
                  <div className="w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400 mb-4 group-hover:scale-105 transition-transform">
                    <Globe className="w-5 h-5" />
                  </div>
                  <h3 className="text-white font-semibold text-base mb-1.5 group-hover:text-amber-400 transition-colors">
                    Global Client Support
                  </h3>
                  <p className="text-slate-400 text-xs sm:text-sm leading-relaxed font-light">
                    Reliable operational coverage and consistent delivery for teams working across regions and time zones.
                  </p>
                </div>

                {/* 2. Backoffice Operations with IT Consulting & Support */}
                <div className="p-5 sm:p-6 rounded-2xl bg-[#091526]/85 border border-slate-800/80 hover:border-slate-700/80 transition-all group">
                  <div className="w-10 h-10 rounded-xl bg-orange-500/10 border border-orange-500/20 flex items-center justify-center text-[#f06425] mb-4 group-hover:scale-105 transition-transform">
                    <Building2 className="w-5 h-5" />
                  </div>
                  <h3 className="text-white font-semibold text-base mb-1.5 group-hover:text-amber-400 transition-colors">
                    Operations &amp; IT Consulting
                  </h3>
                  <p className="text-slate-400 text-xs sm:text-sm leading-relaxed font-light">
                    Connect back-office support with IT guidance, process automation, and ongoing technology care.
                  </p>
                </div>

                {/* 3. Specialized Transition team */}
                <div className="p-5 sm:p-6 rounded-2xl bg-[#091526]/85 border border-slate-800/80 hover:border-slate-700/80 transition-all group">
                  <div className="w-10 h-10 rounded-xl bg-teal-500/10 border border-teal-500/20 flex items-center justify-center text-teal-400 mb-4 group-hover:scale-105 transition-transform">
                    <CheckCircle2 className="w-5 h-5" />
                  </div>
                  <h3 className="text-white font-semibold text-base mb-1.5 group-hover:text-amber-400 transition-colors">
                    Smooth Transitions
                  </h3>
                  <p className="text-slate-400 text-xs sm:text-sm leading-relaxed font-light">
                    Start new engagements with clear knowledge transfer, documented procedures, and a careful handover.
                  </p>
                </div>

                {/* 4. Specialized Operational Support Teams */}
                <div className="p-5 sm:p-6 rounded-2xl bg-[#091526]/85 border border-slate-800/80 hover:border-slate-700/80 transition-all group">
                  <div className="w-10 h-10 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400 mb-4 group-hover:scale-105 transition-transform">
                    <Users className="w-5 h-5" />
                  </div>
                  <h3 className="text-white font-semibold text-base mb-1.5 group-hover:text-amber-400 transition-colors">
                    Dedicated Operations Teams
                  </h3>
                  <p className="text-slate-400 text-xs sm:text-sm leading-relaxed font-light">
                    Skilled teams take ownership of daily work and keep service commitments visible and on track.
                  </p>
                </div>

                {/* 5. Specialized Training & Development Team */}
                <div className="p-5 sm:p-6 rounded-2xl bg-[#091526]/85 border border-slate-800/80 hover:border-slate-700/80 transition-all group">
                  <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400 mb-4 group-hover:scale-105 transition-transform">
                    <GraduationCap className="w-5 h-5" />
                  </div>
                  <h3 className="text-white font-semibold text-base mb-1.5 group-hover:text-amber-400 transition-colors">
                    Training &amp; Development
                  </h3>
                  <p className="text-slate-400 text-xs sm:text-sm leading-relaxed font-light">
                    Ongoing learning and certification help our people keep their skills current.
                  </p>
                </div>

                {/* 6. Trained Agents & Scalability */}
                <div className="p-5 sm:p-6 rounded-2xl bg-[#091526]/85 border border-slate-800/80 hover:border-slate-700/80 transition-all group">
                  <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 mb-4 group-hover:scale-105 transition-transform">
                    <Sparkles className="w-5 h-5" />
                  </div>
                  <h3 className="text-white font-semibold text-base mb-1.5 group-hover:text-amber-400 transition-colors">
                    Flexible, Trained Teams
                  </h3>
                  <p className="text-slate-400 text-xs sm:text-sm leading-relaxed font-light">
                    Add trained specialists as needs change, with quality and consistent delivery built into the model.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================= */}
      {/* 3. OUR SERVICES SECTION */}
      {/* ========================================================= */}
      <section
        id="our-services"
        className="relative w-full bg-[#050f21] text-white py-24 sm:py-32 px-6 sm:px-10 lg:px-16 overflow-hidden border-t border-slate-900"
      >
        {/* Ambient atmospheric gradients */}
        <div className="absolute top-1/3 -right-20 w-[550px] h-[550px] bg-blue-600/10 rounded-full blur-[160px] pointer-events-none" />
        <div className="absolute -bottom-10 -left-20 w-[450px] h-[450px] bg-orange-600/10 rounded-full blur-[140px] pointer-events-none" />

        <div className="relative max-w-7xl mx-auto">
          {/* Section Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16 pb-10 border-b border-slate-800/60">
            <div>
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#f06425]/40 bg-[#f06425]/10 text-[#f06425] text-xs font-semibold tracking-wider uppercase mb-5 shadow-sm">
                <span className="w-1.5 h-1.5 rounded-full bg-[#f06425]" />
                <span>How We Help</span>
              </div>
              <h2 className="font-serif text-4xl sm:text-5xl lg:text-[3.25rem] font-bold text-white tracking-tight leading-[1.12]">
                Support for <span className="text-[#f06425] italic font-serif font-normal">Everyday Progress</span>
              </h2>
            </div>
            <p className="text-slate-300 text-sm sm:text-base max-w-md font-light leading-relaxed">
              Practical services that help teams work accurately, respond faster, and grow with confidence.
            </p>
          </div>

          {/* Service Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Card 1: Back Office Operations */}
            <div id="service-back-office" className="group relative rounded-2xl bg-[#091526]/85 hover:bg-[#0c1d36] border border-slate-800/80 hover:border-slate-700/80 p-7 sm:p-8 transition-all duration-300 shadow-sm hover:shadow-xl hover:shadow-blue-950/30 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-6">
                  <div className="w-12 h-12 rounded-xl bg-orange-500/10 border border-orange-500/20 flex items-center justify-center text-[#f06425] group-hover:scale-105 transition-transform">
                    <BarChart3 className="w-6 h-6" />
                  </div>
                  <span className="text-xs font-mono text-slate-500 group-hover:text-slate-400 font-semibold tracking-wider">
                    01
                  </span>
                </div>
                <h3 className="text-white font-semibold text-xl tracking-tight mb-3 group-hover:text-amber-400 transition-colors">
                  Back Office Operations
                </h3>
                <p className="text-slate-400 text-sm sm:text-[15px] leading-relaxed font-light">
                  Dependable processing, organized records, and hands-on workflow support for essential business tasks.
                </p>
              </div>
              <div className="pt-8 flex items-center text-xs font-medium text-slate-400 group-hover:text-[#f06425] transition-colors">
                <span>Improve day-to-day processing</span>
                <span className="ml-1.5 group-hover:translate-x-1 transition-transform">→</span>
              </div>
            </div>

            {/* Card 2: Reporting & Analytics */}
            <div id="service-reporting" className="group relative rounded-2xl bg-[#091526]/85 hover:bg-[#0c1d36] border border-slate-800/80 hover:border-slate-700/80 p-7 sm:p-8 transition-all duration-300 shadow-sm hover:shadow-xl hover:shadow-blue-950/30 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-6">
                  <div className="w-12 h-12 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400 group-hover:scale-105 transition-transform">
                    <LineChart className="w-6 h-6" />
                  </div>
                  <span className="text-xs font-mono text-slate-500 group-hover:text-slate-400 font-semibold tracking-wider">
                    02
                  </span>
                </div>
                <h3 className="text-white font-semibold text-xl tracking-tight mb-3 group-hover:text-amber-400 transition-colors">
                  Reporting &amp; Analytics
                </h3>
                <p className="text-slate-400 text-sm sm:text-[15px] leading-relaxed font-light">
                  Clear dashboards and useful analysis give teams a better view of performance and next steps.
                </p>
              </div>
              <div className="pt-8 flex items-center text-xs font-medium text-slate-400 group-hover:text-[#f06425] transition-colors">
                <span>Turn reporting into action</span>
                <span className="ml-1.5 group-hover:translate-x-1 transition-transform">→</span>
              </div>
            </div>

            {/* Card 3: Technical Support */}
            <div id="service-technical-support" className="group relative rounded-2xl bg-[#091526]/85 hover:bg-[#0c1d36] border border-slate-800/80 hover:border-slate-700/80 p-7 sm:p-8 transition-all duration-300 shadow-sm hover:shadow-xl hover:shadow-blue-950/30 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-6">
                  <div className="w-12 h-12 rounded-xl bg-teal-500/10 border border-teal-500/20 flex items-center justify-center text-teal-400 group-hover:scale-105 transition-transform">
                    <Wrench className="w-6 h-6" />
                  </div>
                  <span className="text-xs font-mono text-slate-500 group-hover:text-slate-400 font-semibold tracking-wider">
                    03
                  </span>
                </div>
                <h3 className="text-white font-semibold text-xl tracking-tight mb-3 group-hover:text-amber-400 transition-colors">
                  Technical Support
                </h3>
                <p className="text-slate-400 text-sm sm:text-[15px] leading-relaxed font-light">
                  Guidance, implementation, managed support, and automation to keep technology useful and dependable.
                </p>
              </div>
              <div className="pt-8 flex items-center text-xs font-medium text-slate-400 group-hover:text-[#f06425] transition-colors">
                <span>Get practical technical support</span>
                <span className="ml-1.5 group-hover:translate-x-1 transition-transform">→</span>
              </div>
            </div>

            {/* Card 4: Process Management */}
            <div id="service-process-management" className="group relative rounded-2xl bg-[#091526]/85 hover:bg-[#0c1d36] border border-slate-800/80 hover:border-slate-700/80 p-7 sm:p-8 transition-all duration-300 shadow-sm hover:shadow-xl hover:shadow-blue-950/30 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-6">
                  <div className="w-12 h-12 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400 group-hover:scale-105 transition-transform">
                    <Cog className="w-6 h-6" />
                  </div>
                  <span className="text-xs font-mono text-slate-500 group-hover:text-slate-400 font-semibold tracking-wider">
                    04
                  </span>
                </div>
                <h3 className="text-white font-semibold text-xl tracking-tight mb-3 group-hover:text-amber-400 transition-colors">
                  Process Management
                </h3>
                <p className="text-slate-400 text-sm sm:text-[15px] leading-relaxed font-light">
                  Documented processes and quality checks make work easier to repeat, review, and improve.
                </p>
              </div>
              <div className="pt-8 flex items-center text-xs font-medium text-slate-400 group-hover:text-[#f06425] transition-colors">
                <span>Build consistent ways of working</span>
                <span className="ml-1.5 group-hover:translate-x-1 transition-transform">→</span>
              </div>
            </div>

            {/* Card 5: Banking Finance Support Services */}
            <div id="service-banking-finance" className="group relative rounded-2xl bg-[#091526]/85 hover:bg-[#0c1d36] border border-slate-800/80 hover:border-slate-700/80 p-7 sm:p-8 transition-all duration-300 shadow-sm hover:shadow-xl hover:shadow-blue-950/30 flex flex-col justify-between md:col-span-2 lg:col-span-2">
              <div>
                <div className="flex items-center justify-between mb-6">
                  <div className="w-12 h-12 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400 group-hover:scale-105 transition-transform">
                    <Car className="w-6 h-6" />
                  </div>
                  <span className="text-xs font-mono text-slate-500 group-hover:text-slate-400 font-semibold tracking-wider">
                    05
                  </span>
                </div>
                <h3 className="text-white font-semibold text-xl tracking-tight mb-3 group-hover:text-amber-400 transition-colors">
                  Banking Finance Support Services
                </h3>
                <p className="text-slate-400 text-sm sm:text-[15px] leading-relaxed font-light max-w-2xl">
                  Dedicated operational support for organizations working in recovery and repossession.
                </p>
              </div>
              <div className="pt-8 flex items-center text-xs font-medium text-slate-400 group-hover:text-[#f06425] transition-colors">
                <span>Support finance and recovery work</span>
                <span className="ml-1.5 group-hover:translate-x-1 transition-transform">→</span>
              </div>
            </div>
          </div>

          {/* CTA Button */}
          <div className="mt-14 flex items-center justify-center">
            <Link
              href="/services"
              className="group inline-flex items-center gap-2.5 bg-[#e36a1e] hover:bg-[#cc5c15] active:scale-[0.98] text-white font-semibold text-sm sm:text-base px-8 py-3.5 rounded-full shadow-lg shadow-orange-950/40 hover:shadow-orange-500/30 transition-all duration-200 cursor-pointer"
            >
              <span>Explore Our Services</span>
              <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </Link>
          </div>
        </div>
      </section>

      {/* ========================================================= */}
      {/* 4. WHY CHOOSE PINNACLE SERVE */}
      {/* ========================================================= */}
      <section
        id="why-choose-us"
        className="relative w-full bg-[#030917] text-white py-20 sm:py-24 px-6 sm:px-10 lg:px-16 border-t border-slate-800/70"
      >
        <div className="relative max-w-7xl mx-auto">
          <div className="mb-12 sm:mb-14">
            <p className="text-xs font-semibold tracking-[0.2em] text-[#f06425] uppercase mb-3">
              Why Pinnacle Serve
            </p>
            <h2 className="font-serif text-4xl sm:text-5xl font-bold tracking-tight text-white">
              Why Clients Choose Us
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 divide-y sm:divide-y-0 sm:divide-x divide-slate-800/80">
            <div className="py-6 sm:px-6 sm:py-2 first:pl-0">
              <Users className="w-6 h-6 text-teal-400 mb-5" aria-hidden="true" />
              <h3 className="text-lg font-semibold text-white">Scalable Teams</h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-400">
                Add trained capacity as your workload and business needs grow.
              </p>
            </div>

            <div className="py-6 sm:px-6 sm:py-2">
              <BarChart3 className="w-6 h-6 text-orange-400 mb-5" aria-hidden="true" />
              <h3 className="text-lg font-semibold text-white">Cost Effective Delivery</h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-400">
                Reliable operational support designed to make resources go further.
              </p>
            </div>

            <div className="py-6 sm:px-6 sm:py-2">
              <Cog className="w-6 h-6 text-blue-400 mb-5" aria-hidden="true" />
              <h3 className="text-lg font-semibold text-white">Structured Processes</h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-400">
                Consistent workflows, clear ownership, and quality checkpoints.
              </p>
            </div>

            <div className="py-6 sm:px-6 sm:py-2 last:pr-0">
              <LineChart className="w-6 h-6 text-amber-400 mb-5" aria-hidden="true" />
              <h3 className="text-lg font-semibold text-white">Management Visibility &amp; Reporting</h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-400">
                Actionable reporting that keeps performance and outcomes in view.
              </p>
            </div>
          </div>
        </div>
      </section>



      {/* ========================================================= */}
      {/* 5. CLIENT PRAISE / TESTIMONIALS SECTION */}
      {/* ========================================================= */}
      <section className="relative w-full bg-[#040d1a] text-white py-24 sm:py-32 px-6 sm:px-10 lg:px-16 overflow-hidden border-t border-slate-900">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-blue-900/10 rounded-full blur-[160px] pointer-events-none" />

        <div className="relative max-w-7xl mx-auto">
          {/* Section Heading */}
          <div className="flex flex-col items-center text-center mb-16 sm:mb-20">
            <div className="inline-flex items-center px-4 py-1.5 rounded-full border border-orange-500/30 bg-orange-500/10 text-[#f06425] text-xs font-semibold tracking-wider uppercase mb-5">
              TESTIMONIALS
            </div>
            <h2 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white">
              From Strategy to <span className="text-[#f06425] italic font-serif">Success</span>
            </h2>
            <p className="mt-4 text-slate-400 text-sm sm:text-base max-w-xl font-light">
              Trusted by enterprise leaders across financial services, healthcare, telecom, and retail.
            </p>
          </div>

          {/* Testimonials Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
            {testimonials.map((t, idx) => (
              <div
                key={idx}
                className="group relative bg-[#091526]/80 hover:bg-[#0c1d36] border border-slate-800/80 hover:border-slate-700 rounded-2xl p-7 sm:p-9 transition-all duration-300 shadow-lg flex flex-col justify-between"
              >
                <div className="mb-6">
                  <Quote className="w-8 h-8 text-[#f06425]/40 mb-4" />
                  <p className="text-slate-200 text-base sm:text-lg leading-relaxed font-light">
                    &ldquo;{t.quote}&rdquo;
                  </p>
                </div>

                <div className="flex items-center gap-4 pt-4 border-t border-slate-800/60">
                  <div aria-hidden="true" className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-full border border-orange-400/30 bg-gradient-to-br from-orange-400/25 to-blue-500/25 text-xs font-semibold tracking-wide text-orange-100">
                    {t.initials}
                  </div>
                  <div>
                    <h5 className="text-white font-semibold text-sm sm:text-base">
                      {t.role}
                    </h5>
                    <p className="text-slate-400 text-xs sm:text-sm font-light">
                      {t.company}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
