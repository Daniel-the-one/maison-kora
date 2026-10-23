import type { Metadata } from "next";
import { Section, Eyebrow } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";
import { site } from "@/config/site";
import { MailIcon, PhoneIcon, PinIcon, WhatsappIcon, ArrowRightIcon } from "@/components/ui/Icons";

export const metadata: Metadata = {
  title: `Contact — ${site.name}`,
  description: "Contactez Maison Kôra pour des conseils, un devis ou pour commander votre pagne.",
};

export default function ContactPage() {
  return (
    <Section tone="creme" className="pt-32">
      <div className="mx-auto w-full max-w-7xl">
        <Reveal>
          <Eyebrow accent="#C4562F">Contact</Eyebrow>
          <h1 className="mt-4 max-w-4xl font-display text-5xl font-medium leading-[1.02] text-nuit sm:text-6xl lg:text-7xl">
            Parlons de votre <span className="italic text-terracotta">projet</span>
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-nuit/70">
            Une question sur un pagne ? Besoin d'un conseil pour la coupe ? Écrivez-nous, nous répondons généralement dans l'heure.
          </p>
        </Reveal>

        <div className="mt-16 grid gap-12 lg:grid-cols-2">
          <Reveal>
            <div className="rounded-3xl bg-nuit p-8 text-creme sm:p-10">
              <h2 className="font-display text-3xl font-medium">Réponse rapide par WhatsApp</h2>
              <p className="mt-3 text-creme/70">
                Le plus direct pour choisir votre pagne, connaître les quantités ou démarrer votre sur-mesure.
              </p>
              <div className="mt-8">
                <Button href={site.whatsappLink("Bonjour Maison Kôra, j'aimerais échanger au sujet de vos pagnes.")} external size="lg" variant="whatsapp">
                  <WhatsappIcon className="h-5 w-5" />
                  Discuter sur WhatsApp
                </Button>
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="rounded-3xl border border-nuit/10 p-8 sm:p-10">
              <h2 className="font-display text-3xl font-medium text-nuit">Coordonnées</h2>
              <ul className="mt-6 space-y-5">
                <li className="flex items-start gap-4">
                  <div className="mt-1 grid h-10 w-10 place-items-center rounded-full bg-creme-2"><PinIcon className="h-5 w-5 text-terracotta" /></div>
                  <div>
                    <p className="font-medium text-nuit">Adresse</p>
                    <p className="mt-1 text-nuit/65">{site.contact.address}</p>
                  </div>
                </li>
                <li className="flex items-start gap-4">
                  <div className="mt-1 grid h-10 w-10 place-items-center rounded-full bg-creme-2"><PhoneIcon className="h-5 w-5 text-terracotta" /></div>
                  <div>
                    <p className="font-medium text-nuit">Téléphone</p>
                    <a href={`tel:${site.contact.phone.replace(/\s/g, "")}`} className="mt-1 text-nuit/65 hover:text-terracotta">{site.contact.phone}</a>
                  </div>
                </li>
                <li className="flex items-start gap-4">
                  <div className="mt-1 grid h-10 w-10 place-items-center rounded-full bg-creme-2"><MailIcon className="h-5 w-5 text-terracotta" /></div>
                  <div>
                    <p className="font-medium text-nuit">Email</p>
                    <a href={`mailto:${site.contact.email}`} className="mt-1 text-nuit/65 hover:text-terracotta">{site.contact.email}</a>
                  </div>
                </li>
              </ul>
              <div className="mt-8 flex items-center justify-between rounded-2xl bg-creme-2/40 px-5 py-4">
                <div>
                  <p className="font-medium text-nuit">Horaires</p>
                  <p className="text-sm text-nuit/65">{site.contact.hours}</p>
                </div>
                <Button href="/collection" variant="ghost">
                  Voir le catalogue
                  <ArrowRightIcon className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </Section>
  );
}
