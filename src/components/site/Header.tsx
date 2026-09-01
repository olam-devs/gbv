"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Container } from "@/components/ui/Container";
import { ButtonLink } from "@/components/ui/Button";
import { Menu, Phone, Mail, X } from "lucide-react";
import { useEffect, useState } from "react";
import { cn } from "@/lib/cn";

const nav = [
  { href: "/", label: "Home", match: (p: string) => p === "/" },
  { href: "/about", label: "About", match: (p: string) => p.startsWith("/about") },
  { href: "/services", label: "Services", match: (p: string) => p.startsWith("/services") },
  { href: "/projects", label: "Projects", match: (p: string) => p.startsWith("/projects") },
  { href: "/blog", label: "Blog", match: (p: string) => p.startsWith("/blog") },
  {
    href: "/testimonials",
    label: "Testimonials",
    match: (p: string) => p.startsWith("/testimonials"),
  },
  { href: "/jobs", label: "Careers", match: (p: string) => p.startsWith("/jobs") },
  { href: "/tenders", label: "Tenders", match: (p: string) => p.startsWith("/tenders") },
  {
    href: "/get-involved",
    label: "Get involved",
    match: (p: string) => p.startsWith("/get-involved"),
  },
  {
    href: "/whistleblower",
    label: "Whistle-blower",
    match: (p: string) => p.startsWith("/whistleblower"),
  },
  { href: "/contact", label: "Contact", match: (p: string) => p.startsWith("/contact") },
] as const;

function navLinkClass(active: boolean) {
  return cn(
    "rounded-full px-2 py-2 text-[13px] font-medium transition-colors whitespace-nowrap",
    active
      ? "bg-[var(--primary)] text-white shadow-sm"
      : "text-zinc-800 hover:bg-zinc-100 hover:text-zinc-950",
  );
}

export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open]);

  return (
    <header className="sticky top-0 z-50 border-b border-[var(--border)] bg-white/80 backdrop-blur">
      <Container className="flex h-16 items-center justify-between gap-3">
        <Link href="/" className="flex items-center gap-2">
          <span className="relative h-9 w-10 overflow-hidden rounded-xl bg-white ring-1 ring-[var(--border)]">
            <Image
              src="/brand/logo.jpg"
              alt="PASADA logo"
              fill
              className="object-cover"
              sizes="40px"
              priority
            />
          </span>
          <span className="leading-tight">
            <span className="block text-sm font-semibold tracking-tight">
              PASADA (T)
            </span>
            <span className="block text-xs text-zinc-600">
              Care • Hope • Dignity
            </span>
          </span>
        </Link>

        <nav className="hidden items-center gap-0.5 xl:flex">
          {nav.map((item) => {
            const active = item.match(pathname);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={navLinkClass(active)}
                aria-current={active ? "page" : undefined}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-2">
          <div className="hidden items-center gap-3 text-xs text-zinc-600 xl:flex">
            <a
              href="tel:+255222866618"
              className="inline-flex items-center gap-1 rounded-full px-2 py-1 hover:bg-zinc-100"
            >
              <Phone className="h-3.5 w-3.5" aria-hidden="true" />
              +255 22 286 6618
            </a>
            <a
              href="mailto:info@pasada.or.tz"
              className="inline-flex items-center gap-1 rounded-full px-2 py-1 hover:bg-zinc-100"
            >
              <Mail className="h-3.5 w-3.5" aria-hidden="true" />
              info@pasada.or.tz
            </a>
          </div>

          <ButtonLink href="/donate" size="sm">
            Donate
          </ButtonLink>

          <button
            className="inline-flex h-10 w-10 items-center justify-center rounded-full ring-1 ring-[var(--border)] hover:bg-zinc-50 xl:hidden"
            aria-label="Open menu"
            aria-expanded={open}
            onClick={() => setOpen(true)}
          >
            <Menu className="h-5 w-5" aria-hidden="true" />
          </button>
        </div>
      </Container>

      {open ? (
        <div className="lg:hidden">
          <div
            className="fixed inset-0 z-50 bg-black/25"
            onClick={() => setOpen(false)}
            aria-hidden="true"
          />
          <div className="fixed right-3 top-3 z-50 w-[min(92vw,420px)] overflow-hidden rounded-2xl bg-white shadow-xl ring-1 ring-[var(--border)]">
            <div className="flex items-center justify-between border-b border-[var(--border)] px-4 py-3">
              <div className="text-sm font-semibold">Menu</div>
              <button
                className="inline-flex h-9 w-9 items-center justify-center rounded-full hover:bg-zinc-100"
                aria-label="Close menu"
                onClick={() => setOpen(false)}
              >
                <X className="h-5 w-5" aria-hidden="true" />
              </button>
            </div>
            <div className="p-2">
              {nav.map((item) => {
                const active = item.match(pathname);
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className={cn(
                      "flex items-center justify-between rounded-xl px-3 py-3 text-sm",
                      active
                        ? "bg-[var(--primary)] font-semibold text-white"
                        : "text-zinc-800 hover:bg-zinc-50",
                    )}
                    aria-current={active ? "page" : undefined}
                  >
                    {item.label}
                    <span className={active ? "text-white/80" : "text-zinc-400"}>
                      →
                    </span>
                  </Link>
                );
              })}
              <div className="mt-2 grid gap-2 rounded-xl bg-zinc-50 p-3 text-xs text-zinc-700">
                <a className="inline-flex items-center gap-2" href="tel:+255222866618">
                  <Phone className="h-4 w-4" aria-hidden="true" />
                  +255 22 286 6618
                </a>
                <a className="inline-flex items-center gap-2" href="mailto:info@pasada.or.tz">
                  <Mail className="h-4 w-4" aria-hidden="true" />
                  info@pasada.or.tz
                </a>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </header>
  );
}
