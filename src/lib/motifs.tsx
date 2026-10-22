import * as React from "react";

/**
 * Générateur de motifs de pagne en SVG — aucun média externe.
 * 5 familles : cercles concentriques, plumes, éventails, géométrie, fleurs.
 * Chaque motif est paramétré par une palette (3-4 couleurs) et un id unique
 * (pour les `clipPath`/`pattern` sans collision).
 */

export type MotifKind =
  | "cercles"
  | "plumes"
  | "eventails"
  | "geometrie"
  | "fleurs";

export const motifKinds: MotifKind[] = [
  "cercles",
  "plumes",
  "eventails",
  "geometrie",
  "fleurs",
];

type Props = {
  kind: MotifKind;
  palette: string[];
  id: string;
  className?: string;
};

function pal(palette: string[]) {
  const fallback = ["#C4562F", "#E8B23A", "#2C3E7B", "#FBF7F0"];
  return palette.length >= 3 ? palette : fallback;
}

/* ── Motif : cercles concentriques ── */
function Cercles({ p, id }: { p: string[]; id: string }) {
  const rings = [155, 120, 88, 58, 30];
  return (
    <g>
      <defs>
        <radialGradient id={`cg-${id}`} cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor={p[1]} stopOpacity="0.95" />
          <stop offset="100%" stopColor={p[0]} stopOpacity="0.9" />
        </radialGradient>
      </defs>
      <rect width="300" height="300" fill={p[2]} />
      <circle cx="150" cy="150" r="138" fill={`url(#cg-${id})`} />
      {rings.map((r, i) => (
        <circle
          key={r}
          cx="150"
          cy="150"
          r={r}
          fill="none"
          stroke={i % 2 === 0 ? p[3] : p[0]}
          strokeWidth={i % 2 === 0 ? 7 : 4}
          strokeOpacity={i % 2 === 0 ? 0.95 : 0.7}
        />
      ))}
      <circle cx="150" cy="150" r="14" fill={p[3]} />
      {Array.from({ length: 12 }).map((_, i) => {
        const a = (i / 12) * Math.PI * 2;
        return (
          <circle
            key={i}
            cx={150 + Math.cos(a) * 155}
            cy={150 + Math.sin(a) * 155}
            r="6"
            fill={p[3]}
            opacity="0.8"
          />
        );
      })}
    </g>
  );
}

/* ── Motif : plumes ── */
function Plumes({ p, id }: { p: string[]; id: string }) {
  const plume = (i: number) => {
    const x = 40 + i * 44;
    return (
      <g key={i} transform={`translate(${x} 0)`}>
        <path
          d="M22 30 C6 90 6 190 22 270 C38 190 38 90 22 30 Z"
          fill={i % 2 === 0 ? p[0] : p[1]}
          opacity="0.92"
        />
        <path
          d="M22 40 L22 260"
          stroke={p[3]}
          strokeWidth="1.5"
          opacity="0.5"
        />
        {Array.from({ length: 7 }).map((_, k) => (
          <g key={k}>
            <path
              d={`M22 ${60 + k * 28} q -18 6 -30 2`}
              stroke={p[3]}
              strokeWidth="1.2"
              fill="none"
              opacity="0.45"
            />
            <path
              d={`M22 ${60 + k * 28} q 18 6 30 2`}
              stroke={p[3]}
              strokeWidth="1.2"
              fill="none"
              opacity="0.45"
            />
          </g>
        ))}
        <circle cx="22" cy="26" r="7" fill={p[3]} />
      </g>
    );
  };
  return (
    <g>
      <rect width="300" height="300" fill={p[2]} />
      {Array.from({ length: 6 }).map((_, i) => plume(i))}
      <rect y="272" width="300" height="28" fill={p[0]} opacity="0.85" />
    </g>
  );
}

/* ── Motif : éventails ── */
function Eventails({ p, id }: { p: string[]; id: string }) {
  const fan = (cx: number, cy: number, r: number, colors: string[]) => (
    <g transform={`translate(${cx} ${cy})`}>
      {Array.from({ length: 7 }).map((_, i) => {
        const a0 = Math.PI + (i / 7) * Math.PI;
        const a1 = Math.PI + ((i + 1) / 7) * Math.PI;
        const x0 = Math.cos(a0) * r;
        const y0 = Math.sin(a0) * r;
        const x1 = Math.cos(a1) * r;
        const y1 = Math.sin(a1) * r;
        return (
          <path
            key={i}
            d={`M0 0 L${x0} ${y0} A${r} ${r} 0 0 1 ${x1} ${y1} Z`}
            fill={colors[i % colors.length]}
            stroke={p[3]}
            strokeWidth="1.5"
            opacity="0.94"
          />
        );
      })}
      <circle r={r * 0.22} fill={p[3]} />
    </g>
  );
  return (
    <g>
      <rect width="300" height="300" fill={p[2]} />
      {fan(75, 110, 62, [p[0], p[1], p[0], p[1]])}
      {fan(225, 110, 62, [p[1], p[0], p[1], p[0]])}
      {fan(150, 240, 70, [p[0], p[1], p[0], p[1]])}
      {Array.from({ length: 8 }).map((_, i) => (
        <circle
          key={i}
          cx={20 + i * 38}
          cy={20 + (i % 2) * 14}
          r="5"
          fill={p[3]}
          opacity="0.6"
        />
      ))}
    </g>
  );
}

/* ── Motif : géométrie ── */
function Geometrie({ p, id }: { p: string[]; id: string }) {
  return (
    <g>
      <rect width="300" height="300" fill={p[2]} />
      {Array.from({ length: 5 }).map((_, row) =>
        Array.from({ length: 5 }).map((_, col) => {
          const x = col * 60;
          const y = row * 60;
          const c = (row + col) % 3;
          const fill = c === 0 ? p[0] : c === 1 ? p[1] : p[3];
          if ((row + col) % 2 === 0) {
            return (
              <path
                key={`${row}-${col}`}
                d={`M${x + 30} ${y} L${x + 60} ${y + 30} L${x + 30} ${y + 60} L${x} ${y + 30} Z`}
                fill={fill}
                opacity="0.92"
              />
            );
          }
          return (
            <rect
              key={`${row}-${col}`}
              x={x + 8}
              y={y + 8}
              width="44"
              height="44"
              fill={fill}
              opacity="0.86"
              rx="4"
            />
          );
        }),
      )}
      <g stroke={p[3]} strokeWidth="2" opacity="0.5">
        <path d="M0 150 H300" />
        <path d="M150 0 V300" />
      </g>
    </g>
  );
}

/* ── Motif : fleurs stylisées ── */
function Fleurs({ p, id }: { p: string[]; id: string }) {
  const flower = (cx: number, cy: number, r: number, petal: string) => (
    <g transform={`translate(${cx} ${cy})`}>
      {Array.from({ length: 8 }).map((_, i) => {
        const a = (i / 8) * Math.PI * 2;
        return (
          <ellipse
            key={i}
            cx={Math.cos(a) * r * 0.62}
            cy={Math.sin(a) * r * 0.62}
            rx={r * 0.34}
            ry={r * 0.16}
            fill={petal}
            opacity="0.9"
            transform={`rotate(${(a * 180) / Math.PI} ${Math.cos(a) * r * 0.62} ${Math.sin(a) * r * 0.62})`}
          />
        );
      })}
      <circle r={r * 0.22} fill={p[1]} />
      <circle r={r * 0.1} fill={p[3]} />
    </g>
  );
  return (
    <g>
      <rect width="300" height="300" fill={p[2]} />
      {flower(80, 80, 42, p[0])}
      {flower(220, 80, 42, p[1])}
      {flower(80, 220, 42, p[1])}
      {flower(220, 220, 42, p[0])}
      {flower(150, 150, 34, p[3])}
      <g stroke={p[0]} strokeWidth="2" opacity="0.45" fill="none">
        <path d="M150 0 q 30 40 0 80 q -30 40 0 80 q 30 40 0 80" />
      </g>
    </g>
  );
}

const registry: Record<
  MotifKind,
  (a: { p: string[]; id: string }) => React.ReactElement
> = {
  cercles: Cercles,
  plumes: Plumes,
  eventails: Eventails,
  geometrie: Geometrie,
  fleurs: Fleurs,
};

export function Motif({ kind, palette, id, className }: Props) {
  const p = pal(palette);
  const Comp = registry[kind];
  return (
    <svg
      viewBox="0 0 300 300"
      preserveAspectRatio="xMidYMid slice"
      className={className}
      role="img"
      aria-label={`Motif de pagne ${kind}`}
    >
      <Comp p={p} id={id} />
    </svg>
  );
}
