import membership from "@/content/data/membership.json";
import { PageHeader } from "@/components/sections/page-header";
import { Section } from "@/components/sections/section";
import { leadText, sectionTitle } from "@/components/ui/section-heading";
import { EnquiryForm } from "@/features/forms/enquiry-form";
import { DepartmentList } from "@/features/organisation/department-list";

export function MembershipPage() {
  return (
    <>
      <PageHeader
        title={membership.title}
        description={membership.description}
      />

      <Section id="departments" className="scroll-mt-20">
        <div className="grid gap-14 lg:grid-cols-[1fr_1.6fr] lg:gap-[8%]">
          <div className="lg:sticky lg:top-28 lg:self-start">
            <p className="text-[13px] text-muted">Hvor kan du bidrage?</p>
            <h2 className={`${sectionTitle} mt-6`}>
              {membership.departmentsTitle}
            </h2>
            <p className={`${leadText} mt-6 max-w-md text-muted`}>
              {membership.departmentsIntro}
            </p>
            <p className="mt-8 text-[14px] leading-[1.6] text-muted">
              {membership.extraRolesNote}
            </p>
          </div>
          <DepartmentList departments={membership.departments} extended />
        </div>
      </Section>

      <Section className="bg-white">
        <div className="grid gap-12 lg:grid-cols-[1fr_1.2fr] lg:gap-[10%]">
          <div>
            <p className="text-[13px] text-muted">Hvad får du ud af arbejdet?</p>
            <h2 className={`${sectionTitle} mt-6`}>{membership.valueTitle}</h2>
          </div>
          <p className={`${leadText} text-muted`}>{membership.valueIntro}</p>
        </div>
        <div className="mt-14 grid gap-x-10 gap-y-10 md:grid-cols-3">
          {membership.benefits.map((benefit, index) => (
            <article key={benefit.title} className="border-t border-line pt-6">
              <span className="text-[13px] tabular-nums text-muted">
                0{index + 1}
              </span>
              <h3 className="mt-5 text-[24px] leading-[1.2] tracking-[-0.025em]">
                {benefit.title}
              </h3>
              <p className="mt-4 max-w-xl text-[17px] leading-[1.6] text-muted">
                {benefit.text}
              </p>
            </article>
          ))}
        </div>
      </Section>

      <Section className="bg-white">
        <div className="grid gap-12 lg:grid-cols-[1fr_1.2fr] lg:gap-[10%]">
          <div>
            <p className="text-[13px] text-muted">Optagelse og ansvar</p>
            <h2 className={`${sectionTitle} mt-6`}>
              {membership.selectionTitle}
            </h2>
          </div>
          <p className={`${leadText} text-muted`}>
            {membership.selectionIntro}
          </p>
        </div>
        <ol className="mt-14 grid gap-x-10 gap-y-10 md:grid-cols-3">
          {membership.selectionSteps.map((step, index) => (
            <li key={step.title} className="border-t border-line pt-6">
              <span className="text-[13px] tabular-nums text-muted">
                0{index + 1}
              </span>
              <h3 className="mt-5 text-[24px] leading-[1.2] tracking-[-0.025em]">
                {step.title}
              </h3>
              <p className="mt-4 text-[17px] leading-[1.6] text-muted">
                {step.text}
              </p>
            </li>
          ))}
        </ol>
        <div className="mt-14 border-t border-line pt-8">
          <h3 className="text-[22px] leading-[1.2] tracking-[-0.025em]">
            {membership.expectationsTitle}
          </h3>
          <div className="mt-7 grid gap-x-8 gap-y-6 sm:grid-cols-2 xl:grid-cols-4">
            {membership.expectations.map((expectation) => (
              <div key={expectation.title}>
                <h4 className="text-[18px] leading-[1.3]">
                  {expectation.title}
                </h4>
                <p className="mt-2 text-[15px] leading-[1.6] text-muted">
                  {expectation.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </Section>

      <Section id="membership-form" className="scroll-mt-20">
        <div className="grid gap-14 lg:grid-cols-[1fr_1.2fr] lg:gap-[10%]">
          <aside>
            <p className="text-[13px] text-muted">Medlemskab og interesse</p>
            <h2 className={`${sectionTitle} mt-6`}>{membership.applyTitle}</h2>
            <p className={`${leadText} mt-6 max-w-lg text-muted`}>
              {membership.applyIntro}
            </p>
            <p className="mt-6 max-w-lg rounded-[10px] border border-control p-5 text-[15px] leading-[1.6] text-muted">
              {membership.applyNote}
            </p>
          </aside>
          <div>
            <EnquiryForm
              definition={membership.form}
              label="Medlemsformular — forhåndsvisning"
            />
          </div>
        </div>
      </Section>
    </>
  );
}
