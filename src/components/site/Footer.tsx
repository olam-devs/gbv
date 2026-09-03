import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Heart, MapPin, Mail, Phone, ExternalLink } from "lucide-react";

const links = [
  { href: "/about", label: "About GI-Desk" },
  { href: "/services", label: "Services" },
  { href: "/projects", label: "Projects" },
  { href: "/get-involved", label: "Get involved" },
  { href: "/jobs", label: "Careers" },
  { href: "/contact", label: "Contact" },
  { href: "/blog", label: "Blog" },
  { href: "/donate", label: "Donate" },
] as const;

export function Footer() {
  return (
    <footer className="mt-auto border-t border-white/15 bg-violet-900">
      <Container className="py-12">
        <div className="grid gap-10 md:grid-cols-3">
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <span className="grid h-10 w-10 place-items-center rounded-xl bg-white/15 text-white ring-1 ring-white/25">
                <Heart className="h-5 w-5" aria-hidden="true" />
              </span>
              <div className="leading-tight">
                <div className="text-sm font-semibold text-white">GI-Desk</div>
                <div className="text-xs text-violet-300">
                  Gender Based and Intimate — Stop Violence
                </div>
              </div>
            </div>
            <p className="max-w-sm text-sm text-violet-200">
              A nonpartisan, apolitical, nonreligious charitable non-profit supporting survivors of gender-based and intimate partner violence in Tanzania.
            </p>
            <a
              href="https://www.facebook.com/profile.php?id=61555280275389"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm text-violet-300 hover:text-white"
            >
              <ExternalLink className="h-4 w-4" aria-hidden="true" />
              Follow us on Facebook
            </a>
          </div>

          <div className="grid grid-cols-2 gap-8">
            <div>
              <div className="text-sm font-semibold text-white">Explore</div>
              <ul className="mt-3 space-y-2 text-sm">
                {links.slice(0, 4).map((l) => (
                  <li key={l.href}>
                    <Link
                      href={l.href}
                      className="text-violet-200 hover:text-white"
                    >
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <div className="text-sm font-semibold text-white">More</div>
              <ul className="mt-3 space-y-2 text-sm">
                {links.slice(4).map((l) => (
                  <li key={l.href}>
                    <Link
                      href={l.href}
                      className="text-violet-200 hover:text-white"
                    >
                      {l.label}
                    </Link>
                  </li>
                ))}
                <li>
                  <Link
                    href="/privacy"
                    className="text-violet-200 hover:text-white"
                  >
                    Privacy policy
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          <div>
            <div className="text-sm font-semibold text-white">Contact</div>
            <ul className="mt-3 space-y-2 text-sm text-violet-200">
              <li className="flex gap-2">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
                <span>Kiharaka-kiembeni St, Mapinga, Bagamoyo, Pwani</span>
              </li>
              <li className="flex gap-2">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-violet-400" aria-hidden="true" />
                <span className="text-violet-300">Branch: Mbezi Beach kwa Zena, Dar es Salaam</span>
              </li>
              <li className="flex gap-2">
                <Phone className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
                <a href="tel:+255757128222" className="hover:text-white">
                  +255 757 128 222
                </a>
              </li>
              <li className="flex gap-2">
                <Mail className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
                <a
                  href="mailto:genderdeskhelp@gmail.com"
                  className="hover:text-white"
                >
                  genderdeskhelp@gmail.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-10 border-t border-white/15 pt-6 text-center text-xs text-violet-300">
          © 2026 Gender Based and Intimate (GI-Desk). All rights reserved. Reg. No. ooNGO/R/5824.
        </div>
      </Container>
    </footer>
  );
}
