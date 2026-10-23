"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { pagnes } from "@/content/pagnes";
import { PagneCard } from "@/components/catalogue/PagneCard";
import { stagger, viewportOnce } from "@/lib/motion";
import { Eyebrow } from "@/components/ui/Section";
import { ArrowRightIcon } from "@/components/ui/Icons";

/** Sélection mise en avant sur l'accueil (premium d'abord). */
export function FeaturedPagnes() {
  const selection = [...pagnes]
    .sort((a, b) => b.prix - a.prix)
    .slice(0, 6);

  return (
    <section className="bg-creme px-5 py-20 sm:px-8 md:py-28">
      <div className="mx-auto w-full max-w-7xl">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <Eyebrow accent="#C4562F">Sélection du moment</Eyebrow>
            <h2 className="mt-4 max-w-xl font-display text-4xl font-medium leading-[1.05] text-nuit sm:text-5xl">
              Les pièces <span className="italic text-terracotta">les plus recherchées</span>
            </h2>
          </div>
          <Link
            href="/collection"
            className="group inline-flex items-center gap-2 font-label text-[0.75rem] font-semibold uppercase tracking-[0.2em] text-nuit/70 transition-colors hover:text-terracotta"
          >
            Tout le catalogue
            <ArrowRightIcon className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        <motion.div
          variants={stagger(0.08)}
          initial="hidden"
          whileInView="show"
          viewport={viewportOnce}
          className="mt-12 grid gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3"
        >
          {selection.map((p, i) => (
            <PagneCard key={p.slug} pagne={p} priority={i < 3} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
