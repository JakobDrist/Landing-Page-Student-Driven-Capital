import partnerships from "@/content/data/partnerships.json";
import { Container } from "@/components/ui/container";
import { ButtonLink } from "@/components/ui/button-link";
import { sectionTitle, leadText } from "@/components/ui/section-heading";
import { PageHeader } from "@/components/sections/page-header";
import { Section } from "@/components/sections/section";
import { EnquiryForm } from "@/features/forms/enquiry-form";

export function PartnershipsPage() {
  return (
    <>
      <PageHeader
        title={partnerships.title}
        description={partnerships.description}
      />
      <Container>
        <ButtonLink href={partnerships.action.href} variant="dark">
          {partnerships.action.label}
        </ButtonLink>
      </Container>
      <Section>
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-[10%]">
          <h2 className={`${sectionTitle} max-w-lg`}>
            {partnerships.whyTitle}
          </h2>
          <div className="space-y-[1.35em] text-[18px] leading-[1.7] tracking-[-0.01em] text-muted">
            {partnerships.why.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
        </div>
        <div className="mt-20 grid gap-x-12 gap-y-10 md:mt-28 md:grid-cols-2">
          {partnerships.pillars.map((pillar) => (
            <div key={pillar.title} className="border-t border-ink pt-6">
              <h3 className="text-[28px] leading-[1.2] tracking-[-0.025em]">
                {pillar.title}
              </h3>
              <p className="mt-4 max-w-xl text-[17px] leading-[1.6] text-muted">
                {pillar.text}
              </p>
            </div>
          ))}
        </div>
      </Section>
      <Section className="bg-white">
        <h2 className={sectionTitle}>{partnerships.areasTitle}</h2>
        <ol className="mt-14 grid gap-x-12 gap-y-10 md:grid-cols-2">
          {partnerships.areas.map((area, index) => (
            <li
              key={area.title}
              className="grid grid-cols-[40px_1fr] border-t border-line pt-6"
            >
              <span className="pt-2 text-[13px] text-muted tabular-nums">
                0{index + 1}
              </span>
              <div>
                <h3 className="text-[24px] leading-[1.25] tracking-[-0.02em]">
                  {area.title}
                </h3>
                <p className="mt-3 max-w-md text-[17px] leading-[1.6] text-muted">
                  {area.text}
                </p>
              </div>
            </li>
          ))}
        </ol>
      </Section>
      <Section>
        <div className="mx-auto max-w-[820px] text-center">
          <h2 className="text-[13px] text-muted">
            {partnerships.principleTitle}
          </h2>
          <p className="mt-6 text-[26px] leading-[1.3] tracking-[-0.025em] text-balance md:text-[34px]">
            {partnerships.principle}
          </p>
        </div>
      </Section>
      <Section id="kontakt" className="bg-white">
        <div className="grid gap-14 lg:grid-cols-[1fr_1.2fr] lg:gap-[10%]">
          <div>
            <h2 className={sectionTitle}>{partnerships.contactTitle}</h2>
            <p className={`${leadText} mt-6 max-w-md text-muted`}>
              {partnerships.contactText}
            </p>
            <p className="mt-8 text-[17px]">
              <a
                href={`mailto:${partnerships.email}`}
                className="underline decoration-ink/30 underline-offset-4 hover:decoration-ink"
              >
                {partnerships.email}
              </a>
            </p>
          </div>
          <div>
            <p className="mb-8 rounded-[10px] border border-control p-4 text-[15px] leading-6 text-muted">
              {partnerships.preview}
            </p>
            <EnquiryForm
              definition={partnerships.form}
              label="Partnerskabsformular"
            />
          </div>
        </div>
      </Section>
    </>
  );
}
