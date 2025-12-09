"use client";

import { HeroBanner } from "@/components/HeroBanner";
import { MoodSelector } from "@/components/MoodSelector";
import { FeaturedSection } from "@/components/FeaturedSection";
import { QuickMixRow } from "@/components/QuickMixRow";
import { VisualDiscovery } from "@/components/VisualDiscovery";

export default function Home() {
  return (
    <div className="space-y-8 p-6 md:p-8">
      <HeroBanner />
      <MoodSelector />
      <QuickMixRow />
      <VisualDiscovery />
      <FeaturedSection />
    </div>
  );
}
