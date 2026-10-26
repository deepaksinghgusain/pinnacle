"use client";

import { ChangeEvent, useState, useTransition } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2, Save } from "lucide-react";
import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaYoutube,
} from "react-icons/fa";
import { saveSocialSettings } from "@/lib/actions/settings-action";
import { toast } from "sonner";

const socialLinks = [
  { label: "Facebook", name: "facebookUrl", icon: FaFacebookF },
  { label: "Instagram", name: "instagramUrl", icon: FaInstagram },
  { label: "LinkedIn", name: "linkedinUrl", icon: FaLinkedinIn },
  { label: "YouTube", name: "youtubeUrl", icon: FaYoutube },
] as const;

type SocialSettings = {
  facebookUrl?: string | null;
  instagramUrl?: string | null;
  linkedinUrl?: string | null;
  youtubeUrl?: string | null;
  socialBio?: string | null;
  showSocialIcons?: boolean | null;
};

export default function SocialComponent({ setting }: { setting?: SocialSettings }) {
  const [pending, startTransition] = useTransition();
  // Settings are not created until the first save, so render an empty form
  // when getSettings() has no record instead of reading properties from undefined.
  const [configuration, setConfiguration] = useState(setting ?? {});

  return (
    <Card className="border-slate-200/80 shadow-sm">
      <CardHeader className="border-b border-slate-200/70 py-4">
        <CardTitle className="text-base font-semibold">
          Social media settings
        </CardTitle>
      </CardHeader>
      <CardContent className="p-5">
        <form
          action={(formData) => {
            startTransition(async () => {
              const res = await saveSocialSettings(formData);

              if (!res?.success) {
                toast.error("Error", {
                  description: res?.message,
                });
                return;
              }

              toast.success("Settings saved successfully");

              setConfiguration((res.data as SocialSettings | undefined) ?? {});
            });
          }}
          className="space-y-5"
        >
          <div className="grid gap-4 md:grid-cols-2">
            {socialLinks.map(({ label, name, icon: Icon }) => (
              <div key={name} className="space-y-2">
                <Label htmlFor={name} className="flex items-center gap-2">
                  <Icon className="size-4 text-cyan-700" />
                  {label}
                </Label>

                <Field
                  id={name}
                  label={""}
                  defaultValue={configuration[name] ?? ""}
                />
              </div>
            ))}
          </div>

          <Field
            label="Social bio"
            id="socialBio"
            defaultValue={configuration.socialBio ?? ""}
          />

          <label className="flex items-center gap-3 rounded-xl border border-slate-200 px-4 py-3">
            <Checkbox
              id="showSocialIcons"
              name="showSocialIcons"
              defaultChecked={configuration.showSocialIcons ?? false}
            />
            <span className="text-sm text-slate-700">
              Show social icons in footer
            </span>
          </label>

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
  onChange,
}: {
  label: string;
  id: string;
  type?: string;
  defaultValue?: string;
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
}) {
  return (
    <div className="space-y-2">
      <Label htmlFor={id}>{label}</Label>
      <Input
        id={id}
        name={id}
        type={type}
        defaultValue={defaultValue}
        onChange={onChange}
        className="h-10 rounded-xl"
      />
    </div>
  );
}
