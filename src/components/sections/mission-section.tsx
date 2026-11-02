import { home } from "@/content/data";
import { ScrollRevealText } from "@/components/ui/scroll-reveal-text";
import { ButtonLink } from "@/components/ui/button-link";
import { Grain } from "@/components/ui/grain";
import { Glow } from "@/components/ui/glow";
import { Section } from "./section";
import { Figures } from "./stats-section";

export function MissionSection() {
  return (
    <section
      id="our-mission"
      className="relative isolate bg-[#141415] text-paper"
    >
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <Glow subdued />
        <Grain className="opacity-35" />
      </div>
      <ScrollRevealText {...home.mission} />
      <Section>
        <Figures figures={home.stats.figures} dark />
        <div className="mt-16 text-center">
          <ButtonLink href={home.stats.action.href} variant="light">
            {home.stats.action.label}
          </ButtonLink>
        </div>
      </Section>
    </section>
  );
}
