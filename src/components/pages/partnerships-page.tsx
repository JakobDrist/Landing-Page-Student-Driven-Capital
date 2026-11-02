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
        <div className="grid gap-12 lg:grid-cols-[1fr_1.4fr] lg:gap-[10%]">
          <div>
            <p className="text-[13px] text-muted">{partnerships.opening.label}</p>
            <h2 className={`${sectionTitle} mt-6`}>
              {partnerships.opening.title}
            </h2>
          </div>
          <div className="space-y-6">
            {partnerships.opening.paragraphs.map((paragraph) => (
              <p key={paragraph} className={`${leadText} text-muted`}>
                {paragraph}
              </p>
            ))}
            <p className="border-l-2 border-ink pl-6 text-[22px] leading-[1.4] tracking-[-0.02em] md:text-[28px]">
              {partnerships.opening.statement}
            </p>
          </div>
        </div>
      </Section>

      <Section className="bg-white">
        <div className="grid gap-10 lg:grid-cols-[1fr_1fr] lg:gap-[10%]">
          <div>
            <p className="text-[13px] text-muted">{partnerships.value.label}</p>
            <h2 className={`${sectionTitle} mt-6`}>{partnerships.value.title}</h2>
          </div>
          <p className={`${leadText} text-muted`}>{partnerships.value.intro}</p>
        </div>
        <div className="mt-14 grid gap-x-12 gap-y-12 md:grid-cols-2">
          {partnerships.value.items.map((item, index) => (
            <article key={item.title} className="border-t border-line pt-6">
              <span className="text-[13px] tabular-nums text-muted">0{index + 1}</span>
              <h3 className="mt-5 text-[26px] leading-[1.2] tracking-[-0.025em]">
                {item.title}
              </h3>
              <p className="mt-4 max-w-xl text-[17px] leading-[1.6] text-muted">
                {item.text}
              </p>
            </article>
          ))}
        </div>
      </Section>

      <Section>
        <h2 className={sectionTitle}>{partnerships.pillarsTitle}</h2>
        <div className="mt-14 grid gap-x-12 gap-y-10 md:grid-cols-2">
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

      <Section id="muligheder" className="scroll-mt-20 bg-white">
        <h2 className={sectionTitle}>{partnerships.areasTitle}</h2>
        <p className={`${leadText} mt-6 max-w-3xl text-muted`}>
          {partnerships.areasIntro}
        </p>
        <ol className="mt-14 grid gap-x-12 gap-y-10 md:grid-cols-2">
          {partnerships.areas.map((area, index) => (
            <li key={area.title} className="grid grid-cols-[40px_1fr] border-t border-line pt-6">
              <span className="pt-2 text-[13px] tabular-nums text-muted">
                0{index + 1}
              </span>
              <div>
                <h3 className="text-[24px] leading-[1.25] tracking-[-0.02em]">
                  {area.title}
                </h3>
                <p className="mt-3 max-w-xl text-[17px] leading-[1.6] text-muted">
                  {area.text}
                </p>
                <p className="mt-4 max-w-xl text-[14px] leading-[1.6] text-muted">
                  {area.example}
                </p>
              </div>
            </li>
          ))}
        </ol>
      </Section>

      <Section>
        <div className="grid gap-12 lg:grid-cols-[1fr_1.4fr] lg:gap-[10%]">
          <div>
            <p className="text-[13px] text-muted">{partnerships.international.label}</p>
            <h2 className={`${sectionTitle} mt-6`}>
              {partnerships.international.title}
            </h2>
          </div>
          <div className="space-y-6">
            {partnerships.international.paragraphs.map((paragraph) => (
              <p key={paragraph} className={`${leadText} text-muted`}>
                {paragraph}
              </p>
            ))}
          </div>
        </div>
      </Section>

      <Section className="bg-white">
        <div className="grid gap-10 lg:grid-cols-[1fr_1fr] lg:gap-[10%]">
          <div>
            <p className="text-[13px] text-muted">{partnerships.measurement.label}</p>
            <h2 className={`${sectionTitle} mt-6`}>
              {partnerships.measurement.title}
            </h2>
          </div>
          <p className={`${leadText} text-muted`}>{partnerships.measurement.intro}</p>
        </div>
        <ul className="mt-12 grid gap-x-12 gap-y-8 md:grid-cols-2">
          {partnerships.measurement.measures.map((measure) => (
            <li key={measure} className="border-t border-line pt-6 text-[18px] leading-[1.5]">
              {measure}
            </li>
          ))}
        </ul>
      </Section>

      <Section>
        <div className="mx-auto max-w-[880px] text-center">
          <h2 className="text-[13px] text-muted">{partnerships.principleTitle}</h2>
          <p className="mt-6 text-[26px] leading-[1.3] tracking-[-0.025em] text-balance md:text-[34px]">
            {partnerships.principle}
          </p>
          <p className="mx-auto mt-7 max-w-2xl text-[15px] leading-[1.6] text-muted">
            {partnerships.principleNote}
          </p>
        </div>
      </Section>

      <Section id="kontakt" className="scroll-mt-20 bg-white">
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
            <p className="mt-3 text-[14px] leading-[1.6] text-muted">
              {partnerships.contactNote}
            </p>
          </div>
          <div>
            <p className="mb-8 rounded-[10px] border border-control p-4 text-[15px] leading-6 text-muted">
              {partnerships.preview}
            </p>
            <EnquiryForm
              definition={partnerships.form}
              label="Partnerskabsformular — forhåndsvisning"
            />
          </div>
        </div>
      </Section>
    </>
  );
}
