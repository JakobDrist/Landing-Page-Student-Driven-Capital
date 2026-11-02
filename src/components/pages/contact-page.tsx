import { pages } from "@/content/data";
import { PageHeader } from "@/components/sections/page-header";
import { Section } from "@/components/sections/section";
import { ArrowLink } from "@/components/ui/button-link";
import { sectionTitle, leadText } from "@/components/ui/section-heading";
import { EnquiryForm } from "@/features/forms/enquiry-form";

export function ContactPage() {
  const content = pages.contact;

  return (
    <>
      <PageHeader title={content.title} description={content.description} />
      <Section className="bg-white">
        <div className="grid gap-12 lg:grid-cols-[1fr_1.2fr] lg:gap-[10%]">
          <div>
            <p className="text-[13px] text-muted">Kontaktveje</p>
            <h2 className={`${sectionTitle} mt-6`}>{content.heading}</h2>
          </div>
          <p className={`${leadText} text-muted`}>{content.intro}</p>
        </div>
        <div className="mt-14 grid gap-x-12 gap-y-10 md:grid-cols-3">
          {content.channels.map((channel, index) => (
            <article key={channel.title} className="border-t border-line pt-6">
              <span className="text-[13px] tabular-nums text-muted">
                0{index + 1}
              </span>
              <h3 className="mt-5 text-[24px] leading-[1.2] tracking-[-0.02em]">
                {channel.title}
              </h3>
              <p className="mt-4 text-[17px] leading-[1.6] text-muted">
                {channel.description}
              </p>
              {channel.link && (
                <div className="mt-7">
                  <ArrowLink href={channel.link.href}>
                    {channel.link.label}
                  </ArrowLink>
                </div>
              )}
            </article>
          ))}
        </div>
      </Section>

      <Section>
        <div className="grid gap-14 lg:grid-cols-[1fr_1.2fr] lg:gap-[10%]">
          <div>
            <h2 className={sectionTitle}>{content.emailTitle}</h2>
            <a
              href={`mailto:${content.email}`}
              className="mt-6 inline-block text-[21px] underline decoration-ink/30 underline-offset-4 hover:decoration-ink"
            >
              {content.email}
            </a>
            <p className="mt-4 max-w-md text-[15px] leading-[1.6] text-muted">
              {content.emailNote}
            </p>
          </div>
          <div>
            <h2 className="text-[28px] leading-[1.2] tracking-[-0.025em]">
              {content.formTitle}
            </h2>
            <p className="my-7 rounded-[10px] border border-control p-4 text-[15px] leading-[1.6] text-muted">
              {content.formNote}
            </p>
            <EnquiryForm
              definition={content.form}
              label="Kontaktformular — forhåndsvisning"
            />
          </div>
        </div>
      </Section>
    </>
  );
}
