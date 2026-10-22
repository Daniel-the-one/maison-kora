"use client";

import Link from "next/link";
import { site } from "@/config/site";
import {
  InstagramIcon,
  FacebookIcon,
  TiktokIcon,
  PinterestIcon,
  MailIcon,
  PhoneIcon,
  PinIcon,
  ArrowUpRightIcon,
} from "@/components/ui/Icons";
import { Reveal } from "@/components/ui/Reveal";

const socialIcons = [
  { href: site.social.instagram, Icon: InstagramIcon, label: "Instagram" },
  { href: site.social.facebook, Icon: FacebookIcon, label: "Facebook" },
  { href: site.social.tiktok, Icon: TiktokIcon, label: "TikTok" },
  { href: site.social.pinterest, Icon: PinterestIcon, label: "Pinterest" },
];

const collections = [
  { label: "Collection Femme", href: "/collection?collection=femme" },
  { label: "Collection Homme", href: "/collection?collection=homme" },
  { label: "Collection Enfants", href: "/collection?collection=enfants" },
  { label: "Tous les pagnes", href: "/collection" },
];

const maison = [
  { label: "À propos", href: "/a-propos" },
  { label: "Guide des pagnes", href: "/guide" },
  { label: "Contact", href: "/contact" },
  { label: "Foire aux questions", href: "/faq" },
];

export function Footer() {
  return (
    <footer className="relative overflow-hidden bg-nuit px-5 pb-10 pt-20 text-creme sm:px-8">
      <div
        aria-hidden
        className="pointer-events-none absolute -right-24 -top-24 h-96 w-96 rounded-full opacity-20 blur-3xl"
        style={{ background: "radial-gradient(circle, #C4562F, transparent 70%)" }}
      />
      <div className="relative mx-auto w-full max-w-7xl">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
          <Reveal className="lg:col-span-1">
            <Link href="/" className="flex items-baseline gap-2">
              <span className="font-display text-3xl font-semibold text-creme">
                Maison
              </span>
              <span className="font-display text-3xl font-semibold italic text-soleil">
                Kôra
              </span>
            </Link>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-creme/65">
              {site.slogan}. Des pagnes choisis pour habiller chaque histoire,
              du tissu au vêtement.
            </p>
            <div className="mt-6 flex gap-3">
              {socialIcons.map(({ href, Icon, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="grid h-10 w-10 place-items-center rounded-full border border-creme/20 text-creme/80 transition-colors hover:border-soleil hover:text-soleil"
                >
                  <Icon className="h-4.5 w-4.5" />
                </a>
              ))}
            </div>
          </Reveal>

          <Reveal delay={0.08}>
            <h3 className="font-label text-[0.7rem] font-semibold uppercase tracking-[0.24em] text-soleil">
              Collections
            </h3>
            <ul className="mt-5 space-y-3">
              {collections.map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className="group inline-flex items-center gap-1.5 text-sm text-creme/70 transition-colors hover:text-creme"
                  >
                    {l.label}
                    <ArrowUpRightIcon className="h-3.5 w-3.5 opacity-0 transition-all group-hover:translate-x-0.5 group-hover:opacity-100" />
                  </Link>
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal delay={0.16}>
            <h3 className="font-label text-[0.7rem] font-semibold uppercase tracking-[0.24em] text-soleil">
              La maison
            </h3>
            <ul className="mt-5 space-y-3">
              {maison.map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className="group inline-flex items-center gap-1.5 text-sm text-creme/70 transition-colors hover:text-creme"
                  >
                    {l.label}
                    <ArrowUpRightIcon className="h-3.5 w-3.5 opacity-0 transition-all group-hover:translate-x-0.5 group-hover:opacity-100" />
                  </Link>
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal delay={0.24}>
            <h3 className="font-label text-[0.7rem] font-semibold uppercase tracking-[0.24em] text-soleil">
              Nous joindre
            </h3>
            <ul className="mt-5 space-y-4 text-sm text-creme/70">
              <li className="flex items-start gap-3">
                <PinIcon className="mt-0.5 h-4.5 w-4.5 shrink-0 text-soleil" />
                <span>{site.contact.address}</span>
              </li>
              <li>
                <a
                  href={`tel:${site.contact.phone.replace(/\s/g, "")}`}
                  className="flex items-center gap-3 transition-colors hover:text-creme"
                >
                  <PhoneIcon className="h-4.5 w-4.5 shrink-0 text-soleil" />
                  {site.contact.phone}
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${site.contact.email}`}
                  className="flex items-center gap-3 transition-colors hover:text-creme"
                >
                  <MailIcon className="h-4.5 w-4.5 shrink-0 text-soleil" />
                  {site.contact.email}
                </a>
              </li>
              <li className="pt-1 text-creme/50">{site.contact.hours}</li>
            </ul>
          </Reveal>
        </div>

        <div className="mt-16 flex flex-col items-center justify-between gap-4 border-t border-creme/10 pt-8 text-xs text-creme/45 sm:flex-row">
          <p>
            © {new Date().getFullYear()} {site.name}. Tous droits réservés.
          </p>
          <p className="flex items-center gap-2">
            <span>Marque fictive de démonstration</span>
            <span aria-hidden>·</span>
            <span>Site vitrine e-catalogue</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
