import Link from "next/link";
import { ArrowRight, HandHeart, Users, Shield, Sparkles } from "lucide-react";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { Container } from "@/components/ui/Container";
import { ButtonLink } from "@/components/ui/Button";
import { TestimonialsCarousel } from "@/components/home/TestimonialsCarousel";
import { AnimatedSection } from "@/components/ui/AnimatedSection";
import { HeroSlideshow } from "@/components/home/HeroSlideshow";
import { ContentCard } from "@/components/content/ContentCard";
import { getSiteSettings } from "@/lib/settings";
import { getProjects } from "@/lib/projects";
import { getServices } from "@/lib/services";
import { getBlogPosts } from "@/lib/blog";
import { media } from "@/lib/media";
import { getTestimonials } from "@/lib/testimonials";

export default async function Home() {
  const settings = await getSiteSettings();
  const [featuredProjects, featuredServices, featuredPosts, featuredTestimonials] =
    await Promise.all([
    getProjects({ featuredOnly: true, limit: settings.maxFeaturedProjects }),
    getServices({ featuredOnly: true, limit: settings.maxFeaturedServices }),
    getBlogPosts({ featuredOnly: true, limit: settings.maxFeaturedPosts }),
    getTestimonials({ featuredOnly: true, limit: 6 }),
  ]);

  return (
    <div className="flex min-h-full flex-col">
      <Header />

      <section className="relative overflow-hidden bg-[var(--primary)]">
        <div className="absolute inset-0 bg-grid opacity-20" aria-hidden="true" />
        <div
          className="absolute -top-24 left-1/2 h-80 w-[52rem] -translate-x-1/2 rounded-full bg-gradient-to-r from-purple-800/60 via-violet-600/40 to-purple-900/60 blur-3xl"
          aria-hidden="true"
        />
        <Container className="relative flex min-h-[calc(100vh-4rem)] items-center py-16 sm:py-20">
          <div className="grid w-full items-center gap-10 lg:grid-cols-2">
            <AnimatedSection>
              <div>
                <div className="inline-flex items-center gap-2 rounded-full bg-white/15 px-4 py-2 text-xs font-medium text-white ring-1 ring-white/25">
                  <Sparkles className="h-4 w-4" aria-hidden="true" />
                  Registered NGO — Tanzania, Reg. No. ooNGO/R/5824
                </div>

                <h1 className="mt-5 text-balance text-4xl font-semibold tracking-tight text-white sm:text-5xl">
                  Standing with survivors of gender-based and intimate partner violence
                </h1>
                <p className="mt-4 max-w-xl text-pretty text-base leading-7 text-violet-100 sm:text-lg">
                  GI-Desk is a nonpartisan, nonreligious charitable non-profit
                  providing case management, psychosocial support, and community
                  education for GBV survivors across Tanzania.{" "}
                  <span className="font-semibold text-white">#StopGBVNow</span>
                </p>

                <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:items-center">
                  <ButtonLink
                    href="/donate"
                    size="lg"
                    className="justify-center bg-white text-[var(--primary)] hover:bg-violet-50"
                  >
                    Donate to end violence <ArrowRight className="h-4 w-4" />
                  </ButtonLink>
                  <ButtonLink
                    href="/get-involved"
                    variant="secondary"
                    size="lg"
                    className="justify-center bg-white/10 text-white ring-white/30 hover:bg-white/20"
                  >
                    Get involved
                  </ButtonLink>
                </div>

                <div className="mt-10 grid grid-cols-1 gap-4 rounded-2xl border-2 border-white/25 bg-white/10 p-4 backdrop-blur sm:grid-cols-3">
                  {[
                    {
                      icon: <Shield className="h-4 w-4" aria-hidden="true" />,
                      title: "Safety & support",
                      desc: "Case management and psychosocial care for survivors.",
                    },
                    {
                      icon: <Users className="h-4 w-4" aria-hidden="true" />,
                      title: "Community action",
                      desc: "Education, dialogues and norm change across communities.",
                    },
                    {
                      icon: <HandHeart className="h-4 w-4" aria-hidden="true" />,
                      title: "Empowerment",
                      desc: "Leadership, confidence and economic support for women.",
                    },
                  ].map((c) => (
                    <div key={c.title} className="rounded-xl p-3">
                      <div className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-white/15 text-white ring-1 ring-white/20">
                        {c.icon}
                      </div>
                      <div className="mt-2 text-sm font-semibold text-white">{c.title}</div>
                      <div className="mt-1 text-xs leading-5 text-violet-200">
                        {c.desc}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </AnimatedSection>

            <AnimatedSection delay={0.1}>
              <HeroSlideshow images={[...media.hero.home]} />
              <div className="pointer-events-none relative z-10 -mt-2 hidden rounded-2xl border-2 border-white/30 bg-white/90 p-4 text-sm shadow-lg sm:block sm:max-w-xs">
                <div className="font-semibold text-zinc-950">Our mission</div>
                <div className="mt-1 text-zinc-800">
                  A nonpartisan, nonreligious non-profit supporting people experiencing
                  gender-based and intimate partner violence in Tanzania.
                </div>
              </div>
            </AnimatedSection>
          </div>
        </Container>
      </section>

      <section className="border-t border-white/15 bg-[var(--primary)]">
        <Container className="py-16">
          <AnimatedSection>
            <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
              <div>
                <div className="text-xs font-semibold tracking-wide text-violet-300">
                  What we do
                </div>
                <h2 className="mt-2 text-3xl font-semibold tracking-tight text-white">
                  Comprehensive GBV response services
                </h2>
                <p className="mt-2 max-w-2xl text-sm leading-6 text-violet-100">
                  From direct survivor support to community prevention and advocacy.
                </p>
              </div>
              <ButtonLink href="/services" variant="secondary">
                View all services <ArrowRight className="h-4 w-4" />
              </ButtonLink>
            </div>
          </AnimatedSection>

          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {featuredServices.map((s, i) => (
              <ContentCard
                key={s._id}
                href={`/services/${s.slug}`}
                title={s.title}
                excerpt={s.summary}
                imageUrl={s.imageUrl}
                badge={s.category}
                index={i}
                cta="Learn more"
              />
            ))}
          </div>
        </Container>
      </section>

      <section className="border-t border-[var(--border)] bg-white">
        <Container className="py-16">
          <AnimatedSection>
            <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
              <div>
                <div className="text-xs font-semibold tracking-wide text-[var(--primary)]">
                  Impact in action
                </div>
                <h2 className="mt-2 text-3xl font-semibold tracking-tight">
                  Projects changing lives
                </h2>
              </div>
              <ButtonLink href="/projects" variant="secondary">
                Explore projects <ArrowRight className="h-4 w-4" />
              </ButtonLink>
            </div>
          </AnimatedSection>

          <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {featuredProjects.map((p, i) => (
              <ContentCard
                key={p._id}
                href={`/projects/${p.slug}`}
                title={p.title}
                excerpt={p.summary}
                imageUrl={p.imageUrl}
                badge={p.tag ?? p.category}
                index={i}
              />
            ))}
          </div>
        </Container>
      </section>

      {featuredPosts.length > 0 ? (
        <section className="border-t border-white/15 bg-[var(--primary)]">
          <Container className="py-16">
            <AnimatedSection>
              <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
                <div>
                  <div className="text-xs font-semibold tracking-wide text-violet-300">
                    Latest stories
                  </div>
                  <h2 className="mt-2 text-3xl font-semibold tracking-tight text-white">
                    News &amp; updates
                  </h2>
                </div>
                <ButtonLink href="/blog" variant="secondary">
                  All stories <ArrowRight className="h-4 w-4" />
                </ButtonLink>
              </div>
            </AnimatedSection>
            <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {featuredPosts.map((post, i) => (
                <ContentCard
                  key={post._id}
                  href={`/blog/${post.slug}`}
                  title={post.title}
                  excerpt={post.excerpt}
                  imageUrl={post.imageUrl}
                  badge={post.category}
                  index={i}
                  cta="Read story"
                />
              ))}
            </div>
          </Container>
        </section>
      ) : null}

      <section className="border-t border-white/15 bg-[var(--primary)]">
        <Container className="py-16">
          <div className="relative overflow-hidden rounded-3xl border-2 border-white/25 bg-white/10 p-8 backdrop-blur sm:p-10">
            <div className="relative grid gap-8 lg:grid-cols-2 lg:items-center">
              <div>
                <h2 className="text-3xl font-semibold tracking-tight text-white">
                  Help us end gender-based violence in Tanzania
                </h2>
                <p className="mt-3 max-w-xl text-sm leading-6 text-violet-100">
                  Donors, partners and volunteers make every survivor's journey to safety possible.
                </p>
              </div>
              <div className="flex flex-col gap-3 sm:flex-row sm:justify-end">
                <ButtonLink
                  href="/donate"
                  size="lg"
                  className="justify-center bg-white text-[var(--primary)] hover:bg-violet-50"
                >
                  Donate
                </ButtonLink>
                <ButtonLink
                  href="/contact"
                  variant="secondary"
                  size="lg"
                  className="justify-center bg-white/10 text-white ring-white/30 hover:bg-white/20"
                >
                  Talk to us <ArrowRight className="h-4 w-4" />
                </ButtonLink>
              </div>
            </div>
          </div>
        </Container>
      </section>

      <section className="border-t border-[var(--border)] bg-white">
        <Container className="py-16">
          <div className="grid items-start gap-8 lg:grid-cols-5">
            <div className="lg:col-span-2">
              <div className="text-xs font-semibold tracking-wide text-[var(--primary)]">
                Survivor voices
              </div>
              <h2 className="mt-2 text-3xl font-semibold tracking-tight text-zinc-950">
                Stories of courage and change
              </h2>
              <p className="mt-3 text-sm leading-7 text-zinc-700">
                From survivors, community members, volunteers and partners.
              </p>
            </div>
            <div className="min-w-0 lg:col-span-3">
              <TestimonialsCarousel
                items={featuredTestimonials.map((t) => ({
                  quote: t.quote,
                  name: t.name,
                  role: t.role ?? t.category,
                }))}
              />
              <div className="mt-4 text-sm font-semibold text-[var(--primary)]">
                <Link href="/testimonials" className="hover:underline">
                  Read more stories →
                </Link>
              </div>
            </div>
          </div>
        </Container>
      </section>

      <Footer />
    </div>
  );
}
