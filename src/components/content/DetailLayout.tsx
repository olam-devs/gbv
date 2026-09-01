import Link from "next/link";
import { PasadaImage } from "@/components/ui/PasadaImage";
import { PortableContent } from "@/components/content/PortableContent";
import { ArrowLeft } from "lucide-react";
import type { PortableTextBlock } from "@portabletext/react";

export function DetailLayout({
  backHref,
  backLabel,
  title,
  summary,
  badge,
  imageUrl,
  galleryUrls,
  videoUrl,
  content,
  children,
}: {
  backHref: string;
  backLabel: string;
  title: string;
  summary: string;
  badge?: string;
  imageUrl: string;
  galleryUrls?: string[];
  videoUrl?: string;
  content?: PortableTextBlock[];
  children?: React.ReactNode;
}) {
  const gallery = galleryUrls?.filter((u) => u !== imageUrl) ?? [];

  return (
    <div>
      <Link
        href={backHref}
        className="inline-flex items-center gap-2 text-sm font-semibold text-[var(--brand-blue)] hover:underline"
      >
        <ArrowLeft className="h-4 w-4" aria-hidden="true" />
        {backLabel}
      </Link>

      {badge ? (
        <span className="mt-4 inline-block rounded-full border-2 border-[var(--primary)] px-3 py-1 text-xs font-semibold text-black">
          {badge}
        </span>
      ) : null}

      <p className="mt-6 max-w-none text-base leading-8 text-zinc-800">{summary}</p>

      <div className="mt-8 overflow-hidden rounded-2xl border-2 border-[var(--primary)]">
        <div className="relative aspect-[16/9] bg-zinc-100">
          <PasadaImage src={imageUrl} alt={title} fill className="object-cover" sizes="1100px" priority />
        </div>
      </div>

      {videoUrl ? (
        <div className="mt-6 overflow-hidden rounded-2xl border-2 border-black">
          <video src={videoUrl} controls playsInline className="aspect-video w-full" poster={imageUrl} />
        </div>
      ) : null}

      {gallery.length > 0 ? (
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {gallery.map((url) => (
            <div
              key={url}
              className="relative aspect-[4/3] overflow-hidden rounded-xl border-2 border-[var(--primary)] bg-zinc-100"
            >
              <PasadaImage src={url} alt="" fill className="object-cover" sizes="400px" />
            </div>
          ))}
        </div>
      ) : null}

      <div className="mt-10">
        {content?.length ? (
          <PortableContent value={content} />
        ) : (
          <div className="space-y-4 text-base leading-8 text-zinc-800">{children}</div>
        )}
      </div>
    </div>
  );
}
