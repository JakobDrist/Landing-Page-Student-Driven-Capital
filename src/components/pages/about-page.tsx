import { pages } from "@/content/data";
import type { RichTextBlock } from "@/content/types";
import { PageHeader } from "@/components/sections/page-header";
import { Container } from "@/components/ui/container";
import { Media } from "@/components/ui/media";
import { RichText } from "@/components/ui/rich-text";
import { sectionTitle } from "@/components/ui/section-heading";
import { Section } from "@/components/sections/section";
import { OfficesSection } from "@/components/sections/offices-section";
export function AboutPage() {
  const content = pages.about;
  return (
    <>
      <PageHeader {...content} />
      <Container>
        <figure>
          <div className="relative aspect-[2/1] overflow-hidden rounded-[14px]">
            <Media image={content.photo!} preload sizes="100vw" />
          </div>
          <figcaption className="mt-3 text-[12px] leading-[1.5] text-muted">
            {content.caption.replace("Foto:", "Foto: ")}
          </figcaption>
        </figure>
      </Container>
      <Section>
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-[10%]">
          <h2 className={`${sectionTitle} max-w-lg`}>{content.storyTitle}</h2>
          <RichText blocks={content.story as RichTextBlock[]} />
        </div>
      </Section>
      <Section className="bg-white">
        <h2 className={sectionTitle}>{content.principlesTitle}</h2>
        <div className="mt-14 grid gap-x-12 gap-y-10 md:grid-cols-2">
          {content.principles.map((principle) => (
            <div key={principle.title} className="border-t border-line pt-6">
              <h3 className="text-[28px] leading-[1.2] tracking-[-0.025em]">
                {principle.title}
              </h3>
              <p className="mt-4 max-w-xl text-[17px] leading-[1.6] text-muted">
                {principle.text}
              </p>
            </div>
          ))}
        </div>
      </Section>
      <Section>
        <div className="grid gap-14 lg:grid-cols-[1fr_2fr]">
          <h2 className={sectionTitle}>{content.timelineTitle}</h2>
          <ol>
            {content.timeline.map((year) => (
              <li
                key={year.year}
                className="grid grid-cols-[70px_1fr] gap-8 border-t border-line py-7 md:grid-cols-[100px_1fr]"
              >
                <h3 className="text-[28px] tracking-[-0.025em]">{year.year}</h3>
                <div className="space-y-2 text-[17px] leading-[1.6] text-muted">
                  {year.events.map((event) => (
                    <p key={event}>{event}</p>
                  ))}
                </div>
              </li>
            ))}
          </ol>
        </div>
      </Section>
      <OfficesSection contactLink />
    </>
  );
}
