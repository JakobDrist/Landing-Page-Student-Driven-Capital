import { Container } from "@/components/ui/container";
import { ButtonLink } from "@/components/ui/button-link";
import { SpireReveal } from "@/components/ui/spire-reveal";
import { leadText, sectionTitle } from "@/components/ui/section-heading";
import type { ContentLink, Media as MediaSource } from "@/content/types";

// Closing section: text beside the free-standing Børsen spire (a cut-out with
// a transparent background) that stands on the section's bottom edge and
// rises out of it as the section scrolls in (see SpireReveal). Without an
// image the text simply stands alone.

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
    <section className="overflow-hidden bg-canvas pt-20 md:pt-25 lg:pt-29 xl:pt-34">
      <Container
        className={`grid gap-y-14 ${image ? "lg:grid-cols-2 lg:items-center lg:gap-x-20" : "pb-20 md:pb-25 lg:pb-29 xl:pb-34"}`}
      >
        <div className="max-w-[560px]">
          {eyebrow && (
            <p className="mb-6 text-[12px] tracking-[0.12em] text-muted uppercase">
              {eyebrow}
            </p>
          )}
          <h2 className={sectionTitle}>{title}</h2>
          <p className={`${leadText} mt-6 text-muted`}>{text}</p>
          {(action || secondaryAction) && (
            <div className="mt-10 flex flex-wrap gap-3">
              {action && (
                <ButtonLink href={action.href} variant="primary">
                  {action.label}
                </ButtonLink>
              )}
              {secondaryAction && (
                <ButtonLink href={secondaryAction.href} variant="outline">
                  {secondaryAction.label}
                </ButtonLink>
              )}
            </div>
          )}
        </div>
        {image && (
          // The spire box grows with its column up to 592×840 and keeps the
          // image's proportions at every width.
          <div className="relative mx-auto aspect-[528/787] w-full max-w-[420px] lg:mr-0 lg:aspect-[592/840] lg:max-w-[592px]">
            {/* Sunk 40px below the section edge so the base is cropped. */}
            <div className="absolute inset-x-0 top-10 -bottom-10 lg:top-0">
              <SpireReveal
                src={image.src}
                alt={image.alt}
                sizes="(max-width: 1023px) 420px, 592px"
              />
            </div>
          </div>
        )}
      </Container>
    </section>
  );
}
