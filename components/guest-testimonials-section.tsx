"use client";

import Image, { type StaticImageData } from "next/image";
import { Quote } from "lucide-react";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";

import { Testimonial } from "@/lib/types";

function TestimonialCard({ testimonial }: { testimonial: Testimonial }) {

  return (
    <article className="group overflow-hidden rounded-[2rem] border border-[2px] border-orange-200 bg-white shadow-[0_18px_50px_rgba(15,23,42,0.06)] transition-transform duration-300 hover:-translate-y-1">
      <div className="relative aspect-[4/3] overflow-hidden">
        <Image
          src={testimonial.image ? "/api" + testimonial.image : ""}
          alt={testimonial.name}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-105"
          sizes="(max-width:768px)100vw,(max-width:1200px)50vw,33vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/55 via-slate-950/10 to-transparent" />
        <div className="absolute left-4 top-4 inline-flex items-center rounded-full border border-orange-500 bg-orange-500 px-3 py-1 text-xs font-medium text-white backdrop-blur">
          {testimonial.tag}
        </div>
      </div>

      <div className="p-6">
        <Quote className="h-6 w-6 text-slate-300" />

        <p className="mt-4 text-[15px] leading-7 text-slate-700">
          {testimonial.content}
        </p>

        <div className="mt-6 border-t border-orange-200 pt-4">
          <p className="text-sm font-semibold text-slate-950">{testimonial.name}</p>
          <p className="text-sm text-slate-600">
            {testimonial.designation}, {testimonial.company}
          </p>
        </div>
      </div>
    </article>
  );
}

export function GuestTestimonialsSection({ testimonials }: { testimonials: Testimonial[] }) {
  return (
    <section className="bg-[#185980] py-16 text-slate-900 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl">
          <p className="text-sm font-semibold uppercase tracking-[0.34em] text-white">
            Testimonials
          </p>
          <h2 className="mt-4 text-3xl font-semibold tracking-tight text-balance text-orange-500 sm:text-4xl lg:text-5xl">
            What clients say about working with us.
          </h2>

          <p className="mt-4 max-w-2xl text-base leading-7 text-white sm:text-lg">
            A few concise reflections on transition quality, reporting clarity,
            and the consistency of our operational support.
          </p>
        </div>

        <div className="mt-12">
          <Swiper
            modules={[Autoplay, Pagination]}
            loop={testimonials.length > 3}
            spaceBetween={24}
            speed={1200}
            pagination={{
              clickable: true,
            }}
            autoplay={{
              delay: 2500,
              disableOnInteraction: false,
              pauseOnMouseEnter: true,
            }}
            className="[&_.swiper-wrapper]:pb-2 [&_.swiper-pagination]:relative [&_.swiper-pagination]:mt-12 [&_.swiper-pagination]:flex [&_.swiper-pagination]:items-center [&_.swiper-pagination]:justify-center [&_.swiper-pagination]:gap-2 [&_.swiper-pagination-bullet]:h-2.5 [&_.swiper-pagination-bullet]:w-2.5 [&_.swiper-pagination-bullet]:rounded-full [&_.swiper-pagination-bullet]:bg-slate-400 [&_.swiper-pagination-bullet]:opacity-30 [&_.swiper-pagination-bullet]:transition-all [&_.swiper-pagination-bullet]:duration-300 [&_.swiper-pagination-bullet]:shadow-sm [&_.swiper-pagination-bullet-active]:w-9 [&_.swiper-pagination-bullet-active]:bg-orange-500 [&_.swiper-pagination-bullet-active]:opacity-100 [&_.swiper-pagination-bullet-active]:shadow-[0_0_0_4px_rgba(249,115,22,0.12)]"
            breakpoints={{
              0: {
                slidesPerView: 1,
              },
              640: {
                slidesPerView: 2,
              },
              1024: {
                slidesPerView: 3,
              },
            }}
          >
            {testimonials.map((testimonial) => (
              <SwiperSlide key={testimonial.name} className="pb-4">
                <TestimonialCard testimonial={testimonial} />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </section>
  );
}
