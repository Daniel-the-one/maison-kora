# NOTES — Maison Kôra

Journal des choix techniques et de direction artistique. Mis à jour au fil du build.

## Référence analysée
`E:\vlisco.com.zip` = copie du site Vlisco (Shopify). Design language extraite :
- Palette Vlisco : noir `#070707`, off-white `#fbf9f7`, gris `#343a40/#868e96` → **très monochrome, conservateur**.
- Typo Vlisco : `Lyon Display` (serif) + `Euclid Square` + `Questrial`.
- Structure : hero « imprimés signature », « Prêt-à-porter & Art de vivre », newsletter, storytelling 1846.

**Décision** : on garde la *rigueur éditoriale* (serif d'expression, gros titres, storytelling) mais on **ajoute** ce qui manque à Vlisco : palette colorée riche (terracotta/indigo/jaune/vert/doré), motion abondante et soignée, hero vidéo multi-scènes, catalogue filtrable. Objectif : « plus moderne, élégant et stylé ».

## Choix techniques
- **Motifs de pagne en SVG inline** (pas de photos) : composants React paramétrés par palette + type de motif. Rendus flous/vectoriels, responsives, zéro poids réseau. 5 familles : cercles concentriques, plumes, éventails, géométrie, fleurs stylisées.
- **Hero vidéo** : 3 `<video>` superposés, un seul visible à la fois, fondu via `opacity`. Si le fichier absent/erreur → composant `SceneFallback` (motif SVG animé + dégradé). Détection par `onError` + `canplay`. Mobile : on ne monte pas le `<video>` (image/motif de secours).
- **Filtres** : état local + `AnimatePresence` + `layout` de Framer Motion pour les réordonnancements fluides de la grille.
- **Scroll** : Lenis pour un défilement fluide, désactivé si `prefers-reduced-motion`.
- **Fonts** : Cormorant Garamond (400/500/600/700 + italique), Syne (500/600/700/800), Manrope (300-700) via `next/font/google`.

## Palette (tokens)
- crème `#FBF7F0` · crème-2 `#F4ECE0`
- nuit `#1A1512` · nuit-2 `#2A211B`
- terracotta `#C4562F` (accent Femme)
- indigo `#2C3E7B` (accent Homme)
- soleil `#E8B23A` (accent Enfants)
- vert `#1F5D4C` · doré `#B8893B`

## Garde-fous
- Jamais de média externe, jamais de contenu vide (placeholders SVG/textes crédibles).
- Chaque page a un contenu réel et présentable.
- Commit git après chaque étape majeure.
- Max 2 tentatives par commande qui échoue.

## Décisions en cours
- (à compléter)
