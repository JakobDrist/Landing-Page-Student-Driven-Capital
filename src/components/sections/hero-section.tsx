import { home } from "@/content/data";
import { CountUp } from "@/components/ui/count-up";
import { Media } from "@/components/ui/media";
import { Pill, PillLink, TextLink } from "@/components/ui/pill";
import { ScrollShift } from "@/components/ui/scroll-shift";
import { displayTitle, leadText } from "@/components/ui/section-heading";

// Stills hero: black text column on the left, full-height image on the right.
// On large screens the hero stays pinned while the page scrolls over it, and
// both halves drift apart with the scroll (text left and fading, image right).

export function HeroSection() {
  const { hero } = home;
  const [primary, secondary] = hero.actions;

  return (
    <section className="relative overflow-hidden bg-night text-paper lg:sticky lg:top-0 lg:grid lg:h-svh lg:min-h-[720px] lg:grid-cols-[minmax(0,1fr)_48.9%]">
      <div className="animate-appear flex flex-col justify-center px-6 pt-32 pb-14 [animation-delay:.4s] md:px-8 md:pt-40 lg:py-24 lg:pr-12">
        <ScrollShift distance={-250} fade>
          <Pill tone="hero">{hero.eyebrow}</Pill>
          <h1 className={`${displayTitle} mt-8`}>{hero.title}</h1>
          <p className={`${leadText} mt-8 max-w-[400px] text-paper/60`}>
            {hero.description}
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-x-10 gap-y-4">
            <PillLink href={primary.href} tone="light">
              {primary.label}
            </PillLink>
            {secondary && (
              <TextLink href={secondary.href}>{secondary.label}</TextLink>
            )}
          </div>
          <div className="mt-8 flex items-center gap-4">
            <CountUp
              value={hero.stat.value}
              from={hero.stat.from}
              decimals={hero.stat.decimals}
              suffix={hero.stat.suffix}
              className="font-serif text-[48px] leading-[1.1] font-medium tracking-[-0.01em] whitespace-nowrap"
            />
            <span className="max-w-[110px] text-[14px] leading-[1.4] font-medium tracking-[-0.006em]">
              {hero.stat.label}
            </span>
          </div>
        </ScrollShift>
      </div>
      <div className="animate-appear-slow relative h-[400px] md:h-[560px] lg:h-auto">
        <ScrollShift
          distance={250}
          frequency={22}
          damping={1.34}
          className="absolute inset-0"
        >
          <Media
            image={hero.image}
            preload
            sizes="(max-width: 1023px) 100vw, 49vw"
            className="object-[58%_center]"
          />
        </ScrollShift>
      </div>
    </section>
  );
}
