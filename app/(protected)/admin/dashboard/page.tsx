import { Suspense } from "react";
import Link from "next/link"
import {
  BarChart3,
  BriefcaseBusiness,
  BriefcaseBusinessIcon,
  ClipboardPenLine,
  Database,
  Mail,
  User,
} from "lucide-react"

import { getRequestSession } from "@/lib/auth-session";

import { Card, CardContent } from "@/components/ui/card"
import { getUsers } from "@/lib/actions/user-action";
import { getBanner } from "@/lib/actions/banner-action";
import { getTestimonials } from "@/lib/actions/testimonial-action";
import { getNewsletter } from "@/lib/actions/newsletter-action";
import { getApplications } from "@/lib/actions/application-action";
import { getJobs } from "@/lib/actions/job-action";
import { getEnquiry } from "@/lib/actions/enquiry-action";
import { getServices } from "@/lib/actions/service-action";
import { getServiceCategory } from "@/lib/actions/service-category-action";


export default function AdminDashboardPage() {
  return (
    <Suspense
      fallback={
        <div className="space-y-6" role="status" aria-label="Loading dashboard">
          <div className="h-36 animate-pulse rounded-3xl bg-muted" />
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {Array.from({ length: 8 }, (_, index) => (
              <div key={index} className="h-28 animate-pulse rounded-lg bg-muted" />
            ))}
          </div>
        </div>
      }
    >
      <DashboardContent />
    </Suspense>
  );
}

async function DashboardContent() {
  const [session, users, banners, testimonials, newsletters, careerApplications, jobs, leads, services, serviceCategory] = await Promise.all([
    getRequestSession(),
    getUsers(),
    getBanner(),
    getTestimonials(),
    getNewsletter(),
    getApplications(),
    getJobs(),
    getEnquiry(),
    getServices(),
    getServiceCategory(),
  ]);

  const stats = [
    { label: "Users", href: "/admin/user", value: users.length, icon: User },
    { label: "Banners", href: "/admin/banner", value: banners.length, icon: BarChart3 },
    { label: "Testimonials",href: "/admin/testimonial", value: testimonials.length, icon: ClipboardPenLine },
    { label: "Newsletters",href: "/admin/newsletter", value: newsletters.length, icon: Mail },
    { label: "Career Applications",href: "/admin/career", value: careerApplications.length, icon: BriefcaseBusiness },
    { label: "Jobs", href: "/admin/job", value: jobs.length, icon: BriefcaseBusiness },
    { label: "Leads", href: "/admin/enquiry", value: leads.length, icon: Mail },
    { label: "Services", href: "/admin/service", value: services.length, icon: Database },
    { label: "Service Categories", href: "/admin/service-category", value: serviceCategory.length, icon: BriefcaseBusinessIcon },
  ]

  return (
    <div className="space-y-6 pb-6">
      <section className="relative overflow-hidden rounded-3xl border border-slate-200 bg-[linear-gradient(135deg,#0f172a_0%,#111827_45%,#1d4ed8_100%)] px-6 py-8 text-white shadow-[0_20px_60px_rgba(15,23,42,0.18)] sm:px-8">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.12),transparent_32%),radial-gradient(circle_at_bottom_left,rgba(56,189,248,0.16),transparent_28%)]" />
        <div className="relative flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-3xl">
            <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
              Welcome Back {session?.user?.name}
            </h1>
          </div>
        </div>
      </section>

      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {stats.map((stat) => (
          <Card key={stat.label} className="border-slate-200/80 shadow-sm">
            <CardContent className="flex items-center justify-between p-5">
              <div>
                <p className="text-sm text-muted-foreground"><Link href={stat.href}>{stat.label} </Link></p>
                <p className="mt-2 text-3xl font-semibold tracking-tight">
                  {stat.value}
                </p>
              </div>
              <div className="flex size-12 items-center justify-center rounded-2xl bg-slate-950 text-white">
                <stat.icon className="size-5" />
              </div>
            </CardContent>
          </Card>
        ))}
      </section>
    </div>
  )
}
