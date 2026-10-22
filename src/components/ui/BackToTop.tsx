"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useScrollY } from "@/lib/hooks";
import { ArrowUpIcon } from "@/components/ui/Icons";

/** Bouton « remonter » qui apparaît après un certain scroll. */
export function BackToTop() {
  const y = useScrollY();
  const visible = y > 700;

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          type="button"
          aria-label="Remonter en haut"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          initial={{ opacity: 0, scale: 0.6, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.6, y: 20 }}
          whileHover={{ y: -3 }}
          whileTap={{ scale: 0.9 }}
          transition={{ type: "spring", stiffness: 300, damping: 22 }}
          className="fixed bottom-6 right-6 z-50 grid h-12 w-12 place-items-center rounded-full bg-nuit text-creme shadow-soft-lg"
        >
          <ArrowUpIcon className="h-5 w-5" />
        </motion.button>
      )}
    </AnimatePresence>
  );
}
