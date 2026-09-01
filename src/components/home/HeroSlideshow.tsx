"use client";

import useEmblaCarousel from "embla-carousel-react";
import { useCallback, useEffect, useState } from "react";
import { PasadaImage } from "@/components/ui/PasadaImage";
import { isLogoImage } from "@/lib/media";
import { ChevronLeft, ChevronRight } from "lucide-react";

export function HeroSlideshow({ images }: { images: string[] }) {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true });
  const [index, setIndex] = useState(0);

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    const onSelect = () => setIndex(emblaApi.selectedScrollSnap());
    emblaApi.on("select", onSelect);
    onSelect();
    return () => {
      emblaApi.off("select", onSelect);
    };
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    const timer = setInterval(() => emblaApi.scrollNext(), 5500);
    return () => clearInterval(timer);
  }, [emblaApi]);

  return (
    <div className="relative">
      <div className="absolute inset-0 -rotate-2 rounded-3xl bg-gradient-to-br from-blue-100 via-sky-100 to-red-50" />
      <div className="relative overflow-hidden rounded-3xl border-2 border-[var(--primary)] bg-zinc-100 shadow-lg ring-1 ring-black/5">
        <div ref={emblaRef} className="overflow-hidden">
          <div className="flex">
            {images.map((src) => {
              const logoSlide = isLogoImage(src);
              return (
                <div key={src} className="relative min-w-0 flex-[0_0_100%]">
                  <PasadaImage
                    src={src}
                    alt={logoSlide ? "PASADA logo" : "PASADA community and health programs"}
                    width={1200}
                    height={900}
                    priority
                    className={
                      logoSlide
                        ? "h-[360px] w-full bg-white object-contain p-10 sm:h-[440px] sm:p-14"
                        : "h-[360px] w-full object-cover sm:h-[440px]"
                    }
                  />
                </div>
              );
            })}
          </div>
        </div>

        <button
          type="button"
          onClick={scrollPrev}
          className="absolute left-3 top-1/2 z-10 grid h-10 w-10 -translate-y-1/2 place-items-center rounded-full bg-white/90 text-black shadow ring-1 ring-black/10 hover:bg-white"
          aria-label="Previous slide"
        >
          <ChevronLeft className="h-5 w-5" />
        </button>
        <button
          type="button"
          onClick={scrollNext}
          className="absolute right-3 top-1/2 z-10 grid h-10 w-10 -translate-y-1/2 place-items-center rounded-full bg-white/90 text-black shadow ring-1 ring-black/10 hover:bg-white"
          aria-label="Next slide"
        >
          <ChevronRight className="h-5 w-5" />
        </button>

        <div className="absolute bottom-3 left-1/2 z-10 flex -translate-x-1/2 gap-2">
          {images.map((src, i) => (
            <button
              key={src}
              type="button"
              aria-label={`Go to slide ${i + 1}`}
              onClick={() => emblaApi?.scrollTo(i)}
              className={`h-2 rounded-full transition-all ${
                i === index ? "w-8 bg-[var(--primary)]" : "w-2 bg-white/80 ring-1 ring-black/20"
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
