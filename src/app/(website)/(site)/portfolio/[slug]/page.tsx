import { notFound } from "next/navigation";
import { companies } from "@/content/data";
import { CompanyPage } from "@/components/pages/company-page";
import { pageMetadata } from "@/lib/metadata";
type Props = { params: Promise<{ slug: string }> };
export const dynamicParams = false;
export function generateStaticParams() {
  return companies.map((item) => ({ slug: item.slug }));
}
export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  return pageMetadata(`/portfolio/${slug}`);
}
export default async function Page({ params }: Props) {
  const { slug } = await params;
  const company = companies.find((item) => item.slug === slug);
  if (!company) notFound();
  return <CompanyPage company={company} />;
}
