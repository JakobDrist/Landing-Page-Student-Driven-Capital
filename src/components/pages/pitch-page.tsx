import { pages } from "@/content/data";
import { PageHeader } from "@/components/sections/page-header";
import { Container } from "@/components/ui/container";
import { sectionTitle } from "@/components/ui/section-heading";
import { Icon } from "@/components/ui/icon";
import { EnquiryForm } from "@/features/forms/enquiry-form";
import { Section } from "@/components/sections/section";
export function PitchPage() {
  return (
    <>
      <PageHeader {...pages.pitch} />
      <Container>
        <div className="grid gap-14 lg:grid-cols-[1fr_1.2fr] lg:gap-[10%]">
          <aside id="criteria">
            <h2 className="text-[24px] leading-[1.25] tracking-[-0.015em]">
              What we look for
            </h2>
            <div className="mt-8 space-y-8">
              {pages.pitch.criteria.map((item) => (
                <div key={item.title}>
                  <h3 className="text-[20px] leading-[1.3]">{item.title}</h3>
                  <p className="mt-3 max-w-lg text-[17px] leading-[1.6] text-muted">
                    {item.text}
                  </p>
                </div>
              ))}
            </div>
            <section className="mt-14">
              <h2 className="text-[24px] leading-[1.25] tracking-[-0.015em]">
                {pages.pitch.stepsTitle}
              </h2>
              <ol className="mt-8 space-y-8">
                {pages.pitch.steps.map((step) => (
                  <li key={step.number} className="flex gap-4">
                    <span className="grid size-7 shrink-0 place-items-center rounded-full border border-control text-[13px]">
                      {step.number}
                    </span>
                    <div>
                      <h3 className="text-[18px] leading-[1.4]">
                        {step.title}
                      </h3>
                      <p className="mt-1 text-[13px] text-muted">
                        {step.timing}
                      </p>
                      <p className="mt-3 text-[15px] leading-6 text-muted">
                        {step.body}
                      </p>
                    </div>
                  </li>
                ))}
              </ol>
            </section>
          </aside>
          <EnquiryForm definition={pages.pitch.form} />
        </div>
      </Container>
      <Section>
        <div className="grid gap-12 lg:grid-cols-2">
          <h2 className={`${sectionTitle} max-w-lg`}>Questions founders ask</h2>
          <ul>
            {pages.pitch.questions.map((question) => (
              <li
                key={question}
                className="flex items-center justify-between gap-6 border-t border-line py-7 text-[20px] leading-[1.4]"
              >
                {question}
                <Icon path="M12 5v14M5 12h14" className="shrink-0" />
              </li>
            ))}
          </ul>
        </div>
      </Section>
    </>
  );
}
