import { Grain } from "@/components/ui/grain";
import { Glow } from "@/components/ui/glow";
import { Container } from "@/components/ui/container";
import { ButtonLink } from "@/components/ui/button-link";
import { sectionTitle } from "@/components/ui/section-heading";
import type { ContentLink } from "@/content/types";

export function CallToAction({
  eyebrow,
  title,
  text,
  action,
  secondaryAction,
}: {
  eyebrow?: string;
  title: string;
  text: string;
  action?: ContentLink | null;
  secondaryAction?: ContentLink | null;
}) {
  return (
    <section className="pb-20 md:pb-25 lg:pb-29 xl:pb-34">
      <Container>
        <div className="relative isolate overflow-hidden rounded-[14px] bg-[#1c1c1e] px-5 py-20 text-center text-[#f3f3f1] md:px-10 md:py-28">
          <Glow band />
          <Grain className="opacity-45" />
          {eyebrow && (
            <p className="mb-6 text-[12px] tracking-[0.12em] text-paper/60 uppercase">
              {eyebrow}
            </p>
          )}
          <h2 className={`${sectionTitle} mx-auto max-w-[760px]`}>{title}</h2>
          <p className="mx-auto mt-6 max-w-xl text-[17px] leading-[1.6] tracking-[-0.01em] text-paper/70">
            {text}
          </p>
          {(action || secondaryAction) && (
            <div className="mt-10 flex flex-wrap justify-center gap-3">
              {action && (
                <ButtonLink href={action.href} variant="light">
                  {action.label}
                </ButtonLink>
              )}
              {secondaryAction && (
                <ButtonLink href={secondaryAction.href} variant="ghost">
                  {secondaryAction.label}
                </ButtonLink>
              )}
            </div>
          )}
        </div>
      </Container>
    </section>
  );
}
