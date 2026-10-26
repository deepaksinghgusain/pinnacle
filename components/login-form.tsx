"use client";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Field,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { APP_NAME } from "@/lib/constants";
import { Loader2, ShieldCheck } from "lucide-react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";

export function LoginForm({
  className,
  settings,
  ...props
}: React.ComponentProps<"div"> & { settings: any }) {

  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [mount, setMount] = useState(false);

  const handleSubmit = async (formData: FormData) => {
    setIsSubmitting(true);
    const email = formData.get("email");
    const password = formData.get("password");

    const res = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    if (res?.error) {
      alert("Invalid credentials");
    } else {
      router.push("/admin/dashboard");
    }

    setIsSubmitting(false);
  };

  useEffect(() => {
    setMount(true);
  }, []);

  if(!mount) return;

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card className="overflow-hidden border border-slate-200/80 bg-white/95 shadow-[0_20px_60px_-25px_rgba(15,23,42,0.35)] backdrop-blur">
        <div className="bg-gradient-to-r from-slate-950 via-slate-900 to-slate-800 px-6 py-6 text-white">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/15 ring-1 ring-white/20">
              <ShieldCheck className="h-6 w-6" />
            </div>
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-slate-300">
                Admin Portal
              </p>
              <h2 className="text-lg font-semibold text-white">{settings?.siteName || APP_NAME}</h2>
            </div>
          </div>
        </div>

        <CardContent className="p-0">
          <form action={handleSubmit} className="p-6 md:p-8">
            <FieldGroup>
              <div className="flex flex-col items-center gap-2 text-center">
                <h1 className="text-2xl font-semibold text-slate-900">Welcome back</h1>
                <p className="text-sm text-slate-500">
                  Sign in to continue to your dashboard
                </p>
              </div>

              <Field>
                <FieldLabel htmlFor="email">Email</FieldLabel>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="m@example.com"
                  required
                />
              </Field>

              <Field>
                <FieldLabel htmlFor="password">Password</FieldLabel>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  required
                />
              </Field>

              <Field>
                <Button
                  type="submit"
                  className="w-full bg-slate-900 cursor-pointer text-white hover:bg-slate-800"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <span className="flex items-center justify-center gap-2">
                      <Loader2 className="h-4 w-4 animate-spin" />
                      Signing in...
                    </span>
                  ) : (
                    "Login"
                  )}
                </Button>
              </Field>
            </FieldGroup>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}