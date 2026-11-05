"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { PillLink } from "@/components/ui/pill";
import type { ContentLink } from "@/content/types";

// Layout and states follow the Stills navigation: transparent over the hero,
// a cream bar once the hero has scrolled away, and a full-screen menu. Pages
// other than the homepage get the transparent state by marking their dark
// hero area with `data-dark-hero`.

/** Pages that open on a dark hero. */
const DARK_HERO_PATHS = ["/", "/membership", "/partnerskaber"];

export function SiteHeader({
  navigation,
  brand,
  copyright,
}: {
  navigation: ContentLink[];
  brand: string;
  copyright: string;
}) {
  const pathname = usePathname();
  const darkHero = DARK_HERO_PATHS.includes(pathname);
  const [open, setOpen] = useState(false);
  const [overHero, setOverHero] = useState(true);
  const toggle = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!darkHero) return;
    let frame = 0;
    const update = () => {
      frame = 0;
      const hero = document.querySelector("[data-dark-hero]");
      setOverHero(
        hero
          ? hero.getBoundingClientRect().bottom > 80
          : window.scrollY < window.innerHeight - 80,
      );
    };
    const scroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", scroll, { passive: true });
    window.addEventListener("resize", scroll);
    return () => {
      window.removeEventListener("scroll", scroll);
      window.removeEventListener("resize", scroll);
      cancelAnimationFrame(frame);
    };
  }, [darkHero]);

  useEffect(() => {
    if (!open) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.smoothScroll?.stop();
    const key = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        toggle.current?.focus();
      }
    };
    document.addEventListener("keydown", key);
    return () => {
      document.body.style.overflow = previous;
      window.smoothScroll?.start();
      document.removeEventListener("keydown", key);
    };
  }, [open]);

  const dark = darkHero && overHero && !open;

  // Stagger used by Stills for the phone menu (and the call to action).
  const linkDelays = [0.1, 0.2, 0.3, 0.35, 0.45];

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <div
        className={`menu-bar flex flex-col overflow-hidden ${open ? "h-svh bg-paper text-ink" : `h-20 ${dark ? "bg-transparent text-paper" : "bg-paper/99 text-ink"}`}`}
      >
        <div className="flex h-20 shrink-0 items-center justify-between px-6 md:px-8">
          <Link
            href="/"
            aria-label={`${brand} forside`}
            onClick={() => setOpen(false)}
            className="font-serif text-[23px] leading-none font-medium tracking-[-0.01em] whitespace-nowrap"
          >
            {brand}
          </Link>
          <button
            ref={toggle}
            type="button"
            aria-expanded={open}
            aria-controls="site-menu"
            onClick={() => setOpen((value) => !value)}
            className={`menu-toggle h-9 cursor-pointer rounded-full px-5 text-[14px] leading-none font-medium [font-feature-settings:normal] hover:opacity-85 focus-visible:outline-2 focus-visible:outline-offset-4 ${dark ? "bg-paper text-ink" : "bg-ink text-paper"}`}
          >
            {open ? "Luk" : "Menu"}
          </button>
        </div>

        {open && (
          <nav
            id="site-menu"
            aria-label="Hovednavigation"
            className="flex min-h-0 flex-1 flex-col overflow-y-auto overscroll-contain px-6 pb-[calc(32px+env(safe-area-inset-bottom))]"
          >
            <div className="flex flex-1 flex-col items-center justify-center py-12">
              <ul className="menu-links flex flex-col items-center gap-3">
                {navigation.map((item, index) => (
                  <li
                    key={item.href}
                    style={
                      {
                        "--menu-delay": `${linkDelays[index] ?? 0.35}s`,
                      } as React.CSSProperties
                    }
                  >
                    <Link
                      href={item.href}
                      onClick={() => setOpen(false)}
                      aria-current={
                        pathname === item.href ||
                        pathname.startsWith(item.href + "/")
                          ? "page"
                          : undefined
                      }
                      className="block text-[min(44px,9.4vw)] leading-[1.3] text-[#14120d8c] transition-colors duration-300 ease-[cubic-bezier(.44,0,.56,1)] hover:text-[#14120d] aria-[current=page]:text-[#19192380] md:text-[64px] md:leading-[84px]"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
              <div
                className="menu-lift mt-14"
                style={{ "--menu-delay": "0.45s" } as React.CSSProperties}
              >
                <PillLink href="/membership" tone="dark">
                  Bliv en del af DSD Invest
                </PillLink>
              </div>
            </div>
            {/* Stills closes the menu with a single copyright line. */}
            <p className="text-center text-[16px] leading-[1.2] text-ink">
              {copyright.endsWith(".") ? copyright : `${copyright}.`}
            </p>
          </nav>
        )}
      </div>
    </header>
  );
}
