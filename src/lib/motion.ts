import type { Transition, Variants } from "framer-motion";

/** Easings cohérents sur tout le site. */
export const ease = {
  out: [0.16, 1, 0.3, 1] as const,
  inOut: [0.83, 0, 0.17, 1] as const,
  soft: [0.22, 1, 0.36, 1] as const,
};

export const spring: Transition = {
  type: "spring",
  stiffness: 220,
  damping: 26,
  mass: 0.8,
};

/** Apparition depuis le bas (défaut des sections). */
export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 28 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: ease.out },
  },
};

/** Conteneur qui décale ses enfants (stagger). */
export const stagger = (delay = 0.08): Variants => ({
  hidden: {},
  show: {
    transition: { staggerChildren: delay, delayChildren: 0.05 },
  },
});

/** Enfant de stagger. */
export const staggerItem: Variants = {
  hidden: { opacity: 0, y: 22 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: ease.out } },
};

/** Zoom léger à l'apparition (images / cartes). */
export const zoomIn: Variants = {
  hidden: { opacity: 0, scale: 0.94 },
  show: { opacity: 1, scale: 1, transition: { duration: 0.7, ease: ease.out } },
};

/** Balayage d'un masque (révélation de ligne). */
export const lineReveal: Variants = {
  hidden: { y: "110%" },
  show: { y: "0%", transition: { duration: 0.85, ease: ease.out } },
};

/** Vue par défaut au scroll : une fois, marge généreuse. */
export const viewportOnce = { once: true, margin: "-80px" } as const;

/** Transition entre pages. */
export const pageTransition: Variants = {
  hidden: { opacity: 0, y: 12 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: ease.out } },
  exit: { opacity: 0, y: -8, transition: { duration: 0.3, ease: ease.inOut } },
};
