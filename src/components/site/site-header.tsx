"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { ButtonLink } from "@/components/ui/button-link";
import { Container } from "@/components/ui/container";
import { Wordmark } from "@/components/ui/wordmark";
import type { ContentLink } from "@/content/types";

export function SiteHeader({
  navigation,
  brand,
  menuEmail,
}: {
  navigation: ContentLink[];
  brand: string;
  menuEmail: string;
}) {
  const pathname = usePathname();
  const home = pathname === "/";
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLElement>(null);
  const toggle = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    const header = ref.current;
    if (!header) return;
    let previous = window.scrollY;
    let frame = 0;
    const update = () => {
      frame = 0;
      const y = window.scrollY;
      header.dataset.scrolled = String(y > 8);
      header.dataset.hidden = String(
        y >= 200 &&
          !open &&
          !header.contains(document.activeElement) &&
          y > previous,
      );
      previous = y;
    };
    const scroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", scroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", scroll);
      cancelAnimationFrame(frame);
    };
  }, [open]);
  useEffect(() => {
    if (!open) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const key = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        toggle.current?.focus();
      }
    };
    const media = matchMedia("(min-width: 1024px)");
    const close = () => {
      if (media.matches) setOpen(false);
    };
    document.addEventListener("keydown", key);
    media.addEventListener("change", close);
    return () => {
      document.body.style.overflow = previous;
      document.removeEventListener("keydown", key);
      media.removeEventListener("change", close);
    };
  }, [open]);
  return (
    <header
      ref={ref}
      onFocusCapture={() => {
        if (ref.current) ref.current.dataset.hidden = "false";
      }}
      className={`group fixed inset-x-0 top-0 z-50 transition-[transform,background-color,box-shadow,color] duration-500 ease-[cubic-bezier(.16,1,.3,1)] data-[hidden=true]:-translate-y-full data-[scrolled=true]:bg-paper data-[scrolled=true]:text-ink data-[scrolled=true]:shadow-[0_1px_0_#12121214] ${open ? "bg-navy text-[#f3f3f1] data-[scrolled=true]:bg-navy data-[scrolled=true]:text-[#f3f3f1]" : home ? "bg-transparent text-[#f3f3f1]" : "bg-paper text-ink"}`}
    >
      <Container className="flex h-18 items-center justify-between gap-8">
        <Link
          href="/"
          aria-label={`${brand} forside`}
          onClick={() => setOpen(false)}
          // Dark blue wherever the header sits on paper; light over the
          // homepage hero and in the open menu.
          className={`shrink-0 transition-colors duration-500 ${open ? "" : home ? "group-data-[scrolled=true]:text-navy" : "text-navy"}`}
        >
          <Wordmark brand={brand} />
        </Link>
        <nav
          aria-label="Hovednavigation"
          className="hidden items-center gap-6 lg:flex"
        >
          {navigation.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              aria-current={
                pathname === item.href || pathname.startsWith(item.href + "/")
                  ? "page"
                  : undefined
              }
              className="relative text-[15px] leading-6 tracking-[-0.01em] after:absolute after:inset-x-0 after:-bottom-1.5 after:h-px after:origin-left after:scale-x-0 after:bg-current after:transition-transform after:duration-450 after:ease-[cubic-bezier(.16,1,.3,1)] hover:after:scale-x-100 aria-[current=page]:after:scale-x-100 opacity-75 transition-opacity hover:opacity-100 aria-[current=page]:opacity-100"
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-6">
          <div className="hidden md:block">
            <ButtonLink
              href="/membership"
              variant={home || open ? "light" : "primary"}
            >
              Bliv en del af DSD Invest
            </ButtonLink>
          </div>
          <button
            ref={toggle}
            type="button"
            aria-label={open ? "Luk menu" : "Åbn menu"}
            aria-expanded={open}
            aria-controls="mobile-navigation"
            onClick={() => setOpen((value) => !value)}
            className="relative flex size-10 cursor-pointer flex-col items-center justify-center gap-[5px] rounded-lg focus-visible:outline-2 focus-visible:outline-offset-4 lg:hidden"
          >
            <span
              className={`h-px w-5 bg-current transition-transform duration-300 ease-[cubic-bezier(.16,1,.3,1)] ${open ? "translate-y-[3px] rotate-45" : ""}`}
            />
            <span
              className={`h-px w-5 bg-current transition-transform duration-300 ease-[cubic-bezier(.16,1,.3,1)] ${open ? "-translate-y-[3px] -rotate-45" : ""}`}
            />
          </button>
        </div>
      </Container>
      {open && (
        <nav
          id="mobile-navigation"
          aria-label="Mobilnavigation"
          className="animate-menu-fade h-[calc(100dvh-72px)] overflow-y-auto overscroll-contain pb-[calc(40px+env(safe-area-inset-bottom))] lg:hidden"
        >
          <Container className="flex min-h-full flex-col py-10">
            <div className="flex flex-1 flex-col gap-5">
              {navigation.map((item, index) => (
                <Link
                  href={item.href}
                  key={item.href}
                  onClick={() => setOpen(false)}
                  style={{ animationDelay: `${60 + index * 45}ms` }}
                  className="animate-menu-rise text-[36px] leading-[1.2] tracking-[-0.025em]"
                >
                  {item.label}
                </Link>
              ))}
            </div>
            <div className="mt-12">
              <ButtonLink href="/membership" variant="light">
                Bliv en del af DSD Invest
              </ButtonLink>
              <a
                href={`mailto:${menuEmail}`}
                className="mt-8 block text-[15px] text-[#a6a6a3] hover:text-white"
              >
                {menuEmail}
              </a>
            </div>
          </Container>
        </nav>
      )}
    </header>
  );
}
