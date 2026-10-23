"use client";

import { useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import { pagnes } from "@/content/pagnes";
import {
  TYPES,
  QUALITES,
  COLLECTIONS,
  COULEURS,
  qualiteOrder,
} from "@/content/pagnes-types";
import { PagneCard } from "@/components/catalogue/PagneCard";
import { Section, Eyebrow } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { stagger, viewportOnce } from "@/lib/motion";
import { cn } from "@/lib/utils";
import { SearchIcon, CloseIcon } from "@/components/ui/Icons";

type Tri = "populaire" | "prix-asc" | "prix-desc" | "qualite";

export function Catalogue() {
  const params = useSearchParams();
  const initCol = params.get("collection") as any;

  const [search, setSearch] = useState("");
  const [collections, setCollections] = useState<string[]>(
    initCol ? [initCol] : [],
  );
  const [types, setTypes] = useState<string[]>([]);
  const [couleurs, setCouleurs] = useState<string[]>([]);
  const [qualites, setQualites] = useState<string[]>([]);
  const [tri, setTri] = useState<Tri>("populaire");

  const toggle = (v: string, arr: string[], set: (a: string[]) => void) => {
    set(arr.includes(v) ? arr.filter((x) => x !== v) : [...arr, v]);
  };

  const reset = () => {
    setSearch("");
    setCollections([]);
    setTypes([]);
    setCouleurs([]);
    setQualites([]);
    setTri("populaire");
  };

  const filtres = useMemo(() => {
    const q = search.toLowerCase().trim();
    let res = pagnes.filter((p) => {
      if (q && !`${p.nom} ${p.type} ${p.description}`.toLowerCase().includes(q))
        return false;
      if (collections.length && !collections.includes(p.collection)) return false;
      if (types.length && !types.includes(p.type)) return false;
      if (qualites.length && !qualites.includes(p.qualite)) return false;
      if (couleurs.length && !couleurs.some((c) => p.couleurs.includes(c as any)))
        return false;
      return true;
    });
    if (tri === "prix-asc") res = [...res].sort((a, b) => a.prix - b.prix);
    if (tri === "prix-desc") res = [...res].sort((a, b) => b.prix - a.prix);
    if (tri === "qualite")
      res = [...res].sort(
        (a, b) => qualiteOrder[a.qualite] - qualiteOrder[b.qualite],
      );
    return res;
  }, [search, collections, types, couleurs, qualites, tri]);

  const actifs =
    collections.length + types.length + couleurs.length + qualites.length;

  return (
    <Section tone="creme" className="pt-32">
      <div className="mx-auto w-full max-w-7xl">
        <div className="flex flex-wrap items-end justify-between gap-8">
          <div>
            <Eyebrow accent="#C4562F">Catalogue</Eyebrow>
            <h1 className="mt-4 font-display text-5xl font-medium leading-[1.02] text-nuit sm:text-6xl lg:text-7xl">
              Tous nos <span className="italic text-terracotta">pagnes</span>
            </h1>
            <p className="mt-4 max-w-xl text-lg text-nuit/65">
              {pagnes.length} étoffes, choisis pièce par pièce. Filtrez par
              univers, famille, couleur ou qualité.
            </p>
          </div>
          <div className="relative w-full max-w-md">
            <SearchIcon className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-nuit/40" />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Rechercher un pagne, un type..."
              className="h-12 w-full rounded-full border border-nuit/15 bg-creme-2/40 pl-11 pr-4 text-sm text-nuit outline-none transition-colors focus:border-terracotta"
            />
          </div>
        </div>

        <div className="mt-12 grid gap-10 lg:grid-cols-[280px_1fr]">
          {/* Filtres */}
          <aside className="lg:sticky lg:top-28 lg:self-start">
            <div className="rounded-3xl border border-nuit/10 bg-creme-2/30 p-6">
              <div className="flex items-center justify-between">
                <span className="font-label text-[0.7rem] font-semibold uppercase tracking-[0.24em] text-nuit">
                  Filtres
                </span>
                {actifs > 0 && (
                  <button
                    onClick={reset}
                    className="text-xs text-nuit/55 underline-offset-4 hover:text-terracotta hover:underline"
                  >
                    Tout effacer ({actifs})
                  </button>
                )}
              </div>

              <div className="mt-6 space-y-6">
                <div>
                  <p className="text-sm font-semibold text-nuit">Univers</p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {COLLECTIONS.map((c) => {
                      const on = collections.includes(c.value);
                      return (
                        <button
                          key={c.value}
                          onClick={() => toggle(c.value, collections, setCollections)}
                          className={cn(
                            "rounded-full px-3 py-1.5 text-sm transition-colors",
                            on
                              ? "bg-nuit text-creme"
                              : "border border-nuit/15 text-nuit/70 hover:border-nuit/40",
                          )}
                          style={on ? undefined : { color: undefined }}
                        >
                          {c.label}
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div>
                  <p className="text-sm font-semibold text-nuit">Famille</p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {TYPES.map((t) => {
                      const on = types.includes(t);
                      return (
                        <button
                          key={t}
                          onClick={() => toggle(t, types, setTypes)}
                          className={cn(
                            "rounded-full px-3 py-1.5 text-sm transition-colors",
                            on
                              ? "bg-nuit text-creme"
                              : "border border-nuit/15 text-nuit/70 hover:border-nuit/40",
                          )}
                        >
                          {t}
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div>
                  <p className="text-sm font-semibold text-nuit">Couleur</p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {COULEURS.map((c) => {
                      const on = couleurs.includes(c.value);
                      return (
                        <button
                          key={c.value}
                          onClick={() => toggle(c.value, couleurs, setCouleurs)}
                          aria-label={c.label}
                          title={c.label}
                          className={cn(
                            "h-8 w-8 rounded-full ring-2 ring-offset-2 ring-offset-creme-2/30 transition-all",
                            on ? "ring-nuit" : "ring-transparent",
                          )}
                          style={{ background: c.hex }}
                        />
                      );
                    })}
                  </div>
                </div>

                <div>
                  <p className="text-sm font-semibold text-nuit">Qualité</p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {QUALITES.map((q) => {
                      const on = qualites.includes(q);
                      return (
                        <button
                          key={q}
                          onClick={() => toggle(q, qualites, setQualites)}
                          className={cn(
                            "rounded-full px-3 py-1.5 text-sm transition-colors",
                            on
                              ? "bg-nuit text-creme"
                              : "border border-nuit/15 text-nuit/70 hover:border-nuit/40",
                          )}
                        >
                          {q}
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          </aside>

          {/* Grille */}
          <div>
            <div className="flex flex-wrap items-center justify-between gap-4">
              <p className="text-sm text-nuit/60">
                <span className="font-medium text-nuit">{filtres.length}</span>{" "}
                résultat{filtres.length > 1 ? "s" : ""}
              </p>
              <select
                value={tri}
                onChange={(e) => setTri(e.target.value as Tri)}
                className="h-10 rounded-full border border-nuit/15 bg-transparent px-4 text-sm text-nuit outline-none"
              >
                <option value="populaire">Trier par : populaire</option>
                <option value="qualite">Qualité</option>
                <option value="prix-asc">Prix croissant</option>
                <option value="prix-desc">Prix décroissant</option>
              </select>
            </div>

            {filtres.length === 0 ? (
              <div className="mt-16 text-center">
                <p className="font-display text-2xl text-nuit">
                  Aucun pagne ne correspond à ces filtres
                </p>
                <button
                  onClick={reset}
                  className="mt-4 font-label text-[0.72rem] font-semibold uppercase tracking-[0.2em] text-terracotta"
                >
                  Réinitialiser les filtres
                </button>
              </div>
            ) : (
              <motion.div
                layout
                variants={stagger(0.06)}
                initial="hidden"
                whileInView="show"
                viewport={viewportOnce}
                className="mt-10 grid gap-x-6 gap-y-10 sm:grid-cols-2 xl:grid-cols-3"
              >
                {filtres.map((p) => (
                  <PagneCard key={p.slug} pagne={p} />
                ))}
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </Section>
  );
}
