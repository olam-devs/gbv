import Link from "next/link";
import { notFound } from "next/navigation";
import { PageShell } from "@/components/site/PageShell";
import { AnimatedSection } from "@/components/ui/AnimatedSection";
import { media } from "@/lib/media";
import { getTestimonials } from "@/lib/testimonials";
import { ArrowLeft, Quote } from "lucide-react";

export async function generateStaticParams() {
  const list = await getTestimonials();
  return list.map((t) => ({ id: t._id }));
}

export default async function TestimonialDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const list = await getTestimonials();
  const t = list.find((x) => x._id === id);
  if (!t) notFound();

  return (
    <PageShell
      eyebrow="Testimonials"
      title={t.name}
      heroImageSrc={media.hero.blog}
    >
      <AnimatedSection>
        <Link
          href="/testimonials"
          className="inline-flex items-center gap-2 text-sm font-semibold text-[var(--brand-blue)] hover:underline"
        >
          <ArrowLeft className="h-4 w-4" aria-hidden="true" />
          All testimonials
        </Link>

        {t.category ? (
          <span className="mt-4 inline-block rounded-full border-2 border-[var(--primary)] px-3 py-1 text-xs font-semibold text-black">
            {t.category}
          </span>
        ) : null}

        <div className="mt-8 rounded-3xl border-2 border-[var(--primary)] bg-gradient-to-br from-white to-red-50/50 p-8 sm:p-10">
          <span className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-[var(--primary)] text-white">
            <Quote className="h-6 w-6" aria-hidden="true" />
          </span>
          <blockquote className="mt-6 text-lg leading-9 text-zinc-900 sm:text-xl">
            &ldquo;{t.quote}&rdquo;
          </blockquote>
          <footer className="mt-8 border-t border-[var(--primary)]/25 pt-6">
            <div className="text-base font-semibold text-black">{t.name}</div>
            {t.role ? (
              <div className="mt-1 text-sm text-zinc-600">{t.role}</div>
            ) : null}
          </footer>
        </div>
      </AnimatedSection>
    </PageShell>
  );
}
