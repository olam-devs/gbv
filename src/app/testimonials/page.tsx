import { PageShell } from "@/components/site/PageShell";
import { AnimatedSection } from "@/components/ui/AnimatedSection";
import { TestimonialCategoryFilter } from "@/components/testimonials/TestimonialCategoryFilter";
import { media } from "@/lib/media";
import {
  getTestimonialCategories,
  getTestimonials,
} from "@/lib/testimonials";

export default async function TestimonialsPage() {
  const [items, categories] = await Promise.all([
    getTestimonials(),
    getTestimonialCategories(),
  ]);

  return (
    <PageShell
      eyebrow="Testimonials"
      title="Voices from the community"
      heroImageSrc={media.hero.blog}
    >
      <AnimatedSection>
        <p className="max-w-3xl text-sm leading-7 text-zinc-800">
          Stories and reflections from clients, caregivers, volunteers and
          partners who have walked with PASADA. Pick a category to see its quote
          cards, or choose <strong>All voices</strong> to browse every story
          together.
        </p>
      </AnimatedSection>

      <TestimonialCategoryFilter items={items} categories={categories} />
    </PageShell>
  );
}
