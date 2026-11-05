"use client";

import type { CSSProperties } from "react";
import { Icon, searchIcon } from "@/components/ui/icon";
import { emptyFilters, matchesCompany } from "./model";
import { usePortfolio } from "./portfolio-provider";

const field = "grid min-w-0 gap-1.5 m-0 border-0 p-0";
const label = "text-[13px] leading-[1.35] tracking-[-0.01em] text-muted p-0";
const control =
  "h-12 w-full min-w-0 rounded-[10px] border-0 bg-white text-[16px] font-normal leading-[1.25] tracking-[-0.01em] text-ink shadow-[inset_0_0_0_1px_var(--color-control)] outline-none transition-shadow duration-200 focus-visible:shadow-[inset_0_0_0_1.5px_var(--color-ink)]";
const sectors = [
  "Fintech",
  "Klima",
  "Sundhed",
  "Infrastruktur",
  "Software",
  "Industri",
];
const stages = ["Pre-seed", "Seed", "Series A", "Series B", "Growth"];

export function PortfolioFilters({ style }: { style?: CSSProperties }) {
  const { companies, filters, setFilters, visible, view, setView } =
    usePortfolio();
  const count = (key: "sector" | "stage", value: string) =>
    companies.filter(
      (company) =>
        company[key] === value && matchesCompany(company, filters, key),
    ).length;
  return (
    <div
      style={style}
      className="w-full font-sans text-ink"
      data-portfolio-filters=""
    >
      <form
        className="grid grid-cols-1 gap-4 pb-8 sm:grid-cols-2 lg:grid-cols-[1fr_1fr_auto_1.3fr]"
        role="search"
        aria-label="Filter the portfolio"
        onSubmit={(event) => event.preventDefault()}
      >
        <label className={field}>
          <span className={label}>Sector</span>
          <span className="relative">
            <select
              className={`${control} cursor-pointer appearance-none pr-10 pl-[15px]`}
              value={filters.sector}
              onChange={(event) =>
                setFilters({ ...filters, sector: event.target.value })
              }
            >
              <option value="">All sectors</option>
              {sectors.map((value) => (
                <option key={value} value={value}>
                  {value} ({count("sector", value)})
                </option>
              ))}
            </select>
            <Icon
              path="m6 9 6 6 6-6"
              className="pointer-events-none absolute top-4 right-[14px]"
            />
          </span>
        </label>
        <label className={field}>
          <span className={label}>First investment</span>
          <span className="relative">
            <select
              className={`${control} cursor-pointer appearance-none pr-10 pl-[15px]`}
              value={filters.stage}
              onChange={(event) =>
                setFilters({ ...filters, stage: event.target.value })
              }
            >
              <option value="">All stages</option>
              {stages
                .filter((value) =>
                  companies.some((company) => company.stage === value),
                )
                .map((value) => (
                  <option key={value} value={value}>
                    {value} ({count("stage", value)})
                  </option>
                ))}
            </select>
            <Icon
              path="m6 9 6 6 6-6"
              className="pointer-events-none absolute top-4 right-[14px]"
            />
          </span>
        </label>
        <fieldset className={field}>
          <legend className={`${label} mb-1.5`}>Status</legend>
          <div className="flex h-12 w-max rounded-full p-[3px] shadow-[inset_0_0_0_1px_var(--color-control)]">
            {["all", "active", "exited"].map((value) => (
              <button
                key={value}
                type="button"
                aria-pressed={filters.status === value}
                onClick={() => setFilters({ ...filters, status: value })}
                className="h-[42px] cursor-pointer rounded-full border-0 bg-transparent px-4 text-[15px] leading-none font-normal tracking-[-0.01em] text-muted transition-colors duration-200 hover:text-ink aria-pressed:bg-brand aria-pressed:text-white"
              >
                {value[0].toUpperCase() + value.slice(1)}
              </button>
            ))}
          </div>
        </fieldset>
        <label className={field}>
          <span className={label}>Search</span>
          <span className="relative">
            <Icon
              path={searchIcon}
              className="pointer-events-none absolute top-4 left-[14px]"
            />
            <input
              className={`${control} pr-[15px] pl-10 placeholder:text-muted`}
              type="search"
              placeholder="Company or keyword"
              value={filters.query}
              onChange={(event) =>
                setFilters({ ...filters, query: event.target.value })
              }
            />
          </span>
        </label>
      </form>
      <div className="mb-6 flex min-h-10 items-center justify-between gap-4 border-b border-line pb-4">
        <p
          className="m-0 text-[13px] leading-[1.35] text-muted"
          aria-live="polite"
        >
          {visible.length} {visible.length === 1 ? "company" : "companies"}
        </p>
        <div
          className="flex gap-1 max-md:hidden"
          role="group"
          aria-label="View"
        >
          {(["grid", "list"] as const).map((value) => (
            <button
              key={value}
              type="button"
              aria-label={`${value === "grid" ? "Grid" : "List"} view`}
              aria-pressed={view === value}
              onClick={() => setView(value)}
              className="grid size-10 cursor-pointer place-items-center rounded-full border-0 bg-transparent text-muted aria-pressed:bg-selected aria-pressed:text-ink"
            >
              <Icon
                path={
                  value === "grid"
                    ? "M3 3h7v7H3zM14 3h7v7h-7zM14 14h7v7h-7zM3 14h7v7H3z"
                    : "M3 6h.01M8 6h13M3 12h.01M8 12h13M3 18h.01M8 18h13"
                }
              />
            </button>
          ))}
        </div>
      </div>
      {visible.length === 0 && (
        <p className="py-12 text-center text-[17px] text-muted">
          No companies match these filters.
          <button
            type="button"
            className="ml-1.5 cursor-pointer border-0 bg-transparent p-0 text-ink underline underline-offset-[0.2em]"
            onClick={() => setFilters(emptyFilters)}
          >
            Clear filters
          </button>
        </p>
      )}
    </div>
  );
}
