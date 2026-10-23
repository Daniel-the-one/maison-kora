import type { Metadata } from "next";
import { Section, Eyebrow } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";
import { site } from "@/config/site";
import { ArrowRightIcon, RulerIcon, ScissorsIcon, WhatsappIcon } from "@/components/ui/Icons";

export const metadata: Metadata = {
  title: `Guide des pagnes — ${site.name}`,
  description: "Guide pratique : types de pagnes, choix, quantités, entretien et conseils pour la coupe.",
};

const types = [
  { nom: "Wax hollandais", desc: "Le plus connu. Couleurs éclatantes, grande résistance, idéal pour robes et ensembles." },
  { nom: "Super Wax", desc: "Plus dense, plus fin dans le tombé. Couleurs profondes, parfait pour les occasions." },
  { nom: "Wax africain", desc: "Polyvalent, abordable, se décline dans des milliers de motifs." },
  { nom: "Faso Dan Fani", desc: "Tissé au Burkina Faso à 100 % coton. Sobre, noble et intemporel." },
  { nom: "Bogolan", desc: "Teint à la boue au Mali. Authentique, terracotta et indigo, très prisé." },
  { nom: "Kente", desc: "Tissé main au Ghana. Pièce d'apparat, symbole de prestige et de cérémonie." },
  { nom: "Pagne ewé", desc: "Tissé sur métier à bandes, souvent rehaussé de fils dorés. Élégant et singulier." },
  { nom: "Fancy", desc: "Léger et abordable pour le quotidien. Idéal pour débuter ou pour les enfants." },
];

export default function GuidePage() {
  return (
    <>
      <Section tone="creme" className="pt-32">
        <div className="mx-auto w-full max-w-7xl">
          <Reveal>
            <Eyebrow accent="#C4562F">Guide</Eyebrow>
            <h1 className="mt-4 max-w-4xl font-display text-5xl font-medium leading-[1.02] text-nuit sm:text-6xl lg:text-7xl">
              Guide des <span className="italic text-terracotta">pagnes</span>
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-nuit/70">
              Comprendre les familles de tissus pour choisir celui qui correspond le mieux à votre projet.
            </p>
          </Reveal>

          <div className="mt-16 grid gap-6 md:grid-cols-2">
            {types.map((t, i) => (
              <Reveal key={t.nom} delay={i * 0.05}>
                <article className="rounded-3xl border border-nuit/10 p-7 transition-shadow hover:shadow-soft">
                  <h2 className="font-display text-2xl font-semibold text-nuit">{t.nom}</h2>
                  <p className="mt-3 leading-relaxed text-nuit/70">{t.desc}</p>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </Section>

      <Section tone="creme2">
        <div className="mx-auto w-full max-w-7xl">
          <Reveal>
            <Eyebrow>Conseils pratiques</Eyebrow>
            <h2 className="mt-4 font-display text-4xl font-medium text-nuit sm:text-5xl">Choisir, tailler, entretenir</h2>
          </Reveal>
          <div className="mt-12 grid gap-8 md:grid-cols-3">
            {[
              { icon: RulerIcon, titre: "Quantités", texte: "Un pagne de 6 yards (5,5 m) suffit généralement pour une robe longue ou un ensemble complet. Pour les enfants, 4–5 yards suffisent." },
              { icon: ScissorsIcon, titre: "Sur-mesure", texte: "Dites-nous le modèle souhaité sur WhatsApp. Notre atelier partenaire nous indique la quantité exacte selon le patron choisi." },
              { icon: WhatsappIcon, titre: "Entretien", texte: "Lavage à l'envers, eau froide. Éviter le sèche-linge. Pour les bogolan et kente, privilégier un nettoyage délicat ou à sec." },
            ].map((x, i) => {
              const Icon = x.icon;
              return (
                <Reveal key={x.titre} delay={i * 0.08}>
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-terracotta text-creme"><Icon className="h-6 w-6" /></div>
                  <h3 className="mt-5 font-display text-2xl font-semibold text-nuit">{x.titre}</h3>
                  <p className="mt-3 leading-relaxed text-nuit/70">{x.texte}</p>
                </Reveal>
              );
            })}
          </div>
          <div className="mt-12">
            <Button href={site.whatsappLink("Bonjour Maison Kôra, j'aimerais des conseils pour choisir mon pagne et le tailler.")} external size="lg" variant="whatsapp">
              <WhatsappIcon className="h-5 w-5" />
              Demander conseil sur WhatsApp
            </Button>
          </div>
        </div>
      </Section>
    </>
  );
}
