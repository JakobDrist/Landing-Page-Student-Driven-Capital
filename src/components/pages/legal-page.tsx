import Link from "next/link";
import { pages, site } from "@/content/data";
import type { RichTextBlock } from "@/content/types";
import { Container } from "@/components/ui/container";
import { pageTitle } from "@/components/ui/section-heading";
import { RichText } from "@/components/ui/rich-text";
export function LegalPage({
  slug,
}: {
  slug: "privacy" | "terms" | "disclosures";
}) {
  const content = pages[`legal/${slug}`];
  return (
    <Container className="py-16 md:py-24">
      <div className="mx-auto max-w-[768px]">
        {site.legalLinks.length > 1 && (
          <nav
            aria-label="Juridiske sider"
            className="mb-14 flex flex-wrap gap-6"
          >
            {site.legalLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                aria-current={
                  link.href === `/legal/${slug}` ? "page" : undefined
                }
                className="text-[15px] text-muted underline-offset-4 hover:text-ink aria-[current=page]:text-ink aria-[current=page]:underline"
              >
                {link.label}
              </Link>
            ))}
          </nav>
        )}
        <h1 className={pageTitle}>{content.title}</h1>
        <p className="mt-6 text-[15px] text-muted">{content.updated}</p>
        <RichText className="mt-12" blocks={content.body as RichTextBlock[]} />
      </div>
    </Container>
  );
}
