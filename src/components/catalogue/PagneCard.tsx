"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { useState } from "react";
import type { Pagne } from "@/content/pagnes-types";
import { couleurHex } from "@/content/pagnes-types";
import { cn, formatFCFA } from "@/lib/utils";
import { Motif } from "@/lib/motifs";
import { staggerItem } from "@/lib/motion";
import { HeartIcon, ArrowUpRightIcon } from "@/components/ui/Icons";

const qualiteStyles: Record<string, string> = {
  Premium: "bg-dore text-nuit",
  Standard: "bg-nuit/75 text-creme",
  Économique: "bg-vert text-creme",
};

export function PagneCard({
  pagne,
  priority,
}: {
  pagne: Pagne;
  priority?: boolean;
}) {
  const [fav, setFav] = useState(false);

  return (
    <motion.article
      layout
      variants={staggerItem}
      className="group relative"
    >
      <Link
        href={`/collection/${pagne.slug}`}
        className="block focus-visible:outline-none"
      >
        <div className="relative aspect-[4/5] overflow-hidden rounded-2xl bg-creme-2 shadow-soft">
          <motion.div
            className="absolute inset-0"
            whileHover={{ scale: 1.08 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          >
            <Motif
              kind={pagne.motif}
              palette={pagne.palette}
              id={`card-${pagne.slug}`}
              className="h-full w-full"
            />
          </motion.div>

          {/* Badge qualité */}
          <span
            className={cn(
              "absolute left-3 top-3 rounded-full px-3 py-1 font-label text-[0.62rem] font-semibold uppercase tracking-[0.16em]",
              qualiteStyles[pagne.qualite],
            )}
          >
            {pagne.qualite}
          </span>

          {/* Favori */}
          <button
            type="button"
            onClick={(e) => {
              e.preventDefault();
              setFav((v) => !v);
            }}
            aria-label={fav ? "Retirer des favoris" : "Ajouter aux favoris"}
            aria-pressed={fav}
            className={cn(
              "absolute right-3 top-3 grid h-9 w-9 place-items-center rounded-full backdrop-blur transition-colors",
              fav
                ? "bg-terracotta text-creme"
                : "bg-creme/80 text-nuit hover:bg-creme",
            )}
          >
            <motion.span
              key={fav ? "on" : "off"}
              initial={{ scale: 0.6 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 500, damping: 18 }}
            >
              <HeartIcon filled={fav} className="h-4.5 w-4.5" />
            </motion.span>
          </button>

          {/* Survol : aperçu couleurs + CTA */}
          <div className="pointer-events-none absolute inset-x-0 bottom-0 translate-y-3 bg-gradient-to-t from-nuit/85 to-transparent p-4 opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
            <div className="flex items-center justify-between">
              <div className="flex gap-1.5">
                {pagne.couleurs.map((c) => (
                  <span
                    key={c}
                    className="h-4 w-4 rounded-full ring-2 ring-creme/70"
                    style={{ background: couleurHex(c) }}
                    title={c}
                  />
                ))}
              </div>
              <span className="inline-flex items-center gap-1 font-label text-[0.62rem] font-semibold uppercase tracking-[0.16em] text-creme">
                Voir
                <ArrowUpRightIcon className="h-3.5 w-3.5" />
              </span>
            </div>
          </div>
        </div>

        <div className="mt-4">
          <p className="font-label text-[0.62rem] font-semibold uppercase tracking-[0.2em] text-nuit/45">
            {pagne.type}
          </p>
          <h3 className="mt-1 font-display text-xl font-semibold text-nuit">
            {pagne.nom}
          </h3>
          <p className="mt-1.5 text-sm font-medium text-terracotta">
            {formatFCFA(pagne.prix)}
          </p>
        </div>
      </Link>
    </motion.article>
  );
}
