import { notFound } from "next/navigation";
import { PageShell } from "@/components/site/PageShell";
import { AnimatedSection } from "@/components/ui/AnimatedSection";
import { DetailLayout } from "@/components/content/DetailLayout";
import { ButtonLink } from "@/components/ui/Button";
import {
  getAllServiceSlugs,
  getServiceBySlug,
  getServices,
} from "@/lib/services";

export async function generateStaticParams() {
  const services = await getServices();
  const slugs = new Set([...getAllServiceSlugs(), ...services.map((s) => s.slug)]);
  return [...slugs].map((slug) => ({ slug }));
}

export default async function ServiceDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const service = await getServiceBySlug(slug);
  if (!service) notFound();

  return (
    <PageShell eyebrow="Services" title={service.title} heroImageSrc={service.imageUrl}>
      <AnimatedSection>
        <DetailLayout
          backHref="/services"
          backLabel="All services"
          title={service.title}
          summary={service.summary}
          badge={service.category}
          imageUrl={service.imageUrl}
          galleryUrls={service.galleryUrls}
          content={service.content}
        >
          <p>
            PASADA delivers this service with dignity, confidentiality and respect
            for every client—without discrimination and free of charge.
          </p>
          <p>
            Our team supports clients and families through counseling, education,
            follow-up care and referrals, working closely with health facilities
            and community stakeholders.
          </p>
        </DetailLayout>

        <div className="mt-12 rounded-2xl border-2 border-[var(--primary)] bg-red-50 p-6">
          <p className="text-sm text-zinc-800">Need this service or have questions?</p>
          <div className="mt-4 flex flex-wrap gap-3">
            <ButtonLink href="/contact">Contact us</ButtonLink>
            <ButtonLink href="/donate" variant="secondary">
              Support our work
            </ButtonLink>
          </div>
        </div>
      </AnimatedSection>
    </PageShell>
  );
}
