import { PageShell } from "@/components/site/PageShell";
import { AnimatedSection } from "@/components/ui/AnimatedSection";

export default function PrivacyPage() {
  return (
    <PageShell
      eyebrow="Legal"
      title="Privacy policy (draft)"
      heroImageSrc="https://pasada.or.tz/uploads/special_bg.jpg"
    >
      <AnimatedSection>
      <div className="prose prose-zinc max-w-none">
        <p className="text-sm leading-7 text-zinc-700">
          This is a placeholder privacy policy page for the redesigned site. It
          should be replaced with PASADA’s official policy.
        </p>
        <ul className="mt-4 list-disc pl-5 text-sm text-zinc-700">
          <li>We only collect information you submit (e.g., contact forms).</li>
          <li>We do not sell personal data.</li>
          <li>We use reasonable safeguards to protect submitted information.</li>
        </ul>
      </div>
      </AnimatedSection>
    </PageShell>
  );
}

