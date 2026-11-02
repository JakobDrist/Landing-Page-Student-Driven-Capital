import Image from "next/image";
import Link from "next/link";
import type { Company } from "@/content/types";
import { Container } from "@/components/ui/container";
import { ArrowLink } from "@/components/ui/button-link";
import { sectionTitle } from "@/components/ui/section-heading";
import { RichText } from "@/components/ui/rich-text";
import { CompanySection } from "@/components/sections/company-section";
export function CompanyPage({ company }: { company: Company }) {
  return (
    <>
      <Container className="pt-14 pb-16 md:pt-24 md:pb-24">
        <ArrowLink href="/portfolio">Portfolio</ArrowLink>
        <div className="mt-16 flex h-24 items-center">
          <Image
            src={company.logo.src}
            alt={company.name}
            width={360}
            height={80}
            className="max-h-20 w-auto max-w-full object-contain object-left"
            preload
          />
        </div>
        <h1 className={`${sectionTitle} mt-8 max-w-4xl`}>{company.tagline}</h1>
        <p className="mt-6 inline-flex items-center gap-2 text-[15px] text-muted">
          <span
            aria-hidden="true"
            className={`size-2 rounded-full ${company.active ? "bg-[#1f9d55]" : "border border-[#9a9a97]"}`}
          />
          {company.status}
        </p>
      </Container>
      <Container className="pb-20 md:pb-25 lg:pb-29 xl:pb-34">
        <div className="grid gap-14 lg:grid-cols-[280px_1fr] lg:gap-[10%]">
          <aside>
            <dl className="space-y-6">
              {company.facts.map((fact) => (
                <div key={fact.label}>
                  <dt className="text-[13px] leading-[1.35] text-muted">
                    {fact.label}
                  </dt>
                  <dd className="mt-2 text-[17px] leading-[1.5]">
                    {fact.href ? (
                      <Link
                        href={fact.href}
                        className="underline-offset-4 hover:underline"
                      >
                        {fact.value}
                      </Link>
                    ) : (
                      fact.value
                    )}
                  </dd>
                </div>
              ))}
            </dl>
            <Link
              href={company.leadPartner.href}
              className="mt-10 flex items-center gap-4"
            >
              <Image
                src={company.partnerImage.src}
                alt=""
                width={52}
                height={64}
                className="h-16 w-13 rounded-lg object-cover grayscale contrast-[1.04]"
              />
              <div>
                <p className="text-[13px] text-muted">Lead partner</p>
                <p className="mt-1 text-[17px]">{company.leadPartner.label}</p>
              </div>
            </Link>
          </aside>
          <div className="max-w-3xl">
            <RichText blocks={company.story} />
            <section className="mt-14">
              <h2 className="text-[24px] leading-[1.25] tracking-[-0.015em]">
                Founders
              </h2>
              <div className="mt-6 grid gap-6 sm:grid-cols-2">
                {company.founders.map((founder) => (
                  <div key={founder.name}>
                    <h3 className="text-[18px] leading-[1.4]">
                      {founder.name}
                    </h3>
                    <p className="mt-1 text-[15px] leading-6 text-muted">
                      {founder.role}
                    </p>
                  </div>
                ))}
              </div>
            </section>
            <section className="mt-16">
              <div className="flex flex-wrap items-baseline justify-between gap-4">
                <h2 className="text-[24px] leading-[1.25] tracking-[-0.015em]">
                  {company.fundingHeading}
                </h2>
                <p className="text-[13px] text-muted">{company.raised}</p>
              </div>
              <ol className="mt-8 border-l border-line">
                {company.rounds.map((round) => (
                  <li
                    key={round.date}
                    className="relative grid grid-cols-[85px_1fr] gap-5 pb-8 pl-6 before:absolute before:top-1.5 before:-left-[4.5px] before:size-2 before:rounded-full before:bg-ink"
                  >
                    <time className="text-[13px] leading-6 text-muted">
                      {round.date}
                    </time>
                    <div>
                      <div className="flex flex-wrap items-center gap-3 text-[18px]">
                        <h3>
                          {round.name}{" "}
                          <span className="text-muted">{round.amount}</span>
                        </h3>
                        {round.badge && (
                          <span className="rounded-full bg-[#e2f1e7] px-2 py-1 text-[11px] leading-none text-[#23803d]">
                            {round.badge}
                          </span>
                        )}
                      </div>
                      <p className="mt-2 text-[13px] text-muted">
                        {round.lead}
                      </p>
                    </div>
                  </li>
                ))}
                {company.exit && (
                  <li className="relative grid grid-cols-[85px_1fr] gap-5 pl-6 before:absolute before:top-1.5 before:-left-[4.5px] before:size-2 before:rounded-full before:border before:border-muted before:bg-paper">
                    <span className="text-[13px] leading-6 text-muted">
                      {company.exit.year}
                    </span>
                    <p className="text-[18px]">{company.exit.label}</p>
                  </li>
                )}
              </ol>
            </section>
          </div>
        </div>
      </Container>
      <CompanySection
        title={`More in ${company.sector}`}
        items={company.related}
        action={{
          label: "About the sector",
          href: `/sectors/${company.sector.toLowerCase()}`,
        }}
      />
    </>
  );
}
