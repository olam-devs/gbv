import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { Container } from "@/components/ui/Container";
import { PasadaImage } from "@/components/ui/PasadaImage";
import { isLogoImage } from "@/lib/media";

export function PageShell({
  title,
  eyebrow,
  heroImageSrc,
  children,
}: {
  title: string;
  eyebrow?: string;
  heroImageSrc?: string;
  children: React.ReactNode;
}) {
  const logoHero = heroImageSrc ? isLogoImage(heroImageSrc) : false;

  return (
    <div className="flex min-h-full flex-col">
      <Header />
      <main className="flex-1">
        <section className="relative min-h-[min(52vh,480px)] border-b border-[var(--border)] bg-zinc-100 sm:min-h-[min(58vh,540px)] lg:min-h-[min(64vh,620px)]">
          {heroImageSrc ? (
            <>
              <div className="absolute inset-0">
                <PasadaImage
                  src={heroImageSrc}
                  alt={logoHero ? "PASADA logo" : ""}
                  fill
                  priority
                  className={
                    logoHero
                      ? "bg-white object-contain object-center p-12 sm:p-16"
                      : "object-cover object-center"
                  }
                  sizes="100vw"
                />
              </div>
              <div
                className="absolute inset-0 bg-gradient-to-t from-white via-white/75 to-white/25"
                aria-hidden="true"
              />
            </>
          ) : null}

          <Container className="relative flex min-h-[inherit] flex-col justify-end py-10 sm:py-14">
            {eyebrow ? (
              <div className="text-xs font-semibold tracking-wide text-[var(--brand-blue)]">
                {eyebrow}
              </div>
            ) : null}
            <h1 className="mt-2 max-w-4xl text-balance text-4xl font-semibold tracking-tight text-zinc-950 sm:text-5xl">
              {title}
            </h1>
          </Container>
        </section>
        <Container className="py-12">{children}</Container>
      </main>
      <Footer />
    </div>
  );
}
