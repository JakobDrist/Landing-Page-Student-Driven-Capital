"use client";
import Lenis from "lenis";
import "lenis/dist/lenis.css";
import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";

declare global {
  interface Window {
    smoothScroll?: Lenis;
  }
}

/**
 * Smooth, slightly trailing wheel scrolling with the same settings as the
 * Stills reference (Framer "Smooth Scroll", intensity 12 → Lenis duration
 * 1.2s). Touch keeps native scrolling, and reduced-motion users keep the
 * browser's own scrolling.
 */
export function SmoothScroll() {
  const pathname = usePathname();
  const firstPath = useRef(pathname);

  useEffect(() => {
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const lenis = new Lenis({
      duration: 1.2,
      smoothWheel: true,
      syncTouch: false,
      autoRaf: true,
      autoToggle: true,
      anchors: true,
      allowNestedScroll: true,
      stopInertiaOnNavigate: true,
    });
    window.smoothScroll = lenis;
    return () => {
      lenis.destroy();
      delete window.smoothScroll;
    };
  }, []);

  // Start every page at the top without easing, as a normal navigation would.
  useEffect(() => {
    if (pathname === firstPath.current || window.location.hash) return;
    firstPath.current = pathname;
    window.smoothScroll?.scrollTo(0, { immediate: true });
  }, [pathname]);

  return null;
}
