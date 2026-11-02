import { articles, articleSummary, selectBySlug } from "@/content/data";
import type { ContentLink } from "@/content/types";
import { ArticleCard } from "@/components/cards/article-card";
import { Section } from "./section";
import { SectionHeading } from "@/components/ui/section-heading";
export function JournalSection({
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
      <div className="mt-12 grid grid-cols-1 gap-x-6 gap-y-14 md:mt-16 md:grid-cols-2 lg:grid-cols-3">
        {selectBySlug(articles, items).map((article) => (
          <ArticleCard key={article.slug} article={articleSummary(article)} />
        ))}
      </div>
    </Section>
  );
}
