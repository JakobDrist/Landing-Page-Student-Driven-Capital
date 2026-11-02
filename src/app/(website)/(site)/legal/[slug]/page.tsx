import { notFound } from "next/navigation";
import { LegalPage } from "@/components/pages/legal-page";
import { pageMetadata } from "@/lib/metadata";
const slugs = ["privacy", "terms", "disclosures"] as const;
type Props = { params: Promise<{ slug: string }> };
export const dynamicParams = false;
export function generateStaticParams() {
  return slugs.map((slug) => ({ slug }));
}
export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  return pageMetadata(`/legal/${slug}`);
}
export default async function Page({ params }: Props) {
  const { slug } = await params;
  if (slug !== "privacy" && slug !== "terms" && slug !== "disclosures")
    notFound();
  return <LegalPage slug={slug} />;
}
