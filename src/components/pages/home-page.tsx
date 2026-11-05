import { home } from "@/content/data";
import { HeroSection } from "@/components/sections/hero-section";
import { MissionSection } from "@/components/sections/mission-section";
import { SectorsSection } from "@/components/sections/sectors-section";
import { FoundingPartnersSection } from "@/components/sections/founding-partners-section";
import { JournalSection } from "@/components/sections/journal-section";
import { CallToAction } from "@/components/sections/call-to-action";

// Keep the journal available to re-enable when it is needed on the homepage.
const SHOW_JOURNAL = false;

export function HomePage() {
  return (
    <>
      <HeroSection />
      <MissionSection />
      <SectorsSection />
      <FoundingPartnersSection {...home.foundingPartners} />
      {SHOW_JOURNAL && <JournalSection {...home.journal} />}
      <CallToAction {...home.closing} />
    </>
  );
}
