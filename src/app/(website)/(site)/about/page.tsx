import { AboutPage } from "@/components/pages/about-page";
import { pageMetadata } from "@/lib/metadata";
export const metadata = pageMetadata("/about");
export default function Page() {
  return <AboutPage />;
}
