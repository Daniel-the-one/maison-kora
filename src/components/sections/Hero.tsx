"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { heroScenes, site } from "@/config/site";
import { ease } from "@/lib/motion";
import { Motif } from "@/lib/motifs";
import { useIsDesktop, usePrefersReducedMotion } from "@/lib/hooks";
import { Button } from "@/components/ui/Button";
import { ArrowRightIcon } from "@/components/ui/Icons";

const DURATION = 6500;

/** Fallback animé (motif SVG + dégradé) quand la vidéo est absente. */
function SceneFallback({
  scene,
  index,
  active,
}: {
  scene: (typeof heroScenes)[number];
  index: number;
  active: boolean;
}) {
  return (
    <div className="absolute inset-0">
      <motion.div
        className="absolute inset-0"
        animate={active ? { scale: [1.05, 1.16] } : { scale: 1.05 }}
        transition={{ duration: DURATION / 1000 + 3, ease: "linear" }}
      >
        <Motif
          kind={scene.motif}
          palette={scene.palette}
          id={`hero-${scene.id}`}
          className="h-full w-full"
        />
      </motion.div>
      <div
        aria-hidden
        className="absolute inset-0"
        style={{
          background: `linear-gradient(120deg, ${scene.palette[1]}cc 0%, ${scene.palette[0]}33 60%, transparent 100%)`,
          mixBlendMode: "multiply",
        }}
      />
    </div>
  );
}

function SceneVideo({
  scene,
  isDesktop,
  active,
  onError,
}: {
  scene: (typeof heroScenes)[number];
  isDesktop: boolean;
  active: boolean;
  onError: () => void;
}) {
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const v = ref.current;
    if (!v) return;
    if (active) {
      v.play().catch(() => {});
    } else {
      v.pause();
    }
  }, [active]);

  if (!isDesktop) return null;

  return (
    <video
      ref={ref}
      className="absolute inset-0 h-full w-full object-cover"
      muted
      playsInline
      loop
      autoPlay
      preload="metadata"
      poster={undefined}
      onError={onError}
      aria-hidden
    >
      <source src={scene.video} type="video/mp4" />
    </video>
  );
}

export function Hero() {
  const [index, setIndex] = useState(0);
  const [progressKey, setProgressKey] = useState(0);
  const [videoFailed, setVideoFailed] = useState<Record<string, boolean>>({});
  const reduced = usePrefersReducedMotion();
  const isDesktop = useIsDesktop(768);
  const scene = heroScenes[index];

  const goTo = useCallback((i: number) => {
    setIndex(((i % heroScenes.length) + heroScenes.length) % heroScenes.length);
    setProgressKey((k) => k + 1);
  }, []);

  const next = useCallback(() => {
    setIndex((i) => (i + 1) % heroScenes.length);
    setProgressKey((k) => k + 1);
  }, []);

  useEffect(() => {
    if (reduced) return;
    const t = setTimeout(next, DURATION);
    return () => clearTimeout(t);
  }, [index, reduced, next]);

  return (
    <section
      className="relative flex min-h-[100svh] w-full items-center overflow-hidden bg-nuit"
      aria-label="Présentation Maison Kôra"
    >
      {/* Scènes en fond */}
      <div className="absolute inset-0">
        <AnimatePresence mode="sync">
          <motion.div
            key={scene.id}
            className="absolute inset-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.2, ease: ease.inOut }}
          >
            <SceneFallback scene={scene} index={index} active />
            {isDesktop && !videoFailed[scene.id] && (
              <SceneVideo
                scene={scene}
                isDesktop={isDesktop}
                active
                onError={() =>
                  setVideoFailed((s) => ({ ...s, [scene.id]: true }))
                }
              />
            )}
          </motion.div>
        </AnimatePresence>

        {/* Overlay de lisibilité */}
        <div
          aria-hidden
          className="absolute inset-0 bg-gradient-to-t from-nuit via-nuit/55 to-nuit/35"
        />
        <div
          aria-hidden
          className="absolute inset-0 bg-gradient-to-r from-nuit/70 via-transparent to-transparent"
        />
      </div>

      {/* Contenu */}
      <div className="relative z-10 mx-auto w-full max-w-7xl px-5 pb-32 pt-28 sm:px-8">
        <div className="max-w-3xl">
          <AnimatePresence mode="wait">
            <motion.div key={scene.id}>
              <motion.span
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
                className="inline-flex items-center gap-3 font-label text-[0.72rem] font-semibold uppercase tracking-[0.32em]"
                style={{ color: scene.accent }}
              >
                <span
                  className="h-px w-8"
                  style={{ background: scene.accent }}
                />
                {site.slogan}
              </motion.span>

              <h1 className="mt-6 font-display text-[2.9rem] font-medium leading-[0.98] text-creme sm:text-6xl md:text-7xl lg:text-[5.4rem]">
                {[
                  scene.titleTop,
                  scene.highlight,
                  scene.titleBottom,
                ].map((line, i) => (
                  <span key={i} className="line-mask">
                    <motion.span
                      className="block"
                      initial={{ y: "110%" }}
                      animate={{ y: "0%" }}
                      exit={{ y: "-110%" }}
                      transition={{
                        duration: 0.8,
                        ease: ease.out,
                        delay: 0.12 + i * 0.09,
                      }}
                    >
                      {i === 1 ? (
                        <em
                          className="font-semibold not-italic"
                          style={{ color: scene.accent }}
                        >
                          <span className="italic">{line}</span>
                        </em>
                      ) : (
                        line
                      )}
                    </motion.span>
                  </span>
                ))}
              </h1>

              <motion.p
                key={`${scene.id}-sub`}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.6, delay: 0.35 }}
                className="mt-6 max-w-xl text-base leading-relaxed text-creme/75 sm:text-lg"
              >
                {scene.subtitle}
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.6, delay: 0.45 }}
                className="mt-9 flex flex-wrap items-center gap-4"
              >
                <Button href={scene.ctaHref} size="lg" variant="primary">
                  {scene.cta}
                  <ArrowRightIcon className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Button>
                <Button
                  href={site.whatsappLink(
                    `Bonjour Maison Kôra, je suis intéressé(e) par la collection ${
                      scene.id.charAt(0).toUpperCase() + scene.id.slice(1)
                    }.`,
                  )}
                  external
                  size="lg"
                  variant="outline"
                  className="border-creme/40 text-creme hover:border-creme hover:text-creme"
                >
                  Commander
                </Button>
              </motion.div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Indicateurs de progression */}
        <div className="absolute inset-x-5 bottom-10 flex items-center gap-6 sm:inset-x-8">
          <div className="flex flex-1 gap-3 sm:max-w-md">
            {heroScenes.map((s, i) => (
              <button
                key={s.id}
                type="button"
                onClick={() => goTo(i)}
                aria-label={`Scène ${i + 1} : ${s.cta}`}
                aria-current={i === index}
                className="group relative flex-1 pt-2 text-left"
              >
                <span className="block h-[3px] w-full overflow-hidden rounded-full bg-creme/20">
                  {i === index && !reduced ? (
                    <motion.span
                      key={progressKey}
                      className="block h-full origin-left rounded-full"
                      style={{ background: s.accent }}
                      initial={{ scaleX: 0 }}
                      animate={{ scaleX: 1 }}
                      transition={{ duration: DURATION / 1000, ease: "linear" }}
                    />
                  ) : (
                    <span
                      className="block h-full origin-left rounded-full"
                      style={{
                        background: i < index ? s.accent : "transparent",
                        transform: i < index ? "scaleX(1)" : "scaleX(0)",
                      }}
                    />
                  )}
                </span>
                <span
                  className={`mt-3 hidden font-label text-[0.62rem] font-semibold uppercase tracking-[0.2em] transition-colors sm:block ${
                    i === index ? "text-creme" : "text-creme/40"
                  }`}
                >
                  {s.id === "femme"
                    ? "Femme"
                    : s.id === "homme"
                      ? "Homme"
                      : "Enfants"}
                </span>
              </button>
            ))}
          </div>
          <span className="font-display text-sm text-creme/60">
            <span style={{ color: scene.accent }}>
              0{index + 1}
            </span>
            <span className="mx-1 text-creme/30">/</span>0{heroScenes.length}
          </span>
        </div>
      </div>

      {/* Indice de scroll */}
      <motion.div
        aria-hidden
        className="absolute bottom-8 left-1/2 hidden -translate-x-1/2 lg:block"
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
      >
        <span className="block h-10 w-px bg-gradient-to-b from-creme/50 to-transparent" />
      </motion.div>
    </section>
  );
}
