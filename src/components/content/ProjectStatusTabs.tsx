"use client";

import { useMemo, useState } from "react";
import { ContentCard } from "@/components/content/ContentCard";
import { cn } from "@/lib/cn";

type Item = {
  _id: string;
  title: string;
  slug: string;
  summary: string;
  imageUrl: string;
  badge?: string;
  categorySlug?: string;
  status: "Ongoing" | "Completed";
};

type Category = { slug: string; title: string };

type StatusFilter = "all" | "Ongoing" | "Completed";

export function ProjectStatusTabs({
  items,
  categories,
  basePath,
}: {
  items: Item[];
  categories: Category[];
  basePath: string;
}) {
  const [status, setStatus] = useState<StatusFilter>("all");
  const [category, setCategory] = useState("all");

  const filtered = useMemo(() => {
    return items.filter((i) => {
      if (status !== "all" && i.status !== status) return false;
      if (category !== "all" && i.categorySlug !== category) return false;
      return true;
    });
  }, [items, status, category]);

  return (
    <>
      <div className="flex flex-wrap gap-2">
        {(["all", "Ongoing", "Completed"] as StatusFilter[]).map((s) => (
          <button
            key={s}
            type="button"
            onClick={() => setStatus(s)}
            className={cn(
              "rounded-full border-2 px-4 py-1.5 text-sm font-semibold transition",
              status === s
                ? "border-black bg-black text-white"
                : "border-black bg-white text-black hover:bg-zinc-50",
            )}
          >
            {s === "all" ? "All statuses" : s}
          </button>
        ))}
      </div>

      <div className="mt-3 flex flex-wrap gap-2">
        <button
          type="button"
          onClick={() => setCategory("all")}
          className={cn(
            "rounded-full border-2 px-4 py-1.5 text-sm font-semibold transition",
            category === "all"
              ? "border-black bg-black text-white"
              : "border-[var(--primary)] bg-white text-black hover:bg-red-50",
          )}
        >
          All categories
        </button>
        {categories.map((c) => (
          <button
            key={c.slug}
            type="button"
            onClick={() => setCategory(c.slug)}
            className={cn(
              "rounded-full border-2 px-4 py-1.5 text-sm font-semibold transition",
              category === c.slug
                ? "border-black bg-black text-white"
                : "border-[var(--primary)] bg-white text-black hover:bg-red-50",
            )}
          >
            {c.title}
          </button>
        ))}
      </div>

      <div className="mt-8 grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
        {filtered.map((item, i) => (
          <ContentCard
            key={item._id}
            href={`${basePath}/${item.slug}`}
            title={item.title}
            excerpt={item.summary}
            imageUrl={item.imageUrl}
            badge={item.badge}
            index={i}
          />
        ))}
      </div>
    </>
  );
}
