"use client";

import { motion, type Variants } from "framer-motion";
import { cn } from "@/lib/utils";
import { fadeUp, viewportOnce } from "@/lib/motion";

type Props = {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  variants?: Variants;
  as?: "div" | "section" | "li" | "span";
};

/** Apparition au scroll (une fois). */
export function Reveal({
  children,
  className,
  delay = 0,
  variants = fadeUp,
  as = "div",
}: Props) {
  const Comp = motion[as];
  return (
    <Comp
      variants={variants}
      initial="hidden"
      whileInView="show"
      viewport={viewportOnce}
      transition={{ delay }}
      className={cn(className)}
    >
      {children}
    </Comp>
  );
}
