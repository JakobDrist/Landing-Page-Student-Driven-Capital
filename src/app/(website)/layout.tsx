import { SiteHeader } from "@/components/site/site-header";
import { SiteFooter } from "@/components/site/site-footer";
import { site } from "@/content/data";

export default function WebsiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <SiteHeader
        navigation={site.navigation}
        brand={site.brand}
        copyright={site.copyright}
      />
      <main>{children}</main>
      <SiteFooter />
    </>
  );
}
