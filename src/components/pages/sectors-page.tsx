import { pages } from "@/content/data";
import { PageHeader } from "@/components/sections/page-header";
import { Section } from "@/components/sections/section";
import { ButtonLink } from "@/components/ui/button-link";
import { sectionTitle, leadText } from "@/components/ui/section-heading";

export function SectorsPage() {
  const { sectors: content } = pages;

  return (
    <>
      <PageHeader title={content.title} description={content.description} />

      <Section className="bg-white">
        <div className="grid gap-12 lg:grid-cols-[1fr_1.4fr] lg:gap-[10%]">
          <div>
            <p className="text-[13px] text-muted">{content.philosophy.label}</p>
            <h2 className={`${sectionTitle} mt-6`}>{content.philosophy.title}</h2>
          </div>
          <div className="space-y-6">
            {content.philosophy.paragraphs.map((paragraph) => (
              <p key={paragraph} className={`${leadText} text-muted`}>
                {paragraph}
              </p>
            ))}
            <p className="border-l-2 border-ink pl-6 text-[21px] leading-[1.4] tracking-[-0.02em] md:text-[27px]">
              {content.philosophy.maxim}
            </p>
          </div>
        </div>
      </Section>

      <Section id="investment-process">
        <p className="text-[13px] text-muted">{content.process.label}</p>
        <div className="mt-6 grid gap-10 lg:grid-cols-[1fr_1fr] lg:gap-[10%]">
          <h2 className={sectionTitle}>{content.process.title}</h2>
          <p className={`${leadText} text-muted`}>{content.process.intro}</p>
        </div>
        <ol className="mt-14 grid gap-x-12 gap-y-12 md:grid-cols-2">
          {content.process.steps.map((step, index) => (
            <li key={step.title} className="border-t border-line pt-6">
              <p className="text-[13px] tabular-nums text-muted">
                0{index + 1}
              </p>
              <h3 className="mt-5 text-[26px] leading-[1.2] tracking-[-0.025em]">
                {step.title}
              </h3>
              <p className="mt-4 max-w-xl text-[17px] leading-[1.6] text-muted">
                {step.text}
              </p>
            </li>
          ))}
        </ol>
      </Section>

      <Section className="bg-white">
        <div className="grid gap-12 lg:grid-cols-[1fr_1.4fr] lg:gap-[10%]">
          <div>
            <p className="text-[13px] text-muted">{content.universe.label}</p>
            <h2 className={`${sectionTitle} mt-6`}>{content.universe.title}</h2>
          </div>
          <div className="space-y-6">
            {content.universe.paragraphs.map((paragraph) => (
              <p key={paragraph} className={`${leadText} text-muted`}>
                {paragraph}
              </p>
            ))}
          </div>
        </div>
        <div className="mt-14 grid gap-x-10 gap-y-10 md:grid-cols-3">
          {content.universe.principles.map((principle) => (
            <div key={principle.title} className="border-t border-line pt-6">
              <h3 className="text-[24px] leading-[1.2] tracking-[-0.025em]">
                {principle.title}
              </h3>
              <p className="mt-4 text-[17px] leading-[1.6] text-muted">
                {principle.text}
              </p>
            </div>
          ))}
        </div>
      </Section>

      <Section>
        <p className="text-[13px] text-muted">{content.risk.label}</p>
        <div className="mt-6 grid gap-10 lg:grid-cols-[1fr_1fr] lg:gap-[10%]">
          <h2 className={sectionTitle}>{content.risk.title}</h2>
          <p className={`${leadText} text-muted`}>{content.risk.intro}</p>
        </div>
        <div className="mt-14 grid gap-x-12 gap-y-10 md:grid-cols-2">
          {content.risk.layers.map((layer) => (
            <div key={layer.title} className="border-t border-line pt-6">
              <h3 className="text-[24px] leading-[1.25] tracking-[-0.02em]">
                {layer.title}
              </h3>
              <p className="mt-4 text-[17px] leading-[1.6] text-muted">
                {layer.text}
              </p>
            </div>
          ))}
        </div>
        <p className={`${leadText} mt-14 max-w-4xl text-muted`}>
          {content.risk.regimes}
        </p>
      </Section>

      <Section className="bg-white">
        <div className="grid gap-12 lg:grid-cols-[1fr_1.4fr] lg:gap-[10%]">
          <div>
            <p className="text-[13px] text-muted">{content.evidence.label}</p>
            <h2 className={`${sectionTitle} mt-6`}>{content.evidence.title}</h2>
          </div>
          <div className="space-y-6">
            {content.evidence.paragraphs.map((paragraph) => (
              <p key={paragraph} className={`${leadText} text-muted`}>
                {paragraph}
              </p>
            ))}
          </div>
        </div>
      </Section>

      <Section>
        <p className="text-[13px] text-muted">{content.phase.label}</p>
        <div className="mt-6 grid gap-10 lg:grid-cols-[1fr_1.4fr] lg:gap-[10%]">
          <h2 className={sectionTitle}>{content.phase.title}</h2>
          <p className={`${leadText} text-muted`}>{content.phase.text}</p>
        </div>
      </Section>

      <Section className="bg-white">
        <div className="mx-auto max-w-4xl text-center">
          <h2 className={sectionTitle}>{content.closing.title}</h2>
          <p className={`${leadText} mx-auto mt-6 max-w-2xl text-muted`}>
            {content.closing.text}
          </p>
          <div className="mt-10 flex flex-wrap justify-center gap-3">
            <ButtonLink href="/membership" variant="dark">
              Udforsk medlemskab
            </ButtonLink>
            <ButtonLink href="/partnerskaber" variant="outline">
              Bliv partner
            </ButtonLink>
          </div>
        </div>
      </Section>
    </>
  );
}
