import type { Metadata } from "next";
import { Suspense } from "react";
import { Catalogue } from "@/components/catalogue/Catalogue";
import { site } from "@/config/site";

export const metadata: Metadata = {
  title: `Collection — ${site.name}`,
  description: "Catalogue des pagnes africains Maison Kôra : wax, super wax, bogolan, kente, tissés traditionnels.",
};

export default function CollectionPage() {
  return (
    <Suspense fallback={null}>
      <Catalogue />
    </Suspense>
  );
}
