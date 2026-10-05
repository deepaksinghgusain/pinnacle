"use client";

import { useState, type ChangeEvent, type FormEvent } from "react";
import Link from "next/link";
import {
  ArrowRight,
  ArrowUpRight,
  Clock3,
  Globe2,
  Mail,
  MapPin,
  MessageSquare,
  ShieldCheck,
  Users,
} from "lucide-react";

type EnquiryValues = {
  fullName: string;
  organisation: string;
  phone: string;
  email: string;
  service: string;
  timeline: string;
  message: string;
  consent: boolean;
};

const initialValues: EnquiryValues = {
  fullName: "",
  organisation: "",
  phone: "",
  email: "",
  service: "",
  timeline: "",
  message: "",
  consent: false,
};

const processSteps = [
  {
    number: "01",
    title: "Submit Your Enquiry",
    copy: "Fill in the form and tell us what you are working on.",
  },
  {
    number: "02",
    title: "Discovery Call",
    copy: "We review your brief and schedule a focused session within 24 hours.",
  },
  {
    number: "03",
    title: "Tailored Solution Plan",
    copy: "We share a practical path with effort, timeline, and team structure.",
  },
];

const inputClassName =
  "mt-2 h-12 w-full rounded-lg border border-slate-200 bg-white px-4 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-orange-500 focus:ring-4 focus:ring-orange-500/10";

export default function ContactPage() {
  const [values, setValues] = useState(initialValues);
  const requiredCount = [
    values.fullName,
    values.organisation,
    values.phone,
    values.email,
    values.service,
    values.timeline,
    values.message,
    values.consent,
  ].filter(Boolean).length;
  const progress = Math.round((requiredCount / 8) * 100);

  const handleChange = (
    event: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = event.currentTarget;
    const checked =
      event.currentTarget instanceof HTMLInputElement &&
      event.currentTarget.type === "checkbox"
        ? event.currentTarget.checked
        : undefined;

    setValues((current) => ({
      ...current,
      [name]: checked ?? value,
    }) as EnquiryValues);
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const subject = encodeURIComponent(`Enquiry from ${values.fullName}`);
    const body = encodeURIComponent(
      [
        `Name: ${values.fullName}`,
        `Organisation: ${values.organisation}`,
        `Phone: ${values.phone}`,
        `Email: ${values.email}`,
        `Service interest: ${values.service}`,
        `Preferred timeline: ${values.timeline}`,
        "",
        values.message,
      ].join("\n"),
    );

    window.location.href = `mailto:contact@pinnacleserve.com?subject=${subject}&body=${body}`;
  };

  return (
    <div className="w-full bg-[#f4f6fb] text-slate-900">
      <div className="bg-[#142b58] px-6 py-2.5 text-xs text-white/75 sm:px-10 lg:px-16">
        <div className="mx-auto max-w-7xl">
          <Link href="/" className="transition hover:text-white">Home</Link>
          <span className="mx-2 text-white/35">›</span>
          <span className="text-orange-300">Contact Us</span>
        </div>
      </div>

      <main>
        <section className="relative isolate overflow-hidden bg-[#f7f8fc] px-6 pb-20 pt-16 sm:px-10 sm:pb-24 sm:pt-20 lg:px-16 lg:pt-24">
          <div className="pointer-events-none absolute inset-0 opacity-40 [background-image:radial-gradient(#aab4c5_0.8px,transparent_0.8px)] [background-size:24px_24px]" />
          <div className="pointer-events-none absolute -right-40 -top-60 h-[640px] w-[640px] rounded-full border border-orange-200/70" />
          <div className="relative mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-[1.15fr_0.85fr] lg:gap-16">
            <div className="max-w-2xl">
              <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-blue-200 bg-blue-50 px-3.5 py-1.5 text-[11px] font-semibold tracking-[0.16em] text-slate-600 uppercase">
                <span className="h-1.5 w-1.5 rounded-full bg-orange-500" />
                Get in touch
              </div>
              <h1 className="font-serif text-4xl leading-[1.05] font-semibold text-[#142b58] sm:text-5xl lg:text-6xl">
                Let&apos;s Build Something
                <span className="mt-1 block font-normal text-[#e87924] italic">
                  Remarkable Together
                </span>
              </h1>
              <p className="mt-6 max-w-xl text-sm leading-7 text-slate-600 sm:text-base">
                Whether you are planning a new product, modernising legacy infrastructure, or exploring AI and data transformation, our teams are ready to work with you from strategy to delivery.
              </p>

              <div className="mt-9 grid grid-cols-2 gap-x-7 gap-y-6 sm:grid-cols-4">
                <div>
                  <p className="font-serif text-2xl font-semibold text-[#142b58]">&lt; 24h</p>
                  <p className="mt-1 text-[10px] leading-4 font-medium tracking-[0.12em] text-slate-500 uppercase">First response</p>
                </div>
                <div>
                  <p className="font-serif text-2xl font-semibold text-[#142b58]">50+</p>
                  <p className="mt-1 text-[10px] leading-4 font-medium tracking-[0.12em] text-slate-500 uppercase">Expert specialists</p>
                </div>
                <div>
                  <p className="font-serif text-2xl font-semibold text-[#142b58]">Global</p>
                  <p className="mt-1 text-[10px] leading-4 font-medium tracking-[0.12em] text-slate-500 uppercase">Delivery teams</p>
                </div>
                <div>
                  <p className="font-serif text-2xl font-semibold text-[#142b58]">100%</p>
                  <p className="mt-1 text-[10px] leading-4 font-medium tracking-[0.12em] text-slate-500 uppercase">Secure engagement</p>
                </div>
              </div>
            </div>

            <div className="relative mx-auto flex aspect-square w-full max-w-[400px] items-center justify-center" aria-label="Contact Pinnacle Serve">
              <div className="absolute inset-[8%] rounded-full border border-slate-300/80" />
              <div className="absolute inset-[17%] rounded-full border border-slate-300/70" />
              <div className="absolute inset-[27%] rounded-full border border-orange-200/80" />
              <div className="absolute inset-[36%] rounded-full border border-orange-100" />
              <span className="absolute left-[14%] top-[50%] h-2 w-2 rounded-full bg-orange-500 shadow-[0_0_0_5px_rgba(249,115,22,0.12)]" />
              <span className="absolute right-[15%] top-[31%] h-2 w-2 rounded-full bg-blue-500 shadow-[0_0_0_5px_rgba(59,130,246,0.12)]" />
              <span className="absolute bottom-[19%] right-[28%] h-2 w-2 rounded-full bg-orange-400 shadow-[0_0_0_5px_rgba(249,115,22,0.12)]" />
              <div className="relative z-10 flex h-16 w-16 items-center justify-center rounded-2xl bg-[#e87924] text-white shadow-[0_14px_34px_rgba(232,121,36,0.35)]">
                <MessageSquare className="h-7 w-7" strokeWidth={1.8} />
              </div>

              <div className="absolute left-0 top-[13%] rounded-lg border border-slate-100 bg-white px-3 py-2 text-[11px] font-medium text-slate-600 shadow-lg shadow-slate-300/40">
                <Clock3 className="mr-1.5 inline h-3.5 w-3.5 text-orange-500" />&lt; 24h Response
              </div>
              <div className="absolute right-0 top-[15%] rounded-lg border border-slate-100 bg-white px-3 py-2 text-[11px] font-medium text-slate-600 shadow-lg shadow-slate-300/40">
                <ShieldCheck className="mr-1.5 inline h-3.5 w-3.5 text-orange-500" />100% Secure
              </div>
              <div className="absolute bottom-[13%] left-[3%] rounded-lg border border-slate-100 bg-white px-3 py-2 text-[11px] font-medium text-slate-600 shadow-lg shadow-slate-300/40">
                <Globe2 className="mr-1.5 inline h-3.5 w-3.5 text-orange-500" />Global Teams
              </div>
              <div className="absolute bottom-[12%] right-[1%] rounded-lg border border-slate-100 bg-white px-3 py-2 text-[11px] font-medium text-slate-600 shadow-lg shadow-slate-300/40">
                <Users className="mr-1.5 inline h-3.5 w-3.5 text-orange-500" />50+ Experts
              </div>
            </div>
          </div>
        </section>

        <section className="bg-[#111f3b] px-6 py-20 text-white sm:px-10 sm:py-24 lg:px-16">
          <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-20">
            <div>
              <p className="text-xs font-semibold tracking-[0.18em] text-orange-400 uppercase">Why work with us</p>
              <h2 className="mt-4 font-serif text-4xl leading-tight font-semibold sm:text-5xl">
                We Deliver.<br />Every Time.
              </h2>
              <p className="mt-6 max-w-md text-sm leading-7 text-slate-300">
                Pinnacle Serve brings enterprise-grade engineering, AI, and cloud expertise to help organisations accelerate their most critical programs. Every engagement begins with listening and ends with measurable outcomes.
              </p>
              <div className="mt-9 flex flex-col gap-4 border-t border-white/10 pt-6 sm:flex-row sm:gap-8">
                <a href="mailto:contact@pinnacleserve.com" className="inline-flex items-center gap-3 text-sm text-slate-200 transition hover:text-orange-300">
                  <Mail className="h-4 w-4 text-orange-400" />contact@pinnacleserve.com
                </a>
                <div className="inline-flex items-start gap-3 text-sm leading-5 text-slate-300">
                  <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-orange-400" />
                  <span>5th Floor, Tower D, Logix Cyberpark,<br />Sector 62, Noida, UP 201309</span>
                </div>
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-3">
              {processSteps.map((step) => (
                <article key={step.number} className="flex flex-col border-t border-orange-400/70 bg-white/[0.035] p-5 sm:p-6">
                  <span className="font-mono text-sm text-orange-400">{step.number}</span>
                  <h3 className="mt-6 text-lg font-semibold text-white">{step.title}</h3>
                  <p className="mt-3 text-sm leading-6 text-slate-400">{step.copy}</p>
                  <ArrowRight className="mt-auto pt-8 h-10 w-5 text-slate-500" />
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="send-message" className="px-6 py-20 sm:px-10 sm:py-24 lg:px-16">
          <div className="mx-auto grid max-w-7xl items-start gap-12 lg:grid-cols-[0.72fr_1.28fr] lg:gap-20">
            <div className="lg:sticky lg:top-28">
              <p className="text-xs font-semibold tracking-[0.18em] text-orange-600 uppercase">Contact us</p>
              <h2 className="mt-4 font-serif text-4xl leading-tight font-semibold text-[#142b58] sm:text-5xl">Send Us A Message</h2>
              <p className="mt-5 text-sm leading-7 text-slate-600">
                Fields marked * are required. We typically respond within one business day.
              </p>
              <div className="mt-8 rounded-xl border border-blue-100 bg-white p-5 shadow-sm">
                <p className="text-xs font-semibold tracking-[0.14em] text-slate-500 uppercase">Your enquiry</p>
                <div className="mt-4 flex items-center justify-between text-sm">
                  <span className="text-slate-600">Completion</span>
                  <span className="font-semibold text-[#142b58]">{progress}%</span>
                </div>
                <div className="mt-2 h-2 overflow-hidden rounded-full bg-slate-100">
                  <div className="h-full rounded-full bg-[#e87924] transition-[width] duration-300" style={{ width: `${progress}%` }} />
                </div>
                <p className="mt-3 text-xs text-slate-500">Your details stay secure and are only used to respond to your enquiry.</p>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="rounded-2xl border border-slate-200 bg-white p-6 shadow-[0_18px_60px_rgba(15,23,42,0.06)] sm:p-9">
              <fieldset>
                <legend className="text-xs font-semibold tracking-[0.16em] text-[#142b58] uppercase">Your details</legend>
                <div className="mt-5 grid gap-5 sm:grid-cols-2">
                  <label className="text-sm font-medium text-slate-700">
                    Full Name <span className="text-orange-600">*</span>
                    <input className={inputClassName} name="fullName" autoComplete="name" placeholder="Your name" value={values.fullName} onChange={handleChange} required />
                  </label>
                  <label className="text-sm font-medium text-slate-700">
                    Organisation <span className="text-orange-600">*</span>
                    <input className={inputClassName} name="organisation" autoComplete="organization" placeholder="Company or organisation" value={values.organisation} onChange={handleChange} required />
                  </label>
                  <label className="text-sm font-medium text-slate-700">
                    Phone Number <span className="text-orange-600">*</span>
                    <input className={inputClassName} name="phone" type="tel" autoComplete="tel" placeholder="+1 (555) 000-0000" value={values.phone} onChange={handleChange} required />
                  </label>
                  <label className="text-sm font-medium text-slate-700">
                    Email Address <span className="text-orange-600">*</span>
                    <input className={inputClassName} name="email" type="email" autoComplete="email" placeholder="you@company.com" value={values.email} onChange={handleChange} required />
                  </label>
                </div>
              </fieldset>

              <fieldset className="mt-9 border-t border-slate-100 pt-7">
                <legend className="text-xs font-semibold tracking-[0.16em] text-[#142b58] uppercase">Project info</legend>
                <div className="mt-5 grid gap-5 sm:grid-cols-2">
                  <label className="text-sm font-medium text-slate-700">
                    Service Interest <span className="text-orange-600">*</span>
                    <select className={inputClassName} name="service" value={values.service} onChange={handleChange} required>
                      <option value="" disabled>Select a service</option>
                      <option>AI &amp; Machine Learning</option>
                      <option>Digital Product Engineering</option>
                      <option>Cloud Engineering</option>
                      <option>Data Services</option>
                      <option>Automation Services</option>
                      <option>Managed Services</option>
                      <option>Other</option>
                    </select>
                  </label>
                  <label className="text-sm font-medium text-slate-700">
                    Preferred Timeline <span className="text-orange-600">*</span>
                    <select className={inputClassName} name="timeline" value={values.timeline} onChange={handleChange} required>
                      <option value="" disabled>Select a timeline</option>
                      <option>Immediately</option>
                      <option>Within 1 month</option>
                      <option>1-3 months</option>
                      <option>3-6 months</option>
                      <option>Exploring options</option>
                    </select>
                  </label>
                </div>
              </fieldset>

              <fieldset className="mt-9 border-t border-slate-100 pt-7">
                <legend className="text-xs font-semibold tracking-[0.16em] text-[#142b58] uppercase">Your message</legend>
                <label className="mt-5 block text-sm font-medium text-slate-700">
                  Message <span className="text-orange-600">*</span>
                  <textarea className="mt-2 min-h-36 w-full resize-y rounded-lg border border-slate-200 bg-white px-4 py-3 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-orange-500 focus:ring-4 focus:ring-orange-500/10" name="message" maxLength={1000} placeholder="Tell us a little about your project and what you would like to achieve..." value={values.message} onChange={handleChange} required />
                  <span className="mt-1 block text-right text-xs text-slate-400">{values.message.length} / 1000</span>
                </label>
              </fieldset>

              <label className="mt-6 flex items-start gap-3 text-sm leading-6 text-slate-600">
                <input className="mt-1 h-4 w-4 shrink-0 accent-orange-600" name="consent" type="checkbox" checked={values.consent} onChange={handleChange} required />
                <span>I agree to be contacted by Pinnacle Serve regarding this enquiry.</span>
              </label>

              <div className="mt-7 flex flex-col gap-3 border-t border-slate-100 pt-6 sm:flex-row sm:items-center sm:justify-between">
                <p className="text-xs leading-5 text-slate-500">Submitting opens a pre-filled email to our team.</p>
                <button type="submit" className="inline-flex h-12 items-center justify-center gap-2 rounded-full bg-[#e87924] px-7 text-sm font-semibold text-white shadow-md shadow-orange-900/15 transition hover:bg-[#d66d1e] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-600">
                  Send Message
                  <ArrowUpRight className="h-4 w-4" />
                </button>
              </div>
            </form>
          </div>
        </section>
      </main>
    </div>
  );
}
