import Link from "next/link";
import Image from "next/image";
import { pages, companies } from "@/content/data";
import { PageHeader } from "@/components/sections/page-header";
import { Container } from "@/components/ui/container";
import { Media } from "@/components/ui/media";
import { sectionTitle } from "@/components/ui/section-heading";
import { Section } from "@/components/sections/section";
import { Figures } from "@/components/sections/stats-section";
export function FundsPage() {
  const content = pages.funds;
  return (
    <>
      <PageHeader {...content} />
      <Container className="pb-16">
        <Figures figures={content.figures} />
      </Container>
      <Section>
        <h2 className={sectionTitle}>By fund</h2>
        <div className="mt-12 overflow-x-auto overscroll-x-contain">
          <table className="w-full min-w-[1000px] border-collapse text-left text-[15px] tabular-nums">
            <thead>
              <tr>
                {content.columns.map((column) => (
                  <th
                    key={column}
                    className="border-b border-ink/40 py-4 pr-6 text-[13px] font-normal text-muted"
                  >
                    {column}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {content.rows.map((row, i) => (
                <tr key={i}>
                  {row.map((cell, j) => (
                    <td
                      key={j}
                      className="border-b border-line py-6 pr-6 whitespace-pre-line"
                    >
                      {cell}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr>
                {content.total.map((cell, i) => (
                  <td key={i} className="py-6 pr-6">
                    {cell}
                  </td>
                ))}
              </tr>
            </tfoot>
          </table>
        </div>
        <p className="mt-8 max-w-5xl text-[13px] leading-[1.6] text-muted">
          {content.disclosure}
        </p>
      </Section>
      <Container>
        <figure>
          <div className="relative aspect-[2/1] overflow-hidden rounded-[14px]">
            <Media image={content.photo!} sizes="100vw" />
          </div>
          <figcaption className="mt-3 text-[12px] text-muted">
            {content.caption.replace("Photo:", "Photo: ")}
          </figcaption>
        </figure>
      </Container>
      <Section>
        <div className="grid gap-10 lg:grid-cols-2">
          <h2 className={sectionTitle}>The portfolio, by the numbers</h2>
          <p className="text-[20px] leading-[1.6] text-muted">
            {content.breakdownDescription}
          </p>
        </div>
        <div className="mt-14 grid gap-12 md:grid-cols-3">
          {content.breakdowns.map((breakdown) => (
            <div key={breakdown.title}>
              <h3 className="mb-6 text-[20px]">{breakdown.title}</h3>
              {breakdown.rows
                .filter((row) => Number(row.value) > 0)
                .map((row) => (
                  <div
                    key={row.label}
                    className="flex justify-between gap-6 border-t border-line py-3 text-[17px] text-muted"
                  >
                    {row.href ? (
                      <Link href={row.href} className="hover:text-ink">
                        {row.label}
                      </Link>
                    ) : (
                      <span>{row.label}</span>
                    )}
                    <span className="tabular-nums text-ink">{row.value}</span>
                  </div>
                ))}
            </div>
          ))}
        </div>
      </Section>
      <Section className="bg-white">
        <h2 className={sectionTitle}>Realised</h2>
        <div className="mt-12">
          {content.exits.map((slug) => {
            const company = companies.find((company) => company.slug === slug)!;
            const year = company.exit?.year || "";
            return (
              <Link
                key={slug}
                href={company.href}
                className="grid grid-cols-2 items-center gap-6 border-t border-line py-7 md:grid-cols-[1fr_1fr_2fr_auto]"
              >
                <Image
                  src={company.logo.src}
                  alt={company.name}
                  width={160}
                  height={25}
                  className="h-[25px] w-auto max-w-40 object-contain object-left"
                />
                <span className="text-[15px] text-muted">{company.sector}</span>
                <div>
                  <p className="text-[17px]">{company.cardStatus}</p>
                  <p className="mt-1 text-[13px] text-muted">
                    {company.facts.find((fact) => fact.label === "Fund")?.value}
                  </p>
                </div>
                <p className="text-[20px] tabular-nums">{year}</p>
              </Link>
            );
          })}
        </div>
      </Section>
    </>
  );
}
