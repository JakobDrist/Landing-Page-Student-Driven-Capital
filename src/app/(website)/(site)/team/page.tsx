import { TeamPage } from "@/components/pages/team-page";
import { pageMetadata } from "@/lib/metadata";
export const metadata = pageMetadata("/team");
export default function Page() {
  return <TeamPage />;
}
