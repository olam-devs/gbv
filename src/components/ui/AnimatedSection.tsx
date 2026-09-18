"use client";

import { motion } from "framer-motion";

export function AnimatedSection({
  children,
  delay = 0,
  staggerIndex,
  className,
  direction = "up",
}: {
  children: React.ReactNode;
  delay?: number;
  staggerIndex?: number;
  className?: string;
  direction?: "up" | "left" | "right" | "none";
}) {
  const computedDelay = staggerIndex !== undefined ? delay + staggerIndex * 0.07 : delay;

  const initial =
    direction === "left"  ? { opacity: 0, x: -20 } :
    direction === "right" ? { opacity: 0, x: 20 }  :
    direction === "none"  ? { opacity: 0 }          :
    { opacity: 0, y: 18 };

  const whileInView =
    direction === "left" || direction === "right" ? { opacity: 1, x: 0 } :
    direction === "none" ? { opacity: 1 } :
    { opacity: 1, y: 0 };

  return (
    <motion.div
      className={className}
      initial={initial}
      whileInView={whileInView}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.55, ease: "easeOut", delay: computedDelay }}
    >
      {children}
    </motion.div>
  );
}

