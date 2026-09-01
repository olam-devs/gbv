import Link from "next/link";
import { PageShell } from "@/components/site/PageShell";
import { media } from "@/lib/media";
import { AnimatedSection } from "@/components/ui/AnimatedSection";
import { ButtonLink } from "@/components/ui/Button";
import { getTenders } from "@/lib/tenders";
import { FileText, Calendar } from "lucide-react";
import { cn } from "@/lib/cn";

function formatDate(value?: string) {
  if (!value) return undefined;
  return new Date(value).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

export default async function TendersPage() {
  const tenders = await getTenders();

  return (
    <PageShell
      eyebrow="Tenders"
      title="Current tenders and procurement opportunities"
      heroImageSrc={media.hero.careers}
    >
      <AnimatedSection>
        <p className="max-w-3xl text-sm leading-7 text-zinc-800">
          PASADA publishes open procurement opportunities here. Review the tender
          details and submit your bid before the closing deadline.
        </p>
      </AnimatedSection>

      <div className="mt-8 grid gap-5 lg:grid-cols-2">
        {tenders.map((tender) => (
          <article
            key={tender._id}
            className={cn(
              "rounded-2xl border-2 bg-white p-6 shadow-sm transition hover:-translate-y-0.5 hover:shadow-lg",
              tender.status === "Open" ? "border-[var(--primary)]" : "border-zinc-300 opacity-80",
            )}
          >
            <div className="flex items-start justify-between gap-3">
              <h2 className="text-lg font-semibold text-black">
                <Link href={`/tenders/${tender.slug}`}>{tender.title}</Link>
              </h2>
              <span
                className={cn(
                  "shrink-0 rounded-full px-3 py-1 text-xs font-semibold ring-1",
                  tender.status === "Open"
                    ? "bg-red-50 text-[var(--primary)] ring-[var(--primary)]"
                    : "bg-zinc-100 text-zinc-600 ring-zinc-300",
                )}
              >
                {tender.status}
              </span>
            </div>
            <p className="mt-3 text-sm leading-6 text-zinc-800">{tender.summary}</p>
            <div className="mt-4 flex flex-wrap gap-4 text-xs font-medium text-zinc-700">
              {tender.tenderNumber ? (
                <span className="inline-flex items-center gap-1">
                  <FileText className="h-3.5 w-3.5" aria-hidden="true" />
                  {tender.tenderNumber}
                </span>
              ) : null}
              {tender.deadline ? (
                <span className="inline-flex items-center gap-1">
                  <Calendar className="h-3.5 w-3.5" aria-hidden="true" />
                  Deadline: {formatDate(tender.deadline)}
                </span>
              ) : null}
            </div>
            <div className="mt-5">
              <ButtonLink href={`/tenders/${tender.slug}`} variant="secondary">
                View tender details
              </ButtonLink>
            </div>
          </article>
        ))}

        {!tenders.length ? (
          <p className="text-sm text-zinc-700">No tenders are currently open. Please check back soon.</p>
        ) : null}
      </div>
    </PageShell>
  );
}
