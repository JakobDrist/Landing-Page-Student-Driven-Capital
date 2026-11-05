import { home } from "@/content/data";
import { ScrollRevealText } from "@/components/ui/scroll-reveal-text";
import { ButtonLink } from "@/components/ui/button-link";
import { Grain } from "@/components/ui/grain";
import { Glow } from "@/components/ui/glow";
import { Container } from "@/components/ui/container";
import { LogoTicker } from "@/components/ui/logo-ticker";
import { Section } from "./section";

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
      {/* Danish universities drifting by above the mission. */}
      <Container className="pt-14 md:pt-20">
        <p className="text-center text-[12px] tracking-[0.12em] text-paper/45 uppercase">
          {home.universities.label}
        </p>
        <div className="mt-7 md:mt-8">
          <LogoTicker
            marks={home.universities.marks}
            label={home.universities.label}
            tone="dark"
          />
        </div>
      </Container>
      <ScrollRevealText title={home.mission.title} text={home.mission.text} />
      <Section className="pt-0!">
        <div className="mx-auto max-w-4xl text-center">
          <p className="text-[19px] leading-[1.6] text-paper/75 md:text-[23px]">
            {home.mission.supporting}
          </p>
          <div className="mt-10">
            <ButtonLink href={home.mission.action.href} variant="light">
              {home.mission.action.label}
            </ButtonLink>
          </div>
        </div>
      </Section>
    </section>
  );
}
