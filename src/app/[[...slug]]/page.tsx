import type { Metadata } from "next";
import { readFile } from "node:fs/promises";
import path from "node:path";
import { cache } from "react";
import { notFound } from "next/navigation";
import { NorthwoodWebsite } from "@/components/templates/northwood/northwood-website";
import type { NorthwoodPageData } from "@/components/templates/northwood/types";
import pages from "../../../public/templates/northwood/data/pages.json";

type PageProps = { params: Promise<{ slug?: string[] }> };

const getPage = cache(async (pathname: string) => {
  const entry = pages.find((page) => page.path === pathname);
  if (!entry) notFound();

  const content = await readFile(
    path.join(process.cwd(), "public/templates/northwood/data", `${entry.file}.json`),
    "utf8",
  );
  return { entry, data: JSON.parse(content) as NorthwoodPageData };
});

export const dynamicParams = false;

export function generateStaticParams() {
  return pages.map((page) => ({ slug: page.path.split("/").filter(Boolean) }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug = [] } = await params;
  const { data } = await getPage(`/${slug.join("/")}`);
  return { title: data.title };
}

export default async function Page({ params }: PageProps) {
  const { slug = [] } = await params;
  const { entry, data } = await getPage(`/${slug.join("/")}`);

  return (
    <>
      <link rel="stylesheet" href={`/templates/northwood/styles/${entry.file}.css`} />
      <NorthwoodWebsite key={data.path} page={data} basePath="" />
    </>
  );
}
