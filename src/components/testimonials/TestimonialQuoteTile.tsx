"use client";

import { motion } from "framer-motion";

/** Same quote layout as the homepage testimonials carousel. */
export function TestimonialQuoteTile({
  quote,
  name,
  role,
  index = 0,
}: {
  quote: string;
  name: string;
  role?: string;
  index?: number;
}) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.04 }}
      className="h-full rounded-2xl bg-zinc-50 p-5 ring-1 ring-[var(--border)] sm:p-6"
    >
      <p className="text-sm leading-7 text-zinc-800">&ldquo;{quote}&rdquo;</p>
      <div className="mt-4 text-sm font-semibold text-black">{name}</div>
      {role ? (
        <div className="mt-0.5 text-xs text-zinc-600">{role}</div>
      ) : null}
    </motion.article>
  );
}
