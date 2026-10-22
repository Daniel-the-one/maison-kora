# PLAN — Maison Kôra (site vitrine e-catalogue de pagnes)

> Slogan : « L'élégance tissée de couleurs »
> Marque fictive temporaire, centralisée dans `src/config/site.ts`.
> Objectif : présentation client — présentable, complet, rien de cassé ni de vide.

## Stack
- Next.js 16.4.2 (App Router, Turbopack), React 19.3, TypeScript 5
- Tailwind CSS v4, Framer Motion 14.6, Lenis (scroll fluide), clsx + tailwind-merge
- Aucun média externe. Motifs de pagne générés en **SVG**. Hero : vidéos si présentes, sinon fallback SVG animé.
- Pas de paiement. CTA = WhatsApp + contact.

## Direction artistique
- **Typo** : titres `Cormorant Garamond` (serif d'expression, italique pour mots-clés) + labels `Syne` (majuscules espacées) + corps `Manrope`. Auto-hébergé via `next/font`.
- **Palette** : crème chaud `#FBF7F0`, nuit `#1A1512`, terracotta `#C4562F`, indigo `#2C3E7B`, jaune soleil `#E8B23A`, vert profond `#1F5D4C`, doré `#B8893B`.
- Hiérarchie typographique généreuse, contraste fort, jeu italique/droit, mots-clés colorés.

## Checklist

### 1. Socle
- [x] Scaffold + deps + git
- [ ] `PLAN.md` / `NOTES.md`
- [ ] `src/config/site.ts`
- [ ] `src/app/globals.css` (thème, fonts, utilitaires)
- [ ] `src/lib/{utils,motion,hooks}.ts`
- [ ] Header (animé au scroll, burger), Footer complet

### 2. Données
- [ ] `src/content/pagnes.ts` — 30 pagnes fictifs (nom, type, qualité, prix FCFA, couleurs, description, dimensions, composition, entretien, collection, variantes)
- [ ] `src/lib/motifs.tsx` — générateur de motifs SVG (cercles concentriques, plumes, éventails, géométrie, fleurs stylisées)

### 3. Hero
- [ ] 3 scènes (femme / homme / enfants) en boucle, fondu enchaîné
- [ ] 3 barres de progression cliquables
- [ ] Texte + couleur d'accent par scène (terracotta / indigo / jaune soleil)
- [ ] Vidéos muettes autoplay playsinline + overlay ; fallback SVG animé + poster
- [ ] `prefers-reduced-motion`, pas de vidéo lourde sur mobile

### 4. Catalogue
- [ ] Grille masonry responsive
- [ ] Filtres animés : type, qualité, prix, couleur, collection ; recherche ; tri
- [ ] Carte pagne : zoom hover, pastilles couleurs, favori animé, apparition en cascade
- [ ] Page détail `[slug]` : grand visuel zoom, variantes couleurs, détails animés, similaires, WhatsApp
- [ ] Mobile-first

### 5. Autres pages
- [ ] Accueil : hero + collections vedettes + sélection par type + histoire du pagne + témoignages
- [ ] À propos
- [ ] Guide des pagnes (types + qualité)
- [ ] Contact
- [ ] 404

### 6. Motion transverse
- [ ] Reveal au scroll, texte ligne par ligne, parallaxe légère, compteurs, hover soignés, transitions de page
- [ ] 60 fps, `prefers-reduced-motion`

### 7. Livraison
- [ ] `npx tsc --noEmit`
- [ ] `npm run build` (0 erreur)
- [ ] `npm run dev` + URL
- [ ] Commit git par étape
- [ ] Push GitHub + deploy Vercel
