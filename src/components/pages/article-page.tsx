import Image from "next/image";
import Link from "next/link";
import { people } from "@/content/data";
import type { Article } from "@/content/types";
import { Container } from "@/components/ui/container";
import { Media } from "@/components/ui/media";
import { RichText } from "@/components/ui/rich-text";
import { pageTitle } from "@/components/ui/section-heading";
import { JournalSection } from "@/components/sections/journal-section";
export function ArticlePage({ article }: { article: Article }) {
  return (
    <>
      <header className="py-16 md:py-24">
        <Container>
          <div className="mx-auto max-w-5xl">
            <p className="text-[15px] leading-6 text-muted">
              {article.category} · {article.date}
            </p>
            <h1 className={`${pageTitle} mt-6`}>{article.title}</h1>
            <div className="mt-10 flex flex-wrap items-center justify-between gap-8">
              <div className="flex flex-wrap gap-8">
                {article.authors.map((slug) => {
                  const author = people.find((person) => person.slug === slug);
                  return (
                    author && (
                      <Link
                        key={slug}
                        href={author.href}
                        className="flex items-center gap-3"
                      >
                        <Image
                          src={author.image.src}
                          alt=""
                          width={44}
                          height={54}
                          className="h-[54px] w-11 rounded-lg object-cover grayscale contrast-[1.04]"
                        />
                        <div>
                          <p className="text-[15px]">{author.name}</p>
                          <p className="mt-1 text-[13px] text-muted">
                            {author.role.split(",")[0]}
                          </p>
                        </div>
                      </Link>
                    )
                  );
                })}
              </div>
              <a
                href={`mailto:?subject=${encodeURIComponent(article.title)}&body=${encodeURIComponent(article.href)}`}
                className="text-[13px] text-muted underline-offset-4 hover:underline"
              >
                Share
              </a>
            </div>
          </div>
        </Container>
      </header>
      {article.cover && (
        <Container>
          <figure>
            <div className="relative aspect-[2/1] overflow-hidden rounded-[14px] bg-[#dcdcd8]">
              <Media image={article.cover} preload sizes="100vw" />
            </div>
            {article.caption && (
              <figcaption className="mt-3 text-[12px] leading-[1.5] text-muted">
                {article.caption.replace("Photo:", "Photo: ")}
              </figcaption>
            )}
          </figure>
        </Container>
      )}
      <Container className="py-16 md:py-24">
        <article className="mx-auto max-w-[704px]">
          <RichText blocks={article.body} />
          <div className="mt-12 border-t border-line pt-6">
            <a
              href={`mailto:?subject=${encodeURIComponent(article.title)}&body=${encodeURIComponent(article.href)}`}
              className="text-[13px] text-muted hover:text-ink"
            >
              Share
            </a>
          </div>
          <nav
            aria-label="Previous and next articles"
            className="mt-10 grid grid-cols-2 gap-8 border-t border-line pt-8"
          >
            {article.previous ? (
              <Link href={article.previous.href}>
                <p className="text-[13px] text-muted">Previous</p>
                <p className="mt-3 text-[20px] leading-[1.3] tracking-[-0.015em]">
                  {article.previous.label}
                </p>
              </Link>
            ) : (
              <span />
            )}
            {article.next && (
              <Link href={article.next.href} className="text-right">
                <p className="text-[13px] text-muted">Next</p>
                <p className="mt-3 text-[20px] leading-[1.3] tracking-[-0.015em]">
                  {article.next.label}
                </p>
              </Link>
            )}
          </nav>
        </article>
      </Container>
      <JournalSection title="Keep reading" items={article.related} />
    </>
  );
}
