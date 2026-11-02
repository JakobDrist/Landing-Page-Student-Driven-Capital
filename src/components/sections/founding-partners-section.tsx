import { Media } from "@/components/ui/media";
import { SectionHeading } from "@/components/ui/section-heading";
import type { Media as MediaSource } from "@/content/types";
import { Section } from "./section";

interface FoundingPartner {
  name: string;
  role: string;
  image: MediaSource | null;
}

export function FoundingPartnersSection({
  title,
  members,
}: {
  title: string;
  members: FoundingPartner[];
}) {
  return (
    <Section id="founding-partners">
      <SectionHeading title={title} />
      <div className="mx-auto mt-12 grid max-w-5xl grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-3 md:mt-16">
        {members.map((partner) => (
          <article key={partner.name} className="mx-auto w-full max-w-sm">
            <div className="relative aspect-[4/5] overflow-hidden rounded-[14px] bg-[#dcdcd8]">
              {partner.image ? (
                <Media
                  image={partner.image}
                  sizes="(max-width: 639px) 90vw, (max-width: 1023px) 30vw, 330px"
                />
              ) : (
                <div
                  className="flex h-full items-center justify-center text-[80px] font-light text-ink/25"
                  aria-label={`Portræt af ${partner.name} kommer senere`}
                  role="img"
                >
                  <span aria-hidden="true">{partner.name.charAt(0)}</span>
                </div>
              )}
            </div>
            <h3 className="mt-4 text-[18px] leading-[1.4] tracking-[-0.02em]">
              {partner.name}
            </h3>
            <p className="mt-1 text-[13px] leading-[1.35] tracking-[-0.01em] text-muted">
              {partner.role}
            </p>
          </article>
        ))}
      </div>
    </Section>
  );
}
