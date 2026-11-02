import { pages } from "@/content/data";
import { PageHeader } from "@/components/sections/page-header";
import { Container } from "@/components/ui/container";
import { ArrowLink } from "@/components/ui/button-link";
import { EnquiryForm } from "@/features/forms/enquiry-form";
import { OfficesSection } from "@/components/sections/offices-section";
export function ContactPage() {
  return (
    <>
      <PageHeader {...pages.contact} />
      <Container className="pb-20 md:pb-25 lg:pb-29 xl:pb-34">
        <div className="grid gap-14 lg:grid-cols-[1fr_1.2fr] lg:gap-[10%]">
          <div className="space-y-10">
            {pages.contact.inboxes.map((inbox) => (
              <div key={inbox.title}>
                <h2 className="text-[24px] leading-[1.25] tracking-[-0.015em]">
                  {inbox.title}
                </h2>
                <p className="mt-2 text-[17px] leading-[1.6] text-muted">
                  {inbox.description}
                </p>
                <p className="mt-4 text-[17px]">
                  <a href={`mailto:${inbox.email}`}>{inbox.email}</a>
                </p>
                {inbox.links
                  .filter((link) => !link.href.startsWith("mailto:"))
                  .map((link) => (
                    <ArrowLink
                      key={link.href}
                      href={link.href}
                      className="mt-4"
                    >
                      {link.label}
                    </ArrowLink>
                  ))}
              </div>
            ))}
          </div>
          <EnquiryForm definition={pages.contact.form} />
        </div>
      </Container>
      <OfficesSection />
    </>
  );
}
