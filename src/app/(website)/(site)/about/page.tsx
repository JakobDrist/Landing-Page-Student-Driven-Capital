import { AboutPage } from "@/components/pages/about-page";
import { pageMetadata } from "@/lib/metadata";
// Paused: not linked from the site and kept out of search results until the
// page is reworked. Remove `robots` and add the links back to bring it back.
export const metadata = {
  ...pageMetadata("/about"),
  robots: { index: false, follow: false },
};
export default function Page() {
  return <AboutPage />;
}
