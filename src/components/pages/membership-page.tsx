import Image from "next/image";
import membership from "@/content/data/membership.json";
import { home } from "@/content/data";
import { PillLink, frame } from "@/components/ui/pill";
import { leadText } from "@/components/ui/section-heading";
import { MembershipSignup } from "@/features/forms/membership-signup";
import { PlatformShot } from "@/components/ui/platform-shot";

// Membership page: it opens on a dusk hero with a screenshot of the internal
// platform, then the waiting list — a heading row, a form card beside a card with
// the Børsen spire and three short points on what to expect. The department
// copy stays in membership.json for a future section.

const ICONS: Record<string, string> = {
  cap: "M2 9l10-5 10 5-10 5L2 9Zm4 2.2V16c0 1.7 2.7 3 6 3s6-1.3 6-3v-4.8M22 9v6",
  check: "M12 3l7 3v5c0 4.4-3 8.2-7 9.5-4-1.3-7-5.1-7-9.5V6l7-3Zm-3 9 2 2 4-4",
  mail: "M3 6.5A1.5 1.5 0 0 1 4.5 5h15A1.5 1.5 0 0 1 21 6.5v11a1.5 1.5 0 0 1-1.5 1.5h-15A1.5 1.5 0 0 1 3 17.5v-11Zm0 .5 9 6 9-6",
};

function InfoIcon({ name }: { name: string }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      className="size-5"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.4"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d={ICONS[name] ?? ICONS.mail} />
    </svg>
  );
}

const stagger = (index: number, base = 0) =>
  ({ "--reveal-delay": `${base + index * 0.1}s` }) as React.CSSProperties;

export function MembershipPage() {
  const { join, info, platform } = membership.page;
  const spire = home.closing.image;

  return (
    <>
      {/* Hero: dusk landscape behind the title and a screenshot of the
          platform that flattens on scroll and fades into the page. */}
      <section
        id="platform"
        className="relative isolate -mt-18 overflow-x-clip bg-paper"
      >
        <div
          aria-hidden="true"
          className="absolute inset-0 -z-10 [mask-image:linear-gradient(180deg,#000_0%,#000_50%,rgba(0,0,0,0.55)_78%,transparent_100%)]"
        >
          <Image
            src={platform.background.src}
            alt=""
            fill
            preload
            sizes="100vw"
            className="object-cover object-[40%_center]"
          />
          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(17,16,20,0.7)_0%,rgba(17,16,20,0.25)_40%,rgba(17,16,20,0)_65%)]" />
        </div>

        <div
          className={`${frame} pt-32 pb-10 md:pt-36 md:pb-12 lg:pt-[140px] lg:pb-12`}
        >
          <div
            data-dark-hero
            className="animate-appear mx-auto max-w-[680px] text-center text-paper [animation-delay:.2s]"
          >
            <h1 className="font-serif text-[36px] leading-[1.08] font-medium tracking-[-0.02em] text-balance md:text-[48px] lg:text-[56px] lg:leading-[1.04] lg:tracking-[-0.022em]">
              {platform.title}
            </h1>
            <p
              className={`${leadText} mx-auto mt-6 max-w-[480px] text-paper/75`}
            >
              {platform.text}
            </p>
            <div className="mt-8 flex justify-center">
              <PillLink href="#interesse" tone="light">
                {platform.cta}
              </PillLink>
            </div>
          </div>
          <div className="animate-appear-slow mt-14 [animation-delay:.4s] lg:mt-16">
            <PlatformShot
              src={platform.image.src}
              alt={platform.image.alt}
              width={platform.image.width}
              height={platform.image.height}
            />
          </div>
        </div>
      </section>

      {/* Waiting list: heading row, form card and spire card. */}
      <section
        id="interesse"
        className="scroll-mt-20 bg-paper pt-8 pb-20 md:pt-10 md:pb-28 lg:pt-12 lg:pb-[140px]"
      >
        <div className={frame}>
          <MembershipSignup
            label={join.label}
            title={join.title}
            imageLabel={join.imageLabel}
            spire={spire}
            definition={membership.form}
          />

          {/* What to expect, in three short points. */}
          <ul className="mt-20 grid gap-12 text-center sm:grid-cols-3 lg:mt-24">
            {info.map((item, index) => (
              <li key={item.title} data-reveal style={stagger(index)}>
                <span className="mx-auto grid size-14 place-items-center rounded-full bg-[#14120d0a] text-ink">
                  <InfoIcon name={item.icon} />
                </span>
                <p className="mt-5 text-[18px] leading-[1.3] font-medium tracking-[-0.006em]">
                  {item.title}
                </p>
                <p className="mt-2 text-[14px] leading-[1.6] text-ink/60">
                  {item.lines.map((line) => (
                    <span key={line} className="block">
                      {line}
                    </span>
                  ))}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}
