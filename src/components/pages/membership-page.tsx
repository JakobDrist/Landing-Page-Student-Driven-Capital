import membership from "@/content/data/membership.json";
import { PageHeader } from "@/components/sections/page-header";
import { Section } from "@/components/sections/section";
import { EnquiryForm } from "@/features/forms/enquiry-form";

export function MembershipPage() {
  return (
    <>
      <PageHeader
        title={membership.title}
        description={membership.description}
      />
      <Section>
        <div className="grid gap-14 lg:grid-cols-[1fr_1.2fr] lg:gap-[10%]">
          <aside>
            <h2 className="text-[28px] leading-[1.2] tracking-[-0.025em]">
              {membership.introTitle}
            </h2>
            <p className="mt-6 text-[17px] leading-[1.6] text-muted">
              {membership.intro}
            </p>
            <div className="mt-10 space-y-8">
              {membership.criteria.map((item) => (
                <div key={item.title}>
                  <h3 className="text-[20px] leading-[1.3]">{item.title}</h3>
                  <p className="mt-3 text-[17px] leading-[1.6] text-muted">
                    {item.text}
                  </p>
                </div>
              ))}
            </div>
          </aside>
          <div id="membership-form" className="scroll-mt-28">
            <EnquiryForm definition={membership.form} label="Medlemsformular" />
          </div>
        </div>
      </Section>
    </>
  );
}
