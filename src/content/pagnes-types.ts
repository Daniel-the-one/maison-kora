import type { MotifKind } from "@/lib/motifs";

export type TypePagne =
  | "Wax hollandais"
  | "Super Wax"
  | "Wax africain"
  | "Fancy"
  | "Kente"
  | "Bogolan"
  | "Faso dan fani"
  | "Pagne ewé";

export type Qualite = "Premium" | "Standard" | "Économique";

export type Collection = "femme" | "homme" | "enfants";

export type CouleurPagne =
  | "terracotta"
  | "indigo"
  | "soleil"
  | "vert"
  | "dore"
  | "nuit"
  | "creme"
  | "corail"
  | "rose"
  | "turquoise";

export type Variante = {
  nom: string;
  hex: string;
};

export type Pagne = {
  slug: string;
  nom: string;
  type: TypePagne;
  qualite: Qualite;
  collection: Collection;
  prix: number;
  couleurs: CouleurPagne[];
  /** Palette hex utilisée pour générer le motif SVG. */
  palette: string[];
  motif: MotifKind;
  description: string;
  histoire: string;
  dimensions: string;
  composition: string;
  entretien: string;
  variantes: Variante[];
};

export const TYPES: TypePagne[] = [
  "Wax hollandais",
  "Super Wax",
  "Wax africain",
  "Fancy",
  "Kente",
  "Bogolan",
  "Faso dan fani",
  "Pagne ewé",
];

export const QUALITES: Qualite[] = ["Premium", "Standard", "Économique"];

export const COLLECTIONS: { value: Collection; label: string; accent: string }[] =
  [
    { value: "femme", label: "Femme", accent: "#C4562F" },
    { value: "homme", label: "Homme", accent: "#2C3E7B" },
    { value: "enfants", label: "Enfants", accent: "#E8B23A" },
  ];

export const COULEURS: { value: CouleurPagne; label: string; hex: string }[] = [
  { value: "terracotta", label: "Terracotta", hex: "#C4562F" },
  { value: "indigo", label: "Indigo", hex: "#2C3E7B" },
  { value: "soleil", label: "Jaune soleil", hex: "#E8B23A" },
  { value: "vert", label: "Vert profond", hex: "#1F5D4C" },
  { value: "dore", label: "Doré", hex: "#B8893B" },
  { value: "nuit", label: "Nuit", hex: "#1A1512" },
  { value: "creme", label: "Crème", hex: "#F4ECE0" },
  { value: "corail", label: "Corail", hex: "#E76F51" },
  { value: "rose", label: "Rose", hex: "#C86B85" },
  { value: "turquoise", label: "Turquoise", hex: "#2E9C97" },
];

export const couleurHex = (c: CouleurPagne) =>
  COULEURS.find((x) => x.value === c)?.hex ?? "#C4562F";

export const qualiteOrder: Record<Qualite, number> = {
  Premium: 0,
  Standard: 1,
  Économique: 2,
};
