"use client";

import { useState, useTransition } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2, Save } from "lucide-react";
import { saveEmailSettings } from "@/lib/actions/settings-action";
import { toast } from "sonner";

export default function EmailComponent({ setting }: { setting?: any }) {
  const [pending, startTransition] = useTransition();
  const [configuration, setConfiguration] = useState(setting);

  return (
    <Card className="border-slate-200/80 shadow-sm">
      <CardHeader className="border-b border-slate-200/70 py-4">
        <CardTitle className="text-base font-semibold">
          Email settings
        </CardTitle>
      </CardHeader>
      <CardContent className="p-5">
        <form
          action={(formData) => {
            startTransition(async () => {
              let res = await saveEmailSettings(formData);

              if (!res?.success) {
                toast.error("Error", {
                  description: res?.message,
                });
                return;
              }

              toast.success("Settings saved successfully");

              setConfiguration({  ...(res.data ?? {}), });
            });
          }}
          className="space-y-5"
        >
          <div className="grid gap-4 md:grid-cols-2">
            <Field
              label="SMTP host"
              id="smtpHost"
              defaultValue={configuration?.smtpHost}
            />
            <Field
              label="SMTP port"
              id="smtpPort"
              type="number"
              defaultValue={configuration?.smtpPort}
            />
            <Field
              label="SMTP username"
              id="smtpUsername"
              defaultValue={configuration?.smtpUsername}
            />
            <Field
              label="SMTP Password"
              id="smtpPassword"
              type="password"
              defaultValue={configuration?.smtpPassword}
            />

            <Field
              label="From email"
              id="fromEmail"
              type="email"
              defaultValue={configuration?.fromEmail}
            />
            <Field label="From name" id="fromName" defaultValue="Pinnacle" />
            <Field
              label="Reply-to email"
              id="replyToEmail"
              type="email"
              defaultValue={configuration?.replyToEmail}
            />
            <Field
              label="Application notification inbox"
              id="supportInbox"
              type="email"
              defaultValue={configuration?.supportInbox}
            />
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <label className="flex items-center gap-3 rounded-xl border border-slate-200 px-4 py-3">
              <Checkbox
                id="enableNotifications"
                name="enableNotifications"
                defaultChecked={configuration?.enableNotifications}
              />
              <span className="text-sm text-slate-700">
                Send enquiry notifications
              </span>
            </label>
            <label className="flex items-center gap-3 rounded-xl border border-slate-200 px-4 py-3">
              <Checkbox
                id="storeDrafts"
                name="storeDrafts"
                defaultChecked={configuration?.storeDrafts}
              />
              <span className="text-sm text-slate-700">Store email drafts</span>
            </label>
          </div>

          <div className="flex justify-end">
            <Button
              type="submit"
              className="rounded-full px-5"
              disabled={pending}
            >
              {pending ? (
                <Loader2 className="mr-2 size-4 animate-spin" />
              ) : (
                <Save className="mr-2 size-4" />
              )}
              Save
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}

function Field({
  label,
  id,
  type = "text",
  defaultValue,
}: {
  label: string;
  id: string;
  type?: string;
  defaultValue?: string;
}) {
  return (
    <div className="space-y-2">
      <Label htmlFor={id}>{label}</Label>
      <Input
        id={id}
        name={id}
        type={type}
        defaultValue={defaultValue}
        className="h-10 rounded-xl"
      />
    </div>
  );
}
