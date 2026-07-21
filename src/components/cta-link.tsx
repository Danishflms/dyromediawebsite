import Link from "next/link";
import { cn } from "@/lib/cn";
import { Magnetic } from "./magnetic";

const variants = {
  primary: "btn-liquid",
  secondary: "btn-ghost",
} as const;

/**
 * The site's button — liquid glass (primary) or quiet ghost (secondary).
 * `block` makes it full-width up to the `sm` breakpoint (mobile CTAs).
 */
export function CtaLink({
  href,
  children,
  variant = "primary",
  className,
  block = false,
}: {
  href: string;
  children: React.ReactNode;
  variant?: keyof typeof variants;
  className?: string;
  block?: boolean;
}) {
  return (
    <Magnetic className={cn(block && "w-full sm:w-auto")}>
      <Link
        href={href}
        className={cn(
          "group relative inline-flex h-12 cursor-pointer items-center justify-center gap-2 px-8",
          "font-mono text-xs tracking-[0.2em] uppercase",
          "active:scale-[0.97]",
          block && "w-full sm:w-auto",
          variants[variant],
          className,
        )}
      >
        <span className="relative z-[2]">{children}</span>
      </Link>
    </Magnetic>
  );
}
