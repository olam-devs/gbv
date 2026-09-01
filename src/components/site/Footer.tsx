import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Heart, MapPin, Mail, Phone } from "lucide-react";

const links = [
  { href: "/about", label: "About PASADA" },
  { href: "/services", label: "Services" },
  { href: "/projects", label: "Projects" },
  { href: "/get-involved", label: "Get involved" },
  { href: "/jobs", label: "Careers" },
  { href: "/tenders", label: "Tenders" },
  { href: "/contact", label: "Contact" },
  { href: "/blog", label: "Blog" },
  { href: "/whistleblower", label: "Whistle-blower / Tupe taarifa" },
] as const;

export function Footer() {
  return (
    <footer className="mt-auto border-t border-[var(--border)] bg-zinc-50">
      <Container className="py-12">
        <div className="grid gap-10 md:grid-cols-3">
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <span className="grid h-10 w-10 place-items-center rounded-xl bg-[var(--primary)] text-white">
                <Heart className="h-5 w-5" aria-hidden="true" />
              </span>
              <div className="leading-tight">
                <div className="text-sm font-semibold text-black">PASADA (T)</div>
                <div className="text-xs text-zinc-700">
                  Pastoral Activities and Services for people with AIDS
                </div>
              </div>
            </div>
            <p className="max-w-sm text-sm text-zinc-800">
              A faith-based organization under the Roman Catholic Archdiocese of
              Dar es Salaam, offering compassionate services to all individuals
              without discrimination.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-8">
            <div>
              <div className="text-sm font-semibold text-black">Explore</div>
              <ul className="mt-3 space-y-2 text-sm">
                {links.slice(0, 4).map((l) => (
                  <li key={l.href}>
                    <Link
                      href={l.href}
                      className="text-zinc-800 hover:text-[var(--primary)]"
                    >
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <div className="text-sm font-semibold text-black">More</div>
              <ul className="mt-3 space-y-2 text-sm">
                {links.slice(4).map((l) => (
                  <li key={l.href}>
                    <Link
                      href={l.href}
                      className="text-zinc-800 hover:text-[var(--primary)]"
                    >
                      {l.label}
                    </Link>
                  </li>
                ))}
                <li>
                  <Link
                    href="/donate"
                    className="text-zinc-800 hover:text-[var(--primary)]"
                  >
                    Donate
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          <div>
            <div className="text-sm font-semibold text-black">Contact</div>
            <ul className="mt-3 space-y-2 text-sm text-zinc-800">
              <li className="flex gap-2">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
                <span>Dar es Salaam, Tanzania</span>
              </li>
              <li className="flex gap-2">
                <Phone className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
                <a href="tel:+255222866618" className="hover:text-[var(--primary)]">
                  +255 22 286 6618
                </a>
              </li>
              <li className="flex gap-2">
                <Mail className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
                <a
                  href="mailto:info@pasada.or.tz"
                  className="hover:text-[var(--primary)]"
                >
                  info@pasada.or.tz
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-10 border-t border-[var(--border)] pt-6 text-center text-xs text-zinc-700">
          © 2026 PASADA (T). All rights reserved.
        </div>
      </Container>
    </footer>
  );
}
