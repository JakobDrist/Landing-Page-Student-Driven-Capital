import type { ContentLink } from "@/content/types";
import { ButtonLink } from "./button-link";
// Type scale measured from the Stills reference at 390 / 810 / 1440 px.
export const displayTitle =
  "font-serif text-[42px] leading-[1.05] font-medium tracking-[-0.02em] md:text-[56px] lg:text-[72px] lg:leading-none lg:tracking-[-0.025em]";
export const sectionTitle =
  "font-serif text-[32px] leading-[1.1] font-medium tracking-[-0.015em] text-balance md:text-[40px] lg:text-[48px] lg:leading-[1.08] lg:tracking-[-0.02em]";
export const itemTitle =
  "font-serif text-[26px] leading-[1.22] font-medium tracking-[-0.012em] lg:text-[32px] lg:leading-[1.2]";
export const leadText =
  "text-[16px] leading-[1.6] tracking-[-0.011em] lg:text-[18px]";
export const smallText = "text-[14px] leading-[1.4] tracking-[-0.006em]";
export const pageTitle = `${displayTitle} text-balance`;
export function SectionHeading({
  title,
  description,
  action,
  align = "center",
}: {
  title: string;
  description?: string;
  action?: ContentLink | null;
  align?: "center" | "left";
}) {
  return (
    <div
      className={`flex w-full flex-col ${align === "center" ? "mx-auto max-w-[768px] items-center text-center" : "items-start text-left"}`}
    >
      <h2 className={sectionTitle}>{title}</h2>
      {description && (
        <p className={`${leadText} mt-6 max-w-xl text-muted`}>{description}</p>
      )}
      {action && (
        <div className="mt-8">
          <ButtonLink href={action.href} small>
            {action.label}
          </ButtonLink>
        </div>
      )}
    </div>
  );
}
