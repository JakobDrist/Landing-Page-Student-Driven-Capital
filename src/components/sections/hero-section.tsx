import { Grain } from "@/components/ui/grain";
import { home } from "@/content/data";
import { Media } from "@/components/ui/media";
import { ButtonLink } from "@/components/ui/button-link";
import { leadText } from "@/components/ui/section-heading";

export function HeroSection() {
  return (
    <section className="relative isolate flex min-h-[608px] h-dvh flex-col items-center justify-center overflow-hidden bg-[#2a2b31] px-5 pt-18 pb-30 text-center text-[#f3f3f1] md:px-8 md:pb-40 lg:px-10 lg:pb-35 xl:px-12 xl:pb-[162px]">
      <div className="absolute inset-0 -z-20">
        <Media
          image={home.hero.image}
          preload
          sizes="100vw"
          className="animate-landscape-settle object-[center_62%]"
        />
      </div>
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 bg-[linear-gradient(180deg,#12121259,#1212120d_45%,#12121273)]"
      />
      <Grain className="opacity-55" />
      <h1 className="max-w-[1080px] text-balance text-[40px] leading-[1.08] font-normal tracking-[-0.03em] md:text-[53px] lg:text-[62px] xl:text-[73px]">
        {home.hero.title}
      </h1>
      <div className="relative isolate mt-7 w-full max-w-[640px]">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -inset-x-12 -inset-y-9 -z-10"
          style={{
            background:
              "radial-gradient(ellipse at center, rgba(12, 21, 30, 0.48) 0%, rgba(12, 21, 30, 0) 74%)",
          }}
        />
        <p
          className={`${leadText} text-[#f3f3f1]/95`}
          style={{ textShadow: "0 1px 14px rgba(5, 10, 16, 0.28)" }}
        >
          {home.hero.description}
        </p>
      </div>
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
