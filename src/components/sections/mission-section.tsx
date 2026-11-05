import { home } from "@/content/data";
import { LogoTicker } from "@/components/ui/logo-ticker";
import { Pill, TextLink, frame } from "@/components/ui/pill";
import { leadText, sectionTitle } from "@/components/ui/section-heading";

// Based on the Stills "Track Record" section: logo ticker, label, heading and
// lead, and a closing line with a link. The three figures were dropped to keep
// the section compact. Desktop spacing (1440px): 96 / 64 / 32 / 20 / 48 / 96.

export function MissionSection() {
  const { mission } = home;
  return (
    <section
      id="membership"
      className="bg-paper pt-16 pb-16 md:pt-20 md:pb-20 lg:pt-24 lg:pb-24"
    >
      <div className={frame}>
        <LogoTicker
          marks={mission.universities}
          label="Studerende fra danske universiteter"
        />

        <div data-reveal className="mt-14 lg:mt-16">
          <Pill>{mission.label}</Pill>
          <h2 className={`${sectionTitle} mt-8 max-w-[720px]`}>
            {mission.title}
          </h2>
          <p className={`${leadText} mt-5 max-w-[560px] text-ink/60`}>
            {mission.lead}
          </p>
        </div>

        <div
          data-reveal
          className="mt-10 flex flex-col gap-6 md:flex-row md:items-end md:justify-between lg:mt-12"
        >
          <p className={`${leadText} max-w-[560px] text-ink/80`}>
            {mission.closing}
          </p>
          <TextLink href={mission.action.href} className="md:mr-6">
            {mission.action.label}
          </TextLink>
        </div>
      </div>
    </section>
  );
}
