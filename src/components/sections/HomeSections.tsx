"use client";

import Link from "next/link";
import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { pagnes } from "@/content/pagnes";
import { TYPES } from "@/content/pagnes-types";
import { site } from "@/config/site";
import { Reveal } from "@/components/ui/Reveal";
import { Eyebrow } from "@/components/ui/Section";
import { CountUp } from "@/components/ui/CountUp";
import { Button } from "@/components/ui/Button";
import { Motif } from "@/lib/motifs";
import {
  LeafIcon,
  ScissorsIcon,
  RulerIcon,
  DropIcon,
  SparkIcon,
} from "@/components/ui/Icons";

/** Bandeau défilant des familles de pagnes (marquee infini). */
export function TypeMarquee() {
  const list = [...TYPES, ...TYPES];
  return (
    <div className="relative overflow-hidden border-y border-nuit/10 bg-nuit py-6">
      <div className="flex w-max animate-[marquee_38s_linear_infinite] items-center gap-12">
        {list.map((t, i) => (
          <span key={i} className="flex items-center gap-12">
            <span className="font-display text-2xl italic text-creme/85 sm:text-3xl">
              {t}
            </span>
            <SparkIcon className="h-4 w-4 shrink-0 text-terracotta" />
          </span>
        ))}
      </div>
    </div>
  );
}

/** Trois arguments : matières, savoir-faire, sur-mesure. */
export function Pillars() {
  const items = [
    {
      icon: LeafIcon,
      titre: "Étoffes choisies",
      texte:
        "Wax hollandais, super wax, bogolan, kente et tissés traditionnels sélectionnés pièce par pièce.",
      accent: "#1F5D4C",
    },
    {
      icon: RulerIcon,
      titre: "Mesures justes",
      texte:
        "Chaque pagne est vendu en 6 yards, prêt à tailler, avec conseils de coupe selon votre morphologie.",
      accent: "#C4562F",
    },
    {
      icon: ScissorsIcon,
      titre: "Atelier partenaire",
      texte:
        "Notre atelier de couture partenaire transforme votre pagne en tenue sur mesure, livrée chez vous.",
      accent: "#2C3E7B",
    },
  ];
  return (
    <section className="bg-creme-2 px-5 py-20 sm:px-8 md:py-28">
      <div className="mx-auto w-full max-w-7xl">
        <Eyebrow>La maison</Eyebrow>
        <h2 className="mt-4 max-w-2xl font-display text-4xl font-medium leading-[1.05] text-nuit sm:text-5xl">
          Du tissu au vêtement, <span className="italic">un savoir-faire</span> complet
        </h2>
        <div className="mt-14 grid gap-10 md:grid-cols-3">
          {items.map((it, i) => {
            const Icon = it.icon;
            return (
              <Reveal key={it.titre} delay={i * 0.1}>
                <div
                  className="flex h-14 w-14 items-center justify-center rounded-2xl text-creme"
                  style={{ background: it.accent }}
                >
                  <Icon className="h-7 w-7" />
                </div>
                <h3 className="mt-6 font-display text-2xl font-semibold text-nuit">
                  {it.titre}
                </h3>
                <p className="mt-3 leading-relaxed text-nuit/65">{it.texte}</p>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/** Bandeau de chiffres animés. */
export function Stats() {
  const total = pagnes.length;
  const stats = [
    { to: total, suffix: "", label: "modèles au catalogue" },
    { to: 8, suffix: "", label: "familles de tissus" },
    { to: 24, suffix: "h", label: "réponse WhatsApp" },
    { to: 100, suffix: "%", label: "coton naturel" },
  ];
  return (
    <section className="bg-nuit px-5 py-16 sm:px-8">
      <div className="mx-auto grid w-full max-w-7xl grid-cols-2 gap-8 md:grid-cols-4">
        {stats.map((s, i) => (
          <Reveal key={s.label} delay={i * 0.08} className="text-center">
            <div className="font-display text-5xl font-medium text-creme sm:text-6xl">
              <CountUp to={s.to} suffix={s.suffix} />
            </div>
            <p className="mt-3 font-label text-[0.68rem] font-semibold uppercase tracking-[0.22em] text-creme/55">
              {s.label}
            </p>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

/** Section histoire avec parallaxe légère sur le motif. */
export function Story() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], ["-8%", "8%"]);

  return (
    <section ref={ref} className="bg-creme px-5 py-20 sm:px-8 md:py-28">
      <div className="mx-auto grid w-full max-w-7xl items-center gap-14 lg:grid-cols-2">
        <div className="relative order-2 aspect-[4/5] overflow-hidden rounded-3xl lg:order-1">
          <motion.div style={{ y }} className="absolute -inset-y-[8%] inset-x-0">
            <Motif
              kind="fleurs"
              palette={["#C4562F", "#E8B23A", "#1A1512", "#F4ECE0"]}
              id="story-motif"
              className="h-full w-full"
            />
          </motion.div>
          <div className="absolute inset-0 bg-gradient-to-t from-nuit/50 to-transparent" />
          <div className="absolute bottom-6 left-6 right-6 rounded-2xl bg-creme/95 p-5 backdrop-blur">
            <div className="flex items-center gap-4">
              <DropIcon className="h-8 w-8 text-terracotta" />
              <div>
                <p className="font-display text-lg font-semibold text-nuit">
                  « Le pagne est une langue »
                </p>
                <p className="text-sm text-nuit/60">
                  Proverbe ouest-africain
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="order-1 lg:order-2">
          <Eyebrow accent="#C4562F">Notre histoire</Eyebrow>
          <h2 className="mt-4 font-display text-4xl font-medium leading-[1.05] text-nuit sm:text-5xl">
            Des motifs qui parlent, <span className="italic">des étoffes qui durent</span>
          </h2>
          <div className="mt-6 space-y-5 leading-relaxed text-nuit/70">
            <p>
              Maison Kôra est née d'une conviction simple : un pagne n'est pas qu'un
              tissu. Il porte une intention, une fête, une mémoire. Chaque motif
              raconte quelque chose — un vœu, un proverbe, un héritage.
            </p>
            <p>
              Nous parcourons les marchés et les ateliers d'Afrique de l'Ouest pour
              réunir les plus belles étoffes : wax hollandais aux couleurs tenaces,
              bogolan teinté à la boue, kente tissé main, faso dan fani burkinabè.
              Puis nous vous accompagnons, du choix du pagne à la coupe finale.
            </p>
          </div>
          <div className="mt-9 grid grid-cols-3 gap-6 border-t border-nuit/10 pt-8">
            {[
              { k: "Sélection", v: "à la main" },
              { k: "Origines", v: "Afrique de l'Ouest" },
              { k: "Sur-mesure", v: "en atelier" },
            ].map((x) => (
              <div key={x.k}>
                <p className="font-label text-[0.62rem] font-semibold uppercase tracking-[0.2em] text-nuit/45">
                  {x.k}
                </p>
                <p className="mt-1.5 font-display text-lg text-nuit">{x.v}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/** Bandeau appel à l'action (WhatsApp + collection). */
export function CTABand() {
  return (
    <section className="relative overflow-hidden bg-nuit px-5 py-24 sm:px-8 md:py-32">
      <div className="pointer-events-none absolute -right-24 -top-24 h-96 w-96 opacity-25">
        <Motif
          kind="cercles"
          palette={["#C4562F", "#E8B23A", "#1A1512", "#F4ECE0"]}
          id="cta-motif"
          className="h-full w-full"
        />
      </div>
      <div className="relative mx-auto w-full max-w-4xl text-center">
        <Reveal>
          <span className="font-label text-[0.7rem] font-semibold uppercase tracking-[0.3em] text-terracotta">
            Sur-mesure
          </span>
          <h2 className="mt-5 font-display text-4xl font-medium leading-[1.05] text-creme sm:text-5xl md:text-6xl">
            Un pagne, une pièce <span className="italic">unique pour vous</span>
          </h2>
          <p className="mx-auto mt-6 max-w-2xl text-pretty leading-relaxed text-creme/65">
            Écrivez-nous sur WhatsApp : nous vous conseillons sur le choix du tissu,
            les quantités et l'atelier de couture pour une tenue à votre mesure.
          </p>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <Button
              href={site.whatsappLink()}
              external
              size="lg"
              variant="whatsapp"
            >
              Écrire sur WhatsApp
            </Button>
            <Button
              href="/collection"
              size="lg"
              variant="outline"
              className="border-creme/35 text-creme hover:border-creme hover:text-creme"
            >
              Parcourir la collection
            </Button>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

