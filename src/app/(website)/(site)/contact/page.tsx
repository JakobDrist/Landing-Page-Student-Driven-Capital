import { ContactPage } from "@/components/pages/contact-page";
import { pageMetadata } from "@/lib/metadata";
export const metadata = pageMetadata("/contact");
export default function Page() {
  return <ContactPage />;
}
