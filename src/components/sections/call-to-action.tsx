import { Pill, PillLink, TextLink, frame } from "@/components/ui/pill";
import { SpireReveal } from "@/components/ui/spire-reveal";
import { leadText, sectionTitle } from "@/components/ui/section-heading";
import type { ContentLink, Media as MediaSource } from "@/content/types";

// Stills "Get in Touch" layout: text column beside a free-standing cut-out
// (transparent background) in a 528×787 box that sits on the section's bottom
// edge. The cut-out builds up from its base as the section scrolls in (see
// SpireReveal); the secondary action is a text link with the Stills arrow.

export function CallToAction({
  eyebrow,
  title,
  text,
  action,
  secondaryAction,
  image,
}: {
  eyebrow?: string;
  title: string;
  text: string;
  action?: ContentLink | null;
  secondaryAction?: ContentLink | null;
  image?: MediaSource | null;
}) {
  return (
    <section className="overflow-hidden bg-paper pt-20 md:pt-28 lg:pt-[140px]">
      <div
        className={`${frame} grid gap-y-14 ${image ? "lg:grid-cols-2 lg:items-center lg:gap-x-20" : "pb-20 md:pb-28 lg:pb-[140px]"}`}
      >
        <div data-reveal className="max-w-[528px]">
          {eyebrow && <Pill>{eyebrow}</Pill>}
          <h2 className={`${sectionTitle} mt-10`}>{title}</h2>
          <p className={`${leadText} mt-5 text-[#14120d99]`}>{text}</p>
          {(action || secondaryAction) && (
            <div className="mt-10 flex flex-wrap items-center gap-x-10 gap-y-4">
              {action && (
                <PillLink href={action.href} tone="dark">
                  {action.label}
                </PillLink>
              )}
              {secondaryAction && (
                <TextLink href={secondaryAction.href}>
                  {secondaryAction.label}
                </TextLink>
              )}
            </div>
          )}
        </div>
        {image && (
          // On desktop the spire is drawn larger than its 528×787 slot: the box
          // is pulled 53px up into the top padding (its layout height stays
          // 787px, so the text keeps its position) and widened, re-centred on
          // the column, to keep the image's proportions.
          <div className="relative mx-auto aspect-[528/787] w-full max-w-[420px] lg:-mt-[53px] lg:aspect-auto lg:h-[840px] lg:w-[592px] lg:-ml-[32px] lg:max-w-none">
            {/* Sunk 40px below the section edge so the base is cropped. The
                spire builds up from its base as the section scrolls in. */}
            <div className="absolute inset-x-0 top-10 -bottom-10 lg:top-0">
              <SpireReveal
                src={image.src}
                alt={image.alt}
                sizes="(max-width: 1023px) 420px, 592px"
              />
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
