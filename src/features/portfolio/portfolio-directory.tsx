"use client";
import type { CompanySummary } from "@/content/types";
import { CompanyCard } from "@/components/cards/company-card";
import { PortfolioProvider, usePortfolio } from "./portfolio-provider";
import { PortfolioFilters } from "./portfolio-filters";
function CompanyResults() {
  const { visible, view } = usePortfolio();
  return (
    <div
      className={`grid grid-cols-1 gap-3 ${view === "list" ? "md:gap-0" : "md:grid-cols-2 lg:grid-cols-4"}`}
    >
      {visible.map((company) => (
        <CompanyCard
          key={company.slug}
          company={company}
          list={view === "list"}
        />
      ))}
    </div>
  );
}
export function PortfolioDirectory({
  companies,
}: {
  companies: CompanySummary[];
}) {
  return (
    <PortfolioProvider companies={companies}>
      <PortfolioFilters />
      <CompanyResults />
    </PortfolioProvider>
  );
}
