"use client";

import useEmblaCarousel from "embla-carousel-react";
import { useCallback, useEffect, useState } from "react";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";
import { TestimonialQuoteTile } from "@/components/testimonials/TestimonialQuoteTile";

type Testimonial = {
  quote: string;
  name: string;
  role?: string;
};

export function TestimonialsCarousel({
  items,
}: {
  items: Testimonial[];
}) {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, align: "start" });
  const [selected, setSelected] = useState(0);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelected(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on("select", onSelect);
    emblaApi.on("reInit", onSelect);
    return () => {
      emblaApi.off("select", onSelect);
      emblaApi.off("reInit", onSelect);
    };
  }, [emblaApi, onSelect]);

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);

  return (
    <div className="rounded-3xl bg-white p-6 ring-1 ring-[var(--border)] sm:p-8">
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <span className="grid h-9 w-9 place-items-center rounded-xl bg-emerald-50 text-emerald-900 ring-1 ring-emerald-100">
            <Quote className="h-5 w-5" aria-hidden="true" />
          </span>
          <div>
            <div className="text-sm font-semibold">Testimonials</div>
            <div className="text-xs text-zinc-600">
              Voices from the community
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={scrollPrev}
            className="inline-flex h-10 w-10 items-center justify-center rounded-full ring-1 ring-[var(--border)] hover:bg-zinc-50"
            aria-label="Previous testimonial"
          >
            <ChevronLeft className="h-5 w-5" aria-hidden="true" />
          </button>
          <button
            type="button"
            onClick={scrollNext}
            className="inline-flex h-10 w-10 items-center justify-center rounded-full ring-1 ring-[var(--border)] hover:bg-zinc-50"
            aria-label="Next testimonial"
          >
            <ChevronRight className="h-5 w-5" aria-hidden="true" />
          </button>
        </div>
      </div>

      <div className="mt-6 overflow-hidden" ref={emblaRef}>
        <div className="flex">
          {items.map((t, idx) => (
            <div
              key={`${t.name}-${idx}`}
              className="min-w-0 flex-[0_0_100%] pr-4 sm:flex-[0_0_70%] lg:flex-[0_0_50%]"
            >
              <TestimonialQuoteTile quote={t.quote} name={t.name} role={t.role} />
            </div>
          ))}
        </div>
      </div>

      <div className="mt-5 flex items-center gap-2">
        {items.map((_, i) => (
          <button
            key={i}
            type="button"
            className={`h-2.5 w-2.5 rounded-full ring-1 ring-[var(--border)] ${
              i === selected ? "bg-emerald-700" : "bg-white"
            }`}
            aria-label={`Go to testimonial ${i + 1}`}
            onClick={() => emblaApi?.scrollTo(i)}
          />
        ))}
      </div>
    </div>
  );
}

