import { MembershipPage } from "@/components/pages/membership-page";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata("/membership");

export default function Page() {
  return <MembershipPage />;
}
