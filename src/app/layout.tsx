import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, Syne, Manrope } from "next/font/google";
import { Suspense } from "react";
import "./globals.css";
import { site } from "@/config/site";
import { SmoothScroll } from "@/components/providers/SmoothScroll";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { ScrollProgress } from "@/components/ui/ScrollProgress";
import { BackToTop } from "@/components/ui/BackToTop";
import { PageTransition } from "@/components/layout/PageTransition";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-cormorant",
  display: "swap",
});

const syne = Syne({
  subsets: ["latin"],
  weight: ["500", "600", "700", "800"],
  variable: "--font-syne",
  display: "swap",
});

const manrope = Manrope({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-manrope",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://maison-kora.vercel.app"),
  title: {
    default: `${site.name} — ${site.slogan}`,
    template: `%s · ${site.name}`,
  },
  description: site.description,
  keywords: [
    "pagne africain",
    "wax hollandais",
    "super wax",
    "tissu kente",
    "bogolan",
    "faso dan fani",
    "pagne femme",
    "pagne homme",
    "pagne enfant",
    "Maison Kôra",
  ],
  openGraph: {
    title: `${site.name} — ${site.slogan}`,
    description: site.description,
    type: "website",
    locale: "fr_FR",
    siteName: site.name,
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.name} — ${site.slogan}`,
    description: site.description,
  },
};

export const viewport: Viewport = {
  themeColor: "#fbf7f0",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="fr"
      className={`${cormorant.variable} ${syne.variable} ${manrope.variable}`}
    >
      <body className="antialiased">
        <SmoothScroll>
          <ScrollProgress />
          <Suspense fallback={null}>
            <Header />
          </Suspense>
          <main id="contenu">
            <Suspense fallback={null}>
              <PageTransition>{children}</PageTransition>
            </Suspense>
          </main>
          <Suspense fallback={null}>
            <Footer />
          </Suspense>
          <BackToTop />
        </SmoothScroll>
      </body>
    </html>
  );
}
