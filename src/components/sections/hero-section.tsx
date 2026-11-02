import { Grain } from "@/components/ui/grain";
import { home } from "@/content/data";
import { Media } from "@/components/ui/media";
import { ButtonLink } from "@/components/ui/button-link";
import { pageTitle, leadText } from "@/components/ui/section-heading";
export function HeroSection() {
  return (
    <section className="relative isolate flex min-h-[608px] flex-col items-center justify-center overflow-hidden bg-[#2a2b31] px-5 pt-18 pb-30 text-center text-[#f3f3f1] md:px-8 md:pb-40 lg:px-10 lg:pb-35 xl:px-12 xl:pb-[162px] h-dvh">
      <div className="absolute inset-0 -z-20">
        <Media
          image={home.hero.image}
          preload
          sizes="100vw"
          className="animate-landscape-settle object-bottom"
        />
      </div>
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 bg-[linear-gradient(180deg,#12121259,#1212120d_45%,#12121273)]"
      />
      <Grain className="opacity-55" />
      <h1 className={`${pageTitle} max-w-[880px]`}>{home.hero.title}</h1>
      <p className={`${leadText} mt-7 max-w-xl text-[#f3f3f1]/80`}>
        {home.hero.description}
      </p>
      <div className="mt-10 flex flex-wrap justify-center gap-3">
        {home.hero.actions.map((action, index) => (
          <ButtonLink
            key={action.href}
            href={action.href}
            variant={index === 0 ? "light" : "ghost"}
            arrow={index === 0}
          >
            {action.label}
          </ButtonLink>
        ))}
      </div>
    </section>
  );
}
