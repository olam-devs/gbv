"use client";

import Image, { type ImageProps } from "next/image";
import { useState } from "react";
import { isPasadaCdn, media } from "@/lib/media";
import { cn } from "@/lib/cn";

type PasadaImageProps = Omit<ImageProps, "src" | "alt"> & {
  src: string;
  alt: string;
  fallbackSrc?: string;
};

export function PasadaImage({
  src,
  alt,
  fallbackSrc = media.placeholder,
  className,
  ...props
}: PasadaImageProps) {
  const [current, setCurrent] = useState(src);
  const unoptimized = isPasadaCdn(current);

  return (
    <Image
      {...props}
      src={current}
      alt={alt}
      unoptimized={unoptimized}
      className={cn(className)}
      onError={() => {
        if (current !== fallbackSrc) setCurrent(fallbackSrc);
      }}
    />
  );
}
