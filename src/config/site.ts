/**
 * Identité centrale de la marque.
 * ────────────────────────────────────────────────────────────
 * TOUT ce qui touche à la marque (nom, slogan, contacts, couleurs,
 * navigation, scènes du hero) est ici. Pour changer de marque :
 * modifiez ce fichier, rien d'autre.
 */

export const site = {
  name: "Maison Kôra",
  shortName: "Kôra",
  slogan: "L'élégance tissée de couleurs",
  description:
    "Maison Kôra réunit les plus beaux pagnes africains — wax hollandais, super wax, tissés traditionnels. Un catalogue vivant pour habiller chaque histoire, du tissu au vêtement.",
  locale: "fr-FR",

  contact: {
    email: "bonjour@maisonkora.com",
    phone: "+228 90 12 34 56",
    whatsapp: "22890123456",
    address: "Boulevard du 30 Août, Lomé, Togo",
    hours: "Lun – Sam · 9h – 19h",
  },

  social: {
    instagram: "https://instagram.com/",
    facebook: "https://facebook.com/",
    tiktok: "https://tiktok.com/",
    pinterest: "https://pinterest.com/",
  },

  /** Lien WhatsApp avec message pré-rempli. */
  whatsappLink(message?: string) {
    const text = encodeURIComponent(
      message ?? "Bonjour Maison Kôra, je souhaite des informations sur vos pagnes.",
    );
    return `https://wa.me/${site.contact.whatsapp}?text=${text}`;
  },

  nav: [
    { label: "Accueil", href: "/" },
    { label: "Collection", href: "/collection" },
    { label: "Guide des pagnes", href: "/guide" },
    { label: "À propos", href: "/a-propos" },
    { label: "Contact", href: "/contact" },
  ],
} as const;

/** Palette de la marque (miroir des tokens CSS, pour usage en JS/SVG). */
export const palette = {
  creme: "#FBF7F0",
  creme2: "#F4ECE0",
  nuit: "#1A1512",
  nuit2: "#2A211B",
  terracotta: "#C4562F",
  indigo: "#2C3E7B",
  soleil: "#E8B23A",
  vert: "#1F5D4C",
  dore: "#B8893B",
} as const;

export type HeroScene = {
  id: "femme" | "homme" | "enfants";
  /** Titre (le mot clé entre dans `highlight`). */
  titleTop: string;
  highlight: string;
  titleBottom?: string;
  subtitle: string;
  cta: string;
  ctaHref: string;
  /** Couleur d'accent de la scène. */
  accent: string;
  /** Vidéo (optionnelle : fallback SVG si absente). */
  video: string;
  videoMobile: string;
  /** Motif SVG de secours (clé dans motifs.tsx). */
  motif: "cercles" | "plumes" | "eventails";
  palette: string[];
};

/** Les 3 scènes du hero, en boucle. */
export const heroScenes: HeroScene[] = [
  {
    id: "femme",
    titleTop: "Pour elle, un pagne qui",
    highlight: "raconte",
    titleBottom: "sa force",
    subtitle:
      "Des wax d'exception drapés en robes, jupes et ensembles qui célèbrent la silhouette et l'allure.",
    cta: "Découvrir la collection Femme",
    ctaHref: "/collection?collection=femme",
    accent: palette.terracotta,
    video: "/videos/hero-femme.mp4",
    videoMobile: "/videos/hero-femme-mobile.mp4",
    motif: "cercles",
    palette: [palette.terracotta, palette.dore, palette.creme2, palette.nuit2],
  },
  {
    id: "homme",
    titleTop: "Pour lui, le tissu",
    highlight: "affirme",
    titleBottom: "le caractère",
    subtitle:
      "Bogolan, faso dan fani et indigos profonds taillés en chemises et grands boubous à la présence immédiate.",
    cta: "Découvrir la collection Homme",
    ctaHref: "/collection?collection=homme",
    accent: palette.indigo,
    video: "/videos/hero-homme.mp4",
    videoMobile: "/videos/hero-homme-mobile.mp4",
    motif: "plumes",
    palette: [palette.indigo, palette.nuit, palette.creme2, palette.dore],
  },
  {
    id: "enfants",
    titleTop: "Pour eux, des couleurs",
    highlight: "pleines de vie",
    titleBottom: "",
    subtitle:
      "Pagnes légers et joyeux, pensés pour bouger, jouer et grandir sans jamais perdre de leur éclat.",
    cta: "Découvrir la collection Enfants",
    ctaHref: "/collection?collection=enfants",
    accent: palette.soleil,
    video: "/videos/hero-enfants.mp4",
    videoMobile: "/videos/hero-enfants-mobile.mp4",
    motif: "eventails",
    palette: [palette.soleil, palette.terracotta, palette.vert, palette.creme2],
  },
];

export type NavItem = (typeof site.nav)[number];
