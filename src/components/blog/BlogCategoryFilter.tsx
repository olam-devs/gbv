"use client";

import { useMemo, useState } from "react";
import type { BlogCategory, BlogPost } from "@/lib/blog";
import { BlogCard } from "@/components/blog/BlogCard";

export function BlogCategoryFilter({
  posts,
  categories,
}: {
  posts: BlogPost[];
  categories: BlogCategory[];
}) {
  const [active, setActive] = useState<string>("all");

  const filtered = useMemo(() => {
    if (active === "all") return posts;
    return posts.filter((p) => p.categorySlug === active);
  }, [active, posts]);

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
          All stories
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
        {filtered.map((post, i) => (
          <BlogCard key={post._id} post={post} index={i} />
        ))}
      </div>

      {filtered.length === 0 ? (
        <p className="mt-8 text-sm text-zinc-700">
          No posts in this category yet.
        </p>
      ) : null}
    </>
  );
}
