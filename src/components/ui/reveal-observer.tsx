"use client";
import { useEffect } from "react";

/**
 * Marks every `[data-reveal]` element as revealed once it scrolls into view.
 * Mounted once in the root layout; a MutationObserver picks up elements added
 * by client-side navigation.
 */
export function RevealObserver() {
  useEffect(() => {
    const root = document.documentElement;
    if (
      !("IntersectionObserver" in window) ||
      matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      root.classList.remove("reveal-armed");
      return;
    }
    const intersection = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          entry.target.setAttribute("data-revealed", "");
          intersection.unobserve(entry.target);
        }
      },
      { rootMargin: "0px 0px -10% 0px" },
    );
    const watch = (scope: ParentNode) =>
      scope
        .querySelectorAll("[data-reveal]:not([data-revealed])")
        .forEach((element) => intersection.observe(element));
    watch(document);
    const mutations = new MutationObserver(() => watch(document));
    mutations.observe(document.body, { childList: true, subtree: true });
    return () => {
      intersection.disconnect();
      mutations.disconnect();
    };
  }, []);
  return null;
}

/** Runs before first paint so revealed content never flashes in and out. */
export const revealBootScript =
  "document.documentElement.classList.add('reveal-armed');";
