import "server-only";
import companyData from "./data/companies.json";
import peopleData from "./data/people.json";
import sectorData from "./data/sectors.json";
import articleData from "./data/articles.json";
import type {
  Article,
  ArticleSummary,
  Company,
  CompanySummary,
  Person,
  Sector,
} from "./types";
export { default as home } from "./data/home.json";
export { default as site } from "./data/site.json";
export { default as pages } from "./data/pages.json";

export const companies = companyData as Company[];
export const people = peopleData as Person[];
export const sectors = sectorData as Sector[];
export const articles = articleData as Article[];

export function companySummary(company: Company): CompanySummary {
  const {
    slug,
    name,
    href,
    logo,
    tagline,
    sector,
    stage,
    firstYear,
    cardStatus,
    active,
  } = company;
  return {
    slug,
    name,
    href,
    logo,
    tagline,
    sector,
    stage,
    firstYear,
    cardStatus,
    active,
    searchText: `${name} ${slug} ${tagline}`.toLowerCase(),
  };
}
export function articleSummary(article: Article): ArticleSummary {
  const {
    slug,
    href,
    title,
    category,
    date,
    description,
    byline,
    cover,
    coverLabel,
  } = article;
  return {
    slug,
    href,
    title,
    category,
    date,
    description,
    byline,
    cover,
    coverLabel,
  };
}

/** Lists deliberately preserve the editorial ordering in the content file. */
export function selectBySlug<T extends { slug: string }>(
  items: T[],
  slugs: string[],
): T[] {
  return slugs.flatMap((slug) => {
    const item = items.find((item) => item.slug === slug);
    return item ? [item] : [];
  });
}
