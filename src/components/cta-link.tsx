import Link from "next/link";
import { cn } from "@/lib/cn";
import { Magnetic } from "./magnetic";

const variants = {
  primary: "btn-liquid",
  secondary: "btn-ghost",
} as const;

const sizes = {
  // Default.
  md: "h-12 gap-2 px-8 text-xs",
  // Larger, but only from `lg` up — phones keep the md footprint so the
  // mobile hero stays exactly one viewport tall.
  lg: "h-12 gap-2 px-8 text-xs lg:h-14 lg:gap-2.5 lg:px-10 lg:text-sm",
} as const;

/**
 * The site's button — liquid glass (primary) or quiet ghost (secondary).
 * `block` makes it full-width up to the `sm` breakpoint (mobile CTAs).
 */
export function CtaLink({
  href,
  children,
  variant = "primary",
  size = "md",
  className,
  block = false,
}: {
  href: string;
  children: React.ReactNode;
  variant?: keyof typeof variants;
  size?: keyof typeof sizes;
  className?: string;
  block?: boolean;
}) {
  return (
    <Magnetic className={cn(block && "w-full sm:w-auto")}>
      <Link
        href={href}
        className={cn(
          "group relative inline-flex cursor-pointer items-center justify-center",
          "font-mono tracking-[0.2em] uppercase",
          "active:scale-[0.97]",
          sizes[size],
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
