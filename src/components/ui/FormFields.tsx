import { cn } from "@/lib/cn";

const fieldBase =
  "w-full rounded-xl border-2 border-black bg-white px-3 text-base font-medium text-black placeholder:text-zinc-500 shadow-sm transition focus:border-black focus:outline-none focus:ring-2 focus:ring-black/20";

export function FormLabel({ children }: { children: React.ReactNode }) {
  return (
    <span className="text-sm font-semibold text-black">{children}</span>
  );
}

export function FormInput({
  className,
  ...props
}: React.InputHTMLAttributes<HTMLInputElement>) {
  return <input className={cn(fieldBase, "h-11", className)} {...props} />;
}

export function FormTextarea({
  className,
  ...props
}: React.TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return (
    <textarea
      className={cn(fieldBase, "min-h-[120px] resize-y py-2.5", className)}
      {...props}
    />
  );
}

export function FormSelect({
  className,
  children,
  ...props
}: React.SelectHTMLAttributes<HTMLSelectElement>) {
  return (
    <select className={cn(fieldBase, "h-11", className)} {...props}>
      {children}
    </select>
  );
}

export function FormSubmit({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <button
      type="submit"
      className={cn(
        "h-11 rounded-full bg-[var(--primary)] px-6 text-sm font-semibold text-white transition hover:bg-[var(--primary-2)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black/30",
        className,
      )}
    >
      {children}
    </button>
  );
}
