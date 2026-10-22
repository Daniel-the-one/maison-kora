"use client";

import { useEffect, useState } from "react";

/** Vrai si l'utilisateur préfère un mouvement réduit. */
export function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(mq.matches);
    const onChange = () => setReduced(mq.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);
  return reduced;
}

/** Vrai dès que la largeur dépasse `px` (client only, jamais SSR). */
export function useIsDesktop(px = 768) {
  const [is, setIs] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia(`(min-width: ${px + 1}px)`);
    setIs(mq.matches);
    const onChange = () => setIs(mq.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, [px]);
  return is;
}

/** Position de scroll verticale (throttlée via rAF). */
export function useScrollY() {
  const [y, setY] = useState(0);
  useEffect(() => {
    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => setY(window.scrollY));
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);
  return y;
}

/** Vrai après le montage (évite les mismatch d'hydratation). */
export function useMounted() {
  const [m, setM] = useState(false);
  useEffect(() => setM(true), []);
  return m;
}
