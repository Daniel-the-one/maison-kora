"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { site } from "@/config/site";
import { cn } from "@/lib/utils";
import { useScrollY } from "@/lib/hooks";
import { MenuIcon, CloseIcon, WhatsappIcon } from "@/components/ui/Icons";

export function Header() {
  const pathname = usePathname();
  const y = useScrollY();
  const [open, setOpen] = useState(false);
  const scrolled = y > 24;

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-50 transition-all duration-500",
          scrolled
            ? "bg-creme/85 py-3 shadow-soft backdrop-blur-xl"
            : "bg-transparent py-5",
        )}
      >
        <div className="mx-auto flex w-full max-w-7xl items-center justify-between px-5 sm:px-8">
          <Link
            href="/"
            className="group flex items-baseline gap-2"
            aria-label={`${site.name} — accueil`}
          >
            <span className="font-display text-2xl font-semibold leading-none tracking-tight text-nuit sm:text-[1.7rem]">
              Maison
            </span>
            <span className="font-display text-2xl font-semibold italic leading-none tracking-tight text-terracotta sm:text-[1.7rem]">
              Kôra
            </span>
          </Link>

          <nav className="hidden items-center gap-1 lg:flex">
            {site.nav.map((item) => {
              const active =
                item.href === "/"
                  ? pathname === "/"
                  : pathname.startsWith(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "relative rounded-full px-4 py-2 font-label text-[0.78rem] font-semibold uppercase tracking-[0.16em] transition-colors",
                    active ? "text-terracotta" : "text-nuit/70 hover:text-nuit",
                  )}
                >
                  {item.label}
                  {active && (
                    <motion.span
                      layoutId="nav-active"
                      className="absolute inset-x-3 -bottom-0.5 h-px bg-terracotta"
                      transition={{
                        type: "spring",
                        stiffness: 380,
                        damping: 30,
                      }}
                    />
                  )}
                </Link>
              );
            })}
          </nav>

          <div className="flex items-center gap-3">
            <Link
              href={site.whatsappLink()}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden items-center gap-2 rounded-full bg-nuit px-5 py-2.5 font-label text-[0.75rem] font-semibold uppercase tracking-[0.16em] text-creme transition-colors hover:bg-terracotta sm:inline-flex"
            >
              <WhatsappIcon className="h-4 w-4" />
              Commander
            </Link>
            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-label={open ? "Fermer le menu" : "Ouvrir le menu"}
              aria-expanded={open}
              className="grid h-11 w-11 place-items-center rounded-full border border-nuit/15 bg-creme/70 text-nuit backdrop-blur lg:hidden"
            >
              {open ? (
                <CloseIcon className="h-5 w-5" />
              ) : (
                <MenuIcon className="h-5 w-5" />
              )}
            </button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 bg-creme lg:hidden"
          >
            <motion.nav
              className="flex h-full flex-col justify-center gap-2 px-8"
              initial="hidden"
              animate="show"
              variants={{
                hidden: {},
                show: { transition: { staggerChildren: 0.07, delayChildren: 0.1 } },
              }}
            >
              {site.nav.map((item) => (
                <motion.div
                  key={item.href}
                  variants={{
                    hidden: { opacity: 0, y: 30 },
                    show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
                  }}
                >
                  <Link
                    href={item.href}
                    className="block border-b border-nuit/10 py-5 font-display text-4xl font-medium text-nuit"
                  >
                    {item.label}
                  </Link>
                </motion.div>
              ))}
              <motion.div
                variants={{
                  hidden: { opacity: 0, y: 30 },
                  show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
                }}
                className="mt-8"
              >
                <Link
                  href={site.whatsappLink()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-3 rounded-full bg-terracotta px-7 py-4 font-label text-sm font-semibold uppercase tracking-[0.16em] text-creme"
                >
                  <WhatsappIcon className="h-5 w-5" />
                  Commander sur WhatsApp
                </Link>
              </motion.div>
            </motion.nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
