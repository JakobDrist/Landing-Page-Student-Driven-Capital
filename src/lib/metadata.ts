import type { Metadata } from "next";
import routes from "@/content/routes.json";
export function pageMetadata(pathname: string): Metadata {
  return {
    title:
      routes.find((route) => route.path === pathname)?.metadataTitle ??
      "DSD Invest",
  };
}
