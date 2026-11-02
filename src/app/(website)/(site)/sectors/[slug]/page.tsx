import { notFound } from "next/navigation";
import { sectors } from "@/content/data";
import { pageMetadata } from "@/lib/metadata";
type Props = { params: Promise<{ slug: string }> };
export const dynamicParams = false;
export function generateStaticParams() {
  return sectors.map((item) => ({ slug: item.slug }));
}
export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  return pageMetadata(`/sectors/${slug}`);
}
// Sector pages are intentionally empty until they are redesigned.
export default async function Page({ params }: Props) {
  const { slug } = await params;
  if (!sectors.some((item) => item.slug === slug)) notFound();
  return null;
}
