"use client";
import { useEffect, useRef } from "react";
import { Icon, searchIcon } from "@/components/ui/icon";
export function InsightSearch({
  query,
  onChange,
}: {
  query: string;
  onChange: (query: string) => void;
}) {
  const ref = useRef<HTMLInputElement>(null);
  useEffect(() => {
    const key = (event: KeyboardEvent) => {
      if (
        event.key === "/" &&
        !(event.target as HTMLElement).matches(
          'input,textarea,select,[contenteditable="true"]',
        )
      ) {
        event.preventDefault();
        ref.current?.focus();
      }
    };
    document.addEventListener("keydown", key);
    if (location.hash === "#search")
      ref.current?.focus({ preventScroll: true });
    return () => document.removeEventListener("keydown", key);
  }, []);
  return (
    <div id="search" className="relative w-full md:max-w-64">
      <Icon
        path={searchIcon}
        className="pointer-events-none absolute top-1/2 left-3 -translate-y-1/2 text-muted"
      />
      <input
        ref={ref}
        type="search"
        value={query}
        onChange={(event) => onChange(event.target.value)}
        aria-label="Search insights"
        placeholder="Search"
        className="h-10 w-full rounded-[10px] bg-white pr-3 pl-9 text-[15px] text-ink shadow-[inset_0_0_0_1px_var(--color-control)] outline-none placeholder:text-muted focus:shadow-[inset_0_0_0_1.5px_var(--color-ink)]"
      />
    </div>
  );
}
