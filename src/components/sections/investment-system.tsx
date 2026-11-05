import { home, pages } from "@/content/data";
import { Icon } from "@/components/ui/icon";
import { Pill, TextLink, sectionSpace, wideFrame } from "@/components/ui/pill";
import {
  itemTitle,
  leadText,
  sectionTitle,
} from "@/components/ui/section-heading";

// Stills "Our Approach" section, 1:1: a pinned heading column (464px) and four
// commitments (icon, title, two-line description) with 64px between them.

const levelIcons: Record<string, string> = {
  I: "M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20Zm4 6-2.5 5.5L8 16l2.5-5.5L16 8Z",
  II: "m21 21-4.3-4.3M11 18a7 7 0 1 0 0-14 7 7 0 0 0 0 14Z",
  III: "M21 12a9 9 0 1 1-9-9v9h9Zm-6-9.5A9 9 0 0 1 21.5 9H15V2.5Z",
  IV: "M3 12a9 9 0 0 1 15.5-6.2L21 8m0-5v5h-5M21 12a9 9 0 0 1-15.5 6.2L3 16m0 5v-5h5",
};

export function InvestmentSystem() {
  const content = home.sectors;
  const { framework } = pages.sectors;
  const descriptions: Record<string, string> = content.levels;

  return (
    <section
      id="investment-approach"
      className={`border-t border-paper/10 bg-graphite text-paper ${sectionSpace}`}
    >
      <div
        className={`${wideFrame} grid gap-y-16 lg:grid-cols-[464px_1fr] lg:gap-x-20`}
      >
        <div className="self-start lg:sticky lg:top-24" data-reveal>
          <Pill tone="dark">{content.eyebrow}</Pill>
          <h2 className={`${sectionTitle} mt-10`}>{content.title}</h2>
          <p className={`${leadText} mt-5 text-paper/60`}>
            {content.description}
          </p>
          <TextLink href={content.action.href} className="mt-10">
            {content.action.label}
          </TextLink>
        </div>

        <div>
          <ol className="space-y-16">
            {framework.levels.map((level) => (
              <li
                key={level.number}
                data-reveal
                className="flex flex-col gap-3"
              >
                <Icon
                  path={levelIcons[level.number]}
                  className="size-6 text-paper"
                />
                <h3 className={itemTitle}>{level.title}</h3>
                <p className={`${leadText} max-w-[560px] text-paper/60`}>
                  {descriptions[level.number]}
                </p>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
