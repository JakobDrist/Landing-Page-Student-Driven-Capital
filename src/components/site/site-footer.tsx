import Link from "next/link";
import { site } from "@/content/data";
import { frame } from "@/components/ui/pill";

// Compact footer in the Stills idiom: brand, tagline and link columns on
// black. Sign-up happens through the membership form, so there is no e-mail
// field here.

export function SiteFooter() {
  return (
    <footer className="relative z-10 bg-night text-paper">
      <div
        className={`${frame} pt-20 pb-16 md:pt-28 md:pb-20 lg:pt-[140px] lg:pb-[100px]`}
      >
        <Link
          href="/"
          aria-label={`${site.brand} forside`}
          className="font-serif text-[32px] leading-none font-medium tracking-[-0.01em]"
        >
          {site.brand}
        </Link>
        <p className="mt-5 text-[14px] leading-[1.4] text-paper/90">
          {site.tagline}
        </p>

        <div className="mt-16 grid grid-cols-2 gap-x-5 gap-y-12 md:grid-cols-4 lg:grid-cols-[repeat(3,284px)_1fr]">
          {site.footerGroups.map((group) => (
            <nav key={group.title} aria-label={group.title}>
              <h2 className="text-[14px] leading-[1.4] text-paper/60">
                {group.title}
              </h2>
              <ul className="mt-4 space-y-3">
                {group.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-[14px] leading-[1.3] transition-opacity duration-1000 ease-spring hover:opacity-70"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>
      </div>
    </footer>
  );
}
