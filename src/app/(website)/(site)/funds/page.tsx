import { FundsPage } from "@/components/pages/funds-page";
import { pageMetadata } from "@/lib/metadata";
export const metadata = pageMetadata("/funds");
export default function Page() {
  return <FundsPage />;
}
