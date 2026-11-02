import { home, pages } from "@/content/data";
import { Section } from "./section";
import { SectionHeading } from "@/components/ui/section-heading";

export function SectorsSection() {
  const { process } = pages.sectors;

  return (
    <Section className="bg-white">
      <SectionHeading
        title={home.sectors.title}
        description={home.sectors.description}
        action={home.sectors.action}
      />
      <ol className="mt-12 grid gap-x-10 gap-y-10 md:mt-16 md:grid-cols-2">
        {process.steps.map((step, index) => (
          <li key={step.title} className="border-t border-line pt-6">
            <span className="text-[13px] tabular-nums text-muted">
              0{index + 1}
            </span>
            <h3 className="mt-5 text-[24px] leading-[1.25] tracking-[-0.015em]">
              {step.title}
            </h3>
            <p className="mt-4 max-w-xl text-[17px] leading-[1.6] tracking-[-0.01em] text-muted">
              {step.text}
            </p>
          </li>
        ))}
      </ol>
    </Section>
  );
}
