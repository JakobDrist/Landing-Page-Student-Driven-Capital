import { AnimatedNumber } from "@/components/ui/animated-number";
import { FundRow } from "./fund-row";
import { home } from "@/content/data";
import { Section } from "./section";
import { sectionTitle, leadText } from "@/components/ui/section-heading";
import { ArrowLink } from "@/components/ui/button-link";
export function FundsSection() {
  return (
    <Section className="bg-white">
      <div className="grid items-center gap-14 lg:grid-cols-[1fr_1.2fr] lg:gap-[10%]">
        <div>
          <h2 className={`${sectionTitle} max-w-lg`}>{home.funds.title}</h2>
          <p className={`${leadText} mt-6 max-w-md text-muted`}>
            {home.funds.description}
          </p>
          <p className="mt-8 text-[62px] leading-none tracking-[-0.03em]">
            <AnimatedNumber value={home.funds.total} />
          </p>
          <p className="mt-2 text-[13px] leading-[1.35] text-muted">
            {home.funds.label}
          </p>
          <ArrowLink href={home.funds.action!.href} className="mt-12">
            {home.funds.action!.label}
          </ArrowLink>
        </div>
        <div className="space-y-6">
          {home.funds.items.map((fund) => (
            <FundRow
              key={fund.name}
              {...fund}
              maximum={Math.max(
                ...home.funds.items.map((item) =>
                  Number(item.size.replace(/[^\d.]/g, "")),
                ),
              )}
            />
          ))}
        </div>
      </div>
    </Section>
  );
}
