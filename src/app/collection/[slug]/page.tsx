import { notFound } from "next/navigation";
import { pagnes } from "@/content/pagnes";
import { Detail } from "@/components/catalogue/Detail";

export function generateStaticParams() {
  return pagnes.map((p) => ({ slug: p.slug }));
}

export default function Page({ params }: { params: { slug: string } }) {
  const p = pagnes.find((x) => x.slug === params.slug);
  if (!p) notFound();
  const similaires = pagnes
    .filter((x) => x.slug !== p.slug && x.collection === p.collection)
    .slice(0, 3);
  if (similaires.length < 3) {
    const extra = pagnes
      .filter((x) => x.slug !== p.slug && !similaires.includes(x))
      .slice(0, 3 - similaires.length);
    similaires.push(...extra);
  }
  return <Detail pagne={p} similaires={similaires} />;
}
