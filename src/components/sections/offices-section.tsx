import { pages } from "@/content/data";
import { Section } from "./section";
import { sectionTitle } from "@/components/ui/section-heading";
import { ArrowLink } from "@/components/ui/button-link";
export function OfficesSection({
  contactLink = false,
}: {
  contactLink?: boolean;
}) {
  return (
    <Section className="bg-white">
      <div className="flex flex-wrap items-center justify-between gap-6">
        <h2 className={sectionTitle}>Kontorer</h2>
        {contactLink && <ArrowLink href="/contact">Kontakt os</ArrowLink>}
      </div>
      <div className="mt-14 grid gap-12 md:grid-cols-3">
        {pages.offices.map((office) => (
          <address key={office.city} className="not-italic">
            <h3 className="text-[28px] leading-[1.2] tracking-[-0.025em]">
              {office.city}
            </h3>
            <div className="mt-6 text-[17px] leading-[1.6] text-muted">
              {office.address.map((line) => (
                <p key={line}>{line}</p>
              ))}
            </div>
            <p className="mt-5 text-[15px] text-muted">{office.phone}</p>
          </address>
        ))}
      </div>
    </Section>
  );
}
