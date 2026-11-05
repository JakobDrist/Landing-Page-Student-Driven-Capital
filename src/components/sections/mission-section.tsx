import { home } from "@/content/data";
import { ScrollRevealText } from "@/components/ui/scroll-reveal-text";
import { ButtonLink } from "@/components/ui/button-link";
import { Grain } from "@/components/ui/grain";
import { Container } from "@/components/ui/container";
import { LogoTicker } from "@/components/ui/logo-ticker";
import { Section } from "./section";

// Mission on a light, grainy grey: the university ticker, the statement that
// lights up word by word on scroll, and the supporting line with a button.
export function MissionSection() {
  return (
    <section id="our-mission" className="relative isolate bg-selected text-ink">
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <Grain className="opacity-60" />
      </div>
      {/* Danish universities drifting by above the mission. */}
      <Container className="pt-14 md:pt-20">
        <p className="text-center text-[12px] tracking-[0.12em] text-muted uppercase">
          {home.universities.label}
        </p>
        <div className="mt-7 md:mt-8">
          <LogoTicker
            universities={home.universities.marks}
            label={home.universities.label}
          />
        </div>
      </Container>
      <ScrollRevealText title={home.mission.title} text={home.mission.text} />
      <Section className="pt-0!">
        <div className="mx-auto max-w-4xl text-center">
          <p className="text-[19px] leading-[1.6] text-muted md:text-[23px]">
            {home.mission.supporting}
          </p>
          <div className="mt-10">
            <ButtonLink href={home.mission.action.href} variant="primary">
              {home.mission.action.label}
            </ButtonLink>
          </div>
        </div>
      </Section>
    </section>
  );
}
