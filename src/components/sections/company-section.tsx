import { companies, companySummary, selectBySlug } from "@/content/data";
import type { ContentLink } from "@/content/types";
import { Section } from "./section";
import { SectionHeading } from "@/components/ui/section-heading";
import { CompanyGrid } from "./company-grid";
export function CompanySection({
  title,
  items,
  action,
}: {
  title: string;
  items: string[];
  action?: ContentLink | null;
}) {
  if (!items.length) return null;
  return (
    <Section>
      <SectionHeading title={title} action={action} />
      <div className="mt-12 md:mt-16">
        <CompanyGrid
          companies={selectBySlug(companies, items).map(companySummary)}
        />
      </div>
    </Section>
  );
}
