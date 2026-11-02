"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  useSyncExternalStore,
  type ReactNode,
} from "react";
import {
  emptyFilters,
  matchesCompany,
  type Company,
  type PortfolioFiltersState,
} from "./model";

const viewKey = "student-capital:portfolio-view";
const viewEvent = "student-capital:portfolio-view-change";
function subscribeUrl(notify: () => void) {
  window.addEventListener("popstate", notify);
  window.addEventListener("hashchange", notify);
  return () => {
    window.removeEventListener("popstate", notify);
    window.removeEventListener("hashchange", notify);
  };
}
function subscribeView(notify: () => void) {
  window.addEventListener(viewEvent, notify);
  window.addEventListener("storage", notify);
  return () => {
    window.removeEventListener(viewEvent, notify);
    window.removeEventListener("storage", notify);
  };
}
function getSavedView(): "grid" | "list" {
  try {
    return sessionStorage.getItem(viewKey) === "list" ? "list" : "grid";
  } catch {
    return "grid";
  }
}
function filtersFromUrl(
  url: string,
  companies: Company[],
): PortfolioFiltersState {
  const [search, hash] = url.split("\n");
  const params = new URLSearchParams(search);
  const status = params.get("status") || hash?.slice(1) || "all";
  return {
    ...emptyFilters,
    query: params.get("q") || "",
    sector:
      companies.find(
        (company) =>
          company.sector.toLowerCase() === params.get("sector")?.toLowerCase(),
      )?.sector || "",
    status: ["active", "exited"].includes(status) ? status : "all",
  };
}

interface PortfolioContextValue {
  companies: Company[];
  filters: PortfolioFiltersState;
  setFilters: (filters: PortfolioFiltersState) => void;
  visible: Company[];
  view: "grid" | "list";
  setView: (view: "grid" | "list") => void;
}
const PortfolioContext = createContext<PortfolioContextValue | null>(null);

export function PortfolioProvider({
  companies,
  children,
}: {
  companies: Company[];
  children: ReactNode;
}) {
  const url = useSyncExternalStore(
    subscribeUrl,
    () => location.search + "\n" + location.hash,
    () => "",
  );
  const savedView = useSyncExternalStore(
    subscribeView,
    getSavedView,
    () => "grid" as const,
  );
  const [selectedView, selectView] = useState<"grid" | "list" | null>(null);
  const [selectedFilters, setFilters] = useState<PortfolioFiltersState | null>(
    null,
  );
  const filters = selectedFilters ?? filtersFromUrl(url, companies);
  useEffect(() => {
    const onHashChange = () => {
      const nextStatus = location.hash.slice(1);
      if (!["active", "exited"].includes(nextStatus)) return;
      setFilters((current) => ({
        ...(current ??
          filtersFromUrl(location.search + "\n" + location.hash, companies)),
        status: nextStatus,
      }));
    };
    window.addEventListener("hashchange", onHashChange);
    return () => window.removeEventListener("hashchange", onHashChange);
  }, [companies]);

  function setView(view: "grid" | "list") {
    selectView(view);
    try {
      sessionStorage.setItem(viewKey, view);
      window.dispatchEvent(new Event(viewEvent));
    } catch {
      /* In-memory selection works when storage is unavailable. */
    }
  }
  return (
    <PortfolioContext
      value={{
        companies,
        filters,
        setFilters,
        visible: companies.filter((company) =>
          matchesCompany(company, filters),
        ),
        view: selectedView ?? savedView,
        setView,
      }}
    >
      {children}
    </PortfolioContext>
  );
}

export function usePortfolio() {
  const value = useContext(PortfolioContext);
  if (!value) throw new Error("Portfolio components require PortfolioProvider");
  return value;
}
