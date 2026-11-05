import { Media } from "@/components/ui/media";
import { PortraitReveal } from "@/components/ui/portrait-reveal";
import { Pill, frame, sectionSpace } from "@/components/ui/pill";
import { leadText, sectionTitle } from "@/components/ui/section-heading";
import type { Media as MediaSource } from "@/content/types";

// Stills "The Partnership" grid: three tall portraits with name and role.
// Portraits open like curtains one after another and drift at slightly
// different speeds while scrolling (see PortraitReveal); names follow.

/** Parallax travel per column (px over the pass): the middle one moves most. */
const DRIFT = [44, 110, 64];

interface FoundingPartner {
  name: string;
  role: string;
  focus: string;
  image: MediaSource | null;
}

export function FoundingPartnersSection({
  label,
  title,
  description,
  members,
}: {
  label?: string;
  title: string;
  description?: string;
  members: FoundingPartner[];
}) {
  return (
    <section id="founding-partners" className={`bg-paper ${sectionSpace}`}>
      <div className={frame}>
        <div data-reveal>
          {label && <Pill className="mb-10">{label}</Pill>}
          <h2 className={sectionTitle}>{title}</h2>
          {description && (
            <p className={`${leadText} mt-5 max-w-[560px] text-ink/60`}>
              {description}
            </p>
          )}
        </div>
        <ul className="mt-14 grid gap-x-8 gap-y-12 sm:grid-cols-2 md:grid-cols-3 lg:mt-20">
          {members.map((partner, index) => (
            <li key={partner.name} className="group">
              <PortraitReveal
                index={index}
                drift={DRIFT[index % DRIFT.length]}
                frameClassName="aspect-[357/466] bg-[#14120d0f]"
                caption={
                  <div
                    data-reveal
                    style={
                      {
                        "--reveal-delay": `${0.6 + index * 0.22}s`,
                      } as React.CSSProperties
                    }
                  >
                    <h3 className="mt-6 text-[18px] leading-[1.3] font-medium tracking-[-0.006em]">
                      {partner.name}
                    </h3>
                    <p className="mt-2.5 text-[14px] leading-[1.4] tracking-[-0.006em] text-ink/60">
                      {partner.role} · {partner.focus}
                    </p>
                  </div>
                }
              >
                {partner.image ? (
                  <Media
                    image={partner.image}
                    sizes="(max-width: 639px) 100vw, (max-width: 1199px) 33vw, 357px"
                  />
                ) : (
                  <div
                    className="flex h-full items-center justify-center font-serif text-[96px] font-medium text-ink/20"
                    aria-label={`Portræt af ${partner.name} kommer senere`}
                    role="img"
                  >
                    <span aria-hidden="true">{partner.name.charAt(0)}</span>
                  </div>
                )}
              </PortraitReveal>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
