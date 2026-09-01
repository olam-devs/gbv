"use client";

import { useMemo, useState } from "react";
import { ContentCard } from "@/components/content/ContentCard";

type Item = {
  _id: string;
  title: string;
  slug: string;
  summary: string;
  imageUrl: string;
  badge?: string;
  categorySlug?: string;
};

type Category = { slug: string; title: string };

export function CategoryGrid({
  items,
  categories,
  basePath,
  allLabel = "All",
}: {
  items: Item[];
  categories: Category[];
  basePath: string;
  allLabel?: string;
}) {
  const [active, setActive] = useState("all");

  const filtered = useMemo(() => {
    if (active === "all") return items;
    return items.filter((i) => i.categorySlug === active);
  }, [active, items]);

  return (
    <>
      <div className="flex flex-wrap gap-2">
        <button
          type="button"
          onClick={() => setActive("all")}
          className={`rounded-full border-2 px-4 py-1.5 text-sm font-semibold transition ${
            active === "all"
              ? "border-black bg-black text-white"
              : "border-[var(--primary)] bg-white text-black hover:bg-red-50"
          }`}
        >
          {allLabel}
        </button>
        {categories.map((c) => (
          <button
            key={c.slug}
            type="button"
            onClick={() => setActive(c.slug)}
            className={`rounded-full border-2 px-4 py-1.5 text-sm font-semibold transition ${
              active === c.slug
                ? "border-black bg-black text-white"
                : "border-[var(--primary)] bg-white text-black hover:bg-red-50"
            }`}
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
