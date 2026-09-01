import Link from "next/link";
import { cn } from "@/lib/cn";

type Common = {
  className?: string;
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "ghost";
  size?: "sm" | "md" | "lg";
};

function styles(variant: Common["variant"], size: Common["size"]) {
  const base =
    "inline-flex items-center justify-center gap-2 rounded-full font-medium transition-colors focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50";

  const v =
    variant === "secondary"
      ? "bg-white text-zinc-950 ring-1 ring-[var(--border)] hover:bg-zinc-50"
      : variant === "ghost"
        ? "bg-transparent text-zinc-950 hover:bg-zinc-100"
        : "bg-[var(--primary)] text-white hover:bg-[var(--primary-2)]";

  const s =
    size === "sm"
      ? "h-10 px-4 text-sm"
      : size === "lg"
        ? "h-12 px-6 text-base"
        : "h-11 px-5 text-sm";

  return cn(base, v, s);
}

export function Button({
  className,
  children,
  variant = "primary",
  size = "md",
  ...props
}: Common & React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button className={cn(styles(variant, size), className)} {...props}>
      {children}
    </button>
  );
}

export function ButtonLink({
  className,
  children,
  variant = "primary",
  size = "md",
  href,
  ...props
}: Common & { href: string } & React.ComponentProps<typeof Link>) {
  return (
    <Link
      href={href}
      className={cn(styles(variant, size), className)}
      {...props}
    >
      {children}
    </Link>
  );
}

