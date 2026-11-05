"use client";
import NumberFlow from "@number-flow/react";
import { useEffect, useRef, useState } from "react";

/**
 * Hero metric animated with NumberFlow: once the number scrolls into view it
 * rolls from `from` to `value` in a single NumberFlow transition, slowed down
 * through NumberFlow's own timing options so the digits take their time to
 * settle. The server renders the final value, so the figure is correct
 * without JavaScript; NumberFlow itself respects reduced motion.
 */

/** Length of the roll, in ms. */
const DURATION = 2400;
/** Long, soft ease-out so the digits glide into place. */
const EASING = "cubic-bezier(0.16, 1, 0.3, 1)";

export function CountUp({
  value,
  from = 0,
  prefix = "",
  suffix = "",
  decimals = 0,
  locales = "en-US",
  className = "",
}: {
  value: number;
  /** Where the roll starts when the number comes into view. */
  from?: number;
  prefix?: string;
  suffix?: string;
  decimals?: number;
  locales?: string;
  className?: string;
}) {
  const [shown, setShown] = useState(value);
  const [animated, setAnimated] = useState(false);
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;
    let frame = 0;
    let observer: IntersectionObserver | undefined;
    // Reset to the start value without animating, then roll when seen.
    frame = requestAnimationFrame(() => {
      setAnimated(false);
      setShown(from);
      observer = new IntersectionObserver(([entry]) => {
        if (!entry.isIntersecting) return;
        observer?.disconnect();
        frame = requestAnimationFrame(() => {
          setAnimated(true);
          setShown(value);
        });
      });
      observer.observe(element);
    });
    return () => {
      cancelAnimationFrame(frame);
      observer?.disconnect();
    };
  }, [value, from]);

  return (
    <span ref={ref} className={`inline-flex ${className}`}>
      <NumberFlow
        value={shown}
        prefix={prefix}
        suffix={suffix}
        locales={locales}
        format={{
          minimumFractionDigits: decimals,
          maximumFractionDigits: decimals,
        }}
        animated={animated}
        trend={1}
        spinTiming={{ duration: DURATION, easing: EASING }}
        transformTiming={{ duration: DURATION, easing: EASING }}
        opacityTiming={{ duration: DURATION / 3, easing: "ease-out" }}
        willChange
      />
    </span>
  );
}
