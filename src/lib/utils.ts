import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/** Fusionne des classes Tailwind proprement. */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/** 1250000 -> "1 250 000" */
export function formatNumber(n: number) {
  return new Intl.NumberFormat("fr-FR").format(n);
}

/** 24500 -> "24 500 FCFA" */
export function formatFCFA(n: number) {
  return `${formatNumber(n)} FCFA`;
}

/** Slug simple et sûr (sans accents). */
export function slugify(input: string) {
  return input
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}
