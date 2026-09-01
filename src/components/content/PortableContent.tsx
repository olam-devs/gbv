import { PortableText, type PortableTextBlock } from "@portabletext/react";
import Link from "next/link";

const components = {
  block: {
    h2: ({ children }: { children?: React.ReactNode }) => (
      <h2 className="mt-10 text-2xl font-semibold tracking-tight text-black first:mt-0">
        {children}
      </h2>
    ),
    h3: ({ children }: { children?: React.ReactNode }) => (
      <h3 className="mt-8 text-xl font-semibold text-black">{children}</h3>
    ),
    h4: ({ children }: { children?: React.ReactNode }) => (
      <h4 className="mt-6 text-lg font-semibold text-black">{children}</h4>
    ),
    blockquote: ({ children }: { children?: React.ReactNode }) => (
      <blockquote className="my-6 border-l-4 border-[var(--primary)] bg-red-50 py-3 pl-4 pr-2 text-zinc-800 italic">
        {children}
      </blockquote>
    ),
    normal: ({ children }: { children?: React.ReactNode }) => (
      <p className="mt-4 text-base leading-8 text-zinc-800">{children}</p>
    ),
  },
  list: {
    bullet: ({ children }: { children?: React.ReactNode }) => (
      <ul className="mt-4 list-disc space-y-2 pl-6 text-zinc-800">{children}</ul>
    ),
    number: ({ children }: { children?: React.ReactNode }) => (
      <ol className="mt-4 list-decimal space-y-2 pl-6 text-zinc-800">{children}</ol>
    ),
  },
  marks: {
    strong: ({ children }: { children?: React.ReactNode }) => (
      <strong className="font-bold text-black">{children}</strong>
    ),
    em: ({ children }: { children?: React.ReactNode }) => (
      <em className="italic">{children}</em>
    ),
    underline: ({ children }: { children?: React.ReactNode }) => (
      <span className="underline">{children}</span>
    ),
    code: ({ children }: { children?: React.ReactNode }) => (
      <code className="rounded bg-zinc-100 px-1.5 py-0.5 text-sm">{children}</code>
    ),
    link: ({
      value,
      children,
    }: {
      value?: { href?: string; openInNewTab?: boolean };
      children?: React.ReactNode;
    }) => {
      const href = value?.href ?? "#";
      const external = href.startsWith("http");
      if (external) {
        return (
          <a
            href={href}
            className="font-medium text-[var(--brand-blue)] underline"
            target={value?.openInNewTab ? "_blank" : undefined}
            rel={value?.openInNewTab ? "noopener noreferrer" : undefined}
          >
            {children}
          </a>
        );
      }
      return (
        <Link href={href} className="font-medium text-[var(--brand-blue)] underline">
          {children}
        </Link>
      );
    },
  },
};

export function PortableContent({ value }: { value?: PortableTextBlock[] }) {
  if (!value?.length) return null;
  return (
    <div className="article-content max-w-none">
      <PortableText value={value} components={components} />
    </div>
  );
}
