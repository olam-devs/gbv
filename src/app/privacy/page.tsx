import { PageShell } from "@/components/site/PageShell";
import { AnimatedSection } from "@/components/ui/AnimatedSection";

export default function PrivacyPage() {
  return (
    <PageShell
      eyebrow="Legal"
      title="Privacy policy (draft)"
      heroImageSrc="https://images.unsplash.com/photo-1531206715517-5c0ba140b2b8?auto=format&fit=crop&w=1200&q=80"
    >
      <AnimatedSection>
      <div className="prose prose-zinc max-w-none">
        <p className="text-sm leading-7 text-zinc-700">
          This is a placeholder privacy policy page for the redesigned site. It
          should be replaced with GI-Desk’s official policy.
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

