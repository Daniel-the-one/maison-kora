import type { Metadata } from "next";
import { Section, Eyebrow } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";
import { site } from "@/config/site";
import { WhatsappIcon } from "@/components/ui/Icons";

export const metadata: Metadata = {
  title: `Foire aux questions — ${site.name}`,
  description: "Questions fréquentes sur Maison Kôra, nos pagnes, le sur-mesure et la commande.",
};

const faq = [
  {
    q: "Vendez-vous le tissu seul ou uniquement des tenues ?",
    r: "Nous vendons principalement le pagne en 6 yards (tissu seul). Nous vous accompagnons ensuite vers notre atelier partenaire pour le transformer en tenue sur-mesure si vous le souhaitez.",
  },
  {
    q: "Combien de tissu faut-il pour une robe ?",
    r: "Pour une robe longue, 6 yards suffisent généralement. Pour une jupe droite ou un haut, 2 à 3 yards peuvent suffire. Envoyez-nous une photo du modèle sur WhatsApp et nous vous conseillons précisément.",
  },
  {
    q: "Les couleurs sont-elles fidèles aux photos ?",
    r: "Nos motifs sont générés en SVG à partir de nos fiches produit. Les couleurs sont proches des références, mais de légères différences peuvent exister selon l'écran.",
  },
  {
    q: "Proposez-vous le sur-mesure ?",
    r: "Oui. Après avoir choisi votre pagne, envoyez-nous vos mesures et le modèle souhaité sur WhatsApp. Nous vous établissons un devis clair avant toute commande.",
  },
  {
    q: "Quels sont les délais ?",
    r: "Le tissu est généralement disponible rapidement. Pour le sur-mesure, le délai dépend de l'atelier partenaire : nous vous l'indiquons au moment du devis.",
  },
  {
    q: "Peut-on commander depuis l'extérieur du Togo ?",
    r: "Pour l'instant, les commandes se font principalement au Togo. Écrivez-nous sur WhatsApp pour étudier votre cas selon votre localisation.",
  },
];

export default function FaqPage() {
  return (
    <Section tone="creme" className="pt-32">
      <div className="mx-auto w-full max-w-4xl">
        <Reveal className="text-center">
          <Eyebrow className="justify-center" accent="#C4562F">FAQ</Eyebrow>
          <h1 className="mt-4 font-display text-5xl font-medium leading-[1.02] text-nuit sm:text-6xl">
            Foire aux <span className="italic text-terracotta">questions</span>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-nuit/70">
            Les réponses aux questions les plus fréquentes sur Maison Kôra.
          </p>
        </Reveal>

        <div className="mt-14 space-y-4">
          {faq.map((item, i) => (
            <Reveal key={item.q} delay={i * 0.04}>
              <details className="group rounded-3xl border border-nuit/10 bg-creme-2/30 p-6 open:bg-creme open:shadow-soft">
                <summary className="flex cursor-pointer items-center justify-between gap-4 font-display text-xl font-semibold text-nuit">
                  {item.q}
                  <span className="text-terracotta transition-transform group-open:rotate-45">+</span>
                </summary>
                <p className="mt-4 leading-relaxed text-nuit/75">{item.r}</p>
              </details>
            </Reveal>
          ))}
        </div>

        <Reveal className="mt-12 text-center">
          <p className="text-nuit/70">Vous ne trouvez pas votre réponse ?</p>
          <div className="mt-4 flex justify-center">
            <Button href={site.whatsappLink("Bonjour Maison Kôra, j'ai une question qui n'est pas dans la FAQ.")} external size="lg" variant="whatsapp">
              <WhatsappIcon className="h-5 w-5" />
              Poser ma question sur WhatsApp
            </Button>
          </div>
        </Reveal>
      </div>
    </Section>
  );
}
