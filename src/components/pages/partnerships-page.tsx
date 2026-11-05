import Image from "next/image";
import partnerships from "@/content/data/partnerships.json";
import { home } from "@/content/data";
import { Media } from "@/components/ui/media";
import {
  Pill,
  PillLink,
  TextLink,
  frame,
  sectionSpace,
} from "@/components/ui/pill";
import {
  displayTitle,
  itemTitle,
  leadText,
  sectionTitle,
} from "@/components/ui/section-heading";
import { SignupBlock } from "@/features/forms/signup-block";

// Partnership page in the Stills idiom: a dark hero over a dusk landscape,
// the value for partners as four numbered points, the four ways to work
// together as cards on graphite, the international ambition with the
// principle of investment independence, and the enquiry form beside a grainy
// crop of the Storebælt bridge.

const stagger = (index: number, base = 0) =>
  ({ "--reveal-delay": `${base + index * 0.1}s` }) as React.CSSProperties;

const number = (index: number) => String(index + 1).padStart(2, "0");

export function PartnershipsPage() {
  const { page, value, areas, international } = partnerships;
  const bridge = home.hero.image;

  return (
    <>
      {/* Hero: dusk landscape with the title anchored bottom left. */}
      <section
        data-dark-hero
        className="relative isolate -mt-18 flex min-h-[640px] items-end overflow-hidden bg-night text-paper lg:h-svh lg:min-h-[720px]"
      >
        <Image
          src={page.image.src}
          alt=""
          fill
          preload
          sizes="100vw"
          className="animate-appear-slow -z-10 object-cover object-[center_65%]"
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 -z-10 bg-[linear-gradient(180deg,rgba(10,10,14,0.45)_0%,rgba(10,10,14,0.05)_35%,rgba(10,10,14,0.55)_100%)]"
        />
        <div
          className={`${frame} animate-appear pt-40 pb-16 [animation-delay:.3s] md:pb-20 lg:pb-24`}
        >
          <Pill tone="hero">{page.label}</Pill>
          <h1 className={`${displayTitle} mt-8 max-w-[860px] text-balance`}>
            {partnerships.title}
          </h1>
          <p className={`${leadText} mt-6 max-w-[520px] text-paper/75`}>
            {partnerships.description}
          </p>
          <div className="mt-9 flex flex-wrap items-center gap-x-8 gap-y-4">
            <PillLink href="#kontakt" tone="light">
              {page.contactAction}
            </PillLink>
            <TextLink href={partnerships.action.href}>
              {partnerships.action.label}
            </TextLink>
          </div>
        </div>
      </section>

      {/* Value for partners: four numbered points. */}
      <section className={`bg-paper ${sectionSpace}`}>
        <div className={frame}>
          <div
            data-reveal
            className="grid gap-8 lg:grid-cols-[1fr_1fr] lg:items-end lg:gap-20"
          >
            <div>
              <Pill>{value.label}</Pill>
              <h2 className={`${sectionTitle} mt-8`}>{value.title}</h2>
            </div>
            <p className={`${leadText} max-w-[520px] text-ink/60`}>
              {value.intro}
            </p>
          </div>

          <ol className="mt-16 grid gap-x-12 md:grid-cols-2 lg:mt-20">
            {value.items.map((item, index) => (
              <li
                key={item.title}
                data-reveal
                style={stagger(index % 2)}
                className="rule-top grid grid-cols-[48px_1fr] py-8 md:py-10"
              >
                <span className="pt-2 text-[14px] text-ink/40 tabular-nums">
                  {number(index)}
                </span>
                <div>
                  <h3 className={itemTitle}>{item.title}</h3>
                  <p className="mt-4 max-w-[440px] text-[16px] leading-[1.6] text-ink/60">
                    {item.text}
                  </p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Ways to work together, as cards on graphite. */}
      <section
        id="muligheder"
        className={`scroll-mt-20 bg-graphite text-paper ${sectionSpace}`}
      >
        <div className={frame}>
          <div data-reveal className="max-w-[720px]">
            <Pill tone="dark">{page.areasLabel}</Pill>
            <h2 className={`${sectionTitle} mt-8`}>
              {partnerships.areasTitle}
            </h2>
            <p className={`${leadText} mt-5 max-w-[560px] text-paper/60`}>
              {partnerships.areasIntro}
            </p>
          </div>

          <ul className="mt-14 grid gap-3 md:grid-cols-2 lg:mt-20">
            {areas.map((area, index) => (
              <li
                key={area.title}
                data-reveal
                style={stagger(index % 2)}
                className="flex flex-col rounded-[20px] bg-paper/[0.04] p-7 shadow-[inset_0_0_0_1px_rgba(251,254,249,0.07)] transition-colors duration-700 hover:bg-paper/[0.07] lg:p-9"
              >
                <span className="text-[14px] text-paper/40 tabular-nums">
                  {number(index)}
                </span>
                <h3 className={`${itemTitle} mt-10 lg:mt-14`}>{area.title}</h3>
                <p className="mt-4 max-w-[460px] text-[16px] leading-[1.6] text-paper/65">
                  {area.text}
                </p>
                <div className="mt-auto pt-8">
                  <p className="border-t border-paper/10 pt-5 text-[14px] leading-[1.5] text-paper/45">
                    {area.example}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* International ambition and investment independence. */}
      <section className={`bg-paper ${sectionSpace}`}>
        <div className={frame}>
          <div className="grid gap-10 lg:grid-cols-[1fr_1.15fr] lg:gap-20">
            <div data-reveal>
              <Pill>{international.label}</Pill>
              <h2 className={`${sectionTitle} mt-8`}>{international.title}</h2>
            </div>
            <div data-reveal style={stagger(1)} className="space-y-6 lg:pt-16">
              {international.paragraphs.map((paragraph) => (
                <p key={paragraph} className={`${leadText} text-ink/60`}>
                  {paragraph}
                </p>
              ))}
            </div>
          </div>

          <div
            data-reveal
            className="mt-16 grid gap-6 rounded-[20px] bg-[#14120d08] p-7 sm:p-10 lg:mt-24 lg:grid-cols-[1fr_1.15fr] lg:gap-20 lg:p-12"
          >
            <p className="text-[14px] leading-[1.4] font-medium text-ink/50">
              {partnerships.principleTitle}
            </p>
            <div>
              <p className="font-serif text-[24px] leading-[1.3] font-medium tracking-[-0.012em] text-balance lg:text-[28px]">
                {partnerships.principle}
              </p>
              <p className="mt-5 max-w-[520px] text-[14px] leading-[1.6] text-ink/55">
                {partnerships.principleNote}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Enquiry form beside a grainy crop of the Storebælt bridge. */}
      <section
        id="kontakt"
        className="scroll-mt-20 bg-paper pb-20 md:pb-28 lg:pb-[140px]"
      >
        <div className={frame}>
          <SignupBlock
            kind="partnership"
            label={page.contactLabel}
            title={partnerships.contactTitle}
            definition={partnerships.form}
            formLabel={page.formLabel}
            note={page.note}
            placeholders={page.placeholders}
            confirmation={page.confirmation}
            error={page.error}
            aside={
              <div
                data-reveal
                style={stagger(1, 0.02)}
                className="relative isolate min-h-[460px] overflow-hidden rounded-[20px]"
              >
                <Media
                  image={bridge}
                  sizes="(max-width: 1023px) 100vw, 400px"
                  className="object-[38%_center] saturate-[0.85] contrast-[1.05]"
                />
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-0 bg-[url('/images/texture/grain.svg')] bg-[length:160px_160px] opacity-50 mix-blend-overlay"
                />
                <p className="absolute top-5 right-5 rounded-full px-3.5 py-1.5 text-[13px] leading-none text-white shadow-[inset_0_0_0_1px_rgba(255,255,255,0.75)]">
                  {page.contactImage.label}
                </p>
              </div>
            }
          />
        </div>
      </section>
    </>
  );
}
