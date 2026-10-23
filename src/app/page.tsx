import type { Metadata } from "next";
import { Hero } from "@/components/sections/Hero";
import { FeaturedCollections } from "@/components/sections/FeaturedCollections";
import { FeaturedPagnes } from "@/components/sections/FeaturedPagnes";
import {
  TypeMarquee,
  Pillars,
  Stats,
  Story,
  CTABand,
} from "@/components/sections/HomeSections";
import { Testimonials } from "@/components/sections/Testimonials";
import { site } from "@/config/site";

export const metadata: Metadata = {
  title: `${site.name} — ${site.slogan}`,
  description: site.description,
};

export default function AccueilPage() {
  return (
    <>
      <Hero />
      <FeaturedCollections />
      <TypeMarquee />
      <FeaturedPagnes />
      <Pillars />
      <Stats />
      <Story />
      <Testimonials />
      <CTABand />
    </>
  );
}
