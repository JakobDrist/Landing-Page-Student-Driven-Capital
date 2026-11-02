import Link from "next/link";
import { home, sectors, companies } from "@/content/data";
import { Icon } from "@/components/ui/icon";
import { Section } from "./section";
import { SectionHeading } from "@/components/ui/section-heading";
export function SectorsSection() {
  return (
    <Section className="bg-white">
      <SectionHeading
        title={home.sectors.title}
        description={home.sectors.description}
        action={home.sectors.action}
      />
      <div className="mt-12 md:mt-16">
        {sectors.map((sector) => (
          <Link
            href={sector.href}
            key={sector.slug}
            className="group grid grid-cols-[1fr_auto] items-center gap-x-6 gap-y-4 border-t border-line py-7 transition-colors hover:bg-canvas md:grid-cols-[1fr_2fr_auto] md:py-8"
          >
            <h3 className="text-[24px] leading-[1.25] tracking-[-0.015em]">
              {sector.name}
            </h3>
            <p className="col-span-2 row-start-2 text-[17px] leading-[1.6] tracking-[-0.01em] text-muted md:col-span-1 md:row-start-auto">
              {sector.description}
            </p>
            <span className="col-start-2 row-start-1 flex items-center justify-end gap-3 text-[13px] leading-[1.35] text-muted md:col-start-3">
              {
                companies.filter((company) => company.sector === sector.name)
                  .length
              }{" "}
              virksomheder
              <Icon
                path="M5 12h14m-5-5 5 5-5 5"
                className="transition-transform duration-400 group-hover:translate-x-1"
              />
            </span>
          </Link>
        ))}
      </div>
    </Section>
  );
}
