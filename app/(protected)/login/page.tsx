import { Suspense } from "react";
import { LoginForm } from "@/components/login-form";
import { getSiteSettings } from "@/lib/site-settings";
import { getRequestSession } from "@/lib/auth-session";
import { redirect } from "next/navigation";

export default function LoginPage() {
  return (
    <Suspense
      fallback={
        <div
          className="flex min-h-svh w-full items-center justify-center p-6 md:p-10"
          role="status"
          aria-label="Loading sign-in"
        >
          <div className="h-80 w-full max-w-md animate-pulse rounded-xl bg-white shadow-sm" />
        </div>
      }
    >
      <LoginContent />
    </Suspense>
  );
}

async function LoginContent() {
  const [settings, session] = await Promise.all([
    getSiteSettings(),
    getRequestSession(),
  ]);

  if (session?.user) {
    redirect("/admin/dashboard");
  }

  return (
    <div className="flex min-h-svh w-full items-center justify-center bg-[radial-gradient(circle_at_top,_rgba(15,23,42,0.08),_transparent_60%)] p-6 md:p-10">
      <div className="w-full max-w-md">
        <LoginForm settings={settings} />
      </div>
    </div>
  );
}