import { home } from "@/content/data";
import { Section } from "./section";
import { ButtonLink } from "@/components/ui/button-link";
import { sectionTitle, leadText } from "@/components/ui/section-heading";
import { DepartmentList } from "@/features/organisation/department-list";
export function OrganisationSection() {
  const { organisation } = home;
  return (
    <Section id="organisation">
      <div className="grid gap-14 lg:grid-cols-[1fr_1.6fr] lg:gap-[8%]">
        <div className="lg:sticky lg:top-28 lg:self-start">
          <p className="text-[13px] tracking-[-0.01em] text-muted">
            {organisation.label}
          </p>
          <h2 className={`${sectionTitle} mt-6`}>{organisation.title}</h2>
          <p className={`${leadText} mt-6 max-w-md text-muted`}>
            {organisation.description}
          </p>
          <p className="mt-8 text-[13px] text-muted">{organisation.note}</p>
        </div>
        <DepartmentList departments={organisation.departments} />
      </div>
      <div className="mt-20 flex flex-col gap-8 md:mt-28 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex flex-col gap-4 md:flex-row md:items-baseline md:gap-10">
          <h3 className="shrink-0 text-[13px] text-muted">
            {organisation.criteriaTitle}
          </h3>
          <ul className="flex flex-wrap gap-x-3 gap-y-1 text-[20px] leading-[1.4] tracking-[-0.02em] md:text-[24px]">
            {organisation.criteria.map((criterion, index) => (
              <li key={criterion} className="flex items-baseline gap-3">
                {criterion}
                {index < organisation.criteria.length - 1 && (
                  <span aria-hidden="true" className="text-control">
                    /
                  </span>
                )}
              </li>
            ))}
          </ul>
        </div>
        <ButtonLink href={organisation.action.href} variant="dark">
          {organisation.action.label}
        </ButtonLink>
      </div>
    </Section>
  );
}
