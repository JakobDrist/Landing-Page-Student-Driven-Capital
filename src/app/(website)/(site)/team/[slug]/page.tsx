import { notFound } from "next/navigation";
import { people } from "@/content/data";
import { PersonPage } from "@/components/pages/person-page";
import { pageMetadata } from "@/lib/metadata";
type Props = { params: Promise<{ slug: string }> };
export const dynamicParams = false;
export function generateStaticParams() {
  return people.map((item) => ({ slug: item.slug }));
}
export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  return pageMetadata(`/team/${slug}`);
}
export default async function Page({ params }: Props) {
  const { slug } = await params;
  const person = people.find((item) => item.slug === slug);
  if (!person) notFound();
  return <PersonPage person={person} />;
}
