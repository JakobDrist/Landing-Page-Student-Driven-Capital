import { home } from "@/content/data";
import { HeroSection } from "@/components/sections/hero-section";
import { MissionSection } from "@/components/sections/mission-section";
import { SectorsSection } from "@/components/sections/sectors-section";
import { FoundingPartnersSection } from "@/components/sections/founding-partners-section";
import { JournalSection } from "@/components/sections/journal-section";
import { CallToAction } from "@/components/sections/call-to-action";
import { ScrollRevealText } from "@/components/ui/scroll-reveal-text";

// Keep the journal available to re-enable when it is needed on the homepage.
const SHOW_JOURNAL = false;

export function HomePage() {
  return (
    <>
      <HeroSection />
      {/* Everything after the pinned hero scrolls over it, as in Stills. */}
      <div className="relative z-10">
        <MissionSection />
        <ScrollRevealText
          id="our-mission"
          label={home.mission.statement.label}
          text={home.mission.statement.text}
        />
        <SectorsSection />
        <FoundingPartnersSection {...home.foundingPartners} />
        {SHOW_JOURNAL && <JournalSection {...home.journal} />}
        <CallToAction {...home.closing} />
      </div>
    </>
  );
}
