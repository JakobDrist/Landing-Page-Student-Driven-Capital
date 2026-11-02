import { Glow } from "@/components/ui/glow";
import { Grain } from "@/components/ui/grain";
import { AnimatedLabel } from "@/components/ui/animated-label";
import Link from "next/link";
import { Media } from "@/components/ui/media";
import type { ArticleSummary } from "@/content/types";
export function ArticleCard({
  article,
  featured = false,
}: {
  article: ArticleSummary;
  featured?: boolean;
}) {
  const face = (
    <div
      className={`relative aspect-[3/2] overflow-hidden rounded-[14px] bg-[#dcdcd8] ${featured ? "md:aspect-[4/3]" : ""}`}
    >
      {article.coverLabel ? (
        <div className="absolute inset-0 isolate flex flex-col justify-between bg-[#1c1c1e] p-8 text-paper">
          <Glow />
          <Grain />
          <p className="text-[13px] text-paper/60">{article.category}</p>
          <p className="text-[clamp(36px,4vw,60px)] leading-none transition-transform duration-800 ease-[cubic-bezier(.16,1,.3,1)] group-hover:translate-x-[0.35rem] tracking-[-0.03em]">
            {article.coverLabel.replace(article.category, "")}
          </p>
        </div>
      ) : (
        article.cover && (
          <Media
            image={article.cover}
            className="transition-transform duration-1200 ease-[cubic-bezier(.16,1,.3,1)] group-hover:scale-[1.03]"
            sizes={
              featured
                ? "(max-width: 767px) 100vw, 50vw"
                : "(max-width: 767px) 100vw, 33vw"
            }
          />
        )
      )}
    </div>
  );
  return (
    <Link
      href={article.href}
      className={`group block ${featured ? "md:grid md:grid-cols-2 md:items-center md:gap-12" : ""}`}
    >
      {face}
      <div>
        <p
          className={`text-[13px] leading-[1.35] text-muted ${featured ? "mt-6 md:mt-0" : "mt-5"}`}
        >
          {article.category} · {article.date}
        </p>
        <h3
          className={`mt-3 font-normal tracking-[-0.015em] ${featured ? "text-[32px] leading-[1.15] md:text-[42px]" : "text-[24px] leading-[1.25]"}`}
        >
          <AnimatedLabel>{article.title}</AnimatedLabel>
        </h3>
        <p className="mt-4 text-[17px] leading-[1.6] tracking-[-0.01em] text-muted">
          {article.description}
        </p>
        <p className="mt-6 text-[13px] leading-[1.35] text-muted">
          {article.byline}
        </p>
      </div>
    </Link>
  );
}
