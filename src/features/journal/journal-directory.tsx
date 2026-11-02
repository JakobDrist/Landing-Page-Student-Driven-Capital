"use client";
import Link from "next/link";
import { useState } from "react";
import type { ArticleSummary, ContentLink } from "@/content/types";
import { ArticleCard } from "@/components/cards/article-card";
import { InsightSearch } from "./insight-search";
export function JournalDirectory({
  articles,
  lead,
  extra = [],
  tabs,
  currentPath,
  emptyMessage,
}: {
  articles: ArticleSummary[];
  lead?: ArticleSummary;
  extra?: ArticleSummary[];
  tabs: ContentLink[];
  currentPath: string;
  emptyMessage: string;
}) {
  const [query, setQuery] = useState("");
  const [loaded, setLoaded] = useState(false);
  const matches = (article: ArticleSummary) =>
    query
      .trim()
      .toLowerCase()
      .split(/\s+/)
      .every((word) =>
        `${article.category} ${article.date} ${article.title} ${article.description} ${article.byline}`
          .toLowerCase()
          .includes(word),
      );
  const visible = (loaded ? [...articles, ...extra] : articles).filter(matches);
  const showLead = lead && matches(lead);
  return (
    <>
      <div className="mb-12 flex flex-col justify-between gap-6 border-b border-line pb-5 md:flex-row md:items-center">
        <nav
          className="flex flex-wrap gap-x-6 gap-y-3"
          aria-label="Article categories"
        >
          {tabs.map((tab) => (
            <Link
              key={tab.href}
              href={tab.href}
              aria-current={currentPath === tab.href ? "page" : undefined}
              className="border-b border-transparent pb-1 text-[15px] text-muted transition-colors hover:text-ink aria-[current=page]:border-ink aria-[current=page]:text-ink"
            >
              {tab.label}
            </Link>
          ))}
        </nav>
        <InsightSearch query={query} onChange={setQuery} />
      </div>
      {showLead && (
        <div className="mb-16">
          <ArticleCard article={lead} featured />
        </div>
      )}
      {visible.length ? (
        <div className="grid grid-cols-1 gap-x-6 gap-y-14 md:grid-cols-2 lg:grid-cols-3">
          {visible.map((article) => (
            <ArticleCard key={article.slug} article={article} />
          ))}
        </div>
      ) : (
        !showLead && (
          <p role="status" className="py-16 text-center text-[20px] text-muted">
            {emptyMessage}
          </p>
        )
      )}
      {!loaded && !!extra.length && !query && (
        <div className="mt-16 text-center">
          <button
            type="button"
            onClick={() => setLoaded(true)}
            className="h-[46px] cursor-pointer rounded-[10px] px-[18px] text-[15px] shadow-[inset_0_0_0_1px_#bdbdb8] transition-shadow hover:shadow-[inset_0_0_0_1px_#121212]"
          >
            Load More
          </button>
        </div>
      )}
    </>
  );
}
