import { SectorsPage } from "@/components/pages/sectors-page";
import { pageMetadata } from "@/lib/metadata";
export const metadata = pageMetadata("/sectors");
export default function Page() {
  return <SectorsPage />;
}
