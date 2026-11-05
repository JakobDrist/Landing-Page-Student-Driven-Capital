import { home } from "@/content/data";
import { ButtonLink } from "@/components/ui/button-link";
import { Section } from "./section";
import { InvestmentFramework } from "./investment-framework";
import { SectionHeading } from "@/components/ui/section-heading";

export function SectorsSection() {
  return (
    <Section className="bg-white" id="investment-approach">
      <SectionHeading
        title={home.sectors.title}
        description={home.sectors.description}
      />
      <div className="mt-14 md:mt-20">
        <InvestmentFramework />
      </div>
      <div className="mt-12 text-center md:mt-16">
        <ButtonLink href={home.sectors.action.href} variant="primary">
          {home.sectors.action.label}
        </ButtonLink>
      </div>
    </Section>
  );
}
