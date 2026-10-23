"use client";

import { motion } from "framer-motion";
import { stagger, staggerItem, viewportOnce } from "@/lib/motion";
import { Eyebrow } from "@/components/ui/Section";
import { SparkIcon } from "@/components/ui/Icons";

const avis = [
  {
    nom: "Aïcha M.",
    ville: "Lomé",
    texte:
      "Le wax que j'ai commandé est encore plus beau qu'en ligne. Les couleurs tiennent après des mois, et l'équipe m'a guidée pour la coupe. Une vraie maison de confiance.",
    accent: "#C4562F",
    initiales: "AM",
  },
  {
    nom: "Kwame A.",
    ville: "Accra",
    texte:
      "J'ai reçu mon bogolan en trois jours. La qualité du tissage est remarquable, rien à voir avec ce que je trouvais au marché. Je recommande sans hésiter.",
    accent: "#2C3E7B",
    initiales: "KA",
  },
  {
    nom: "Fatou D.",
    ville: "Dakar",
    texte:
      "Le kente tissé main est une pièce magnifique, portée pour le baptême de ma fille. Merci pour les conseils d'entretien, il est comme neuf.",
    accent: "#1F5D4C",
    initiales: "FD",
  },
];

export function Testimonials() {
  return (
    <section className="bg-creme-2 px-5 py-20 sm:px-8 md:py-28">
      <div className="mx-auto w-full max-w-7xl">
        <div className="text-center">
          <Eyebrow className="justify-center">Elles et ils en parlent</Eyebrow>
          <h2 className="mx-auto mt-4 max-w-2xl font-display text-4xl font-medium leading-[1.05] text-nuit sm:text-5xl">
            Porter un pagne, <span className="italic">c'est porter une histoire</span>
          </h2>
        </div>

        <motion.div
          variants={stagger(0.12)}
          initial="hidden"
          whileInView="show"
          viewport={viewportOnce}
          className="mt-14 grid gap-6 md:grid-cols-3"
        >
          {avis.map((a) => (
            <motion.figure
              key={a.nom}
              variants={staggerItem}
              className="flex h-full flex-col rounded-3xl bg-creme p-7 shadow-soft"
            >
              <div className="flex gap-1" aria-label="5 sur 5">
                {Array.from({ length: 5 }).map((_, i) => (
                  <SparkIcon
                    key={i}
                    className="h-4 w-4"
                    style={{ color: a.accent }}
                  />
                ))}
              </div>
              <blockquote className="mt-5 flex-1 text-pretty leading-relaxed text-nuit/75">
                « {a.texte} »
              </blockquote>
              <figcaption className="mt-6 flex items-center gap-3 border-t border-nuit/10 pt-5">
                <span
                  className="grid h-11 w-11 place-items-center rounded-full font-label text-sm font-semibold text-creme"
                  style={{ background: a.accent }}
                >
                  {a.initiales}
                </span>
                <span>
                  <span className="block font-display text-lg font-semibold text-nuit">
                    {a.nom}
                  </span>
                  <span className="block text-sm text-nuit/55">{a.ville}</span>
                </span>
              </figcaption>
            </motion.figure>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
