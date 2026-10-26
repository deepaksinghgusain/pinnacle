import Image from "next/image";

import flowchartImage from "../images/flowchart.png";

function resolveImageSrc(value: string | null | undefined) {
  if (!value) return null;

  const normalized = value.trim();
  if (!normalized) return null;

  if (
    normalized.startsWith("/") ||
    normalized.startsWith("blob:") ||
    normalized.startsWith("http://") ||
    normalized.startsWith("https://")
  ) {
    return normalized;
  }

  if (normalized.startsWith("uploads/")) {
    return `/${normalized}`;
  }

  return null;
}

export function GuestGlobalDeliveryModelSection({ settings }: { settings?: any }) {
  const tagline = settings?.globalDeliveryTagline ?? "OUR GLOBAL DELIVERY MODEL";
  const title =
    settings?.globalDeliveryTitle ??
    "A simple, visual journey from intake to continuous improvement.";
  const description =
    settings?.globalDeliveryDescription ??
    "This flowchart maps the exact delivery handoff we use to move from client requirements through transition, training, delivery, governance, and ongoing service improvement.";
  const imageSrc = resolveImageSrc(settings?.globalDeliveryImagePath) ?? flowchartImage;

  return (
    <section className="bg-[#f8fafc] py-16 text-slate-900 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl">
          <div className="inline-block">
            <h2 className="mt-4 text-2xl font-semibold tracking-tight text-balance text-orange-500 sm:text-3xl lg:text-4xl">
              {tagline}
            </h2>

            <div className="relative mt-3 h-1.5 w-full overflow-hidden rounded-full bg-white">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600 via-cyan-500 to-orange-500" />
              <div
                className="absolute inset-y-0 -left-1/2 w-1/2 bg-white/60 blur-sm"
                style={{
                  animation: "shimmer 2s linear infinite",
                }}
              />
              <style>{`
                @keyframes shimmer {
                  from {
                    transform: translateX(0);
                  }
                  to {
                    transform: translateX(300%);
                  }
                }
              `}</style>
            </div>
          </div>
          <h2 className="mt-4 text-3xl font-semibold tracking-tight text-balance text-[#185980] sm:text-4xl lg:text-3xl">
            {title}
          </h2>
          <p className="mt-4 max-w-2xl text-base leading-7 text-slate-600 sm:text-lg">
            {description}
          </p>
        </div>

        <div className="mt-10 rounded-[2rem] border border-slate-200 bg-white/85 p-4 shadow-[0_18px_50px_rgba(15,23,42,0.06)] backdrop-blur-xl sm:p-5">
          <div className="rounded-[1.5rem] border border-slate-200 bg-gradient-to-b from-white to-slate-50 p-3 shadow-[0_10px_30px_rgba(15,23,42,0.04)] sm:p-4">
            <div className="relative h-[260px] overflow-hidden rounded-[1.2rem] bg-white sm:h-[320px] lg:h-[380px]">
              <Image
                src={"/api" +  imageSrc}
                alt="Global delivery model flowchart"
                fill
                className="object-cover object-center"
                sizes="(max-width: 1024px) 100vw, 1120px"
                priority={false}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
