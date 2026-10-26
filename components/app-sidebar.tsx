"use client"

import * as React from "react"

import { NavMain } from "@/components/nav-main"
import { NavUser } from "@/components/nav-user"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import {
  BarChart3,
  BriefcaseBusiness,
  Command,
  Database,
  LayoutDashboardIcon,
  Mail,
  Settings,
  UsersIcon,
  Mails,
  ClipboardPenLine,
  BookOpen,
  CalendarClock
} from "lucide-react"

const data = {
  user: {
    name: "Admin",
    email: "admin@asservices.in",
    avatar: "/avatars/shadcn.jpg",
  },
  navMain: [
    {
      title: "Dashboard",
      url: "/admin/dashboard",
      icon: <LayoutDashboardIcon />,
    },
    {
      title: "Service Category",
      url: "/admin/service-category",
      icon: <BriefcaseBusiness />,
    },
    {
      title: "Service",
      url: "/admin/service",
      icon: <Database />,
    },
    {
      title: "Leads",
      url: "/admin/enquiry",
      icon: <Mail />,
    },
    {
      title: "Jobs",
      url: "/admin/job",
      icon: <BriefcaseBusiness />,
    },
    {
      title: "Career Applications",
      url: "/admin/career",
      icon: <BriefcaseBusiness />,
    },
    {
      title: "Newsletter",
      url: "/admin/newsletter",
      icon: <Mails />,
    },
    {
      title: "Testimonials",
      url: "/admin/testimonial",
      icon: <ClipboardPenLine />,
    },
    {
      title: "Users",
      url: "/admin/user",
      icon: <UsersIcon />,
    },
    {
      title: "Banner",
      url: "/admin/banner",
      icon: <BarChart3 />,
    },
    {
      title: "Events",
      url: "/admin/upcomming-events",
      icon: <CalendarClock />,
    },
    {
      title: "Page",
      url: "/admin/page",
      icon: <BookOpen />,
    },
    {
      title: "Configuration",
      url: "/admin/configuration",
      icon: <Settings />,
    },
  ],
}

export function AppSidebar({user ,  ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar user={user} collapsible="offcanvas" {...props}>
      <SidebarHeader>
        <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton
                  asChild
                  className="data-[slot=sidebar-menu-button]:p-1.5!"
                >
                  <a href="/admin/dashboard">
                    <Command className="size-5!" />
                    <span className="text-base font-semibold">Pinnacle</span>
                  </a>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={user} />
      </SidebarFooter>
    </Sidebar>
  )
}
