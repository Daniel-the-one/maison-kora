"use client";

import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { pageTransition } from "@/lib/motion";
import { usePrefersReducedMotion } from "@/lib/hooks";

/** Transition d'entrée/sortie entre les pages. */
export function PageTransition({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const reduced = usePrefersReducedMotion();

  if (reduced) return <>{children}</>;

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={pathname}
        variants={pageTransition}
        initial="hidden"
        animate="show"
        exit="exit"
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}
