import Link from "next/link";
import Image from "next/image";
import { pages, sectors, companies } from "@/content/data";
import { Container } from "@/components/ui/container";
import { Icon } from "@/components/ui/icon";
import { PageHeader } from "@/components/sections/page-header";
export function SectorsPage() {
  return (
    <>
      <PageHeader {...pages.sectors} />
      <Container className="pb-20 md:pb-25 lg:pb-29 xl:pb-34">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {sectors.map((sector) => {
            const list = companies.filter(
              (company) => company.sector === sector.name,
            );
            const exits = list.filter((company) => !company.active).length;
            return (
              <Link
                key={sector.slug}
                href={sector.href}
                className="group flex min-h-[320px] flex-col rounded-[14px] bg-white p-8 transition-shadow hover:shadow-[inset_0_0_0_1px_#bdbdb8]"
              >
                <div className="flex items-center justify-between">
                  <h2 className="text-[32px] leading-[1.15] tracking-[-0.025em]">
                    {sector.name}
                  </h2>
                  <Icon
                    path="M5 12h14m-5-5 5 5-5 5"
                    className="transition-transform duration-400 group-hover:translate-x-1"
                  />
                </div>
                <p className="mt-5 text-[17px] leading-[1.6] text-muted">
                  {sector.description}
                </p>
                <div className="my-8 flex flex-wrap items-center gap-x-6 gap-y-4">
                  {list.slice(0, 3).map((company) => (
                    <Image
                      key={company.slug}
                      src={company.logo.src}
                      alt={company.name}
                      width={100}
                      height={20}
                      className="h-5 w-auto max-w-25 object-contain"
                    />
                  ))}
                </div>
                <p className="mt-auto text-[13px] text-muted">
                  {list.length} companies · {exits}{" "}
                  {exits === 1 ? "exit" : "exits"}
                </p>
              </Link>
            );
          })}
        </div>
      </Container>
    </>
  );
}
