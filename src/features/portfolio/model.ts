import type { CompanySummary } from "@/content/types";
export type Company = CompanySummary;
export interface PortfolioFiltersState {
  sector: string;
  stage: string;
  status: string;
  query: string;
}
export const emptyFilters: PortfolioFiltersState = {
  sector: "",
  stage: "",
  status: "all",
  query: "",
};
export function matchesCompany(
  company: Company,
  filters: PortfolioFiltersState,
  skip?: "sector" | "stage",
): boolean {
  return (
    (skip === "sector" ||
      !filters.sector ||
      company.sector === filters.sector) &&
    (skip === "stage" || !filters.stage || company.stage === filters.stage) &&
    (filters.status === "all" ||
      (filters.status === "active") === company.active) &&
    filters.query
      .trim()
      .toLowerCase()
      .split(/\s+/)
      .every((word) => company.searchText.includes(word))
  );
}
