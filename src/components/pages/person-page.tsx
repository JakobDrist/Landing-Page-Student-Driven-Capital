import Link from "next/link";
import type { Person } from "@/content/types";
import { Container } from "@/components/ui/container";
import { Media } from "@/components/ui/media";
import { ArrowLink } from "@/components/ui/button-link";
import { sectionTitle } from "@/components/ui/section-heading";
import { RichText } from "@/components/ui/rich-text";
import { CompanySection } from "@/components/sections/company-section";
import { JournalSection } from "@/components/sections/journal-section";
export function PersonPage({ person }: { person: Person }) {
  return (
    <>
      <Container className="py-16 md:py-24">
        <div className="grid gap-12 lg:grid-cols-[320px_1fr] lg:gap-[10%]">
          <aside>
            <ArrowLink href="/team">Team</ArrowLink>
            <div className="relative mt-10 aspect-[4/5] max-w-sm overflow-hidden rounded-[14px] bg-[#dcdcd8]">
              <Media
                image={person.image}
                className="grayscale contrast-[1.04]"
                preload
                sizes="(max-width:1023px) 100vw, 320px"
              />
            </div>
          </aside>
          <div>
            <h1 className={sectionTitle}>{person.name}</h1>
            <p className="mt-5 text-[20px] leading-[1.5] text-muted">
              {person.role}
            </p>
            <RichText blocks={person.bio} className="mt-10" />
            <dl className="mt-12 grid gap-x-8 gap-y-6 sm:grid-cols-2">
              {person.facts.map((fact) => (
                <div key={fact.label}>
                  <dt className="text-[13px] text-muted">{fact.label}</dt>
                  <dd className="mt-2 text-[17px] leading-[1.5]">
                    {fact.links?.length
                      ? fact.links.map((link, index) => (
                          <span key={link.href}>
                            {index > 0 ? " " : ""}
                            <Link
                              href={link.href}
                              className={
                                index < fact.links!.length - 1
                                  ? "after:content-[','] hover:underline"
                                  : "hover:underline"
                              }
                            >
                              {link.label}
                            </Link>
                          </span>
                        ))
                      : fact.value}
                  </dd>
                </div>
              ))}
            </dl>
            <div className="mt-10 flex flex-wrap gap-6">
              {person.contacts.map((contact) => (
                <a
                  key={contact.href}
                  href={contact.href}
                  className="text-[15px] underline-offset-4 hover:underline"
                >
                  {contact.label}
                </a>
              ))}
            </div>
          </div>
        </div>
      </Container>
      <CompanySection
        title={`Companies led by ${person.name}`}
        items={person.companies}
      />
      <JournalSection title="Writing" items={person.articles} />
      {person.next && (
        <Container>
          <Link
            href={person.next.href}
            className="flex items-center justify-between border-t border-line py-12"
          >
            <span className="text-[13px] text-muted">Next</span>
            <span className="text-[32px] tracking-[-0.025em]">
              {person.next.label.replace(/^Next/, "")}
            </span>
          </Link>
        </Container>
      )}
    </>
  );
}
