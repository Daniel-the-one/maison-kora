"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { COLLECTIONS } from "@/content/pagnes-types";
import { pagnes } from "@/content/pagnes";
import { Motif } from "@/lib/motifs";
import { stagger, staggerItem, viewportOnce } from "@/lib/motion";
import { Eyebrow } from "@/components/ui/Section";
import { ArrowRightIcon } from "@/components/ui/Icons";

/** Bandeau des 3 collections (Femme / Homme / Enfants), cartes-vitrines. */
export function FeaturedCollections() {
  return (
    <section className="bg-creme px-5 py-20 sm:px-8 md:py-28">
      <div className="mx-auto w-full max-w-7xl">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <Eyebrow>Trois univers</Eyebrow>
            <h2 className="mt-4 max-w-xl font-display text-4xl font-medium leading-[1.05] text-nuit sm:text-5xl">
              Une couleur pour chaque <span className="italic text-terracotta">histoire</span>
            </h2>
          </div>
          <Link
            href="/collection"
            className="group inline-flex items-center gap-2 font-label text-[0.75rem] font-semibold uppercase tracking-[0.2em] text-nuit/70 transition-colors hover:text-terracotta"
          >
            Voir tout le catalogue
            <ArrowRightIcon className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        <motion.div
          variants={stagger(0.12)}
          initial="hidden"
          whileInView="show"
          viewport={viewportOnce}
          className="mt-12 grid gap-6 md:grid-cols-3"
        >
          {COLLECTIONS.map((col) => {
            const items = pagnes.filter((p) => p.collection === col.value);
            const sample = items[0];
            return (
              <motion.div key={col.value} variants={staggerItem}>
                <Link
                  href={`/collection?collection=${col.value}`}
                  className="group relative block h-[26rem] overflow-hidden rounded-3xl"
                >
                  <div className="absolute inset-0 transition-transform duration-[900ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.06]">
                    <Motif
                      kind={sample.motif}
                      palette={[col.accent, sample.palette[0], "#1A1512", "#F4ECE0"]}
                      id={`col-${col.value}`}
                      className="h-full w-full"
                    />
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-nuit/90 via-nuit/30 to-transparent" />
                  <div className="absolute inset-x-0 bottom-0 p-7">
                    <span
                      className="font-label text-[0.68rem] font-semibold uppercase tracking-[0.28em]"
                      style={{ color: col.accent }}
                    >
                      {items.length} modèles
                    </span>
                    <h3 className="mt-2 font-display text-3xl font-medium text-creme">
                      {col.label}
                    </h3>
                    <span className="mt-4 inline-flex items-center gap-2 font-label text-[0.72rem] font-semibold uppercase tracking-[0.2em] text-creme/80">
                      Explorer
                      <ArrowRightIcon className="h-4 w-4 transition-transform group-hover:translate-x-1.5" />
                    </span>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
