import { Icon } from "@/components/ui/icon";
import Image from "next/image";
import Link from "next/link";
import type { CompanySummary } from "@/content/types";
export function CompanyCard({
  company,
  list = false,
}: {
  company: CompanySummary;
  list?: boolean;
}) {
  return (
    <Link
      href={company.href}
      aria-label={`${company.name}: ${company.tagline}`}
      className={`group relative flex h-full min-h-[208px] flex-col rounded-[14px] bg-white p-5 shadow-[inset_0_0_0_1px_transparent] transition-[background-color,box-shadow] duration-400 hover:bg-[#f7f7f5] hover:shadow-[inset_0_0_0_1px_#d8d8d4] md:min-h-[248px] md:p-6 ${list ? "md:min-h-0 md:flex-row md:items-center md:gap-8 md:rounded-none md:border-b md:border-line md:bg-transparent md:py-5" : ""}`}
    >
      <div
        className={`flex h-24 w-full shrink-0 items-center md:h-30 ${list ? "md:h-auto md:w-44" : ""}`}
      >
        <Image
          src={company.logo.src}
          alt={company.name}
          width={180}
          height={25}
          className="h-[25px] w-auto max-w-[180px] object-contain object-left"
        />
      </div>
      <p
        className={`min-h-11 text-[15px] leading-[1.45] tracking-[-0.01em] ${list ? "md:min-h-0 md:flex-1" : ""}`}
      >
        {company.tagline}
      </p>
      <div
        className={`mt-auto flex w-full items-center justify-between gap-3 pt-5 text-[13px] leading-[1.35] tracking-[-0.01em] text-muted ${list ? "md:mt-0 md:w-[36%] md:pt-0" : ""}`}
      >
        <span>{company.sector}</span>
        {list && (
          <span className="hidden md:inline">
            {company.stage}, {company.firstYear}
          </span>
        )}
        <span className="inline-flex items-center gap-1.5 text-right">
          <span
            aria-hidden="true"
            className={`size-1.5 shrink-0 rounded-full ${company.active ? "bg-[#1f9d55]" : "border border-[#9a9a97]"}`}
          />
          {company.cardStatus}
        </span>
      </div>
      <Icon
        path="M7 17 17 7M7 7h10v10"
        className="absolute top-6 right-6 opacity-0 transition-[opacity,transform] duration-400 ease-[cubic-bezier(.16,1,.3,1)] group-hover:-translate-y-[3px] group-hover:translate-x-[3px] group-hover:opacity-100"
      />
    </Link>
  );
}
