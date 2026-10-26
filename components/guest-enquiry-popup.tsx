"use client"

import * as React from "react"
import { Dialog as DialogPrimitive } from "radix-ui"
import {
  ArrowRight,
  Building2,
  CheckCircle2,
  Loader2,
  Mail,
  MessageSquareText,
  Phone,
  Send,
  UserRound,
  X,
} from "lucide-react"

import { createEnquiry } from "@/lib/actions/enquiry-action"
import EnquiryForm from "./enquiry/enquiry-form"

type EnquiryValues = {
  fullName: string
  email: string
  phoneNumber: string
  companyName: string
  subject: string
  message: string
}

const defaultValues: EnquiryValues = {
  fullName: "",
  email: "",
  phoneNumber: "",
  companyName: "",
  subject: "",
  message: "",
}

const subjectOptions = [
  "Back Office Operations",
  "Data Analytics & Dashboards",
  "Technical Support Services",
  "IT Consulting Services",
  "IT Managed Services",
  "Recovery Support Services",
  "General Enquiry",
]

function FieldLabel({
  children,
  htmlFor,
}: {
  children: React.ReactNode
  htmlFor: string
}) {
  return (
    <label htmlFor={htmlFor} className="text-sm font-semibold text-slate-800">
      {children}
    </label>
  )
}

function FieldShell({
  children,
  icon: Icon,
}: {
  children: React.ReactNode
  icon: typeof UserRound
}) {
  return (
    <div className="relative">
      <Icon className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-slate-400" />
      {children}
    </div>
  )
}

export function GuestEnquiryPopup({
  triggerClassName,
  triggerLabel = "Enquiry Us",
}: {
  triggerClassName?: string
  triggerLabel?: string
}) {
  const [open, setOpen] = React.useState(false)
  const [values, setValues] = React.useState<EnquiryValues>(defaultValues)
  const [status, setStatus] = React.useState<{
    type: "success" | "error"
    message: string
  } | null>(null)
  const [isPending, startTransition] = React.useTransition()

  function updateValue(name: keyof EnquiryValues, value: string) {
    setValues((current) => ({ ...current, [name]: value }))
    if (status) {
      setStatus(null)
    }
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()

    startTransition(async () => {
      const response = await createEnquiry(values)

      if (!response.success) {
        setStatus({ type: "error", message: response.message })
        return
      }

      setValues(defaultValues)
      setStatus({
        type: "success",
        message: "Thanks. Your enquiry has been submitted successfully.",
      })
    })
  }

  return (
    <DialogPrimitive.Root open={open} onOpenChange={setOpen}>
      <DialogPrimitive.Trigger asChild>
        <button type="button" className={triggerClassName}>
          <span>{triggerLabel}</span>
          <ArrowRight className="size-4" />
        </button>
      </DialogPrimitive.Trigger>

      <DialogPrimitive.Portal>
        <DialogPrimitive.Overlay className="fixed inset-0 z-[70] bg-slate-950/45 backdrop-blur-sm data-open:animate-in data-open:fade-in-0 data-closed:animate-out data-closed:fade-out-0" />
        <DialogPrimitive.Content className="fixed left-1/2 top-1/2 z-[80] grid max-h-[92vh] w-[calc(100vw-2rem)] max-w-5xl -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-2xl border border-blue-500 bg-white shadow-[0_30px_100px_rgba(15,23,42,0.35)] outline-none data-open:animate-in data-open:fade-in-0 data-open:zoom-in-95 data-open:slide-in-from-bottom-3 data-closed:animate-out data-closed:fade-out-0 data-closed:zoom-out-95 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="relative hidden overflow-hidden bg-[#185980] p-8 text-white lg:block">
            <div className="absolute inset-0 enquiry-grid opacity-25" />
            <div className="absolute -right-20 top-12 size-56 rounded-full bg-cyan-300/20 blur-3xl" />
            <div className="absolute -bottom-16 left-10 size-48 rounded-full bg-violet-300/15 blur-3xl" />

            <div className="relative flex h-full flex-col justify-between">
              <div>
                <div className="inline-flex items-center gap-2 rounded-full border border-orange-500 bg-orange-600 px-4 py-2 text-sm font-semibold text-cyan-100">
                  <MessageSquareText className="size-4" />
                  Quick business enquiry
                </div>
                <DialogPrimitive.Title className="mt-6 text-4xl font-semibold tracking-tight">
                  Tell us what your team needs next.
                </DialogPrimitive.Title>
                <DialogPrimitive.Description className="mt-4 text-sm leading-7 text-slate-300">
                  Share your service requirement and our team will connect with
                  a practical next step for operations, analytics, or IT support.
                </DialogPrimitive.Description>
              </div>

              <div className="mt-8 grid gap-3">
                {[
                  "Fast review by the Pinnacle team",
                  "Service-fit guidance for your workflow",
                  "Clear follow-up on scope and timeline",
                ].map((item) => (
                  <div
                    key={item}
                    className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/5 p-4"
                  >
                    <CheckCircle2 className="size-5 text-cyan-200" />
                    <span className="text-sm text-slate-100">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="overflow-y-auto p-5 sm:p-7">
            <div className="flex items-start justify-between gap-4 lg:hidden">
              <div>
                <DialogPrimitive.Title className="text-2xl font-semibold text-slate-950">
                  Enquiry Us
                </DialogPrimitive.Title>
                <DialogPrimitive.Description className="mt-2 text-sm leading-6 text-slate-600">
                  Send your requirement and our team will contact you.
                </DialogPrimitive.Description>
              </div>
            </div>

            <DialogPrimitive.Close className="absolute right-4 top-4 inline-flex size-9 items-center justify-center rounded-full border border-orange-200 bg-orange-500 text-white shadow-sm transition hover:bg-orange-600 hover:text-white cursor-pointer">
              <X className="size-4" />
              <span className="sr-only">Close enquiry popup</span>
            </DialogPrimitive.Close>

            <form className="mt-6 grid gap-5 lg:mt-0" onSubmit={handleSubmit}>
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="grid gap-2">
                  <FieldLabel htmlFor="enquiry-full-name">Full Name</FieldLabel>
                  <FieldShell icon={UserRound}>
                    <input
                      id="enquiry-full-name"
                      value={values.fullName}
                      onChange={(event) =>
                        updateValue("fullName", event.target.value)
                      }
                      className="h-12 w-full rounded-xl border border-slate-200 bg-slate-50 pl-10 pr-4 text-sm outline-none transition placeholder:text-slate-400 focus:border-[#185980] focus:bg-white focus:ring-4 focus:ring-[#185980]"
                      placeholder="Your name"
                      required
                    />
                  </FieldShell>
                </div>

                <div className="grid gap-2">
                  <FieldLabel htmlFor="enquiry-email">Email Address</FieldLabel>
                  <FieldShell icon={Mail}>
                    <input
                      id="enquiry-email"
                      type="email"
                      value={values.email}
                      onChange={(event) =>
                        updateValue("email", event.target.value)
                      }
                      className="h-12 w-full rounded-xl border border-slate-200 bg-slate-50 pl-10 pr-4 text-sm outline-none transition placeholder:text-slate-400 focus:border-[#185980] focus:bg-white focus:ring-4 focus:ring-[#185980]"
                      placeholder="you@example.com"
                      required
                    />
                  </FieldShell>
                </div>

                <div className="grid gap-2">
                  <FieldLabel htmlFor="enquiry-phone">Phone Number</FieldLabel>
                  <FieldShell icon={Phone}>
                    <input
                      id="enquiry-phone"
                      type="tel"
                      value={values.phoneNumber}
                      onChange={(event) =>
                        updateValue("phoneNumber", event.target.value)
                      }
                      className="h-12 w-full rounded-xl border border-slate-200 bg-slate-50 pl-10 pr-4 text-sm outline-none transition placeholder:text-slate-400 focus:border-[#185980] focus:bg-white focus:ring-4 focus:ring-[#185980]"
                      placeholder="+91"
                      required
                    />
                  </FieldShell>
                </div>

                <div className="grid gap-2">
                  <FieldLabel htmlFor="enquiry-company">Company Name</FieldLabel>
                  <FieldShell icon={Building2}>
                    <input
                      id="enquiry-company"
                      value={values.companyName}
                      onChange={(event) =>
                        updateValue("companyName", event.target.value)
                      }
                      className="h-12 w-full rounded-xl border border-slate-200 bg-slate-50 pl-10 pr-4 text-sm outline-none transition placeholder:text-slate-400 focus:border-[#185980] focus:bg-white focus:ring-4 focus:ring-[#185980]"
                      placeholder="Company or organization"
                    />
                  </FieldShell>
                </div>
              </div>

              <div className="grid gap-2">
                <FieldLabel htmlFor="enquiry-subject">Subject</FieldLabel>
                <textarea
                  id="enquiry-subject"
                  value={values.subject}
                  onChange={(event) => updateValue("subject", event.target.value)}
                  className="min-h-32 w-full resize-none rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm leading-6 outline-none transition placeholder:text-slate-400 focus:border-[#185980] focus:bg-white focus:ring-4 focus:ring-[#185980]"
                  placeholder="Subject"
                  required
                />
              </div>

              <div className="grid gap-2">
                <FieldLabel htmlFor="enquiry-message">Message</FieldLabel>
                <textarea
                  id="enquiry-message"
                  value={values.message}
                  onChange={(event) => updateValue("message", event.target.value)}
                  className="min-h-32 w-full resize-none rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm leading-6 outline-none transition placeholder:text-slate-400 focus:border-[#185980] focus:bg-white focus:ring-4 focus:ring-[#185980]"
                  placeholder="Briefly describe your requirement, timeline, or support need."
                  required
                />
              </div>

              {status ? (
                <div
                  className={[
                    "rounded-xl border px-4 py-3 text-sm",
                    status.type === "success"
                      ? "border-emerald-200 bg-emerald-50 text-emerald-700"
                      : "border-rose-200 bg-rose-50 text-rose-700",
                  ].join(" ")}
                >
                  {status.message}
                </div>
              ) : null}

              <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <p className="text-xs leading-5 text-slate-500">
                  Your details are used only to respond to this enquiry.
                </p>
                <button
                  type="submit"
                  disabled={isPending}
                  className="inline-flex cursor-pointer h-12 items-center justify-center gap-2 rounded-full bg-[#185980] px-6 text-sm font-semibold text-white transition hover:bg-[#185980] disabled:cursor-not-allowed disabled:opacity-70"
                >
                  {isPending ? (
                    <Loader2 className="size-4 animate-spin" />
                  ) : (
                    <Send className="size-4" />
                  )}
                  Submit Enquiry
                </button>
              </div>
            </form>
          </div>
        </DialogPrimitive.Content>
      </DialogPrimitive.Portal>
    </DialogPrimitive.Root>
  )
}
