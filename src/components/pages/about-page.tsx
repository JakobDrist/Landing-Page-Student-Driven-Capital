import { home, pages } from "@/content/data";
import { PageHeader } from "@/components/sections/page-header";
import { Section } from "@/components/sections/section";
import { ButtonLink } from "@/components/ui/button-link";
import { sectionTitle, leadText } from "@/components/ui/section-heading";
import { FoundingPartnersSection } from "@/components/sections/founding-partners-section";

export function AboutPage() {
  const { about } = pages;

  return (
    <>
      <PageHeader title={about.title} description={about.description} />

      <Section className="bg-white">
        <div className="grid gap-12 lg:grid-cols-[1fr_1.4fr] lg:gap-[10%]">
          <div>
            <p className="text-[13px] text-muted">{about.origin.label}</p>
            <h2 className={`${sectionTitle} mt-6`}>{about.origin.title}</h2>
          </div>
          <div className="space-y-6">
            {about.origin.paragraphs.map((paragraph) => (
              <p key={paragraph} className={`${leadText} text-muted`}>
                {paragraph}
              </p>
            ))}
          </div>
        </div>
      </Section>

      <Section id="principles">
        <p className="text-[13px] text-muted">{about.principles.label}</p>
        <div className="mt-6 grid gap-10 lg:grid-cols-[1fr_1fr] lg:gap-[10%]">
          <h2 className={sectionTitle}>{about.principles.title}</h2>
          <p className={`${leadText} max-w-2xl text-muted`}>
            {about.principles.intro}
          </p>
        </div>
        <div className="mt-14 grid gap-x-10 gap-y-9 md:grid-cols-3">
          {about.principles.items.map((principle, index) => (
            <div key={principle.title} className="border-t border-line pt-6">
              <p className="text-[13px] tabular-nums text-muted">
                0{index + 1}
              </p>
              <h3 className="mt-5 text-[25px] leading-[1.2] tracking-[-0.025em]">
                {principle.title}
              </h3>
              <p className="mt-4 text-[17px] leading-[1.6] text-muted">
                {principle.text}
              </p>
            </div>
          ))}
        </div>
      </Section>

      <FoundingPartnersSection
        title={about.founders.title}
        description={about.founders.intro}
        members={home.foundingPartners.members}
      />

      <Section className="bg-white">
        <div className="grid gap-12 lg:grid-cols-[1fr_1.4fr] lg:gap-[10%]">
          <div>
            <p className="text-[13px] text-muted">{about.future.label}</p>
            <h2 className={`${sectionTitle} mt-6`}>{about.future.title}</h2>
          </div>
          <div className="space-y-6">
            {about.future.paragraphs.map((paragraph) => (
              <p key={paragraph} className={`${leadText} text-muted`}>
                {paragraph}
              </p>
            ))}
          </div>
        </div>
      </Section>

      <Section>
        <div className="mx-auto max-w-4xl text-center">
          <p className="text-[13px] text-muted">{about.closing.label}</p>
          <h2 className={`${sectionTitle} mt-6`}>{about.closing.title}</h2>
          <p className={`${leadText} mx-auto mt-6 max-w-2xl text-muted`}>
            {about.closing.description}
          </p>
          <div className="mt-10 flex flex-wrap justify-center gap-3">
            <ButtonLink href="/membership" variant="primary">
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
