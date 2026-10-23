import type { Metadata } from "next";
import { Section, Eyebrow } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";
import { Motif } from "@/lib/motifs";
import { site } from "@/config/site";
import { ArrowRightIcon, WhatsappIcon } from "@/components/ui/Icons";

export const metadata: Metadata = {
  title: `À propos — ${site.name}`,
  description: "L'histoire de Maison Kôra, notre sélection de pagnes africains et notre approche du sur-mesure.",
};

export default function AproposPage() {
  return (
    <>
      <Section tone="creme" className="pt-32">
        <div className="mx-auto w-full max-w-7xl">
          <Reveal>
            <Eyebrow accent="#C4562F">À propos</Eyebrow>
            <h1 className="mt-4 max-w-4xl font-display text-5xl font-medium leading-[1.02] text-nuit sm:text-6xl lg:text-7xl">
              Des pagnes qui portent <span className="italic text-terracotta">une mémoire</span>
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-nuit/70">
              Maison Kôra réunit les plus belles étoffes d'Afrique de l'Ouest. Chaque pagne est choisi pièce par pièce pour sa couleur, son tissage et son histoire.
            </p>
          </Reveal>

          <div className="mt-16 grid items-center gap-12 lg:grid-cols-2">
            <Reveal>
              <div className="relative aspect-[4/5] overflow-hidden rounded-3xl shadow-soft-lg">
                <Motif kind="fleurs" palette={["#C4562F", "#E8B23A", "#1A1512", "#F4ECE0"]} id="apropos-motif" className="h-full w-full" />
                <div className="absolute inset-0 bg-gradient-to-t from-nuit/40 to-transparent" />
              </div>
            </Reveal>
            <Reveal delay={0.1}>
              <div className="space-y-6 text-pretty leading-relaxed text-nuit/75">
                <p>
                  Un pagne n'est jamais anodin. Il accompagne les grands moments : baptêmes, mariages, réunions de famille, fêtes ou simples retrouvailles. Il dit qui l'on est, d'où l'on vient et ce que l'on veut transmettre.
                </p>
                <p>
                  Nous parcourons les marchés et les ateliers pour dénicher des wax hollandais d'exception, du bogolan teint à la boue, du kente tissé main, du Faso Dan Fani et bien d'autres trésors. Notre exigence : des étoffes authentiques, résistantes et d'une grande richesse de couleurs.
                </p>
                <p>
                  Au-delà de la vente de tissu, nous accompagnons nos clients du choix du pagne à sa transformation en tenue sur-mesure grâce à notre atelier partenaire.
                </p>
              </div>
              <div className="mt-10 flex flex-wrap gap-3">
                <Button href="/collection" size="lg">
                  Découvrir la collection
                  <ArrowRightIcon className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Button>
                <Button href={site.whatsappLink()} external size="lg" variant="whatsapp">
                  <WhatsappIcon className="h-5 w-5" />
                  Nous contacter sur WhatsApp
                </Button>
              </div>
            </Reveal>
          </div>
        </div>
      </Section>
    </>
  );
}
