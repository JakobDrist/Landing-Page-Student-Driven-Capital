import { notFound } from "next/navigation";
import { JournalPage } from "@/components/pages/journal-page";
import { pageMetadata } from "@/lib/metadata";
const categories = ["essays", "letters", "playbooks", "news"] as const;
type Props = { params: Promise<{ slug: string }> };
export const dynamicParams = false;
export function generateStaticParams() {
  return categories.map((slug) => ({ slug }));
}
export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  return pageMetadata(`/insights/category/${slug}`);
}
export default async function Page({ params }: Props) {
  const { slug } = await params;
  const category = categories.find((category) => category === slug);
  if (!category) notFound();
  return <JournalPage category={category} />;
}
