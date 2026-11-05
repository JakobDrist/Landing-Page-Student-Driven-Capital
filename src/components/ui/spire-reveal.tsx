"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";

/**
 * The Børsen spire rises out of the ground as the closing section scrolls into
 * view: it slides up from below the section's bottom edge (which crops it) and
 * settles from a slight scale, while a warm band of light travels up the
 * dragons to the tip — masked to the spire's own silhouette, so it only lights
 * the stone and copper. Scroll-linked, so it reverses when scrolling back up.
 *
 * Progress runs from 0 when the box's top meets the bottom of the viewport to
 * 1 when its bottom does; it is measured directly so it also works inside the
 * absolutely positioned, overflow-clipped closing section.
 */

/** How far below its resting place the spire starts, as a share of its box. */
const RISE = 0.55;

function clamp01(value: number) {
  return Math.min(Math.max(value, 0), 1);
}

/** Maps `value` from [a, b] to [0, 1], clamped. */
function span(value: number, a: number, b: number) {
  return clamp01((value - a) / (b - a));
}

/** Ease-out (cubic) so the spire decelerates into place. */
function easeOut(value: number) {
  return 1 - Math.pow(1 - value, 3);
}

export function SpireReveal({
  src,
  alt,
  sizes,
}: {
  src: string;
  alt: string;
  sizes: string;
}) {
  const root = useRef<HTMLDivElement>(null);
  const stage = useRef<HTMLDivElement>(null);
  const glow = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = root.current;
    if (!element) return;
    const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
    let frame = 0;

    const paint = () => {
      frame = 0;
      if (reduce) return;
      const rect = element.getBoundingClientRect();
      const progress = clamp01((window.innerHeight - rect.top) / rect.height);
      const risen = easeOut(span(progress, 0, 0.9));
      if (stage.current) {
        const y = (1 - risen) * RISE * 100;
        const scale = 1.04 - 0.04 * risen;
        stage.current.style.transform = `translateY(${y.toFixed(2)}%) scale(${scale.toFixed(4)})`;
      }
      if (glow.current) {
        // The light travels from the base (100%) past the tip (-20%).
        const travel = span(progress, 0.35, 0.95);
        glow.current.style.top = `${(100 - travel * 120).toFixed(2)}%`;
        const fadeIn = span(progress, 0.35, 0.45);
        const fadeOut = 1 - span(progress, 0.85, 0.95);
        glow.current.style.opacity = Math.min(fadeIn, fadeOut).toFixed(3);
      }
    };
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(paint);
    };

    paint();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    return () => {
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <div ref={root} className="absolute inset-0">
      <div
        ref={stage}
        className="absolute inset-0 origin-bottom will-change-transform"
      >
        <Image
          src={src}
          alt={alt}
          fill
          sizes={sizes}
          className="object-contain object-bottom"
        />
        {/* Light travelling up the spire, clipped to its silhouette. */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 motion-reduce:hidden"
          style={{
            maskImage: `url("${src}")`,
            WebkitMaskImage: `url("${src}")`,
            maskSize: "contain",
            WebkitMaskSize: "contain",
            maskPosition: "bottom center",
            WebkitMaskPosition: "bottom center",
            maskRepeat: "no-repeat",
            WebkitMaskRepeat: "no-repeat",
          }}
        >
          <div
            ref={glow}
            className="absolute inset-x-0 h-[18%] bg-[linear-gradient(to_bottom,transparent,rgba(255,244,214,0.85)_50%,transparent)] opacity-0 mix-blend-screen"
          />
        </div>
      </div>
    </div>
  );
}
