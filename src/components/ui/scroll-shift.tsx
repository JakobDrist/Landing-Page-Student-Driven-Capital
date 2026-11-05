"use client";
import { useEffect, useRef, type ReactNode } from "react";

/**
 * Scroll-linked drift from the Stills hero (Framer "Scroll transform",
 * trigger "on scroll"): as the page scrolls from top to bottom, the element
 * moves `distance` px sideways and optionally fades out. Page progress is
 * followed through a spring, so the motion trails the scroll slightly.
 *
 * Stills values: text column x 0 → −250, opacity 1 → 0, spring 0.3s with
 * bounce 0.2; image x 0 → +250, opacity unchanged, damping 60. Framer maps
 * the transform onto the whole page scroll, which on Stills is 8660px at a
 * 1440×900 viewport; `range` fixes that length so the drift per scrolled pixel
 * matches the reference regardless of how long our page is.
 */
export function ScrollShift({
  children,
  distance,
  fade = false,
  /** Spring natural frequency (rad/s) and damping ratio. */
  frequency = 21,
  damping = 0.8,
  range = 8660,
  className = "",
}: {
  children: ReactNode;
  distance: number;
  fade?: boolean;
  frequency?: number;
  damping?: number;
  /** Scroll distance (px) over which the full drift happens. */
  range?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element || matchMedia("(prefers-reduced-motion: reduce)").matches)
      return;

    let value = 0;
    let velocity = 0;
    let frame = 0;
    let last = 0;

    const target = () => Math.min(Math.max(window.scrollY / range, 0), 1);
    const paint = () => {
      element.style.transform = `translate3d(${(value * distance).toFixed(2)}px,0,0)`;
      if (fade) element.style.opacity = (1 - value).toFixed(4);
    };
    const step = (time: number) => {
      const dt = Math.min((time - (last || time)) / 1000, 1 / 30);
      last = time;
      const goal = target();
      // Damped spring toward the scroll progress.
      const acceleration =
        frequency * frequency * (goal - value) -
        2 * damping * frequency * velocity;
      velocity += acceleration * dt;
      value += velocity * dt;
      paint();
      if (Math.abs(goal - value) > 0.00005 || Math.abs(velocity) > 0.00005) {
        frame = requestAnimationFrame(step);
      } else {
        value = goal;
        velocity = 0;
        paint();
        frame = 0;
        last = 0;
      }
    };
    const wake = () => {
      if (!frame) frame = requestAnimationFrame(step);
    };

    value = target();
    paint();
    window.addEventListener("scroll", wake, { passive: true });
    window.addEventListener("resize", wake);
    return () => {
      window.removeEventListener("scroll", wake);
      window.removeEventListener("resize", wake);
      cancelAnimationFrame(frame);
    };
  }, [distance, fade, frequency, damping, range]);

  return (
    <div ref={ref} className={`will-change-transform ${className}`}>
      {children}
    </div>
  );
}
