"use client";

import { motion, useScroll, useSpring } from "framer-motion";
import { usePrefersReducedMotion } from "@/lib/hooks";

/** Barre de progression de lecture en haut de page. */
export function ScrollProgress() {
  const reduced = usePrefersReducedMotion();
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    restDelta: 0.001,
  });

  if (reduced) return null;

  return (
    <motion.div
      aria-hidden
      style={{ scaleX }}
      className="fixed left-0 top-0 z-[60] h-[3px] w-full origin-left bg-gradient-to-r from-terracotta via-soleil to-indigo"
    />
  );
}
