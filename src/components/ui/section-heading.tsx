import type { ContentLink } from "@/content/types";
import { ButtonLink } from "./button-link";
export const sectionTitle =
  "text-[35.35px] leading-[1.1] font-normal tracking-[-0.025em] text-balance md:text-[44.8px] lg:text-[51.2px] xl:text-[60px]";
export const leadText =
  "text-[17.68px] leading-[1.5] tracking-[-0.01em] md:text-[19.01px] lg:text-[19.9px] xl:text-[20.8px]";
export const pageTitle =
  "text-[44.42px] leading-[1.08] font-normal tracking-[-0.03em] text-balance md:text-[58.78px] lg:text-[68.51px] xl:text-[81px]";
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
