"use client";

import Link from "next/link";
import { useState } from "react";
import { motion } from "framer-motion";
import type { Pagne } from "@/content/pagnes-types";
import { couleurHex } from "@/content/pagnes-types";
import { formatFCFA, cn } from "@/lib/utils";
import { Motif } from "@/lib/motifs";
import { site } from "@/config/site";
import { Section } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { PagneCard } from "@/components/catalogue/PagneCard";
import {
  ArrowLeftIcon,
  ArrowRightIcon,
  WhatsappIcon,
  RulerIcon,
  DropIcon,
  ScissorsIcon,
} from "@/components/ui/Icons";
import { stagger, staggerItem, viewportOnce } from "@/lib/motion";

const qualiteStyles: Record<string, string> = {
  Premium: "bg-dore text-nuit",
  Standard: "bg-nuit text-creme",
  Économique: "bg-vert text-creme",
};

export function Detail({
  pagne,
  similaires,
}: {
  pagne: Pagne;
  similaires: Pagne[];
}) {
  const [active, setActive] = useState(0);

  return (
    <>
      <Section tone="creme" className="pt-32">
        <div className="mx-auto w-full max-w-7xl">
          <Link
            href="/collection"
            className="group inline-flex items-center gap-2 font-label text-[0.72rem] font-semibold uppercase tracking-[0.2em] text-nuit/60 transition-colors hover:text-terracotta"
          >
            <ArrowLeftIcon className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
            Retour au catalogue
          </Link>

          <div className="mt-10 grid gap-12 lg:grid-cols-[1.05fr_1fr] lg:items-start">
            {/* Visuel */}
            <Reveal>
              <div className="relative aspect-[4/5] overflow-hidden rounded-3xl shadow-soft-lg">
                <motion.div
                  key={active}
                  initial={{ scale: 1.04, opacity: 0.9 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                  className="absolute inset-0"
                >
                  <Motif
                    kind={pagne.motif}
                    palette={pagne.palette}
                    id={`detail-${pagne.slug}-${active}`}
                    className="h-full w-full"
                  />
                </motion.div>
                <span
                  className={cn(
                    "absolute left-5 top-5 rounded-full px-4 py-1.5 font-label text-[0.64rem] font-semibold uppercase tracking-[0.18em]",
                    qualiteStyles[pagne.qualite],
                  )}
                >
                  {pagne.qualite}
                </span>
              </div>

              {/* Variantes */}
              {pagne.variantes.length > 1 && (
                <div className="mt-5 flex flex-wrap items-center gap-3">
                  <span className="font-label text-[0.66rem] font-semibold uppercase tracking-[0.2em] text-nuit/45">
                    Variantes
                  </span>
                  {pagne.variantes.map((v, i) => (
                    <button
                      key={v.nom}
                      onClick={() => setActive(i)}
                      className={cn(
                        "flex items-center gap-2 rounded-full border px-3 py-1.5 text-sm transition-colors",
                        active === i
                          ? "border-nuit bg-nuit text-creme"
                          : "border-nuit/15 text-nuit/70 hover:border-nuit/40",
                      )}
                    >
                      <span
                        className="h-4 w-4 rounded-full"
                        style={{ background: v.hex }}
                      />
                      {v.nom}
                    </button>
                  ))}
                </div>
              )}
            </Reveal>

            {/* Infos */}
            <div>
              <Reveal>
                <div className="flex flex-wrap items-center gap-3">
                  <span className="rounded-full border border-nuit/15 px-3 py-1 font-label text-[0.64rem] font-semibold uppercase tracking-[0.18em] text-nuit/60">
                    {pagne.type}
                  </span>
                  <span className="rounded-full border border-nuit/15 px-3 py-1 font-label text-[0.64rem] font-semibold uppercase tracking-[0.18em] text-nuit/60">
                    {pagne.collection}
                  </span>
                </div>
                <h1 className="mt-5 font-display text-4xl font-medium leading-[1.02] text-nuit sm:text-5xl lg:text-6xl">
                  {pagne.nom}
                </h1>
                <p className="mt-4 font-display text-2xl text-terracotta">
                  {formatFCFA(pagne.prix)}
                </p>
                <p className="mt-6 text-pretty leading-relaxed text-nuit/72">
                  {pagne.description}
                </p>

                <div className="mt-9 flex flex-wrap gap-3">
                  <Button
                    href={site.whatsappLink(
                      `Bonjour Maison Kôra, je souhaite commander le pagne "${pagne.nom}" (${pagne.type}, ${pagne.dimensions}). Merci de me conseiller pour la coupe et le sur-mesure.`,
                    )}
                    external
                    size="lg"
                    variant="whatsapp"
                  >
                    <WhatsappIcon className="h-5 w-5" />
                    Commander via WhatsApp
                  </Button>
                  <Button href="/collection" size="lg" variant="outline">
                    Continuer mes achats
                  </Button>
                </div>
              </Reveal>

              <Reveal delay={0.1}>
                <div className="mt-12 grid gap-6 sm:grid-cols-3">
                  {[
                    { icon: RulerIcon, label: "Dimensions", value: pagne.dimensions },
                    { icon: DropIcon, label: "Composition", value: pagne.composition },
                    { icon: ScissorsIcon, label: "Entretien", value: pagne.entretien },
                  ].map((x) => {
                    const Icon = x.icon;
                    return (
                      <div
                        key={x.label}
                        className="rounded-2xl border border-nuit/10 p-5"
                      >
                        <Icon className="h-6 w-6 text-terracotta" />
                        <p className="mt-3 font-label text-[0.64rem] font-semibold uppercase tracking-[0.18em] text-nuit/45">
                          {x.label}
                        </p>
                        <p className="mt-1.5 text-sm text-nuit/75">{x.value}</p>
                      </div>
                    );
                  })}
                </div>
              </Reveal>

              <Reveal delay={0.16}>
                <div className="mt-12 rounded-3xl bg-creme-2/40 p-7">
                  <p className="font-label text-[0.68rem] font-semibold uppercase tracking-[0.24em] text-nuit/55">
                    L'histoire du motif
                  </p>
                  <p className="mt-4 text-pretty leading-relaxed text-nuit/75">
                    {pagne.histoire}
                  </p>
                  <div className="mt-6 flex flex-wrap gap-2">
                    {pagne.couleurs.map((c) => (
                      <span
                        key={c}
                        className="inline-flex items-center gap-2 rounded-full border border-nuit/15 px-3 py-1 text-sm text-nuit/70"
                      >
                        <span
                          className="h-4 w-4 rounded-full"
                          style={{ background: couleurHex(c) }}
                        />
                        {c}
                      </span>
                    ))}
                  </div>
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </Section>

      {similaires.length > 0 && (
        <Section tone="creme">
          <div className="mx-auto w-full max-w-7xl">
            <div className="flex flex-wrap items-end justify-between gap-6">
              <div>
                <span className="font-label text-[0.68rem] font-semibold uppercase tracking-[0.24em] text-nuit/55">
                  Dans le même univers
                </span>
                <h2 className="mt-4 font-display text-4xl font-medium text-nuit sm:text-5xl">
                  Vous aimerez aussi
                </h2>
              </div>
              <Link
                href={`/collection?collection=${pagne.collection}`}
                className="group inline-flex items-center gap-2 font-label text-[0.72rem] font-semibold uppercase tracking-[0.2em] text-nuit/70 transition-colors hover:text-terracotta"
              >
                Voir toute la collection
                <ArrowRightIcon className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
            <motion.div
              variants={stagger(0.08)}
              initial="hidden"
              whileInView="show"
              viewport={viewportOnce}
              className="mt-10 grid gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3"
            >
              {similaires.map((p) => (
                <PagneCard key={p.slug} pagne={p} />
              ))}
            </motion.div>
          </div>
        </Section>
      )}
    </>
  );
}
