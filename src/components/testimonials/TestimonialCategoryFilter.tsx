"use client";

import { useMemo, useRef, useState } from "react";
import { PasadaImage } from "@/components/ui/PasadaImage";
import { TestimonialQuoteTile } from "@/components/testimonials/TestimonialQuoteTile";
import type { Testimonial, TestimonialCategory } from "@/lib/testimonials";
import { testimonialCategoryImage } from "@/lib/media";
import { cn } from "@/lib/cn";

function matchCategory(t: Testimonial, slug: string) {
  return t.categorySlug === slug;
}

export function TestimonialCategoryFilter({
  items,
  categories,
}: {
  items: Testimonial[];
  categories: TestimonialCategory[];
}) {
  const [active, setActive] = useState("all");
  const cardsRef = useRef<HTMLDivElement>(null);

  const filtered = useMemo(() => {
    const sorted = [...items].sort(
      (a, b) => (a.sortOrder ?? 99) - (b.sortOrder ?? 99),
    );
    if (active === "all") return sorted;
    return sorted.filter((t) => matchCategory(t, active));
  }, [active, items]);

  const activeLabel =
    active === "all"
      ? "All voices"
      : categories.find((c) => c.slug === active)?.title ?? "Category";

  function selectCategory(slug: string) {
    setActive(slug);
    requestAnimationFrame(() => {
      cardsRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  }

  return (
    <>
      <p className="text-sm text-zinc-700">
        Select a category below to view quote cards from that group.{" "}
        <strong>All voices</strong> shows every testimonial mixed together.
      </p>

      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
        <button
          type="button"
          onClick={() => selectCategory("all")}
          className={cn(
            "group overflow-hidden rounded-2xl border-2 text-left transition hover:-translate-y-0.5 hover:shadow-lg",
            active === "all"
              ? "border-black ring-2 ring-black"
              : "border-[var(--primary)] hover:border-black",
          )}
        >
          <div className="relative aspect-[4/3] bg-gradient-to-br from-red-50 via-white to-blue-50">
            <div className="absolute inset-0 grid place-items-center p-6">
              <span className="text-center text-lg font-semibold text-black">All voices</span>
            </div>
          </div>
          <div
            className={cn(
              "px-4 py-3 text-sm font-semibold",
              active === "all" ? "bg-black text-white" : "bg-white text-black",
            )}
          >
            All testimonials
          </div>
        </button>

        {categories.map((c) => {
          const imageUrl = c.imageUrl ?? testimonialCategoryImage(c.slug);
          const selected = active === c.slug;
          const count = items.filter((t) => matchCategory(t, c.slug)).length;
          return (
            <button
              key={c.slug}
              type="button"
              onClick={() => selectCategory(c.slug)}
              className={cn(
                "group overflow-hidden rounded-2xl border-2 text-left transition hover:-translate-y-0.5 hover:shadow-lg",
                selected
                  ? "border-black ring-2 ring-black"
                  : "border-[var(--primary)] hover:border-black",
              )}
            >
              <div className="relative aspect-[4/3] bg-zinc-100">
                <PasadaImage
                  src={imageUrl}
                  alt={c.title}
                  fill
                  className="object-cover transition duration-500 group-hover:scale-105"
                  sizes="(min-width: 1024px) 220px, 45vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/15 to-transparent" />
                <span className="absolute bottom-3 left-3 right-3 text-base font-semibold text-white drop-shadow">
                  {c.title}
                </span>
                <span className="absolute right-3 top-3 rounded-full bg-white/95 px-2 py-0.5 text-xs font-semibold text-black">
                  {count}
                </span>
              </div>
              <div
                className={cn(
                  "px-4 py-3 text-sm font-semibold",
                  selected ? "bg-black text-white" : "bg-white text-black",
                )}
              >
                {c.title}
              </div>
            </button>
          );
        })}
      </div>

      <div ref={cardsRef} className="mt-12 scroll-mt-24">
        <div className="flex flex-wrap items-end justify-between gap-3 border-b border-[var(--border)] pb-4">
          <h2 className="text-xl font-semibold text-black">{activeLabel}</h2>
          <p className="text-sm text-zinc-600">
            {filtered.length} testimonial{filtered.length === 1 ? "" : "s"}
          </p>
        </div>

        <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((t, i) => (
            <TestimonialQuoteTile
              key={t._id}
              quote={t.quote}
              name={t.name}
              role={t.role}
              index={i}
            />
          ))}
        </div>

        {filtered.length === 0 ? (
          <p className="mt-8 rounded-2xl bg-zinc-50 p-6 text-sm text-zinc-700 ring-1 ring-[var(--border)]">
            No testimonials in this category yet. Try <strong>All voices</strong> or
            another category.
          </p>
        ) : null}
      </div>
    </>
  );
}
