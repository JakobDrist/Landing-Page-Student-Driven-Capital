import { Grain } from "@/components/ui/grain";
import { Glow } from "@/components/ui/glow";
import { Container } from "@/components/ui/container";
import { ButtonLink } from "@/components/ui/button-link";
import { sectionTitle } from "@/components/ui/section-heading";
import type { ContentLink } from "@/content/types";
export function CallToAction({
  title,
  text,
  action = { href: "/membership", label: "Join DSD Invest" },
}: {
  title: string;
  text: string;
  action?: ContentLink | null;
}) {
  return (
    <section className="pb-20 md:pb-25 lg:pb-29 xl:pb-34">
      <Container>
        <div className="relative isolate overflow-hidden rounded-[14px] bg-[#1c1c1e] px-5 py-20 text-center text-[#f3f3f1] md:px-10 md:py-28">
          <Glow band />
          <Grain className="opacity-45" />
          <h2 className={`${sectionTitle} mx-auto max-w-[680px]`}>{title}</h2>
          <p className="mx-auto mt-6 max-w-md text-[17px] leading-[1.6] tracking-[-0.01em] text-paper/70">
            {text}
          </p>
          {action && (
            <div className="mt-10">
              <ButtonLink href={action.href} variant="light">
                {action.label}
              </ButtonLink>
            </div>
          )}
        </div>
      </Container>
    </section>
  );
}
