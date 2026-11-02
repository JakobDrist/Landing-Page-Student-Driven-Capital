import { JournalPage } from "@/components/pages/journal-page";
import { pageMetadata } from "@/lib/metadata";
export const metadata = pageMetadata("/insights");
export default function Page() {
  return <JournalPage />;
}
