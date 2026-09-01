import { notFound } from "next/navigation";
import { PageShell } from "@/components/site/PageShell";
import { AnimatedSection } from "@/components/ui/AnimatedSection";
import { DetailLayout } from "@/components/content/DetailLayout";
import { ButtonLink } from "@/components/ui/Button";
import { getAllTenderSlugs, getTenderBySlug, getTenders } from "@/lib/tenders";
import { Download } from "lucide-react";
import { cn } from "@/lib/cn";

export async function generateStaticParams() {
  const tenders = await getTenders();
  const slugs = new Set([...getAllTenderSlugs(), ...tenders.map((t) => t.slug)]);
  return [...slugs].map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const tender = await getTenderBySlug(slug);
  if (!tender) return { title: "Tender not found" };
  return { title: tender.title, description: tender.summary };
}

function formatDateTime(value?: string) {
  if (!value) return undefined;
  return new Date(value).toLocaleString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export default async function TenderDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const tender = await getTenderBySlug(slug);
  if (!tender) notFound();

  const contactEmail = tender.contactEmail ?? "info@pasada.or.tz";

  return (
    <PageShell eyebrow="Tenders" title={tender.title}>
      <AnimatedSection>
        <div className="mb-2 flex flex-wrap items-center gap-3">
          <span
            className={cn(
              "inline-block rounded-full px-3 py-1 text-xs font-semibold ring-1",
              tender.status === "Open"
                ? "bg-red-50 text-[var(--primary)] ring-[var(--primary)]"
                : "bg-zinc-100 text-zinc-600 ring-zinc-300",
            )}
          >
            {tender.status}
          </span>
          {tender.tenderNumber ? (
            <span className="text-sm text-zinc-700">Ref: {tender.tenderNumber}</span>
          ) : null}
          {tender.deadline ? (
            <span className="text-sm text-zinc-700">
              Deadline: {formatDateTime(tender.deadline)}
            </span>
          ) : null}
        </div>

        <DetailLayout
          backHref="/tenders"
          backLabel="All tenders"
          title={tender.title}
          summary={tender.summary}
          imageUrl={tender.imageUrl}
          content={tender.content}
        >
          <p>Contact {contactEmail} for questions about this tender.</p>
        </DetailLayout>

        <div className="mt-10 flex flex-wrap gap-3 rounded-2xl border-2 border-[var(--primary)] bg-red-50 p-6">
          {tender.documentUrl ? (
            <ButtonLink href={tender.documentUrl} target="_blank" rel="noopener noreferrer">
              <Download className="h-4 w-4" aria-hidden="true" />
              Download tender document
            </ButtonLink>
          ) : null}
          <ButtonLink href={`mailto:${contactEmail}?subject=Tender inquiry: ${encodeURIComponent(tender.title)}`} variant="secondary">
            Contact about this tender
          </ButtonLink>
        </div>
      </AnimatedSection>
    </PageShell>
  );
}
