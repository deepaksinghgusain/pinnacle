"use client";

import Image, { type StaticImageData } from "next/image";
import { useEffect, useState } from "react";
import { Cloud, Code2, Smartphone, TestTube2 } from "lucide-react";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel";
import technologyImage from "@/images/technology.jpg";
import hero2Image from "@/images/hero2.jpg";
import analyticsImage from "@/images/analatics.jpg";
import flowchartImage from "@/images/flowchart.png";

const slides: {
  image: StaticImageData;
  label: string;
  title: string;
  description: string;
  icon: typeof Code2;
}[] = [
  {
    image: technologyImage,
    label: "01 / Web development",
    title: "Web experiences that move business forward.",
    description: "Websites, platforms, APIs, and applications designed around real customer journeys.",
    icon: Code2,
  },
  {
    image: hero2Image,
    label: "02 / Cloud platforms",
    title: "Cloud foundations built to scale.",
    description: "AWS, Azure, and Google Cloud services for dependable applications and operations.",
    icon: Cloud,
  },
  {
    image: analyticsImage,
    label: "03 / Mobile applications",
    title: "Mobile products people enjoy using.",
    description: "Connected mobile experiences that keep your customers and teams moving.",
    icon: Smartphone,
  },
  {
    image: flowchartImage,
    label: "04 / Testing and QA",
    title: "Quality engineered into every release.",
    description: "Functional, performance, and automated testing that makes shipping more confident.",
    icon: TestTube2,
  },
];

export function ItServicesCarousel() {
  const [api, setApi] = useState<CarouselApi>();
  const [activeSlide, setActiveSlide] = useState(0);

  useEffect(() => {
    if (!api) return;

    const updateActiveSlide = () => setActiveSlide(api.selectedScrollSnap());
    updateActiveSlide();
    api.on("select", updateActiveSlide);

    const timer = window.setInterval(() => api.scrollNext(), 5000);
    return () => {
      api.off("select", updateActiveSlide);
      window.clearInterval(timer);
    };
  }, [api]);

  return (
    <Carousel
      setApi={setApi}
      opts={{ loop: true }}
      className="absolute inset-5 sm:inset-8"
      aria-label="IT services"
    >
      <CarouselContent className="-ml-0">
        {slides.map(({ image, label, title, description, icon: Icon }) => (
          <CarouselItem key={label} className="pl-0">
            <div className="relative min-h-[330px] overflow-hidden rounded-lg border border-cyan-200/30 bg-[#0b3a46] shadow-[0_28px_90px_rgba(0,0,0,0.3)] lg:min-h-[410px]">
              <Image
                src={image}
                alt={title}
                fill
                sizes="(min-width: 1024px) 42vw, 90vw"
                className="object-cover object-center"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#062B36]/95 via-[#062B36]/20 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-6 sm:p-7">
                <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.15em] text-cyan-100">
                  <Icon className="size-4" />
                  {label}
                </div>
                <p className="mt-3 max-w-sm text-xl font-semibold leading-tight text-white">{title}</p>
                <p className="mt-2 max-w-md text-sm leading-6 text-slate-200">{description}</p>
              </div>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious
        aria-label="Previous service"
        className="left-3 border-white/30 bg-slate-950/45 text-white hover:bg-slate-950/75 hover:text-white"
      />
      <CarouselNext
        aria-label="Next service"
        className="right-3 border-white/30 bg-slate-950/45 text-white hover:bg-slate-950/75 hover:text-white"
      />
      <div className="absolute bottom-5 right-6 flex gap-1.5" aria-label="Service slides">
        {slides.map((slide, index) => (
          <button
            key={slide.label}
            type="button"
            aria-label={`Go to ${slide.label}`}
            aria-current={activeSlide === index}
            onClick={() => api?.scrollTo(index)}
            className={`h-1.5 rounded-full transition-all ${activeSlide === index ? "w-7 bg-orange-400" : "w-1.5 bg-white/60"}`}
          />
        ))}
      </div>
    </Carousel>
  );
}
