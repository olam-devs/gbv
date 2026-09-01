"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { PasadaImage } from "@/components/ui/PasadaImage";

export function ContentCard({
  href,
  title,
  excerpt,
  imageUrl,
  badge,
  index = 0,
  cta = "View details",
}: {
  href: string;
  title: string;
  excerpt: string;
  imageUrl: string;
  badge?: string;
  index?: number;
  cta?: string;
}) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 14 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.35, delay: index * 0.05 }}
      className="h-full"
    >
      <Link
        href={href}
        className="group flex h-full flex-col overflow-hidden rounded-2xl border-2 border-[var(--primary)] bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl"
      >
        <div className="relative aspect-[16/10] overflow-hidden bg-zinc-100">
          <PasadaImage
            src={imageUrl}
            alt=""
            fill
            className="object-cover transition duration-500 group-hover:scale-105"
            sizes="(min-width: 1024px) 380px, 90vw"
          />
          {badge ? (
            <span className="absolute left-3 top-3 rounded-full bg-white/95 px-3 py-1 text-xs font-semibold text-black ring-1 ring-black/10">
              {badge}
            </span>
          ) : null}
        </div>
        <div className="flex flex-1 flex-col p-5 sm:p-6">
          <h2 className="text-base font-semibold text-black group-hover:text-[var(--primary)]">
            {title}
          </h2>
          <p className="mt-2 flex-1 text-sm leading-6 text-zinc-800">{excerpt}</p>
          <div className="mt-4 text-sm font-semibold text-[var(--primary)]">
            {cta} →
          </div>
        </div>
      </Link>
    </motion.article>
  );
}
