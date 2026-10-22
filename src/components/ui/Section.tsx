import { cn } from "@/lib/utils";

type Props = {
  children: React.ReactNode;
  className?: string;
  id?: string;
  tone?: "creme" | "creme2" | "nuit";
};

const tones = {
  creme: "bg-creme text-nuit",
  creme2: "bg-creme-2 text-nuit",
  nuit: "bg-nuit text-creme",
};

/** Enveloppe de section : largeur, paddings verticaux, ton de fond. */
export function Section({ children, className, id, tone = "creme" }: Props) {
  return (
    <section
      id={id}
      className={cn(
        "relative px-5 py-20 sm:px-8 md:py-28 lg:py-32",
        tones[tone],
        className,
      )}
    >
      <div className="mx-auto w-full max-w-7xl">{children}</div>
    </section>
  );
}

/** Petit label en majuscules espacées (Syne). */
export function Eyebrow({
  children,
  className,
  accent,
}: {
  children: React.ReactNode;
  className?: string;
  accent?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2.5 font-label text-[0.7rem] font-semibold uppercase tracking-[0.28em] text-nuit/55",
        className,
      )}
      style={accent ? { color: accent } : undefined}
    >
      <span
        aria-hidden
        className="h-px w-7"
        style={{ background: accent ?? "currentColor", opacity: 0.6 }}
      />
      {children}
    </span>
  );
}
