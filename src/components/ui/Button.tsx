"use client";

import Link from "next/link";
import { motion, type HTMLMotionProps } from "framer-motion";
import { cn } from "@/lib/utils";

type Variant = "primary" | "outline" | "ghost" | "whatsapp" | "dark";
type Size = "sm" | "md" | "lg";

const variants: Record<Variant, string> = {
  primary:
    "bg-terracotta text-creme hover:bg-terracotta-dark shadow-soft",
  dark: "bg-nuit text-creme hover:bg-nuit-2 shadow-soft",
  outline:
    "border border-nuit/25 text-nuit hover:border-terracotta hover:text-terracotta bg-transparent",
  ghost: "text-nuit hover:bg-nuit/5 bg-transparent",
  whatsapp: "bg-[#25D366] text-white hover:brightness-95 shadow-soft",
};

const sizes: Record<Size, string> = {
  sm: "h-9 px-4 text-[0.8rem]",
  md: "h-11 px-6 text-[0.9rem]",
  lg: "h-13 px-8 text-[0.95rem]",
};

type CommonProps = {
  variant?: Variant;
  size?: Size;
  className?: string;
  children: React.ReactNode;
  external?: boolean;
};

type ButtonAsLink = CommonProps & {
  href: string;
  onClick?: never;
};

type ButtonAsButton = CommonProps &
  Omit<HTMLMotionProps<"button">, "children"> & {
    href?: never;
  };

type Props = ButtonAsLink | ButtonAsButton;

const cls = (variant: Variant, size: Size, className?: string) =>
  cn(
    "group relative inline-flex items-center justify-center gap-2 rounded-full font-label font-semibold uppercase tracking-[0.14em] transition-colors duration-300 will-change-transform",
    variants[variant],
    sizes[size],
    className,
  );

export function Button(props: Props) {
  const { variant = "primary", size = "md", className, children } = props;

  if ("href" in props && props.href) {
    const { href, external } = props;
    const label = (
      <span className="relative z-10 inline-flex items-center gap-2">
        {children}
      </span>
    );
    const content = (
      <motion.span
        whileHover={{ y: -2 }}
        whileTap={{ scale: 0.97 }}
        transition={{ type: "spring", stiffness: 380, damping: 24 }}
        className={cls(variant, size, className)}
      >
        {label}
      </motion.span>
    );
    if (external) {
      return (
        <a href={href} target="_blank" rel="noopener noreferrer">
          {content}
        </a>
      );
    }
    return <Link href={href}>{content}</Link>;
  }

  const { variant: _v, size: _s, ...rest } = props as ButtonAsButton;
  return (
    <motion.button
      whileHover={{ y: -2 }}
      whileTap={{ scale: 0.97 }}
      transition={{ type: "spring", stiffness: 380, damping: 24 }}
      className={cls(variant, size, className)}
      {...rest}
    >
      <span className="relative z-10 inline-flex items-center gap-2">
        {children}
      </span>
    </motion.button>
  );
}
