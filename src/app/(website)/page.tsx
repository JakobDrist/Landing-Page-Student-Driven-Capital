import { HomePage } from "@/components/pages/home-page";
import { pageMetadata } from "@/lib/metadata";
export const metadata = pageMetadata("/");
export default function Page() {
  return <HomePage />;
}
