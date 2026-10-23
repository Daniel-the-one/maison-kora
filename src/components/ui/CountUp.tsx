"use client";

import { useEffect, useRef, useState } from "react";
import { animate, useInView } from "framer-motion";
import { usePrefersReducedMotion } from "@/lib/hooks";
import { formatNumber } from "@/lib/utils";

type Props = {
  to: number;
  suffix?: string;
  prefix?: string;
  duration?: number;
  className?: string;
};

/** Compteur animé déclenché à l'entrée dans le viewport. */
export function CountUp({
  to,
  suffix = "",
  prefix = "",
  duration = 1.8,
  className,
}: Props) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const reduced = usePrefersReducedMotion();
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!inView) return;
    if (reduced) {
      setValue(to);
      return;
    }
    const controls = animate(0, to, {
      duration,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (v) => setValue(v),
    });
    return () => controls.stop();
  }, [inView, to, duration, reduced]);

  return (
    <span ref={ref} className={className}>
      {prefix}
      {formatNumber(Math.round(value))}
      {suffix}
    </span>
  );
}
