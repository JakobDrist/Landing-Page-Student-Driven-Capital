import type { ArticleCategory } from "@/content/types";
import { articles, articleSummary, pages, selectBySlug } from "@/content/data";
import { PageHeader } from "@/components/sections/page-header";
import { Container } from "@/components/ui/container";
import { JournalDirectory } from "@/features/journal/journal-directory";
export function JournalPage({ category }: { category?: ArticleCategory }) {
  const content = category ? pages[`insights/${category}`] : pages.insights;
  const lead = category
    ? undefined
    : articles.find((article) => article.slug === pages.insights.lead);
  const items = selectBySlug(articles, content.items).map(articleSummary);
  const extra = category
    ? []
    : articles
        .filter(
          (article) =>
            !content.items.includes(article.slug) &&
            article.slug !== lead?.slug,
        )
        .map(articleSummary);
  return (
    <>
      <PageHeader {...content} />
      <Container className="pb-20 md:pb-25 lg:pb-29 xl:pb-34">
        <JournalDirectory
          articles={items}
          lead={lead ? articleSummary(lead) : undefined}
          extra={extra}
          tabs={pages.insights.tabs}
          currentPath={
            category ? `/insights/category/${category}` : "/insights"
          }
          emptyMessage={pages.insights.emptyMessage}
        />
      </Container>
    </>
  );
}
