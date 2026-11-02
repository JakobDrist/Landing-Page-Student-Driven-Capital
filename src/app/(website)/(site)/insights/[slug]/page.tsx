import { notFound } from "next/navigation";
import { articles } from "@/content/data";
import { ArticlePage } from "@/components/pages/article-page";
import { pageMetadata } from "@/lib/metadata";
type Props = { params: Promise<{ slug: string }> };
export const dynamicParams = false;
export function generateStaticParams() {
  return articles.map((item) => ({ slug: item.slug }));
}
export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  return pageMetadata(`/insights/${slug}`);
}
export default async function Page({ params }: Props) {
  const { slug } = await params;
  const article = articles.find((item) => item.slug === slug);
  if (!article) notFound();
  return <ArticlePage article={article} />;
}
