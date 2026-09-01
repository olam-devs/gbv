"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import type { BlogPost } from "@/lib/blog";
import { PasadaImage } from "@/components/ui/PasadaImage";
import { Calendar, Tag } from "lucide-react";

export function BlogCard({ post, index }: { post: BlogPost; index: number }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.4, delay: index * 0.06 }}
    >
      <Link
        href={`/blog/${post.slug}`}
        className="group flex h-full flex-col overflow-hidden rounded-2xl border-2 border-[var(--primary)] bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl"
      >
        <div className="relative aspect-[16/10] overflow-hidden bg-zinc-100">
          <PasadaImage
            src={post.imageUrl}
            alt=""
            fill
            className="object-cover transition duration-500 group-hover:scale-105"
            sizes="(min-width: 1024px) 380px, 90vw"
          />
          {post.category ? (
            <span className="absolute left-3 top-3 inline-flex items-center gap-1 rounded-full bg-white/95 px-3 py-1 text-xs font-semibold text-black ring-1 ring-black/10">
              <Tag className="h-3 w-3" aria-hidden="true" />
              {post.category}
            </span>
          ) : null}
        </div>
        <div className="flex flex-1 flex-col p-5">
          <div className="flex items-center gap-2 text-xs font-medium text-zinc-600">
            <Calendar className="h-3.5 w-3.5" aria-hidden="true" />
            {post.publishedAt}
          </div>
          <h2 className="mt-2 text-base font-semibold text-black group-hover:text-[var(--primary)]">
            {post.title}
          </h2>
          <p className="mt-2 flex-1 text-sm leading-6 text-zinc-800">
            {post.excerpt}
          </p>
          <div className="mt-4 text-sm font-semibold text-[var(--primary)]">
            Read story →
          </div>
        </div>
      </Link>
    </motion.article>
  );
}
