import type { CompanySummary } from "@/content/types";
import { CompanyCard } from "@/components/cards/company-card";
export function CompanyGrid({ companies }: { companies: CompanySummary[] }) {
  return (
    <div className="grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-4">
      {companies.map((company) => (
        <CompanyCard key={company.slug} company={company} />
      ))}
    </div>
  );
}
